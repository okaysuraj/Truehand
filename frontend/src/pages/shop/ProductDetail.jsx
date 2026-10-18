import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../services/api';
import { useCart } from '../../context/CartProvider';
import { useAuth } from '../../context/AuthProvider';
import {
  createProductDetailHook,
  selectedProduct,
  variantLabel,
} from '../../../../shared/product-detail';
import { formatValue } from '../../../../shared/feature-contract';
const useProductDetail = createProductDetailHook(React, api);
export default function ProductDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { product, reviews, questions, gallery, recommendations, error, loading, reload } =
    useProductDetail(id, user?.id);
  const [variantId, setVariantId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [question, setQuestion] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const variant = product?.variants?.find((item) => String(item.id) === variantId);
  const stock = variant
    ? variant.stockQuantity
    : product?.variants?.length
      ? 0
      : product?.stockQuantity;
  async function mutate(action) {
    setBusy(true);
    setMessage('');
    try {
      const result = await action();
      if (result !== false) {
        setMessage('Saved.');
        reload();
      }
    } catch (failure) {
      setMessage(
        failure.response?.data?.error || failure.message || 'Unable to save. Please retry.',
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="pt-28 pb-20 px-6 max-w-6xl mx-auto space-y-8">
      {loading && <p role="status">Loading product...</p>}
      {error && (
        <p role="alert">
          {error} <button onClick={reload}>Retry</button>
        </p>
      )}
      {message && <p role="status">{message}</p>}
      {product && (
        <>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {variant?.imageUrl && (
                <img
                  className="w-full max-h-96 object-contain"
                  src={variant.imageUrl}
                  alt={variantLabel(variant)}
                />
              )}{' '}
              {gallery.map((image, index) => (
                <img
                  key={image.id ?? index}
                  className="w-full max-h-96 object-contain"
                  src={image.imageUrl}
                  alt={image.caption || product.name}
                />
              ))}
              {!gallery.length && !variant?.imageUrl && <p>No product images provided.</p>}
            </div>
            <div className="space-y-5">
              <h1 className="font-display-lg text-4xl text-forest-green">{product.name}</h1>
              <p>{product.category}</p>
              <p>Sold by {product.sellerName}</p>
              <p>
                {formatValue(
                  Number(product.price) + Number(variant?.additionalPrice || 0),
                  'money',
                )}
              </p>
              <p>
                Rating: {product.averageRating ?? 0} / 5 ({product.reviewCount ?? 0} reviews)
              </p>
              <p className="whitespace-pre-wrap">{product.description}</p>
              {!!product.variants?.length && (
                <label className="block">
                  Product option
                  <select
                    className="block border p-3 w-full"
                    value={variantId}
                    onChange={(event) => {
                      setVariantId(event.target.value);
                      setQuantity(1);
                    }}
                  >
                    <option value="">Choose an option</option>
                    {product.variants.map((item) => (
                      <option key={item.id} value={item.id}>
                        {variantLabel(item)} ? {item.stockQuantity} in stock
                      </option>
                    ))}
                  </select>
                </label>
              )}
              <p>Stock: {stock ?? 0}</p>
              <label className="block">
                Quantity
                <input
                  className="block border p-3"
                  type="number"
                  min="1"
                  max={Math.min(stock || 1, 1000)}
                  step="1"
                  value={quantity}
                  onChange={(event) => setQuantity(Number(event.target.value))}
                />
              </label>
              <button
                className="bg-forest-green text-white p-3"
                disabled={
                  busy ||
                  !product.isAvailable ||
                  stock < quantity ||
                  quantity < 1 ||
                  !Number.isInteger(quantity)
                }
                onClick={() => mutate(() => addToCart(selectedProduct(product, variant), quantity))}
              >
                Add to cart
              </button>
              {user ? (
                <div className="flex gap-4">
                  <button
                    disabled={busy}
                    onClick={() =>
                      mutate(() => api.post(`/wishlist/user/${user.id}/product/${product.id}`))
                    }
                  >
                    Save to wishlist
                  </button>
                  <button
                    disabled={busy}
                    onClick={() => mutate(() => api.post(`/account/lists/compare/${product.id}`))}
                  >
                    Add to comparison
                  </button>
                  <button
                    disabled={busy}
                    onClick={() => mutate(() => api.post(`/account/lists/saved/${product.id}`))}
                  >
                    Save for later
                  </button>
                </div>
              ) : (
                <Link to="/login">Sign in to save products, ask questions, or review</Link>
              )}
            </div>
          </div>
          <section className="space-y-4">
            <h2 className="text-2xl">Product questions</h2>
            {!questions.length && <p>No questions yet.</p>}
            {questions.map((item) => (
              <article className="border p-4" key={item.id}>
                <p>{item.content}</p>
                <p>{item.answer || 'Awaiting a seller response.'}</p>
              </article>
            ))}
            {user && (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  mutate(async () => {
                    await api.post(`/questions/product/${product.id}/user/${user.id}`, {
                      content: question,
                    });
                    setQuestion('');
                  });
                }}
              >
                <label>
                  Question
                  <textarea
                    className="block w-full border p-3"
                    required
                    maxLength="2000"
                    value={question}
                    onChange={(event) => setQuestion(event.target.value)}
                  />
                </label>
                <button disabled={busy}>Ask question</button>
              </form>
            )}
          </section>
          <section className="space-y-4">
            <h2 className="text-2xl">Product reviews</h2>
            {!reviews.length && <p>No reviews yet.</p>}
            {reviews.map((item) => (
              <article className="border p-4" key={item.id}>
                <p>{item.userName}</p>
                <p>{item.rating} / 5</p>
                <p>{item.comment}</p>
              </article>
            ))}
            {user && (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  mutate(async () => {
                    await api.post('/reviews', {
                      productId: product.id,
                      rating,
                      comment,
                    });
                    setComment('');
                  });
                }}
              >
                <label>
                  Rating
                  <select
                    value={rating}
                    onChange={(event) => setRating(Number(event.target.value))}
                  >
                    {[1, 2, 3, 4, 5].map((value) => (
                      <option key={value}>{value}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Review
                  <textarea
                    className="block w-full border p-3"
                    required
                    maxLength="5000"
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                  />
                </label>
                <p>Reviews require a completed purchase.</p>
                <button disabled={busy}>Submit review</button>
              </form>
            )}
          </section>
          <section className="space-y-4">
            <h2 className="text-2xl">Related products</h2>
            {!recommendations.length && <p>No related products available.</p>}
            {recommendations.map((item) => (
              <Link className="block underline" to={`/product/${item.id}`} key={item.id}>
                {item.name} ? {formatValue(item.price, 'money')}
              </Link>
            ))}
          </section>
        </>
      )}
    </main>
  );
}
