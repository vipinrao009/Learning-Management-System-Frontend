import {configureStore} from '@reduxjs/toolkit'

import authSliceReducer from './Slices/AuthSlice'
import courseSliceReducer from './Slices/CourseSlice';
import paymentSliceReducer from './Slices/RazorpaySlice'
import LectureSliceReducer from './Slices/LectureSlice';
const store =configureStore({
    reducer:{
        auth:authSliceReducer,
        course:courseSliceReducer,
        razorpay:paymentSliceReducer,
        lecture:LectureSliceReducer
    },
    devTools:true
});

export default store