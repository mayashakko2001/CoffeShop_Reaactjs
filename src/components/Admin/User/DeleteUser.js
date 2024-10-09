
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom";
import { fetchDeleteUser } from "../../rtk/Slices/userSlice";
import Swal from "sweetalert2";

function DeleteUser(){
const user=useSelector((state)=>state.userSlice.users)
const dispatch =useDispatch();
const {userId}=useParams()
const navigate=useNavigate()
useEffect(()=>{
    const DeleteUse= ()=>{}
    try{
         dispatch(fetchDeleteUser(userId)).unwrap();
    Swal.fire({
        icon:'success',
        title:'Successfuly Delete User!'
    });
    navigate('/users')
} 
catch(error){
    Swal.fire({
        icon:'error',
        title:'Can not Delete please delete again or login!'

    })
};
DeleteUse();

},[dispatch ,userId])



    return null
}
export default DeleteUser