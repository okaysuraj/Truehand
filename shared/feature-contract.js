// Validates feature form values and normalizes API records, pagination, and action permissions.
export function substitute(template, context) {
  if (typeof template !== 'string') return template;
  return template.replace(/\{(\w+)\}/g, (_, key) => {
    const value = context[key];
    if (value === undefined || value === null || value === '')
      throw new Error('Choose the required record before continuing.');
    return encodeURIComponent(String(value));
  });
}
export function records(value) {
  return Array.isArray(value)
    ? value
    : Array.isArray(value?.content)
      ? value.content
      : value
        ? [value]
        : [];
}
export function pageInfo(value, requested = 0) {
  if (!Array.isArray(value?.content))
    return { number: 0, totalPages: 1, totalElements: records(value).length };
  return {
    number: Number.isInteger(value.number) ? value.number : requested,
    totalPages: Math.max(1, value.totalPages || 0),
    totalElements: value.totalElements ?? value.content.length,
  };
}
export function pagedChoiceSource(source) {
  return /^\/(?:products(?:\/(?:filter|flash-sale|seller\/[^/]+|search\/[^/]+|category\/[^/]+))?|notifications|orders(?:\/(?:user\/[^/]+|all))?|users(?:\/customers)?|seller\/(?:fulfillments|[^/]+\/orders)|community\/artisans|admin\/(?:products\/pending|orders|users|payouts|artisans|delivery-agents|disputes|support|audit-events|fraud-alerts|suspicious-activity|kyc\/(?:seller|delivery)\/pending))$/.test(
    source.split('?')[0],
  );
}
export function choiceRequest(source, context, page = 0) {
  const path = substitute(source, context);
  if (!pagedChoiceSource(path)) return { path };
  const [pathname, query = ''] = path.split('?');
  const params = new URLSearchParams(query);
  params.set('page', String(page));
  params.set('size', '50');
  params.set('paged', 'true');
  return { path: pathname + '?' + params.toString() };
}
export function valueAt(row, key) {
  return key.split('.').reduce((value, part) => value?.[part], row);
}
export function formValues(definition, record) {
  return Object.fromEntries(
    (definition.fields || [])
      .filter((field) => record && record[field.prefillKey || field.key] != null)
      .map((field) => [field.key, record[field.prefillKey || field.key]]),
  );
}
export function formFields(definition, record) {
  return (definition.fields || []).filter(
    (field) =>
      !field.omitWhen ||
      !Object.entries(field.omitWhen).every(([key, value]) => record?.[key] === value),
  );
}
export function formatValue(value, format) {
  if (value === null || value === undefined || value === '') return 'Not set';
  if (format === 'order-items')
    return Array.isArray(value)
      ? value
          .map((item) =>
            [
              item.productName || 'Product name not recorded',
              item.variantSku && 'SKU: ' + item.variantSku,
              item.variantDescription,
              formatValue(item.quantity, 'number') +
                ' x ' +
                formatValue(item.priceAtPurchase, 'money'),
              Number(item.discountAmount) > 0 &&
                'Line discount: ' + formatValue(item.discountAmount, 'money'),
            ]
              .filter(Boolean)
              .join(' / '),
          )
          .join('\n')
      : 'Not set';
  if (format === 'money') return 'INR ' + Number(value).toFixed(2);
  if (format === 'boolean') return value ? 'Yes' : 'No';
  if (format === 'date') {
    const text = String(value);
    const date = new Date(
      /T/.test(text) && !/[zZ]|[+-]\d{2}:\d{2}$/.test(text) ? text + 'Z' : text,
    );
    return Number.isNaN(date.getTime()) ? text : date.toLocaleString('en-IN');
  }
  return typeof value === 'object' ? JSON.stringify(value) : String(value);
}
export function payload(form, values, context) {
  const result = {};
  for (const field of form.fields || []) {
    const value = values[field.key];
    if (field.optional && (value === '' || value === undefined)) continue;
    if (field.type === 'boolean') result[field.key] = Boolean(value);
    else if (
      ['number', 'integer', 'money'].includes(field.type) ||
      (field.type === 'select' && field.source && field.numeric !== false)
    ) {
      const numeric = Number(value);
      if (
        value === undefined ||
        value === '' ||
        !Number.isFinite(numeric) ||
        (field.type === 'integer' && !Number.isInteger(numeric))
      )
        throw new Error('Enter a valid ' + field.label.toLowerCase() + '.');
      if (
        (field.min !== undefined && numeric < field.min) ||
        (field.max !== undefined && numeric > field.max)
      )
        throw new Error(field.label + ' is outside the allowed range.');
      result[field.key] = numeric;
    } else {
      if (!String(value || '').trim()) throw new Error(field.label + ' is required.');
      result[field.key] = String(value).trim();
    }
  }
  for (const [key, value] of Object.entries(form.body || {})) {
    const exact = typeof value === 'string' && value.match(/^\{(\w+)\}$/);
    result[key] = exact ? context[exact[1]] : substitute(value, context);
  }
  return result;
}
export function canAct(action, row, user) {
  return (
    !!user &&
    !(action.excludeRoles || []).includes(row.role) &&
    (!action.ownerField ||
      Number(row[action.ownerField]) === Number(user.id) ||
      (action.allowAdminOwnership && user.role === 'ADMIN')) &&
    Object.entries(action.when || {}).every(([key, value]) => row[key] === value)
  );
}
