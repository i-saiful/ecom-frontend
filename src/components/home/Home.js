import { useEffect, useState } from "react"
import Layout from "../Layout"
import { getCategories, getFilteredProducts, getProducts } from '../../api/apiProduct';
import Card from "./Card";
import { showError, showSuccess } from '../../utils/message';
import CheckBox from "./CheckBox";
import RadioBox from "./RadioBox";
import { prices } from '../../utils/prices'

function Home() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [order, setOrder] = useState('desc');
    const [limit, setLimit] = useState(30);
    const [skip, setSkip] = useState(0)
    const [sortBy, setSortBy] = useState('createdAt')
    const [categories, setCategories] = useState([])
    const [filters, setFilters] = useState({
        category: [],
        price: []
    })

    useEffect(() => {
        getProducts(sortBy, order, limit)
            .then(response => setProducts(response.data))
            .catch(err => setError('Fetch to load products'))

        getCategories()
            .then(response => setCategories(response.data))
            .catch(err => setError('Failed to load Categories!'))
    }, [])

    const handleFilters = (myfilters, filterBy) => {
        const newFilters = { ...filters }

        if (filterBy === 'category') {
            newFilters[filterBy] = myfilters
        }

        if (filterBy === 'price') {
            const data = prices;
            let arr = []
            for (let i in data) {
                if (data[i].id === parseInt(myfilters)) {
                    arr = data[i].arr
                }
            }
            newFilters[filterBy] = arr
        }

        setFilters(newFilters)
        getFilteredProducts(skip, limit, newFilters, order, sortBy)
            .then(res => setProducts(res.data))
            .catch(err => setError('Failed to load filters'))
    }

    const shwoFilters = () => {
        return (<>
            <div className="row">
                <div className="col-sm-3">
                    <h5>Filter by Categories</h5>
                    <ul>
                        <CheckBox categories={categories}
                            handleFilters={myfilters =>
                                handleFilters(myfilters, 'category')} />
                    </ul>
                </div>

                <div className="col-sm-5">
                    <h5>Filter by Price</h5>
                    <div className="row">
                        <RadioBox
                            prices={prices}
                            handleFilters={myfilters =>
                                handleFilters(myfilters, 'price')} />
                    </div>
                </div>
            </div>
        </>)
    }

    return (
        <Layout className='container' title='Home Page'>
            {shwoFilters()}
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