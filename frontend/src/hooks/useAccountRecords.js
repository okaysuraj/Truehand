import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import api from '../services/api';

export default function useAccountRecords(paths) {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [revision, setRevision] = useState(0);
  const key = JSON.stringify(paths);
  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    setData(null);
    setError('');
    if (user?.id)
      Promise.all(JSON.parse(key).map((path) => api.get(path, { signal: controller.signal })))
        .then((results) => {
          if (active)
            setData({ userId: user.id, key, records: results.map((result) => result.data) });
        })
        .catch((failure) => {
          if (active)
            setError(
              failure.response?.data?.error ||
                failure.response?.data?.message ||
                'Unable to load records. Please retry.',
            );
        });
    return () => {
      active = false;
      controller.abort();
    };
  }, [user?.id, key, revision]);
  return {
    user,
    data: data?.userId === user?.id && data?.key === key ? data.records : null,
    error,
    reload: () => setRevision((value) => value + 1),
  };
}
