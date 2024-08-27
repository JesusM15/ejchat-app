import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../Layout";
import { FILES_URL } from "../../utils/api";
import { getUserPost } from "../../utils/profile/getUserPost";
import PostBox from "../../components/PostElements/PostBox";
import Loader from "react-js-loader";
import { getUserData } from "../../utils/profile/getUserData";
import { handleFollowUser } from "../../utils/profile/handleFollowUser";
import ConfirmUnfollowModal from "../../components/utils/ConfirmUnfollowModal";
import FollowersFollowingModal from "../../components/utils/FollowersFollowingModal";
import { handleMessageClick } from "../../utils/messages/handleMessageClick";

function ProfilePage(){
    const user = useSelector((state) => state.auth.user);
    const [ userProfile, setUserProfile ] = useState(null);
    const [ userPost, setUserPost ] = useState(null);
    const [imagesModalVisible, setImagesModalVisible] = useState({
        show: false,
        post: {}
    });
    const [ isFollowing, setIsFollowing ] = useState(false);
    const [ areFriends, setAreFriends ] = useState(false);
    const [followersCount, setFollowersCount] = useState(0);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isFollowersFollowingModalOpen, setFollowersFollowingModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalUsers, setModalUsers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if(userProfile){
            setFollowersCount(userProfile.profile.followers_count);
        }
    }, [userProfile]);

    const handleButtonClick = () => {
        if (isFollowing) {
            setModalOpen(true);
        } 
    };

    const handleConfirmUnfollow = () => {
        handleFollowUser(userProfile, true);  // Dejar de seguir al usuario
        setModalOpen(false);
        setIsFollowing((isFollowingPrev) =>  !isFollowingPrev); // Actualiza el estado para reflejar el cambio en la interfaz de usuario
        setFollowersCount((prev) => prev - 1);
    };

    const handleShowModal = (post) => {
        setImagesModalVisible({
            ...imagesModalVisible,
            show: true,
            post: post
        });
    };

    const { user_id } = useParams();
    
    const getUserProfile = async (user_id) => {
        const data = await getUserData(user_id);
        setUserProfile(data)
    }

    const getPostFromUser = async (user_id) => {
        const data = await getUserPost(user_id);

        setUserPost(data);
    };

    useEffect(() => {
        if(user_id){
            getUserProfile(user_id);
            getPostFromUser(user_id);
        }
    }, [user_id]);

    const isHisOwnProfile = parseInt(user_id) === parseInt(user.id);

    useEffect(() => {
        if (userProfile && user) {
            // Verificar si el usuario está en la lista de seguidores
            const isFollowing = userProfile.profile.followers?.some(follower => follower.id === user.id);
            // Verificar si el usuario está en la lista de seguidos
            const isFollowingBack = userProfile.profile.following?.some(followingUser => followingUser.id === user.id);

            // Actualizar los estados
            setIsFollowing(isFollowing);
            setAreFriends(isFollowing && isFollowingBack);
        }
    }, [user_id, user, userProfile]);

    const handleOpenFollowersFollowingModal = (type) => {
        const users = type === "seguidores" ? userProfile.profile.followers : userProfile.profile.following;
        setModalTitle(type === "seguidores" ? "Seguidores" : "Siguiendo");
        setModalUsers(users);
        setFollowersFollowingModalOpen(true);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        const id = await handleMessageClick(userProfile)
        if(id){
            navigate(`/chats/${id}`, { replace: true });
        }
    }

    if(!userProfile) return <Loader type="spinner-default" />

    return (
        <Layout imagesModalVisible={imagesModalVisible} setModalVisible={setImagesModalVisible}>
                <ConfirmUnfollowModal
                    areFriends={areFriends} 
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    onConfirm={handleConfirmUnfollow}
                    user={userProfile}
                />

                {/* Followers/Following Modal */}
                <FollowersFollowingModal
                    isOpen={isFollowersFollowingModalOpen}
                    onClose={() => setFollowersFollowingModalOpen(false)}
                    title={modalTitle}
                    users={modalUsers}
                />
                <section className="flex flex-col md:flex-row p-4 md:w-3/4 lg:w-2/3 mx-auto">
                    {/* Profile Picture and User Info */}
                    <div className="flex-shrink-0 w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden border-2 border-gray-300">
                        <img src={`${userProfile.profile.profile_picture}`} alt={`${userProfile.username}'s profile`} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="ml-4 md:ml-8 flex flex-col justify-start flex-grow">
                        {/* User Info */}
                        <div className="text-left flex gap-4 md:flex-row flex-col">
                            <h1 className="text-2xl font-normal">{userProfile.username}</h1>

                            {/* Buttons and Actions */}
                            <div className="flex gap-4">
                                {isHisOwnProfile ? (
                                    <button 
                                        onClick={e => {
                                            e.preventDefault();
                                            navigate(`/profile/edit/${user.id}`, { replace: true })
                                        }}
                                        className="font-semibold border border-purple-700 transition-colors hover:bg-purple-700 hover:text-white text-purple-900 px-4 py-1 rounded"
                                    >
                                            Editar perfil
                                    </button>
                                ) : (
                                    !isFollowing ? (
                                    <button 
                                        onClick={async (e) => {
                                            e.preventDefault();
                                            await handleFollowUser(userProfile, isFollowing);
                                            setIsFollowing((isFollowingPrev) =>  !isFollowingPrev); // Actualiza el estado para reflejar el cambio en la interfaz de usuario
                                            setFollowersCount((prev) => prev + 1);

                                        }}
                                        className="font-semibold border border-purple-700 transition-colors hover:bg-purple-700 hover:text-white text-purple-900 px-4 py-1 rounded">
                                        {userProfile.following?.some(followingUser => followingUser.id === user.id) ? 'Seguir de regreso' : 'Seguir'}
                                    </button>
                                    ):(
                                        <button 
                                            onClick={handleButtonClick}
                                            className="font-semibold border border-purple-700 transition-colors hover:bg-purple-700 hover:text-white text-purple-900 px-4 py-1 rounded">
                                            Siguiendo
                                        </button>   
                                    )
                                )}
{!isHisOwnProfile &&                                    <button
                                        onClick={handleSendMessage}
                                        className="font-semibold border hover:border-purple-700 transition-colors bg-purple-700 text-white hover:text-purple-900 px-4 py-1 rounded hover:bg-white"
                                    >
                                        Enviar Mensaje
                                    </button>}
                            </div>
                        </div>

                        <article className="flex gap-4 mt-4 md:flex-row flex-col">
                            <button className="flex gap-1 ">
                                <b className="text-purple-900">{userPost && userPost?.length}</b>
                                <p>
                                    {userPost?.length == 1 ? 'publicación' : 'publicaciones'}
                                </p>
                            </button>
                            <div className="flex gap-4">
                                <button className="flex gap-1" onClick={() => handleOpenFollowersFollowingModal("seguidores")}>
                                    <b className="text-purple-900">{followersCount}</b>
                                    <p>
                                        seguidor{followersCount === 1 ? '': 'es'}
                                    </p>
                                </button>
                                <button className="flex gap-1" onClick={() => handleOpenFollowersFollowingModal("siguiendo")}>
                                    <b className="text-purple-900">{userProfile.profile.following_count}</b>
                                    <p>
                                        seguido{userProfile.profile.following_count === 1 ? '' : 's'}
                                    </p>
                                </button>
                            </div>
                        </article>

                        <article className="mt-3">
                            {!userProfile.profile.bio && <p className="mt-2 text-gray-600">
                                ...
                            </p>}
                            {userProfile.profile.bio && <p className="mt-2 text-gray-600">{userProfile.profile.bio}</p>}
                        </article>


                    </div>
                </section>

                {/* User Posts */}
                <section className="container mx-auto p-4 sm:w-11/12 md:w-9/12 lg:w-7/12 xl:w-5/12 max-w-screen-lg h-full relative">                    
                    {userPost?.length > 0 ? <h2 className="text-lg font-semibold mb-4">Publicaciones</h2> : <h2 className="text-lg font-semibold mb-4"> No hay publicaciones</h2>}
                        {userPost && <section className="flex gap-4 flex-col mt-2">
                            {
                                userPost?.map(post => (
                                    <PostBox 
                                        post={post}
                                        handleShowModal={handleShowModal}
                                        key={post.id} // Usa un valor único como 'postItem.id'
                                    />
                                ))
                            }
                        </section>
                        }
                </section>
        </Layout>
    );
};

export default ProfilePage;