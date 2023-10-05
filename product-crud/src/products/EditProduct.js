import React,{ useState ,useEffect} from 'react'
import { useParams, Navigate } from 'react-router-dom'
import Axios from 'axios'

const EditProduct = () => {
	let productId = useParams().id
	let [flag, setFlag] = useState(false);
	let [errorMessaage, setErrorMessage] = useState("")
	let [submitted, setSubmitted] =useState(false);
	let [selectedProduct,setSelectedProduct]= useState({
		name: "",
		image: "",
		price: "",
		qty: "",
		info: ""
	})

	useEffect(() => {
		let url = `http://localhost:9000/product/${productId}`

		Axios.get(url).then((response) => {
			// setProducts(response.data)
            setSelectedProduct(response.data)
		}).catch();
	}, [])
	let changeInput = (event) => {
		setSelectedProduct({ ...selectedProduct, [event.target.name]: event.target.value })
	};
	let changeImageHandler =  (event) => {
		let imageFile = event.target.files[0]
		let reader = new FileReader();
		reader.readAsDataURL(imageFile)
		reader.addEventListener("load", () => {
			if (reader.result) {
				setSelectedProduct({
					...selectedProduct, image: reader.result
				})
			}
			else {
				alert("Error")
			}
		})
	}
	let submitProduct = (event) => {
		console.log("Test Case 123")
		event.preventDefault();
		let url = `http://localhost:9000/product/${productId}`
		Axios.put(url, selectedProduct)
			.then((response) => {
				setFlag(true)
				console.log("Test Case 124")
			})
			.catch((err) => {
				setErrorMessage(err)
			})
	}
	return <>
		{
			flag ? <Navigate to='/admin' />
				: <div className="container">
				
					<pre>{JSON.stringify(selectedProduct)}</pre>
			
					<div className="row">
						<div className="col">
							<h1>Update-Product</h1>
						</div>
					</div>
					<div className="row">
						<div className="col">
							<p>{JSON.stringify(productId)}</p>
							

						</div>
						<div className="row mt-5">
							<div className="card">
								<div className="card-header">Update Product</div>
								<div className="card-body">
									<form onSubmit={submitProduct}>
										<div className="form-group">
											<input type="text" name="name" value={selectedProduct.name} onChange={changeInput} className="form-control" placeholder="Product Name" />
										</div>
										<div className="form-group">
											<input type="file" name="image" id="customFile" required onChange={changeImageHandler} />
											<img src={selectedProduct.image} height="50px" alt="" />
										</div>
										<div className="form-group">
											<input type="text" name="price" value={selectedProduct.price} onChange={changeInput} className="form-control" placeholder="Price" />
										</div>
										<div className="form-group">
											<input type="text" name="qty" value={selectedProduct.qty} onChange={changeInput} className="form-control" placeholder="QTY" />
										</div>
										<div className="form-group">
											<input type="text" onChange={changeInput} name="info" value={selectedProduct.info} className="form-control" placeholder="Information" />
										</div>
										<input type="submit" value="UpdateProduct" onChange={changeInput} className="btn btn-primary" />
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
		}

	</>
}

export default EditProduct