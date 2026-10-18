import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import api from '../services/api';
import { createImageSearchHook } from '../../../shared/image-search';
import { formatValue } from '../../../shared/feature-contract';
const uploadApi = {
  get: (path, options) => api.get(path, options),
  post: (path, body) =>
    api.post(path, body, {
      headers: {
        'Content-Type': undefined,
      },
    }),
};
const useImageSearch = createImageSearchHook(React, uploadApi, (file) => file);
export default function ImageSearch() {
  const { user } = useAuth();
  const state = useImageSearch(user?.id);
  const [preview, setPreview] = useState('');
  useEffect(() => {
    if (!state.file) {
      setPreview('');
      return;
    }
    const url = URL.createObjectURL(state.file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [state.file]);
  return (
    <main className="pt-28 pb-20 px-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-4xl font-display-lg">Search by photograph</h1>
      <p>
        Compare colour and edges with product photographs uploaded to TrueHand. JPEG, PNG and WebP
        up to 10 MB are supported.
      </p>
      {!user ? (
        <Link to="/login">Sign in to search photographs</Link>
      ) : (
        <>
          <label className="block">
            Photograph
            <input
              className="block"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              disabled={state.busy}
              onChange={(event) => state.select(event.target.files[0])}
            />
          </label>
          {preview && state.file && (
            <img className="max-h-72" src={preview} alt="Selected search photograph" />
          )}
          <button
            className="border p-3"
            disabled={state.busy || !state.file}
            onClick={state.search}
          >
            {state.busy ? 'Searching...' : 'Find visually similar products'}
          </button>
          {state.error && <p role="alert">{state.error}</p>}
          {state.result && (
            <>
              <p>{state.result.method}</p>
              {!state.result.matches.length && (
                <p>
                  No indexed catalog photographs matched. Try another angle or search by product
                  name.
                </p>
              )}
              {state.result.matches.map((match) => (
                <article className="border-b py-4 space-y-3" key={match.productId}>
                  {match.product.imageUrl && (
                    <img className="h-56" src={match.product.imageUrl} alt={match.product.name} />
                  )}
                  <Link className="block underline" to={`/product/${match.productId}`}>
                    {match.product.name}
                  </Link>
                  <p>
                    {formatValue(match.product.price, 'money')} · Stock{' '}
                    {match.product.stockQuantity}
                  </p>
                  <p>
                    Edge difference: {match.edgeDifference}; colour difference:{' '}
                    {match.colourDifference}
                  </p>
                </article>
              ))}
            </>
          )}
          <Link className="block underline" to="/products">
            Search catalog by name
          </Link>
          <h2 className="text-2xl">Previous photograph searches</h2>
          {state.loading && <p>Loading history...</p>}
          {state.history.map((row) => (
            <p key={row.id}>
              {formatValue(row.createdAt, 'date')} · {row.matchCount} matches
            </p>
          ))}
          {!state.loading && !state.history.length && <p>No previous photograph searches.</p>}
        </>
      )}
    </main>
  );
}
