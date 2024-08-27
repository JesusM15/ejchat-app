// src/actions/postActions.js

import axios from 'axios';
import { GET_POSTS, ADD_POST, POST_ERROR, LOAD_MORE_POSTS } from '../types';
const url = process.env.REACT_APP_API_URL;
const fullUrl = url + '/api/post/'

// Obtener posts
export const getPosts = (page = 1) => async (dispatch, getState) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${getState().auth.token}`,
            }
        }
        const res = await axios.get(`${fullUrl}?page=${page}`, config);
        dispatch({
            type: page === 1 ? GET_POSTS : LOAD_MORE_POSTS,
            payload: res.data.results,
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

// Crear post
export const addPost = (post) => async (dispatch, getState) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${getState().auth.token}`,
        },
    };
    // const body = JSON.stringify(post);
    // console.log(body)
    try {
        const res = await axios.post(`${fullUrl}`, post, config);
        dispatch({
            type: ADD_POST,
            payload: res.data,
        });
    } catch (err) {
        console.log(err)
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

export const addComment = (comment) => async (dispatch, getState) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${getState().auth.token}`,
        },
    };


    try{
        const res = await axios.post(`${fullUrl}${comment.post_id}/addComment/`, comment, config);
        return res;
    } catch(err) {
        console.log(err);
    };
};