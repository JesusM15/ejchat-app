import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import { Provider } from 'react-redux';
import configureStore from './store/';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from './store/actions/auth';
import Loader from "react-js-loader";
import RegisterPage from './pages/RegisterPage';
import CreatePost from './pages/posts/CreatePost';
import ImagesContainer from './pages/posts/ImagesContainer';
import DetailPost from './pages/posts/DetailPost';
import ProfilePage from './pages/profile/ProfilePage';
import EditProfilePage from './pages/profile/EditProfilePage';
import ChatPage from './pages/chats/ChatPage';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}

function AppRoutes() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const userIsAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [loading, setLoading] = useState(true); // Estado para controlar el loader
  const color = 'rgb(99, 102, 241)'

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(loadUser())
        .then(() => setLoading(false)) // Una vez cargado el usuario, detener el loader
        .catch(() => setLoading(false)); // Manejar cualquier error
    } else {
      setLoading(false); // Si no hay token, detener el loader
    }
  }, [dispatch]);

  if (loading) {
    return <div className='justify-center items-center h-screen w-full flex'>
        <Loader type="spinner-default" bgColor={color} color={'rgb(58, 61, 239)'} size={50} />
      </div>
  }

  return (
      <Router>
        <Routes>
        {
          userIsAuthenticated && user ? (
            <>
              <Route path="/" element={<HomePage />} />  
              <Route path="/post/:id" element={<DetailPost />} />

              <Route path="/profile/:user_id" element={<ProfilePage />} />
              <Route path="/profile/edit/:user_id" element={<EditProfilePage />} />

              {/* <Route path="/posts/images/:post_id"  element={<ImagesContainer />} /> */}
              <Route path="/login" element={<Navigate to="/" />} />     
              <Route path="/register" element={<Navigate to="/" />} />   

              <Route path="/chats" element={<ChatPage />} />
              <Route path="/chats/:chatId" element={<ChatPage />} />
              {/* <Route path="*" element={<Navigate to="/" />} /> */}
            </>
          ): (
            <>
              <Route path="/login" element={ <Login /> } />      
              <Route path="/register" element={ <RegisterPage /> }/> 
              <Route path="*" element={<Navigate to="/login" />} />     
            </>
            
          )
        }          


        </Routes>
      </Router>
  );
}

export default App;
