// Loads account preferences and keeps updates tied to the account that requested them.
import settings from './account-settings.json';
export function createAccountSettingsHook(React, api) {
  return function useAccountSettings(userId) {
    const [state, setState] = React.useState({
      owner: null,
      preferences: null,
      error: '',
      loading: false,
    });
    const [busy, setBusy] = React.useState(false);
    const [revision, setRevision] = React.useState(0);
    const owner = React.useRef(userId);
    owner.current = userId;
    React.useEffect(() => {
      let active = true;
      const controller = new AbortController();
      setState({
        owner: userId,
        preferences: null,
        error: '',
        loading: !!userId,
      });
      if (userId)
        api
          .get(`/notifications/preferences/${userId}`, {
            signal: controller.signal,
          })
          .then(({ data }) => {
            if (active)
              setState({
                owner: userId,
                preferences: data,
                error: '',
                loading: false,
              });
          })
          .catch((failure) => {
            if (active)
              setState({
                owner: userId,
                preferences: null,
                error: failure.response?.data?.error || 'Unable to load preferences. Please retry.',
                loading: false,
              });
          });
      return () => {
        active = false;
        controller.abort();
      };
    }, [userId, revision]);
    const save = async (preferences) => {
      if (busy || !userId) return;
      setBusy(true);
      try {
        const { data } = await api.post(`/notifications/preferences/${userId}`, preferences);
        if (owner.current === userId)
          setState({
            owner: userId,
            preferences: data,
            error: '',
            loading: false,
          });
      } catch (failure) {
        if (owner.current === userId)
          setState((current) => ({
            ...current,
            error: failure.response?.data?.error || 'Preferences were not saved. Please retry.',
          }));
      } finally {
        setBusy(false);
      }
    };
    return {
      ...(state.owner === userId
        ? state
        : {
            preferences: null,
            error: '',
            loading: !!userId,
          }),
      busy,
      save,
      retry: () => setRevision((value) => value + 1),
    };
  };
}
export function updatePreference(preferences, category, channel, value) {
  if (
    !Object.hasOwn(settings.notificationCategories, category) ||
    !['email', 'push', 'sms'].includes(channel)
  )
    throw new Error('Unknown notification preference.');
  return {
    ...preferences,
    [category]: {
      ...preferences[category],
      [channel]: value,
    },
  };
}
