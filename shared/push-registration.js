// Connects notification permissions and device registration to the signed-in account.
export function createPushRegistrationHook(React, adapter) {
  return function usePushRegistration(userId) {
    const owner = React.useRef(userId);
    owner.current = userId;
    const [state, setState] = React.useState({ owner: null, busy: false, notice: '' });
    async function enable() {
      if (!userId || state.busy) return;
      setState({ owner: userId, busy: true, notice: '' });
      try {
        await adapter.register(userId);
        if (owner.current === userId)
          setState({
            owner: userId,
            busy: false,
            notice: 'This device is registered. Choose which push updates you want below.',
          });
      } catch (error) {
        if (owner.current === userId)
          setState({
            owner: userId,
            busy: false,
            notice: error.message || 'Unable to register notifications. Please retry.',
          });
      }
    }
    return { ...(state.owner === userId ? state : { busy: false, notice: '' }), enable };
  };
}
