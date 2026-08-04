import React from 'react';
import ReactDOM from 'react-dom/client';
import RocketShowcase from '../components/TeamShowcase/RocketShowcase';

const mount = document.getElementById('team-react-mount');
if (mount) {
  ReactDOM.createRoot(mount).render(<RocketShowcase />);
} else {
  console.warn('[full.html] #team-react-mount not found — team showcase not mounted.');
}
