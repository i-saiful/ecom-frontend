import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./home/Home";
import Login from "./user/Login";
import Register from "./user/Register";
import Dashboard from './user/Dashboard'
import PrivateRoute from "./protecteRoutes/PrivateRoute";
import AdminDashboard from "./admin/AdminDashboard";
import AdminRoute from "./protecteRoutes/AdminRoute";
import CreateCategory from '../components/admin/CreateCategory'

const Main = () => {
    return (<div>
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/login' exact component={Login} />
            <Route path='/register' exact component={Register} />

            <PrivateRoute path="/user/dashboard">
                <Dashboard />
            </PrivateRoute>

            <AdminRoute path="/admin/dashboard">
                <AdminDashboard />
            </AdminRoute>
            <AdminRoute path="/create/category">
                <CreateCategory />
            </AdminRoute>

            <Redirect to='/' />
        </Switch>
    </div>)
}

export default Main;