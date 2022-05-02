import React, { useReducer, useContext } from 'react';
import axios from 'axios';

import {
    ALL_POST_BEGIN,
    ALL_POST_SUCCESS,
    BLOG_CATEGORY_BEGIN,
    BLOG_CATEGORY_ERROR,
    BLOG_CATEGORY_SUCCESS,
    BLOG_POST_BEGIN,
    BLOG_POST_ERROR,
    BLOG_POST_SUCCESS,
    CATEGORY_TABS_BEGIN,
    CATEGORY_TABS_ERROR,
    CATEGORY_TABS_SUCCESS,
    LOGIN_USER_BEGIN,
    LOGIN_USER_ERROR,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER_BEGIN,
    LOGOUT_USER_SUCCESS,
    REGISTER_USER_BEGIN,
    REGISTER_USER_ERROR,
    REGISTER_USER_SUCCESS,
} from './actions'
import reducer from './reducers';
import { SimpleError, SimpleSuccess, ToastErrorSuccess } from '../components/Alert';
import { isAdmin, isAnon } from '../utils';
import { Navigate, useNavigate } from 'react-router-dom';


axios.defaults.baseURL = 'http://10.47.12.3:8080';
// axios.defaults.baseURL = 'http://10.44.16.9:8000';
// axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

axios.defaults.withCredentials = false;
axios.defaults.headers['Access-Control-Allow-Origin'] = '*';

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');

