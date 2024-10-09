import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchAllOrders, fetchAddOrder, fetchDeleteOrder } from "../../rtk/Slices/order-slice";

import Swal from "sweetalert2";

function GetAllOrders() {
    const dispatch = useDispatch();
    const { loading, error, orders } = useSelector((state) => state.orderSlice);
    const user = useSelector((state) => state.auth.user); // افترض أن لديك slice للمستخدم
    let[order,setOreder] =useState([])
const {orderId}=useParams()
    // استدعاء جميع الطلبات عند تحميل المكون
    useEffect(() => {
        dispatch(fetchAllOrders());
    }, [dispatch]);


    const handleAddOrder = () => {
        if (user && user.id) {
            const newOrder = {
                user_id: user.id,
                order_date: new Date().toISOString(),
                // أضف أي خصائص أخرى تحتاجها
            };
            dispatch(fetchAddOrder(newOrder)).then(() => {
                dispatch(fetchAllOrders()); // تحديث الطلبات بعد الإضافة
            });
        } else {
            console.error("User is not logged in or user ID is missing.");
        }
    };

    const handleDeleteOrder = async (orderId) => {
        try {
            await dispatch(fetchDeleteOrder(orderId)); // استدعاء دالة الحذف
            Swal.fire({
                icon: 'success',
                title: 'Successfully deleted order!',
            });
            dispatch(fetchAllOrders());// تحديث الطلبات بعد الحذف
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error deleting order',
                text: error.message, // عرض رسالة الخطأ
            });
        }
    };

    if (loading) {
        return <div>Loading ...</div>;
    }

    if (error) {
        return <div style={{ color: 'red' }}>Error: {error}</div>;
    }

    // تأكد من أن orders هو مصفوفة
    if (!Array.isArray(orders)) {
        console.error("Orders is not an array:", orders);
        return <div>Unexpected data format</div>;
    }

    return (
        <>
            <button
                className="btn btn-success btn-ms mt-3"
                onClick={handleAddOrder}
            >
                Add New Order
            </button>
            <div className="container">
                <div className="row">
                    {orders.length === 0 ? (
                        <h3>No Orders Found</h3>
                    ) : (
                        orders.map(o => (
                            o && (
                                <div className="col-12 col-sm-6 col-md-4 mb-4" key={o.id}>
                                    <div className="card order">
                                        <div className="card-body">
                                            <h5 className="card-user">Order User By: ( {o.user_id} )</h5>
                                            <p className="card-text">
                                                Order Date: {o.order_date}
                                            </p>
                                            <button 
                                                onClick={() => handleDeleteOrder(o.id)} 
                                                className="btn btn-danger btn-ms mt-3"
                                            >
                                                Delete Order
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        ))
                    )}
                </div>
            </div>
        </>
    );
}

export default GetAllOrders;