import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../../helpers/axiosInstance'
import { toast } from "react-hot-toast"

const initialState = {
    courseData:[]
}

export const getAllCourses = createAsyncThunk("/course/get",async ()=> {
    try {
        const response = axiosInstance.get("/course");
        toast.promise(response, {
            loading:"loading courses data...",
            success:"loaded courses data successfully",
            error:"Failed to get the courses"
        })

        return (await response).data.course;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

const courseSlice = createSlice({
    name:"courses",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getAllCourses.fulfilled, (state, action) => {
            if(action.payload) {
                state.courseData = [...action.payload];
            }
        })
    }
})

export default courseSlice.reducer