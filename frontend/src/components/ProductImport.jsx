import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import api from '../services/api';
import { createProductImportHook, importInstructions } from '../../../shared/product-import';
const useImport = createProductImportHook(
  React,
  api,
  (file) => file,
  () => crypto.randomUUID(),
);
export default function ProductImport() {
  const { user } = useAuth();
  const state = useImport(user);
  return (
    <main className="pt-28 pb-20 px-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-4xl font-display-lg">Import products</h1>
      {!user ? (
        <Link to="/login">Sign in to import products</Link>
      ) : !state.permitted ? (
        <p>Seller access required.</p>
      ) : (
        <>
          <p>{importInstructions}</p>
          <Link className="underline" to="/features/categories">
            View existing categories
          </Link>
          <input
            type="file"
            accept=".csv,text/csv"
            disabled={state.busy}
            onChange={(event) => state.select(event.target.files[0])}
          />
          {state.file && (
            <button
              className="block border p-3"
              disabled={state.busy}
              onClick={() => state.submit(true)}
            >
              Validate and preview
            </button>
          )}
          {state.error && <p role="alert">{state.error}</p>}
          {state.result?.errors?.map((error) => (
            <p role="alert" key={error.row}>
              Row {error.row}: {error.error}
            </p>
          ))}
          {state.result?.rows && (
            <>
              <p>Validated {state.result.rows.length} products.</p>
              {state.result.rows.map((row, index) => (
                <article className="border-b p-3" key={index}>
                  <p>{row.name}</p>
                  <p>
                    {row.category} · INR {Number(row.price).toFixed(2)} · Stock {row.stockQuantity}
                  </p>
                </article>
              ))}
            </>
          )}
          {state.result?.valid && state.result?.rows && (
            <button
              className="border p-3"
              disabled={state.busy}
              onClick={() => state.submit(false)}
            >
              Import validated products
            </button>
          )}
          {state.result?.createdCount > 0 && (
            <p role="status">
              Imported {state.result.createdCount} products. Product IDs:{' '}
              {state.result.productIds.join(', ')}.
            </p>
          )}
          {state.busy && <p role="status">Processing...</p>}
        </>
      )}
    </main>
  );
}
