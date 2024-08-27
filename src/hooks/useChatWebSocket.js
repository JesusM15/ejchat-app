import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateChats } from './../store/actions/chat';
import { updateMessages } from './../store/actions/message';

const useChatWebSocket = (chat, handleSetNewMessage) => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.auth.user.id);

    useEffect(() => {
        if (!chat || !chat.id) {
            return; // No hacer nada si `chat` o `chat.id` no están disponibles
        }
        // Conectar al WebSocket del chat específico
        const chatSocket = new WebSocket(`wss://ejchat-api.onrender.com/ws/chat/${chat.id}/`);
        chatSocket.onopen = () => {
            console.log('Connected to chat WebSocket');
        };

        chatSocket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            handleSetNewMessage(data)
        };

        chatSocket.onclose = () => {
            console.log('Disconnected from chat WebSocket');
        };

        // Conectar al WebSocket general del usuario
        const generalSocket = new WebSocket(`wss://ejchat-api.onrender.com/ws/general/${userId}/`);
        generalSocket.onopen = () => {
            console.log('Connected to general WebSocket');
        };

        generalSocket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            if (data.chat_id) {
                dispatch(updateChats(data.chat_id)); // Actualiza la lista de chats con el chat más reciente
            }
        };

        generalSocket.onclose = () => {
            console.log('Disconnected from general WebSocket');
        };

        return () => {
            chatSocket.close();
            generalSocket.close();
        };
    }, [chat, userId, dispatch]);
};

export default useChatWebSocket;
