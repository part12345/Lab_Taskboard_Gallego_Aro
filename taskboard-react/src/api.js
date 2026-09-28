const API_URL = 'http://127.0.0.1:8000/api';

export async function api(path, options = {}) {
    const token = localStorage.getItem('token');

    const headers = {
        Accept: 'application/json',
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...(options.headers || {}),
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers,
    });

    let data = null;

    try {
        data = await response.json();
    } catch {
        data = null;
    }

    if (!response.ok) {
        throw new Error(
            data?.message || `Request failed with status ${response.status}`
        );
    }

    return data;
}