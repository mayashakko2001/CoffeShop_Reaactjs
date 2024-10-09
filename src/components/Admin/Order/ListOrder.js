import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrderProducts } from "../../rtk/Slices/order-slice";
import '../../css/ListOrders.css';
import Orders from "./Orders";

function ListOrder() {
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector((state) => state.orderSlice);
    const [localOrders, setLocalOrders] = useState([]);

   useEffect(()=>{
    dispatch(fetchAllOrderProducts())
   },[])

    // Update localOrders when orders change
    useEffect(() => {
        setLocalOrders(orders);
    }, [orders]);

    return (
        <>
            <h1 style={{color:'whitesmoke'}}>Orders Products</h1>
            <div className="container">
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {localOrders.length === 0 ? (
                    <h4 style={{color:'whitesmoke'}}>Not found Orders</h4>
                ) : (
                    <Orders orders={localOrders} />
                )}
            </div>
        </>
    );
}

export default ListOrder;