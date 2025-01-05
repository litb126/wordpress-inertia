import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import axios from 'axios';

window.axios = axios;
window.axios.defaults.headers.common['X-WP-Nonce'] = window.bbInertia.nonce;

const app = document.getElementById('app');

createInertiaApp({
  resolve: name => {
    const page = require(`./Pages/${name}`).default
    return page
  },
  setup({ el, App, props }) {
    const root = createRoot(el)
    root.render(<App {...props} />)
  },
  page: JSON.parse(app.dataset.page),
});
