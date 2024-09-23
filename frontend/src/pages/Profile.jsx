import React, { useContext, useState } from 'react'
import { userContext } from '../context/UserContext'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { putAPIAuth } from '../services/Api';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';

const Profile = () => {

    const [activeTab, setActiveTab] = useState('general');
    const [toast, setToast] = useState(null);

    const { state } = useContext(userContext);

    const navigate = useNavigate();

    const schema = z.object({
        firstName: z.string().min(2),
        lastName: z.string().min(2),
        password: z.string().min(8, { message: "minmum 8 characters" }).optional(),
        confirmPass: z.string().min(8, { message: 'confirm password is required' }).optional()
    }).refine((data) => data.password === data.confirmPass, {
        message: 'password do not match',
        path: ['confirmPass'],
    })

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema), defaultValues: { firstName: state.user.firstName, lastName: state.user.lastName } });

    const showToast = (message, type) => {
        setToast({ message, type });
        setTimeout(() => { setToast(null) }, 3000)
    }

    const onSubmit = async (data) => {
        if (activeTab == 'security') {
            delete data.firstName, data.lastName;
            delete data.lastName;
            delete data.confirmPass;
        }
        try {
            const res = await putAPIAuth('user/profile', data)
            if (res.data.success) {
                showToast(res.data.message, 'success')
            }
        } catch (error) {
            showToast(error.response.data.message, 'error')
        }

    }

    return (
        <div className="hero bg-base-200">
            {toast && <Toast message={toast.message} type={toast.type} />}
            <div className="hero-content flex-col">
                <div className="text-center">
                    <h1 className="text-xl font-bold font-serif">Update Info</h1>
                    <div className="flex justify-between items-center my-3 gap-3">
                        <button
                            className={`btn btn-sm border border-primary ${activeTab === 'general' ? 'btn-primary' : ''}`}
                            onClick={() => setActiveTab('general')}
                        >
                            Profile
                        </button>
                        <button
                            className={`btn btn-sm border border-primary ${activeTab === 'security' ? 'btn-primary' : ''}`}
                            onClick={() => setActiveTab('security')}
                        >
                            Security
                        </button>
                    </div>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">

                    {/* profile form */}
                    {activeTab === 'general' &&
                        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" disabled={true} value={state.user.email} />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">First Name</span>
                                </label>
                                <input type="text" placeholder="first name" className="input input-bordered" {...register('firstName')} />
                                {errors.firstName && <small className='text-red-500 p-1 m-0'>{errors.firstName.message}</small>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Last Name</span>
                                </label>
                                <input type="text" placeholder="last name" className="input input-bordered" {...register('lastName')} />
                                {errors.lastName && <small className='text-red-500 p-1 m-0'>{errors.lastName.message}</small>}
                            </div>
                            <div className="form-control mt-6">
                                <button type='submit' className="btn btn-primary">Update</button>
                            </div>
                        </form>
                    }

                    {/* security form */}
                    {activeTab === 'security' &&
                        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" autoComplete='off' className="input input-bordered placeholder:text-gray-500" {...register('password')} />
                                {errors.password && <small className='text-red-500 p-1 m-0'>{errors.password.message}</small>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input type="password" placeholder="confirm password" autoComplete='off' className="input input-bordered placeholder:text-gray-500" {...register('confirmPass')} />
                                {errors.confirmPass && <small className='text-red-500 p-1 m-0'>{errors.confirmPass.message}</small>}
                            </div>
                            <div className="form-control mt-6">
                                <button type='submit' className="btn btn-primary">Update</button>
                            </div>
                        </form>
                    }
                </div>
            </div>
        </div >
    )
}

export default Profile;