const initialState = {
    user: user ? JSON.parse(user) : null,
    token: token ? token : null,
    tabs: [],
    categories: [],
    posts: []

}

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);


    const logoutConfig = {
        method: 'get',
        url: '/api/logout',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    const blogConfig = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    const addUserToLocal = ({ user, token }) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
    }

    const removeUser = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }

    const registerUser = async (currentUser) => {
        // console.log(currentUser)

        dispatch({ type: REGISTER_USER_BEGIN })
        try {

            await axios.get('/sanctum/csrf-cookie').then(response => {
                axios.post('/api/register', currentUser)
                    .then((res) => {
                        // console.log(res);
                        const { user, token } = res.data.body;

                        dispatch({
                            type: REGISTER_USER_SUCCESS,
                            payload: {
                                user, token
                            }
                        })

                        addUserToLocal({ user, token })
                    })

            })


        } catch (error) {
            console.log(error)
            dispatch({
                type: REGISTER_USER_ERROR,
                payload: { msg: error.response.data.msg }
            })
        }

    }

    const loginUser = async (currentLoginUser) => {
        dispatch({ type: LOGIN_USER_BEGIN })
        try {
            await axios.get('/sanctum/csrf-cookie').then(response => {
                axios.post('/api/login', currentLoginUser)
                    .then((res) => {
                        // console.log(res);
                        const { user, token } = res.data.body;

                        dispatch({
                            type: LOGIN_USER_SUCCESS,
                            payload: {
                                user, token
                            }
                        })

                        ToastErrorSuccess();
                        addUserToLocal({ user, token })
                        const role = user.user_type
                        return role
                    }).catch((err) => {
                        dispatch({
                            type: LOGIN_USER_ERROR,
                        })

                        if (err.response.status === 422) {

                            SimpleError(err.response.data.message);
                        }
                    })

            })
        } catch (error) {
            // console.log(error,"line 102");

        }
    }

    const logoutUser = async () => {
        dispatch({ type: LOGOUT_USER_BEGIN })

        try {
            await axios.get('/sanctum/csrf-cookie').then(response => {
                axios(logoutConfig)
                    .then((res) => {
                        console.log(res);

                        dispatch({
                            type: LOGOUT_USER_SUCCESS,
                        })

                        ToastErrorSuccess(res.data.message);
                        removeUser()
                    })

            })
        } catch (error) {
            // ToastErrorSuccess(error.response.data);
            // console.log(error,"line 102");

        }
    }

    const addBlogCategory = async (category) => {

        dispatch({ type: BLOG_CATEGORY_BEGIN })
        blogConfig['url'] = '/api/store-blog-category'
        blogConfig['method'] = 'post'
        blogConfig['data'] = category

        try {
            await axios.get('/sanctum/csrf-cookie').then(response => {
                axios(blogConfig)
                    .then((res) => {


                        SimpleSuccess(res.data.message);

                    })
            })
        } catch (error) {
            console.log(error)
        }
    }


    const getTabCategory = async () => {

        dispatch({
            type: CATEGORY_TABS_BEGIN
        })
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
                        console.log(res.data.body)
                        const tabs = res.data.body
                        dispatch({
                            type: CATEGORY_TABS_SUCCESS,
                            payload: {
                                tabs

                            }
                        });
                    }).catch((err) => {

                        dispatch({
                            type: CATEGORY_TABS_ERROR,
                        })
                        if (err.response.status === 401) {
                            //   navigate('/login');
                        }
                    })
            })
        } catch (error) {
            console.log(error)
        }
    }

    const getBlogCategory = async () => {
        // dispatch({ type: BLOG_CATEGORY_BEGIN })

        dispatch({
            type: BLOG_CATEGORY_BEGIN
        })
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
                        const cat = res.data.body
                        dispatch({
                            type: BLOG_CATEGORY_SUCCESS,
                            payload: {
                                cat
                            }
                        });
                    }).catch((err) => {

                        dispatch({
                            type: BLOG_CATEGORY_ERROR,
                        })
                        if (err.response.status === 401) {
                            //   navigate('/login');
                        }
                    })
            })
        } catch (error) {
            // console.log(error)
        }
    }

    const addBlogPost = async (blog) => {
        dispatch({ type: BLOG_POST_BEGIN })
        const {
            title, image,
            visited, days,
            category, content,
            metaTitle, metaKeyword,
            metaDescription,
        } = blog;

        const formData = new FormData();
        formData.append('title', title);
        formData.append('image', image[0]);
        formData.append('content', content);
        formData.append('visited', visited);
        formData.append('days', days);
        formData.append('category', category);
        formData.append('meta_title', metaTitle);
        formData.append('meta_keyword', metaKeyword);
        formData.append('meta_description', metaDescription);

        // console.log(image)
        blogConfig['url'] = '/api/store-blog-post'
        blogConfig['method'] = 'post'
        blogConfig['data'] = formData

        try {
            await axios.get('/sanctum/csrf-cookie').then(response => {
                axios(blogConfig)
                    .then((res) => {

                        dispatch({ type: BLOG_POST_SUCCESS })
                        SimpleSuccess(res.data.message);
                        // if (res.status === 442)
                        //     SimpleSuccess(res.data);
                    })
            })
        } catch (error) {
            dispatch({ type: BLOG_POST_ERROR })
            console.log(error.toJson())
        }
    }

    const getBlogPost = async ({ category }) => {
        dispatch({ type: ALL_POST_BEGIN })
        console.log(category);
        const config = {
            method: 'get',
            url: category.has('category') ? `/api/all-blog-post/?${category}` : '/api/all-blog-post',
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

                        console.log(res.data.body)
                        const posts = res.data.body

                        dispatch({
                            type: ALL_POST_SUCCESS,
                            payload: {
                                posts
                            }
                        })
                        // setPosts(res.data.body)
                    })
            })
        } catch (error) {
            console.log(error)

            // if (error.response.status === 401) {
            //   navigate('/login');
            // }


        }
    }

    const addComment = async (comment) => {

    }

    return (
        <AppContext.Provider value={{
            ...state,
            registerUser,
            loginUser,
            logoutUser,
            addBlogCategory,
            blogConfig,
            // dispatch,
            addBlogPost,
            getBlogCategory,
            getTabCategory,
            getBlogPost
        }}>
            {children}
        </AppContext.Provider>
    )
}

const useAppContext = () => {
    return useContext(AppContext)
}

const PrivateRoute = ({ children }) => {
    const loggedIn = !isAnon(user);
    // const adminLogin = isAdmin(user);

    // console.log(loggedIn)

    if (!loggedIn)
        return <Navigate to='/login' replace />;

    return children;
}

const AdminPrivateRoute = ({ children }) => {
    const loggedIn = !isAnon(user);
    const adminLogin = !isAdmin(user.user_type);

    console.log(adminLogin, "Line 263");


    if (!adminLogin)
        return <Navigate to='/' replace />;
    if (!loggedIn)
        return <Navigate to='/login' replace />;

    return children;
}

const renderComponent = (Component, additionalProps = {}) => {

    return <AppContext.Consumer>{(appContext) => <Component appContext={appContext} {...additionalProps} />}</AppContext.Consumer>
}



export {
    AppProvider,
    useAppContext,
    initialState,
    renderComponent,
    PrivateRoute,
    AdminPrivateRoute
}