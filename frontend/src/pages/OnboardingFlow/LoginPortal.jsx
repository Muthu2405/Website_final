import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { auth, ApiError } from '../../api';

export default function LoginPortal({ onBack, onSwitchToSignup, onComplete }) {
    const navigate = useNavigate();
    const { setCurrentUser } = useData();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [toastMsg, setToastMsg] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const showToast = (msg, type = 'error') => {
        setToastMsg({ msg, type });
        setTimeout(() => setToastMsg(null), 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !pass) {
            showToast('Please enter your email and password.');
            return;
        }

        setSubmitting(true);
        try {
            const user = await auth.login({ email, password: pass });
            showToast('Welcome back!', 'success');
            setCurrentUser(user);
            if (onComplete) onComplete(user);
            navigate('/dashboard');
        } catch (err) {
            showToast(err instanceof ApiError ? err.message : 'Could not log in. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="overlay-view show" id="login-view">
            <div className="overlay-bg"></div>
            <div className="card">
                <button className="back-link" onClick={onBack}>← back to the universe</button>

                <form onSubmit={handleSubmit}>
                    <div className="step-content">
                        <div style={{ fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--pcol)', marginBottom: '10px' }}>Welcome Back</div>
                        <div className="field field-ic">
                            <label>Email Address *</label><span className="ic">📧</span>
                            <input required type="email" placeholder="Enter email address" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="field field-ic">
                            <label>Password *</label><span className="ic">🔒</span>
                            <input required type="password" placeholder="Enter password" value={pass} onChange={e => setPass(e.target.value)} />
                        </div>
                        <div className="step-actions-row">
                            <button className="btn-primary" type="submit" style={{ marginTop: 0, width: '100%' }} disabled={submitting}>
                                {submitting ? 'Logging In…' : 'Log In →'}
                            </button>
                        </div>
                    </div>
                </form>

                <div className="switch-line">Don't have an account? <a onClick={onSwitchToSignup}>Sign up instead</a></div>
            </div>

            {toastMsg && (
                <div className={`toast show ${toastMsg.type}`} style={{ zIndex: 1000 }}>
                    {toastMsg.msg}
                </div>
            )}
        </div>
    );
}
