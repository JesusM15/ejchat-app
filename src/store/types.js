// src/store/types.js

/*
    tambien se suele llamar por convencion constants.js se utiliza para definir constantes 
    que representan los tipos de acciones que puedes despachar en Redux. 
    
*/

// POST ACTIONS
export const GET_POSTS = 'GET_POSTS';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const LOAD_MORE_POSTS = 'LOAD_MORE_POSTS';
export const POST_ERROR = 'POST_ERROR';

// AUTH ACTIONS
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';
export const AUTH_ERROR = 'AUTH_ERROR';
export const USER_LOADED = 'USER_LOADED';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const PROFILE_UPDATE_SUCCESS = 'PROFILE_UPDATE_SUCCESS';
export const PROFILE_UPDATE_FAIL = 'PROFILE_UPDATE_FAIL';

// CHAT ACTIONS
export const GET_CHATS = 'GET_CHATS';
export const ADD_CHAT = 'ADD_CHAT';
export const UPDATE_CHAT = 'UPDATE_CHAT';
export const CHAT_ERROR = 'CHAT_ERROR';

// MESSAGE ACTIONS
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const UPDATE_MESSAGES = 'UPDATE_MESSAGES';  // Para actualizaciones en tiempo real
export const MESSAGE_ERROR = 'MESSAGE_ERROR';