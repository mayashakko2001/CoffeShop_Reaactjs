import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./Slices/products-slice";
import userReducer from "./Slices/userSlice"; 
import authReducer from "./Slices/Auth-slice"; 
import categoryReducer from"./Slices/Category-slice";
import complaintsReducer from "./Slices/Complaints-slice";
import orderReducer from "./Slices/order-slice";
import paymentReducer from "./Slices/payment-slice";
export const store = configureStore({
    reducer: {
        product: productReducer,
        userSlice: userReducer,
        auth: authReducer,
        categorySlice: categoryReducer,
        ComplaintsSlice: complaintsReducer,
        orderSlice: orderReducer,
        paymentSlice:paymentReducer

    },
});