import React from 'react';
import { Link } from 'react-router-dom';
import { substitute, formatValue, canAct, valueAt } from '../../../../shared/feature-contract';
// Display a record and the actions permitted by its feature and account role.
export default function FeatureRecord({
  row,
  definition,
  busy,
  setBusy,
  navigate,
  addToCart,
  setNotice,
  setError,
  user,
  setActionEditor,
  requestKey,
  mutate,
}) {
  return (
    <article className="border-b py-5 space-y-3">
      {definition.kind === 'products' && row.imageUrl && (
        <Link to={`/product/${row.id}`}>
          <img
            loading="lazy"
            className="w-full h-56 object-cover"
            src={row.imageUrl}
            alt={row.name}
          />
        </Link>
      )}
      <dl className="space-y-2">
        {definition.columns.map((column) => (
          <div key={column.key}>
            {column.format === 'link' ? (
              <a className="underline" href={row[column.key]} target="_blank" rel="noreferrer">
                Open document
              </a>
            ) : column.format === 'image' ? (
              row[column.key] && (
                <img
                  loading="lazy"
                  className="max-h-72 object-contain"
                  src={row[column.key]}
                  alt={definition.title}
                />
              )
            ) : (
              <>
                <dt className="text-sm text-on-surface-variant">{column.label}</dt>
                <dd className="whitespace-pre-wrap">
                  {formatValue(valueAt(row, column.key), column.format)}
                </dd>
              </>
            )}
          </div>
        ))}
      </dl>
      {definition.kind === 'products' && (
        <>
          <Link className="block underline" to={`/product/${row.id}`}>
            View product
          </Link>
          <button
            disabled={
              busy ||
              row.stockQuantity <= 0 ||
              row.acceptingOrders === false ||
              row.isAvailable === false
            }
            className="border px-4 py-2"
            onClick={async () => {
              setBusy(true);
              try {
                if (row.variants?.length) {
                  navigate(`/product/${row.id}`);
                  return;
                }
                const result = await addToCart(row);
                if (result !== false) setNotice('Added to cart.');
              } catch (failure) {
                setError(failure.message || 'Unable to add to cart.');
              } finally {
                setBusy(false);
              }
            }}
          >
            {row.variants?.length ? 'Choose options' : 'Add to cart'}
          </button>
        </>
      )}
      {user?.id === row.sellerId && row.hasVariants && (
        <Link className="block underline" to={`/features/variants?productId=${row.id}`}>
          Manage SKU stock
        </Link>
      )}
      {definition.kind === 'categories' && (
        <Link className="block underline" to={`/products?category=${encodeURIComponent(row.name)}`}>
          Browse category
        </Link>
      )}
      {definition.kind === 'locations' && row.latitude != null && row.longitude != null && (
        <a
          className="block underline"
          target="_blank"
          rel="noreferrer"
          href={`https://www.openstreetmap.org/?mlat=${encodeURIComponent(row.latitude)}&mlon=${encodeURIComponent(row.longitude)}#map=16/${encodeURIComponent(row.latitude)}/${encodeURIComponent(row.longitude)}`}
        >
          Open reported location
        </a>
      )}
      {definition.detail && (
        <Link className="block underline" to={substitute(definition.detail.web, row)}>
          View details
        </Link>
      )}
      <div className="flex gap-3 flex-wrap">
        {definition.actions
          ?.filter((action) => canAct(action, row, user))
          .map((action) => (
            <button
              className="border px-4 py-2"
              key={action.label}
              disabled={busy}
              onClick={() =>
                action.fields
                  ? setActionEditor({
                      action,
                      row,
                      owner: requestKey,
                    })
                  : mutate(action, {}, undefined, row)
              }
            >
              {action.label}
            </button>
          ))}
      </div>
    </article>
  );
}
