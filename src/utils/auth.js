import jwt_decode from 'jwt-decode'

export const authenticate = (token, callbackFunction) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(token))
        callbackFunction();
    }
}

export const isAuthenticated = () => {
    if (typeof window === 'undefined')
        return false
    if (localStorage.getItem('jwt')) {
        const { exp } = jwt_decode(JSON.parse(localStorage.getItem('jwt')))
        return (new Date).getTime() < exp * 1000
    } else {
        return false
    }
}

export const userInfo = () => {
    const jwt = JSON.parse(localStorage.getItem('jwt'))
    const decoded = jwt_decode(jwt)
    return { ...decoded, token: jwt }
}

export const signOut = callback => {
    if(typeof window !== 'undefined'){
        localStorage.removeItem('jwt')
        callback()
    }
}