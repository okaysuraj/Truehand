import definitions from './marketplace-features.json';
import { substitute, records, payload, pageInfo } from './feature-contract';
import {
  catalogFilterForm,
  recordChoiceSource,
  featureChoiceSources,
  loadFeatureChoices,
} from './feature-requests';

// Inject each client's React runtime, HTTP session, and UUID implementation.
// Request ownership prevents late responses from replacing another account or feature's data.
export function createMarketplaceFeatureHook(React, api, uuid) {
  const { useState, useRef, useEffect } = React;
  return function useMarketplaceFeature({
    feature,
    user,
    initialSearch = '',
    category,
    contextFor,
  }) {
    const requestKeys = useRef(new Map());
    const definition = definitions[feature];
    const [rows, setRows] = useState(null);
    const [options, setOptions] = useState({});
    const [error, setError] = useState('');
    const [notice, setNotice] = useState('');
    const [busy, setBusy] = useState(false);
    const [revision, setRevision] = useState(0);
    const [selection, setSelection] = useState('');
    const [search, setSearch] = useState(initialSearch);
    const [page, setPage] = useState(0);
    const [pages, setPages] = useState(1);
    const [actionEditor, setActionEditor] = useState(null);
    const [actionResult, setActionResult] = useState(null);
    const [dataOwner, setDataOwner] = useState('');
    const [optionsOwner, setOptionsOwner] = useState('');
    const context = contextFor(selection);
    const contextKey = JSON.stringify({
      ...context,
      category,
    });
    const [filters, setFilters] = useState({});
    const filtersKey = JSON.stringify(filters);
    const filterForm = catalogFilterForm;
    const selector = recordChoiceSource(definition);
    const [choicePages, setChoicePages] = useState({});
    const [choiceInfo, setChoiceInfo] = useState({});
    const choicesKey = JSON.stringify(choicePages);
    const requestKey = JSON.stringify([feature, contextKey, user?.role, search, page, filtersKey]);
    const choicesRequestKey = JSON.stringify([requestKey, choicesKey]);
    const currentRequest = useRef(requestKey);
    currentRequest.current = requestKey;
    const visibleRows = dataOwner === requestKey ? rows : null;
    const visibleOptions = optionsOwner === choicesRequestKey ? options : {};
    const permitted = !definition.roles || definition.roles.includes(user?.role);
    const hasContext = !definition.context || !!context[definition.context];
    useEffect(() => {
      let active = true;
      const controller = new AbortController();
      if (dataOwner !== requestKey) {
        setRows(null);
        setPages(1);
        setNotice('');
      }
      setError('');
      if ((!definition.public && !user) || !permitted) return () => controller.abort();
      const sources = featureChoiceSources(definition, hasContext);
      loadFeatureChoices(api, sources, context, choicePages, controller.signal)
        .then((entries) => {
          if (active) {
            setOptions(Object.fromEntries(entries.map(([source, rows]) => [source, rows])));
            setChoiceInfo(Object.fromEntries(entries.map(([source, , info]) => [source, info])));
            setOptionsOwner(choicesRequestKey);
          }
        })
        .catch((failure) => {
          if (active) setError(failure.response?.data?.error || 'Unable to load form choices.');
        });
      if (hasContext)
        api
          .get(substitute(definition.endpoint, context), {
            signal: controller.signal,
            params: definition.search
              ? {
                  search,
                  page,
                  size: 20,
                  category,
                  ...filters,
                }
              : definition.pagination
                ? {
                    page,
                    size: 20,
                    paged: true,
                  }
                : undefined,
          })
          .then(({ data }) => {
            if (active) {
              setRows(records(data));
              setDataOwner(requestKey);
              setPages(pageInfo(data, page).totalPages);
              if (page >= pageInfo(data, page).totalPages)
                setPage(pageInfo(data, page).totalPages - 1);
            }
          })
          .catch((failure) => {
            if (active)
              setError(failure.response?.data?.error || 'Unable to load records. Please retry.');
          });
      return () => {
        active = false;
        controller.abort();
      };
    }, [
      feature,
      contextKey,
      search,
      page,
      filtersKey,
      choicesKey,
      revision,
      permitted,
      hasContext,
    ]);
    useEffect(() => {
      setPage(0);
      setChoicePages({});
      setActionResult(null);
      setActionEditor(null);
      setBusy(false);
    }, [feature, contextKey, user?.role]);
    useEffect(() => {
      setSelection('');
    }, [feature, user?.id]);
    const mutate = async (form, values = {}, reset = () => {}, row = {}) => {
      setBusy(true);
      setError('');
      setNotice('');
      try {
        const identity =
          form.endpoint +
          JSON.stringify({
            ...context,
            ...row,
            ...values,
          });
        if (!requestKeys.current.has(identity)) requestKeys.current.set(identity, uuid());
        const requestContext = {
          ...context,
          ...row,
          ...values,
          requestKey: requestKeys.current.get(identity),
        };
        const response = await api[form.method || 'post'](
          substitute(form.endpoint, requestContext),
          payload(form, values, requestContext),
        );
        requestKeys.current.delete(identity);
        if (currentRequest.current !== requestKey) return;
        if (form.resultColumns || form.checkout)
          setActionResult({
            owner: requestKey,
            columns: form.resultColumns || [],
            data: response.data,
          });
        reset();
        if (definition.form?.prefill) setRows(null);
        setRevision((value) => value + 1);
        setNotice('Saved.');
      } catch (failure) {
        if (currentRequest.current === requestKey)
          setError(
            failure.response?.data?.error || failure.message || 'Unable to save. Please retry.',
          );
      } finally {
        if (currentRequest.current === requestKey) setBusy(false);
      }
    };
    return {
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
    };
  };
}
