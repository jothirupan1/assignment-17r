import React from 'react'
import ProductedRoutes from './componenets/ProductedRoutes'
import Login from './componenets/Login'
import Home from './componenets/Home'
import Register  from './componenets/Register'
import {Routes,Route} from 'react-router-dom'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register/>}/>
        <Route path="/" element={<Login />}/>
        <Route path="/Home" element={
          <ProductedRoutes >
            <Home />
          </ProductedRoutes>
        } />
      </Routes>
    </div>
  )
}

export default App 