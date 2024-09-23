import React from 'react'

const Toast = ({ message, type }) => {

    const alertType = {
        success: 'alert-success',
        error: 'alert-error',
        warning: 'alert-info'
    }

    return (
        <div className="toast toast-center sm:toast-end">
            <div className={`alert ${alertType[type]} py-2`}>
                <span>{message}</span>
            </div>
        </div >
    )
}

export default Toast;