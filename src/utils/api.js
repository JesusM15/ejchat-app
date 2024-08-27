import axios from 'axios';

const API = axios.create({
  baseURL: 'https://ejchat-api.onrender.com/api',  // Asegúrate de que esta URL apunte a tu backend Django
});

export const FILES_URL = '';

// Puedes definir aquí las llamadas a la API, por ejemplo:
export const fetchPosts = () => API.get('/posts');
export const fetchProfile = (userId) => API.get(`/profiles/${userId}`);
export const fetchChats = () => API.get('/chats');
