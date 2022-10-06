import Layout from '../Layout';
import { Link } from 'react-router-dom';
import { userInfo } from '../../utils/auth';
import { useEffect, useState } from 'react';
import { getOrder } from '../../api/apiOrder';
import { API } from '../../utils/config';

const Dashboard = () => {
    const [order, setOrder] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [modalData, setModalData] = useState([])

    useEffect(() => {
        getOrder(userInfo().token)
            .then(response => setOrder(response.data))
            .catch(() => console.log('Failed to load order'))
    }, [])

    const { name, email, role } = userInfo();
    const UserLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/cart">My Cart</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="#">Update Profile</Link>
                    </li>
                </ul>
            </div>
        )
    };

    const PurchaseHistory = () => (
        <div className="card mb-5">
            <h3 className="card-header">Purchase History</h3>
            <div className='table-responsive'>
                <table className='table mb-0'>
                    <thead>
                        <tr>
                            <th scope="col">Order</th>
                            <th scope="col">Date</th>
                            <th scope="col">Status</th>
                            <th scope="col">Total</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.map(item =>
                            <tr key={item._id}>
                                <td>{item.transaction_id}</td>
                                <td>{new Date(item.createdAt).toString()
                                    .split(' ', 4).join(' ')}</td>
                                <td>{item.status}</td>
                                <td>৳ {
                                    item.cartItems.reduce(
                                        (total, item) =>
                                            total + item.count * item.price, 0
                                    ) - item.discount
                                }</td>
                                <td>
                                    <span style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            setOpenModal(true);
                                            setModalData(item);
                                        }}
                                        className='bg-success p-2 rounded text-light'>
                                        View</span>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const modal = () => {
        return (
            <div className="card">
                <h3 className="card-header d-flex justify-content-between">Order: {modalData.transaction_id}
                    <button className='btn btn-danger'
                        onClick={() => setOpenModal(false)}
                    >X</button>
                </h3>
                <ul className='list-group list-group-flush'>
                    {modalData.cartItems.map(
                        (item, i) =>
                            <li key={i} className='list-group-item'>
                                <div className='d-flex align-items-center'>
                                    <img src={`${API}/product/photo/${item.product._id}`}
                                        width="65px" height="65px" alt={item.product.name} />
                                    <div className='ml-3 d-flex justify-content-between align-items-center w-100'>
                                        {item.product.name}
                                        <span>{item.count} X ৳ {item.price}</span>
                                    </div>
                                </div>
                            </li>
                    )}
                    <li className='list-group-item'>
                        <div className='d-flex justify-content-between align-items-center'>
                            Sub Total
                            <span>৳ {
                                modalData.cartItems
                                    .reduce((total, item) =>
                                        total + item.count * item.price
                                        , 0)
                            }</span>
                        </div>
                    </li>
                    <li className='list-group-item'>
                        <div className='d-flex justify-content-between align-items-center'>
                            Discount
                            <span>- ৳ {modalData.discount}</span>
                        </div>
                    </li>
                    <li className='list-group-item'>
                        <div className='d-flex justify-content-between align-items-center'>
                            Total
                            <span>৳ {
                                modalData.cartItems
                                    .reduce((total, item) =>
                                        total + item.count * item.price
                                        , 0) - modalData.discount
                            }</span>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }

    const UserInfo = () => (
        <div className="card mb-5">
            <h3 className="card-header">User Information</h3>
            <ul className="list-group">
                <li className="list-group-item">{name}</li>
                <li className="list-group-item">{email}</li>
                <li className="list-group-item">{role}</li>
            </ul>
        </div>
    );

    return (
        <Layout title="Dashboard" className="container-fluid">
            <div className="row">
                <div className="col-sm-3">
                    <UserLinks />
                </div>
                <div className="col-sm-9">
                    {openModal ? modal() :
                        <>
                            <UserInfo />
                            <PurchaseHistory />
                        </>
                    }
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard;