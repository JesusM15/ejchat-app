// import { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { addGeneralMessage } from './../store/actions/message';
// import { updateChats } from './../store/actions/chat';

// function useGeneralWebSocket() {
//     const user = useSelector((state) => state.auth.user);
//     const dispatch = useDispatch();

//     useEffect(() => {
//         const socket = new WebSocket(`ws://127.0.0.1:8000/ws/general/${user.id}/`);

//         socket.onopen = () => {
//             console.log('General WebSocket connection established');
//         };

//         socket.onmessage = (event) => {
//             const data = JSON.parse(event.data);
//             console.log('General Message received:', data);

//             dispatch(addGeneralMessage(data.message));
//             dispatch(updateChats(data.chat_id));
//         };

//         socket.onclose = () => {
//             console.log('General WebSocket connection closed');
//         };

//         return () => {
//             socket.close();
//         };
//     }, [user.id, dispatch]);

//     return null;
// }

// export default useGeneralWebSocket;
