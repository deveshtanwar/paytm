import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('AccessToken');
        // localStorage.removeItem('firstName');
        // localStorage.removeItem('lastName');
        // localStorage.removeItem('userId');
        navigate('/')
    }, [navigate])

    return (null)
}

export default Logout;