import Layout from "./Layout";
import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "react-js-loader";
import { FILES_URL } from "../utils/api";
import { getPosts, addPost } from "../store/actions/post";
import _ from 'lodash';

import ShareInput from "./../components/ShareInput";
import PostBox from "../components/PostElements/PostBox";

const HomePage = () => {
  // obtener usuario
  const user = useSelector((state) => state.auth.user);
  const { posts, page, loading} = useSelector((state) => state.posts);

  //estados locales
  const [ modalUploadImagesOpen, setModalUploadImagesOpen ] = useState(() => false);
  const [ currentItemPost, setCurrentItemPost ] = useState({
    user: user.id,
    content: '',
    images: [],
  });
  const [ imagesModalVisible, setImagesModalVisible ] = useState({
    show: false,
    post: {}
  });
  const dispatch = useDispatch();
  const [ pageIsLoading, setPageIsLoading ] = useState(false);
  
  const handleCreatePost = async (values) => {
    const formData = new FormData();
    formData.append('user', values.user);
    formData.append('content', values.content);
    values.images.forEach(image => {
        formData.append('images', image); // Asegúrate de que sea la referencia al archivo
    });

    await dispatch(addPost(values));
    componentDidMount();
    setCurrentItemPost({
      user: user.id,
      content: '',
      images: [],
    })
  };

  const componentDidMount = async () => {
    setPageIsLoading(true)
    await dispatch(getPosts(page));
    setPageIsLoading(false);
  }

  useEffect(() => {
    componentDidMount()
  }, [])

  useEffect(() => {

    const handleScroll = _.throttle(async() => {

      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || pageIsLoading || loading) {

        return;

      }

      if(posts.length >= 10*page){
        setPageIsLoading(true)
        await dispatch(getPosts(page + 1));
        setPageIsLoading(false);
      }

    }, 300);

  

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);

  }, [pageIsLoading, loading]);

  const handleShowModal = ( post ) => {
    setImagesModalVisible({
      ...imagesModalVisible,
      show: true,
      post: post
    });
  };

  return (
    <Layout showAddPostIcon={false} imagesModalVisible={imagesModalVisible} setModalVisible={setImagesModalVisible}>
      <div className="container mx-auto p-4 sm:w-11/12 md:w-9/12 lg:w-7/12 xl:w-5/12 max-w-screen-lg h-full relative">
        <ShareInput 
            currentItem={currentItemPost}
            setCurrentItem={setCurrentItemPost}
            user={user}
            label={"Comparte algo..."}
            submitText={'Publicar'}
            handleSubmit={(e) => {
              e.preventDefault();
              handleCreatePost(currentItemPost);
            }}
          />

        {/* Aquí se mostrarán los posts de las personas que sigues */}
          {loading && <Loader type="spinner-default" />}
          {!loading && <section className="flex gap-4 flex-col mt-2">
            {
              posts.map(post => (
                <PostBox post={post} key={post.id} handleShowModal={handleShowModal} />
              ))
            }
          </section>}
      </div>
      
    </Layout>
  );
};

export default HomePage;