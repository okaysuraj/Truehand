import { createMarketplaceFeatureHook } from '../../../shared/marketplace-state';
import { catalogFilters } from '../../../shared/feature-requests';
import { button } from './marketplace/styles';
import Form, { ChoicePages, Choice } from './marketplace/FeatureForm';
import FeatureRecord from './marketplace/FeatureRecord';
import * as Crypto from 'expo-crypto';
import React, { useCallback } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Share,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { formatValue, canAct, valueAt } from '../../../shared/feature-contract';
import { useAuthStore } from '../store/useAuthStore';
import { useCartStore } from '../store/useCartStore';
import { colors } from '../theme/theme';
import api from '../services/api';
const useMarketplaceFeature = createMarketplaceFeatureHook(React, api, () => Crypto.randomUUID());
export default function MarketplaceFeature({ feature, navigation, route }) {
  const user = useAuthStore((state) => state.user);
  const addToCart = useCartStore((state) => state.addToCart);
  const params = route?.params || {};
  const {
    definition,
    permitted,
    error,
    setRevision,
    notice,
    actionResult,
    requestKey,
    setError,
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
    hasContext,
    selection,
    selector,
    setSelection,
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
    initialSearch: route?.params?.search || route?.params?.query || '',
    category: params.category,
    contextFor: (selection) => ({
      id: params.id || selection,
      sellerId: params.sellerId || params.artisanId || params.id || selection,
      supportId: params.supportId || params.id || selection,
      notificationId: params.notificationId || params.id || selection,
      orderId: params.orderId || params.order?.id || params.id || selection,
      fulfillmentId: params.fulfillmentId || params.id || selection,
      userId: user?.id,
      productId: params.productId || params.id || params.product?.id || selection,
      collectionId: params.collectionId || params.id || selection,
    }),
  });
  useFocusEffect(
    useCallback(() => {
      setRevision((value) => value + 1);
    }, [setRevision]),
  );
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors['surface-linen'],
      }}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          padding: 24,
          gap: 24,
        }}
      >
        <TouchableOpacity
          accessibilityRole="button"
          style={button}
          onPress={() => navigation.goBack()}
        >
          <Text>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={button} onPress={() => navigation.navigate('FeatureDirectory')}>
          <Text>All features</Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 32,
            fontFamily: 'EBGaramond_500Medium',
            color: colors['forest-green'],
          }}
        >
          {definition.title}
        </Text>
        {definition.description && <Text>{definition.description}</Text>}
        {!definition.public && !user ? (
          <TouchableOpacity style={button} onPress={() => navigation.navigate('Login')}>
            <Text>Sign in to continue</Text>
          </TouchableOpacity>
        ) : !permitted ? (
          <Text>This feature requires the appropriate account role.</Text>
        ) : (
          <>
            {!!error && (
              <View
                style={{
                  gap: 12,
                }}
              >
                <Text accessibilityRole="alert">{error}</Text>
                <TouchableOpacity style={button} onPress={() => setRevision((value) => value + 1)}>
                  <Text>Retry</Text>
                </TouchableOpacity>
              </View>
            )}
            {!!notice && <Text accessibilityLiveRegion="polite">{notice}</Text>}
            {actionResult?.owner === requestKey && (
              <View style={button}>
                {actionResult.columns.map((column) => (
                  <View key={column.key}>
                    <Text>{column.label}</Text>
                    <Text>{formatValue(actionResult.data[column.key], column.format)}</Text>
                  </View>
                ))}
                {actionResult.data.checkoutUrl && (
                  <TouchableOpacity
                    style={button}
                    onPress={() =>
                      Linking.openURL(actionResult.data.checkoutUrl).catch(() =>
                        setError('Unable to open secure checkout.'),
                      )
                    }
                  >
                    <Text>Open secure checkout</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity style={button} onPress={() => setActionResult(null)}>
                  <Text>Hide details</Text>
                </TouchableOpacity>
              </View>
            )}
            {definition.search && (
              <>
                <Text>Search products</Text>
                <TextInput
                  style={button}
                  value={search}
                  onChangeText={(value) => {
                    setSearch(value);
                    setPage(0);
                  }}
                />
              </>
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
              <Choice
                label="Record"
                labelKey={definition.contextLabel || 'name'}
                value={selection}
                options={visibleOptions[selector] || []}
                onChange={setSelection}
              />
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
            {hasContext && visibleRows === null && !error && <ActivityIndicator />}
            {visibleRows?.length === 0 && <Text>No records yet.</Text>}
            {visibleRows?.map((row, index) => (
              <FeatureRecord
                key={row.id ?? row.categoryId ?? index}
                row={row}
                definition={definition}
                setError={setError}
                navigation={navigation}
                busy={busy}
                setBusy={setBusy}
                addToCart={addToCart}
                setNotice={setNotice}
                user={user}
                setActionEditor={setActionEditor}
                requestKey={requestKey}
                mutate={mutate}
              />
            ))}
            {definition.kind === 'label' && visibleRows?.length > 0 && (
              <TouchableOpacity
                style={button}
                onPress={() =>
                  Share.share({
                    message: definition.columns
                      .map(
                        (column) =>
                          column.label +
                          ': ' +
                          formatValue(valueAt(visibleRows[0], column.key), column.format),
                      )
                      .join('\n'),
                  }).catch(() => setError('Unable to share delivery label.'))
                }
              >
                <Text>Share delivery label</Text>
              </TouchableOpacity>
            )}
            {pages > 1 && (
              <View
                style={{
                  gap: 12,
                }}
              >
                <TouchableOpacity
                  style={button}
                  disabled={page === 0}
                  onPress={() => setPage((value) => value - 1)}
                >
                  <Text>Previous</Text>
                </TouchableOpacity>
                <Text>
                  Page {page + 1} of {pages}
                </Text>
                <TouchableOpacity
                  style={button}
                  disabled={page + 1 >= pages}
                  onPress={() => setPage((value) => value + 1)}
                >
                  <Text>Next</Text>
                </TouchableOpacity>
              </View>
            )}
            {actionEditor?.owner === requestKey && (
              <Form
                key={actionEditor.row.id + actionEditor.action.label}
                definition={actionEditor.action}
                initialValues={actionEditor.row}
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
            {definition.form && !user && (
              <TouchableOpacity style={button} onPress={() => navigation.navigate('Login')}>
                <Text>Sign in to submit</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
