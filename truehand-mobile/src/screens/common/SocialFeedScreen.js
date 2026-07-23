import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import api from '../../services/api';
import { useAuthStore } from '../../store/useAuthStore';

const SocialFeedScreen = ({ navigation }) => {
  const { user } = useAuthStore();
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState('');
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    fetchFeed();
  }, []);

  const fetchFeed = async () => {
    try {
      const res = await api.get('/social/feed');
      setFeed(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePost = async () => {
    if (!newPost.trim()) return;
    setPosting(true);
    try {
      await api.post(`/social/feed?artisanId=${user.id}`, { content: newPost });
      setNewPost('');
      fetchFeed();
    } catch (err) {
      Alert.alert('Error', 'Failed to post update');
    } finally {
      setPosting(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.artisan?.firstName?.[0] || 'A'}</Text>
        </View>
        <View>
          <Text style={styles.authorName}>{item.artisan?.firstName} {item.artisan?.lastName}</Text>
          <Text style={styles.postDate}>{new Date(item.createdAt).toLocaleDateString()}</Text>
        </View>
      </View>
      <Text style={styles.postContent}>{item.content}</Text>
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionIcon}>❤️</Text>
          <Text style={styles.actionCount}>{item.likesCount}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionIcon}>💬</Text>
          <Text style={styles.actionCount}>Comment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Community</Text>
      </View>

      {user?.role === 'SELLER' && (
        <View style={styles.createPostContainer}>
          <TextInput
            style={styles.postInput}
            placeholder="Share an update..."
            value={newPost}
            onChangeText={setNewPost}
            multiline
          />
          <TouchableOpacity 
            style={[styles.postBtn, !newPost.trim() && styles.postBtnDisabled]}
            onPress={handlePost}
            disabled={!newPost.trim() || posting}
          >
            {posting ? <ActivityIndicator color="#FFF" size="small" /> : <Text style={styles.postBtnText}>Post</Text>}
          </TouchableOpacity>
        </View>
      )}

      {loading ? (
        <View style={styles.centered}><ActivityIndicator size="large" color="#2E6C36" /></View>
      ) : (
        <FlatList
          data={feed}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.centered}>
              <Text style={styles.emptyText}>No posts yet. Check back later!</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FBFDF9' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  header: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#E2E3DD', backgroundColor: '#FFF' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#1A1C19' },
  createPostContainer: { padding: 16, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#E2E3DD' },
  postInput: { backgroundColor: '#F3F5F1', borderRadius: 8, padding: 12, minHeight: 80, textAlignVertical: 'top', marginBottom: 12 },
  postBtn: { backgroundColor: '#2E6C36', padding: 12, borderRadius: 20, alignItems: 'center', alignSelf: 'flex-end', paddingHorizontal: 24 },
  postBtnDisabled: { opacity: 0.5 },
  postBtnText: { color: '#FFF', fontWeight: 'bold' },
  listContent: { padding: 16 },
  postCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 12, marginBottom: 16, borderWidth: 1, borderColor: '#E2E3DD' },
  postHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#E8F5E9', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  avatarText: { color: '#2E6C36', fontWeight: 'bold', fontSize: 18 },
  authorName: { fontWeight: 'bold', color: '#1A1C19', fontSize: 16 },
  postDate: { color: '#72796F', fontSize: 12 },
  postContent: { color: '#1A1C19', fontSize: 14, lineHeight: 20, marginBottom: 16 },
  postActions: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#E2E3DD', paddingTop: 12 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', marginRight: 24 },
  actionIcon: { fontSize: 16, marginRight: 6 },
  actionCount: { color: '#424940', fontWeight: '600' },
  emptyText: { color: '#72796F', fontSize: 16 },
});

export default SocialFeedScreen;
