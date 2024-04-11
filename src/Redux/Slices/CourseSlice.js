import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../../helpers/axiosInstance'
import { toast } from "react-hot-toast"

const initialState = {
    courseData:[]
}

export const getAllCourses = createAsyncThunk("/course/get",async ()=> {
    try {
        const response = axiosInstance.get("/courses");
        toast.promise(response, {
            loading:"loading courses data...",
            success:"loaded courses data successfully",
            error:"Failed to get the courses"
        })

        return (await response).data.courses;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

const courseSlice = createSlice({
    name:"courses",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{

    }
})

export default courseSlice