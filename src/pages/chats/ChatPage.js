import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import useChatWebSocket from '../../hooks/useChatWebSocket';
import ChatList from './ChatList';
import ChatMessages from './ChatMessages';
import Layout from '../Layout';
import { getChats } from './../../store/actions/chat';
import { FILES_URL } from '../../utils/api';

function ChatPage() {
    const { chatId } = useParams();
    const dispatch = useDispatch();
    const chats = useSelector((state) => state.chats.chats);
    const [ newMessage, setNewMessage ] = useState(null)
    const selectedChat = chats?.find(chat => chat.id === parseInt(chatId));

    useEffect(() => {
        if (!chats || chats.length === 0) {
            dispatch(getChats());
        }
    }, [dispatch, chats]);

    const handleSetNewMessage = (e) => {
        const msg = e.message;
        const message = {
                ...msg,
                images: msg.images?.map((image) => {
                        return {
                            ...image,
                            image: FILES_URL + image.image
                        }
                    }),
                sender: {
                    ...msg.sender,
                    profile: {
                        ...msg.sender.profile,
                        profile_picture: FILES_URL + msg.sender.profile.profile_picture
                    }
                }
            }
        setNewMessage(message)
    }

    // Usar el chat completo para inicializar la conexión WebSocket
    useChatWebSocket(selectedChat, handleSetNewMessage);

    return (
        <Layout showPostIcon={false}>
            <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
                <div className="md:w-1/3 w-auto border-r border-gray-200 bg-white flex flex-col">
                    <div className="flex-1 overflow-y-auto">
                        <ChatList />
                    </div>
                </div>

                <div className="md:w-2/3 w-full bg-white flex flex-col">
                    <div className="flex-1 overflow-y-auto">
                        {selectedChat ? (
                            <ChatMessages chat={selectedChat} newMessage={newMessage} />
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <p>Selecciona un chat para comenzar a mensajear</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ChatPage;
