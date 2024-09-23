import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {

    const navigate = useNavigate();

    const clickHandler = () => {
        navigate('/');
    }
    return (
        <>
            <div className="navbar bg-primary text-primary-content flex justify-center !p-0">
                <button className="btn btn-ghost text-xl" onClick={clickHandler}>Paytm</button>
            </div>
        </>
    )
}

export default Header;