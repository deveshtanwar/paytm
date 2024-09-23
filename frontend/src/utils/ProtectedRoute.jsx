import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { getAPIAuth } from '../services/Api';
import { useContext, useEffect, useState } from 'react';
import { userContext } from '../context/UserContext';

const ProtectedRoute = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [loading, setLoading] = useState(true);

    const { dispatch } = useContext(userContext)

    const navigate = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem('AccessToken');

        if (!token) {
            navigate('/')
            return;
        }
        getAPIAuth('user/verifyToken')
            .then((res) => {
                // localStorage.setItem('userId', res.data.userData._id)
                // localStorage.setItem('firstName', res.data.userData.firstName)
                // localStorage.setItem('lastName', res.data.userData.lastName)

                const userData = {
                    userId: res.data.userData._id,
                    firstName: res.data.userData.firstName,
                    lastName: res.data.userData.lastName,
                    email: res.data.userData.userName
                }

                dispatch({
                    type: 'USER_UPDATE',
                    payload: userData
                })

                setIsAuthenticated(res.data.success);
            })
            .catch((err) => {
                console.log('Error verifying Token', err);
                localStorage.removeItem('AccessToken');
                setIsAuthenticated(false);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [])

    if (loading) {
        return <div className='flex justify-center items-center h-screen'><span className="loading loading-bars loading-lg"></span></div>
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoute;