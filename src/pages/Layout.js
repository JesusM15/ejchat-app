// src/components/Layout.js
import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { FaPlus } from "react-icons/fa6";

import ImagesContainer from './posts/ImagesContainer';

const Layout = ({ children, showPostIcon, imagesModalVisible, setModalVisible }) => {

  return (
    <div className=' bg-white min-h-screen'>
      {imagesModalVisible && imagesModalVisible?.show && <ImagesContainer 
        post={imagesModalVisible?.post}
        setModalVisible={setModalVisible}
      />}
      <Navbar />
      <main className="relative">{children}</main>
      {/* <Footer /> */}
     {/* {showPostIcon ?? <div className="fixed bottom-2 right-4 h-10 w-10 rounded-full shadow-xl p-1 flex justify-center items-center border">
          <FaPlus 
            className="text-indigo-600"
          />
      </div>} */}
    </div>
  );
}

export default Layout;
