import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from './CartContext'

export default function Header() {
  const { cart } = useCart()
  const count = cart.reduce((s, i) => s + i.qty, 0)

  return (
    <header style={{ padding: 12, borderBottom: '1px solid #eee' }}>
      <nav style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Link to="/">Home</Link>
        <Link to="/order">Order ({count})</Link>
      </nav>
    </header>
  )
}
