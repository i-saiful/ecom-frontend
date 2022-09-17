import { useEffect, useState } from "react"
import Layout from "../Layout"
import { getCategories, getProductDetails, getProducts } from '../../api/apiProduct';
import Card from "./Card";
import {showError, showSuccess} from '../../utils/message';

function Home() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [order, setOrder] = useState('desc');
    const [limit, setLimit] = useState(30);
    const [sortBy, setSortBy] = useState('createdAt')

    useEffect(() => {
        getProducts(sortBy, order, limit)
            .then(response => setProducts(response.data))
            .catch(err => setError('Fetch to load products'))
    }, [])

    return (
        <Layout className='container' title='Home Page'>
            <div style={{ width: "100%" }}>
                {showError(error, error)}
                {showSuccess(success, "Added to cart successfully!")}
            </div>
            <div className="row">
                {products && products.map(product => <Card product={product} key={product._id} />)}
            </div>
        </Layout>
    )
}

export default Home