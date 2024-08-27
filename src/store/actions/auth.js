import axios from 'axios';
import { LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, AUTH_ERROR, REGISTER_SUCCESS, PROFILE_UPDATE_SUCCESS, PROFILE_UPDATE_FAIL } from '../types';
const url = process.env.REACT_APP_API_URL;

export const loadUser = () => async (dispatch, getState) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getState().auth.token}`,
        },
    };
    try {

        const res = await axios.get(`${url}/api/user/`, config);

        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
    } catch (err) {
        console.error('Error al cargar el usuario:', err);

        dispatch({
            type: AUTH_ERROR,
        });
    }
};

export const login = (email, password) => async (dispatch) => {
    const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(`${url}/api/token/`, body, config); // Ruta del backend para obtener el token JWT
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser()); // Cargar información del usuario después del login
  } catch (err) {
    console.log(err)
    dispatch({
        type: LOGIN_FAIL,
        payload: err.response,
    });
    return err.response;
  }
};

export const register = (item) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify(item);

  try{
    const res = await axios.post(`${url}/api/register/`, body, config); // Ruta del backend para obtener el token JWT
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    return res.data
  }catch(err){
    console.log(err);
  }

}

export const updateUserProfile = (formData) => async (dispatch, getState) => {
  try {
      const token = localStorage.getItem('token');
      const config = {
          headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`,
          }
      };

      // Realiza la solicitud PUT para actualizar el perfil
      const response = await axios.put(`${url}/api/user/profile/`, formData, config);

      // Actualiza el estado global con los nuevos datos del perfil
      dispatch({
          type: PROFILE_UPDATE_SUCCESS,
          payload: response.data,
      });

      return response.data;
  } catch (error) {
      console.error(error);

      dispatch({
          type: PROFILE_UPDATE_FAIL,
          payload: error.response ? error.response.data : { msg: 'Error al actualizar el perfil' },
      });
      throw error;  // Lanza el error para que el componente pueda manejarlo
  }
};