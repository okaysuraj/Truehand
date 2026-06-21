import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../services/CartProvider';
import { Ionicons } from '@expo/vector-icons';

export default function CartScreen() {
  const { cartItems, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();
  const navigation = useNavigation();

  const handleCheckout = () => {
    navigation.navigate('Checkout');
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.imageUrl || 'https://via.placeholder.com/150' }} style={styles.itemImage} />
      
      <View style={styles.itemDetails}>
        <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.itemPrice}>${Number(item.price).toFixed(2)}</Text>
        
        <View style={styles.actionRow}>
          <View style={styles.qtyContainer}>
            <TouchableOpacity 
              onPress={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : removeFromCart(item.id)} 
              style={styles.qtyBtn}
            >
              <Ionicons name="remove" size={16} color="#0f1111" />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{item.quantity}</Text>
            <TouchableOpacity 
              onPress={() => updateQuantity(item.id, item.quantity + 1)} 
              style={styles.qtyBtn}
            >
              <Ionicons name="add" size={16} color="#0f1111" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity onPress={() => removeFromCart(item.id)}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
        {cartItems.length > 0 && (
          <TouchableOpacity onPress={clearCart}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={80} color="#ccc" />
          <Text style={styles.emptyText}>Your TrueHand Cart is empty.</Text>
          <TouchableOpacity 
            style={styles.shopBtn} 
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.shopBtnText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.listContent}
          />

          <View style={styles.footer}>
            <View style={styles.totalRow}>
              <Text style={styles.subtotalText}>Subtotal ({cartItems.reduce((a,c) => a + c.quantity, 0)} items):</Text>
              <Text style={styles.totalPrice}>${getTotal().toFixed(2)}</Text>
            </View>
            <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
              <Text style={styles.checkoutBtnText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0f1111',
  },
  clearText: {
    color: '#007185',
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eaeded',
  },
  emptyText: {
    fontSize: 18,
    color: '#555',
    marginTop: 15,
    marginBottom: 20,
  },
  shopBtn: {
    backgroundColor: '#FFD814',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  shopBtnText: {
    color: '#0f1111',
    fontWeight: 'bold',
    fontSize: 16,
  },
  listContent: {
    padding: 15,
    backgroundColor: '#eaeded',
    flexGrow: 1,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#f6f6f6',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 15,
    color: '#0f1111',
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#B12704',
    marginTop: 5,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d5d9d9',
    borderRadius: 8,
    backgroundColor: '#f0f2f2',
  },
  qtyBtn: {
    padding: 8,
  },
  qtyText: {
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  deleteText: {
    color: '#007185',
    fontSize: 14,
  },
  footer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 15,
  },
  subtotalText: {
    fontSize: 16,
    color: '#0f1111',
  },
  totalPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#B12704',
  },
  checkoutBtn: {
    backgroundColor: '#FFD814',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutBtnText: {
    color: '#0f1111',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
