import axios from 'axios';

const url = process.env.REACT_APP_API_URL;
const fullUrl = `${url}/api/search/users/`;

export const searchUsers = async (query) => {
    try {
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        };
                
        const response = await axios.get(fullUrl, {
            params: { query: query },
            ...config
        });
        return response.data;
    } catch (error) {
        console.error("Error details:", error.response ? error.response.data : error.message);
        throw error;
    }
};
