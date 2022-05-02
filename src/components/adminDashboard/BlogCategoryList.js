import React from 'react'
import { NavLink } from 'react-router-dom'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
function BlogCategoryList({categories, deleteCategory}) {
    return (
        <div>
            <div className="-mx-4 mt-10 ring-1 ring-gray-300 md:mx-auto md:rounded-lg container bg-white mb-4">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                        <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                Name
                            </th>
                            <th
                                scope="col"
                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                            >
                                Slug
                            </th>
                            <th
                                scope="col"
                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                            >
                                Created_at
                            </th>
                           
                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                <span className="sr-only">Select</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category.name}>
                                <td
                                    className={classNames(
                                        category.id === 1 ? '' : 'border-t border-transparent',
                                        'relative py-4 pl-4 sm:pl-6 pr-3 text-sm'
                                    )}
                                >
                                    <div className="font-medium text-teal-900">
                                        {category.name}
                                        {/* {category.id.isCurrent ? <span className="text-indigo-600">(Current Plan)</span> : null} */}
                                    </div>
                                    <div className="mt-1 flex flex-col text-gray-500 sm:block lg:hidden">
                                        <span>
                                            {category.memory}
                                        </span>
                                        <span className="hidden sm:inline"> · </span>
                                        <span>{category.storage}</span>
                                    </div>
                                    {category.id !== 1 ? <div className="absolute right-0 left-6 -top-px h-px bg-gray-200" /> : null}
                                </td>
                                <td
                                    className={classNames(
                                        category.id === 1 ? '' : 'border-t border-gray-200',
                                        'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
                                    )}
                                >
                                    {category.slug}
                                </td>
                                <td
                                    className={classNames(
                                        category.id === 1 ? '' : 'border-t border-gray-200',
                                        'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
                                    )}
                                >
                                    {category.created_at}
                                </td>
                                <td
                                    className={classNames(
                                        category.id === 1 ? '' : 'border-t border-gray-200',
                                        'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell space-x-2'
                                    )}
                                >
                                    <NavLink to={`/edit-blog-category/${category.id}/${category.slug}`} className='py-1 px-4 bg-blue-500 text-white text-xs rounded focus:ring-1'>
                                        Edit
                                    </NavLink>
                                    <button onClick={() => deleteCategory(category.id)} className='py-1 px-4 bg-red-500 text-white text-xs rounded focus:ring-1'>
                                        Delete
                                    </button>
                                </td>
                               
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default BlogCategoryList