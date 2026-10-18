// Quotes promotions against the current checkout contents and discards stale quotes.
import { checkoutLines, checkoutFingerprint } from './cart-contract';
export function createPromoQuoteHook(React, api) {
  return function usePromoQuote(userId, items) {
    const [code, setDraft] = React.useState('');
    const [state, setState] = React.useState({
      quote: null,
      busy: false,
      error: '',
    });
    const identity = String(userId) + ':' + checkoutFingerprint(items) + ':' + code;
    const current = React.useRef(identity);
    const pending = React.useRef(false);
    current.current = identity;
    React.useEffect(() => {
      setDraft('');
      setState({
        quote: null,
        busy: false,
        error: '',
      });
    }, [userId]);
    const valid = state.identity === identity;
    function setCode(value) {
      setDraft(value);
      setState({
        quote: null,
        busy: false,
        error: '',
      });
    }
    async function apply() {
      if (!userId || !code.trim() || pending.current) return;
      const requestIdentity = identity;
      pending.current = true;
      setState({
        identity,
        quote: null,
        busy: true,
        error: '',
      });
      try {
        const { data } = await api.post('/promo/quote', {
          code: code.trim(),
          orderItems: checkoutLines(items),
        });
        if (current.current === requestIdentity)
          setState({
            identity: requestIdentity,
            quote: data,
            busy: false,
            error: '',
          });
      } catch (failure) {
        if (current.current === requestIdentity)
          setState({
            identity: requestIdentity,
            quote: null,
            busy: false,
            error: failure.response?.data?.error || 'Unable to apply this offer. Please retry.',
          });
      } finally {
        pending.current = false;
      }
    }
    return {
      code,
      setCode,
      apply,
      quote: valid ? state.quote : null,
      discount: valid ? Number(state.quote?.discountAmount || 0) : 0,
      busy: valid && state.busy,
      error: valid ? state.error : '',
    };
  };
}
