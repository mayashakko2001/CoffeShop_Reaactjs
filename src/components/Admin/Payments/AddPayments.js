import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchAddPayments } from "../../rtk/Slices/payment-slice";

function AddPaymnets(){
    const dispatch=useDispatch();
    const {loading ,error, payments}=useSelector((state)=>state.paymentSlice);
    const [pay ,setPay]=useState([])
    useEffect(()=>{
        if(pay)
        dispatch(fetchAddPayments(pay))
    },[dispatch])
    return(<></>)
}
export default AddPaymnets