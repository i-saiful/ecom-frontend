import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./home/Home";
import Login from "./user/Login";
import Register from "./user/Register";

const Main = () => {
    return (<div>
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/login' exact component={Login} />
            <Route path='/register' exact component={Register} />
        </Switch>
    </div>)
}

export default Main;