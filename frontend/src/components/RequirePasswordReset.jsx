import { useState } from 'react';
import { auth, ApiError } from '../api';
import { useData } from '../context/DataContext';

// Blocks access to whatever it wraps until the logged-in account's
// must_change_password flag is cleared — covers both the immediately-after-
// login case (LoginPortal handles that inline) and direct/refreshed
// navigation straight to a protected route while the flag is still set.
export default function RequirePasswordReset({ children }) {
    const { currentUser, setCurrentUser } = useData();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPassword2, setNewPassword2] = useState('');
    const [err, setErr] = useState('');
    const [busy, setBusy] = useState(false);

    if (!currentUser?.must_change_password) {
        return children;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr('');
        if (newPassword.length < 6) {
            setErr('New password must be at least 6 characters.');
            return;
        }
        if (newPassword !== newPassword2) {
            setErr('Passwords do not match.');
            return;
        }
        setBusy(true);
        try {
            const updated = await auth.changePassword(currentPassword, newPassword);
            setCurrentUser(updated);
        } catch (e2) {
            setErr(e2 instanceof ApiError ? e2.message : 'Could not update password.');
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className="overlay-view show" id="force-password-view">
            <div className="overlay-bg"></div>
            <div className="card login-card">
                <h3 className="login-title">Set a New Password</h3>
                <p className="sub login-sub">Your account still has a temporary password. Set your own before continuing.</p>
                <form onSubmit={handleSubmit}>
                    <div className="step-content">
                        <div className="field field-ic">
                            <label>Current (Temporary) Password *</label><span className="ic">🔒</span>
                            <input required type="password" placeholder="Enter current password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
                        </div>
                        <div className="field field-ic">
                            <label>New Password *</label><span className="ic">🔒</span>
                            <input required type="password" placeholder="Enter new password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                        </div>
                        <div className="field field-ic">
                            <label>Confirm Password *</label><span className="ic">🔒</span>
                            <input required type="password" placeholder="Re-enter new password" value={newPassword2} onChange={e => setNewPassword2(e.target.value)} />
                        </div>
                        {err && <div className="admin-error">{err}</div>}
                        <div className="step-actions-row">
                            <button className="btn-primary" type="submit" style={{ marginTop: 0, width: '100%' }} disabled={busy}>
                                {busy ? 'Saving…' : 'Set Password →'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
