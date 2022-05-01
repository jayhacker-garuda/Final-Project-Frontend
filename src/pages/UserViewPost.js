import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom'
import { SimpleError } from '../components/Alert';
import CustomTextArea from '../components/CustomTextArea';
import { useAppContext } from '../context/appContext';


const comments = [
    { username: 'sham don', blogPostId: 1, content: 'yes yzt' }
]

function UserViewPost() {

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            id: '',
            content: '',
        },
        delayError: 500,
        shouldFocusError: true,
        mode: "onChange"
    });
    const { token } = useAppContext();
    const { id, slug } = useParams();
    const [loading, setLoading] = useState(undefined);
    const [blogPost, setBlogPost] = useState([]);

    // console.log('Id => ', id, 'slug =>', slug);

    const handleBlogPostComment = (data) => {

    }

    useEffect(() => {

        const controller = new AbortController();

        const configG = {
            method: 'get',
            url: `/api/get-blog-post/${id}`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        axios(configG)
            .then((res) => {

                // console.log(res.data.body)
                setBlogPost(res.data.body)
                setLoading(true)
                // console.log(blogPost.title);

            }).catch((error) => {
                console.log(error.response)
                if (error.response.status === 404) {

                    if (error.response.data['message'] === '')
                        SimpleError(error.response.statusText);
                    // if (error.response.message !== null)
                    SimpleError(error.response.data.message)
                }

                if (error.response.status === 429)
                    SimpleError(error.response.statusText);

            })

        return () => {

            controller.abort()

        }
    }, [token, id, loading])
    return (
        <div className="relative bg-white bg-opacity-40 py-16 sm:py-24 bg-opa">
            <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-24 lg:items-start">
                <div className="relative sm:py-16 lg:py-0">
                    <div aria-hidden="true" className="hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen">
                        <div className="absolute inset-y-0 right-1/2 w-full bg-gray-50 rounded-r-3xl lg:right-72" />
                        <svg
                            className="absolute top-8 left-1/2 -ml-3 lg:-right-8 lg:left-auto lg:top-12"
                            width={404}
                            height={392}
                            fill="none"
                            viewBox="0 0 404 392"
                        >
                            <defs>
                                <pattern
                                    id="02f20b47-fd69-4224-a62a-4c9de5c763f7"
                                    x={0}
                                    y={0}
                                    width={20}
                                    height={20}
                                    patternUnits="userSpaceOnUse"
                                >
                                    <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                                </pattern>
                            </defs>
                            <rect width={404} height={392} fill="url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)" />
                        </svg>
                    </div>
                    <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0 lg:max-w-none lg:py-20">
                        {/* Testimonial card*/}
                        <div className="relative pt-64 pb-10 rounded-2xl shadow-xl overflow-hidden">
                            <img
                                className="absolute inset-0 h-full w-full object-cover"
                                src={`http://10.47.12.3:8080/storage/${blogPost.image_name}`}
                                alt=""
                            />
                            <div className="absolute inset-0 bg-indigo-500 mix-blend-multiply" />
                            <div className="absolute inset-0 bg-gradient-to-t from-indigo-600 via-indigo-600 opacity-90" />
                            {/* <div className="relative px-8">
                                <div>
                                    <img
                                        className="h-12"
                                        src="https://tailwindui.com/img/logos/workcation.svg?color=white"
                                        alt="Workcation"
                                    />
                                </div>
                                <blockquote className="mt-8">
                                    <div className="relative text-lg font-medium text-white md:flex-grow">
                                        <svg
                                            className="absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-indigo-400"
                                            fill="currentColor"
                                            viewBox="0 0 32 32"
                                            aria-hidden="true"
                                        >
                                            <path d="M9.352 4JUdGzvrMFDWrUUwY3toJATSeNwjn54LkCnKBPRzDuhzi5vSepHfUckJNxRL2gjkNrSqtCoRUrEDAgRwsQvVCjZbRyFTLRNyDmT1a1boZV4JUdGzvrMFDWrUUwY3toJATSeNwjn54LkCnKBPRzDuhzi5vSepHfUckJNxRL2gjkNrSqtCoRUrEDAgRwsQvVCjZbRyFTLRNyDmT1a1boZV256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                                        </svg>
                                        <p className="relative">
                                            Tincidunt integer commodo, cursus etiam aliquam neque, et. Consectetur pretium in volutpat, diam.
                                            Montes, magna cursus nulla feugiat dignissim id lobortis amet.
                                        </p>
                                    </div>

                                    <footer className="mt-4">
                                        <p className="text-base font-semibold text-indigo-200">{blogPost.name}, {blogPost.user_type}</p>
                                    </footer>
                                </blockquote>
                            </div> */}
                        </div>
                    </div>
                </div>

                <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0">
                    {/* Content area */}
                    <div className="pt-12 sm:pt-16 lg:pt-20">
                        <h2 className="text-3xl text-gray-900 font-extrabold tracking-tight sm:text-4xl">
                            {blogPost.title}
                        </h2>
                        <div className="mt-6 text-gray-500 space-y-6">
                            <p className="text-lg">
                                {blogPost.content}
                            </p>
                            {/* <p className="text-base leading-7">
                                Sollicitudin tristique eros erat odio sed vitae, consequat turpis elementum. Lorem nibh vel, eget
                                pretium arcu vitae. Eros eu viverra donec ut volutpat donec laoreet quam urna. Sollicitudin tristique
                                eros erat odio sed vitae, consequat turpis elementum. Lorem nibh vel, eget pretium arcu vitae. Eros eu
                                viverra donec ut volutpat donec laoreet quam urna.
                            </p>
                            <p className="text-base leading-7">
                                Rhoncus nisl, libero egestas diam fermentum dui. At quis tincidunt vel ultricies. Vulputate aliquet
                                velit faucibus semper. Pellentesque in venenatis vestibulum consectetur nibh id. In id ut tempus
                                egestas. Enim sit aliquam nec, a. Morbi enim fermentum lacus in. Viverra.
                            </p> */}
                        </div>
                    </div>

                    {/* Comment section */}
                    <div className="mt-10">
                        <dl className="grid grid-cols-2 gap-x-4 gap-y-8">
                            {/* {comments.map((stat) => (
                                <div key={stat.label} className="border-t-2 border-gray-100 pt-6">
                                    <dt className="text-base font-medium text-gray-500">{stat.label}</dt>
                                    <dd className="text-3xl font-extrabold tracking-tight text-gray-900">{stat.value}</dd>
                                </div>
                            ))} */}
                        </dl>
                        <div className="mt-10 flex flex-col">
                            <CustomTextArea
                                name="content"
                                control={control}
                                rules={{
                                    required: 'Blog Content is required',
                                    // pattern: { value: EMAIL_REGEX, message: 'Email is invalid' },
                                    // maxLength: { value: 255, message: 'FullNAme should be minimum 255 characters long' }
                                }}
                            />

                            <button
                            type="button" 
                                onClick={() => handleSubmit(handleBlogPostComment)}
                            className="mt-2 px-4 py-2 border border-transparent text-sm text-center font-medium rounded-full shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                comment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto sm:px-6 lg:px-8">
                <div className="sm:flex">
                    <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
                        <svg
                            className="h-16 w-16 border border-gray-300 bg-white text-gray-300"
                            preserveAspectRatio="none"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 200 200"
                            aria-hidden="true"
                        >
                            <path vectorEffect="non-scaling-stroke" strokeWidth={1} d="M0 0l200 200M0 200L200 0" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold">Lorem ipsum</h4>
                        <p className="mt-1">
                            Repudiandae sint consequuntur vel. Amet ut nobis explicabo numquam expedita quia omnis voluptatem. Minus
                            quidem ipsam quia iusto.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default UserViewPost