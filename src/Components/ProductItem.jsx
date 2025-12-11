import React from 'react'
import { useCart } from './CartContext'

export default function ProductItem({ product }) {
  const { addToCart } = useCart()

  return (
    <article className="product-item" tabIndex={0} aria-labelledby={`p-${product.id}-title`}>
      <img src={product.image} alt={product.name} />
      <div style={{ paddingTop: 6 }}>
        <h4 id={`p-${product.id}-title`} style={{ margin: 0, fontSize: 14 }}>{product.name}</h4>
        <div className="price" style={{ fontSize: 12, marginTop: 4 }}>${product.price.toFixed(2)}</div>
        <div className="small" style={{ marginTop: 6 }}>{product.description}</div>
        <div className="controls">
          <button
            className="focus-ring"
            aria-label={`Add ${product.name} to cart`}
            onClick={() => addToCart(product)}
          >
            Add
          </button>
        </div>
      </div>
    </article>
  )
}
