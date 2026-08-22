import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Order, OrderItem, OrderMode, Category } from "@/types";
import { products, packageConfig, getProduct } from "@/data/products";

interface OrderContextValue {
  order: Order;
  setMode: (mode: OrderMode) => void;
  setGuests: (guests: number) => void;
  addItem: (productId: string, category: Category, isPackageItem?: boolean) => void;
  removeItem: (productId: string, category: Category, isPackageItem?: boolean) => void;
  setItemQuantity: (productId: string, category: Category, quantity: number, isPackageItem?: boolean) => void;
  addExtra: (type: "side" | "drink" | "wings", productId?: string) => void;
  removeExtra: (id: string) => void;
  generatePackage: (guests: number) => void;
  resetOrder: () => void;
  total: number;
  itemCount: number;
}

const emptyOrder: Order = {
  mode: null,
  guests: null,
  items: [],
};

const OrderContext = createContext<OrderContextValue | null>(null);

function findItem(
  items: OrderItem[],
  productId: string,
  category: Category,
  isPackageItem?: boolean
): OrderItem | undefined {
  return items.find(
    (i) =>
      i.productId === productId &&
      i.category === category &&
      (i.isPackageItem ?? false) === (isPackageItem ?? false)
  );
}

function makeItem(
  productId: string,
  category: Category,
  quantity: number,
  isPackageItem?: boolean
): OrderItem {
  const product = getProduct(productId);
  return {
    id: `${productId}-${category}${isPackageItem ? "-pkg" : ""}`,
    productId,
    category,
    nameKey: product?.nameKey ?? `product.${productId}`,
    quantity,
    unitPrice: product?.price ?? 0,
    unitType: product?.unitType ?? "per-portion",
    isPackageItem,
  };
}

