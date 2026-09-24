const storageKey = "skilltrack.brands";

export function getBrands() {
  return JSON.parse(localStorage.getItem(storageKey) || "[]");
}

export function saveBrand(brand) {
  const brands = getBrands();
  const next = brand.id
    ? brands.map((item) => (item.id === brand.id ? brand : item))
    : [...brands, { ...brand, id: crypto.randomUUID() }];
  localStorage.setItem(storageKey, JSON.stringify(next));
}

export function removeBrand(id) {
  localStorage.setItem(storageKey, JSON.stringify(getBrands().filter((item) => item.id !== id)));
}

