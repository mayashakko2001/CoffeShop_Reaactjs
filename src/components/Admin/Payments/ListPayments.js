import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Payments from "./Payments";
import { fetchAllPayments } from "../../rtk/Slices/payment-slice";


function ListPayments() {
    const dispatch = useDispatch();
    const { payments, loading, error } = useSelector((state) => state.paymentSlice);

    useEffect(() => {
        dispatch(fetchAllPayments());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div style={{ color: 'red' }}>Error: {error}</div>;
    }

    // Debugging: Log payments to check state
    console.log('Payments:', payments);

    return (
        <div className="container">
            <div className="row">
               
                    <Payments payments={payments} />
               
              
            </div>
        </div>
    );
}

export default ListPayments;