export function OrderProvider({ children }: { children: ReactNode }) {
  const [order, setOrder] = useState<Order>(emptyOrder);

  const setMode = useCallback((mode: OrderMode) => {
    setOrder((prev) => {
      if (prev.mode === mode) return prev;
      return { ...prev, mode };
    });
  }, []);

  const setGuests = useCallback((guests: number) => {
    setOrder((prev) => ({ ...prev, guests }));
  }, []);

  const addItem = useCallback(
    (productId: string, category: Category, isPackageItem?: boolean) => {
      setOrder((prev) => {
        const items = prev.items ?? [];
        const existing = findItem(items, productId, category, isPackageItem);
        if (existing) {
          return {
            ...prev,
            items: items.map((i) =>
              i.id === existing.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          };
        }
        const newItem = makeItem(productId, category, 1, isPackageItem);
        return { ...prev, items: [...items, newItem] };
      });
    },
    []
  );

  const removeItem = useCallback(
    (productId: string, category: Category, isPackageItem?: boolean) => {
      setOrder((prev) => {
        const items = prev.items ?? [];
        const existing = findItem(items, productId, category, isPackageItem);
        if (!existing) return prev;
        if (existing.quantity <= 1) {
          return {
            ...prev,
            items: items.filter((i) => i.id !== existing.id),
          };
        }
        return {
          ...prev,
          items: items.map((i) =>
            i.id === existing.id ? { ...i, quantity: i.quantity - 1 } : i
          ),
        };
      });
    },
    []
  );

  const setItemQuantity = useCallback(
    (productId: string, category: Category, quantity: number, isPackageItem?: boolean) => {
      setOrder((prev) => {
        const items = prev.items ?? [];
        if (quantity <= 0) {
          const existing = findItem(items, productId, category, isPackageItem);
          if (!existing) return prev;
          return {
            ...prev,
            items: items.filter((i) => i.id !== existing.id),
          };
        }
        const existing = findItem(items, productId, category, isPackageItem);
        if (existing) {
          return {
            ...prev,
            items: items.map((i) =>
              i.id === existing.id ? { ...i, quantity } : i
            ),
          };
        }
        const newItem = makeItem(productId, category, quantity, isPackageItem);
        return { ...prev, items: [...items, newItem] };
      });
    },
    []
  );

  const addExtra = useCallback((type: "side" | "drink" | "wings", productId?: string) => {
    setOrder((prev) => {
      const items = prev.items ?? [];
      let extraId: string;
      let unitPrice: number;
      let nameKey: string;
      let unitType: string;

      if (type === "side") {
        extraId = "extra-side";
        unitPrice = 5.0;
        nameKey = "product.extraSide";
        unitType = "per-portion";
      } else if (type === "drink") {
        extraId = "extra-drink";
        unitPrice = 2.5;
        nameKey = "product.extraDrink";
        unitType = "per-bottle";
      } else {
        extraId = productId ?? "classic-wings";
        const product = getProduct(extraId);
        unitPrice = product?.price ?? 1.25;
        nameKey = product?.nameKey ?? "product.extraWings";
        unitType = product?.unitType ?? "per-wing";
      }

      const extraItemId = `extra-${extraId}`;
      const existing = items.find((i) => i.id === extraItemId && i.category === "extra");

      if (existing) {
        return {
          ...prev,
          items: items.map((i) =>
            i.id === extraItemId ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }

      const newItem: OrderItem = {
        id: extraItemId,
        productId: extraId,
        category: "extra",
        nameKey,
        quantity: 1,
        unitPrice,
        unitType,
      };

      return { ...prev, items: [...items, newItem] };
    });
  }, []);

  const removeExtra = useCallback((id: string) => {
    setOrder((prev) => {
      const items = prev.items ?? [];
      const existing = items.find((i) => i.id === id && i.category === "extra");
      if (!existing) return prev;
      if (existing.quantity <= 1) {
        return {
          ...prev,
          items: items.filter((i) => i.id !== id),
        };
      }
      return {
        ...prev,
        items: items.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        ),
      };
    });
  }, []);

  const generatePackage = useCallback((guests: number) => {
    const totalWings = guests * packageConfig.wingsPerPerson;
    const wingItems: OrderItem[] = [];

    let wingsDistributed = 0;
    packageConfig.defaultWingSplit.forEach((split, idx) => {
      let count = Math.round(totalWings * split.ratio);
      if (idx === packageConfig.defaultWingSplit.length - 1) {
        count = totalWings - wingsDistributed;
      }
      wingsDistributed += count;
      if (count > 0) {
        const product = getProduct(split.productId);
        wingItems.push({
          id: `${split.productId}-wings-pkg`,
          productId: split.productId,
          category: "wings",
          nameKey: product?.nameKey ?? `product.${split.productId}`,
          quantity: count,
          unitPrice: product?.price ?? 0,
          unitType: product?.unitType ?? "per-wing",
          isPackageItem: true,
        });
      }
    });

    const sideItems: OrderItem[] = packageConfig.packageSides.map((sideId) => {
      const product = getProduct(sideId);
      return {
        id: `${sideId}-side-pkg`,
        productId: sideId,
        category: "side",
        nameKey: product?.nameKey ?? `product.${sideId}`,
        quantity: guests,
        unitPrice: product?.price ?? 0,
        unitType: product?.unitType ?? "per-portion",
        isPackageItem: true,
      };
    });

    const cornProduct = getProduct(packageConfig.packageCorn);
    const cornCount = Math.ceil(guests * packageConfig.cornPerPerson);
    const cornItem: OrderItem = {
      id: `${packageConfig.packageCorn}-side-pkg`,
      productId: packageConfig.packageCorn,
      category: "side",
      nameKey: cornProduct?.nameKey ?? "product.corn",
      quantity: cornCount,
      unitPrice: cornProduct?.price ?? 0,
      unitType: cornProduct?.unitType ?? "per-cob",
      isPackageItem: true,
    };

    setOrder({
      mode: "package",
      guests,
      items: [...wingItems, ...sideItems, cornItem],
    });
  }, []);

  const resetOrder = useCallback(() => {
    setOrder(emptyOrder);
  }, []);

  const total = (order.items ?? []).reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  const itemCount = (order.items ?? []).reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const value: OrderContextValue = {
    order,
    setMode,
    setGuests,
    addItem,
    removeItem,
    setItemQuantity,
    addExtra,
    removeExtra,
    generatePackage,
    resetOrder,
    total,
    itemCount,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrder(): OrderContextValue {
  const ctx = useContext(OrderContext);
  if (!ctx) {
    throw new Error("useOrder must be used within OrderProvider");
  }
  return ctx;
}
