import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { postAPI } from '../services/Api';
import Toast from '../components/Toast';

const Regsiter = () => {

    const [toast, setToast] = useState(null);

    const navigate = useNavigate()

    const showToast = (message, type) => {
        setToast({ message, type });
        setTimeout(() => { setToast(null) }, 3000)
    }

    const schema = z.object({
        firstName: z.string().min(2, 'firstname is required'),
        lastName: z.string().min(2, 'lastname is required'),
        userName: z.string().email(),
        password: z.string().min(8, 'password should be atleast 8 characters')
    })

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: zodResolver(schema) });

    const onSubmit = async (data) => {
        try {
            data.userName = data.userName.toLowerCase();
            const response = await postAPI('user/register', data);
            if (response.data.success) {
                showToast(response.data.message, 'success')
                reset();
                setTimeout(() => {
                    navigate('/');
                }, 500)
            }
        } catch (error) {
            showToast(error.response.data.message, 'error')
            reset();
        }
    }


    return (
        <div className="hero">
            {toast && <Toast message={toast.message} type={toast.type} />}
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Firstname</span>
                            </label>
                            <input type="text" placeholder="firstname" className="input input-bordered placeholder-indigo-300 placeholder-opacity-25"  {...register('firstName')} />
                            {errors.firstName && <small className='text-red-500 p-1 m-0'>{errors.firstName.message}</small>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Lastname</span>
                            </label>
                            <input type="text" placeholder="lastname" className="input input-bordered  placeholder-indigo-300 placeholder-opacity-25" {...register('lastName')} />
                            {errors.lastName && <small className='text-red-500 p-1 m-0'>{errors.lastName.message}</small>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" placeholder="email" className="input input-bordered  placeholder-indigo-300 placeholder-opacity-25" {...register('userName')} />
                            {errors.userName && <small className='text-red-500 p-1 m-0'>{errors.userName.message}</small>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" autoComplete='off' className="input input-bordered  placeholder-indigo-300 placeholder-opacity-25" {...register('password')} />
                            {errors.password && <small className='text-red-500 p-1 m-0'>{errors.password.message}</small>}
                            <label className="label">
                                <small className="">Already Registerd ? <Link to='/' className="label-text-alt link link-hover">SignIn</Link></small>
                            </label>
                        </div>
                        <div className="form-control mt-1">
                            <button type='submit' className="btn btn-primary">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Regsiter;