import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { createElement } from "react";
export const fetchAllOrders = createAsyncThunk(
    'orderSlice/fetchAllOrders',
    async (_, { getState }) => {
        const { auth } = getState();
        const token = auth.token;
        const res = await axios.get('http://127.0.0.1:8000/api/get_all_order', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(res.data); // Log the entire response
        return res.data.data; 
    }
);
export const fetchAddOrder = createAsyncThunk('orderSlice/fetchAddOrder', async (newOrder, { getState }) => {
    const { auth } = getState();
    const token = auth.token;

    const res = await axios.post('http://127.0.0.1:8000/api/add_order', newOrder, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    console.log('Response from API:', res.data); // طباعة الاستجابة
    return res.data;
});
//................................................................................
export const fetchadd_order_product= createAsyncThunk('orderSlice/fetchadd_order_product',async(neworder,{_,getState})=>{
    const { auth } = getState();
    const token = auth.token;
    const res =await axios.post(`http://127.0.0.1:8000/api/add_order_product`,neworder,{
        headers: {
            Authorization: `Bearer ${token}`, // تأكد من أن التوكن صحيح
        },
    })
    return res.data.data
})
//...............................................................................
export const fetchAllOrderProducts =createAsyncThunk('orderSlice/fetchAllOrderProducts',async(_,{getState})=>{
    const { auth } = getState();
    const token = auth.token;
    const res = await axios.get('http://127.0.0.1:8000/api/get_all_order_product', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log(res.data); // Log the entire response
    return res.data.data; 

})
//................................................................................
export const fetchGetOrderById = createAsyncThunk('orderSlice/fetchGetOrderById', async (orderId, { getState }) => {
    const { auth } = getState();
    const token = auth.token;
    
    const res = await axios.get(`http://127.0.0.1:8000/api/get_orderById/${orderId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.data.data; // تأكد من أن هذا يعود بالبيانات الصحيحة
});
//................................................................................
export const fetchDeleteOrder = createAsyncThunk('orderSlice/fetchDeleteOrder',async(orderId,{getState})=>{
    const {auth}=getState();
    const token = auth.token;
    const res =await axios.delete(`http://127.0.0.1:8000/api/delete_order/${orderId}`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return orderId;
})
//....................................................................................
export const fetchGetAllOrderProducts = createAsyncThunk('orderSlice/fetchGetAllOrderProducts',async(_,{getState})=>{
const {auth}= getState();
const token = auth.token;
const res= await axios.get('http://127.0.0.1:8000/api/get_all_order_product',{
    headers:{
        Authorization: `Bearer ${token}`
    }
})
return res.data
})
//...................................................................................

export const fetchGetOrderProductsById = createAsyncThunk(
    'orderSlice/fetchGetOrderProductsById',
    async (orderId, { getState }) => {
        const { auth } = getState();
        const token = auth.token;

        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/get_order_product_byId/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('API Response:', response.data); // Log the entire response

            // Return the products array correctly
            if (response.data && response.data.products) {
                return response.data; // Return the whole data, including products and details
            }
            

            throw new Error('Invalid response from server');
        } catch (error) {
            console.error('API Error:', error.response ? error.response.data : error.message);
            throw new Error('Failed to fetch products');
        }
    }
);
//.....................................................................................
export const fetchActive= createAsyncThunk('orderSlice/fetchActive',async({orderId,newOrder},{getState})=>{
    const {auth}= getState();
    const token= auth.token;
    const res= await axios.put(`http://127.0.0.1:8000/api/updateStateOrder/${orderId}`, newOrder,{
        headers:{
            Authorization : `Bearer ${token}`
        }

    })
    return res.data.data;
})

export const orderSlice=createSlice({
    name:'orderSlice',
    initialState:{
        loading: false,
        error: null,
        orderDetails: [],
        orders: [],},
        reducers:{
            setOrders(state, action) {
                state.orders = action.payload; // Set the fetched order data
            },
        },
extraReducers:(builder)=>{
builder
.addCase(fetchAllOrders.pending, (state) => {
    state.loading = true;
    state.error = null;
})
.addCase(fetchAllOrders.fulfilled, (state, action) => {
    state.loading = false;
    state.orders = action.payload;
})
.addCase(fetchAllOrders.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message;
})
.addCase(fetchGetAllOrderProducts.pending, (state) => {
    state.loading = true;
    state.error = null;
})
.addCase(fetchGetAllOrderProducts.fulfilled, (state, action) => {
    state.loading = false;
    state.orders = action.payload;
})
.addCase(fetchGetAllOrderProducts.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message;
})
.addCase(fetchGetOrderById.pending, (state) => {
    state.loading = true;
    state.error = null;
})
.addCase(fetchGetOrderById.fulfilled, (state, action) => {
    state.loading = false;
    state.orderDetails = action.payload;
})
.addCase(fetchGetOrderById.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message;
})
.addCase(fetchGetOrderProductsById.pending, (state) => {
    state.loading = true;
    state.error = null;
})
.addCase(fetchGetOrderProductsById.fulfilled, (state, action) => {
    state.loading = false;
    state.orderDetails = action.payload;
})
.addCase(fetchGetOrderProductsById.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message;
})
.addCase(fetchAllOrderProducts.pending, (state) => {
    state.loading = true;
    state.error = null;
})
.addCase(fetchAllOrderProducts.fulfilled, (state, action) => {
    state.loading = false;
    state.orders = action.payload;
})
.addCase(fetchAllOrderProducts.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message;
})
.addCase(fetchAddOrder.pending, (state) => {
    state.loading = true;
    state.error = null;
})
.addCase(fetchAddOrder.fulfilled, (state, action) => {
    console.log('Current orders state:', state.orders); // طباعة الحالة الحالية
    state.orders.push(action.payload.order);
})
.addCase(fetchAddOrder.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message;

})
.addCase(fetchadd_order_product.pending, (state) => {
    state.loading = true;
    state.error = null;
})
.addCase(fetchadd_order_product.fulfilled, (state, action) => {
    state.loading = false;
    state.orders.push( action.payload);
})
.addCase(fetchadd_order_product.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message;

})
.addCase(fetchDeleteOrder.pending, (state) => {
    state.loading = true;
    state.error = null;
})
.addCase(fetchDeleteOrder.fulfilled, (state, action) => {
    state.loading = false;
   state.orders= state.orders.filter( order=>(order.id !==action.payload));
})
.addCase(fetchDeleteOrder.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message;

})
.addCase(fetchActive.pending, (state) => {
    state.loading = true;
    state.error = null;
})
.addCase(fetchActive.fulfilled, (state, action) => {
    state.loading = false;
   const index=state.orders.findIndex(order=>order.id === action.payload)
if(index !== -1){
    state.orders[index]={
    ...state.orders[index],
    ...action.payload}
}
else{
    state.orders.push(action.payload);
}
})
.addCase(fetchActive.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message;

})
}
})
export const { setOrders } = orderSlice.actions;
export default orderSlice.reducer

