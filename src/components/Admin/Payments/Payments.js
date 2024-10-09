import React from 'react';
import { Link } from 'react-router-dom';

function Payments({ payments }) {
    // No need to use useDispatch or useSelector here since we're getting payments as a prop

    if (!payments) {
        return <div>Loading...</div>; // If payments is undefined, show loading
    }

    return (
        <div className="row">
            <div className="col-12 col-md-4">
                <h1>Payment</h1>
                {payments.length > 0 ? (
                    payments.map((pay) => (
                       
                        <div className="card col-12 col-sm-6 col-md-10" key={pay.id}>
                            <h2>Date of Payment: {new Date(pay.date_payment).toLocaleDateString()}</h2>
                            <h3>Order ID: {pay.order_product_id}</h3>
                            <h4>Total Price: ${pay.total_price.toFixed(2)}</h4>
                            <Link to={`/DetailsPay/${pay.id}`} className='btn btn-info custom-small-btn'>Details</Link>

                        </div>
                    ))
                ) : (
                    <h1>No payments found</h1>
                )}
            </div>
        </div>
    );
}

export default Payments;