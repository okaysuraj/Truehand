// Loads one order and refreshes it after an allowed order action.
export function createOrderDetailHook(React, api) {
  return function useOrderDetail(id, userId, enabled = true) {
    const scope = JSON.stringify([id, userId, enabled]);
    const current = React.useRef(scope);
    const generation = React.useRef(0);
    const pending = React.useRef(null);
    const mounted = React.useRef(false);
    if (current.current !== scope) {
      current.current = scope;
      generation.current++;
    }
    const [state, setState] = React.useState({
      owner: scope,
      order: null,
      loading: false,
      busy: false,
      error: '',
    });
    const [revision, setRevision] = React.useState(0);
    React.useEffect(() => {
      const controller = new AbortController();
      const ticket = ++generation.current;
      mounted.current = true;
      const valid = () =>
        !controller.signal.aborted && current.current === scope && generation.current === ticket;
      setState({
        owner: scope,
        order: null,
        loading: !!(id && userId && enabled),
        busy: false,
        error: !id && enabled ? 'Select an order.' : '',
      });
      if (id && userId && enabled)
        api
          .get('/orders/' + encodeURIComponent(id), {
            signal: controller.signal,
          })
          .then(({ data }) => {
            if (valid())
              setState({
                owner: scope,
                order: data,
                loading: false,
                busy: false,
                error: '',
              });
          })
          .catch((failure) => {
            if (valid())
              setState({
                owner: scope,
                order: null,
                loading: false,
                busy: false,
                error: failure.response?.data?.error || 'Unable to load this order. Please retry.',
              });
          });
      return () => {
        controller.abort();
        mounted.current = false;
        generation.current++;
      };
    }, [scope, revision]);
    const visible =
      state.owner === scope && enabled
        ? state
        : {
            order: null,
            loading: !!(id && userId && enabled),
            busy: false,
            error: '',
          };
    const canResume = !!(
      visible.order &&
      Number(visible.order.userId) === Number(userId) &&
      visible.order.status === 'PENDING' &&
      visible.order.paymentStatus === 'PENDING'
    );
    const actionTicket = generation.current;
    async function cancel() {
      if (
        !canResume ||
        !mounted.current ||
        generation.current !== actionTicket ||
        current.current !== scope ||
        pending.current === scope
      )
        return false;
      const ticket = generation.current;
      pending.current = scope;
      const valid = () =>
        mounted.current && current.current === scope && generation.current === ticket;
      setState((value) => ({
        ...value,
        busy: true,
        error: '',
      }));
      try {
        const { data } = await api.post(
          '/payment/orders/' + encodeURIComponent(visible.order.id) + '/cancel',
        );
        if (valid())
          setState({
            owner: scope,
            order: data,
            loading: false,
            busy: false,
            error: '',
          });
        return valid();
      } catch (failure) {
        if (valid())
          setState((value) => ({
            ...value,
            busy: false,
            error: failure.response?.data?.error || 'Unable to cancel this order. Please retry.',
          }));
        return false;
      } finally {
        if (pending.current === scope) pending.current = null;
      }
    }
    return {
      ...visible,
      canResume,
      cancel,
      retry: () => setRevision((value) => value + 1),
      resumeOrder: () =>
        canResume &&
        mounted.current &&
        generation.current === actionTicket &&
        current.current === scope
          ? visible.order
          : null,
    };
  };
}
