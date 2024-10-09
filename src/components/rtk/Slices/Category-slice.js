import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

import axios from "axios";



export const fetchAddCategory = createAsyncThunk(
    'categorySlice/fetchAddCategory',
    async (newCat, { getState, rejectWithValue }) => {
        const { auth } = getState();
        const token = auth.token;

        try {
            const res = await axios.post(`http://127.0.0.1:8000/api/add_Catogery`, newCat, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json', // تأكد من تعيين نوع المحتوى
                },
            });
            return res.data.data; // العودة بالبيانات المضافة
        } catch (error) {
            console.error('Error adding category:', error.response?.data);
            return rejectWithValue(error.response ? error.response.data : 'Something went wrong');
        }
    }
);

export const fetchAllCategory = createAsyncThunk('categorySlice/fetchAllCategory', async () => {
    const res = await axios.get(`http://127.0.0.1:8000/api/get_All_Catogery`);
    console.log("API Response:", res.data);
    if (!res.data || !res.data.data) {
        throw new Error('No data found');
    }
    return res.data.data;
});

export const fetchCatById = createAsyncThunk('categorySlice/fetchCatById', async (catId) => {
    console.log("Fetching category with ID:", catId);
    const res = await axios.get(`http://127.0.0.1:8000/api/get_Catogery_By_Id/${catId}`);
    console.log("API Response:", res.data);
    
   
    return res.data.data;
});
export const fetchDeleteCat = createAsyncThunk(
    'categorySlice/fetchDeleteCat',
    async (catId, { getState, rejectWithValue }) => {
        const { auth } = getState();
        const token = auth.token;

        try {
            const res = await axios.delete(`http://127.0.0.1:8000/api/delete_Catogery/${catId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return catId; // Return the category ID on success
        } catch (error) {
            console.error('Error deleting category:', error.response?.data || error.message);
            return rejectWithValue(error.response ? error.response.data : 'Failed to delete category');
        }
    }
);
export const categorySlice = createSlice({
    name: 'categorySlice',
    initialState: {
        cat: [],
     currentCat:null,
 
        loading: false,
        error: null,
        filteredProducts: [],
    },
    reducers: {
        setCurrentCat(state, action) {
            state.currentCat = action.payload;
            // تصفية المنتجات عند تعيين الفئة الحالية
            state.filteredProducts = action.payload.products || [];
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllCategory.fulfilled, (state, action) => {
                state.cat = action.payload;
                state.loading = false;
            })
  
            .addCase(fetchAllCategory.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(fetchCatById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAddCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAddCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.cat.push(action.payload); // إضافة الفئة الجديدة
            })
            .addCase(fetchAddCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // تعيين رسالة الخطأ
            })
            .addCase(fetchCatById.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(fetchDeleteCat.pending ,(state,action)=>{
                state.loading=true
            })
            .addCase(fetchDeleteCat.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // تعيين رسالة الخطأ
            })
            .addCase(fetchDeleteCat.fulfilled, (state, action) => {
                state.loading = false;
                state.cat.filter(cat=> cat.id !== action.payload); // إضافة الفئة الجديدة
            })
         
    }
});
export const { setCurrentCat } = categorySlice.actions;
export default categorySlice.reducer;