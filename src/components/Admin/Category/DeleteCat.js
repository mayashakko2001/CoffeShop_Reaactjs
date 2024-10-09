import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategory, fetchDeleteCat } from "../../rtk/Slices/Category-slice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ProductPage from "../Product/ProductPage";

function DeleteCat() {
    const dispatch = useDispatch();
    const cat = useSelector((state) => state.categorySlice.cat);
    const loading = useSelector((state) => state.categorySlice.loading);
    const error = useSelector((state) => state.categorySlice.error);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchAllCategory());
    }, [dispatch]);

    const handleDelete = async (categoryId) => {
        try {
            await dispatch(fetchDeleteCat(categoryId)).unwrap();
            Swal.fire({
                title: 'Successfully deleted category!',
                icon: 'success',
            });
            // Navigate only after successful deletion
            
        } catch (err) {
            console.error('Failed to delete category:', err);
            Swal.fire({
                title: 'Error deleting category',
                text: err?.message || 'Please try again.',
                icon: 'error',
            });
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div style={{ color: 'red' }}>Error: {error.message}</div>;

    return (
        <table className="table table-striped mt-5 products-table">
            <thead>
                <tr>
                    <th>Category Name</th>
                    <th>Operation</th>
                </tr>
            </thead>
            <tbody>
                {cat.map((category) => (
                    <tr key={category.id}>
                        <td>{category.name}</td>
                        <td>
                            <button className="btn btn-danger mt-3" onClick={() => handleDelete(category.id)}>
                                DELETE
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default DeleteCat;