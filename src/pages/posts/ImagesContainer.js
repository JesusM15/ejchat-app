import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "react-js-loader";
import Slider from "react-slick"; // Importa Slider de react-slick
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { MdClose } from 'react-icons/md';

import { FILES_URL } from "../../utils/api";

function ImagesContainer({ post, setModalVisible }) {
    const navigate = useNavigate();

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: false,
        autoplaySpeed: 3000,
    };
    

    const handleClose = () => {
        // Aquí puedes definir la lógica para cerrar el modal o el slider
        setModalVisible({
            post: {},
            show: false,
        });
        document.body.style.overflow = '';
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
    }, [post])

    return (
        <div className="h-screen w-full bg-black flex justify-center items-center fixed z-50 opacity-100">
            {post?.images && post.images.length > 0 && (
                <div className="w-full max-w-screen-xl ">
                    <Slider {...settings}>
                        {post.images.map((image, index) => (
                            <div key={index} className="flex justify-center items-center h-full w-full">
                                <img
                                    src={`${image.image}`}
                                    alt={`Slide ${index}`}
                                    className="object-contain w-full h-full" // Ajusta la altura según sea necesario
                                    style={{ maxHeight: '80vh', height: '80vh' }} // Limita la altura máxima al 80% del viewport height
                                    />
                            </div>
                        ))}
                    </Slider>
                </div>
            )}

                    <button 
                        onClick={handleClose}
                        className="absolute top-4 right-4 text-white text-3xl p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-colors"
                    >
                        <MdClose />
                    </button>
        </div>
    );
}

export default ImagesContainer;
