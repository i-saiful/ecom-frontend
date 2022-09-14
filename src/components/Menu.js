import { Link, withRouter } from 'react-router-dom';

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
                <li className="nav-item">
                    <Link className="nav-link" to='/login'
                        style={isActive(history, '/login')}>Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/register'
                        style={isActive(history, '/register')}>Register</Link>
                </li>
            </ul>
        </nav>
    )
}

export default withRouter(Menu);