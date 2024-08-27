// src/actions/chatActions.js
import axios from 'axios';
import { GET_CHATS, ADD_CHAT, UPDATE_CHAT, CHAT_ERROR } from '../types';

const url = process.env.REACT_APP_API_URL;
const chatUrl = `${url}/api/chat/chatrooms/`;

// Obtener chats
export const getChats = () => async (dispatch, getState) => {
    try {
        const config = {
            headers: { 'Authorization': `Bearer ${getState().auth.token}` }
        };
        const res = await axios.get(chatUrl, config);
        dispatch({ type: GET_CHATS, payload: res.data });
    } catch (err) {
        dispatch({ type: CHAT_ERROR, payload: err.response.data });
    }
};

// Agregar o actualizar un chat
export const updateChat = (chat) => (dispatch) => {
    dispatch({ type: UPDATE_CHAT, payload: chat });
};

export const updateChats = (chatId) => {
    return {
        type: 'UPDATE_CHATS',
        payload: chatId,
    };
};

export const updateChatWithMessage = (chatId, message) => ({
    type: 'UPDATE_CHAT_WITH_MESSAGE',
    payload: { chatId, message },
});
