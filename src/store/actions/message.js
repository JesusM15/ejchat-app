// src/actions/message.js
import axios from 'axios';
import { ADD_MESSAGE, UPDATE_MESSAGES, MESSAGE_ERROR } from '../types';

// El URL base del API
const url = process.env.REACT_APP_API_URL;
const messageUrl = `${url}/api/chat/chatrooms/`;


// Crear un mensaje
export const createMessage = (chat, messageData) => async (dispatch, getState) => {
    try {
        const config = {
            headers: { 
                'Authorization': `Bearer ${getState().auth.token}`,
                'Content-Type': 'multipart/form-data',
            }
        };
        const res = await axios.post(`${messageUrl}${messageData.chat_room}/messages/`, messageData, config);
        dispatch({ type: ADD_MESSAGE, payload: res.data });
    } catch (err) {
        console.log(err)
        dispatch({ type: MESSAGE_ERROR, payload: err.response.data });
    }
};

export const getMessages = (chatId) => async (dispatch, getState) => {
    try {
        const config = {
            headers: { 
                'Authorization': `Bearer ${getState().auth.token}`,
            }
        };
        const response = await axios.get(`${url}/api/chat/${chatId}/messages/`, config);
        dispatch({
            type: 'FETCH_MESSAGES_SUCCESS',
            payload: {
                chatId,
                messages: response.data
            }
        });
        return response.data
    } catch (error) {
        dispatch({
            type: 'FETCH_MESSAGES_FAILURE',
            payload: error.message
        });
    }
};


// Actualizar mensajes (si es necesario para la UI)
export const updateMessages = (messages) => (dispatch) => {
    dispatch({ type: UPDATE_MESSAGES, payload: messages });
};
