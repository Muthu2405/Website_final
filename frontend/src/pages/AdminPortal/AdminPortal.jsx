import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { services as servicesApi, projects as projectsApi, team as teamApi,
    testimonials as testimonialsApi, pricing as pricingApi, adminUsers, ApiError } from '../../api';
import StarfieldBackground from '../../components/StarfieldBackground/StarfieldBackground';
import './AdminPortal.css';

const SECTIONS = [
    { key: 'overview', label: 'Overview', icon: 'fa-chart-simple' },
    { key: 'services', label: 'Services', icon: 'fa-layer-group' },
    { key: 'team', label: 'Team', icon: 'fa-users' },
    { key: 'projects', label: 'Projects', icon: 'fa-diagram-project' },
    { key: 'testimonials', label: 'Testimonials', icon: 'fa-quote-left' },
    { key: 'pricing', label: 'Pricing', icon: 'fa-tags' },
    { key: 'users', label: 'Users', icon: 'fa-user-astronaut' },
];

// Field schema per content resource — drives both the table columns and the edit form.
const SCHEMAS = {
    services: {
        api: servicesApi, dataKey: 'services', label: 'Service', titleField: 'title',
        fields: [
            { name: 'title', label: 'Title', type: 'text', required: true },
            { name: 'icon', label: 'Icon (FA class)', type: 'text' },
            { name: 'desc', label: 'Description', type: 'textarea' },
            { name: 'price', label: 'Price', type: 'text' },
            { name: 'time', label: 'Timeline', type: 'text' },
            { name: 'order', label: 'Order', type: 'number' },
        ],
    },
    team: {
        api: teamApi, dataKey: 'team', label: 'Team Member', titleField: 'name',
        fields: [
            { name: 'name', label: 'Name', type: 'text', required: true },
            { name: 'role', label: 'Role', type: 'text' },
            { name: 'skills', label: 'Skills', type: 'text' },
            { name: 'experience', label: 'Experience', type: 'text' },
            { name: 'bio', label: 'Bio', type: 'textarea' },
            { name: 'photo', label: 'Photo URL', type: 'text' },
            { name: 'order', label: 'Order', type: 'number' },
        ],
    },
    projects: {
        api: projectsApi, dataKey: 'projects', label: 'Project', titleField: 'title',
        fields: [
            { name: 'title', label: 'Title', type: 'text', required: true },
            { name: 'desc', label: 'Short Description', type: 'textarea' },
            { name: 'long_desc', label: 'Long Description', type: 'textarea' },
            { name: 'img', label: 'Image URL', type: 'text' },
            { name: 'order', label: 'Order', type: 'number' },
        ],
    },
    testimonials: {
        api: testimonialsApi, dataKey: 'testimonials', label: 'Testimonial', titleField: 'name',
        fields: [
            { name: 'name', label: 'Name', type: 'text', required: true },
            { name: 'role', label: 'Role', type: 'text' },
            { name: 'text', label: 'Quote', type: 'textarea' },
            { name: 'highlight', label: 'Highlight', type: 'text' },
            { name: 'image', label: 'Image URL', type: 'text' },
            { name: 'rating', label: 'Rating (1-5)', type: 'number' },
            { name: 'order', label: 'Order', type: 'number' },
        ],
    },
    pricing: {
        api: pricingApi, dataKey: 'pricing', label: 'Pricing Plan', titleField: 'name',
        fields: [
            { name: 'name', label: 'Plan Name', type: 'text', required: true },
            { name: 'price', label: 'Price', type: 'text' },
            { name: 'desc', label: 'Description', type: 'textarea' },
            { name: 'features', label: 'Features (one per line)', type: 'textarea' },
            { name: 'order', label: 'Order', type: 'number' },
        ],
    },
};

function emptyForm(fields) {
    const f = {};
    fields.forEach((field) => { f[field.name] = field.type === 'number' ? 0 : ''; });
    return f;
}

