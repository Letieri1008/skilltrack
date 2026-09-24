const storageKey = "skilltrack.models";
export function getModels() { return JSON.parse(localStorage.getItem(storageKey) || "[]"); }
export function saveModel(model) { const models = getModels(); const next = model.id ? models.map((item) => item.id === model.id ? model : item) : [...models, { ...model, id: crypto.randomUUID() }]; localStorage.setItem(storageKey, JSON.stringify(next)); }
export function removeModel(id) { localStorage.setItem(storageKey, JSON.stringify(getModels().filter((item) => item.id !== id))); }
