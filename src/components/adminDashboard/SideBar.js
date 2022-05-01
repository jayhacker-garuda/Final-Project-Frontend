import { ArrowCircleDownIcon, ChevronLeftIcon, ChevronRightIcon, SearchIcon } from '@heroicons/react/outline'
import React from 'react'
import CustomInput from '../CustomInput'
import { NavLink } from 'react-router-dom';


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
function SideBar({ sidebarOpen, setSidebarOpen, control, navigation, subNavOpen, setSubNavOpen, subNavs }) {
    return (
        <div className={`h-screen bg-gray-800 border-r-2 md:w-[20vw] border-blue-400 shadow-xl rounded-r-md fixed top-16 -left-72 z-40 ${sidebarOpen ? "translate-x-0" : "translate-x-full"} `}>
            <div className="px-6 pt-8">
                <div className="flex items-center justify-between">
                    <p className="bg-blue-600 p-1.5 rounded flex items-center justify-center">Admin Panel</p>
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="flex items-center justify-center px-1 rounded relative bg-gray-700 text-blue-500 -mr-12 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-700">
                        {sidebarOpen
                            ? <ChevronRightIcon className="h-5 w-5 -mr-2" />
                            : <ChevronLeftIcon className="h-5 w-5 -mr-2" />
                        }
                    </button>
                </div>
            </div>
            <div className="px-6 pt-4">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <SearchIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <CustomInput
                        name="query"
                        control={control}
                        type="text"
                        placeholder="Search"
                    />
                </div>
            </div>
            <div className="px-6 pt-4">
                <hr className="border-gray-700" />
            </div>
            <div className="px-6 pt-4">
                <ul key="SideNav"className="flex flex-col space-y-2">
                    {navigation.map((item, index) => (
                        <div key={item.name}>
                            {item.name === 'Blog' ?
                                (
                                    <li key={index}>

                                        <div className="relative text-gray-500 hover:text-white flex justify-between">
                                            <div className="flex items-center w-full">

                                                <div className="absolute flex items-center pl-2 inset-y-0 left-0"><item.icon className="h-5 w-5" /></div>
                                                <NavLink
                                                    to="#"
                                                    onClick={() => setSubNavOpen(!subNavOpen)}
                                                    key={item.name}
                                                    className={() => (
                                                        classNames(
                                                            subNavOpen ? '' : 'border-blue-400 focus:ring-indigo-500',
                                                            'hover:bg-gray-700 text-xs w-full pl-8 pr-4 px-4 py-2 inline-block rounded focus:outline-none'
                                                        )
                                                    )}
                                                >
                                                    {item.name}
                                                </NavLink>
                                            </div>

                                            <div className="absolute right-0 p-1 flex items-center">
                                                <ArrowCircleDownIcon className="h-6 w-6" />
                                            </div>


                                        </div>
                                        <div className="pt-2 pl-4">
                                            <ul className={`flex-col pl-2 text-gray-500 border-l border-gray-700 ${subNavOpen ? "hidden" : "flex"}`}>
                                                {subNavs.map((item, index) => (
                                                    <li key={index} className="relative text-gray-500 hover:text-white">
                                                        <div className="absolute flex items-center pl-2 inset-y-0 left-0"><item.icon className="h-5 w-5" /></div>
                                                        <NavLink
                                                            key={item.name}
                                                            to={item.href}
                                                            className={({ isActive }) => (
                                                                classNames(
                                                                    isActive ? '' : '',
                                                                    'hover:bg-gray-700 text-xs w-full pl-8 pr-4 px-4 py-2 inline-block rounded'
                                                                )
                                                            )}
                                                        >
                                                            {item.name}
                                                        </NavLink>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </li>
                                ) : (
                                    <li
                                        key={index}
                                        className="relative text-gray-500 hover:text-white">
                                        <div className="absolute flex items-center pl-2 inset-y-0 left-0"> <item.icon className="h-5 w-5" /></div>
                                        <NavLink
                                            key={item.name}
                                            to={item.href}
                                            className={({ isActive }) => (
                                                classNames(
                                                    isActive ? '' : '',
                                                    'hover:bg-gray-700 text-xs w-full pl-8 pr-4 px-4 py-2 inline-block rounded'
                                                )
                                            )}
                                        >

                                            {item.name}
                                        </NavLink>
                                    </li>
                                )

                            }

                        </div>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SideBar