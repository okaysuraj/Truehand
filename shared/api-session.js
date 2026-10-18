// Bind requests to the Firebase session present when the caller starts them.
// A late token/response from another session must never be used for this request.
export function guardApiSession(api, auth, canceled, unauthorized) {
  const sessions = new WeakMap();
  let nextSession = 1;
  const current = () => {
    const user = auth.currentUser;
    if (!user) return 0;
    if (!sessions.has(user)) sessions.set(user, nextSession++);
    return sessions.get(user);
  };
  const stamp = (config) => ({ ...config, truehandSession: current() });
  for (const method of [
    'get',
    'delete',
    'head',
    'options',
    'post',
    'put',
    'patch',
    'postForm',
    'putForm',
    'patchForm',
  ]) {
    const send = api[method].bind(api);
    const hasBody = ['post', 'put', 'patch', 'postForm', 'putForm', 'patchForm'].includes(method);
    api[method] = hasBody
      ? (url, data, config) => send(url, data, stamp(config))
      : (url, config) => send(url, stamp(config));
  }
  const request = api.request.bind(api);
  api.request = (configOrUrl, config) =>
    typeof configOrUrl === 'string'
      ? request(configOrUrl, stamp(config))
      : request(stamp(configOrUrl));
  const matches = (config) => config?.truehandSession === current();
  const assertCurrent = (config) => {
    if (!matches(config)) throw canceled('Your account changed. Please retry.');
  };
  api.interceptors.request.use(async (config) => {
    await auth.authStateReady();
    assertCurrent(config);
    const token = auth.currentUser ? await auth.currentUser.getIdToken() : null;
    assertCurrent(config);
    if (token) config.headers.Authorization = `Bearer ${token}`;
    else delete config.headers.Authorization;
    return config;
  });
  api.interceptors.response.use(
    (response) => {
      assertCurrent(response.config);
      return response;
    },
    async (error) => {
      if (error.config && !matches(error.config))
        throw canceled('Your account changed. Please retry.');
      if (error.response?.status === 401 && matches(error.config)) await unauthorized();
      throw error;
    },
  );
  return new Proxy(api, {
    apply(target, thisArg, args) {
      return typeof args[0] === 'string' ? target(args[0], stamp(args[1])) : target(stamp(args[0]));
    },
  });
}
