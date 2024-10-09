import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActive, fetchGetOrderProductsById } from "../../rtk/Slices/order-slice";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import { fetchAddPayments } from "../../rtk/Slices/payment-slice";
import axios from 'axios';

function DdOrder() {
    const dispatch = useDispatch();
    const { orderId } = useParams();
    const orderData = useSelector(state => state.orderSlice.orderDetails);
    const order = useSelector(state => state.orderSlice.orders);
    const loading = useSelector(state => state.orderSlice.loading);
    const error = useSelector(state => state.orderSlice.error);
    
    const [active, setActive] = useState(false);
    const [invoiceCreated, setInvoiceCreated] = useState(false);

    useEffect(() => {
        if (orderId) {
            dispatch(fetchGetOrderProductsById(orderId));
        }
    }, [dispatch, orderId]);

    const orderProducts = orderData?.products || [];
    const productDetails = orderData?.details || [];

    const activateProducts = async () => {
        const newOrder = {
            products: orderProducts.map(product => ({
                ...product,
                status: "Active",
            })),
        };

        try {
            await dispatch(fetchActive({ orderId, newOrder }));
            Swal.fire({ icon: 'success', title: 'Successfully updated!' });
            setActive(true);
            console.log("Products activated, calling addPayment...");
            await addPayment(); // Call addPayment after activating products
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Error occurred', text: error.message });
        }
    };

    const addPayment = async () => {
        console.log("Add Payment function called, active:", active);
        
        try {
            const paymentPromises = orderProducts.map(async (product) => {
                if (active) {
                    if (!product.id) {
                        console.error("Product ID is missing for product:", product);
                        throw new Error("Product ID is missing");
                    }
    
                    const paymentData = {
                        order_product_id: product.id, // تأكد من استخدام product.id هنا
                    };
    
                    console.log("Payment data being sent:", paymentData);
    
                    const response = await axios.post('http://127.0.0.1:8000/api/add_payments', paymentData);
    
                    if (response.status === 200) {
                        console.log("Payment added:", response.data);
                    } else {
                        throw new Error("Failed to add payment");
                    }
                } else {
                    console.log("Not active, skipping payment addition for product:", product.id);
                }
            });
    
            await Promise.all(paymentPromises);
            await dispatch(fetchAddPayments());
            setInvoiceCreated(true);
            Swal.fire({ icon: 'success', title: 'Payments Added', text: 'Invoices have been created successfully.' });
        } catch (error) {
            console.error("Error adding payments:", error);
            Swal.fire({ icon: 'error', title: 'Payment Error', text: error.message });
        }
    };

    const handleButtonClick = async () => {
        setActive(false); // Prevent multiple clicks
        console.log("Button clicked, activating products...");
        await activateProducts();
        setActive(true); // Reactivate button
    };

    return (
        <div className="row">
            <button className="btn btn-success btn-p5" onClick={handleButtonClick}>
                {active ? 'Deactivate' : 'Activate'}
            </button>
            {loading ? (
                <div className="col-12">
                    <h3>Loading...</h3>
                </div>
            ) : error ? (
                <div className="col-12">
                    <h3>Error fetching products: {error}</h3>
                </div>
            ) : orderProducts.length > 0 ? (
                orderProducts.map(product => {
                    const detail = productDetails.find(detail => detail.id === product.product_id);
                    if (!detail) {
                        console.warn(`No detail found for product_id: ${product.product_id}`);
                    }
                    return (
                        <div className="col-12 col-sm-6 col-md-4 mb-4" key={product.id}>
                            <div className="card product">
                                <div className="card-body">
                                    <h5 className="card-title">Product Name: {detail ? detail.title : "Unknown Product"}</h5>
                                    <p className="quantity">{`Total Quantity: ${product.quantity}`}</p>
                                    <p className="price">{`Price: $${detail ? detail.price : '0.00'}`}</p>
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className="col-12">
                    <h3>No Products Found</h3>
                </div>
            )}
            {invoiceCreated && (
                <div className="col-12">
                    <h3>Invoice Created Successfully!</h3>
                </div>
            )}
        </div>
    );
}

export default DdOrder;