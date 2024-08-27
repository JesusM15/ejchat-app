// src/reducers/postReducer.js
import { GET_POSTS, ADD_POST, DELETE_POST, POST_ERROR, LOAD_MORE_POSTS } from '../types';

const initialState = {
    posts: [],
    loading: true,
    error: {},
    page: 1,
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false,
                page: 1,
            };
        case LOAD_MORE_POSTS:
            return {
                ...state,
                posts: [...state.posts, ...payload],
                loading: false,
                page: state.page + 1,
            };
        case ADD_POST:
            return {
                ...state,
                posts: [payload, ...state.posts],
                loading: false,
            };
        case POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        default:
            return state;
    }
}
