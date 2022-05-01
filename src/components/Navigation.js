import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'

import { NavLink } from "react-router-dom";
import { isAnon } from '../utils';


const navigation = [
    { name: 'Home', link: '/', current: true },
    { name: 'Journey', link: '/journey', current: false },
    { name: 'Contact Us', link: '/contact-us', current: false },
    // { name: 'Calendar', href: '#', current: false },
]


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function Navigation({ user }) {

    const loggedIn = !isAnon(user);
    console.log(loggedIn);
    return (
        <Disclosure as="nav" className="from-teal-400 to-teal-500 bg-gradient-to-b">
            {({ open }) => (
                <>
                    <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="relative flex items-center justify-between h-16">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-4JUdGzvrMFDWrUUwY3toJATSeNwjn54LkCnKBPRzDuhzi5vSepHfUckJNxRL2gjkNrSqtCoRUrEDAgRwsQvVCjZbRyFTLRNyDmT1a1boZV">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XIcon className="block w-6 h-6" aria-hidden="true" />
                                    ) : (
                                        <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                                <div className="flex items-center flex-shrink-0">
                                    <img
                                        className="block w-auto h-8 lg:hidden"
                                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                                        alt="Workflow"
                                    />
                                    <img
                                        className="hidden w-auto h-8 lg:block"
                                        src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                                        alt="Workflow"
                                    />
                                </div>
                                <div className="hidden sm:block sm:ml-6">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <NavLink
                                                key={item.name}
                                                to={item.link}
                                                className={({ isActive }) => (
                                                    classNames(
                                                        isActive ? 'bg-teal-900 text-teal-300' : 'hover:bg-teal-700 hover:text-teal-300', 'px-3 py-2 rounded-md text-sm font-medium text-white'

                                                    )
                                                )}
                                                aria-current={(isActive) => (isActive ? 'page' : undefined)}
                                            >
                                                {item.name}
                                            </NavLink>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                {!loggedIn &&
                                    <NavLink
                                        to="/login"
                                        className='block px-4 py-2 text-sm text-white bg-teal-500 hover:bg-teal-700 rounded-md duration-200 transition-colors'
                                    >
                                        Sign In
                                    </NavLink>
                                }
                                {/* {loggedIn &&
                                    <div>
                                        <NavLink
                                            to="/logout"
                                            className='block px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-700 rounded-md duration-200 transition-colors'
                                        >
                                            Sign out
                                        </NavLink>
                                        {user["name"]} | {user["user_type"]}
                                    </div>
                                } */}
                                {loggedIn && <button
                                    type="button"
                                    className="p-1 bg-gray-800 rounded-full text-gray-4JUdGzvrMFDWrUUwY3toJATSeNwjn54LkCnKBPRzDuhzi5vSepHfUckJNxRL2gjkNrSqtCoRUrEDAgRwsQvVCjZbRyFTLRNyDmT1a1boZVring-white"
                                >
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="w-6 h-6" aria-hidden="true" />
                                </button>}

                                {/* Profile dropdown */}
                                {loggedIn &&
                                    <Menu as="div" className="relative ml-3 z-10">
                                    <div>
                                        <Menu.Button className="flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                className="w-8 h-8 rounded-full"
                                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                alt=""
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <NavLink
                                                        to="#"
                                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Your Profile
                                                    </NavLink>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <NavLink
                                                        to="#"
                                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Settings
                                                    </NavLink>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <NavLink
                                                        to="/logout"
                                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Sign out
                                                    </NavLink>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                                }
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    onClick={(e) => console.log(e.target)}
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={({ isActive }) => (
                                        classNames(
                                            isActive ? 'bg-teal-900 text-teal-300' : 'hover:bg-teal-700 hover:text-teal-300', 'block px-3 py-2 rounded-md text-base font-medium'

                                        )
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}

export default Navigation