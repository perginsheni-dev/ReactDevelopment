import React from 'react'
import { useCart } from './CartContext'

export default function CartSummary() {
  const { cart, total, removeFromCart, updateQty, clearCart } = useCart()

  return (
    <aside className="cart-summary" aria-label="Shopping cart">
      <h3>Your Cart</h3>
      {cart.length === 0 ? (
        <div className="empty-cart">Your cart is empty</div>
      ) : (
        <ul role="list">
          {cart.map((item) => (
            <li key={item.id} className="mb-8">
              <div className="cart-item-row">
                <div className="meta">
                  <strong>{item.name}</strong>
                  <div className="small">${item.price.toFixed(2)}</div>
                </div>
                <label className="sr-only" htmlFor={`qty-${item.id}`}>Quantity for {item.name}</label>
                <input
                  id={`qty-${item.id}`}
                  type="number"
                  min={1}
                  value={item.qty}
                  onChange={(e) => updateQty(item.id, Math.max(1, parseInt(e.target.value || '1')))}
                />
                <button aria-label={`Remove ${item.name}`} onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="total" aria-live="polite">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <button
        className="place-order"
        onClick={() => {
          if (cart.length === 0) {
            alert('Cart is empty')
            return
          }
          alert('Order placed — thank you!')
          clearCart()
        }}
        aria-disabled={cart.length === 0}
      >
        Place Order
      </button>
    </aside>
  )
}
