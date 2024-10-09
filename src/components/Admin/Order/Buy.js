import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllOrders,fetchadd_order_product } from "../../rtk/Slices/order-slice";
import { useEffect } from "react";
function Buy(){
    const dispatch = useDispatch();
    const { loading, error, orders } = useSelector((state) => state.orderSlice);

    useEffect(() => {
        dispatch(fetchAllOrders());
    }, [dispatch]);
useEffect(()=>{
    if(orders){
        dispatch(fetchadd_order_product())
    }
},[dispatch])
    if (loading) {
        return <div>Loading ...</div>;
    }

    if (error) {
        return <div style={{ color: 'red' }}>Error: {error}</div>;
    }
    return(<>
    </>)
}
export default Buy