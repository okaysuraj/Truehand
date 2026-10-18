import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthProvider';
export default function AddAddress() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const existing = state?.address;
  const [form, setForm] = useState({
    label: 'HOME',
    fullName: '',
    phone: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    isDefault: false,
    ...existing,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const save = async (event) => {
    event.preventDefault();
    setError('');
    if (!user?.id) {
      setError('Please sign in before saving an address.');
      return;
    }
    setSaving(true);
    try {
      if (existing) await api.put('/addresses/' + existing.id + '/user/' + user.id, form);
      else await api.post('/addresses/user/' + user.id, form);
      navigate(-1);
    } catch (err) {
      setError(err.response?.data?.error || 'Unable to save your address.');
    } finally {
      setSaving(false);
    }
  };
  return (
    <main className="pt-32 pb-20 px-6 max-w-2xl mx-auto min-h-screen">
      <h1 className="font-display-lg text-4xl text-forest-green mb-6">
        {existing ? 'Edit address' : 'Add address'}
      </h1>
      {error && (
        <p role="alert" className="mb-4 text-error-red">
          {error}
        </p>
      )}
      {!user && <Link to="/login">Sign in</Link>}
      <form onSubmit={save} className="space-y-5">
        {[
          ['label', 'Address label'],
          ['fullName', 'Recipient name'],
          ['phone', 'Phone number'],
          ['streetAddress', 'Street address'],
          ['city', 'City'],
          ['state', 'State'],
          ['postalCode', 'Postal code'],
          ['country', 'Country'],
        ].map(([key, label]) => (
          <label className="block" key={key}>
            {label}
            <input
              className="block w-full border border-outline p-3 mt-2 rounded"
              type={key === 'phone' ? 'tel' : 'text'}
              required
              value={form[key]}
              disabled={saving}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            />
          </label>
        ))}
        <label className="flex gap-3">
          <input
            type="checkbox"
            checked={form.isDefault}
            onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
          />
          Use as default address
        </label>
        <button
          className="bg-forest-green text-white px-6 py-3 rounded"
          type="submit"
          disabled={saving || !user}
        >
          {saving ? 'Saving...' : 'Save address'}
        </button>
      </form>
    </main>
  );
}
