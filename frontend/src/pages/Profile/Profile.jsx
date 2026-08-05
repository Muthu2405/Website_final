import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StarfieldBackground from '../../components/StarfieldBackground/StarfieldBackground';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import { useData } from '../../context/DataContext';

const FIELD_GROUPS = [
    {
        title: 'Personal Info',
        fields: [
            { key: 'name', label: 'Full Name', type: 'text' },
            { key: 'email', label: 'Email', type: 'email' },
            { key: 'phone', label: 'Phone', type: 'text' },
            { key: 'role', label: 'Role', type: 'text' },
        ],
    },
    {
        title: 'Business Info',
        fields: [
            { key: 'business', label: 'Business Name', type: 'text' },
            { key: 'type', label: 'Business Type', type: 'text' },
            { key: 'category', label: 'Category', type: 'text' },
            { key: 'website', label: 'Website', type: 'text' },
        ],
    },
    {
        title: 'Location',
        fields: [
            { key: 'location', label: 'Address', type: 'text' },
            { key: 'city', label: 'City', type: 'text' },
            { key: 'state', label: 'State', type: 'text' },
            { key: 'country', label: 'Country', type: 'text' },
            { key: 'pincode', label: 'Pincode', type: 'text' },
        ],
    },
];

export default function Profile() {
    const { currentUser, updateProfile, loading } = useData();
    const navigate = useNavigate();
    const [form, setForm] = useState(null);
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState(null); // { type: 'success' | 'error', message }

    useEffect(() => {
        document.documentElement.classList.add('dashboard-active');
        document.body.classList.add('dashboard-active');
        return () => {
            document.documentElement.classList.remove('dashboard-active');
            document.body.classList.remove('dashboard-active');
        };
    }, []);

    useEffect(() => {
        if (currentUser) setForm(currentUser);
    }, [currentUser]);

    useEffect(() => {
        if (!loading && !currentUser) {
            navigate('/');
        }
    }, [loading, currentUser, navigate]);

    if (!currentUser || !form) {
        return (
            <div id="dashboard-app">
                <StarfieldBackground />
                <Nav />
                <div className="section-padding">
                    <div className="site-container text-center text-gray-400">Loading profile…</div>
                </div>
                <Footer />
            </div>
        );
    }

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setStatus(null);
        try {
            await updateProfile(form);
            setStatus({ type: 'success', message: 'Profile updated successfully.' });
            setEditing(false);
        } catch (err) {
            setStatus({ type: 'error', message: err.message || 'Failed to update profile.' });
        } finally {
            setSaving(false);
            setTimeout(() => setStatus(null), 5000);
        }
    };

    const handleCancel = () => {
        setForm(currentUser);
        setEditing(false);
        setStatus(null);
    };

    return (
        <div id="dashboard-app">
            <StarfieldBackground />
            <Nav />
            <section className="section-padding">
                <div className="site-container" style={{ maxWidth: '840px' }}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shrink-0">
                                {(form.name || '?').trim().split(/\s+/).map(p => p[0]).slice(0, 2).join('').toUpperCase()}
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{form.name || 'Your Profile'}</h1>
                                <p className="text-gray-400 text-sm mt-1">{form.email}</p>
                            </div>
                        </div>
                        {!editing && (
                            <button type="button" onClick={() => setEditing(true)} className="btn-primary px-5 py-2.5 text-sm shrink-0">
                                <i className="fas fa-pen mr-2"></i> Edit Profile
                            </button>
                        )}
                    </div>

                    {status && (
                        <div className={`rounded-xl border px-5 py-3 mb-6 text-sm ${
                            status.type === 'success'
                                ? 'border-green-500/30 bg-green-500/10 text-green-400'
                                : 'border-red-500/30 bg-red-500/10 text-red-400'
                        }`}>
                            {status.message}
                        </div>
                    )}

                    <form onSubmit={handleSave}>
                        {FIELD_GROUPS.map((group) => (
                            <div key={group.title} className="bg-dark-card border border-gray-800 rounded-2xl p-6 sm:p-8 mb-6">
                                <h2 className="text-lg font-bold text-white mb-5">{group.title}</h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {group.fields.map((field) => (
                                        <div key={field.key} className="contact-field">
                                            <label className="block text-xs font-medium text-gray-300 mb-1">{field.label}</label>
                                            {editing ? (
                                                <input
                                                    type={field.type}
                                                    className="input-field"
                                                    value={form[field.key] || ''}
                                                    onChange={(e) => handleChange(field.key, e.target.value)}
                                                    placeholder={field.label}
                                                />
                                            ) : (
                                                <p className="text-sm text-gray-300 px-1 py-2 min-h-[38px]">
                                                    {form[field.key] || <span className="text-gray-600">Not set</span>}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {editing && (
                            <div className="flex gap-3">
                                <button type="submit" disabled={saving} className="btn-primary px-6 py-2.5 text-sm disabled:opacity-60">
                                    {saving ? 'Saving…' : 'Save Changes'}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    disabled={saving}
                                    className="px-6 py-2.5 text-sm rounded-full border border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </section>
            <Footer />
        </div>
    );
}
