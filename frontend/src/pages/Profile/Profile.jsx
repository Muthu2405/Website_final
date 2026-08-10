import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import StarfieldBackground from '../../components/StarfieldBackground/StarfieldBackground';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import { useData } from '../../context/DataContext';

const FIELD_GROUPS = [
    {
        title: 'Personal Info',
        icon: 'fa-user',
        fields: [
            { key: 'name', label: 'Full Name', type: 'text' },
            { key: 'email', label: 'Email', type: 'email' },
            { key: 'phone', label: 'Phone', type: 'text' },
            { key: 'role', label: 'Role', type: 'text' },
        ],
    },
    {
        title: 'Business Info',
        icon: 'fa-briefcase',
        fields: [
            { key: 'business', label: 'Business Name', type: 'text' },
            { key: 'type', label: 'Business Type', type: 'text' },
            { key: 'category', label: 'Category', type: 'text' },
            { key: 'website', label: 'Website', type: 'text' },
        ],
    },
    {
        title: 'Location',
        icon: 'fa-location-dot',
        fields: [
            { key: 'location', label: 'Address', type: 'text' },
            { key: 'city', label: 'City', type: 'text' },
            { key: 'state', label: 'State', type: 'text' },
            { key: 'country', label: 'Country', type: 'text' },
            { key: 'pincode', label: 'Pincode', type: 'text' },
        ],
    },
];

function getInitials(name) {
    const trimmed = (name || '').trim();
    if (!trimmed) return '?';
    return trimmed.split(/\s+/).map((p) => p[0]).slice(0, 2).join('').toUpperCase();
}

