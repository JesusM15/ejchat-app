import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ChatList() {
    // Obtener los chats del estado de Redux
    const chats = useSelector((state) => state.chats.chats || []);
    const user = useSelector((state) => state.auth.user);

    // Asegúrate de que chats sea un array
    if (!Array.isArray(chats)) {
        return <div>No hay chats disponibles.</div>;
    }

    return (
        <div>
            {chats.map(chat => {
                const participant1 = chat?.participant1;
                const participant2 = chat?.participant2;
                const otherParticipant = participant1?.id === user?.id
                    ? participant2
                    : participant1;

                // Verificar si `otherParticipant` existe
                if (!otherParticipant) {
                    return null; // O puedes retornar un mensaje de error
                }

                const lastMessage = chat?.messages?.[chat.messages.length - 1];
                const lastMessageContent = lastMessage
                    ? `${lastMessage.sender?.id === user?.id ? 'Tu' : otherParticipant.username}: ${lastMessage.content}`
                    : 'No hay mensajes';

                return (
                    <Link key={chat.id} to={`/chats/${chat.id}`} className="block">
                        <div className="md:p-4 p-2 border-b hover:bg-gray-200 cursor-pointer flex items-center">
                            <img
                                src={otherParticipant.profile?.profile_picture || '/media/images/default/profile_picture.jpg'}
                                alt={otherParticipant.username}
                                className="w-10 h-10  rounded-full md:mr-4 mr-2"
                            />
                            <div className="flex-1 hidden md:flex">
                                <p className="font-semibold ">{otherParticipant.username}</p>
                                {/* <p className="text-sm text-gray-600">{lastMessageContent}</p> */}
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

export default ChatList;
