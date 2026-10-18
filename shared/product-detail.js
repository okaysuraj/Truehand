// Loads product details, variant choices, and availability for the selected product.
import { selectedProduct, variantLabel } from './cart-contract';
export { selectedProduct, variantLabel };
export function createProductDetailHook(React, api) {
  return function useProductDetail(id, userId) {
    const [state, setState] = React.useState({
      id: null,
      product: null,
      reviews: [],
      questions: [],
      gallery: [],
      recommendations: [],
      error: '',
      loading: true,
    });
    const [revision, setRevision] = React.useState(0);
    React.useEffect(() => {
      const controller = new AbortController();
      let active = true;
      setState({
        id,
        product: null,
        reviews: [],
        questions: [],
        gallery: [],
        recommendations: [],
        error: '',
        loading: true,
      });
      (async () => {
        try {
          const product = (await api.get(`/products/${id}`, { signal: controller.signal })).data;
          if (!active) return;
          setState((value) => ({ ...value, product, loading: false }));
          const paths = [
            'reviews/product/' + id,
            'questions/product/' + id,
            'products/' + id + '/gallery',
            'products/' + id + '/recommendations',
          ];
          const results = await Promise.allSettled(
            paths.map((path) => api.get('/' + path, { signal: controller.signal })),
          );
          if (active)
            setState((value) => ({
              ...value,
              ...Object.fromEntries(
                ['reviews', 'questions', 'gallery', 'recommendations'].map((key, index) => [
                  key,
                  results[index].status === 'fulfilled' ? results[index].value.data : [],
                ]),
              ),
              error: results.some((result) => result.status === 'rejected')
                ? 'Some product information could not be loaded. Please retry.'
                : '',
            }));
        } catch (failure) {
          if (active)
            setState((value) => ({
              ...value,
              error: failure.response?.data?.error || 'Unable to load this product. Please retry.',
              loading: false,
            }));
        }
      })();
      return () => {
        active = false;
        controller.abort();
      };
    }, [id, userId, revision]);
    React.useEffect(() => {
      if (userId && id) api.post(`/products/${id}/view`).catch(() => {});
    }, [id, userId]);
    return {
      ...(String(state.id) === String(id)
        ? state
        : {
            product: null,
            loading: true,
            reviews: [],
            questions: [],
            gallery: [],
            recommendations: [],
          }),
      reload: () => setRevision((value) => value + 1),
    };
  };
}
