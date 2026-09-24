const storageKey = "skilltrack.equipment";
export function getEquipment() { return JSON.parse(localStorage.getItem(storageKey) || "[]"); }
export function saveEquipment(item) { const items = getEquipment(); const next = item.id ? items.map((x) => x.id === item.id ? item : x) : [...items, { ...item, id: crypto.randomUUID() }]; localStorage.setItem(storageKey, JSON.stringify(next)); }
export function removeEquipment(id) { localStorage.setItem(storageKey, JSON.stringify(getEquipment().filter((x) => x.id !== id))); }
export function findEquipment(id) { return getEquipment().find((x) => x.id === id); }
