import React from 'react';
import { Text, View, TouchableOpacity, Image, Linking } from 'react-native';
import { formatValue, canAct, valueAt } from '../../../../shared/feature-contract';
import { colors } from '../../theme/theme';
import { button } from './styles';
// Display a record and the actions permitted by its feature and account role.
export default function FeatureRecord({
  row,
  definition,
  setError,
  navigation,
  busy,
  setBusy,
  addToCart,
  setNotice,
  user,
  setActionEditor,
  requestKey,
  mutate,
}) {
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderColor: colors.outline,
        paddingVertical: 16,
        gap: 12,
      }}
    >
      {definition.kind === 'products' && row.imageUrl && (
        <Image
          accessibilityLabel={row.name}
          source={{
            uri: row.imageUrl,
          }}
          style={{
            width: '100%',
            height: 240,
          }}
          resizeMode="cover"
        />
      )}
      {definition.columns.map((column) => (
        <View
          key={column.key}
          style={{
            gap: 4,
          }}
        >
          {column.format === 'link' ? (
            <TouchableOpacity
              accessibilityRole="link"
              onPress={() =>
                Linking.openURL(row[column.key]).catch(() => setError('Unable to open document.'))
              }
            >
              <Text>Open document</Text>
            </TouchableOpacity>
          ) : column.format === 'image' ? (
            row[column.key] && (
              <Image
                source={{
                  uri: row[column.key],
                }}
                style={{
                  width: '100%',
                  height: 240,
                }}
                resizeMode="contain"
              />
            )
          ) : (
            <>
              <Text
                style={{
                  color: colors['on-surface-variant'],
                }}
              >
                {column.label}
              </Text>
              <Text>{formatValue(valueAt(row, column.key), column.format)}</Text>
            </>
          )}
        </View>
      ))}
      {definition.kind === 'products' && (
        <>
          <TouchableOpacity
            style={button}
            onPress={() =>
              navigation.navigate('ProductDetail', {
                id: row.id,
                productId: row.id,
              })
            }
          >
            <Text>View product</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={button}
            disabled={
              busy ||
              row.stockQuantity <= 0 ||
              row.acceptingOrders === false ||
              row.isAvailable === false
            }
            onPress={async () => {
              setBusy(true);
              try {
                if (row.variants?.length) {
                  navigation.navigate('ProductDetail', {
                    productId: row.id,
                    id: row.id,
                  });
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
            <Text>{row.variants?.length ? 'Choose options' : 'Add to cart'}</Text>
          </TouchableOpacity>
        </>
      )}
      {user?.id === row.sellerId && row.hasVariants && (
        <TouchableOpacity
          style={button}
          onPress={() =>
            navigation.navigate('Feature', {
              feature: 'variants',
              productId: row.id,
            })
          }
        >
          <Text>Manage SKU stock</Text>
        </TouchableOpacity>
      )}
      {definition.kind === 'categories' && (
        <TouchableOpacity
          style={button}
          onPress={() =>
            navigation.navigate('SearchResults', {
              category: row.name,
            })
          }
        >
          <Text>Browse category</Text>
        </TouchableOpacity>
      )}
      {definition.kind === 'locations' && row.latitude != null && row.longitude != null && (
        <TouchableOpacity
          style={button}
          onPress={() =>
            Linking.openURL(
              `https://www.openstreetmap.org/?mlat=${encodeURIComponent(row.latitude)}&mlon=${encodeURIComponent(row.longitude)}#map=16/${encodeURIComponent(row.latitude)}/${encodeURIComponent(row.longitude)}`,
            ).catch(() => setError('Unable to open maps.'))
          }
        >
          <Text>Open reported location</Text>
        </TouchableOpacity>
      )}
      {definition.detail && (
        <TouchableOpacity
          style={button}
          onPress={() =>
            navigation.navigate(definition.detail.mobile, {
              [definition.detail.param]: row[definition.detail.idField || 'id'],
              ...(definition.detail.feature
                ? {
                    feature: definition.detail.feature,
                  }
                : {}),
            })
          }
        >
          <Text>View details</Text>
        </TouchableOpacity>
      )}
      {definition.actions
        ?.filter((action) => canAct(action, row, user))
        .map((action) => (
          <TouchableOpacity
            style={button}
            key={action.label}
            disabled={busy}
            onPress={() =>
              action.fields
                ? setActionEditor({
                    action,
                    row,
                    owner: requestKey,
                  })
                : mutate(action, {}, undefined, row)
            }
          >
            <Text>{action.label}</Text>
          </TouchableOpacity>
        ))}
    </View>
  );
}
