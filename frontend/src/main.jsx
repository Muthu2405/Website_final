import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Note: intentionally not using React.StrictMode here. StrictMode double-
// invokes effects in dev to surface side-effect bugs, but LegacyPage's
// wrapped script attaches event listeners directly to DOM elements
// (getElementById().addEventListener) that persist across that double
// invoke — so the second run adds a duplicate set of listeners, causing
// every click to fire twice (which breaks toggle/open-close logic). This
// isn't a real bug to fix in the legacy script; it's a structural mismatch
// between StrictMode's dev-only double-mount and non-React DOM code.
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
