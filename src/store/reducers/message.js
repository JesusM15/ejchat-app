// src/reducers/messageReducer.js
import { ADD_MESSAGE, UPDATE_MESSAGES, MESSAGE_ERROR } from '../types';

const initialState = {
    messages: {},
    loading: true,
    error: {},
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case ADD_MESSAGE:
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [payload.chatId]: [...(state.messages[payload.chatId] || []), payload.message],
                },
                loading: false,
            };
        case UPDATE_MESSAGES:
            return {
                ...state,
                messages: { ...payload },
                loading: false,
            };
        case 'FETCH_MESSAGES_SUCCESS':
            return {
                ...state,
                [action.payload.chatId]: action.payload.messages
            };
        case 'FETCH_MESSAGES_FAILURE':
            // Manejo de errores
            return state;
        case MESSAGE_ERROR:
            return { ...state, error: payload, loading: false };
        default:
            return state;
    }
}
