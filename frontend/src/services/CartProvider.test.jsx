import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { CartProvider, useCart } from './CartProvider';

// A simple test component to consume the Cart context
const CartTestComponent = () => {
  const { cartItems, addToCart, removeFromCart, clearCart, getTotal } = useCart();

  return (
    <div>
      <span data-testid="cart-count">{cartItems.length}</span>
      <span data-testid="cart-total">{getTotal()}</span>
      <button onClick={() => addToCart({ id: 1, name: 'Mug', price: 15 }, 2)}>Add Mug</button>
      <button onClick={() => removeFromCart(1)}>Remove Mug</button>
      <button onClick={() => clearCart()}>Clear Cart</button>
    </div>
  );
};

describe('CartProvider Integration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('adds items to the cart correctly', () => {
    render(
      <CartProvider>
        <CartTestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('0');

    fireEvent.click(screen.getByText('Add Mug'));

    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('30'); // 15 * 2
  });

  it('removes items from the cart', () => {
    render(
      <CartProvider>
        <CartTestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Add Mug'));
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');

    fireEvent.click(screen.getByText('Remove Mug'));
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
  });

  it('clears the cart', () => {
    render(
      <CartProvider>
        <CartTestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Add Mug'));
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');

    fireEvent.click(screen.getByText('Clear Cart'));
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
  });
});
