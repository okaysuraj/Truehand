// Keeps checkout retries idempotent and prevents order work from crossing account sessions.
import { checkoutLines, checkoutFingerprint } from './cart-contract';
import { records, pageInfo } from './feature-contract';
export function createOrderState({ orderService, cart, auth, api, uuid }) {
  function session() {
    const user = auth.getState().user;
    if (!user?.id) throw new Error('Sign in before managing orders.');
    const current = () => auth.getState().user === user;
    const assert = (order) => {
      if (!current()) throw new Error('Your account changed. Please retry.');
      if (order && Number(order.userId) !== Number(user.id))
        throw new Error('This order belongs to another account.');
    };
    return {
      user,
      current,
      assert,
    };
  }
  return (set, get) => ({
    orders: [],
    ordersPage: {
      number: 0,
      totalPages: 1,
      totalElements: 0,
    },
    isLoadingOrders: false,
    errorOrders: null,
    currentOrder: null,
    isCreatingOrder: false,
    createOrderError: null,
    checkoutData: {
      address: null,
      paymentMethod: null,
    },
    resetForAccount: () =>
      set({
        orders: [],
        ordersPage: {
          number: 0,
          totalPages: 1,
          totalElements: 0,
        },
        isLoadingOrders: false,
        errorOrders: null,
        currentOrder: null,
        isCreatingOrder: false,
        createOrderError: null,
        checkoutData: {
          address: null,
          paymentMethod: null,
        },
      }),
    setCheckoutData: (data) => {
      session();
      set((state) => ({
        checkoutData: {
          ...state.checkoutData,
          ...data,
        },
      }));
    },
    fetchUserOrders: async (page = 0) => {
      const owner = session();
      set({
        isLoadingOrders: true,
        errorOrders: null,
      });
      try {
        const data = await orderService.getUserOrders(page);
        owner.assert();
        const orders = records(data);
        orders.forEach(owner.assert);
        set({
          orders,
          ordersPage: pageInfo(data, page),
          isLoadingOrders: false,
        });
      } catch (error) {
        if (owner.current())
          set({
            errorOrders: error.message,
            isLoadingOrders: false,
          });
      }
    },
    createOrder: async () => {
      const owner = session();
      set({
        isCreatingOrder: true,
        createOrderError: null,
      });
      try {
        const pending = get().currentOrder;
        const state = get().checkoutData;
        if (pending) {
          owner.assert(pending);
          if (pending.paymentStatus === 'PENDING' && pending.status === 'PENDING') {
            if (
              !state.resume &&
              (state.address?.id !== pending.addressId ||
                checkoutFingerprint(cart.getState().cartItems) !==
                  checkoutFingerprint(pending.orderItems))
            )
              throw new Error(
                'Your selection changed. Cancel the reserved order before starting another checkout.',
              );
            return pending;
          }
        }
        const cartItems = cart.getState().cartItems;
        if (!state.address?.id || !cartItems.length)
          throw new Error('Select an address and add products to your cart.');
        const key = state.checkoutKey || uuid();
        set({
          checkoutData: {
            ...state,
            checkoutKey: key,
          },
        });
        const order = await orderService.createOrder({
          addressId: state.address.id,
          checkoutKey: key,
          promoCode: state.promoCode || null,
          orderItems: checkoutLines(cartItems),
        });
        owner.assert(order);
        set({
          currentOrder: order,
        });
        return order;
      } catch (error) {
        if (owner.current())
          set({
            createOrderError: error.message,
          });
        throw error;
      } finally {
        if (owner.current())
          set({
            isCreatingOrder: false,
          });
      }
    },
    completeCheckout: async (order) => {
      const owner = session();
      owner.assert(order);
      if (order.paymentStatus !== 'PAID') throw new Error('Payment is not verified.');
      await cart.getState().syncForUser(owner.user.id);
      owner.assert(order);
      set({
        currentOrder: order,
        checkoutData: {
          address: null,
          paymentMethod: null,
        },
      });
    },
    cancelCheckout: async () => {
      const owner = session();
      const order = get().currentOrder;
      owner.assert(order);
      if (order?.paymentStatus === 'PENDING')
        await api.post('/payment/orders/' + order.id + '/cancel');
      owner.assert();
      set({
        currentOrder: null,
        checkoutData: {
          address: get().checkoutData.address,
          paymentMethod: null,
        },
      });
    },
    cancelOrder: async (id, reason) => {
      const owner = session();
      const order = await orderService.cancelOrder(id, reason);
      owner.assert(order);
      set((state) => ({
        orders: state.orders.map((row) => (row.id === id ? order : row)),
        currentOrder: state.currentOrder?.id === id ? order : state.currentOrder,
      }));
      return order;
    },
    requestReturn: async (id, payload) => {
      const owner = session();
      const order = await orderService.requestReturn(id, payload);
      owner.assert(order);
      set((state) => ({
        orders: state.orders.map((row) => (row.id === id ? order : row)),
        currentOrder: state.currentOrder?.id === id ? order : state.currentOrder,
      }));
      return order;
    },
    reportIssue: async (id, payload) => {
      const owner = session();
      const response = await orderService.reportIssue(id, payload);
      owner.assert();
      return response;
    },
  });
}
