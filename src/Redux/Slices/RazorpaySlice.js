
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../helpers/axiosInstance"
import toast from "react-hot-toast"

const initialState = {
    key:"",
    subscription_id: "",
    isPaymentVerified: false,
    allPayments: {},
    finalMonths: {},
    monthlySalesRecord: []
}


export const getRazorPayId = createAsyncThunk("/razorpay/getId",async()=>{
    try {
        const response = await axiosInstance.get("/payment/razorpaykey")
        // console.log({response});
        return(await response).data
    } catch (error) {
        toast.error("Failed to load data")
    }
})

export const purchaseCourseBundle = createAsyncThunk("/razorpay/purchaseCourse",async()=>{
    try {
        const response =await axiosInstance.post("/payment/subscribe")
        console.log(response.data);
        return(await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const verifyUserPayment = createAsyncThunk("/payment/verify",async(data)=>{
    try {
        const response = await axiosInstance.post("/payment/verify",{
            razorpay_payment_id : data.razorpay_payment_id,
            razorpay_subscription_id: data.razorpay_subscription_id,
            razorpay_signature:data.razorpay_signature
        })
        console.log(response.data);
        return response.data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const getPaymentRecord = createAsyncThunk("/payment/record",async(data)=>{
    try {
        const response = axiosInstance.get("/payment?count = 100")
        toast.promise(response,{
            loading:"Getting the payment record",
            success:(data)=>{
                return data?.data?.message
            },
            error:"Failed to get payments record"
        })
        return (await response).data 
    } catch (error) {   
        toast.error("Operation failed")
    } 
}) 

export const cancelCourseBundle = createAsyncThunk("/payments/cancel", async () => {
    try {
        const response = axiosInstance.post("/payment/cancel");
        toast.promise(response, {
            loading: "unsubscribing the bundle",
            success: (data) => {
                return data?.data?.message
            },
            error: "Failed to ubsubscrive"
        })
        return (await response).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }}
)

// const razorpaySlice = createSlice({
//     name:"razorpay",
//     initialsState,
//     reducers:{},                
//     extraReducers:(builder)=>{
//         builder
//         .addCase(getRazorPayId.fulfilled,(state,action)=>{
//             state.key = action?.payload?.key
//         })
//         .addCase(purchaseCourseBundle.fulfilled,(state,action)=>{
//             state.subscription_id = action?.payload?.subscription_id 
//         })
//         .addCase(verifyUserPayment.fulfilled,(state,action)=> {
//             toast.success(action?.payload?.message)
//             state.isPaymentVerified = action?.payload?.isPaymentVerified
//         })
//         .addCase(verifyUserPayment.rejected,(state,action)=> {
//             toast.success(action?.payload?.message)
//             state.isPaymentVerified = action?.payload?.isPaymentVerified
//         })
//         .addCase(getPaymentRecord.fulfilled,(state,action)=>{
//             state.allPayments = action?.payload?.allPayments
//             state.monthSalesRecord = action?.payload?.monthSalesRecord
//             state.finalMonths = action?.payload?.finalMonths
//         })
//     }
// })




const razorpaySlice = createSlice({
    name: "razorpay",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getRazorPayId.fulfilled, (state, action) =>{
            console.log();
            state.key = action?.payload?.key;
        })
        .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
            console.log(action?.payload?.subscription_id);
            state.subscription_id = action?.payload?.subscription_id;
        })
        .addCase(verifyUserPayment.fulfilled, (state, action) => {
            toast.success(action?.payload?.message);
            state.isPaymentVerified = action?.payload?.success;
        })
        .addCase(verifyUserPayment.rejected, (state, action) => {
            toast.success(action?.payload?.message);
            state.isPaymentVerified = action?.payload?.success;
        })
        .addCase(getPaymentRecord.fulfilled, (state, action) => {
            console.log({action})
            state.allPayments = action?.payload?.allPayment;
            state.finalMonths = action?.payload?.finalMonths;
            state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
        })
    }
});

export const {} = razorpaySlice.actions;
export default razorpaySlice.reducer




