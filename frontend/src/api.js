/**
 * Single API client for the Django REST backend (see /backend).
 *
 * Base URL comes from VITE_API_BASE_URL (see .env.example), falling back
 * to http://localhost:8000/api for local dev.
 *
 * Usage:
 *   import { services, testimonials, auth } from './api';
 *   const list = await services.list();
 *   await auth.login({ email, password });
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
const TOKEN_KEY = 'bu_auth_token';

export function getToken() {
    return localStorage.getItem(TOKEN_KEY) || '';
}

function setToken(token) {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
}

class ApiError extends Error {
    constructor(message, status, data) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.data = data;
    }
}

/**
 * Core request helper. Adds the auth token (if present), JSON-encodes the
 * body, and throws ApiError with the parsed error payload on non-2xx.
 */
async function request(path, { method = 'GET', body, headers = {}, auth: requireAuth = false } = {}) {
    const token = getToken();
    if (requireAuth && !token) {
        throw new ApiError('Not authenticated.', 401, null);
    }

    const res = await fetch(`${BASE_URL}${path}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Token ${token}` } : {}),
            ...headers,
        },
        body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    // 204 No Content — nothing to parse
    if (res.status === 204) return null;

    let data = null;
    const text = await res.text();
    if (text) {
        try {
            data = JSON.parse(text);
        } catch {
            data = text;
        }
    }

    if (!res.ok) {
        const message =
            (data && (data.detail || data.error)) ||
            `Request failed with status ${res.status}`;
        throw new ApiError(message, res.status, data);
    }

    return data;
}

/** Generic CRUD helpers for a DRF ModelViewSet resource, e.g. /services/ */
function resource(path) {
    return {
        list: () => request(`${path}/`),
        get: (id) => request(`${path}/${id}/`),
        create: (payload) => request(`${path}/`, { method: 'POST', body: payload, auth: true }),
        update: (id, payload) => request(`${path}/${id}/`, { method: 'PUT', body: payload, auth: true }),
        patch: (id, payload) => request(`${path}/${id}/`, { method: 'PATCH', body: payload, auth: true }),
        remove: (id) => request(`${path}/${id}/`, { method: 'DELETE', auth: true }),
    };
}

export const services = resource('/services');
export const projects = resource('/projects');
export const team = resource('/team');
export const testimonials = resource('/testimonials');
export const pricing = resource('/pricing');

export const auth = {
    async signup(payload) {
        const data = await request('/auth/signup/', { method: 'POST', body: payload });
        setToken(data.token);
        return data.user;
    },
    async login({ email, password }) {
        const data = await request('/auth/login/', { method: 'POST', body: { email, password } });
        setToken(data.token);
        return data.user;
    },
    async logout() {
        try {
            await request('/auth/logout/', { method: 'POST', auth: true });
        } finally {
            setToken(null);
        }
    },
    me: () => request('/auth/me/', { auth: true }),
    updateMe: (payload) => request('/auth/me/', { method: 'PATCH', body: payload, auth: true }),
    isAuthenticated: () => Boolean(getToken()),
};

export { ApiError };

export default { services, projects, team, testimonials, pricing, auth, ApiError, getToken };
