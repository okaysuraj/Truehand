import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from 'react-native';
import api from '../services/api';
import { useAuth } from '../services/AuthProvider';

export default function OrdersScreen({ navigation }) {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get(`/orders/user/${user.id}`);
        // Sort descending by date
        const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(sorted);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user.id]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'DELIVERED': return '#007600';
      case 'CONFIRMED': return '#007185';
      case 'CANCELLED': return '#B12704';
      default: return '#FFA41C';
    }
  };

  const renderOrderItem = ({ item }) => {
    // Determine the main item image
    const itemImage = item.orderItems && item.orderItems.length > 0 
      ? item.orderItems[0].productImageUrl || `https://picsum.photos/200/200?random=${item.id}`
      : `https://picsum.photos/200/200?random=${item.id}`;

    return (
      <TouchableOpacity 
        style={styles.card} 
        onPress={() => navigation.navigate('Tracking', { orderId: item.id })}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.orderNumber}>Order #{item.orderNumber.substring(0, 8)}</Text>
          <Text style={[styles.status, { color: getStatusColor(item.status) }]}>{item.status}</Text>
        </View>
        <View style={styles.cardBody}>
          <Image source={{ uri: itemImage }} style={styles.image} />
          <View style={styles.cardInfo}>
            <Text style={styles.date}>Placed on: {new Date(item.createdAt).toLocaleDateString()}</Text>
            <Text style={styles.total}>Total: ₹{item.totalAmount.toFixed(2)}</Text>
            {item.orderItems && item.orderItems.length > 1 && (
              <Text style={styles.itemsCount}>+{item.orderItems.length - 1} more items</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007185" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Orders</Text>
      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>You haven't placed any orders yet.</Text>
          <TouchableOpacity style={styles.shopButton} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.shopButtonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList 
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderOrderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
    paddingTop: 50,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f1111',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
  },
  orderNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0f1111',
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  cardBody: {
    flexDirection: 'row',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 4,
    marginRight: 16,
  },
  cardInfo: {
    justifyContent: 'center',
  },
  date: {
    fontSize: 14,
    color: '#565959',
    marginBottom: 4,
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#B12704',
  },
  itemsCount: {
    fontSize: 12,
    color: '#007185',
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#565959',
    marginBottom: 20,
  },
  shopButton: {
    backgroundColor: '#FFD814',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FCD200',
  },
  shopButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f1111',
  },
});
