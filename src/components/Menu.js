import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated, signOut, userInfo } from '../utils/auth';

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: '#ff9900' }
    } else {
        return { color: 'gray' }
    }
}

const Menu = ({ history }) => {
    return (
        <nav className='navbar navbar-dark bg-dark'>
            <ul className="nav nav-tabs" >
                <li className="nav-item">
                    <Link className="nav-link" to='/'
                        style={isActive(history, '/')}>Home</Link>
                </li>
                {!isAuthenticated() && (<>
                    <li className="nav-item">
                        <Link className="nav-link" to='/login'
                            style={isActive(history, '/login')}>Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to='/register'
                            style={isActive(history, '/register')}>Register</Link>
                    </li>
                </>)}
                {isAuthenticated() && (<>
                    <li className="nav-item">
                        <Link className="nav-link" to={`/${userInfo().role}/dashboard`}
                            style={isActive(history, `/${userInfo().role}/dashboard`)}>Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, `/cart`)} to={`/cart`}>Cart</Link>
                    </li>
                    <li className="nav-item">
                        <span className='nav-link' style={{
                            cursor: 'pointer', color: 'gray'
                        }}
                            onClick={() => {
                                signOut(() => { history.push('/login') })
                            }}
                        >Log out</span>
                    </li>
                </>)}
            </ul>
        </nav>
    )
}

export default withRouter(Menu);