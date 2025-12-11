import React from 'react'
import ProductItem from './ProductItem'

const products = [
  {
    id: 1,
    name: 'Margherita',
    price: 8.99,
    description: 'Classic tomato, mozzarella, and basil.',
    image: '/images/margherita.svg',
  },
  {
    id: 2,
    name: 'Pepperoni',
    price: 10.99,
    description: 'Spicy pepperoni with our signature sauce.',
    image: '/images/pepperoni.svg',
  },
  {
    id: 3,
    name: 'Veggie',
    price: 9.49,
    description: 'Loaded with fresh vegetables and herbs.',
    image: '/images/veggie.svg',
  },
]

export default function ProductList() {
  return (
    <div className="product-list">
      <h3>Menu</h3>
      <div className="product-grid">
        {products.map((p) => (
          <ProductItem key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}
