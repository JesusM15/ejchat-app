import React, { useEffect, useState, useRef, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createMessage, getMessages } from '../../store/actions/message'; // Asegúrate de que la ruta sea correcta
import ShareInput from '../../components/ShareInput';
import Loader from "react-js-loader";

const ChatMessages = memo(({ chat, newMessage }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.auth.user);
    const [currentMessage, setCurrentMessage] = useState({
        sender: user.id,
        content: '',
        images: [],
        chat_room: chat.id
    });
    const messagesEndRef = useRef(null);
    const chatContainerRef = useRef(null);

    // Encuentra el otro participante en el chat
    const otherParticipant = chat?.participant1?.id === user?.id ? chat?.participant2 : chat?.participant1;

    useEffect(() => {
        // Fetch mensajes cuando el chat cambie
        const fetchMessages = async () => {
            setLoading(true);
            const data = await dispatch(getMessages(chat.id));
            setMessages(data);
            setLoading(false);
        };
        fetchMessages();
    }, [chat, dispatch]);

    useEffect(() => {
        // Comprueba si el contenedor del chat está al final
        const isScrolledToBottom = chatContainerRef.current.scrollHeight - chatContainerRef.current.clientHeight <= chatContainerRef.current.scrollTop + 1;
        if (isScrolledToBottom) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages, newMessage]);

    useEffect(() => {
        // Espera un poco para que el contenedor y los mensajes se rendericen antes de ajustar el scroll
        if (chatContainerRef.current) {
            setTimeout(() => {
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }, 0); // Retraso mínimo para asegurar que el DOM esté renderizado
        }
    }, [chat ,messages]); // Se ejecuta cuando cambia el chat o los mensajes
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('sender', user.id);
        formData.append('content', currentMessage.content);
        currentMessage.images.forEach(image => {
            formData.append('images', image);
        });

        await dispatch(createMessage(chat, currentMessage));
        setCurrentMessage({
            sender: user.id,
            content: '',
            images: [],
            chat_room: chat.id
        });
    };

    useEffect(() => {
        setCurrentMessage(prev => ({
            ...prev,
            chat_room: chat.id
        }));
    }, [chat]);
    
    useEffect(() => {
        if(newMessage){
            setMessages(prevMessages => [newMessage, ...prevMessages]);
        }
    }, [newMessage]);

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)]">
            {/* Pestaña superior con información del chat */}
            <div className="flex items-center md:p-4 p-2 border-b border-gray-300 bg-white">
                <button className='flex items-center' onClick={(e) => {
                    e.preventDefault();
                    navigate(`/profile/${otherParticipant.id}`, { replace: true })
                }}>
                    <img
                        src={otherParticipant?.profile?.profile_picture || '/media/images/default/profile_picture.jpg'} // Imagen por defecto
                        alt={`${otherParticipant?.username} profile`}
                        className="md:h-11 md:w-11 w-10 h-10 rounded-full mr-3"
                    />
                    <div className="flex-1">
                        <p className="font-semibold">{otherParticipant?.username}</p>
                    </div>
                    <div className="text-gray-500">
                        <i className="fas fa-info-circle"></i> {/* Icono de información */}
                    </div>
                </button>
            </div>

            {/* Contenedor de mensajes */}
            <div
                className="flex-1 overflow-y-auto p-4 bg-gray-50"
                ref={chatContainerRef} // Asigna la referencia al contenedor
            >
                {loading && (
                    <div className="flex justify-center items-center h-full">
                        <Loader type="spinner-default" />
                    </div>
                )}
                <div className="flex flex-col-reverse space-y-4 gap-4">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex items-end ${msg.sender.id === user.id ? 'justify-end' : 'justify-start'} space-x-2`}
                        >
                            {msg.sender.id !== user.id && (
                                <img
                                    src={msg.sender?.profile?.profile_picture || '/media/images/default/profile_picture.jpg'}
                                    alt={`${msg.sender?.username} profile`}
                                    className="h-8 w-8 rounded-full"
                                />
                            )}
                            <div className={`flex flex-col max-w-[50%] ${msg.sender.id === user.id ? 'items-end' : 'items-start'}`}>
                                <div className={`p-2 rounded-lg ${msg.sender.id === user.id ? 'bg-purple-700 text-white' : 'bg-gray-300 text-gray-700'}`}>
                                    <p className="whitespace-pre-wrap md:text-md text-sm">{msg.content}</p>
                                </div>
                                {msg.images && msg.images.length > 0 && (
                                    <div className="flex space-x-2 mt-2">
                                        {msg.images.map((img, idx) => (
                                            <img
                                                key={idx}
                                                src={img.image}  // Suponiendo que `img.image` es la URL de la imagen
                                                alt={`Image ${idx}`}
                                                className="md:h-44 md:w-64 h-40 w-60 object-cover rounded-md"
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                            {msg.sender.id === user.id && (
                                <img
                                    src={msg.sender.profile?.profile_picture || '/media/images/default/profile_picture.jpg'}
                                    alt={`${msg.sender.username} profile`}
                                    className="h-8 w-8 rounded-full"
                                />
                            )}
                        </div>
                    ))}
                    <div ref={messagesEndRef} /> {/* Elemento de referencia para desplazamiento */}
                </div>
            </div>

            {/* Contenedor del input */}
            <div className="p-4 border-t border-gray-300 bg-white">
                <ShareInput
                    removeBorder
                    id={`${user.id}${chat.id}`}
                    user={user}
                    currentItem={currentMessage}
                    setCurrentItem={setCurrentMessage}
                    label="Escribe un mensaje..."
                    submitText="Enviar"
                    handleSubmit={handleSubmit}
                    isComment={true}
                />
            </div>
        </div>
    );
});

export default ChatMessages;
