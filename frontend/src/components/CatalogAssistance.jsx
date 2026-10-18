import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import api from '../services/api';
import { createCatalogAssistanceHook } from '../../../shared/catalog-assistance';
import { formatValue } from '../../../shared/feature-contract';
const useAssistance = createCatalogAssistanceHook(React, api, () => crypto.randomUUID());
export default function CatalogAssistance() {
  const { user } = useAuth();
  const state = useAssistance(user?.id);
  const [question, setQuestion] = useState('');
  const [search, setSearch] = useState('');
  return (
    <main className="pt-28 pb-20 px-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-4xl font-display-lg">Catalog assistant</h1>
      <p>
        Find products using catalog names, descriptions and your budget. Results come from available
        database records.
      </p>
      {!user ? (
        <Link to="/login">Sign in to continue</Link>
      ) : (
        <>
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              state.ask(question, search);
            }}
          >
            <label className="block">
              What are you looking for?
              <textarea
                className="block border p-3 w-full"
                required
                maxLength={1000}
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
              />
            </label>
            <label className="block">
              Exact search terms (optional)
              <input
                className="block border p-3 w-full"
                maxLength={200}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
            <button className="border p-3" disabled={state.busy}>
              Search catalog
            </button>
          </form>
          {state.error && (
            <p role="alert">
              {state.error} <button onClick={state.retry}>Retry</button>
            </p>
          )}
          {state.loading && <p>Loading history...</p>}
          {state.reply && (
            <section className="space-y-4">
              <p>Catalog query: {state.reply.catalogQuery}</p>
              <p>{state.reply.response}</p>
              {state.reply.products.map((product) => (
                <article className="border-b py-4" key={product.id}>
                  {product.imageUrl && (
                    <img className="h-48" src={product.imageUrl} alt={product.name} />
                  )}
                  <Link className="block underline" to={`/product/${product.id}`}>
                    {product.name}
                  </Link>
                  <p>
                    {formatValue(product.price, 'money')} · Stock {product.stockQuantity}
                  </p>
                </article>
              ))}
            </section>
          )}
          <Link className="block underline" to="/features/support">
            Contact support
          </Link>
          <h2 className="text-2xl">Previous requests</h2>
          {state.history.map((row) => (
            <article key={row.id} className="border-b py-3">
              <p>{row.question}</p>
              <p>Catalog query: {row.catalogQuery}</p>
              <p>{row.response}</p>
              <p>{formatValue(row.createdAt, 'date')}</p>
            </article>
          ))}
          {!state.loading && !state.history.length && <p>No requests yet.</p>}
        </>
      )}
    </main>
  );
}
