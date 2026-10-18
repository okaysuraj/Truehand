import React, { useState } from 'react';
import { formValues, formFields, pagedChoiceSource } from '../../../../shared/feature-contract';
import api from '../../services/api';

// Render fields from the shared feature definition and report uploads before submission.
function ChoicePages({ source, info, onPage }) {
  if (!source || !pagedChoiceSource(source) || !info || info.totalPages <= 1) return null;
  return (
    <nav aria-label="Record choices" className="flex gap-4">
      <button type="button" disabled={info.number === 0} onClick={() => onPage(info.number - 1)}>
        Previous choices
      </button>
      <span>
        Choices page {info.number + 1} of {info.totalPages}
      </span>
      <button
        type="button"
        disabled={info.number + 1 >= info.totalPages}
        onClick={() => onPage(info.number + 1)}
      >
        Next choices
      </button>
    </nav>
  );
}
function Form({
  definition,
  context,
  options,
  choiceInfo = {},
  onChoicePage,
  busy,
  onSubmit,
  initialValues,
}) {
  const formId = React.useId();
  const activeDefinition = {
    ...definition,
    fields: formFields(definition, initialValues),
  };
  const [values, setValues] = useState(() => formValues(definition, initialValues));
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  async function upload(field, file) {
    if (!file) return;
    setUploading(true);
    setUploadError('');
    try {
      const body = new FormData();
      body.append('file', file);
      const response = await api.post('/media/upload', body, {
        headers: {
          'Content-Type': undefined,
        },
      });
      setValues((current) => ({
        ...current,
        [field.key]: response.data.url,
      }));
    } catch (failure) {
      setUploadError(failure.response?.data?.error || 'Unable to upload image. Please retry.');
    } finally {
      setUploading(false);
    }
  }
  return (
    <form
      className="space-y-4 border p-5"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(activeDefinition, values, () => setValues({}));
      }}
    >
      <h2 className="font-display-lg text-2xl">{definition.title || definition.label}</h2>
      {activeDefinition.fields.map((field) => (
        <div className="block space-y-2" key={field.key}>
          <label htmlFor={formId + '-' + field.key}>{field.label}</label>
          {field.type === 'image' ? (
            <div>
              <input
                id={formId + '-' + field.key}
                aria-label={field.label}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                disabled={uploading}
                onChange={(event) => upload(field, event.target.files[0])}
              />
              {values[field.key] && (
                <img className="max-h-48" src={values[field.key]} alt={field.label} />
              )}
            </div>
          ) : field.type === 'select' ? (
            <select
              id={formId + '-' + field.key}
              required={!field.optional}
              className="block w-full border p-3"
              value={values[field.key] ?? ''}
              onChange={(event) =>
                setValues({
                  ...values,
                  [field.key]: event.target.value,
                })
              }
            >
              <option value="">Choose {field.label.toLowerCase()}</option>
              {values[field.key] &&
                !(field.options || options[field.source] || []).some(
                  (option) =>
                    String(option.value ?? option[field.optionValue || 'id']) ===
                    String(values[field.key]),
                ) && <option value={values[field.key]}>Selected record {values[field.key]}</option>}
              {(field.options || options[field.source] || []).map((option) => (
                <option
                  key={option.value ?? option.id}
                  value={option.value ?? option[field.optionValue || 'id']}
                >
                  {option.label ?? option[field.optionLabel] ?? option.name}
                </option>
              ))}
            </select>
          ) : field.type === 'multiline' ? (
            <textarea
              id={formId + '-' + field.key}
              required={!field.optional}
              maxLength={field.maxLength || 10000}
              className="block w-full border p-3 min-h-24"
              value={values[field.key] || ''}
              onChange={(event) =>
                setValues({
                  ...values,
                  [field.key]: event.target.value,
                })
              }
            />
          ) : (
            <input
              id={formId + '-' + field.key}
              className="block w-full border p-3"
              required={!field.optional && field.type !== 'boolean'}
              maxLength={field.maxLength || 10000}
              type={
                field.type === 'boolean'
                  ? 'checkbox'
                  : ['money', 'number', 'integer'].includes(field.type)
                    ? 'number'
                    : field.type === 'datetime'
                      ? 'datetime-local'
                      : field.type === 'url'
                        ? 'url'
                        : 'text'
              }
              step={field.type === 'integer' ? '1' : '0.01'}
              min={field.min ?? (field.type === 'money' ? '0.01' : undefined)}
              max={field.max}
              checked={field.type === 'boolean' ? !!values[field.key] : undefined}
              value={field.type === 'boolean' ? undefined : (values[field.key] ?? '')}
              onChange={(event) =>
                setValues({
                  ...values,
                  [field.key]: field.type === 'boolean' ? event.target.checked : event.target.value,
                })
              }
            />
          )}
          {field.source && (
            <ChoicePages
              source={field.source}
              info={choiceInfo[field.source]}
              onPage={(next) => onChoicePage?.(field.source, next)}
            />
          )}
        </div>
      ))}
      {uploadError && <p role="alert">{uploadError}</p>}
      <button
        type="submit"
        disabled={busy || uploading}
        className="bg-forest-green text-white px-5 py-3 disabled:opacity-50"
      >
        {busy ? 'Saving...' : definition.title || definition.label || 'Save'}
      </button>
    </form>
  );
}
export { ChoicePages };
export default Form;
