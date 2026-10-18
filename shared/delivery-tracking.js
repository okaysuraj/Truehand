// Coordinates delivery tracking, allowed actions, and explicitly enabled location sharing.
export function createDeliveryTrackingHook(React, api) {
  return function useDeliveryTracking(id, userId) {
    const [state, setState] = React.useState({
      key: '',
      delivery: null,
      events: [],
      error: '',
      loading: true,
    });
    const [revision, setRevision] = React.useState(0);
    const key = String(id) + ':' + String(userId);
    React.useEffect(() => {
      let active = true;
      let timer;
      const controller = new AbortController();
      setState({
        key,
        delivery: null,
        events: [],
        error: '',
        loading: !!id && !!userId,
      });
      if (!id || !userId) return () => controller.abort();
      async function load() {
        try {
          const delivery = (
            await api.get(`/deliveries/${id}`, {
              signal: controller.signal,
            })
          ).data;
          const events = (
            await api.get(`/orders/${id}/timeline`, {
              signal: controller.signal,
            })
          ).data;
          if (active)
            setState({
              key,
              delivery,
              events,
              error: '',
              loading: false,
            });
        } catch (failure) {
          if (active)
            setState((value) => ({
              ...value,
              error: failure.response?.data?.error || 'Unable to load delivery. Please retry.',
              loading: false,
            }));
        } finally {
          if (active) timer = setTimeout(load, 10000);
        }
      }
      load();
      return () => {
        active = false;
        clearTimeout(timer);
        controller.abort();
      };
    }, [id, userId, revision]);
    return {
      ...(state.key === key
        ? state
        : {
            delivery: null,
            events: [],
            loading: !!id && !!userId,
            error: '',
          }),
      reload: () => setRevision((value) => value + 1),
    };
  };
}
export function canManageDelivery(delivery, user) {
  return (
    !!delivery &&
    !!user &&
    (['ADMIN'].includes(user.role) ||
      (user.role === 'DELIVERY' && delivery.deliveryBoy?.id === user.id))
  );
}
export function canShareDeliveryLocation(delivery, user) {
  return (
    delivery?.status === 'IN_TRANSIT' &&
    user?.role === 'DELIVERY' &&
    Number(delivery.deliveryBoy?.id) === Number(user.id)
  );
}
export function deliveryActionEndpoint(id, action) {
  if (!['start', 'handover-code', 'verify-otp', 'complete'].includes(action))
    throw new Error('Unknown delivery action.');
  return `/deliveries/${encodeURIComponent(id)}/${action}`;
}
export function createLocationSharingHook(React, api, watch) {
  return function useLocationSharing(id, user, delivery, foreground = true) {
    const [requested, setRequested] = React.useState('');
    const [status, setStatus] = React.useState({
      key: '',
      error: '',
      lastSent: null,
    });
    const key = String(id) + ':' + String(user?.id);
    const enabled = requested === key && canShareDeliveryLocation(delivery, user) && foreground;
    React.useEffect(() => {
      if (!foreground || !canShareDeliveryLocation(delivery, user)) setRequested('');
    }, [foreground, id, user?.id, delivery?.status, delivery?.deliveryBoy?.id]);
    React.useEffect(() => {
      let active = true;
      let stop;
      let inFlight = false;
      let lastSent = 0;
      const controller = new AbortController();
      setStatus({
        key,
        error: '',
        lastSent: null,
      });
      if (!enabled) return () => controller.abort();
      const failed = (failure) => {
        if (active)
          setStatus((current) => ({
            ...current,
            key,
            error:
              failure.response?.data?.error ||
              failure.message ||
              'Unable to share location. Please retry.',
          }));
      };
      Promise.resolve()
        .then(() =>
          watch(async (coords) => {
            if (!active || inFlight || Date.now() - lastSent < 10000) return;
            if (
              !Number.isFinite(coords.latitude) ||
              !Number.isFinite(coords.longitude) ||
              !Number.isFinite(coords.accuracy)
            ) {
              failed(new Error('The device did not report valid GPS coordinates.'));
              return;
            }
            inFlight = true;
            lastSent = Date.now();
            try {
              await api.post(`/deliveries/${encodeURIComponent(id)}/location`, null, {
                signal: controller.signal,
                params: {
                  latitude: coords.latitude,
                  longitude: coords.longitude,
                  accuracy: coords.accuracy,
                },
              });
              if (active)
                setStatus({
                  key,
                  error: '',
                  lastSent: new Date().toISOString(),
                });
            } catch (failure) {
              failed(failure);
            } finally {
              inFlight = false;
            }
          }, failed),
        )
        .then((unsubscribe) => {
          stop = unsubscribe;
          if (!active) stop();
        })
        .catch((failure) => {
          failed(failure);
          if (active) setRequested('');
        });
      return () => {
        active = false;
        controller.abort();
        stop?.();
      };
    }, [enabled, key]);
    return {
      enabled,
      ...(status.key === key
        ? status
        : {
            error: '',
            lastSent: null,
          }),
      toggle: () => setRequested((current) => (current === key ? '' : key)),
    };
  };
}
export function mapLink(point) {
  return `https://www.openstreetmap.org/?mlat=${encodeURIComponent(point.latitude)}&mlon=${encodeURIComponent(point.longitude)}#map=16/${encodeURIComponent(point.latitude)}/${encodeURIComponent(point.longitude)}`;
}
