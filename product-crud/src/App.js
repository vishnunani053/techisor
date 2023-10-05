import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductList from './products/ProductList'
import CreateProduct from './products/CreateProduct'
import Navbar from './navbar/Navbar'
import ProductAdmin from './products/ProductAdmin'
import EditProduct from './products/EditProduct'
const App = () => {
  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/product' element={<ProductList/>} />
          <Route path='/create' element={<CreateProduct/>} />
          <Route path='/admin' element={<ProductAdmin/>} />
          <Route path='/edit/:id' element={<EditProduct/>} />
        </Routes>
      </Router>

    </div>
  )
}

export default App
