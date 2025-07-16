import React, { useEffect, useState } from 'react';
import axios from 'axios';


function Home() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("http://localhost:3001/Products", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => setProduct(res.data.products))
    .catch(err => {
      console.error("Error fetching products:", err);
      alert(err.response?.data?.message || "Bad Request");
    });
  }, []);

  return (
   
    <div className="container mt-4">
      <h2 className="text-center mb-4">Product List</h2>
      <div className="row">
        {product.map((item, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">Price: ₹{item.price}</p>
           
             <button
  className='btn btn-outline-primary'
  onClick={() => alert(`You ordered the ${item.name}`)}
>
  Order Now
</button>


              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
