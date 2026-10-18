import { choosePhotograph } from '../../services/photographs';
import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Switch,
  Modal,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { formValues, formFields, pagedChoiceSource } from '../../../../shared/feature-contract';
import { colors } from '../../theme/theme';
import api from '../../services/api';
import { button } from './styles';
// Render fields from the shared feature definition and report uploads before submission.
function ChoicePages({ source, info, onPage }) {
  if (!source || !pagedChoiceSource(source) || !info || info.totalPages <= 1) return null;
  return (
    <View
      style={{
        gap: 12,
      }}
    >
      <TouchableOpacity
        accessibilityRole="button"
        style={button}
        disabled={info.number === 0}
        onPress={() => onPage(info.number - 1)}
      >
        <Text>Previous choices</Text>
      </TouchableOpacity>
      <Text>
        Choices page {info.number + 1} of {info.totalPages}
      </Text>
      <TouchableOpacity
        accessibilityRole="button"
        style={button}
        disabled={info.number + 1 >= info.totalPages}
        onPress={() => onPage(info.number + 1)}
      >
        <Text>Next choices</Text>
      </TouchableOpacity>
    </View>
  );
}
function Choice({ label, value, options, onChange, labelKey = 'name', valueKey = 'id' }) {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const chosen = options.find(
    (option) => String(option.value ?? option[valueKey]) === String(value),
  );
  return (
    <>
      <TouchableOpacity accessibilityRole="button" style={button} onPress={() => setOpen(true)}>
        <Text>
          {chosen?.label ??
            chosen?.[labelKey] ??
            (value ? 'Selected record ' + value : 'Choose ' + label.toLowerCase())}
        </Text>
      </TouchableOpacity>
      <Modal visible={open} animationType="slide" onRequestClose={() => setOpen(false)}>
        <SafeAreaView
          style={{
            flex: 1,
            padding: 24,
            gap: 16,
          }}
        >
          <Text
            style={{
              fontSize: 24,
            }}
          >
            {label}
          </Text>
          <TextInput
            accessibilityLabel={'Search ' + label.toLowerCase()}
            style={button}
            value={filter}
            onChangeText={setFilter}
          />
          <FlatList
            data={options.filter((option) =>
              String(option.label ?? option[labelKey] ?? '')
                .toLowerCase()
                .includes(filter.toLowerCase()),
            )}
            keyExtractor={(option) => String(option.value ?? option[valueKey])}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={button}
                onPress={() => {
                  onChange(item.value ?? item[valueKey]);
                  setOpen(false);
                }}
              >
                <Text>{item.label ?? item[labelKey]}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={<Text>No choices found.</Text>}
          />
          <TouchableOpacity style={button} onPress={() => setOpen(false)}>
            <Text>Close</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </>
  );
}
function Form({
  definition,
  options,
  choiceInfo = {},
  onChoicePage,
  busy,
  onSubmit,
  initialValues,
}) {
  const activeDefinition = {
    ...definition,
    fields: formFields(definition, initialValues),
  };
  const [values, setValues] = useState(() => formValues(definition, initialValues));
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  async function upload(field, camera) {
    setUploading(true);
    setUploadError('');
    try {
      const file = await choosePhotograph(camera);
      if (!file) return;
      const body = new FormData();
      body.append('file', file);
      const response = await api.post('/media/upload', body, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setValues((current) => ({
        ...current,
        [field.key]: response.data.url,
      }));
    } catch (failure) {
      setUploadError(
        failure.response?.data?.error || failure.message || 'Unable to upload image. Please retry.',
      );
    } finally {
      setUploading(false);
    }
  }
  return (
    <View
      style={{
        gap: 16,
        borderWidth: 1,
        borderColor: colors.outline,
        padding: 16,
      }}
    >
      <Text
        style={{
          fontSize: 24,
        }}
      >
        {definition.title || definition.label}
      </Text>
      {activeDefinition.fields.map((field) => (
        <View
          key={field.key}
          style={{
            gap: 8,
          }}
        >
          <Text>{field.label}</Text>
          {field.type === 'image' ? (
            <View>
              <TouchableOpacity
                style={button}
                disabled={uploading}
                onPress={() => upload(field, false)}
              >
                <Text>Choose photograph</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={button}
                disabled={uploading}
                onPress={() => upload(field, true)}
              >
                <Text>Take photograph</Text>
              </TouchableOpacity>
              {values[field.key] && (
                <Image
                  source={{
                    uri: values[field.key],
                  }}
                  style={{
                    height: 160,
                    width: '100%',
                  }}
                  resizeMode="contain"
                />
              )}
            </View>
          ) : field.type === 'select' ? (
            <Choice
              label={field.label}
              value={values[field.key]}
              options={field.options || options[field.source] || []}
              labelKey={field.optionLabel}
              valueKey={field.optionValue}
              onChange={(value) =>
                setValues({
                  ...values,
                  [field.key]: value,
                })
              }
            />
          ) : field.type === 'boolean' ? (
            <Switch
              accessibilityLabel={field.label}
              value={!!values[field.key]}
              onValueChange={(value) =>
                setValues({
                  ...values,
                  [field.key]: value,
                })
              }
            />
          ) : (
            <TextInput
              style={[
                button,
                field.type === 'multiline' && {
                  minHeight: 100,
                  textAlignVertical: 'top',
                },
              ]}
              accessibilityLabel={field.label}
              maxLength={field.maxLength || 10000}
              multiline={field.type === 'multiline'}
              autoCapitalize="none"
              keyboardType={
                ['money', 'number', 'integer'].includes(field.type) ? 'decimal-pad' : 'default'
              }
              value={String(values[field.key] ?? '')}
              onChangeText={(value) =>
                setValues({
                  ...values,
                  [field.key]: value,
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
        </View>
      ))}
      {!!uploadError && <Text accessibilityRole="alert">{uploadError}</Text>}
      <TouchableOpacity
        accessibilityRole="button"
        disabled={busy || uploading}
        style={button}
        onPress={() => onSubmit(activeDefinition, values, () => setValues({}))}
      >
        <Text>{busy ? 'Saving...' : definition.title || definition.label || 'Save'}</Text>
      </TouchableOpacity>
    </View>
  );
}
export { ChoicePages, Choice };
export default Form;
