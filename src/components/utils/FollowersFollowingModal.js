import React from "react";
import { FILES_URL } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const FollowersFollowingModal = ({ isOpen, onClose, title, users }) => {
    const navigate = useNavigate();
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto relative">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        &times;
                    </button>
                </div>

                {/* Body */}
                <div className="p-4 overflow-y-auto max-h-96">
                    {users.length > 0 ? (
                        <ul className="list-none p-0">
                            {users.map((user) => (
                                <li key={user.id} className="flex items-center gap-4 mb-4 cursor-pointer" onClick={() => {
                                    navigate(`/profile/${user.id}`, { replace: true });
                                    onClose();
                                }}>
                                    <img
                                        src={`${user.profile.profile_picture}` || '/default-profile.png'}
                                        alt={user.username}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold">{user.username}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Este usuario {title === 'Seguidores' ? 'no tiene seguidores' : 'no sigue a nadie'}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FollowersFollowingModal;
