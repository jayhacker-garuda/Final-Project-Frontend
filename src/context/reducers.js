import {
    BLOG_CATEGORY_BEGIN,
    BLOG_CATEGORY_ERROR,
    BLOG_CATEGORY_SUCCESS,
    BLOG_POST_BEGIN,
    BLOG_POST_ERROR,
    BLOG_POST_SUCCESS,
    LOGIN_USER_BEGIN,
    LOGIN_USER_ERROR,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER_BEGIN,
    LOGOUT_USER_SUCCESS,
    BLOG_COMMENT_BEGIN,
    BLOG_COMMENT_ERROR,
    BLOG_COMMENT_SUCCESS,
    CATEGORY_TABS_BEGIN,
    CATEGORY_TABS_SUCCESS,
    CATEGORY_TABS_ERROR,
    REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    ALL_POST_BEGIN,
    ALL_POST_SUCCESS,
    ALL_POST_ERROR
} from "./actions";

const reducer = (state, action) => {


    if (action.type === BLOG_COMMENT_BEGIN) {
        return {...state}
    }

    if (action.type === BLOG_COMMENT_SUCCESS) {
        return {
            ...state,
            user: action.payload.user,
            token: action.payload.token
        }
    }

    if (action.type === BLOG_COMMENT_ERROR) {
        return {...state}
    }

    if (action.type === LOGIN_USER_BEGIN) {
        return { ...state }
    }

    if (action.type === LOGIN_USER_SUCCESS) {
        return {
            ...state,
            user: action.payload.user,
            token: action.payload.token
        }
    }

    if (action.type === LOGIN_USER_ERROR) {
        return {...state}
    }
    if (action.type === REGISTER_USER_BEGIN) {
        return { ...state }
    }

    if (action.type === REGISTER_USER_SUCCESS) {
        return {
            ...state,
            user: action.payload.user,
            token: action.payload.token
        }
    }

    if (action.type === REGISTER_USER_ERROR) {
        return {...state}
    }

    if (action.type === LOGOUT_USER_BEGIN) {
        return { ...state }
    }

    if (action.type === LOGOUT_USER_SUCCESS) {
        return {
            ...state,
            user: null,
            token: null
        }
    }

    if (action.type === BLOG_CATEGORY_BEGIN) {
        return { ...state }
    }

    if (action.type === BLOG_CATEGORY_SUCCESS) {
        return {
            ...state,
            categories: action.payload.cat,
        }
    }

    if (action.type === BLOG_CATEGORY_ERROR) {
        return { ...state }
    }

    if (action.type === CATEGORY_TABS_BEGIN) {
        return { ...state }
    }

    if (action.type === CATEGORY_TABS_SUCCESS) {
        return {
            ...state,
            tabs: action.payload.tabs,
        }
    }

    if (action.type === CATEGORY_TABS_ERROR) {
        return { ...state }
    }

    if (action.type === BLOG_POST_BEGIN) {
        return { ...state }
    }

    if (action.type === BLOG_POST_SUCCESS) {
        return {
            ...state,
        }
    }

    if (action.type === BLOG_POST_ERROR) {
        return { ...state }
    }

    if (action.type === BLOG_COMMENT_BEGIN) {
        return { ...state }
    }

    if (action.type === BLOG_COMMENT_SUCCESS) {
        return {
            ...state,
            blogComment: action.payload.blogComment
        }
    }

    if (action.type === BLOG_COMMENT_ERROR) {
        return { ...state }
    }
    if (action.type === ALL_POST_BEGIN) {
        return { ...state }
    }

    if (action.type === ALL_POST_SUCCESS) {
        return {
            ...state,
            posts: action.payload.posts
        }
    }

    if (action.type === ALL_POST_ERROR) {
        return { ...state }
    }


    throw new Error(`no such action ${action.type}`)
}

export default reducer;