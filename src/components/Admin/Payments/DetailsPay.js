import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetPaymmentsById } from "../../rtk/Slices/payment-slice";
import { useParams } from "react-router-dom";

function DetailsPay() {
    const dispatch = useDispatch();
    const { payId } = useParams(); // Accessing payId from the URL
    const { loading, error, currentPayment: payments } = useSelector((state) => state.paymentSlice);

    useEffect(() => {
        if (payId) {
            dispatch(fetchGetPaymmentsById(payId));
        }
    }, [dispatch, payId]);

    // Handle loading, error, and rendering products
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div style={{ color: 'red' }}>Error: {error}</div>;
    }

    const orderProduct = payments?.products || [];
    const orderDetails = payments?.details || [];

    return (
        <div className="row">
            {orderProduct.length > 0 ? (
                orderProduct.map(product => {
                    const detail = orderDetails.find(detail => detail.id === product.product_id);
                    return (
                        <div className="col-12 col-sm-6 col-md-4 mb-4" key={product.id}>
                            <div className="card product">
                                <div className="card-body">
                                    <h5 className="card-title">Name Product: {detail ? detail.title : "Unknown Product"}</h5>
                                    <p className="quantity">{`Total Quantity of product: ${product.quantity}`}</p>
                                    <p className="price">{`Price: $${detail ? detail.price : '0.00'}`}</p>
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <h1>No products found</h1>
            )}
        </div>
    );
}

export default DetailsPay;