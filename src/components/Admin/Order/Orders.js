import React from "react";
import '../../css/ListOrders.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchGetOrderProductsById } from "../../rtk/Slices/order-slice";
import { Link } from "react-router-dom";

function Orders({ orders }) {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.orderSlice.loading);
    const error = useSelector(state => state.orderSlice.error);

    const handleViewDetails = (orderId) => {
        dispatch(fetchGetOrderProductsById(orderId)); // استدعاء دالة جلب تفاصيل الطلب
    };

    return (
        <div className="row">
            {orders && orders.length > 0 ? (
                orders.map(or => (
                    <div className="card col-12 col-sm-6 col-md-4" key={or.id}>
                        <div className="body">
                            <h1 className="card-order">Order ID: {or.id}</h1>
                            <p className="user-id">User ID: {or.user_id}</p>
                            <p className="order-date">Order Date: {new Date(or.order_date).toLocaleDateString()}</p>
                            <Link to={`/dd/${or.id}`} onClick={() => handleViewDetails(or.id)} className="btn btn-info">
                                View Details
                            </Link>
                        </div>
                    </div>
                ))
            ) : (
                <h2 style={{color:'whitesmoke'}}>No orders available</h2>
            )}

            {loading && <h2>Loading products...</h2>}
            {error && <h2>Error: {error}</h2>}
        </div>
    );
}

export default Orders;