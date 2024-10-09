import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import {fetchRegisterAdmin} from '../../rtk/Slices/userSlice'
import Swal from "sweetalert2";
function ResgisterAdmin(){
const dispatch =useDispatch();
const users =useSelector((state)=>state.userSlice.users);
const {loading ,error} =useSelector((state)=>state.userSlice);
let[user ,setUser] =useState({id: null , name:"" ,phone:null ,email:"" ,password:""});
const navigate = useNavigate()


const submit = async (e) => {
    e.preventDefault();
    try {
        await dispatch(fetchRegisterAdmin(user)).unwrap();
        Swal.fire({
            title: ' Welcome Admin !',
            icon: 'success'
        })
        navigate('/home');
    } catch (err) {
        console.error("Registration failed:", err);
        Swal.fire({
            title:'please registe again!!',
            icon:'error'
        })
    }
};
const handleChange=(e)=>{
const {name,value}=e.target;
setUser(prv=>({...prv ,[name]:value}))
}
if(loading){<div>loading......</div>}
if(error){<div style={{color:'red'}}>Error</div>}

    return(
        <form onSubmit={submit}>
            <label style={{color:'white'}}>Name :</label>
            <input type={Text} className="name" id="name" name="name" value={user.name ||''} onChange={handleChange} placeholder="your name"/>
            <label style={{color:'white'}}>Email</label>
            <input  type="email" className="email" id="email" placeholder="your Email" name="email" value={user.email ||''} onChange={handleChange}/>
            <label style={{color:'white'}}>Password</label>
            <input  type="password" className="password" id="password" placeholder="your password" name="password" value={user.password || ''} onChange={handleChange}/>
            <label style={{color:'white'}}>Phone</label>
            <input  type="number" className="phone" id="phone" placeholder="your phone" name="phone" value={user.phone ||''} onChange={handleChange}/>
            <button type="submit" className="btn btn-success btn-sm">Register</button>
        </form>
    )
}
export default ResgisterAdmin