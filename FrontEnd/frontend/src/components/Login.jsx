import React from 'react';
import { useForm } from 'react-hook-form';
import './Login.css'; // Asegúrate de crear este archivo CSS para estilizar el formulario

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);

    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm">
                    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>

                        <div className="form-group">
                            <label htmlFor="email">Correo Electrónico:</label>
                            <input
                                type="email"
                                id="email"
                                {...register('email', { required: 'El correo es obligatorio' })}
                            />
                            {errors.email && <p className="error">{errors.email.message}</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="dni">DNI:</label>
                            <input
                                type="number"
                                id="dni"
                                {...register('dni', { required: 'El DNI es obligatorio' })}
                            />
                            {errors.dni && <p className="error">{errors.dni.message}</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Contraseña:</label>
                            <input
                                type="password"
                                id="password"
                                {...register('password', { required: 'La contraseña es obligatoria' })}
                            />
                            {errors.password && <p className="error">{errors.password.message}</p>}
                        </div>

                        <button type="submit" className='button-inicio'>Iniciar sesion</button>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default Login;
