import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FILES_URL } from '../../utils/api';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../Layout';
import { updateUserProfile } from '../../store/actions/auth';

const EditProfilePage = (props) => {
    const { user_id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    // Check if user is authenticated and fetch data
    useEffect(() => {
        if (!user || user.id !== parseInt(user_id)) {
            navigate('/404'); // Redirect to a 404 page or any other appropriate route
        }
    }, [user, user_id, navigate]);

    // Initialize form fields
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [likesVisible, setLikesVisible] = useState(true);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(''); // Added state for image preview
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setUsername(user.username);
            setFirstName(user.first_name);
            setLastName(user.last_name);
            setBio(user.profile.bio);
            setProfilePicture(user.profile.profile_picture);
            setLikesVisible(user.profile.likes_visible);
        }
    }, [user]);

    useEffect(() => {
        if (image) {
            const objectUrl = URL.createObjectURL(image);
            setImagePreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl); // Clean up
        } else {
            setImagePreview(profilePicture ? `${FILES_URL}${profilePicture}` : '');
        }
    }, [image, profilePicture]);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('username', username);
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('bio', bio);
        formData.append('likes_visible', likesVisible);
        if (image) formData.append('profile_picture', image);

        try {
            await dispatch(updateUserProfile(formData));  // Usa la acción
            navigate(`/profile/${user_id}`);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout showPostIcon={false}>
            <div className="flex justify-center items-center h-full">
                <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-8">
                    <h2 className="text-2xl font-bold mb-6 text-center">Editar Perfil</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="username">
                                Nombre de usuario
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="first_name">
                                Nombre
                            </label>
                            <input
                                type="text"
                                id="first_name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="last_name">
                                Apellido
                            </label>
                            <input
                                type="text"
                                id="last_name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="bio">
                                Biografía
                            </label>
                            <textarea
                                id="bio"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                className="border border-gray-300 rounded-lg px-4 py-2 w-full resize-none"
                                style={{ height: 'auto' }}
                            />
                        </div>

                        <div className="col-span-1 md:col-span-2 mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2">
                                Foto de perfil
                            </label>
                            <div className="flex items-center">
                                <img
                                    src={imagePreview || '/default-profile.png'}
                                    alt="Profile"
                                    className="w-16 h-16 rounded-full object-cover mr-4"
                                />
                                <label className="cursor-pointer bg-purple-700 text-white px-4 py-2 rounded-lg">
                                    <input
                                        type="file"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                    Cargar imagen
                                </label>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2">
                                Visibilidad de Likes
                            </label>
                            <select
                                value={likesVisible}
                                onChange={(e) => setLikesVisible(e.target.value === 'true')}
                                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                            >
                                <option value={true}>Visibles</option>
                                <option value={false}>Ocultos</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-purple-700 text-white px-4 py-2 rounded-lg w-full col-span-1 md:col-span-2"
                        >
                            {loading ? 'Guardando...' : 'Guardar cambios'}
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default EditProfilePage;
