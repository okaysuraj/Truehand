import filterFields from './catalog-filters.json';
import { choiceRequest, pageInfo, payload, records } from './feature-contract';

// Both clients use the same catalog fields and request rules.
export const catalogFilterForm = {
  title: 'Apply filters',
  fields: [
    {
      key: 'category',
      label: 'Category',
      type: 'select',
      source: '/categories',
      optionLabel: 'name',
      optionValue: 'name',
      numeric: false,
      optional: true,
    },
    ...filterFields,
  ],
};

export function recordChoiceSource(definition) {
  if (definition.contextSource) return definition.contextSource;
  if (definition.context === 'productId') return '/products?size=100';
  if (definition.context === 'orderId') return '/orders';
  return '/account/collections';
}

export function featureChoiceSources(definition, hasContext) {
  const fields = [
    ...(definition.form?.fields || []),
    ...(definition.search ? catalogFilterForm.fields : []),
    ...(definition.actions || []).flatMap((action) => action.fields || []),
  ];
  const sources = new Set(fields.map((field) => field.source).filter(Boolean));
  if (definition.context && !hasContext) sources.add(recordChoiceSource(definition));
  return [...sources];
}

export async function loadFeatureChoices(api, sources, context, pages, signal) {
  return Promise.all(
    sources.map(async (source) => {
      const page = pages[source] || 0;
      const request = choiceRequest(source, context, page);
      const { data } = await api.get(request.path, { signal });
      return [source, records(data), pageInfo(data, page)];
    }),
  );
}

export function catalogFilters(form, values, context) {
  const applied = payload(form, values, context);
  if (
    applied.minPrice !== undefined &&
    applied.maxPrice !== undefined &&
    applied.minPrice > applied.maxPrice
  ) {
    throw new Error('Minimum price exceeds maximum price.');
  }
  return applied;
}
