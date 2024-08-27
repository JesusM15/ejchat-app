import { useState, useEffect } from "react";
import Input from "../components/Input";
import logo from './../icono.png'
import { connect, useSelector } from 'react-redux';
import { login } from "../store/actions/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login({ login }){
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ invalidCredentials, setInvalidCredentials ] = useState(() => null);
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);

    const handleLogin = async (e) => {
        e.preventDefault(); // Previene la recarga del formulario
        const result = await login(email, password);
        if(result?.status === 401 || result?.status === '401'){
            setInvalidCredentials(true);
        }else{
            setInvalidCredentials(false);
        }
    }

    return (
        <section className={`flex items-center justify-center h-screen`}>
            <form className="shadow-lg rounded-md p-4 flex gap-4 flex-col w-96 h-96 ">
                <div className="flex flex-row justify-between flex-1">
                    <h2 className="text-gray-900 font-semibold text-xl mb-2">
                        Iniciar sesi&oacute;n
                    </h2>
                    <img 
                        className="w-7 h-7"
                        src={logo}
                    />
                </div>
                {
                    invalidCredentials && <p className="text-red-600 text-sm">
                        *El Email o la contraseña es incorrecta.
                    </p>
                }
                <div className="flex gap-4 flex-col flex-1">
                    <Input 
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input 
                        label="Contraseña"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />  
                </div>
                <div className="mt-1 flex-1">
                    <p className="text-sm font-semibold text-gray-800">
                       A&uacute;n no tienes una cuenta? <Link to='/register'>
                       <span className="hover:text-purple-800 text-blue-600 transition-colors hover:cursor-pointer">Registrate aqu&iacute;</span>
                       </Link>
                    </p>
                </div>
                <button className="font-semibold text-md px-4 py-2 border-indigo-600 border mt-1 text-white bg-indigo-600 hover:bg-indigo-700 transition-colors" 
                onClick={handleLogin}
                >
                    Iniciar sesi&oacute;n
                </button>
            </form>
        </section>
    );
};

export default connect(null, { login })(Login);