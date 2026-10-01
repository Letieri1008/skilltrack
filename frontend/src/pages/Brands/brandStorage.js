import { apiDelete, apiGet, apiPost } from "../../services/api";
export async function getBrands() { const data = await apiGet("/brands/"); return data.results || data; }
export function saveBrand(brand) { return apiPost("/brands/", brand); }
export function removeBrand(id) { return apiDelete(`/brands/${id}/`); }
