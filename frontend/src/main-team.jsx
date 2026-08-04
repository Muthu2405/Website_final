import React from 'react';
import { createRoot } from 'react-dom/client';
import { RocketShowcase } from './components/TeamShowcase/RocketShowcase';

const root = document.getElementById('team-showcase-root');
if (root) {
  createRoot(root).render(<RocketShowcase />);
}
