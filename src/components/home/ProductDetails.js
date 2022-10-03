import { useEffect, useState } from 'react';
import Layout from '../Layout';
import { API } from '../../utils/config';
import { Link } from 'react-router-dom';
import { getProductDetails } from '../../api/apiProduct';
import { showSuccess, showError } from '../../utils/message';
import { isAuthenticated, userInfo } from '../../utils/auth';
import { addToCart } from '../../api/apiOrder';
import { createFeedback, getFeedback } from '../../api/apiFeedback';

const ProductDetails = (props) => {
    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    // eslint-disable-next-line
    const [success, setSuccess] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [feedbackList, setFeedbackList] = useState([])

    useEffect(() => {
        const id = props.match.params.id;
        getProductDetails(id)
            .then(response => setProduct(response.data))
            .catch(err => setError("Failed to load products"))

        getFeedback(id)
            .then(response => setFeedbackList(response.data))
            .catch(err => setError('Failed to load feedback'))
        // eslint-disable-next-line
    }, [])

    const feedbacks = () => {
        return feedbackList.map(({
            createdAt, feedback,
            id, userName
        }) =>
            <div key={id} className='card m-3'>
                <div className="card-body">
                    <div className='d-flex border-bottom mb-2'>
                        <div className='rounded-circle border p-2 h4 bg-light'>
                            {userName.split(' ').map(i => i[0]).join('')}
                        </div>
                        <div className='ml-3'>
                            <p className='card-title m-0 h5'>{userName}</p>
                            <p className='text-muted m-0'><small>{
                                Date(createdAt).toString().split(' ', 5)
                                    .map(i => i).join(' ')
                            }</small></p>
                        </div>
                    </div>
                    <p>{feedback}</p>
                </div>
            </div>)
    }

    const handleAddToCart = product => () => {
        if (isAuthenticated()) {
            setError(false)
            setSuccess(false)
            const user = userInfo()
            const cartItem = {
                _id: user._id,
                product: product._id,
                price: product.price
            }
            addToCart(user.token, cartItem)
                .then(response => {
                    setSuccess(true)
                    console.log(response);
                })
                .catch(err => {
                    console.log();
                    if (err.response)
                        setError(err.response.data)
                    else
                        setError('adding to cart failed')
                })
        } else {
            setSuccess(false)
            setError('Please login first')
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        const info = {
            feedback,
            productId: product._id,
            userId: userInfo()._id
        }
        createFeedback(info, userInfo().token)
        setFeedbackList([
            ...feedbackList,
            {
                createdAt: new Date(),
                feedback,
                id: Math.random(), 
                userName: userInfo().name
            }
        ])
        setFeedback('')
    }

    return (
        <Layout title="Product Page">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to="/">Product</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{product.category ? product.category.name : ""}</li>
                </ol>
            </nav>
            <div>
                {showSuccess(success, 'Item Added to Cart!')}
                {showError(error, error)}
            </div>
            <div className="row container">
                <div className="col-6">
                    <img
                        src={`${API}/product/photo/${product._id}`}
                        alt={product.name}
                        width="100%"
                    />
                </div>
                <div className="col-6">
                    <h3>{product.name}</h3>
                    <span style={{ fontSize: 20 }}>&#2547;</span>{product.price}
                    <p>{product.quantity ? (<span className="badge badge-pill badge-primary">In Stock</span>) : (<span className="badge badge-pill badge-danger">Out of Stock</span>)}</p>
                    <p>{product.description}</p>
                    {product.quantity ? <>
                        &nbsp;<button className="btn btn-outline-primary btn-md"
                            onClick={handleAddToCart(product)}>Add to Cart</button>
                    </> : ""}
                </div>
            </div>

            {feedbacks()}

            {/* feedback here */}
            <div className="row container">
                <div className="col mt-4">
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <textarea className='form-control'
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder='Feedback here' />
                        <div className='text-right mt-3'>
                            <input type="submit" value="Submit"
                                className='btn btn-outline-primary' />
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default ProductDetails;