import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom'
import { SimpleSuccess } from '../../components/Alert';
import CustomInput from '../../components/CustomInput';
import Loading from '../../components/Loading';
import { BLOG_CATEGORY_BEGIN, BLOG_CATEGORY_SUCCESS } from '../../context/actions';
import { useAppContext } from '../../context/appContext';



function EditBlogCategory() {
    const [data, setData] = useState({});
    const [dataLoading, setDataLoading] = useState(false);
    const { id } = useParams();
    const { dispatch, token } = useAppContext();
    const navigate = useNavigate();
    const { control, handleSubmit } = useForm({
        defaultValues: {
            name: ''
        }
    });


    const handleBlogCategoryEdit = async (inputData) => {

        dispatch({
            type: BLOG_CATEGORY_BEGIN,
        })
        const { name } = inputData;
        const transferData = new FormData();
        transferData.append('name', name);

        const config = {
            method: 'post',
            url: `/api/update-blog-category/${data.id}`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: transferData
        };

        try {
            setDataLoading(true)
            await axios.get('/sanctum/csrf-cookie').then(response => {
                axios(config)
                    .then((res) => {

                        dispatch({
                            type: BLOG_CATEGORY_SUCCESS,
                            payload: {
                                cat: res.data.body
                            }
                        })
                       
                        setDataLoading(false);
                        SimpleSuccess(res.data.message);
                        setInterval(() => {navigate('/create-blog-category')},2000)
                    })
            })

        } catch (error) {
            console.log(error)

        }
        
    }

    useEffect(() => {
        const config = {
            method: 'get',
            url: `/api/edit-blog-category/${id}`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        try {
            setDataLoading(true)
            axios.get('/sanctum/csrf-cookie').then(response => {
                axios(config)
                    .then((res) => {

                        // dispatch({
                        //     type: BLOG_CATEGORY_SUCCESS,
                        //     payload: {
                        //         cat: res.data.body
                        //     }
                        // })
                        setDataLoading(false);
                        // console.log(res.data.body.name);
                        setData(res.data.body)
                    })
            })

        } catch (error) {
            console.log(error)

        }
    }, [id, token]);
    return (
        <div className="container mx-auto py-0">
            <div className="flex justify-center items-center">
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                    {
                        dataLoading
                            ? <Loading />
                            : <div className="mt-1">
                                <CustomInput
                                    blog
                                    name="name"
                                    control={control}
                                    type="text"
                                    placeholder={data.name}
                                    rules={{
                                        required: 'Blog-Category Name is required',
                                        // pattern: { value: EMAIL_REGEX, message: 'Email is invalid' },
                                        maxLength: { value: 255, message: 'FullNAme should be minimum 255 characters long' }
                                    }}
                                />
                                <div className="sm:col-span-2 sm:flex sm:justify-center">
                                    <button
                                        onClick={handleSubmit(handleBlogCategoryEdit)}
                                        type="submit"
                                        className="mt-2 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:w-auto"
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default EditBlogCategory