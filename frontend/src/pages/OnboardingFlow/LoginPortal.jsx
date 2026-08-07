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
            <div className="card login-card">
                <button className="back-link" onClick={onBack}>← back to the universe</button>

                <div className="login-badge">
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <radialGradient id="loginBadgeGrad" cx="40%" cy="35%">
                                <stop offset="0%" stopColor="#f6d488" />
                                <stop offset="100%" stopColor="#c9791f" />
                            </radialGradient>
                        </defs>
                        <path d="M50 10 C 70 10 88 28 88 50 C 88 60 84 68 78 74" fill="none" stroke="url(#loginBadgeGrad)" strokeWidth="3" strokeLinecap="round" />
                        <path d="M50 90 C 30 90 12 72 12 50 C 12 40 16 32 22 26" fill="none" stroke="url(#loginBadgeGrad)" strokeWidth="3" strokeLinecap="round" />
                        <circle cx="50" cy="50" r="9" fill="url(#loginBadgeGrad)" />
                        <circle cx="78" cy="74" r="2.4" fill="#f6d488" />
                        <circle cx="22" cy="26" r="2.4" fill="#f6d488" />
                    </svg>
                </div>

                <h3 className="login-title">Welcome Back</h3>
                <p className="sub login-sub">Sign in to re-enter your universe</p>

                <form onSubmit={handleSubmit}>
                    <div className="step-content">
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

                <div className="login-divider"><span>or</span></div>

                <button
                    type="button"
                    className="btn-google"
                    onClick={() => showToast('Google sign-in is coming soon.')}
                >
                    <svg viewBox="0 0 48 48" width="18" height="18" aria-hidden="true">
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.9-2.26 5.36-4.78 7.02l7.73 6c4.51-4.18 7.09-10.36 7.09-17.49z"/>
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                    </svg>
                    Continue with Google
                </button>

                <div className="switch-line">Don't have an account? <a onClick={onSwitchToSignup}>Sign up instead</a></div>

                <p className="login-proof">
                    Join <b>thousands</b> of founders already exploring their business universe.
                </p>
            </div>

            {toastMsg && (
                <div className={`toast show ${toastMsg.type}`} style={{ zIndex: 1000 }}>
                    {toastMsg.msg}
                </div>
            )}
        </div>
    );
}
