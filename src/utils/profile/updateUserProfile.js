import axios from 'axios';

// Obtén la URL base de las variables de entorno
const url = process.env.REACT_APP_API_URL;
const fullUrl = `${url}/api/user/profile/`;

// Función para actualizar el perfil del usuario
export const updateUserProfile = async (formData) => {
    try {
        // Obtén el token de autenticación
        const token = localStorage.getItem('token');
        
        // Configura los encabezados para la solicitud
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            }
        };

        // Realiza la solicitud PUT para actualizar el perfil
        const response = await axios.put(fullUrl, formData, config);

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;  // Lanza el error para que el componente pueda manejarlo
    }
};
