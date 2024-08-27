import React, { useEffect, useState } from 'react';
import { searchUsers } from './../utils/profile/getUsers';
import { useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai'

const UserSearchComponent = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        try {
            const result = await searchUsers(query);
            setUsers(result);
            setError(null);
        } catch (err) {
            setError('No se encontraron usuarios.');
            setUsers([]);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    };

    useEffect(() => {
        if(query === ''){
            setUsers([]);
            setError(null);
        }
    }, [query]);

    return (
        <div className="relative w-full md:max-w-xs max-w-36 mx-auto">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Buscar usuarios..."
                className={`w-full pl-10 pr-4 py-2 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base`}
            />
            <button
                type="button"
                onClick={handleSearch}
                className="absolute left-0 top-0 m-0 px-2 text-gray-500 hover:text-gray-600 flex items-center justify-center h-full"
            >
                <AiOutlineSearch size={20} />
            </button>
            {users.length > 0 ? (
                <ul className="absolute bg-white shadow-md mt-1 w-full border border-gray-300 rounded-lg z-10 text-sm sm:text-base">
                    {users.map((user) => (
                        <button key={user.id} className="flex items-center p-2 border-b border-gray-200 hover:bg-gray-100 cursor-pointer w-full" onClick={(e) => {
                            e.preventDefault();
                            navigate(`/profile/${user.id}`, { replace: true });
                            setQuery('');
                        }}>
                            <img
                                src={user.profile.profile_picture}
                                alt={`${user.username}'s profile`}
                                className="w-8 h-8 rounded-full mr-2"
                            />
                            <span>{user.username}</span>
                        </button>
                    ))}
                </ul>
            ) : (
                error && query && (
                    <p className="absolute bg-white shadow-md mt-1 w-full border border-gray-300 rounded-lg z-10 text-center py-2 text-gray-600 text-sm sm:text-base">
                        No hay coincidencias
                    </p>
                )
            )}
        </div>
    );
};

export default UserSearchComponent;