function ResourceManager({ resourceKey }) {
    const schema = SCHEMAS[resourceKey];
    const dataCtx = useData();
    const items = dataCtx[schema.dataKey] || [];
    const setItems = dataCtx[`set${schema.dataKey[0].toUpperCase()}${schema.dataKey.slice(1)}`];

    const [editingId, setEditingId] = useState(null); // null = not editing, 'new' = creating
    const [form, setForm] = useState(emptyForm(schema.fields));
    const [busy, setBusy] = useState(false);
    const [err, setErr] = useState('');

    const startCreate = () => { setForm(emptyForm(schema.fields)); setEditingId('new'); setErr(''); };
    const startEdit = (item) => {
        const f = {};
        schema.fields.forEach((field) => { f[field.name] = item[field.name] ?? (field.type === 'number' ? 0 : ''); });
        setForm(f);
        setEditingId(item.id);
        setErr('');
    };
    const cancel = () => { setEditingId(null); setErr(''); };

    const handleSave = async (e) => {
        e.preventDefault();
        setBusy(true);
        setErr('');
        try {
            if (editingId === 'new') {
                const created = await schema.api.create(form);
                setItems([...items, created]);
            } else {
                const updated = await schema.api.patch(editingId, form);
                setItems(items.map((it) => (it.id === editingId ? updated : it)));
            }
            setEditingId(null);
        } catch (e2) {
            setErr(e2 instanceof ApiError ? e2.message : 'Save failed.');
        } finally {
            setBusy(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm(`Delete this ${schema.label.toLowerCase()}? This cannot be undone.`)) return;
        try {
            await schema.api.remove(id);
            setItems(items.filter((it) => it.id !== id));
        } catch (e2) {
            alert(e2 instanceof ApiError ? e2.message : 'Delete failed.');
        }
    };

    return (
        <div className="admin-panel">
            <div className="admin-panel-head">
                <h2>{schema.label}s <span className="admin-count">{items.length}</span></h2>
                <button className="admin-btn admin-btn-primary" onClick={startCreate}>
                    <i className="fas fa-plus"></i> Add {schema.label}
                </button>
            </div>

            {editingId !== null && (
                <form className="admin-form" onSubmit={handleSave}>
                    <h3>{editingId === 'new' ? `New ${schema.label}` : `Edit ${schema.label}`}</h3>
                    <div className="admin-form-grid">
                        {schema.fields.map((field) => (
                            <div key={field.name} className={`admin-field ${field.type === 'textarea' ? 'admin-field-wide' : ''}`}>
                                <label>{field.label}{field.required && <span className="req">*</span>}</label>
                                {field.type === 'textarea' ? (
                                    <textarea
                                        rows={3}
                                        required={field.required}
                                        value={form[field.name]}
                                        onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                                    />
                                ) : (
                                    <input
                                        type={field.type}
                                        required={field.required}
                                        value={form[field.name]}
                                        onChange={(e) => setForm({
                                            ...form,
                                            [field.name]: field.type === 'number' ? Number(e.target.value) : e.target.value,
                                        })}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    {err && <div className="admin-error">{err}</div>}
                    <div className="admin-form-actions">
                        <button type="button" className="admin-btn" onClick={cancel} disabled={busy}>Cancel</button>
                        <button type="submit" className="admin-btn admin-btn-primary" disabled={busy}>
                            {busy ? 'Saving…' : 'Save'}
                        </button>
                    </div>
                </form>
            )}

            <div className="admin-table-wrap">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>{schema.titleField === 'title' ? 'Title' : 'Name'}</th>
                            <th>Order</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.length === 0 && (
                            <tr><td colSpan={3} className="admin-empty">No {schema.label.toLowerCase()}s yet.</td></tr>
                        )}
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td>{item[schema.titleField]}</td>
                                <td>{item.order ?? '—'}</td>
                                <td className="admin-row-actions">
                                    <button className="admin-icon-btn" onClick={() => startEdit(item)} title="Edit">
                                        <i className="fas fa-pen"></i>
                                    </button>
                                    <button className="admin-icon-btn admin-icon-danger" onClick={() => handleDelete(item.id)} title="Delete">
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function UsersManager() {
    const { currentUser } = useData();
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState('');

    React.useEffect(() => {
        adminUsers.list()
            .then((data) => setUsers(data))
            .catch((e) => setErr(e instanceof ApiError ? e.message : 'Failed to load users.'))
            .finally(() => setLoading(false));
    }, []);

    const toggleAdmin = async (u) => {
        try {
            const updated = await adminUsers.setAdmin(u.id, !u.is_admin);
            setUsers(users.map((x) => (x.id === u.id ? updated : x)));
        } catch (e) {
            alert(e instanceof ApiError ? e.message : 'Update failed.');
        }
    };

    const removeUser = async (u) => {
        if (u.id === currentUser.id) {
            alert("You can't remove your own account from here.");
            return;
        }
        if (!window.confirm(`Remove ${u.name || u.email}? This cannot be undone.`)) return;
        try {
            await adminUsers.remove(u.id);
            setUsers(users.filter((x) => x.id !== u.id));
        } catch (e) {
            alert(e instanceof ApiError ? e.message : 'Delete failed.');
        }
    };

    return (
        <div className="admin-panel">
            <div className="admin-panel-head">
                <h2>Registered Users {users && <span className="admin-count">{users.length}</span>}</h2>
            </div>
            {loading && <p className="admin-dim">Loading users…</p>}
            {err && <div className="admin-error">{err}</div>}
            {users && (
                <div className="admin-table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Business</th>
                                <th>Joined</th>
                                <th>Role</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length === 0 && (
                                <tr><td colSpan={6} className="admin-empty">No registered users yet.</td></tr>
                            )}
                            {users.map((u) => (
                                <tr key={u.id}>
                                    <td>{u.name || '—'}</td>
                                    <td>{u.email}</td>
                                    <td>{u.business || '—'}</td>
                                    <td>{u.created_at ? new Date(u.created_at).toLocaleDateString() : '—'}</td>
                                    <td>
                                        <span className={`admin-badge ${u.is_admin ? 'admin-badge-gold' : ''}`}>
                                            {u.is_admin ? 'Admin' : 'Member'}
                                        </span>
                                    </td>
                                    <td className="admin-row-actions">
                                        <button className="admin-icon-btn" onClick={() => toggleAdmin(u)} title={u.is_admin ? 'Revoke admin' : 'Make admin'}>
                                            <i className={`fas ${u.is_admin ? 'fa-shield' : 'fa-shield-halved'}`}></i>
                                        </button>
                                        <button className="admin-icon-btn admin-icon-danger" onClick={() => removeUser(u)} title="Remove">
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

function Overview({ onNavigate }) {
    const { services: sv, team: tm, projects: pj, testimonials: ts, pricing: pr } = useData();
    const cards = [
        { key: 'services', label: 'Services', count: sv.length, icon: 'fa-layer-group' },
        { key: 'team', label: 'Team Members', count: tm.length, icon: 'fa-users' },
        { key: 'projects', label: 'Projects', count: pj.length, icon: 'fa-diagram-project' },
        { key: 'testimonials', label: 'Testimonials', count: ts.length, icon: 'fa-quote-left' },
        { key: 'pricing', label: 'Pricing Plans', count: pr.length, icon: 'fa-tags' },
    ];
    return (
        <div className="admin-panel">
            <div className="admin-panel-head"><h2>Mission Control</h2></div>
            <div className="admin-stat-grid">
                {cards.map((c) => (
                    <button key={c.key} className="admin-stat-card" onClick={() => onNavigate(c.key)}>
                        <i className={`fas ${c.icon}`}></i>
                        <div className="admin-stat-num">{c.count}</div>
                        <div className="admin-stat-label">{c.label}</div>
                    </button>
                ))}
                <button className="admin-stat-card" onClick={() => onNavigate('users')}>
                    <i className="fas fa-user-astronaut"></i>
                    <div className="admin-stat-num">—</div>
                    <div className="admin-stat-label">Registered Users</div>
                </button>
            </div>
        </div>
    );
}

export default function AdminPortal() {
    const { currentUser } = useData();
    const navigate = useNavigate();
    const [active, setActive] = useState('overview');

    return (
        <div className="admin-root">
            <StarfieldBackground />
            <aside className="admin-sidebar">
                <div className="admin-brand" onClick={() => navigate('/dashboard')}>
                    <i className="fas fa-rocket"></i> Agency<span>.</span>
                </div>
                <nav className="admin-nav">
                    {SECTIONS.map((s) => (
                        <button
                            key={s.key}
                            className={`admin-nav-item ${active === s.key ? 'active' : ''}`}
                            onClick={() => setActive(s.key)}
                        >
                            <i className={`fas ${s.icon}`}></i> {s.label}
                        </button>
                    ))}
                </nav>
                <button className="admin-back" onClick={() => navigate('/dashboard')}>
                    <i className="fas fa-arrow-left"></i> Back to Site
                </button>
            </aside>

            <main className="admin-main">
                <header className="admin-topbar">
                    <h1>Admin Control Center</h1>
                    <div className="admin-user-chip">
                        <i className="fas fa-user-astronaut"></i> {currentUser?.name || currentUser?.email}
                    </div>
                </header>

                {active === 'overview' && <Overview onNavigate={setActive} />}
                {active === 'users' ? <UsersManager /> : (active !== 'overview' && <ResourceManager resourceKey={active} />)}
            </main>
        </div>
    );
}
