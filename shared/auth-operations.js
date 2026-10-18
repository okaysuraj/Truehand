export function requireAuthIdentity(auth, user) {
  if (auth.currentUser !== user) throw new Error('Your account changed. Please sign in again.');
}
// Account-changing operations must finish in order, especially device revocation before sign-out.
export function serializeAuthOperations(service) {
  let queue = Promise.resolve();
  let latest = 0;
  for (const name of ['restoreSession', 'login', 'register', 'logout']) {
    const operation = service[name];
    service[name] = (...args) => {
      const generation = ++latest;
      const result = queue.then(() => operation(...args));
      queue = result.then(
        () => undefined,
        () => undefined,
      );
      return result.then((value) => {
        if (generation !== latest)
          throw new Error('A newer account operation replaced this request.');
        return value;
      });
    };
  }
  return service;
}
