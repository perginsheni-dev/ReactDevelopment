import React from 'react'
import ExampleComponent from './ExampleComponent'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div style={{ padding: 16 }}>
      <h2>Welcome to the Ordering App</h2>
      <ExampleComponent />
      <p>
        <Link to="/order">Go to Order Page</Link>
      </p>
    </div>
  )
}
