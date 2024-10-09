import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategory, fetchCatById } from "../../rtk/Slices/Category-slice";
import '../../css/cata.css';
import { useParams } from "react-router-dom";
import Products from '../../Products';
import { fetchAllProducts } from "../../rtk/Slices/products-slice";
import ListProducts from "../Product/ListProducts";

function Category() {
    const dispatch = useDispatch();
    const { cat, currentCat, loading, error } = useSelector((state) => state.categorySlice);
    const { catId } = useParams();
    const [filteredProducts, setFilteredProducts] = useState([]);

    // جلب جميع الفئات والمنتجات عند تحميل المكون
    useEffect(() => {
        dispatch(fetchAllCategory());
      
    }, [dispatch]);

    // جلب الفئة المحددة بناءً على catId
    useEffect(() => {
        if (catId) {
            dispatch(fetchCatById(catId));
        }
    }, [dispatch, catId]);

    // تصفية المنتجات بناءً على الفئة المحددة
    useEffect(() => {
        if (currentCat && currentCat.products) {
            console.log("Current Category Products:", currentCat.products); // سجل المنتجات الحالية
            
            const relatedProducts = currentCat.products.filter(product => {
                // تحقق من وجود category و id
                console.log("Product Category ID:", product.category ? product.category.id : "No category");
                return product.category && String(product.category.id) === String(catId);
            });

            console.log("Filtered Related Products:", relatedProducts);  // سجل المنتجات المرتبطة
            setFilteredProducts(relatedProducts);
        } else {
            setFilteredProducts([]); // إعادة تعيين المنتجات إذا لم تكن هناك فئة
        }
    }, [currentCat, catId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const handleCategoryClick = (category) => {
        dispatch(fetchCatById(category.id));
       
        
    };
 
    return (
        <div className="category-container">
            <div className="button-row">
                {cat && cat.length > 0 ? (
                    cat.map((category) => (<>
                        <button
                            key={category.id}
                            className="btn btn-secondary btn-sm"
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category.name}
                        </button>
                         <Products product={category.id ===category.id} /></>
                    ))
                ) : (
                    <div>No categories available</div>
                )}
            </div>

            {/* عرض المنتجات بناءً على الفئة المحددة */}
            <div className="products-list">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <div key={product.id} className="product-item">
                            <Products product={product} /> {/* تمرير المنتج إلى مكون Products */}
                        </div>
                    ))
                ) : (
                    <div>No products found for this category.</div>
                )}
            </div>
        </div>
    );
}

export default Category;