import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddProduct, fetchUpdateProduct } from "../../rtk/Slices/products-slice";
import { useNavigate, useParams } from "react-router-dom";

function ProductManager() {
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
        id: null,
        catogery_id: null,
        imageUrl: null // لتخزين رابط الصورة
    });

    // Initialize state when editing a product
    useEffect(() => {
        if (currentProduct) {
            setProduct(currentProduct);
        } else {
            setProduct({
                title: '',
                description: '',
                quantity: '',
                price: '',
                image: null,
                id: null,
                catogery_id: null,
                imageUrl: null // Reset when no product
            });
        }
    }, [currentProduct]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        // Create an image element
        const img = new Image();

        img.onload = () => {
            const MAX_WIDTH = 100; // العرض الأقصى
            const MAX_HEIGHT = 100; // الارتفاع الأقصى
            let width = img.width;
            let height = img.height;

            // حساب الأبعاد الجديدة
            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }
            }

            // إنشاء canvas لتصغير الصورة
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            // تحويل الصورة إلى Blob
            canvas.toBlob((blob) => {
                setProduct(prev => ({
                    ...prev,
                    image: blob,
                    imageUrl: URL.createObjectURL(blob) // تخزين رابط الصورة
                }));
            }, file.type);
        };

        img.src = URL.createObjectURL(file); // تحميل الصورة
    };

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in product) {
            formData.append(key, product[key]);
        }

        if (!product.image) {
            alert('Please upload an image.');
            return;
        }

        // Use formData here instead of updateProduct
        if (productId) {
            dispatch(fetchUpdateProduct({ productId: productId, updateProduct: formData }));
        } else {
            dispatch(fetchAddProduct(formData));
        }
    };

    return (
        <form onSubmit={submit}>
            <div className="mb-3">
                <h1>{productId ? 'Update Product' : 'Add Product'}</h1>
                <label htmlFor="title" className="form-label">Title Product</label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={product.title || ''} // Use empty string instead of null
                    onChange={handleChange}
                    placeholder="Title product"
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description Product</label>
                <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    value={product.description || ''} // Use empty string instead of null
                    onChange={handleChange}
                    placeholder="Description product"
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="catogery_id" className="form-label">Category ID</label>
                <input
                    type="number"
                    className="form-control"
                    id="catogery_id"
                    name="catogery_id" // Fixed typo
                    value={product.catogery_id || ''} // Use empty string instead of null
                    onChange={handleChange}
                    placeholder="Category ID"
                    required
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
                        value={product.quantity || ''} // Use empty string instead of null
                        onChange={handleChange}
                        placeholder="Quantity product"
                        required
                    />
                </div>
                <div className="col">
                    <label htmlFor="price" className="form-label">Price Product</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        value={product.price || ''} // Use empty string instead of null
                        onChange={handleChange}
                        placeholder="Price product"
                        required
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
                    required
                />
            </div>
            {product.imageUrl && <img src={product.imageUrl} alt="Product" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />}
            <button type="submit" className="btn btn-primary">
                {productId ? 'Update Product' : 'Add Product'}
            </button>
        </form>
    );
}

export default ProductManager;