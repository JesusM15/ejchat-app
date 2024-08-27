// src/reducers/chatReducer.js
import { GET_CHATS, UPDATE_CHAT, CHAT_ERROR } from '../types';

const initialState = {
    chats: [],
    loading: true,
    error: {},
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_CHATS:
            return { ...state, chats: payload, loading: false };
        case UPDATE_CHAT:
            return {
                ...state,
                chats: state.chats.map(chat => 
                    chat.id === payload.id ? payload : chat
                ),
                loading: false,
            };
            case 'UPDATE_CHATS':
                const updatedChatId = action.payload;
                
                // Obtener el chat actualizado por ID, aquí se debe usar la lógica adecuada para obtener los detalles
                const updatedChat = state.chats.find(chat => chat.id === updatedChatId);
            
                if (updatedChat) {
                    // Eliminar el chat actualizado de la lista actual
                    const updatedChats = state.chats.filter(chat => chat.id !== updatedChat.id);
                    // Mover el chat más reciente al principio
                    updatedChats.unshift(updatedChat);
            
                    return {
                        ...state,
                        chats: updatedChats,
                    };
                }
            
                // Si el chat no está en la lista, no hacer nada o manejar el caso según sea necesario
                return state;
        case CHAT_ERROR:
            return { ...state, error: payload, loading: false };
        default:
            return state;
    }
}
