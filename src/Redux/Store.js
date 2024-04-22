import {configureStore} from '@reduxjs/toolkit'

import authSliceReducer from './Slices/AuthSlice'
import courseSliceReducer from './Slices/CourseSlice';
import paymentSliceReducer from './Slices/RazorpaySlice'
const store =configureStore({
    reducer:{
        auth:authSliceReducer,
        course:courseSliceReducer,
        razorpay:paymentSliceReducer
    },
    devTools:true
});

export default store