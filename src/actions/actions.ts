type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export function AddToCart(product: Omit<CartItem, "quantity">): void {
  const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

export function getCartItems(): CartItem[] {
  return JSON.parse(localStorage.getItem("cart") || "[]") as CartItem[];
}

export function updateCartItem(id: string, quantity: number): void {
  const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
  const updatedCart = cart.map((item) =>
    item.id === id ? { ...item, quantity } : item
  );
  localStorage.setItem("cart", JSON.stringify(updatedCart));
}

export function removeCartItem(id: string): void {
  const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
  const updatedCart = cart.filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
}
