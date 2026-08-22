import type { Product } from "@/types";

export const siteConfig = {
  brand: "Wingz & Thingz",
  city: "Antwerpen",
  whatsappNumber: "32470000000",
  instagramUrl: "https://instagram.com/wingzandthingz",
  email: "hello@wingzandthingz.be",
  minGuests: 6,
  maxGuests: 100,
  defaultGuests: 10,
};

export const products: Product[] = [
  {
    id: "classic-wings",
    nameKey: "product.classicWings",
    category: "wings",
    price: 1.25,
    image:
      "https://images.pexels.com/photos/8862763/pexels-photo-8862763.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    descriptionKey: "product.classicWingsDesc",
    available: true,
    unitType: "per-wing",
  },
  {
    id: "honey-wings",
    nameKey: "product.honeyWings",
    category: "wings",
    price: 1.35,
    image:
      "https://images.pexels.com/photos/10361458/pexels-photo-10361458.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    descriptionKey: "product.honeyWingsDesc",
    available: true,
    unitType: "per-wing",
  },
  {
    id: "spicy-wings",
    nameKey: "product.spicyWings",
    category: "wings",
    price: 1.35,
    image:
      "https://images.pexels.com/photos/30749028/pexels-photo-30749028.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    descriptionKey: "product.spicyWingsDesc",
    available: true,
    unitType: "per-wing",
  },
  {
    id: "seasoned-potatoes",
    nameKey: "product.potatoes",
    category: "side",
    price: 5.0,
    image:
      "https://images.pexels.com/photos/273825/pexels-photo-273825.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    descriptionKey: "product.potatoesDesc",
    available: true,
    unitType: "per-portion",
    gramsPerPortion: 150,
  },
  {
    id: "coleslaw",
    nameKey: "product.coleslaw",
    category: "side",
    price: 5.0,
    image:
      "https://images.pexels.com/photos/7362673/pexels-photo-7362673.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    descriptionKey: "product.coleslawDesc",
    available: true,
    unitType: "per-portion",
    gramsPerPortion: 150,
  },
  {
    id: "mac-cheese",
    nameKey: "product.macCheese",
    category: "side",
    price: 5.5,
    image:
      "https://images.pexels.com/photos/10993148/pexels-photo-10993148.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    descriptionKey: "product.macCheeseDesc",
    available: true,
    unitType: "per-portion",
    gramsPerPortion: 150,
  },
  {
    id: "cheesy-gratin",
    nameKey: "product.gratin",
    category: "side",
    price: 5.5,
    image:
      "https://images.pexels.com/photos/34985106/pexels-photo-34985106.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    descriptionKey: "product.gratinDesc",
    available: true,
    unitType: "per-portion",
    gramsPerPortion: 150,
  },
  {
    id: "corn-on-cob",
    nameKey: "product.corn",
    category: "side",
    price: 3.0,
    image:
      "https://images.pexels.com/photos/34991031/pexels-photo-34991031.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    descriptionKey: "product.cornDesc",
    available: true,
    unitType: "per-cob",
  },
  {
    id: "cola",
    nameKey: "product.cola",
    category: "drink",
    price: 2.5,
    image:
      "https://images.pexels.com/photos/4113632/pexels-photo-4113632.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    descriptionKey: "product.colaDesc",
    available: true,
    unitType: "per-bottle",
  },
  {
    id: "water",
    nameKey: "product.water",
    category: "drink",
    price: 2.0,
    image:
      "https://images.pexels.com/photos/327090/pexels-photo-327090.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    descriptionKey: "product.waterDesc",
    available: true,
    unitType: "per-bottle",
  },
];

export const packageConfig = {
  wingsPerPerson: 6,
  sidesGramsPerPerson: 150,
  cornPerPerson: 0.5,
  defaultWingSplit: [
    { productId: "classic-wings", ratio: 0.5 },
    { productId: "honey-wings", ratio: 0.33 },
    { productId: "spicy-wings", ratio: 0.17 },
  ],
  packageSides: [
    "seasoned-potatoes",
    "coleslaw",
    "mac-cheese",
    "cheesy-gratin",
  ],
  packageCorn: "corn-on-cob",
};

export const extrasConfig = {
  extraSidePrice: 5.0,
  extraDrinkPrice: 2.5,
  extraWingPrice: 1.25,
};

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(cat: "wings" | "side" | "drink"): Product[] {
  return products.filter((p) => p.category === cat && p.available);
}
