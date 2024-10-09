import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../rtk/Slices/Auth-slice';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Login.css'; // Ensure you have a suitable CSS file
import Swal from 'sweetalert2';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validateEmail = (email) => {
        // Simple regex for email validation
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        
        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address.');
            return;
        } else {
            setEmailError('');
        }

        const credentials = { email, password };

        try {
            await dispatch(login(credentials)).unwrap();
            Swal.fire({
                title: 'Successfully logged in!',
                icon: 'success'
            });
            navigate('/home');
        } catch (error) {
            console.error("Login failed:", error);
            Swal.fire({
                title: 'Error in email or password, please try again.',
                icon: 'error'
            });
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {emailError && <div className="error" style={{ color: 'red' }}>{emailError}</div>}
            <form onSubmit={handleLogin}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Your Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className='btn btn-success '>Login</button>
            </form>
            <div className="button-container">
           
                <Link to={'/register_user'} className='btn btn-primary'>Register Customer</Link>
                <Link to={'/register_admin'} className='btn btn-primary'>Register Admin</Link>
            </div>
        </div>
    );
};

export default Login;