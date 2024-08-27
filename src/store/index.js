// src/store/index.js

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';

// Importa tus reducers
import authReducer from './reducers/auth';
import postReducer from './reducers/post';
import chatReducer from './reducers/chat';
import messageReducer from './reducers/message';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // para configurar redux devtools en caso de que el usuario tenga la extension

// const rootReducer = combineReducers({
//   auth: authReducer,
//   // Agrega más reducers según sea necesario
// });

export default () => {
	const store = createStore(
		combineReducers({
			auth: authReducer,
			posts: postReducer,
			chats: chatReducer,
			messages: messageReducer,

		}),
		composeEnhancers(applyMiddleware(thunk))
	)
	return store
}