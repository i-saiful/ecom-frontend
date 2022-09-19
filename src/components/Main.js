import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./home/Home";
import Login from "./user/Login";
import Register from "./user/Register";
import Dashboard from './user/Dashboard'
import PrivateRoute from "./protecteRoutes/PrivateRoute";
import AdminDashboard from "./admin/AdminDashboard";
import AdminRoute from "./protecteRoutes/AdminRoute";
import CreateCategory from '../components/admin/CreateCategory';
import CreateProduct from '../components/admin/CreateProduct'
import ProductDetails from "./home/ProductDetails";
import Cart from "./order/Cart";
import ShippingAddress from './order/ShippingAddress'
import Checkout from "./order/Checkout";
import Payment from "./order/Payment";

const Main = () => {
    return (<div>
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/login' exact component={Login} />
            <Route path='/register' exact component={Register} />
            <Route path='/product/:id' exact component={ProductDetails} />

            <PrivateRoute path="/user/dashboard">
                <Dashboard />
            </PrivateRoute>
            <PrivateRoute exact path="/cart">
                <Cart />
            </PrivateRoute>
            <PrivateRoute exact path="/shipping">
                <ShippingAddress />
            </PrivateRoute>
            <PrivateRoute exact path="/checkout">
                <Checkout />
            </PrivateRoute>
            <PrivateRoute exact path="/payment">
                <Payment />
            </PrivateRoute>

            <AdminRoute path="/admin/dashboard">
                <AdminDashboard />
            </AdminRoute>
            <AdminRoute path="/create/category">
                <CreateCategory />
            </AdminRoute>
            <AdminRoute path="/create/product">
                <CreateProduct />
            </AdminRoute>

            <Redirect to='/' />
        </Switch>
    </div>)
}

export default Main;