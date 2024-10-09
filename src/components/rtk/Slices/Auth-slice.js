
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk(
    'auth/login',
    async (credentials) => {
        const response = await axios.post('http://127.0.0.1:8000/api/login', credentials);
        return response.data; 
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        user: null,
        role : null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload.data.user; 
            state.role = action.payload.data.role; 
            state.token = action.payload.data.token; 
            // تأكد من الوصول بشكل صحيح إلى التوكن
        console.log("User logged in. Token:", state.token);
        console.log("User logged in. role:", state.role);
        });
    }
});

export default authSlice.reducer;