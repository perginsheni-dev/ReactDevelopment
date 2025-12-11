import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

function loadCart() {
  try {
    const raw = localStorage.getItem('cart') || '[]';
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => loadCart());

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (e) {
      // ignore storage errors
    }
  }, [cart]);

  useEffect(() => {
    function onStorage(e) {
      if (e.key === 'cart') {
        try {
          const next = e.newValue ? JSON.parse(e.newValue) : []
          setCart(next)
        } catch (err) {
          // ignore parse errors
        }
      }
    }

    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const updateQty = (id, qty) =>
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));

  const clearCart = () => setCart([]);

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
