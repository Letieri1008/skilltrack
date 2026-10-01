import { apiDelete, apiGet, apiPatch, apiPost } from "../../services/api";
export async function getEquipment() { const data = await apiGet("/equipment/"); return data.results || data; }
export function saveEquipment(item) { return item.id ? apiPatch(`/equipment/${item.id}/`, item) : apiPost("/equipment/", item); }
export function removeEquipment(id) { return apiDelete(`/equipment/${id}/`); }
export function findEquipment(id) { return apiGet(`/equipment/${id}/`); }
