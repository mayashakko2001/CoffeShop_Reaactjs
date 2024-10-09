import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// جلب جميع المنتجات
export const fetchAllProducts = createAsyncThunk(
    'productSlice/fetchAllProducts',
    async () => {
        const res = await axios.get(`http://127.0.0.1:8000/api/getAllproducts`);
        return res.data;
    }
);

// جلب منتج بواسطة ID
export const fetchProductById = createAsyncThunk(
    'productSlice/fetchProductById',
    async (productId ) => {
        const res = await axios.get(`http://127.0.0.1:8000/api/getProductById/${productId}`);
        return res.data;
    }
);

// حذف منتج
export const fetchDeleteProduct = createAsyncThunk(
    'productSlice/fetchDeleteProduct', // إضافة نوع للدالة
    async (productId, { getState, dispatch }) => {
        const { auth } = getState();
        const token = auth.token;

        try {
            await axios.delete(`http://127.0.0.1:8000/api/deleteProduct/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // إرجاع ID المنتج المحذوف
            return productId;
        } catch (error) {
            throw new Error(error.response.data.error || 'حدث خطأ عند حذف المنتج.');
        }
    }
);

export const fetchUpdateProduct = createAsyncThunk(
    'productSlice/fetchUpdateProduct',
    async ({ productId, updateProduct }, { getState }) => {
        const { auth } = getState();
        const token = auth.token;

        console.log('Updating product:', updateProduct); // تحقق من القيم

        const formData = new FormData();
        Object.keys(updateProduct).forEach(key => {
            if (updateProduct[key]) { // تحقق من أن القيمة ليست فارغة
                formData.append(key, updateProduct[key]);
            }
        });

        try {
            const res = await axios.put(`http://127.0.0.1:8000/api/updateProduct/${productId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                   
                },
        
            });
            return res.data.product; // تأكد من أن الخادم يرجع المنتج المحدث
        } catch (error) {
            console.error('Error updating product:', error);
            throw new Error(error.response?.data?.error || 'فشل تحديث المنتج');
        }
    }
);

// إضافة منتج
export const fetchAddProduct = createAsyncThunk(
    'productSlice/fetchAddProduct',
    async (newProduct, { getState }) => {
        const { auth } = getState();
        const token = auth.token;
       

      
        const response = await axios.post(`http://127.0.0.1:8000/api/add_product`, newProduct, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }
);

// تعريف slice
export const productSlice = createSlice({
    name: 'productSlice',
    initialState: {
        products: [],
        currentProduct: null,
        loading: false,
        error: null,
        deleteError: null,
    },
    reducers: {
        deleteProductSuccess(state, action) {
            state.products = state.products.filter(product => product.id !== action.payload);
            state.deleteError = null; // إعادة تعيين خطأ الحذف
        },
        deleteProductError(state, action) {
            state.deleteError = action.payload;
        },
        setProducts(state, action) {
            state.products = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.currentProduct = action.payload;
            })
            .addCase(fetchAddProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })
            .addCase(fetchDeleteProduct.pending, (state) => {
                state.deleteError = null;
            })
            .addCase(fetchDeleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(product => product.id !== action.payload);
            })
            .addCase(fetchDeleteProduct.rejected, (state, action) => {
                state.deleteError = action.error.message;
            })
            .addCase(fetchUpdateProduct.fulfilled, (state, action) => {
                console.log('Updated product:', action.payload); // تحقق من المنتج المحدث
                state.currentProduct = action.payload; 
            })
            .addCase(fetchUpdateProduct.rejected, (state, action) => {
                state.error = action.error.message;
            });
    }
});

// تصدير الـ actions و الـ reducer

export const { setProducts, setLoading, setError } = productSlice.actions;

export default productSlice.reducer;