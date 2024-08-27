import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import Layout from "../Layout";
import { getPost } from "../../utils/post/getPost";
import Loader from "react-js-loader";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./DetailPost.css";  // Archivo CSS personalizado
import { FILES_URL } from "../../utils/api";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { formatDistance, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { handleLike } from "../../utils/post/handleLike";
import ShareInput from "../../components/ShareInput";
import PostBox from "../../components/PostElements/PostBox";
import { CommentBox } from "../../components/PostElements/CommentBox";
const url = process.env.REACT_APP_SOCKET_API_BASE_URL;

function DetailPost() {
    const user = useSelector((state) => state.auth.user);
    const { id: post_id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const [ comments, setComments ] = useState([]);

    useEffect(() => {
        if (!post_id) return;
        const socket = new WebSocket(`wss://ejchat-api.onrender.com/ws/comments/${parseInt(post_id)}/`);
    
        socket.onopen = () => {
          console.log('Connected to WebSocket');
        };
    
        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          setComments(prevComments => [data.comment, ...prevComments]);
        };
    
        socket.onclose = () => {
          console.log('Disconnected from WebSocket');
        };
    
        return () => {
          socket.close();
        };
    }, [post_id]);    

    const [ likes, setLikes ] = useState(null);
    const [ hasLiked, setHasLiked ] = useState(null);
    const [ isLiking, setIsLiking ] = useState(false); // Estado de carga

    const fetchPost = async (post_id) => {
        setLoading(true);
        const data = await getPost(post_id);
        setPost(data);
        setLoading(false);
    }

    useEffect(() => {
        fetchPost(post_id);
    }, [post_id]);

    useEffect(() => {
        if (post) {
            setLikes(post.likes);
            setHasLiked(post.likes.some(like => like.user === user.id));
            setComments(post.comments.reverse());
        }
    }, [post]);

    const [imagesModalVisible, setImagesModalVisible] = useState({
        show: false,
        post: {}
    });

    const handleShowModal = (post) => {
        setImagesModalVisible({
            ...imagesModalVisible,
            show: true,
            post: post
        });
    };

    // const handleLikeAction = async () => {
    //     if(post){
    //         if (isLiking) return; // Evitar múltiples solicitudes
    //         setIsLiking(true);
    //         await handleLike({ post, hasLiked });
    
    //         if(hasLiked){
    //             setLikes(likes?.filter(like => like.user !== user.id));
    //         } else {
    //             setLikes([...likes, { user: user.id, post: post.id, created_at: new Date().toISOString() }]);
    //         }
    //         setHasLiked(prevState => !prevState);
    //         setIsLiking(false); // Finalizar el estado de carga
    //     }
    // };
    

    if (loading) {
        return <Loader type="spinner-default" />;
    }

    // Configuración del slider
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        arrows: true,
        nextArrow: <div className="slick-next" />,
        prevArrow: <div className="slick-prev" />,
    };

    return (
        <Layout showAddPostIcon imagesModalVisible={imagesModalVisible} setModalVisible={setImagesModalVisible}>
        <div className="container mx-auto p-4 sm:w-11/12 md:w-9/12 lg:w-7/12 xl:w-5/12 max-w-screen-lg h-full relative">

          {/* Aquí se mostrarán los posts de las personas que sigues */}
            {loading && <Loader type="spinner-default" />}
            {!loading && <section className="flex gap-4 flex-col mt-2">
            {post && <PostBox post={post} key={post.id} handleShowModal={handleShowModal} />}
            </section>}

            {
                post && comments.length > 0 && <section className="bg-white w-full p-2 mt-1 rounded-md shadow-md max-h-500 overflow-y-scroll">
                         {comments?.map((comment, index) => { 
                                
                                return (
                                    <CommentBox 
                                        comment={comment}
                                        key={index}
                                        author={post.user.id}
                                    />
                        )})}
                </section>
            }
        </div>
        
      </Layout>
    );
};

export default DetailPost;
