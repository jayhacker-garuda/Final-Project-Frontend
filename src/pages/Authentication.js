import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';

import CustomInput from '../components/CustomInput';
import Loading from '../components/Loading';



import { useAppContext } from '../context/appContext';
import { isAdmin, isAnon } from '../utils';


const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function Authentication({ type = 'login' }) {

    const [loading, setLoading] = useState(false);
    const { registerUser, loginUser, user } = useAppContext();
    const navigate = useNavigate();
    const { control, handleSubmit, watch } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    });

    const pwd = watch('password');

    const handleAuth = async (data) => {

        const { email, password } = data;

        
        
        setLoading(true)
        
        if (type === 'create') {

            registerUser(data)
            
        } else {
            
            await loginUser({ email: email, password: password })
                
            
        }


        setLoading(false);
        

    }

    useEffect(() => {
        if (!isAnon(user)) {
            setTimeout(() => {
                navigate('/');
            },2000)
        }
    },[user,navigate])
    return (
        <div className="flex flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                    className="w-auto h-12 mx-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow"
                />
                <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">{type === 'login' ? 'Sign in to your account' : 'Sign up for your account'}</h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
                    <div className="space-y-6">
                        {type === 'create' &&
                            <div>

                                <div className="mt-1">
                                    <CustomInput
                                        name="name"
                                        control={control}
                                        type="text"
                                        placeholder="FullName"
                                        rules={{
                                            required: 'FullName is required',
                                            // pattern: { value: EMAIL_REGEX, message: 'Email is invalid' },
                                            maxLength: { value: 255, message: 'FullNAme should be minimum 255 characters long' }
                                        }}
                                    />
                                </div>
                            </div>
                        }
                        <div>

                            <div className="mt-1">
                                <CustomInput
                                    name="email"
                                    control={control}
                                    type="email"
                                    placeholder="Email Address"
                                    rules={{
                                        required: 'Email is required',
                                        pattern: { value: EMAIL_REGEX, message: 'Email is invalid' }
                                    }}
                                />
                            </div>
                        </div>

                        <div>

                            <div className="mt-1">
                                <CustomInput
                                    name="password"
                                    control={control}
                                    type="password"
                                    placeholder="Password"
                                    rules={{
                                        required: 'Password is required',
                                        minLength: { value: 8, message: 'Password should be minimum 8 characters long' }
                                    }}
                                />
                            </div>
                        </div>
                        {type === 'create' &&
                            <div>

                                <div className="mt-1">
                                    <CustomInput
                                        name="confirmPassword"
                                        control={control}
                                        type="password"
                                        placeholder="Confirm Password"
                                        rules={{
                                            validate: value => value === pwd || 'Password do not match',
                                            minLength: { value: 8, message: 'Confirm Password should be minimum 8 characters long' }
                                        }}
                                    />
                                </div>
                            </div>
                        }

                        {type === 'login' &&
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                                    />
                                    <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-900">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <button href="#" className="font-medium text-teal-600 hover:text-teal-500">
                                        Forgot your password?
                                    </button>
                                </div>
                            </div>
                        }

                        <div>
                            {loading
                                ? <Loading />
                                : <button
                                    onClick={handleSubmit(handleAuth)}
                                    type="submit"
                                    className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-teal-600 border border-transparent rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                >
                                    {type === 'login' ? 'Sign in' : 'Sign Up'}
                                </button>
                            }
                        </div>
                    </div>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                {type === 'login'
                                    ? <Link to="/register" className="px-2 text-teal-500 bg-white cursor-pointer">Don't have an account?</Link>
                                    : <Link to="/login" className="px-2 text-teal-500 bg-white cursor-pointer">Already have an account?</Link>
                                }
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Authentication