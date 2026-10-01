const API_BASE_URL = "http://localhost:8000/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, { headers: { "Content-Type": "application/json", ...options.headers }, ...options });
  if (!response.ok) { const error = await response.json().catch(() => ({})); throw new Error(error.detail || "The API request failed."); }
  return response.status === 204 ? null : response.json();
}
export const apiGet = (path) => request(path);
export const apiPost = (path, data) => request(path, { method: "POST", body: JSON.stringify(data) });
export const apiPatch = (path, data) => request(path, { method: "PATCH", body: JSON.stringify(data) });
export const apiDelete = (path) => request(path, { method: "DELETE" });