export default function Profile() {
    const { currentUser, updateProfile, loading } = useData();
    const navigate = useNavigate();
    const [form, setForm] = useState(null);
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState(null); // { type: 'success' | 'error', message }
    const timeoutRef = useRef(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    useEffect(() => {
        document.documentElement.classList.add('dashboard-active');
        document.body.classList.add('dashboard-active');
        return () => {
            document.documentElement.classList.remove('dashboard-active');
            document.body.classList.remove('dashboard-active');
        };
    }, []);

    useEffect(() => {
        if (currentUser && !editing) setForm(currentUser);
    }, [currentUser, editing]);

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
                <div style={{ padding: '160px 20px', textAlign: 'center' }}>
                    <p style={{ color: '#9ca3af', fontSize: '15px' }}>Loading profile…</p>
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
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        try {
            await updateProfile(form);
            setStatus({ type: 'success', message: 'Profile updated successfully.' });
            setEditing(false);
        } catch (err) {
            setStatus({ type: 'error', message: err.message || 'Failed to update profile.' });
        } finally {
            setSaving(false);
            timeoutRef.current = setTimeout(() => setStatus(null), 5000);
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

            <section className="section-padding" style={{ paddingTop: '140px' }}>
                <div style={{ maxWidth: '880px', width: '100%', margin: '0 auto', padding: '0 20px', boxSizing: 'border-box' }}>

                    {/* ── Profile hero card ── */}
                    <div
                        style={{
                            position: 'relative',
                            borderRadius: '24px',
                            border: '1px solid rgba(255,255,255,0.08)',
                            background: 'linear-gradient(160deg, rgba(59,130,246,0.10), rgba(139,92,246,0.06) 60%, rgba(11,14,23,0.4))',
                            backdropFilter: 'blur(16px)',
                            padding: '36px',
                            marginBottom: '28px',
                            overflow: 'hidden',
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '24px',
                        }}
                    >
                        <div
                            aria-hidden="true"
                            style={{
                                position: 'absolute',
                                top: '-60px',
                                right: '-60px',
                                width: '220px',
                                height: '220px',
                                borderRadius: '50%',
                                background: 'radial-gradient(circle, rgba(59,130,246,0.28), transparent 70%)',
                                pointerEvents: 'none',
                            }}
                        />

                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', position: 'relative', zIndex: 1 }}>
                            <div
                                style={{
                                    width: '72px',
                                    height: '72px',
                                    minWidth: '72px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                                    boxShadow: '0 6px 24px rgba(59,130,246,0.35)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#fff',
                                    fontSize: '26px',
                                    fontWeight: 700,
                                    letterSpacing: '0.5px',
                                }}
                            >
                                {getInitials(form.name)}
                            </div>
                            <div>
                                <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#fff', margin: 0 }}>
                                    {form.name || 'Your Profile'}
                                </h1>
                                <p style={{ color: '#94a3b8', fontSize: '14px', margin: '6px 0 0' }}>
                                    {form.email || 'No email on file'}
                                </p>
                                {form.role && (
                                    <span
                                        style={{
                                            display: 'inline-block',
                                            marginTop: '10px',
                                            padding: '4px 12px',
                                            borderRadius: '20px',
                                            fontSize: '11px',
                                            fontWeight: 600,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.6px',
                                            color: '#93c5fd',
                                            background: 'rgba(59,130,246,0.14)',
                                            border: '1px solid rgba(59,130,246,0.28)',
                                        }}
                                    >
                                        {form.role}
                                    </span>
                                )}
                            </div>
                        </div>

                        {!editing && (
                            <button
                                type="button"
                                onClick={() => setEditing(true)}
                                className="btn-primary"
                                style={{ position: 'relative', zIndex: 1, fontSize: '14px', padding: '11px 26px', flexShrink: 0 }}
                            >
                                <i className="fas fa-pen" style={{ marginRight: '8px' }}></i>
                                Edit Profile
                            </button>
                        )}
                    </div>

                    {/* ── Status banner ── */}
                    {status && (
                        <div
                            style={{
                                borderRadius: '12px',
                                border: `1px solid ${status.type === 'success' ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
                                background: status.type === 'success' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                                color: status.type === 'success' ? '#4ade80' : '#f87171',
                                padding: '14px 20px',
                                marginBottom: '24px',
                                fontSize: '14px',
                            }}
                        >
                            <i className={`fas ${status.type === 'success' ? 'fa-circle-check' : 'fa-triangle-exclamation'}`} style={{ marginRight: '8px' }}></i>
                            {status.message}
                        </div>
                    )}

                    {/* ── Field groups ── */}
                    <form onSubmit={handleSave}>
                        {FIELD_GROUPS.map((group) => (
                            <div
                                key={group.title}
                                style={{
                                    background: 'rgba(15,20,32,0.6)',
                                    border: '1px solid rgba(255,255,255,0.07)',
                                    borderRadius: '18px',
                                    padding: '28px',
                                    marginBottom: '20px',
                                    backdropFilter: 'blur(10px)',
                                }}
                            >
                                <h2
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        fontSize: '15px',
                                        fontWeight: 700,
                                        color: '#fff',
                                        margin: '0 0 20px',
                                        letterSpacing: '0.2px',
                                    }}
                                >
                                    <span
                                        style={{
                                            width: '30px',
                                            height: '30px',
                                            borderRadius: '9px',
                                            background: 'rgba(59,130,246,0.14)',
                                            border: '1px solid rgba(59,130,246,0.25)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#60a5fa',
                                            fontSize: '13px',
                                        }}
                                    >
                                        <i className={`fas ${group.icon}`}></i>
                                    </span>
                                    {group.title}
                                </h2>

                                <div
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                                        columnGap: '28px',
                                        rowGap: '20px',
                                    }}
                                >
                                    {group.fields.map((field) => (
                                        <div key={field.key}>
                                            <label
                                                style={{
                                                    display: 'block',
                                                    fontSize: '12px',
                                                    fontWeight: 600,
                                                    color: '#94a3b8',
                                                    marginBottom: '7px',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.4px',
                                                }}
                                            >
                                                {field.label}
                                            </label>
                                            {editing ? (
                                                <input
                                                    type={field.type}
                                                    className="input-field"
                                                    value={form[field.key] || ''}
                                                    onChange={(e) => handleChange(field.key, e.target.value)}
                                                    placeholder={field.label}
                                                    style={{ fontSize: '14px', padding: '11px 14px' }}
                                                />
                                            ) : (
                                                <p style={{ fontSize: '14.5px', color: '#e2e8f0', margin: 0, minHeight: '20px' }}>
                                                    {form[field.key] || <span style={{ color: '#4b5563' }}>Not set</span>}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {editing && (
                            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="btn-primary"
                                    style={{ fontSize: '14px', padding: '11px 28px', opacity: saving ? 0.6 : 1, cursor: saving ? 'default' : 'pointer' }}
                                >
                                    {saving ? 'Saving…' : 'Save Changes'}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    disabled={saving}
                                    style={{
                                        fontSize: '14px',
                                        padding: '11px 28px',
                                        borderRadius: '40px',
                                        border: '1px solid rgba(255,255,255,0.15)',
                                        background: 'transparent',
                                        color: '#cbd5e1',
                                        cursor: saving ? 'default' : 'pointer',
                                        transition: 'all 0.2s ease',
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.color = '#fff'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = '#cbd5e1'; }}
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