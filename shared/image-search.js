// Uploads a selected image and loads matching catalog products.
export function createImageSearchHook(React, api, makeFile) {
  return function useImageSearch(userId) {
    const [state, setState] = React.useState({
      owner: null,
      file: null,
      result: null,
      history: [],
      loading: false,
      busy: false,
      error: '',
    });
    const owner = React.useRef(userId);
    const generation = React.useRef(0);
    const pending = React.useRef(false);
    const request = React.useRef(null);
    owner.current = userId;
    React.useEffect(() => {
      let active = true;
      const controller = new AbortController();
      generation.current++;
      setState({
        owner: userId,
        file: null,
        result: null,
        history: [],
        loading: !!userId,
        busy: false,
        error: '',
      });
      if (userId)
        api
          .get('/products/image-search/history', {
            signal: controller.signal,
          })
          .then(({ data }) => {
            if (active)
              setState((current) => ({
                ...current,
                history: data,
                loading: false,
              }));
          })
          .catch((failure) => {
            if (active)
              setState((current) => ({
                ...current,
                error: failure.response?.data?.error || 'Unable to load search history.',
                loading: false,
              }));
          });
      return () => {
        active = false;
        controller.abort();
      };
    }, [userId]);
    const visible =
      state.owner === userId
        ? state
        : {
            owner: userId,
            file: null,
            result: null,
            history: [],
            loading: !!userId,
            busy: false,
            error: '',
          };
    React.useEffect(
      () => () => {
        request.current?.abort();
        request.current = null;
        pending.current = false;
      },
      [userId],
    );
    function select(file) {
      request.current?.abort();
      request.current = null;
      pending.current = false;
      generation.current++;
      setState((current) => ({
        ...current,
        owner: userId,
        file,
        result: null,
        error: '',
        busy: false,
      }));
    }
    async function search() {
      if (!visible.file || !userId || pending.current) return;
      pending.current = true;
      const controller = new AbortController();
      request.current = controller;
      const version = generation.current;
      setState((current) => ({
        ...current,
        busy: true,
        error: '',
      }));
      try {
        const body = new FormData();
        body.append('file', makeFile(visible.file));
        const { data } = await api.post('/products/image-search', body, {
          signal: controller.signal,
          headers: {
            'Content-Type': undefined,
          },
        });
        if (owner.current === userId && generation.current === version) {
          setState((current) => ({
            ...current,
            result: data,
            busy: false,
          }));
          try {
            const history = await api.get('/products/image-search/history', {
              signal: controller.signal,
            });
            if (owner.current === userId && generation.current === version)
              setState((current) => ({
                ...current,
                history: history.data,
              }));
          } catch {
            if (owner.current === userId && generation.current === version)
              setState((current) => ({
                ...current,
                error: 'Search completed, but history could not be refreshed.',
              }));
          }
        }
      } catch (failure) {
        if (owner.current === userId && generation.current === version)
          setState((current) => ({
            ...current,
            error:
              failure.response?.data?.error || 'Unable to search this photograph. Please retry.',
            busy: false,
          }));
      } finally {
        if (request.current === controller) {
          request.current = null;
          pending.current = false;
        }
      }
    }
    return {
      ...visible,
      select,
      search,
    };
  };
}
