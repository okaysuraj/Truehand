// Checks service availability and provides a retryable status for both clients.
export function createServiceStatusHook(React, api) {
  return function useServiceStatus() {
    const [state, setState] = React.useState({
      loading: true,
      data: null,
      error: '',
    });
    const [revision, setRevision] = React.useState(0);
    React.useEffect(() => {
      let active = true;
      const controller = new AbortController();
      setState({
        loading: true,
        data: null,
        error: '',
      });
      api
        .get('/community/platform-status', {
          signal: controller.signal,
        })
        .then(({ data }) => {
          if (active)
            setState({
              loading: false,
              data,
              error: '',
            });
        })
        .catch(() => {
          if (active)
            setState({
              loading: false,
              data: null,
              error: 'Unable to connect to TrueHand. Check your connection and retry.',
            });
        });
      return () => {
        active = false;
        controller.abort();
      };
    }, [revision]);
    return {
      ...state,
      retry: () => setRevision((value) => value + 1),
    };
  };
}
