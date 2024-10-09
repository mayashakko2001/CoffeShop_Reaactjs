import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllPayments = createAsyncThunk(
    'paymentSlice/fetchAllPayments',
    async (_, { getState }) => {
        const { auth } = getState();
        const token = auth.token;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const res = await axios.get('http://127.0.0.1:8000/api/get_all_payments', config);
        return res.data.payments; // Ensure this points to the correct part of the response
    }
);
//......................................................................................

export const fetchGetPaymmentsById = createAsyncThunk(
    'paymentSlice/fetchGetPaymmentsById',
    async (payId, { getState }) => {
        const { auth } = getState();
        const token = auth.token;

        if (!payId || isNaN(payId)) {
            throw new Error('A valid Payment ID is required');
        }

        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/get_payment_ById/${payId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('API Response:', res.data); // Log the response

            if (res.data && res.data.products && res.data.products.length > 0) {
                return res.data;
            }

            throw new Error('No products found in response');
        } catch (error) {
            console.error('Error fetching payment:', error);
            throw new Error('Failed to fetch payment details');
        }
    }
);
//........................................................................................

export const fetchAddPayments = createAsyncThunk(
    'paymentSlice/fetchAddPayments',
    async (newPayment, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/add_payment', newPayment);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const paymentSlice=createSlice({
    name:'paymentSlice',
    initialState:{
        payments:[],
        currentPayment: null ,
        loading: false,
        error: null
    },
    extraReducers:(builder)=>{
builder
.addCase(fetchAllPayments.pending ,(state, action)=>{
    state.loading = true;
    state.error =null
})
.addCase(fetchAllPayments.fulfilled ,(state, action)=>{
   state.loading = false;
    state.error =null;
    state.payments= action.payload
})
.addCase(fetchAllPayments.rejected ,(state, action)=>{
  state.loading = false;
    state.error =action.error.message
})
.addCase(fetchGetPaymmentsById.pending ,(state, action)=>{
   state.loading = true;
    state.error =null
})
.addCase(fetchGetPaymmentsById.fulfilled ,(state, action)=>{
    state.loading = false;
    state.error =null;
    state.currentPayment= action.payload
})
.addCase(fetchGetPaymmentsById.rejected ,(state, action)=>{
   state.loading = false;
    state.error =action.error.message
})
.addCase(fetchAddPayments.pending ,(state, action)=>{
    state.loading = true;
    state.error =null
})
.addCase(fetchAddPayments.fulfilled ,(state, action)=>{
   state.loading = false;
    state.error =null;
    state.payments.push(action.payload)
})
.addCase(fetchAddPayments.rejected ,(state, action)=>{
  state.loading = false;
    state.error =action.error.message
})



    }
})
export default paymentSlice.reducer