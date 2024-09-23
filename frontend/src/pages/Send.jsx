import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getAPIAuth, postAPIAuth } from '../services/Api';
import { useForm } from 'react-hook-form';
import Toast from '../components/Toast';

const Send = () => {

    const [user, setUser] = useState({});
    const [amount, setAmount] = useState(0);
    const [toast, setToast] = useState(null);

    const navigate = useNavigate();
    const { id } = useParams();
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        getUserDetails();
    }, [id])

    const handleConfirm = () => {
        document.getElementById('my_modal_1').close();
        transfer();
    }

    const showToast = (message, type) => {
        setToast({ message, type });
        setTimeout(() => { setToast(null) }, 3000)
    }

    const transfer = async () => {
        try {
            const data = {
                to: id,
                amount: parseInt(amount)
            }
            const res = await postAPIAuth('account/transfer', data);
            if (res.data.success) {
                showToast(res.data.message, 'success')
                setTimeout(() => {
                    navigate('/dashboard');
                }, 500)
            }
        } catch (error) {
            showToast(error.response.data.message, 'error')
        }
    }

    const getUserDetails = async () => {
        const response = await getAPIAuth(`user/userById/${id}`)
        setUser(response.data.user)
    }

    const onSubmit = (data) => {
        document.getElementById('my_modal_1').showModal();
        setAmount(data.amount)
    }
    return (
        <>
            {/* Toast */}
            {toast && <Toast message={toast.message} type={toast.type} />}

            {/* confirmation Modal */}
            <dialog id="my_modal_1" className="modal backdrop-blur-sm">
                <div className="modal-box">
                    <span>Do you confirm the payment Request of <span className='flex justify-center font-bold text-blue-400'>{amount} $</span></span>
                    <div className="modal-action justify-center">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <div>
                                <button className="btn btn-sm btn-error mx-2 font-serif" onClick={() => document.getElementById('my_modal_1').close()}>Cancel</button>
                                <button className="btn btn-sm btn-success font-serif" onClick={handleConfirm}>Confirm</button>
                            </div>
                        </form>
                    </div>
                </div >
            </dialog >

            {/* Send Box */}
            <div div className='flex justify-center items-center my-10 shadow-sm' >
                <div className="card w-80 md:w-[500px] shadow-xl text-black">
                    <div className="card-body flex text-center">
                        <h2 className="text-3xl font-bold text-primary font-serif">Transfer</h2>

                        <hr className='border border-primary' />
                        <div className='flex my-4'>
                            <div className="flex justify-center items-center w-full">
                                <div className=" w-1/4 flex justify-start md:justify-center">
                                    <div className="mask mask-squircle h-12 w-12">
                                        <p className='btn btn-secondary text-white font-bold text-xl'>{user?.firstName?.slice(0, 1).toUpperCase()}</p>
                                    </div>
                                </div>
                                <div className='w-3/4 flex jusitfy-start'>
                                    <div className="text-xl font-mono dark:text-white">{`${user?.firstName?.slice(0, 1).toUpperCase() + user?.firstName?.slice(1)} ${user?.lastName?.slice(0, 1).toUpperCase() + user?.lastName?.slice(1)}`}</div>
                                </div>
                            </div>
                        </div>
                        <form className="card-body p-0" onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control mb-3">
                                <label className="label">
                                    <span className="label-text">Amount (in $) </span>
                                </label>
                                <input type="number" placeholder="Enter Amount" className="input input-bordered dark:text-white" {...register('amount', { required: 'This field is required', validate: (value) => value > 0 || 'Amount must be greater than 0' })} />
                                {errors.amount && <small className='text-start text-red-500 p-1 m-0'>{errors.amount.message}</small>}
                            </div>
                            <div className="card-actions justify-center">
                                <button type='submit' className="btn btn-primary text-white font-extrabold w-full">Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Send;