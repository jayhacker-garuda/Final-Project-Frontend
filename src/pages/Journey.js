import { HomeIcon } from '@heroicons/react/solid';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import { format, formatDistance, formatRelative, subDays } from 'date-fns'


const posts = [
  {
    title: 'Boost your conversion rate',
    href: '#',
    category: { name: 'Article', href: '#' },
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa, similique sequi cum eos quis dolorum.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    imageUrl:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    readingTime: '6 min',
    author: {
      name: 'Roel Aufderehar',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    title: 'How to use search engine optimization to drive sales',
    href: '#',
    category: { name: 'Video', href: '#' },
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit facilis asperiores porro quaerat doloribus, eveniet dolore. Adipisci tempora aut inventore optio animi., tempore temporibus quo laudantium.',
    date: 'Mar 10, 2020',
    datetime: '2020-03-10',
    imageUrl:
      'https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    readingTime: '4 min',
    author: {
      name: 'Brenna Goyette',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    title: 'Improve your customer experience',
    href: '#',
    category: { name: 'Case Study', href: '#' },
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.',
    date: 'Feb 12, 2020',
    datetime: '2020-02-12',
    imageUrl:
      'https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    readingTime: '11 min',
    author: {
      name: 'Daniela Metz',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
]
function Journey() {

  const { posts, tabs, getTabCategory, getBlogPost } = useAppContext();
  const [category, setCategory] = useSearchParams({});
  const navigate = useNavigate();



  useEffect(() => {
    
    getTabCategory()
    // return async () => {
    //   await getBlogCategory()
      
    // }

  }, [])
  useEffect(() => {
    const controller = new AbortController();
    // console.log(category);
    getBlogPost({ category });

    

    return () => {
      console.log('here Line 112')
      controller.abort()
    }
  }, [category])


  const GetDate = (postDate) => {
    const now = new Date();
    const date = new Date(postDate);


    const time = date.toLocaleTimeString()
    const newDate = date.toDateString();
    const posted = formatDistance(subDays(date, 0), now, { addSuffix: true })

    console.log(posted)

    return { newDate, time, posted };
  }
  return (
    <div key='Journey'>
      <div className="relative bg-teal-500 bg-opacity-10 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="absolute inset-0">
          <div className="bg-white bg-opacity-20 sm:h-2/3" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">From the blog</h2>
            <nav className="flex py-2" aria-label="Breadcrumb">
              <ol role="list" className="bg-white rounded-md shadow px-6 flex space-x-4 mx-auto">
                <li className="flex">
                  <div className="flex items-center">
                    <NavLink to={'#'} className="text-gray-400 hover:text-gray-500">
                      <HomeIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
                      <span className="sr-only">Home</span>
                    </NavLink>
                  </div>
                </li>
                {tabs.map((page) => (
                  <li key={page.name} className="flex">
                    <div className="flex items-center">
                      <svg
                        className="flex-shrink-0 w-6 h-full text-gray-200"
                        viewBox="0 0 24 44"
                        preserveAspectRatio="none"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                      </svg>
                      <button
                        onClick={() => setCategory({ category: page.slug })}
                        className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                        aria-current={page.slug ? 'page' : undefined}
                      >
                        {page.name}
                      </button>
                    </div>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
          <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            {posts.map((post) => (
              <div key={post.title} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-shrink-0">
                  <img className="h-48 w-full object-cover" src={`http://10.47.12.3:8080/storage/${post.image_name}`} alt="" />
                </div>
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-indigo-600">
                      <NavLink
                        to={'#'} className="hover:underline">
                        {post.blog_category.name}
                      </NavLink>
                    </p>
                    <NavLink to={`/journey/${post.id}/${post.slug}`} className="block mt-2">
                      <p className="text-xl font-semibold text-gray-900">{post.title}</p>
                      <p className="mt-3 text-base text-gray-500 truncate">{post.content}</p>
                    </NavLink>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                      <NavLink to={'#'}>
                        <span className="sr-only">{post.blogger.name}</span>
                        {/* <img className="h-10 w-10 rounded-full" src={post.author.imageUrl} alt="" /> */}
                      </NavLink>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900 uppercase">
                        {/* <a href={post.author.href} className="hover:underline"> */}
                        {post.blogger.name}
                        {/* </a> */}
                      </p>
                      <div className="flex space-x-1 text-sm text-gray-500">
                        {/* {console.log()} */}


                        <time dateTime={GetDate(post.created_at).time}>{GetDate(post.created_at).newDate}</time>
                        <span aria-hidden="true">&middot;</span>
                        <span>| posted {GetDate(post.created_at).posted}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Journey