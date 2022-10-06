import React, { useState, useEffect } from 'react';
import Layout from '../Layout';
import { Link } from 'react-router-dom';
import { userInfo } from '../../utils/auth';
import { showError, showSuccess } from '../../utils/message';
import { createCoupon, getCoupon } from '../../api/apiCoupon';


function CreateCoupon() {
    const { token } = userInfo();
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [storeCoupon, setStoreCoupon] = useState([])

    const [coupon, setCoupon] = useState({
        name: '',
        amount: 0
    })

    const UserLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/category">Create Category</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/product">Create Product</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/coupon">Create Coupon</Link>
                    </li>
                </ul>
            </div>
        )
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isNaN(coupon.amount)) {
            setError('Amount is not Correct!')
        } else {
            createCoupon(token, coupon)
                .then(res => {
                    res.status === 201 ?
                        setSuccess(res.data) :
                        setError(res.data)
                })
                .catch(() => console.log('Somthing Wrong!'))
        }

        setCoupon({
            name: '',
            amount: 0
        })
        loadCoupon(token)
    }

    const loadCoupon = token => getCoupon(token)
        .then(res => {setStoreCoupon(res.data);console.log('call');})
        .catch(() => setError('Failed to load coupon list!'))

    const handleChanlge = e => {
        setCoupon({
            ...coupon,
            [e.target.name]: e.target.value
        })
        setError(false)
        setSuccess(false)
    }

    const handleCoupon = () => (
        <div className="card mb-5">
            <h3 className="card-header">Create Coupon</h3>
            <form className='p-3' onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text"
                        className="form-control"
                        placeholder="Coupon Name"
                        value={coupon.name}
                        name='name'
                        onChange={(e) => handleChanlge(e)} />
                </div>

                <div className="form-group">
                    <label>Amount</label>
                    <input type="number"
                        className="form-control"
                        placeholder="Amount"
                        value={coupon.amount}
                        name='amount'
                        onChange={(e) => handleChanlge(e)} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );

    const couponList = () => (
        <div className="card mb-5">
            <h3 className="card-header">Coupon List</h3>
            <div className='table-responsive'>
                <table className='table mb-0'>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Create</th>
                        </tr>
                    </thead>
                    <tbody>
                        {storeCoupon.map((item, i) => (
                            <tr key={item._id}>
                                <th>{i + 1}</th>
                                <td>{item.name}</td>
                                <td>৳ {item.amount}</td>
                                <td>{new Date(item.createdAt).toString()
                                    .split(' ', 5).join(' ')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )

    useEffect(() => {
        loadCoupon(token)
    }, [token])

    return (
        <Layout title="Coupon" className="container-fluid">
            <div className="row">
                <div className="col-sm-3">
                    <UserLinks />
                </div>
                <div className="col-sm-9">
                    {success && showSuccess(success, success)}
                    {error && showError(error, error)}
                    {handleCoupon()}
                    {couponList()}
                </div>
            </div>
        </Layout>
    )
}

export default CreateCoupon