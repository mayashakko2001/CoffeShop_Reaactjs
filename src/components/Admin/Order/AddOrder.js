import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    fetchadd_order_product, 
    fetchAddOrder, 
    fetchAllOrders, 
} from "../../rtk/Slices/order-slice";
import Swal from "sweetalert2";
import { fetchAllProducts } from "../../rtk/Slices/products-slice";
import { fetchAddPayments, fetchAllPayments } from "../../rtk/Slices/payment-slice";

function AddOrder() {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.product);
    const { user } = useSelector((state) => state.auth);
    const [order, setOrder] = useState({});
    const [selectedProducts, setSelectedProducts] = useState({});
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        dispatch(fetchAllOrders());
        dispatch(fetchAllProducts());
    }, [dispatch]);

    const handleSelectProduct = (productId) => {
        const updatedSelectedProducts = { ...selectedProducts };
        if (updatedSelectedProducts[productId]) {
            delete updatedSelectedProducts[productId]; // إزالة المنتج إذا كان مختارًا مسبقًا
        } else {
            updatedSelectedProducts[productId] = true; // تحديد المنتج
        }
        setSelectedProducts(updatedSelectedProducts);
    };

    const handleAddOrder = async () => {
        if (user && user.id) {
            const newOrder = {
                user_id: user.id,
                order_date: new Date().toISOString(),
            };
    
            try {
                const result = await dispatch(fetchAddOrder(newOrder)).unwrap();
                setOrder(result.order);
                Swal.fire({
                    icon: 'success',
                    title: 'Order Created',
                    text: 'New order has been created successfully.',
                });
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error creating order',
                    text: error.response?.data?.message || error.message,
                });
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'User not found.',
            });
        }
    };

    const Add_order_product = async () => {
        if (!order.id || Object.keys(selectedProducts).length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please select at least one product.',
            });
            return;
        }

        const orderProducts = Object.keys(selectedProducts).map(productId => ({
            order_id: order.id,
            product_id: productId,
            quantity: quantities[productId] || 1, // استخدام الكمية المحددة أو 1 كقيمة افتراضية
        }));

        try {
            // تحقق من أن orderProducts معرف
            if (!orderProducts || orderProducts.length === 0) {
                throw new Error('No products to add to the order.');
            }

            await Promise.all(orderProducts.map(orderProduct => 
                dispatch(fetchadd_order_product(orderProduct)).unwrap()
            ));

            Swal.fire({
                icon: 'success',
                title: 'Products Added',
                text: 'Products have been successfully added to the order.',
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error adding products',
                text: error.response?.data?.message || error.message,
            });
        }
    };

    const handleQuantityChange = (productId, value) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: value,
        }));
    };

    return (
        <div className="container">
            <h2>Add New Order</h2>
            <button type="button" className="btn btn-success mt-3" onClick={handleAddOrder}>
                Create New Order
            </button>

            <h3>Available Products</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Product Image</th> {/* عمود الصورة */}
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Available Quantity</th>
                        <th>Select Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>
                                <img 
                                    src={`http://127.0.0.1:8000/storage/${product.image}`} 
                                    alt={product.title} 
                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                                />
                            </td>
                            <td>{product.title}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                            <td>
                                <input
                                    type="number"
                                    min="1"
                                    defaultValue={1}
                                    style={{ width: '60px', padding: '5px' }}
                                    onChange={(e) => handleQuantityChange(product.id, Number(e.target.value))}
                                />
                                <button
                                    type="button"
                                    className="btn btn-primary mt-1"
                                    onClick={() => handleSelectProduct(product.id)}
                                >
                                    {selectedProducts[product.id] ? 'Deselect' : 'Select'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button type="button" className="btn btn-primary mt-3" onClick={Add_order_product}>
                Submit Order
            </button>
        </div>
    );
}

export default AddOrder;