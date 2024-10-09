import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllProducts, fetchDeleteProduct } from "../../rtk/Slices/products-slice";
import { useParams } from 'react-router-dom';

const ProductPage = () => {
    const dispatch = useDispatch();
    const { products, loading, error, deleteError } = useSelector(state => state.product);
    const token = useSelector(state => state.auth.token);
    const role = useSelector(state => state.auth.role);
    const [img, setImg] = useState(null);
    const { catId } = useParams();

    const handleDelete = async (productId) => {
        if (!token) {
            alert("Login First!");
            return;
        }
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await dispatch(fetchDeleteProduct(productId)).unwrap();
                alert("Product deleted successfully!");
            } catch (error) {
                alert(`Error: ${error.message}`);
            }
        }
    };

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);

    if (loading) {
        return <div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div>;
    }

    return (
        <div>
            {role === '1' && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Link to='/add_product' className="btn btn-success ms-3" style={{ fontSize: '16px', padding: '5px 10px', width: '30%' }}>Add New Product</Link>
                    <Link to='/add_cat' className="btn btn-success ms-3" style={{ fontSize: '16px', padding: '5px 10px', width: '30%' }}>Add New Cat</Link>
                    <Link to={`/delete_cat/${catId}`} className="btn btn-danger ms-3" style={{ fontSize: '16px', padding: '5px 30px', width: '30%' }}>Delete Cat</Link>
                </div>
            )}
            {deleteError && <div style={{ color: 'red' }}>{deleteError}</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <table className="table table-striped mt-5 products-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Image</th>
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length === 0 ? (
                        <tr>
                            <td colSpan="8" className="text-center">No products found</td>
                        </tr>
                    ) : (
                        products.map(product => {
                            const imageUrl = `${process.env.REACT_APP_API_URL}/storage/${product.image}`;
                            return (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.title}</td>
                                    <td>{product.description}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.price}</td>
                                    <td>{product.catogery_id}</td>
                                    <td>
                                        <img 
                                           src={`http://127.0.0.1:8000/storage/${product.image}`}
                                            alt={product.title} 
                                            style={{ width: '50px', height: '50px', objectFit: 'cover' }} // حجم الصورة
                                        />
                                    </td>
                                    <td>
                                        {role === '1' && (
                                            <>
                                                <button 
                                                    className="btn btn-danger btn-sm mt-2" style={{ fontSize: '16px', padding: '5px 10px', width: '30%' }}
                                                    onClick={() => handleDelete(product.id)}>
                                                    Delete
                                                </button>
                                                <Link to={`/edit/${product.id}`} className="btn btn-primary btn-sm mt-2" style={{ fontSize: '16px', padding: '5px 10px', width: '30%' }}>Edit</Link>
                                            </>
                                        )}
                                        <Link to={`/view_product/${product.id}`} className="btn btn-info btn-sm mt-2" style={{ fontSize: '16px', padding: '5px 10px', width: '30%' }}>View</Link>
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ProductPage;