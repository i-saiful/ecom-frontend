import { useEffect, useState } from "react"
import Layout from "../Layout"
import { getCategories, getFilteredProducts, getProducts } from '../../api/apiProduct';
import Card from "./Card";
import { showError, showSuccess } from '../../utils/message';
import CheckBox from "./CheckBox";
import RadioBox from "./RadioBox";
import { prices } from '../../utils/prices'
import { isAuthenticated, userInfo } from "../../utils/auth";
import { addToCart } from "../../api/apiOrder";

function Home() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [order, setOrder] = useState('desc');
    const [limit, setLimit] = useState(4);
    const [skip, setSkip] = useState(0)
    const [sortBy, setSortBy] = useState('name')
    const [categories, setCategories] = useState([])
    const [search, setSearch] = useState('')
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
        // eslint-disable-next-line
    }, [])

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
                })
                .catch(err => {
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

    const handleFilters = (myfilters, filterBy) => {
        const newFilters = { ...filters }

        if (filterBy === 'category') {
            newFilters[filterBy] = myfilters
            setSkip(0)
        }

        if (filterBy === 'search') {
            newFilters[filterBy] = myfilters
            setSearch('')
            setSkip(0)
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
            setSkip(0)
        }

        setLimit(4)
        setFilters(newFilters)
        getFilteredProducts(skip, limit, newFilters, order, sortBy)
            .then(res => setProducts(res.data))
            .catch(err => setError('Failed to load filters'))

        setFilters({
            ...filters,
            search: ''
        })
    }

    useEffect(() => {
        handleFilters()
        // eslint-disable-next-line
    }, [order, sortBy, skip])

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

                <div className="col-sm-4">
                    <div className="d-flex align-items-center">
                        <h5 >Order By:</h5>
                        <select className="form-control ml-2 w-50"
                            value={order}
                            onChange={(e) => setOrder(e.target.value)}>
                            <option value="desc">Name(Z-A)</option>
                            <option value="asc">Name(A-Z)</option>
                        </select>
                    </div>

                    <div className="d-flex align-items-center mt-3">
                        <h5 >Sort By:</h5>
                        <select className="form-control ml-2 w-50"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}>
                            <option value="price">Price</option>
                            <option value="sold">Sold</option>
                            <option value="review">Review</option>
                        </select>
                    </div>
                </div>
            </div>
        </>)
    }

    const addMore = () =>
        <div className="text-center">
            <button
                // disabled={products.length}
                onClick={() => setSkip(skip + 4)}
                className={products.length === 4 ? "btn btn-outline-primary" : 'd-none'}>
                Add More</button>
        </div>

    return (
        <Layout className='container' title='Home Page'>
            <div className="navbar-light mb-3">
                <form className="d-flex" onSubmit={(e) => {
                    e.preventDefault()
                    handleFilters(search, 'search')
                }}>
                    <input className="form-control mr-sm-2 "
                        type="search" placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)} />
                    <button
                        className="btn btn-outline-success my-2 my-sm-0"
                        type="submit">Search</button>
                </form>
            </div>
            {shwoFilters()}
            <div style={{ width: "100%" }}>
                {showError(error, error)}
                {showSuccess(success, "Added to cart successfully!")}
            </div>
            <div className="row">
                {products && products.map(product =>
                    <Card product={product} key={product._id}
                        handleAddToCart={handleAddToCart(product)} />)}
            </div>
            {addMore()}
        </Layout>
    )
}

export default Home