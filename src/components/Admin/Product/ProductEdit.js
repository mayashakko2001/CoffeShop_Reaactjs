import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpdateProduct, fetchProductById } from "../../rtk/Slices/products-slice";
import { useNavigate, useParams } from "react-router-dom";

const ProductEdit = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const currentProduct = useSelector(state => state.product.currentProduct);
    const [product, setProduct] = useState({
        title: '',
        description: '',
        quantity: '',
        price: '',
        image: null,
        category_id: null,
    });

    // Fetch product details when productId is present
    useEffect(() => {
        if (productId) {
            dispatch(fetchProductById(productId));
        }
    }, [dispatch, productId]);

    // Update state when currentProduct changes
    useEffect(() => {
        if (currentProduct) {
            setProduct(currentProduct);
        }
    }, [currentProduct]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: name === 'category_id' ? Number(value) : value }));
    };

    const handleImageChange = (e) => {
        setProduct(prev => ({ ...prev, image: e.target.files[0] }));
    };

    const submit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        // Append only changed fields to formData
        if (product.title !== '') formData.append('title', product.title);
        if (product.description !== '') formData.append('description', product.description);
        if (product.quantity !== '') formData.append('quantity', product.quantity);
        if (product.price !== '') formData.append('price', product.price);
        if (product.category_id !== null) formData.append('category_id', product.category_id);
        if (product.image) formData.append('image', product.image);

        console.log('FormData being sent:', Array.from(formData.entries())); // عرض القيم المرسلة

        try {
            const response = await dispatch(fetchUpdateProduct({ productId, updateProduct: formData })).unwrap();
            console.log('Response from server:', response); // تحقق من البيانات المحدثة
            alert("Product updated successfully!");
            navigate('/products'); // Redirect after success
        } catch (error) {
            console.error('Error during product update:', error); // عرض تفاصيل الخطأ
            alert(`Error: ${error.message || 'حدث خطأ غير معروف'}`);
        }
    };

    return (
        <form onSubmit={submit}>
            <h1>Edit Product</h1>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title Product</label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={product.title || ''}
                    onChange={handleChange}
                    placeholder="Title product"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description Product</label>
                <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    value={product.description || ''}
                    onChange={handleChange}
                    placeholder="Description product"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="category_id" className="form-label">Category ID</label>
                <input
                    type="number"
                    className="form-control"
                    id="category_id"
                    name="category_id"
                    value={product.category_id || ''}
                    onChange={handleChange}
                    placeholder="Category ID"
                />
            </div>
            <div className="mb-3 row">
                <div className="col">
                    <label htmlFor="quantity" className="form-label">Quantity Product</label>
                    <input
                        type="number"
                        className="form-control"
                        id="quantity"
                        name="quantity"
                        value={product.quantity || ''}
                        onChange={handleChange}
                        placeholder="Quantity product"
                    />
                </div>
                <div className="col">
                    <label htmlFor="price" className="form-label">Price Product</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        value={product.price || ''}
                        onChange={handleChange}
                        placeholder="Price product"
                    />
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="image" className="form-label">Upload Image</label>
                <input
                    type="file"
                    className="form-control"
                    id="image"
                    name="image"
                    onChange={handleImageChange}
                />
            </div>
            <button type="submit" className="btn btn-primary">Update Product</button>
        </form>
    );
};

export default ProductEdit;