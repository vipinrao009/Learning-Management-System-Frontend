import { useDispatch, useSelector } from "react-redux"
import HomeLayout from "../../Layout/HomeLayout"
import {Chart as chartJS , ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { deleteCourse, getAllCourses } from "../../Redux/Slices/CourseSlice"
import { getStatsData } from "../../Redux/Slices/StatSlice"
import { getPaymentRecord } from "../../Redux/Slices/RazorpaySlice"
import { Bar, Pie } from "react-chartjs-2"
import { FaUsers } from "react-icons/fa"
import { FcSalesPerformance } from "react-icons/fc"
import { GiMoneyStack } from "react-icons/gi"
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs"
import { Colors } from "chart.js"

chartJS.register(ArcElement,Colors, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

function AdminDashboard(){

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { allUsersCount, subscribedCount} = useSelector((state)=> state?.stat);
    const {allPayments, monthlySalesRecord} = useSelector((state)=> state?.razorpay)

    const userData = {
        labels: ["Registered User","Enrolled User"],
        datasets: [
            {
                label:"User Details",
                data:[allUsersCount,subscribedCount],
                backgroundColor:["yellow","green"],
                borderWidth:1,
                borderColor:["yellow","green"],
                Colors:"white"
            }
        ]
    }

    const salesData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        fontColor:"white",
        datasets:[
            {
                label:"Sales/Month",
                data:monthlySalesRecord,
                backgroundColor:["rgb(255,99,132)"],
                borderColor:["White"],
                borderWidth:1
            }
        ]
    }

    const myCourses = useSelector((state)=> state?.course?.courseData);


    async function onCourseDelete(id) {
        if(window.confirm("Are you sure you want to delete the course ? ")) {
            const res = await dispatch(deleteCourse(id));
            console.log({res});
            if(res?.payload?.success) {
                await dispatch(getAllCourses());
            }
        }
    }

    useEffect(()=>{
        (
            async ()=>{
                await dispatch(getAllCourses())
                await dispatch(getStatsData())
                await dispatch(getPaymentRecord())
            }
        )()
    },[])

    return(
        <HomeLayout>
            <div className="min-h-[100vh] pt-5  flex flex-col flex-wrap gap-10 text-white">
                <h1 className="text-[2rem] lg:text-5xl text-yellow-500 font-semibold text-center">
                    Admin Dashboard
                </h1>

                <div className="mx-10 m-auto gap-5 lg:grid grid-cols-2">
                    <div className="flex flex-col items-center shadow-[0_0_5px_gray] rounded-md p-5">
                        <div className="w-80 h-80">
                            <Pie data={userData}/>
                        </div>

                        <div className="grid grid-cols-2 mt-2 gap-5">
                            <div className="flex items-center justify-between gap-5 p-5 rounded-md shadow-md">
                                <div className="flex flex-col items-center">
                                    <p className="font-semibold">Registered User</p>
                                    <h3 className=" text-4xl font-bold">{allUsersCount}</h3>
                                </div>
                                <FaUsers className="text-yellow-500 text-5xl"/>
                            </div>

                            <div className="flex items-center justify-between gap-5 p-5 rounded-md shadow-md">
                                <div className="flex flex-col items-center">
                                    <p className="font-semibold">Subscribed User</p>
                                    <h3 className=" text-4xl font-bold" >{subscribedCount}</h3>
                                </div>
                                <FaUsers className="text-green-500 text-5xl"/>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center mt-6 lg:mt-0 gap-5 rounded-md px-2 shadow-[0_0_4px_gray]">
                        <div className="h-80 w-full relative">
                            <Bar className=" absolute bottom-0 h-80 w-full" data={salesData}/>
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            <div className="flex items-center justify-between gap-5 p-5 rounded-md shadow-md">
                                <div className="flex flex-col items-center">
                                    <p className="font-semibold">Subscription Count</p>
                                    <h3 className=" text-4xl font-bold">{allPayments?.count}</h3>
                                </div>
                                <FcSalesPerformance className="text-5xl"/>
                            </div>
                        
                            <div className="flex items-center justify-between gap-5 p-5 rounded-md shadow-md">
                                <div className="flex flex-col items-center">
                                    <p className="font-semibold">Total Revenue</p>
                                    <h3 className=" text-4xl font-bold">{allPayments?.count * 499}</h3>
                                </div>
                                <GiMoneyStack className="text-5xl"/>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="w-[80%] mx-10  flex items-center justify-center gap-10">
                    <div className="w-full flex items-center lg:justify-between">
                        <h1 className="text-center text-3xl font-semibold">
                            Course overview
                        </h1>

                        <button
                            onClick={()=>{navigate("/course/create")}} 
                            className="w-fit bg-yellow-500 hover:bg-yellow-600 ease-in-out duration-300 rounded-sm px-4 py-2 font-semibold text-lg cursor-pointer"   
                        >
                            Create new course
                        </button>
                    </div>
                </div>

                
                <div className="w-full overflow-x-auto">                 
                    <table className="table overflow-x-scroll text-center">
                        <thead>
                            <tr className="text-white text-base font-semibold">
                                <th>S No</th>
                                <th>Course Title</th>
                                <th>Course Category</th>
                                <th>Instructor</th>
                                <th>Total Lecture</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {myCourses ?.map((course,idx)=>{
                                return(
                                    <tr key={course._id}>
                                        <td>{idx+1}</td>
                                        <td>
                                            <textarea readOnly value={course?.title} className="w-40 h-auto bg-transparent resize-none"></textarea>
                                        </td>
                                        <td>
                                            {course?.category}
                                        </td>

                                        <td>
                                            {course?.createdBy}
                                        </td>

                                        <td>
                                            {course?.numberOfLecture}
                                        </td>

                                        <td className="max-w-28 mr-1 overflow-hidden text-ellipsis whitespace-nowrap">
                                            <textarea
                                                readOnly
                                                className="w-[7rem] p-1 h-auto bg-transparent resize-none"
                                                value={course?.description}
                                            ></textarea>
                                        </td>

                                        <td className="flex items-center justify-center gap-4">
                                            <button 
                                                className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 px-4 py-2 text-xl rounded-md font-bold"
                                                onClick={()=> navigate("/course/displayLectures", {state:{... course}})}>
                                                <BsCollectionPlayFill/>
                                            </button>

                                            <button 
                                                className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 px-4 py-2 text-xl rounded-md font-bold"
                                                onClick={()=>onCourseDelete(course._id)}>
                                                <BsTrash/>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

            </div>
        </HomeLayout>
    )
}

export default AdminDashboard