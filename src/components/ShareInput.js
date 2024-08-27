import { FILES_URL } from "../utils/api";
import { IoMdImages, IoMdCloseCircle } from "react-icons/io";
import { MdEmojiEmotions } from "react-icons/md";
import { useState, useEffect } from "react";

const ShareInput = ({ user, currentItem, setCurrentItem, label, submitText, handleSubmit, removeBorder = false, id = '', isComment = false }) => {
    const [files, setFiles] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const uniqueFiles = files.filter(file =>
            !currentItem.images.some(image => image.name === file.name)
        );

        if (uniqueFiles.length === 0) {
            alert("Imagen repetida");
            return;
        }

        if (isComment && uniqueFiles.length > 0) {
            setCurrentItem({
                ...currentItem,
                images: [uniqueFiles[0]], // Solo permite una imagen en comentarios
            });
        } else {
            setCurrentItem({
                ...currentItem,
                images: [...currentItem.images, ...uniqueFiles],
            });
        }
    };

    const handleRemoveImage = (index) => {
        const updatedImages = currentItem.images.filter((_, i) => i !== index);
        setCurrentItem({
            ...currentItem,
            images: updatedImages,
        });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Previene el comportamiento por defecto de Enter
            handleSubmit(e); // Ejecuta la función de submit
        }
    };

    return (
        <div className={`flex w-full flex-col p-2 rounded-lg ${removeBorder ? '' : 'shadow-md'} bg-white`}>
            <div className="flex border-b w-full p-1 items-center">
                <img
                    src={`${user.profile.profile_picture}`}
                    className="h-11 w-11 rounded-full"
                    alt={`Foto de perfil ${user.username} desde EJChat`}
                />
                <input
                    type="text"
                    className="text-gray-900 opacity-90 font-semibold p-2 outline-none border-0 w-full"
                    value={currentItem.content}
                    onChange={({ target }) => {
                        setCurrentItem({
                            ...currentItem,
                            content: target.value,
                        });
                    }}
                    onKeyDown={handleKeyDown} // Añade el manejador de eventos para Enter
                    placeholder={label}
                />
            </div>

            <div className="flex w-full justify-between flex-row items-end">
                <div className="flex-col">
                    <div className="flex mt-1 justify-start items-start self-start">
                        {currentItem.images.length > 0 && currentItem.images.map((file, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt={`Preview ${index}`}
                                    className="h-12 w-12 rounded-md mr-2"
                                />
                                <button
                                    className="absolute -top-1 right-0 bg-white rounded-full"
                                    onClick={() => handleRemoveImage(index)}
                                >
                                    <IoMdCloseCircle className="text-red-900" />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="flex w-full p-1 items-center gap-2 mt-2">
                        <button className="text-xl p-1 border-indigo-600 border rounded-md text-indigo-600 hover:bg-indigo-600 hover:cursor-pointer transition-colors hover:text-white">
                            <input
                                type="file"
                                multiple={!isComment} // Permitir múltiples archivos solo si no es un comentario
                                onChange={handleImageChange}
                                className="hidden"
                                id={`file-upload${id}`}
                            />
                            <label
                                htmlFor={`file-upload${id}`}
                                className="flex items-center justify-center text-xl p-0 border-indigo-600 rounded-md text-indigo-600 hover:bg-indigo-600 hover:cursor-pointer transition-colors hover:text-white h-5 w-5"
                            >
                                <IoMdImages />
                            </label>
                        </button>
                    </div>
                </div>

                <button className="text-white hover:bg-indigo-700 bg-indigo-600 px-3 py-1 rounded-full text-md" onClick={handleSubmit}>
                    {submitText}
                </button>
            </div>
        </div>
    );
};

export default ShareInput;
