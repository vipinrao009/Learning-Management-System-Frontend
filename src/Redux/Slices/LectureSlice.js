import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../helpers/axiosInstance"

const initialState = {
    lectures:[]
}

export const getCourseLecture = createAsyncThunk("/course/lecture/get",async(cid)=>{
    try {
        const response = axiosInstance.get(`/course/${cid}`)
        toast.promise(response,{
            loading:"Fetching course lectures",
            success:"Lectures fetched successfully...",
            error:"Failed t0 load the courses"
        })
        return (await response).data
        
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const addCourseLecture1 =  createAsyncThunk("/course/lecture/add",async(data)=>{
    console.log({data});
    try {
        const formData = new FormData();
        formData.append("lecture",data.lecture);
        formData.append("title",data.title);
        formData.append("description",data.description)

        const response = axiosInstance.post(`/course/${data.id}`,formData)
        toast.promise(response,{
            loading:"Adding course lecture in progress...",
            success:"Lecture added successfully...",
            error:"Failed to adding the lecture !!!!"
        })

        return (await response).data
    } catch (error) {
       toast.error(error?.response?.data?.message) 
    }
})

export const addCourseLecture = createAsyncThunk("/course/lecture/add", async (data) => {
    try {
        const formData = new FormData();
        formData.append("lecture", data.lecture);
        formData.append("title", data.title);
        formData.append("description", data.description);

        const response = axiosInstance.post(`/course/${data.id}`, formData);
        toast.promise(response, {
            loading: "adding course lecture",
            success: "Lecture added successfully",
            error: "Failed to add the lectures"
        });
        return (await response).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});

export const deleteCourseLecture =  createAsyncThunk("/course/lecture/delete",async(data)=>{
    console.log({data});
    try {
        const response = axiosInstance.delete(`/course?courseId=${data.courseId}&lectureId=${data.lectureId}`);
        toast.promise(response,{
            loading:"Deleting course lecture in progress...",
            success:"Lecture deleted successfully...",
            error:"Failed to delete the lecture !!!!"
        })

        return (await response).data
    } catch (error) {
       toast.error(error?.response?.data?.message) 
    }
})

const lectureSlice = createSlice({
    name:"lecture",
    initialState,
    reducers : {},
    extraReducers : (builder)=> {
        builder
        .addCase(getCourseLecture.fulfilled,(state,action)=>{
            console.log({action});
            state.lectures = action?.payload?.lectures
        })
        .addCase(addCourseLecture.fulfilled,(state,action)=>{
            console.log({action});
            state.lectures = action?.payload?.course?.lectures
        })
    }
})

export default lectureSlice.reducer