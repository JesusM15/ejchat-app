import React from 'react';
import { FILES_URL } from '../../utils/api';

const ConfirmUnfollowModal = ({ isOpen, onClose, onConfirm, user, areFriends }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
                {/* Icono de cierre en la esquina superior derecha */}
                <button 
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-6 w-6" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M6 18L18 6M6 6l12 12" 
                        />
                    </svg>
                </button>
                
                <div className="flex items-center mb-4">
                    <img
                        src={`${FILES_URL}${user.profile.profile_picture}` || '/default-profile.png'}
                        alt={user.username}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                        <h2 className="text-lg font-semibold">{user.username}</h2>
                        <p className="text-gray-600">{user.name}</p>
                    </div>
                </div>
               {areFriends && <p className="mb-4 text-center">Tu y este usuario se siguen mutuamente</p>}
                <div className="flex">
                    <button 
                        className="bg-gray-100 border border-gray-300 text-gray-800 px-4 py-2 rounded w-full hover:bg-gray-200"
                        onClick={onConfirm}
                    >
                        Dejar de seguir
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmUnfollowModal;
