import { IoNotifications, IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import { AiFillMessage } from "react-icons/ai";
import icono from './../../icono.png';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FILES_URL } from "../../utils/api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UserSearchComponent from "../UserSearchComponent";

function Navbar(){
    const [ profileButtonInfo, setProfileButtonInfo ] = useState(() => false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user); 
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({
            type: 'LOGOUT'
        })
    }

    return (
        <nav className={` flex flex-1 h-16 bg-white border-b-2 justify-between flex-row w-full p-2 px-4 items-center shadow-sm`}>
            <div className="flex items-center flex-1  gap-1">
                <button className="w-12 md:w-12" onClick={(e) => {
                    e.preventDefault();
                    navigate(`/`, { replace: true });
                }}>
                    <img        
                        className="h-9 md:h-12"
                        src={icono}
                        alt="Logo"
                    />
                </button>
                <div className="w-auto m-0">
                    <UserSearchComponent />
                </div>
            </div>


            <ul className="flex flex-row md:gap-3 items-center gap-2">
                <button onClick={(e) => {
                    e.preventDefault();
                    navigate(`/chats/`, { replace: true });
                }}>
                    <li className="text-xl text-white rounded-full bg-indigo-500 p-2 hover:cursor-pointer hover:bg-indigo-600 transition-colors ">
                        <AiFillMessage />
                    </li>
                </button>
                {/* <li className="text-xl text-white rounded-full bg-indigo-500 p-2 hover:cursor-pointer hover:bg-indigo-600 transition-colors">
                    <IoNotifications />
                </li> */}
                <button onClick={() => {
                    setProfileButtonInfo((state) => !state);
                }}>
                    <li className="text-xl text-white rounded-full shadow-lg hover:cursor-pointer">
                        {console.log(user.profile)}
                        <img 
                            className="h-9 w-9 rounded-full"
                            src={user.profile.profile_picture}
                            alt="pp"
                        />
                        {profileButtonInfo && (
                            <div className="absolute right-0 mt-3 w-48 bg-white shadow-md border rounded-lg z-10">
                                <ul className="p-2 text-sm font-semibold flex flex-col gap-2">
                                    <button onClick={(e) => { 
                                        e.preventDefault();
                                        navigate(`/profile/${user.id}`, { replace: true })
                                        
                                        }}>
                                    <li className="flex items-center gap-2 p-1 hover:bg-gray-100">
                                            <img 
                                                className="h-8 w-8"
                                                src={`${user.profile.profile_picture}`}
                                                alt="pp"
                                            />
                                            <span className="text-gray-800">
                                                {user.username}
                                            </span>
                                    </li>
                                    </button>
                                    {/* <li className="flex items-center gap-2 p-1 hover:bg-gray-100">
                                        <IoSettingsOutline 
                                            color="black"
                                        />
                                        <span className="text-gray-800">Soporte t&eacute;cnico</span>
                                    </li> */}
                                    <button onClick={handleLogout}>
                                        <li className="flex items-center gap-2 p-1 hover:bg-gray-100">
                                            <IoLogOutOutline 
                                                color="black"
                                            />
                                            <span className="text-gray-800">Cerrar sesión</span>
                                        </li>
                                    </button>
                                </ul>
                            </div>
                        )}
                    </li>
                </button>
            </ul>
        </nav>
    )
};

export default Navbar;