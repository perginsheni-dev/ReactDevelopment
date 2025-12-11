import React from 'react'
import './App.css'
import { CartProvider } from './Components/CartContext'
import OrderPage from './Components/OrderPage'
import Header from './Components/Header'
import Home from './Components/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/order" element={<OrderPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
