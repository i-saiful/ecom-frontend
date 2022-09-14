export const showMessage = (error, msg) => {
    if(error)
    return <div className="alert alert-danger">{msg}</div>
}

export const showSuccess = (success, msg) => {
    if (success)
        return <div className="alert alert-success">{msg}</div>
}

export const showLoding = loading => {
    if (loading)
        return <div className="alert alert-info">Loading.....</div>
}