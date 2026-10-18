// Coordinates product file uploads and displays validation results before importing.
export const importInstructions =
  'Upload UTF-8 CSV with these headers in order: name,description,category,price,stockQuantity,imageUrl. Use existing category names, INR prices and HTTPS image URLs. Maximum 500 products and 2 MB. Products require approval after importing.';
export function createProductImportHook(React, api, makeFile, uuid) {
  return function useProductImport(user) {
    const [state, setState] = React.useState({
      owner: null,
      file: null,
      key: null,
      result: null,
      error: '',
      busy: false,
    });
    const owner = React.useRef(user?.id);
    owner.current = user?.id;
    const busy = React.useRef(false);
    const visible =
      state.owner === user?.id
        ? state
        : {
            owner: user?.id,
            file: null,
            key: null,
            result: null,
            error: '',
            busy: false,
          };
    const currentKey = React.useRef(visible.key);
    currentKey.current = visible.key;
    const select = (file) =>
      setState({
        owner: user?.id,
        file,
        key: uuid(),
        result: null,
        error: '',
        busy: false,
      });
    async function submit(preview) {
      if (busy.current || !visible.file) return;
      busy.current = true;
      setState((current) => ({
        ...current,
        busy: true,
        error: '',
      }));
      const userId = user?.id;
      const body = new FormData();
      body.append('file', makeFile(visible.file));
      try {
        const { data } = await api.post('/products/bulk-upload', body, {
          headers: {
            'Content-Type': undefined,
          },
          params: {
            preview,
            requestKey: visible.key,
          },
        });
        if (owner.current === userId && currentKey.current === visible.key)
          setState((current) => ({
            ...current,
            result: data,
            busy: false,
          }));
      } catch (failure) {
        if (owner.current === userId && currentKey.current === visible.key)
          setState((current) => ({
            ...current,
            result: failure.response?.data?.errors ? failure.response.data : null,
            error:
              failure.response?.data?.error ||
              'Import did not complete. Review the errors or retry.',
            busy: false,
          }));
      } finally {
        busy.current = false;
      }
    }
    return {
      ...visible,
      permitted: ['SELLER', 'ADMIN'].includes(user?.role),
      select,
      submit,
    };
  };
}
