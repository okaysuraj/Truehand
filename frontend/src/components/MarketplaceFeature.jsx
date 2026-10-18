import { createMarketplaceFeatureHook } from '../../../shared/marketplace-state';
import { catalogFilters } from '../../../shared/feature-requests';
import Form, { ChoicePages } from './marketplace/FeatureForm';
import FeatureRecord from './marketplace/FeatureRecord';
import React from 'react';
import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { formatValue, canAct } from '../../../shared/feature-contract';
import { useAuth } from '../context/AuthProvider';
import { useCart } from '../context/CartProvider';
import api from '../services/api';
const useMarketplaceFeature = createMarketplaceFeatureHook(React, api, () => crypto.randomUUID());
export default function MarketplaceFeature({ feature }) {
  const navigate = useNavigate();
  const params = useParams();
  const [query] = useSearchParams();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const {
    definition,
    permitted,
    error,
    setRevision,
    notice,
    actionResult,
    requestKey,
    setActionResult,
    search,
    setSearch,
    setPage,
    filterForm,
    visibleOptions,
    optionsOwner,
    choicesRequestKey,
    choiceInfo,
    setChoicePages,
    busy,
    context,
    setFilters,
    setError,
    hasContext,
    selection,
    setSelection,
    selector,
    visibleRows,
    setBusy,
    setNotice,
    setActionEditor,
    mutate,
    pages,
    page,
    actionEditor,
    contextKey,
  } = useMarketplaceFeature({
    feature,
    user,
    initialSearch: query.get('search') || query.get('q') || '',
    category: query.get('category') || params.category,
    contextFor: (selection) => ({
      id: params.id || query.get('id') || selection,
      sellerId: params.sellerId || params.id || query.get('sellerId') || selection,
      supportId: params.supportId || params.id || query.get('supportId') || selection,
      notificationId:
        params.notificationId || params.id || query.get('notificationId') || selection,
      orderId: params.orderId || params.id || query.get('orderId') || selection,
      fulfillmentId: params.fulfillmentId || params.id || selection,
      userId: user?.id,
      productId: params.productId || params.id || query.get('productId') || selection,
      collectionId: params.collectionId || params.id || query.get('collectionId') || selection,
    }),
  });
  return (
    <main className="pt-28 pb-20 px-6 max-w-6xl mx-auto min-h-screen space-y-6">
      <Link className="block underline" to="/features">
        All features
      </Link>
      <h1 className="font-display-lg text-4xl text-forest-green">{definition.title}</h1>
      {definition.description && <p>{definition.description}</p>}
      {!definition.public && !user ? (
        <Link to="/login">Sign in to continue</Link>
      ) : !permitted ? (
        <p>This feature requires the appropriate account role.</p>
      ) : (
        <>
          {error && (
            <div role="alert">
              {error}{' '}
              <button className="underline" onClick={() => setRevision((value) => value + 1)}>
                Retry
              </button>
            </div>
          )}
          {notice && <p role="status">{notice}</p>}
          {actionResult?.owner === requestKey && (
            <dl className="border p-4 space-y-2">
              {actionResult.columns.map((column) => (
                <div key={column.key}>
                  <dt>{column.label}</dt>
                  <dd>{formatValue(actionResult.data[column.key], column.format)}</dd>
                </div>
              ))}
              {actionResult.data.checkoutUrl && (
                <a
                  className="block underline"
                  href={actionResult.data.checkoutUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open secure checkout
                </a>
              )}
              <button onClick={() => setActionResult(null)}>Hide details</button>
            </dl>
          )}
          {definition.search && (
            <label className="block">
              Search products
              <input
                className="block w-full border p-3"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(0);
                }}
              />
            </label>
          )}
          {definition.search && (
            <Form
              definition={filterForm}
              options={visibleOptions}
              choiceInfo={optionsOwner === choicesRequestKey ? choiceInfo : {}}
              onChoicePage={(source, next) =>
                setChoicePages((current) => ({
                  ...current,
                  [source]: next,
                }))
              }
              busy={busy}
              onSubmit={(form, values) => {
                try {
                  const applied = catalogFilters(form, values, context);
                  setFilters(applied);
                  setPage(0);
                  setError('');
                } catch (failure) {
                  setError(failure.message);
                }
              }}
            />
          )}
          {!hasContext && (
            <label className="block">
              Choose a record
              <select
                className="block w-full border p-3"
                value={selection}
                onChange={(event) => setSelection(event.target.value)}
              >
                <option value="">Choose a record</option>
                {(visibleOptions[selector] || []).map((option) => (
                  <option key={option.id} value={option.id}>
                    {option[definition.contextLabel || 'name']}
                  </option>
                ))}
              </select>
            </label>
          )}
          {!hasContext && (
            <ChoicePages
              source={selector}
              info={optionsOwner === choicesRequestKey ? choiceInfo[selector] : null}
              onPage={(next) =>
                setChoicePages((current) => ({
                  ...current,
                  [selector]: next,
                }))
              }
            />
          )}
          {hasContext && visibleRows === null && !error && <p role="status">Loading...</p>}
          {visibleRows?.length === 0 && <p>No records yet.</p>}
          <div
            className={
              definition.kind === 'products'
                ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3'
                : 'space-y-6'
            }
          >
            {visibleRows?.map((row, index) => (
              <FeatureRecord
                key={row.id ?? row.categoryId ?? index}
                row={row}
                definition={definition}
                busy={busy}
                setBusy={setBusy}
                navigate={navigate}
                addToCart={addToCart}
                setNotice={setNotice}
                setError={setError}
                user={user}
                setActionEditor={setActionEditor}
                requestKey={requestKey}
                mutate={mutate}
              />
            ))}
          </div>
          {definition.kind === 'label' && visibleRows?.length > 0 && (
            <button onClick={() => window.print()}>Print delivery label</button>
          )}
          {pages > 1 && (
            <nav className="flex gap-5">
              <button disabled={page === 0} onClick={() => setPage((value) => value - 1)}>
                Previous
              </button>
              <span>
                Page {page + 1} of {pages}
              </span>
              <button disabled={page + 1 >= pages} onClick={() => setPage((value) => value + 1)}>
                Next
              </button>
            </nav>
          )}
          {actionEditor?.owner === requestKey && (
            <Form
              key={actionEditor.row.id + actionEditor.action.label}
              definition={actionEditor.action}
              initialValues={actionEditor.row}
              context={context}
              options={visibleOptions}
              choiceInfo={optionsOwner === choicesRequestKey ? choiceInfo : {}}
              onChoicePage={(source, next) =>
                setChoicePages((current) => ({
                  ...current,
                  [source]: next,
                }))
              }
              busy={busy}
              onSubmit={(form, values, reset) =>
                mutate(
                  form,
                  values,
                  () => {
                    reset();
                    setActionEditor(null);
                  },
                  actionEditor.row,
                )
              }
            />
          )}
          {definition.form &&
            user &&
            hasContext &&
            (!definition.form.prefill || visibleRows?.length > 0) &&
            (!definition.form.roles || definition.form.roles.includes(user.role)) &&
            canAct(definition.form, visibleRows?.[0] || {}, user) && (
              <Form
                key={feature + contextKey}
                definition={definition.form}
                initialValues={definition.form.prefill ? visibleRows?.[0] : undefined}
                context={context}
                options={visibleOptions}
                choiceInfo={optionsOwner === choicesRequestKey ? choiceInfo : {}}
                onChoicePage={(source, next) =>
                  setChoicePages((current) => ({
                    ...current,
                    [source]: next,
                  }))
                }
                busy={busy}
                onSubmit={mutate}
              />
            )}
          {definition.form && !user && <Link to="/login">Sign in to submit</Link>}
        </>
      )}
    </main>
  );
}
