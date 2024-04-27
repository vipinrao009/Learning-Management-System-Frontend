import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../../helpers/axiosInstance'
import { toast } from "react-hot-toast"

const initialState = {
    courseData:[]
}

export const getAllCourses = createAsyncThunk("/course/delete",async ()=> {
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

export const deleteCourse = createAsyncThunk("/course/get",async (id)=> {
    try {
        const response = axiosInstance.delete(`/course/${id}`);
        toast.promise(response, {
            loading:"deleting course data...",
            success:"Course delete successfully",
            error:"Failed to delete the course"
        })
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const createNewCourse = createAsyncThunk("/course/create",async(data)=>{
    try {
        const formData = new FormData();
        formData.append("title",data?.title)
        formData.append("description",data?.description)
        formData.append("category",data?.category)
        formData.append("createdBy",data?.createdBy)
        formData.append("thumbnail",data?.thumbnail)

        const response = axiosInstance.post('/course',formData)

        toast.promise(response,{
            loading:"Creating new course...",
            success:"Created course successfully..",
            error:"Failed to create course.."
        })

        return (await response).data
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