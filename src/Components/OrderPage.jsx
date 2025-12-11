import React from 'react'
import ProductList from './ProductList'
import CartSummary from './CartSummary'
import './order.css'

export default function OrderPage() {
  return (
    <div className="order-page">
      <div className="left">
        <ProductList />
      </div>
      <div className="right">
        <CartSummary />
      </div>
    </div>
  )
}
