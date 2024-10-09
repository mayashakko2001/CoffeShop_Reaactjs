import { useEffect, useState } from 'react';
import './css/Product.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from './rtk/Slices/products-slice';
import { useParams } from 'react-router-dom';

function Products() {
    const productState = useSelector(state => state.product.products || []);
    const [showFullDescription, setShowFullDescription] = useState({});
    const [loading, setLoading] = useState(true); // حالة التحميل
    const dispatch = useDispatch();
    const { productId } = useParams();

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                await dispatch(fetchAllProducts());
            } catch (error) {
                console.error("Failed to fetch products: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [dispatch]);

    const toggleDescription = (id) => {
        setShowFullDescription(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const renderProducts = () => {
        return productState.map(product => (
            <div className="col-12 col-sm-6 col-md-4 mb-4" key={product.id}>
                <div className="card_product">
                    
                    <div className="card-body">
                    <img className="card-img"src={`http://127.0.0.1:8000/storage/${product.image}`} alt="Product" />
                        <h5 className="card-title">Name Product: {product.title}</h5>
                        <p className="card-text">
                            {showFullDescription[product.id] ? product.description : `${product.description.substring(0, 100)}...`}
                        </p>
                        {/* استخدم نص عادي بدلاً من زر */}
                        <span 
                            onClick={() => toggleDescription(product.id)} 
                            className="text-primary" 
                            style={{ cursor: 'pointer' }}
                        >
                            {showFullDescription[product.id] ? 'Read Less' : 'Read More'}
                        </span>
                        <p className="quantity">{`Quantity: ${product.quantity}`}</p>
                        <p className="price">{`Price: $${product.price}`}</p>
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <div className="row">
            {loading ? (
                <div className="col-12">
                    <h3>Loading...</h3>
                </div>
            ) : productState.length === 0 ? (
                <div className="col-12">
                    <h3>No Products Found</h3>
                </div>
            ) : (
                renderProducts()
            )}
        </div>
    );
}

export default Products;