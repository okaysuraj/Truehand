// Runs catalog assistance requests and discards results from an obsolete account or query.
export function createCatalogAssistanceHook(React, api, uuid) {
  return function useCatalogAssistance(userId) {
    const [state, setState] = React.useState({
      owner: null,
      history: [],
      reply: null,
      loading: false,
      busy: false,
      error: '',
    });
    const [revision, setRevision] = React.useState(0);
    const key = React.useRef(null);
    const owner = React.useRef(userId);
    const pending = React.useRef(false);
    owner.current = userId;
    React.useEffect(() => {
      let active = true;
      const controller = new AbortController();
      if (key.current?.owner !== userId) key.current = null;
      setState((current) =>
        current.owner === userId
          ? {
              ...current,
              loading: !!userId,
              error: '',
            }
          : {
              owner: userId,
              history: [],
              reply: null,
              loading: !!userId,
              busy: false,
              error: '',
            },
      );
      if (userId)
        api
          .get('/account/catalog-assistance', {
            signal: controller.signal,
          })
          .then(({ data }) => {
            if (active)
              setState((current) => ({
                ...current,
                history: current.reply
                  ? [current.reply, ...data.filter((row) => row.id !== current.reply.id)]
                  : data,
                loading: false,
              }));
          })
          .catch((failure) => {
            if (active)
              setState((current) => ({
                ...current,
                loading: false,
                error: failure.response?.data?.error || 'Unable to load catalog assistance.',
              }));
          });
      return () => {
        active = false;
        controller.abort();
      };
    }, [userId, revision]);
    async function ask(question, search) {
      if (pending.current || !userId) return;
      pending.current = true;
      setState((current) => ({
        ...current,
        busy: true,
        error: '',
      }));
      const identity = JSON.stringify([userId, question, search]);
      if (key.current?.identity !== identity)
        key.current = {
          owner: userId,
          identity,
          value: uuid(),
        };
      try {
        const { data } = await api.post('/account/catalog-assistance', {
          question,
          search,
          requestKey: key.current.value,
        });
        if (owner.current === userId) {
          setState((current) => ({
            ...current,
            reply: data,
            history: [data, ...current.history.filter((row) => row.id !== data.id)],
            busy: false,
          }));
          key.current = null;
        }
      } catch (failure) {
        if (owner.current === userId)
          setState((current) => ({
            ...current,
            busy: false,
            error: failure.response?.data?.error || 'Unable to search the catalog. Please retry.',
          }));
      } finally {
        pending.current = false;
      }
    }
    return {
      ...(state.owner === userId
        ? state
        : {
            history: [],
            reply: null,
            loading: !!userId,
            busy: false,
            error: '',
          }),
      ask,
      retry: () => setRevision((value) => value + 1),
    };
  };
}
