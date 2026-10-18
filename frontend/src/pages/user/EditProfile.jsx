import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthProvider';
export default function EditProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    let active = true;
    api
      .get('/users/me')
      .then(({ data }) => {
        if (active) setForm(data);
      })
      .catch((err) => {
        if (active) setError(err.response?.data?.error || 'Unable to load profile.');
      });
    return () => {
      active = false;
    };
  }, [user?.id]);
  const save = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    try {
      await api.put('/users/' + user.id, {
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
        bio: form.bio,
      });
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.error || 'Unable to save profile.');
    } finally {
      setSaving(false);
    }
  };
  return (
    <main className="pt-32 pb-20 px-6 max-w-2xl mx-auto min-h-screen">
      <h1 className="font-display-lg text-4xl text-forest-green mb-6">Edit profile</h1>
      {error && <p role="alert">{error}</p>}
      {form && (
        <form onSubmit={save} className="space-y-5">
          <p>Email: {form.email}</p>
          {[
            ['firstName', 'First name'],
            ['lastName', 'Last name'],
            ['phone', 'Phone number'],
            ['bio', 'Biography'],
          ].map(([key, label]) => (
            <label className="block" key={key}>
              {label}
              <input
                className="block border p-3 mt-2 w-full"
                required={key === 'firstName'}
                value={form[key] || ''}
                maxLength={key === 'bio' ? 2000 : key === 'phone' ? 30 : 100}
                disabled={saving}
                onChange={(e) =>
                  setForm({
                    ...form,
                    [key]: e.target.value,
                  })
                }
              />
            </label>
          ))}
          <button className="bg-forest-green text-white py-3 px-6" disabled={saving}>
            {saving ? 'Saving...' : 'Save profile'}
          </button>
        </form>
      )}
    </main>
  );
}
