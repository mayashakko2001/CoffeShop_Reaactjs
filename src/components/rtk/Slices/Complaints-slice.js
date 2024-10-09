import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchGetAllComp = createAsyncThunk(
    'ComplaintsSlice/fetchGetAllComp',
    async (_, { getState }) => {
        const { auth } = getState();
        const token = auth.token;
        const res = await axios.get('http://127.0.0.1:8000/api/get_all_complaints', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data.data;
    }
);
//.........................................................................................
export const fetchGetCompById = createAsyncThunk(
    'ComplaintsSlice/fetchGetCompById',
    async (copmId, { getState }) => {
        const { auth } = getState();
        const token = auth.token;

        const res = await axios.get('http://127.0.0.1:8000/api/get_complaint_byId/${copmId}', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("API Response:", res.data.data);
        return res.data.data;
    }
);
//..............................................................................................
export const fetchGteCompByUser =createAsyncThunk('ComplaintsSlice/fetchGteCompByUser',async(userId ,comp ,{getState ,dispatch})=>{
    const {auth}=getState();
    const token =auth.token;
    const res=await axios.get('http://127.0.0.1:8000/api/get_complaint_byUserId/${userId}',comp,{
        headers:{
            Authorization: `Bearer ${token}`
        }
        
    })
    return res.data.data;
})
//.........................................................................................
export const fetchAddComp = createAsyncThunk('fetchAddComp/fetchGteCompById', async (comp, { getState }) => {
    const { auth } = getState();
    const token = auth.token;

    if (!token) {
        throw new Error('No token found, please log in.');
    }

    console.log('Using token:', token); // تحقق من التوكن

    const res = await axios.post('http://127.0.0.1:8000/api/add_complaint', comp, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.data.data;
});
//......................................................................................
export const ComplaintsSlice=createSlice({
    name:'ComplaintsSlice',
    initialState:{
        complaints:[],
        loading:false,
        error:null,

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchGetAllComp.pending,(state,action)=>{
            state.loading = true
        })
        .addCase(fetchGetAllComp.fulfilled,(state,action)=>{
            state.loading = false;
            state.complaints=action.payload
        })
        .addCase(fetchGetAllComp.rejected,(state ,action)=>{
            state.loading = false;
            state.error=action.error.message
        })
        .addCase(fetchGetCompById.pending,(state,action)=>{
            state.loading = true
        })
        .addCase(fetchGetCompById.fulfilled,(state,action)=>{
            state.loading = false;
            state.complaints=action.payload
        })
        .addCase(fetchGetCompById.rejected,(state ,action)=>{
            state.loading = false;
            state.error=action.error.message
        })
        .addCase(fetchAddComp.pending,(state,action)=>{
            state.loading = true
        })
        .addCase(fetchAddComp.fulfilled,(state,action)=>{
            state.loading = false;
            state.complaints.push(action.payload)
        })
        .addCase(fetchAddComp.rejected,(state ,action)=>{
            state.loading = false;
            state.error=action.error.message
        })
        .addCase(fetchGteCompByUser.pending,(state,action)=>{
            state.loading = true
        })
        .addCase(fetchGteCompByUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.complaints=action.payload
        })
        .addCase(fetchGteCompByUser.rejected,(state ,action)=>{
            state.loading = false;
            state.error=action.error.message
        })

    }
})
export default ComplaintsSlice.reducer;