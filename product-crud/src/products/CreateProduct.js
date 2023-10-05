import React, { useState } from 'react'
import Axios from 'axios'

const CreateProduct = () => {
 let [submitted, setSubmitted] = useState(false)
 let [products, setProducts] = useState({

  name: "",
  image: "",
  price: "",
  qty: "",
  info: ""

 })

 let imageChangeHandler = async (event) => {
  let imageFile = event.target.files[0]
  let reader = new FileReader()
  reader.readAsDataURL(imageFile)
  reader.addEventListener("load", () => {
   if (reader.result) {
    setProducts({ ...products, image: reader.result })
   } else {
    alert("error")
   }
  })
 }

 let getProducts = (event) => {
  setProducts({ ...products, [event.target.name]: event.target.value })
 }

 let submitProducts = (event) => {
  event.preventDefault()
  let url = "http://localhost:9000/product/create"
  Axios.post(url, products).then((respose) => {
   setSubmitted(true)
  }).catch((err) => {

  });
 }
 return (
   <div className="container mt-5">
    <div className="row">
     <pre>{JSON.stringify(submitted)}</pre>
     <div className="col-md-4">
      <div className="card">
       <div className="card-header bg-primary text-white">
        <h2>Create-Products</h2>
       </div>
       <div className="card-body">
        <form onSubmit={submitProducts}>
         <div className='form-group'>
          <input type="text" name='name' onChange={getProducts} placeholder='Name of the Mobile' className='form-control' />
         </div>
         <div className='form-group'>
          <input type="file" name='image' onChange={imageChangeHandler} className='form-control' />
         </div>
         <div className='form-group'>
          <input type="number" name='price' onChange={getProducts} placeholder='Price' className='form-control' />
         </div>
         <div className='form-group'>
          <input type="number" name='qty' onChange={getProducts} placeholder='Quantity' className='form-control' />
         </div>
         <div className='form-group'>
          <input type="text" name='info' onChange={getProducts} placeholder='Information' className='form-control' />
         </div>
         <div className='form-group'>
          <input type="submit" value="create Product" onChange={getProducts} className='btn btn-success' />
         </div>
        </form>
       </div>
      </div>
     </div>
    </div>
    <div className="row">
     <pre>{JSON.stringify(products)}</pre>
    </div>
   </div>
  
 )
}

export default CreateProduct
