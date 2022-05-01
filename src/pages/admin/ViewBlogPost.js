import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAppContext } from '../../context/appContext';

function ViewBlogPost() {

    const { token } = useAppContext();
    const [blogPost, setBlogPost] = useState([]);

    const deleteBlogPost = (id) => {

    }
    useEffect(() => {
        document.title = "view Blog-Post";
        const controller = new AbortController();

        const config = {
            method: 'get',
            url: '/api/all-blog-post',
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

                        // console.log(res.data.body)
                        setBlogPost(res.data.body)
                    })
            })
        } catch (error) {
            console.log(error)

        }

        return () => {
            // console.log('here Line 112')
            controller.abort()
        }
    },[token])
    return (
        <>
            <div className="md:flex md:items-center md:justify-between">
                <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">View Blog Post</h2>
                </div>
                <div className="mt-4 flex md:mt-0 md:ml-4">

                    <NavLink
                        to='/create-blog-post'
                        className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                    >
                        Create Blog-Post
                    </NavLink>
                </div>
            </div>
            <div className="mt-8 flex flex-col container mx-auto">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="text-left text-sm font-semibold text-gray-900 sm:pl-4">
                                            Id
                                        </th>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            Blog-Title
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Category
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Image
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Content
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Created_at
                                        </th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {blogPost.map((post) => (
                                        <tr key={post.title}>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{post.id}</td>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                    <div className="ml-4">
                                                        <div className="font-medium text-gray-900">{post.title}</div>
                                                    </div>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <div className="text-gray-900">{post.blog_category.name}</div>
                                                {/* <div className="text-gray-500">{post.department}</div> */}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <div className="h-10 w-10 flex-shrink-0">
                                                    <img className="h-10 w-10 rounded-full" src={`http://10.47.12.3:8080/storage/${post.image_name}`} alt={post.name} />
                                                </div> 
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 truncate">
                                                {post.content}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{post.created_at}</td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 space-x-2">
                                                <NavLink to={`/edit-blog-post/${post.id}/${post.slug}`} className='py-1 px-4 bg-blue-500 text-white text-xs rounded focus:ring-1'>
                                                    Edit
                                                </NavLink>
                                                <button onClick={() => deleteBlogPost(post.id)} className='py-1 px-4 bg-red-500 text-white text-xs rounded focus:ring-1'>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewBlogPost