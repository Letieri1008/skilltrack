import { apiDelete, apiGet, apiPost } from "../../services/api";
export async function getModels() { const data = await apiGet("/models/"); return data.results || data; }
export function saveModel(model) { return apiPost("/models/", model); }
export function removeModel(id) { return apiDelete(`/models/${id}/`); }
