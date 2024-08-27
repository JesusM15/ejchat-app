import { useState, useEffect } from "react";
import Input from "../components/Input";
import logo from './../icono.png'
import { connect, useSelector } from 'react-redux';
import { register, login } from "../store/actions/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { emptyFields } from "../utils/validate";

function RegisterPage({ register, login }){
    const [ currentItem, setCurrentItem ] = useState({
        username: '',
        password: '',
        password2: '',
        email: '',
        first_name: '',
        last_name: '',
    })
    const [ invalidFields, setInvalidFields ] = useState(() => [])
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault(); // Previene la recarga del formulario
        const fieldsEmpty = emptyFields(currentItem);
        let valid = true;

        setInvalidFields(fieldsEmpty.emptyFields);
        if(fieldsEmpty.length > 0){
            valid = false;
        }

        if(!currentItem.email.includes('@') || !currentItem.email.includes('.')){
            valid = false;
            alert("El email tiene que ser valido.");
            if(!invalidFields.includes('email')){
                setInvalidFields([...invalidFields, 'email']);
            }
        }

        
        if(currentItem.password !== currentItem.password2){
            alert("Las contraseñas no coinciden!");
            valid = false;
            if(!invalidFields.includes('password')){
                setInvalidFields([...invalidFields, 'password']);
            }
            if(!invalidFields.includes('password2')){
                setInvalidFields([...invalidFields, 'password2']);
            }
        }

        if(valid){
            const result = await register(currentItem);

            if(result.username){
                navigate('/login');
            }
        }
        
    }

    return (
        <section className={`flex items-center justify-center h-screen`}>
            <form className="shadow-lg rounded-md p-4 flex gap-4 flex-col w-96 h-96 ">
                <div className="flex flex-row justify-between flex-1">
                    <h2 className="text-gray-900 font-semibold text-xl mb-2">
                        Registrarse
                    </h2>
                    <img 
                        className="w-7 h-7"
                        src={logo}
                    />
                </div>
                {
                    invalidFields.length > 0 && <p className="text-sm text-red-600">
                        *Algunos campos obligatorios no estan llenos
                    </p>
                }
                <div className="flex gap-4 flex-col flex-1">
                    <div className="flex flex-row gap-2">
                        <Input 
                            label="Usuario"
                            type="text"
                            invalid={ invalidFields.find((it) => it === 'username') }
                            value={currentItem.username}
                            onChange={(e) => setCurrentItem({
                                ...currentItem,
                                username: e.target.value
                            })}
                        />
                        <Input 
                            label="Email"
                            type="email"
                            invalid={ invalidFields.find((it) => it === 'email') }
                            onChange={(e) => setCurrentItem({
                                ...currentItem,
                                email: e.target.value
                            })}
                            value={currentItem.email}
                        />  
                    </div>

                    <div className="flex flex-row gap-2">
                        <Input 
                            label="Contraseña"
                            type="password"
                            invalid={ invalidFields.find((it) => it === 'password') }
                            value={currentItem.password}
                            onChange={(e) => setCurrentItem({
                                ...currentItem,
                                password: e.target.value
                            })}
                        />
                        <Input 
                            label="Repetir contraseña"
                            type="password"
                            invalid={ invalidFields.find((it) => it === 'password2') }
                            onChange={(e) => setCurrentItem({
                                ...currentItem,
                                password2: e.target.value
                            })}
                            value={currentItem.password2}
                        />  
                    </div>

                    <div className="flex flex-row gap-2">
                        <Input 
                            label="Nombre(s)"
                            type="text"
                            invalid={ invalidFields.find((it) => it === 'first_name') }
                            value={currentItem.first_name}
                            onChange={(e) => setCurrentItem({
                                ...currentItem,
                                first_name: e.target.value
                            })}
                        />
                        <Input 
                            label="Apellidos"
                            type="text"
                            invalid={ invalidFields.find((it) => it === 'last_name') }
                            onChange={(e) => setCurrentItem({
                                ...currentItem,
                                last_name: e.target.value
                            })}
                            value={currentItem.last_name}
                        />  
                    </div>
    
                </div>
                <div className="mt-1 flex-1">
                    <p className="text-sm font-semibold text-gray-800">
                       Ya tienes cuenta?  
                        <Link to='/login'>
                            <span className="hover:text-purple-800 text-blue-600 transition-colors hover:cursor-pointer"> Inicia sesi&oacute;n aqu&iacute;</span>
                        </Link>
                    </p>
                </div>
                <button className="font-semibold text-md px-4 py-2 border-indigo-600 border mt-1 text-white bg-indigo-600 hover:bg-indigo-700 transition-colors" 
                onClick={handleRegister}
                >
                    Registrarse
                </button>
            </form>
        </section>
    );
};

export default connect(null, { register, login })(RegisterPage);