import React from 'react'
import {Navigate} from 'react-router-dom';


function ProductedRoutes({children}) {

const token = localStorage.getItem('token');
return token ? children : <Navigate to="/" replace />
  
}

export default ProductedRoutes 