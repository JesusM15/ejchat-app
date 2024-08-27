import axios from 'axios';

const url = process.env.REACT_APP_API_URL;
const fullUrl = `${url}/api/post/`;

export const getUserPost = async (user_id) => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        };

        // Hacer la solicitud GET con los parámetros y la configuración
        const response = await axios.get(`${fullUrl}user_posts/`, {
            params: { user_id: user_id },  // Pasar el user_id como parámetro de consulta
            ...config  // Incluir la configuración de headers
        });

        return response.data;
    } catch (e) {
        console.error(e);
    }
};
