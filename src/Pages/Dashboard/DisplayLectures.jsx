import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layout/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteCourseLecture, getCourseLecture } from "../../Redux/Slices/LectureSlice";


function DisplayLectures(){
    const navigate = useNavigate();
    const {state} = useLocation();
    const dispatch = useDispatch();
    const {lectures} = useSelector((state)=>state?.lecture) || {}
    const {role} = useSelector((state)=>state?.auth)
 
    const [currentVideo,setCurrentVideo] = useState(0);

    async function onDeleteLecture(courseId,lectureId){
        console.log({courseId,lectureId});
        await dispatch(deleteCourseLecture({courseId:courseId, lectureId:lectureId}))
        dispatch(getCourseLecture(state._id))
    }
    useEffect(()=>{
        console.log(lectures);
        console.log({state});
        if(!state) navigate("/courses")
        dispatch(getCourseLecture(state._id))
    },[])
    return(
        <HomeLayout>
            <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white">
                
                <div className="text-yellow-500 flex items-center mx-3 justify-center font-semibold text-2xl">
                    Course Name : {state?.title}
                </div>

                { (lectures && lectures.length > 0) ?
                    (<div className=" p-3 lg:flex justify-center w-full gap-10">
                        {/* Left section for the playing the videos and displaying the course details to the  admin */}
                        <div className="space-y-5 lg:w-[60%] p-2 rounded-lg shadow-[0_0_10px_black]">
                                <video 
                                    src={lectures && lectures[currentVideo]?.lecture?.secure_url}
                                    className=" object-fill w-full rounded-tl-lg rounded-tr-lg"
                                    controls
                                    disablePictureInPicture
                                    muted
                                    controlsList="nodownload"
                                >
                                </video>
                                <div>
                                    <h1>
                                        <span className="text-yellow-500">Title : {" "}
                                        </span>
                                        {lectures && lectures[currentVideo]?.title}
                                    </h1>
                                    <p>
                                        <span>
                                            Description : {" "}
                                        </span>
                                        {lectures && lectures[currentVideo]?.description}
                                    </p>
                                </div>
                            </div>

                        {/* Right section for displaying the lectures */}
                        <ul className="lg:w-[25%] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
                            <li className=" font-semibold text-xl text-yellow-500 flex items-center gap-12 justify-center">
                                <p>Lectures list</p>
                                {role === "ADMIN" && (
                                    <button onClick={() => navigate("/course/addlecture", {state: {...state}})} className=" bg-green-800 px-2 py-1 rounded-md font-semibold text-sm">
                                        Add new lecture
                                    </button>
                                )}
                            </li>

                            {lectures && lectures.map((lecture,idx)=>{
                                return(
                                    <li key={lecture._id} className=" space-y-2">
                                        <p className="cursor-pointer" onClick={() => setCurrentVideo(idx)}>
                                            <span>
                                                {" "} Lecture {idx+1} : {" "}
                                            </span>
                                            {lecture?.title}
                                        </p>
                                        {
                                            role=== "ADMIN" && (
                                                <button onClick={()=>onDeleteLecture(state?._id, lecture?._id)} className=" bg-red-700 px-2 py-1 rounded-md font-semibold text-sm">
                                                    Delete lecture
                                                </button>
                                            )
                                        }
                                    </li>
                                )
                            })
                            }
                        </ul>

                    </div>) :(
                        role === "ADMIN" && (
                            <button onClick={() => navigate("/course/addlecture", {state: {...state}})} className=" bg-green-800 px-2 py-1 rounded-md font-semibold text-sm">
                                Add new lecture
                            </button>
                        )
                    )
                }
            </div>
        </HomeLayout>
    )
}
export default DisplayLectures