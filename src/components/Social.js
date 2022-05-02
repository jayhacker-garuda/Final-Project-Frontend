import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
    AiFillYoutube, AiFillFacebook,
    AiFillInstagram, AiFillTwitterCircle
} from "react-icons/ai";

const socials = [
    { name: 'youtube',icon: AiFillYoutube, href: 'https://www.youtube.com'},
    { name: 'facebook', icon: AiFillFacebook, href: 'https://www.facebook.com'},
    { name: 'instagram', icon: AiFillInstagram, href: 'https://www.instagram.com'},
    { name: 'twitter', icon: AiFillTwitterCircle, href: 'https://www.twitter.com'},
]
function Social() {

    const generateColor = (iconName) => {
        let iconColor = 'w-20 h-20';
        switch (iconName) {
            case iconName === 'youtube':
                iconColor += ' text-red-600';
                break;
            case iconName === 'facebook':
                iconColor += ' text-blue-600';
                break;
            case iconName === 'instagram':
                iconColor += ' text-orange-600';
                break;
            case iconName === 'twitter':
                iconColor += ' text-blue-400';
                break;
        
            default: 
                break;
        }
        console.log(iconColor);
        return { iconColor }
    }
    return (
        <div className="bg-white bg-opacity-40">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
                    <div>
                        <h2 className="text-3xl font-extrabold text-teal-900 sm:text-4xl">
                            Follow our
                        </h2>
                        <p className="mt-3 max-w-3xl text-6xl text-gray-500">
                            social medias
                        </p>
                        <div className="mt-8 sm:flex">
                          <div className="rounded-md shadow">
                              <NavLink
                                  to="/register"
                                  className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700"
                              >
                                  Create Account
                              </NavLink>
                          </div>
                          <div className="mt-3 sm:mt-0 sm:ml-3">
                              <NavLink
                                  to="/contact-us"
                                  className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-teal-700 bg-teal-100 hover:bg-teal-200"
                              >
                                  Contact Us
                              </NavLink>
                          </div>
                      </div>
                    </div>
                    <div className="mt-8 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-0 lg:grid-cols-2">
                        {socials.map((social) => (
                            <>
                                <div key={social.name}  className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                                    <a
                                        key={social.name}
                                        href={social.href}
                                    >
                                        {/* {console.log(generateColor(social.name).iconColor)} */}
                                        <social.icon
                                            className={generateColor(social.name).iconColor} 
                                        />
                                    </a>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Social