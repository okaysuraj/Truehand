import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthProvider';
import { Link } from 'react-router-dom';

const CommunityFeedDesktop = () => {
  const { user } = useAuth();
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState('');

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

  const handlePost = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    try {
      await api.post(`/social/feed?artisanId=${user.id}`, { content: newPost });
      setNewPost('');
      fetchFeed();
    } catch (err) {
      alert('Failed to post');
    }
  };

  return (
    <div className="min-h-screen bg-surface-linen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <div className="mb-8 text-center">
          <h1 className="font-display-md text-display-md text-on-surface mb-2">Artisan Community</h1>
          <p className="font-body-md text-on-surface-variant">Discover behind-the-scenes stories from your favorite creators.</p>
        </div>

        {user?.role === 'SELLER' && (
          <div className="bg-surface-container-lowest p-6 rounded-lg shadow-sm border border-outline-variant/30 mb-8">
            <h3 className="font-headline-sm mb-4">Share an update</h3>
            <form onSubmit={handlePost}>
              <textarea 
                value={newPost}
                onChange={e => setNewPost(e.target.value)}
                rows={3}
                placeholder="What are you working on today?"
                className="w-full p-4 border border-outline-variant rounded mb-4 resize-none focus:border-forest-green outline-none"
              />
              <div className="flex justify-between items-center">
                <button type="button" className="text-on-surface-variant hover:text-forest-green">
                  <span className="material-symbols-outlined">image</span>
                </button>
                <button type="submit" disabled={!newPost.trim()} className="bg-forest-green text-white px-6 py-2 rounded font-bold disabled:opacity-50">
                  Post Update
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="p-12 text-center text-forest-green">Loading feed...</div>
        ) : feed.length === 0 ? (
          <div className="p-12 text-center text-outline-variant">No posts yet. Be the first to share!</div>
        ) : (
          <div className="space-y-6">
            {feed.map(post => (
              <div key={post.id} className="bg-surface-container-lowest p-6 rounded-lg shadow-sm border border-outline-variant/30">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-forest-green/20 flex items-center justify-center text-forest-green font-bold text-xl">
                    {post.artisan?.firstName?.[0] || 'A'}
                  </div>
                  <div>
                    <p className="font-bold text-on-surface">{post.artisan?.firstName} {post.artisan?.lastName}</p>
                    <p className="text-xs text-on-surface-variant">{new Date(post.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <p className="text-on-surface mb-4 whitespace-pre-line">{post.content}</p>
                {post.mediaUrl && (
                  <img src={post.mediaUrl} alt="Post media" className="w-full rounded-lg mb-4" />
                )}
                <div className="pt-4 border-t border-outline-variant/20 flex gap-6">
                  <button className="flex items-center gap-2 text-on-surface-variant hover:text-error-red transition-colors">
                    <span className="material-symbols-outlined">favorite</span> {post.likesCount}
                  </button>
                  <button className="flex items-center gap-2 text-on-surface-variant hover:text-forest-green transition-colors">
                    <span className="material-symbols-outlined">chat_bubble</span> Comment
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityFeedDesktop;
