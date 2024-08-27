import { useState, useEffect } from "react";
import { FILES_URL } from "../../utils/api";
import { useSelector, useDispatch } from "react-redux";
import { formatDistance, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importar estilos CSS
import './carouselStyles.css';
import { FaHeart, FaRegHeart} from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { handleLike } from "../../utils/post/handleLike";
import ShareInput from "../ShareInput";
import { addComment } from "../../store/actions/post";
import { Link } from "react-router-dom";

function PostBox({ post, handleShowModal }){
    const { user } = useSelector(state => state.auth);
    const formattedDistance = formatDistance(parseISO(post.created_at), new Date(), { locale: es, addSuffix: true });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // estados locales
    const [ likes, setLikes ] = useState(() => post.likes);
    const [hasLiked, setHasLiked] = useState(() => post.likes.some(like => like.user === user.id));
    const [isLiking, setIsLiking] = useState(false); // Estado de carga

    const [ isCommenting, setIsCommenting ] = useState(() => false);
    const [ currentComment, setCurrentComment ] = useState({
        post_id: post.id,
        user_id: user.id,
        images: [],
        content: '',
    })
    const [ commentsCounter, setCommentsCounter ] = useState(() => post.comments.length);
    

    const handleLikeAction = async () => {
        if (isLiking) return; // Evitar múltiples solicitudes
        setIsLiking(true);
        await handleLike({ post, hasLiked });

        if(hasLiked){
            setLikes(likes.filter(like => like.user !== user.id));
        } else {
            setLikes([...likes, { user: user.id, post: post.id, created_at: new Date().toISOString() }]);
        }
        setHasLiked(prevState => !prevState);
        setIsLiking(false); // Finalizar el estado de carga
    };
    
    const handlePressCommentButton = () => {
        setIsCommenting(state => !state);
        setCurrentComment({
            ...currentComment,
            content: '',
            images: []
        })
    };
    
    const handleSubmitComment = async (values) => {
        const formData = new FormData();
        formData.append('user', values.user);
        formData.append('post', values.post);
        formData.append('content', values.content);

        if(values.images[0]){
            formData.append('image', values.images[0])
        }
    
        await dispatch(addComment(values));
        setCommentsCounter((state) => state + 1);
        handlePressCommentButton();
    }

    return <article key={post.id} className="p-2 bg-white shadow-md rounded-md pb-0">
        <header className="flex gap-1 items-center">
            <button className="relative" onClick={(e) => {
                e.preventDefault();
                navigate(`/profile/${post.user.id}`, { replace: true });
            }}>
                <img className="h-11 w-11 rounded-full" src={`${post.user.profile_picture} `} alt={`Foto de perfil de ${post.user.username}`}/>
                {post.user.is_active ? 
                <span className="h-2 w-2 rounded-full absolute right-0 bottom-0 bg-green-600"></span> 
                : <span className="h-2 w-2 rounded-full absolute right-0 bottom-0 border-gray-900 bg-gray-600 border"></span>}
            </button>
            <div className="flex flex-col px-2">
                <button className="flex" onClick={e => {
                    e.preventDefault();
                    navigate(`/profile/${post.user.id}`, { replace: true });
                }}>
                    <h5 className="font-semibold text-gray-900">
                        {post.user.username}
                    </h5>
                </button>
                <p className="text-gray-900 opacity-95 text-sm">
                    {formattedDistance}
                </p>
            </div>        
            <div className="flex flex-1 justify-end items-center">
                <button className="p-1">
                    <BsThreeDots
                        className="text-gray-900"
                    />
                </button>
            </div>
        </header>
        <div className={`${post.images.length > 0 ? 'px-0' : 'px-14'} py-2`}>
            <p className={`text-gray-900 font-semibold opacity-95 ${post.images.length > 0 ? 'px-14 pb-2' : null}`}>
                { post.content }
            </p>
            <button className="flex flex-col w-full" onClick={() => {
                handleShowModal(post);
                // navigate('/posts/images/' + post.id);
            }}>
                    {post.images.length === 1 ? (
                        <div className="relative h-96 w-96 overflow-hidden flex justify-center items-center m-auto rounded-xl max-w-full">
                            <img 
                                src={`${post.images[0].image}`} 
                                alt="Post image" 
                                className="h-full w-full object-cover" 
                            />
                        </div>
                    ) : <div className="grid grid-cols-2 gap-0">
                        {post.images.slice(0, 2).map((image, index) => (
                            <div key={index} className={`relative h-96 w-full overflow-hidden ${index == 0 ? 'rounded-l-xl' : 'rounded-r-xl'}`}>
                                <img 
                                    src={`${image.image}`} 
                                    alt={`Post image ${index + 1}`} 
                                    className="h-full w-full object-cover" 
                                />
                            </div>
                        ))}
                        </div>  
                    }
            </button>
        </div>

        <footer className=" border-gray-200 flex flex-col justify-between items-center text-gray-900 opacity-90 py-1 pt-3">
        <div className="flex flex-row justify-between items-center w-full px-2">
            <div className="flex flex-row items-center justify-start flex-1 gap-1">
                    <FaHeart 
                        className="text-purple-700"
                    />
                    <p>
                        {
                            `${likes.length}`
                        }   
                    </p>
                </div>
                <Link to={`/post/${post.id}`}>
                    <div className="">
                        {commentsCounter} comentario{commentsCounter !== 1 ? "s" : ''}
                    </div>
                </Link>
            </div>
            <div className="flex flex-row justify-between items-center w-full">
                <button className="border-r border-gray-400 flex flex-1 text-center items-center justify-center gap-2 p-2  hover:bg-slate-100" onClick={handleLikeAction}>
    {hasLiked ?                <FaHeart 
                        className="text-purple-700"
                    /> : <FaRegHeart 
                        className="text-purple-700"
                    />}
                    <p className={`font-semibold ${!hasLiked ?'text-gray-900' : 'text-purple-700'} transition-colors`}>
                        Me encanta
                    </p>
                </button>
                <button className="flex flex-1 text-center items-center justify-center gap-2 p-2  hover:bg-slate-100" onClick={handlePressCommentButton}>
                    <FaMessage 
                        className="text-indigo-800"
                    />
                    <p className=" font-semibold text-gray-900">
                        Comentar
                        {/* {
                            `${post.comments.length}` 
                        } */}
                    </p>
                </button>
            </div>
{isCommenting &&<ShareInput 
                user={user}
                currentItem={currentComment}
                setCurrentItem={setCurrentComment}
                label={'Comentar post'}
                submitText={'Enviar'}
                handleSubmit={(e) => {
                    e.preventDefault();
                    handleSubmitComment(currentComment);
                }}
                removeBorder
                id={`${post.id}${user.id}`}
                isComment={true}
            />}
        </footer>
        {/* <h3 className="font-bold">{post.user.username}</h3>
              <p>{post.content}</p>
              {post.images && post.images.map(image => (
                <img key={image.id} src={`${FILES_URL}/${image.image}`} alt="" className="w-full h-auto" />
              ))} */}
    </article>
};

export default PostBox;