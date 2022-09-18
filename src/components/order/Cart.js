import Layout from '../Layout';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { deleteCartItem, getCartItems, updateCartItem } from '../../api/apiOrder';
import { userInfo } from '../../utils/auth';
import CartItem from './CartItem';

const Cart = () => {
    const [cartItems, setCartItems] = useState([])

    const loadCart = () => {
        getCartItems(userInfo().token)
            .then(response => {
                setCartItems(response.data)
            })
            .catch(() => console.log('Faied to load cartitems'))
    }

    useEffect(() => {
        loadCart()
    }, [])

    const increaseItem = item => () => {
        if (item.count === 5) return
        const cartItem = {
            ...item,
            count: item.count + 1
        }
        updateCartItem(userInfo().token, cartItem)
            .then(res => loadCart())
            .catch(() => console.log('faild to load cart'))
    }

    const decreaseItem = item => () => {
        if (item.count === 1) return
        const cartItem = {
            ...item,
            count: item.count - 1
        }

        updateCartItem(userInfo().token, cartItem)
            .then(res => loadCart())
            .catch(() => console.log('faild to load cart'))
    }

    const getCartTotal = () => {
        const arr = cartItems.map(item => item.price * item.count)
        const sum = arr.reduce((a, b) => a + b, 0)
        return sum;
    }

    const deleteItem = item => () => {
        if (!window.confirm('delete item ?')) return
        deleteCartItem(userInfo().token, item)
            .then(response => loadCart())
            .catch(err => console.log('failed to load cart item'))
    }

    return (
        <Layout title="Your Cart" description="Hurry up! Place your order!" className="container">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Order</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Cart</li>
                </ol>
            </nav>
            <div className="container my-5">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col" width="15%">#</th>
                            <th scope="col">Image</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col" align="right">Price</th>
                            <th scop="col">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item, i) =>
                            <CartItem
                                item={item}
                                serial={i + 1}
                                key={item._id}
                                increaseItem={increaseItem(item)}
                                decreaseItem={decreaseItem(item)}
                                deleteItem={deleteItem(item)} />)}
                        <tr>
                            <th scope="row" />
                            <td colSpan={3}>Total</td>
                            <td align="right">৳ {getCartTotal()}</td>
                            <td />
                        </tr>
                        <tr>
                            <th scope="row" />
                            <td colSpan={5} className="text-right">
                                <Link to="/"><button className="btn btn-warning mr-4">Continue Shoping</button></Link>
                                <Link to="/checkout" className="btn btn-success mr-4">Proceed To Checkout</Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}

export default Cart;