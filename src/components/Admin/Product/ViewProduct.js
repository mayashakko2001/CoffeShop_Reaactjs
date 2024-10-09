import { useEffect, useState } from "react";
import { fetchProductById } from "../../rtk/Slices/products-slice";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function ViewProduct() {
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const { productId } = useParams();

    useEffect(() => {
        const handleView = async () => {
            try {
                const fetchedProduct = await dispatch(fetchProductById(productId)).unwrap();
                setProduct(fetchedProduct);
            } catch (error) {
                console.error("Failed to fetch product:", error);
            }
        };
        handleView();
    }, [productId, dispatch]);

    return (
        <div className="container">
            <h1 className="view p-3">View Product's Details</h1>
            {product ? (
                <div className="product" key={product.id}>
                    <p>Product: {product.title}</p>
                    <img src={product.image} alt={product.title} />
                    <p>Description: {product.description}</p>
                    <p>Price: {product.price}</p>
                    <p>Quantity: {product.quantity}</p>
                    <p>Category ID: {product.catogery_id}</p>
                </div>
            ) : (
                <p>Loading product details...</p>
            )}
        </div>
    );
}

export default ViewProduct;