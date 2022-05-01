import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ArrowNarrowRightIcon, ArrowNarrowLeftIcon } from '@heroicons/react/outline'
import { useForm } from 'react-hook-form';
import PageHeaders from '../../components/adminDashboard/PageHeaders'
import CustomInput from '../../components/CustomInput'
import CustomSelect from '../../components/CustomSelect';
import CustomTextArea from '../../components/CustomTextArea';
import { useAppContext } from '../../context/appContext';
import './slide.css'
import { DevTool } from "@hookform/devtools";



function CreatBlogPost() {
    const { control, handleSubmit, reset  } = useForm({
        defaultValues: {
            title: '',
            image: [],
            visited: '',
            days: '',
            category: '',
            content: '',
            metaTitle: '',
            metaKeyword: '',
            metaDescription: '',
        },
        delayError: 500,
        shouldFocusError: true,
        mode: "onChange"
    });

    
    const [categories, setCategories] = useState([]);
    const { token, addBlogPost } = useAppContext();
    const [show, setShow] = useState(true);


    const tabs = [
        { name: 'Create Blog-Post', current: show },
        { name: 'Create SEO', current: !show },
    ]

    const setShowHide = (name) => {
        if (name === 'Create SEO') {
            setShow(false)
        }
        
        if (name === 'Create Blog-Post') {
            setShow(!false)
            
        }
    }

    const handleBlogPost = (blog) => {
        console.log(blog, typeof blog);
        // console.log(blog.image, typeof blog.image);
        addBlogPost(blog)
        reset({ ...blog })
       
    }

    useEffect(() => {
        const config = {
            method: 'get',
            url: '/api/get-blog-category',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };


        try {
            axios.get('/sanctum/csrf-cookie').then(response => {
                axios(config)
                    .then((res) => {

                        setCategories(res.data.body)
                    })
            })
        } catch (error) {
            console.log(error)

        }
    }, [token])

    return (
        <div>
            <PageHeaders
                tabs={tabs}
                onClick={setShowHide}
            />
            <div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 mb-12 ">
                <form onSubmit={handleSubmit(handleBlogPost)} className="bg-white w-full shadow rounded p-8 sm:p-12 border-2 border-teal-300">
                    <p className="text-3xl font-bold leading-7 text-center">Blog Post</p>
                    <div className="overflow-clip">
                        {show &&
                            <div className='animate_post'>
                                <div className="md:flex items-center mt-12">
                                    <div className="w-full md:w-1/2 flex flex-col">
                                        <label className="font-semibold leading-none mb-2">Blog Title</label>
                                        <CustomInput
                                            name="title"
                                            control={control}
                                            type="text"
                                            // placeholder="Blog-Category Name"
                                            rules={{
                                                required: 'Blog-Title is required',
                                                // pattern: { value: EMAIL_REGEX, message: 'Email is invalid' },
                                                maxLength: { value: 255, message: 'Blog-Title should be minimum 255 characters long' }
                                            }}
                                        />
                                    </div>
                                    <div className="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
                                        <label className="font-semibold leading-none mb-2">Blog Image</label>
                                        <CustomInput
                                            name="image"
                                            control={control}
                                            type="file"
                                            // placeholder="Blog-Category Name"
                                            rules={{
                                                required: 'Blog-Image is required',
                                                // pattern: { value: EMAIL_REGEX, message: 'Email is invalid' },
                                                // maxLength: { value: 255, message: 'FullNAme should be minimum 255 characters long' }
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="md:flex items-center mt-12">
                                    <div className="w-full md:w-1/2 flex flex-col">
                                        <label className="font-semibold leading-none mb-2">Visited Date</label>
                                        <CustomInput
                                            name="visited"
                                            control={control}
                                            type="date"
                                            // placeholder="Blog-Category Name"
                                            rules={{
                                                required: 'Visited Date is required',
                                                // pattern: { value: EMAIL_REGEX, message: 'Email is invalid' },
                                                // maxLength: { value: 255, message: 'Blog-Title should be minimum 255 characters long' }
                                            }}
                                        />
                                    </div>
                                    <div className="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
                                        <label className="font-semibold leading-none mb-2">Days</label>
                                        <CustomInput
                                            name="days"
                                            control={control}
                                            type="text"
                                            // placeholder="Blog-Category Name"
                                            rules={{
                                                required: 'Days is required',
                                                // pattern: { value: EMAIL_REGEX, message: 'Email is invalid' },
                                                // maxLength: { value: 255, message: 'FullNAme should be minimum 255 characters long' }
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="md:flex items-center mt-8">
                                    <div className="w-full flex flex-col">
                                        <label className="font-semibold leading-none mb-2">Blog Category</label>
                                        <div className="relative">
                                            <CustomSelect
                                                name="category"
                                                control={control}
                                                rules={{
                                                    required: 'Blog Category is required',
                                                    // pattern: { value: EMAIL_REGEX, message: 'Email is invalid' },
                                                    // maxLength: { value: 255, message: 'FullNAme should be minimum 255 characters long' }
                                                }}
                                            >
                                                <option select="true">Select dropdown</option>
                                                {categories.map((category) => (
                                                    <option key={category.id} value={category.id}>
                                                        {category.name}
                                                    </option>
                                                ))}

                                            </CustomSelect>
                                        </div>

                                    </div>

                                </div>
                                <div>
                                    <div className="w-full flex flex-col mt-8">
                                        <label className="font-semibold leading-none mb-2">Content</label>
                                        <CustomTextArea
                                            name="content"
                                            control={control}
                                            rules={{
                                                required: 'Blog Content is required',
                                                // pattern: { value: EMAIL_REGEX, message: 'Email is invalid' },
                                                // maxLength: { value: 255, message: 'FullNAme should be minimum 255 characters long' }
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        }

                        {!show &&
                            <div className='animate_seo'>
                                <div className="md:flex items-center mt-12">
                                    <div className="w-full md:w-1/2 flex flex-col">
                                        <label className="font-semibold leading-none mb-2">Meta Title</label>
                                        <CustomInput
                                            name="metaTitle"
                                            control={control}
                                            type="text"
                                            // placeholder="Blog-Category Name"
                                            rules={{
                                                required: 'Blog-Meta-Title is required',
                                                // pattern: { value: EMAIL_REGEX, message: 'Email is invalid' },
                                                maxLength: { value: 255, message: 'Blog-Title should be minimum 255 characters long' }
                                            }}
                                        />
                                    </div>
                                    <div className="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
                                        <label className="font-semibold leading-none mb-2">Meta Keyword</label>
                                        <CustomInput
                                            name="metaKeyword"
                                            control={control}
                                            type="text"
                                            // placeholder="Blog-Category Name"
                                            rules={{
                                                required: 'Blog-Meta-Keyword is required',
                                                // pattern: { value: EMAIL_REGEX, message: 'Email is invalid' },
                                                maxLength: { value: 255, message: 'FullNAme should be minimum 255 characters long' }
                                            }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="w-full flex flex-col mt-8">
                                        <label className="font-semibold leading-none mb-2">Meta Description</label>
                                        <CustomTextArea
                                            name="metaDescription"
                                            control={control}
                                            rules={{
                                                required: 'Blog-Meta-Description is required',
                                                // pattern: { value: EMAIL_REGEX, message: 'Email is invalid' },
                                                maxLength: { value: 255, message: 'FullNAme should be minimum 255 characters long' }
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        }
                    </div>

                    <div className="flex items-center justify-center w-full">
                        <button
                            type='submit'
                            disabled={show}
                            // onClick={ }
                            className="mt-9 font-semibold leading-none mb-2 text-white py-4 px-10 bg-teal-700 rounded hover:bg-teal-600 focus:ring-2 focus:ring-offset-2 focus:ring-teal-700 focus:outline-none">
                            {show ? 'click tab or below' : 'Save Blog'}
                        </button>
                        <div className="relative">
                            {tabs.map((tab, index) => (
                                <button
                                    type='button'
                                    title={tab.name}
                                    key={index}
                                    onClick={() => setShowHide(tab.name)}
                                    className={`absolute right-0 top-1 mt-9 font-semibold leading-none mb-2 text-white py-2 px-10 bg-teal-700 rounded hover:bg-teal-600 focus:ring-2 focus:ring-offset-2 focus:ring-teal-700 focus:outline-none ${tab.current ? 'hidden' : 'block'}`}>
                                    {show ?
                                          (<ArrowNarrowRightIcon className="h-5 w-5 text-teal-400" />)
                                          :(<ArrowNarrowLeftIcon className="h-5 w-5 text-teal-400" />)
                                    }
                                </button>
                            ))}
                        </div>
                    </div>
                </form>
            </div>
            <DevTool control={control} />
        </div >
    )
}

export default CreatBlogPost