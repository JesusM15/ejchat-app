import axios from 'axios';

const url = process.env.REACT_APP_API_URL;
const fullUrl = `${url}/api/chat/chatrooms/create-or-retrieve/`;

export const handleMessageClick = async (userProfile) => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
        };
        const response = await axios.post(`${fullUrl}`, {
            target_user_id: userProfile.id
        }, config);

        const chatId = response.data.id;

        return chatId;
    } catch (error) {
        console.error("Error al crear o obtener el chat", error);
    }
};
