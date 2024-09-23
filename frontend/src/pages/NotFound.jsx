import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className="hero my-36">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold p-3">Gotcha...</h1>
                    <h2 className="text-4xl font-bold p-3">Page Not Found (404)</h2>
                    <p className='p-3'>Sorry! This Page Does Not Exist</p>
                    <Link to='/' className="btn btn-primary p-3">Explore Other Pages</Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound