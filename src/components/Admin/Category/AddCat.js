import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddCategory } from '../../rtk/Slices/Category-slice';
import Swal from 'sweetalert2';

const AddCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.categorySlice.loading);
    const error = useSelector((state) => state.categorySlice.error);
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newCat = { name: categoryName }; // Ensure correct data structure

        try {
            await dispatch(fetchAddCategory(newCat)).unwrap();
            Swal.fire({
                title: 'Successfully added category!',
                icon: 'success',
            });
            setCategoryName(''); // Reset input
        } catch (err) {
            console.error('Failed to add category:', err);
            Swal.fire({
                title: 'Error adding category',
                text: error?.message || 'Please try again.',
                icon: 'error',
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter category name"
                required
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Adding...' : 'Add Category'}
            </button>
            {error && (
                <div style={{ color: 'red' }}>
                    {error.message || 'An error occurred. Please try again.'}
                </div>
            )}
        </form>
    );
};

export default AddCategory;