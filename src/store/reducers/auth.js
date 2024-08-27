// src/store/reducers/authReducer.js

import { LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, AUTH_ERROR, LOGOUT, REGISTER_SUCCESS, PROFILE_UPDATE_SUCCESS, PROFILE_UPDATE_FAIL } from '../types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  user: null,
};

export default function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.access);
      return {
        ...state,
        token: payload.access,
        isAuthenticated: true,
        loading: false,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload, // Aquí se guarda la información del usuario
      };
    case PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          ...payload, // Actualiza los campos del usuario
        },
        loading: false,
      };
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
}
