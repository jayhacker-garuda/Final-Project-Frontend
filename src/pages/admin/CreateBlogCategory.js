import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAppContext } from '../../context/appContext'

import PageHeaders from '../../components/adminDashboard/PageHeaders'
import CustomInput from '../../components/CustomInput'
import BlogCategoryList from '../../components/adminDashboard/BlogCategoryList'
import axios from 'axios'
import { BLOG_CATEGORY_BEGIN, BLOG_CATEGORY_SUCCESS } from './../../context/actions';
import { SimpleSuccess } from '../../components/Alert'

const tabs = [
    { name: 'Create Blog-Category', href: '#', current: true },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

// const useForceRerendering = () => {
//     const [counter, setCounter] = React.useState(0);
//     return () => setCounter(counter => counter + 1);
// };

function CreateBlogCategory() {
    // const [categories, setCategories] = useState([]);
    const { addBlogCategory, categories, token, getBlogCategory } = useAppContext();
    const { control, handleSubmit } = useForm({
        defaultValues: {
            name: '',
            // email: '',
            // password: '',
            // confirmPassword: '',
        }
    });

    // const forceRerendering = useForceRerendering();

    function reload() {
        window.location.reload();
    }
    
    const handleBlogCategory = async (data) => {
        
        await addBlogCategory(data)
        setInterval(() => {reload()},2000)
        
        // forceRerendering();
    }

    const deleteCategory = async (id) => {
        const config = {
            method: 'post',
            url: `/api/delete-blog-category/${id}`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        try {
            await axios.get('/sanctum/csrf-cookie').then(response => {
                axios(config)
                    .then((res) => {

                        
                        SimpleSuccess(res.data.message)
                        setInterval(() => { reload() }, 2000)
                    })
            })
        } catch (error) {
            console.log(error)

        }
    }



    useEffect(() => {

        getBlogCategory()

    }, []);
    return (
        <>
            <PageHeaders
                tabs={tabs}
            />
            <div className="container mx-auto bg-slate-400 w-1/3 h-auto mt-2 rounded-md p-2">
                <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                    <div className="mt-1">
                        <CustomInput
                            blog
                            name="name"
                            control={control}
                            type="text"
                            placeholder="Blog-Category Name"
                            rules={{
                                required: 'Blog-Category Name is required',
                                // pattern: { value: EMAIL_REGEX, message: 'Email is invalid' },
                                maxLength: { value: 255, message: 'FullNAme should be minimum 255 characters long' }
                            }}
                        />
                        <div className="sm:col-span-2 sm:flex sm:justify-center">
                            <button
                                onClick={handleSubmit(handleBlogCategory)}
                                type="submit"
                                className="mt-2 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:w-auto"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <BlogCategoryList
                deleteCategory={deleteCategory}
                categories={categories}
            />
        </>
    )
}

export default CreateBlogCategory