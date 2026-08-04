import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { auth, ApiError } from '../../api';

export default function RegistrationPortal({ planet, onBack, onComplete, onSwitchToLogin }) {
    const navigate = useNavigate();
    const { setCurrentUser } = useData();
    const [step, setStep] = useState(0);
    const [submitting, setSubmitting] = useState(false);

    // Form state
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [referral, setReferral] = useState('');
    const [role, setRole] = useState('');

    const [business, setBusiness] = useState('');
    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');
    const [city, setCity] = useState('');
    const [stateLocation, setStateLocation] = useState('');
    const [country, setCountry] = useState('');
    const [pincode, setPincode] = useState('');
    const [website, setWebsite] = useState('');

    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const [pass2, setPass2] = useState('');

    const [agreeTerms, setAgreeTerms] = useState(false);
    const [agreePrivacy, setAgreePrivacy] = useState(false);
    const [agreeMarketing, setAgreeMarketing] = useState(false);

    const [toastMsg, setToastMsg] = useState(null);

    // Dynamic styles based on planet
    useEffect(() => {
        if (planet && planet.glow) {
            document.documentElement.style.setProperty('--pcol', planet.glow);
        }
    }, [planet]);

    const showToast = (msg, type = 'error') => {
        setToastMsg({ msg, type });
        setTimeout(() => setToastMsg(null), 3000);
    };

    const handleNext = (e) => {
        e.preventDefault();
        
        if (step === 0) {
            setStep(1);
        } else if (step === 1) {
            if (!name || !phone || !email || !role) {
                showToast('Please fill in all required fields.');
                return;
            }
            if (!email.includes('@')) {
                showToast('Please enter a valid email.');
                return;
            }
            setStep(2);
        } else if (step === 2) {
            if (!business || !type || !category || !location || !city || !stateLocation || !country || !pincode) {
                showToast('Please fill in all required fields.');
                return;
            }
            setStep(3);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !phone || !role || !business || !type || !category || !location || !city ||
            !stateLocation || !country || !pincode || !pass) {
            showToast('Please fill in all required fields.');
            return;
        }
        if (pass.length < 6) {
            showToast('Password must be at least 6 characters.');
            return;
        }
        if (pass !== pass2) {
            showToast('Passwords do not match.');
            return;
        }
        if (!agreeTerms || !agreePrivacy) {
            showToast('Please agree to the Terms and Privacy Policy.');
            return;
        }

        setSubmitting(true);
        try {
            const user = await auth.signup({
                name, email, phone, referral, role, business, type, category, location, city,
                state: stateLocation, country, pincode, website, username,
                password: pass, agree_marketing: agreeMarketing, planet_id: planet.id,
            });
            setCurrentUser(user);
            if (onComplete) onComplete(user);
        } catch (err) {
            showToast(err instanceof ApiError ? err.message : 'Could not create your account. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const getPwScore = () => {
        let score = 0;
        if (pass.length >= 6) score++;
        if (pass.length >= 10) score++;
        if (/[0-9]/.test(pass) && /[a-zA-Z]/.test(pass)) score++;
        if (/[^a-zA-Z0-9]/.test(pass)) score++;
        return score;
    };

    const score = getPwScore();
    const pwColors = ['#f87171', '#f87171', '#fbbf24', '#4ade80', '#4ade80'];
    const pwLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];

    if (!planet) return null;

    const steps = ['Choose Domain', 'Your Details', 'Business Info', 'Set Password'];

    return (
        <div className="overlay-view show" id="portal-view">
            <div className="overlay-bg"></div>
            <div className="card">
                <button className="back-link" onClick={onBack}>← back to the universe</button>
                
                <div className="stepper" id="step-dots">
                    {steps.map((s, i) => (
                        <div key={i} className={`step-item ${i < step ? 'done' : ''} ${i === step ? 'active' : ''}`} data-step={i}>
                            <div className="step-circle">{i < step ? '✓' : (i + 1)}</div>
                            <div className="step-label">{s.split(' ')[1] || s}</div>
                        </div>
                    ))}
                </div>

                <div className="eyebrow">Step {step + 1} of 4 · {steps[step]}</div>
                <h3>{planet.emoji} {planet.name} Portal</h3>
                <p className="sub">Create your account to begin your journey in the {planet.cat} world.</p>

                <form onSubmit={step === 3 ? handleSubmit : handleNext}>
                    {step === 0 && (
                        <div className="step-content">
                            <div className="field">
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '14px', padding: '14px', background: 'rgba(255,255,255,.03)', borderRadius: '12px', border: '1px solid var(--glass-border)', position: 'relative' }}>
                                    <div style={{ fontSize: '36px', lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {planet.emoji}
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <div style={{ fontWeight: 600, fontSize: '16px', lineHeight: 1.2 }}>{planet.name} · {planet.cat}</div>
                                        <div style={{ fontSize: '11px', color: 'var(--dim)', marginTop: '4px' }}>{planet.cat} Universe</div>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <label style={{ color: 'var(--pcol)', fontSize: '11.5px' }}>Businesses under this planet</label>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                                    {(planet.types || []).map((t, i) => (
                                        <span key={i} style={{ padding: '3px 12px', borderRadius: '999px', background: 'rgba(255,255,255,.06)', border: '1px solid var(--glass-border)', fontSize: '11px', color: 'var(--dim)' }}>{t}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="field">
                                <label>Description</label>
                                <div style={{ fontSize: '12.5px', color: 'var(--dim)', lineHeight: 1.65, padding: '2px 0' }}>{planet.desc || `This universe is dedicated to ${planet.cat} businesses.`}</div>
                            </div>
                            <div className="field-hint" style={{ marginBottom: '10px' }}>If your business belongs to one of the above categories, continue.</div>
                            
                            <div className="step-actions-row">
                                <button className="btn-secondary" type="button" onClick={onBack}>Change Planet</button>
                                <button className="btn-primary" type="submit" style={{ marginTop: 0 }}>Continue →</button>
                            </div>
                        </div>
                    )}

                    {step === 1 && (
                        <div className="step-content">
                            <div style={{ fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--pcol)', marginBottom: '10px' }}>Tell us about yourself</div>
                            <div className="field field-ic"><label>Full Name *</label><span className="ic">👤</span><input required placeholder="Enter your full name" value={name} onChange={e => setName(e.target.value)} /></div>
                            <div className="field field-ic"><label>Mobile Number *</label><span className="ic">📱</span><input required type="tel" placeholder="Enter mobile number" value={phone} onChange={e => setPhone(e.target.value)} /></div>
                            <div className="field field-ic"><label>Email Address *</label><span className="ic">📧</span><input required type="email" placeholder="Enter email address" value={email} onChange={e => setEmail(e.target.value)} /></div>
                            <div className="field field-ic"><label>Referral Code (Optional)</label><span className="ic">🎁</span><input placeholder="Enter referral code" value={referral} onChange={e => setReferral(e.target.value)} /></div>
                            <div className="field"><label>Business Role *</label><select required value={role} onChange={e => setRole(e.target.value)}>
                                <option value="">Select your role</option>
                                <option value="Owner">Owner</option>
                                <option value="Manager">Manager</option>
                                <option value="Staff">Staff</option>
                                <option value="Partner">Partner</option>
                                <option value="Other">Other</option>
                            </select></div>
                            <div className="step-actions-row">
                                <button className="btn-secondary" type="button" onClick={() => setStep(0)}>← Back</button>
                                <button className="btn-primary" type="submit" style={{ marginTop: 0 }}>Continue →</button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="step-content">
                            <div style={{ fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--pcol)', marginBottom: '10px' }}>Business Information</div>
                            <div className="field field-ic"><label>Company / Business Name *</label><span className="ic">🏢</span><input required placeholder="Enter company or hotel name" value={business} onChange={e => setBusiness(e.target.value)} /></div>
                            <div className="row2">
                                <div className="field"><label>Business Type *</label><select required value={type} onChange={e => setType(e.target.value)}>
                                    <option value="">Select business type…</option>
                                    {(planet.types || []).map((t, i) => <option key={i} value={t}>{t}</option>)}
                                </select></div>
                                <div className="field"><label>Category *</label><select required value={category} onChange={e => setCategory(e.target.value)}>
                                    <option value="">Select category…</option>
                                    <option value={planet.cat}>{planet.cat}</option>
                                    <option value="Retail">Retail</option>
                                    <option value="Service">Service</option>
                                    <option value="Tech">Tech</option>
                                    <option value="Other">Other</option>
                                </select></div>
                            </div>
                            <div className="field field-ic"><label>Location *</label><span className="ic">📍</span><input required placeholder="Enter your location" value={location} onChange={e => setLocation(e.target.value)} /></div>
                            <div className="row2">
                                <div className="field"><label>City *</label><input required placeholder="Enter city" value={city} onChange={e => setCity(e.target.value)} /></div>
                                <div className="field"><label>State *</label><input required placeholder="Enter state" value={stateLocation} onChange={e => setStateLocation(e.target.value)} /></div>
                            </div>
                            <div className="row2">
                                <div className="field"><label>Country *</label><select required value={country} onChange={e => setCountry(e.target.value)}>
                                    <option value="">Select country</option>
                                    <option>India</option><option>United States</option><option>United Kingdom</option>
                                    <option>United Arab Emirates</option><option>Canada</option><option>Australia</option>
                                    <option>Other</option>
                                </select></div>
                                <div className="field"><label>Pincode *</label><input required placeholder="Enter pincode" value={pincode} onChange={e => setPincode(e.target.value)} /></div>
                            </div>
                            <div className="field field-ic"><label>Website (Optional)</label><span className="ic">🔗</span><input placeholder="https://yourwebsite.com" value={website} onChange={e => setWebsite(e.target.value)} /></div>
                            <div className="step-actions-row">
                                <button className="btn-secondary" type="button" onClick={() => setStep(1)}>← Back</button>
                                <button className="btn-primary" type="submit" style={{ marginTop: 0 }}>Continue →</button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="step-content">
                            <div style={{ fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--pcol)', marginBottom: '10px' }}>Secure Your Account</div>
                            <div className="field field-ic"><label>Username (Optional)</label><span className="ic">🙂</span><input placeholder="Choose a username" value={username} onChange={e => setUsername(e.target.value)} /></div>
                            <div className="field field-ic">
                                <label>Password *</label><span className="ic">🔒</span>
                                <input required type="password" placeholder="Enter password" value={pass} onChange={e => setPass(e.target.value)} />
                                <div className="pw-meter">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="seg" style={{ background: i <= score ? pwColors[score] : 'rgba(255,255,255,.1)' }}></div>
                                    ))}
                                </div>
                                <div className="pw-strength-label" style={{ color: pass ? pwColors[score] : 'var(--dim)' }}>
                                    {pass ? (pwLabels[score] || 'Weak') : 'Password strength'}
                                </div>
                            </div>
                            <div className="field field-ic"><label>Confirm Password *</label><span className="ic">🔒</span><input required type="password" placeholder="Confirm password" value={pass2} onChange={e => setPass2(e.target.value)} /></div>
                            <div style={{ marginTop: '16px' }}>
                                <label className="check-row"><input type="checkbox" checked={agreeTerms} onChange={e => setAgreeTerms(e.target.checked)} /> I agree to the <a>Terms &amp; Conditions</a></label>
                                <label className="check-row"><input type="checkbox" checked={agreePrivacy} onChange={e => setAgreePrivacy(e.target.checked)} /> I agree to the <a>Privacy Policy</a></label>
                                <label className="check-row"><input type="checkbox" checked={agreeMarketing} onChange={e => setAgreeMarketing(e.target.checked)} /> I want to receive updates and offers via email</label>
                            </div>
                            <div className="step-actions-row">
                                <button className="btn-secondary" type="button" onClick={() => setStep(2)} disabled={submitting}>← Back</button>
                                <button className="btn-primary" type="submit" style={{ marginTop: 0 }} disabled={submitting}>
                                    {submitting ? 'Creating Account…' : 'Create Account 🚀'}
                                </button>
                            </div>
                        </div>
                    )}
                </form>
                
                <div className="switch-line">Already registered? <a onClick={onSwitchToLogin}>Log in instead</a></div>
            </div>

            {toastMsg && (
                <div className={`toast show ${toastMsg.type}`} style={{ zIndex: 1000 }}>
                    {toastMsg.msg}
                </div>
            )}
        </div>
    );
}
