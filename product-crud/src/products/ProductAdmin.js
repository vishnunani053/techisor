import Axios from "axios";
import React from "react";
import {Link} from "react-router-dom"

const ProductAdmin = () => {
    let [products, setProducts] = React.useState([])
     React.useEffect(() => {
         getProducts()
     }, [])
    let getProducts = () => {
        let url = `http://localhost:9000/product/all`
        Axios.get(url).then((response) => {
            setProducts(response.data.result)
        }).catch(() => {

        })
    }
    let deleteProduct=(product_id)=>{
        let delUrl=`http://localhost:9000/product/${product_id}`
        Axios.delete(delUrl).then((response)=>{
            getProducts()
        }).catch(()=>{

        })
    }
    return (
        <div>
          <h1>Mobiles</h1>
          <pre>{JSON.stringify(products)}</pre>
          <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <table className='table table-hover'>
                        <thead className='bg-dark text-white'>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.length>0?<>
                                {
                                    products.map((product)=>{
                                        return <tr  style={{color:"black"}} key={product._id}>
                                               <td>{product._id.slice(20,25)}</td>
                                               <td>{product.name}</td>
                                               <td>{product.price}</td>
                                               <td>{product.qty}</td>
                                               <td>
                                                <Link to={`/edit/${product._id}`} className='btn btn-success'>Update</Link>
                                                <Link onClick={deleteProduct.bind(this,product._id)} className='btn btn-danger'>Delete</Link>
                                               </td>
                                             
                                        </tr>
                                    })
                                }
                                </>:<fragment>
                                    <tr className='text-danger'>*****No Products*****</tr>
                                </fragment>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
          </div>
        </div>
    )
}

export default ProductAdmin