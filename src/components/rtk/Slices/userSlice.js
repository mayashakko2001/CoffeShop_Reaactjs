import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllUsers = createAsyncThunk(
    'userSlice/fetchAllUsers',
    async (_, { getState }) => {
        const { auth } = getState();
        const token = auth.token;

        const response = await axios.get('http://127.0.0.1:8000/api/get_all_user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log("API response:", response.data); // Log for debugging
        return response.data.data; // Return the users array from the response
    }
);
//...........................................................................................
export const fetchGetUserById = createAsyncThunk(
    'userSlice/fetchGetUserById',
    async (userId, { getState }) => {
        const { auth } = getState();
        const token = auth.token;

        const response = await axios.get(`http://127.0.0.1:8000/api/get_user_byId/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        return response.data.data; // Expecting the user data
    }
);
//..........................................................................................
export const fetchRegisterAdmin = createAsyncThunk(
    'userSlice/fetchRegisterAdmin',
    async (newAdmin) => {
        const response = await axios.post(`http://127.0.0.1:8000/api/register_admin`, newAdmin);
        return response.data;
    }
);
//............................................................................................
export const fetchRegisterCustomer = createAsyncThunk(
    'userSlice/fetchRegisterCustomer',
    async (newUser) => {
        const response = await axios.post(`http://127.0.0.1:8000/api/register_customer`, newUser);
        return response.data
    }
);
//............................................................................................
export const fetchDeleteUser =createAsyncThunk('userSlice/fetchDeleteUser',async(userId,{getState ,dispatch})=>{
    const {auth} =getState();
    const token = auth.token;
    const res =await axios.delete(`http://127.0.0.1:8000/api/delete_user/${userId}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }

    })
    return userId;
})
//...........................................................................................


export const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        users: [],
        currentUser: null,
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            // Handling fetch all users
            .addCase(fetchAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                console.log("Fetched users:", action.payload); // Debugging output
                state.loading = false;
                state.users = action.payload; // This will now be the array of users
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                console.log("Error fetching users:", action.error);
                state.loading = false;
                state.error = action.error.message; // Keep the error message
            })
            // Handling fetch single user
            .addCase(fetchGetUserById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGetUserById.fulfilled, (state, action) => {
                console.log("Fetched user:", action.payload); // Debugging output
                state.loading = false;
                state.currentUser = action.payload;
            })
            .addCase(fetchGetUserById.rejected, (state, action) => {
                console.log("Error fetching user:", action.error);
                state.loading = false;
                state.error = action.error.message; // Keep the error message
            })
            // Handling register admin
            .addCase(fetchRegisterAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRegisterAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(fetchRegisterAdmin.rejected, (state, action) => {
                console.log("Error adding admin:", action.error);
                state.loading = false;
                state.error = action.error.message; // Keep the error message
            })
            // Handling register customer
            .addCase(fetchRegisterCustomer.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRegisterCustomer.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(fetchRegisterCustomer.rejected, (state, action) => {
                console.log("Error adding user:", action.error);
                state.loading = false;
                state.error = action.error.message; // Keep the error message
            })
            .addCase(fetchDeleteUser.fulfilled, (state, action) => {
                console.log("Error adding user:", action.error);
                state.loading = false;
              state.users= state.users.filter(users=>users.id !== action.payload)
            });
    }
});

export default userSlice.reducer;