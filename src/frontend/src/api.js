// small wrapper for calls; will forward to Express server which proxies to Django backend
export default function apiFetch(path, { method = 'GET', body, token } = {}) {
const headers = { 'Content-Type': 'application/json' };
if (token) headers['Authorization'] = `Token ${token}`;
return fetch('/api' + path, {
method,
headers,
body: body ? JSON.stringify(body) : undefined,
}).then(async r => {
if (!r.ok) throw new Error(await r.text());
return r.json();
});
}