import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { getAPIAuth } from '../services/Api';
import { userContext } from '../context/UserContext';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('')
    const [balance, setBalance] = useState(0);

    const navigate = useNavigate();
    const { state } = useContext(userContext);

    useEffect(() => {
        const debounced = setTimeout(async () => {
            getUsers();
        }, 500)

        return () => clearTimeout(debounced);

    }, [search])


    const transferHandler = (to) => {
        console.log("tod Id", to)
        navigate(`/send/${to}`)
    }

    const getUsers = async () => {
        const getBalance = await getAPIAuth('account/getBalance');
        setBalance(getBalance.data.balance)

        let filter = '';
        if (search != '') {
            filter = `?filter=${search}`
        }

        const users = await getAPIAuth(`user/bulk${filter}`)
        setUsers(users.data.users);
    }

    return (
        <div>
            {/* Dashboard top header */}
            <div className="navbar bg-base-100 flex justify-between ">
                <div>
                    <div className="btn btn-ghost btn-circle avatar">
                        <div className="rounded-full h-12 w-12">
                            <p className='btn btn-secondary text-white font-bold text-xl'>{state.user.firstName.slice(0, 1).toUpperCase()}</p>
                        </div>
                    </div>
                    <div>
                        <a className="text-md font-mono mx-2">{state.user.firstName.slice(0, 1).toUpperCase() + state.user.firstName.slice(1)}</a>
                    </div>
                </div>
                <div>
                    <button className='btn btn-sm btn-ghost border-[#7480FF] me-2'><Link to='/profile'>Profile</Link></button>
                    <button className='btn btn-sm btn-ghost border-[#7480FF]'><Link to='/logout'>Logout</Link></button>
                </div>
            </div>

            <hr className='h-0.5 bg-[#7480FF] border-none' />

            {/* balance & users*/}
            <div className="flex flex-col justify-center items-center m-5">
                <div className='w-full flex justify-center'>
                    <h1 className='pb-5 font-bold'>Your Balance : $ {balance.toFixed(2)}</h1>
                </div>


                {/* search users */}
                <div className='w-full'>
                    <input type="text" placeholder="search users" className="input input-bordered w-full" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                </div>
            </div>

            {/* users */}

            <div>
                <div className="h-[calc(100vh-9rem)] overflow-y-auto max-w-[1/2]">
                    {users.length > 0 ?
                        <table className="table table-zebra">
                            {/* head */}
                            <thead className='text-center'>
                                <tr>
                                    <th>Names</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className='text-center'>
                                {users.map((user) =>
                                    <tr key={user._id}>
                                        <td className=''>
                                            <div className="w-full flex md:justify-center items-center">
                                                <div className="md:w-1/2 md:flex md:justify-end px-4">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <p className='btn btn-secondary text-white font-bold text-xl'>{user.firstName.slice(0, 1).toUpperCase()}</p>
                                                    </div>
                                                </div>
                                                <div className='md:w-1/2 md:text-start'>
                                                    <div className="font-bold">{`${user.firstName.slice(0, 1).toUpperCase() + user.firstName.slice(1)} ${user.lastName.slice(0, 1).toUpperCase() + user.lastName.slice(1)}`}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <th>
                                            <button className="btn btn-sm bg-[#7480FF] text-white" onClick={() => { transferHandler(user._id) }}>Transfer</button>
                                        </th>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        : <div className='flex justify-center'><span className='text-[#7480FF]'>No user found</span></div>}
                </div>
            </div>

        </div>
    )
}

export default Dashboard;