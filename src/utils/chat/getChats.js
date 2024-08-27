import axios from "axios";
const url = process.env.REACT_APP_API_URL;
const fullUrl = url + '/api/chat/chatrooms'

export const getChats = async () => {
    try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        };

        const res = await axios.get(`${fullUrl}/`, config);
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};