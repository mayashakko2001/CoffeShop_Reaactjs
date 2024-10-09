import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchRegisterCustomer } from '../../rtk/Slices/userSlice';
import Swal from "sweetalert2";

function RegisterUser() {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.userSlice);
    const [user, setUser] = useState({  name: "", phone: "", email: "", password: "" });
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        console.log("User data being sent:", user); // Debugging
        try {
            await dispatch(fetchRegisterCustomer(user)).unwrap();
            Swal.fire({
                title: 'Welcome Customer!',
                icon: 'success',
            });
            navigate('/home');
        }catch (err) {
            console.error("Registration failed:", err); // Log the entire error object
            const message = err.response?.data?.message || 'An error occurred. Please try again!';
        
            Swal.fire({
                title: 'Registration Failed',
                text: message,
                icon: 'error',
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

    return (
        <form onSubmit={submit}>
            <label style={{color:'white'}}>Name</label>
            <input type="text" className="name" name="name" value={user.name} onChange={handleChange} placeholder="Your Name" required />
            <label style={{color:'white'}}>Email</label>
            <input type="email" className="email" name="email" value={user.email} onChange={handleChange} placeholder="Your Email" required />
            <label style={{color:'white'}}>Password</label>
            <input type="password" className="password" name="password" value={user.password} onChange={handleChange} placeholder="Your Password" required />
            <label style={{color:'white'}}>Phone</label>
            <input type="text" className="phone" name="phone" value={user.phone} onChange={handleChange} placeholder="Your Phone" required />
            <button type="submit" className="btn btn-success">Register</button>
        </form>
    );
}

export default RegisterUser;