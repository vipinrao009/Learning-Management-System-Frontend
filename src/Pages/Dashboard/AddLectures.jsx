import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layout/HomeLayout";
import { useDispatch } from "react-redux";
import {useEffect, useState} from "react"
import toast from "react-hot-toast";
import { addCourseLecture } from "../../Redux/Slices/LectureSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";

function AddLectures(){

    const courseDetails = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log(courseDetails?.state._id);
    
    const [userInput,setUserInput] = useState({
        id:courseDetails?.state._id,
        lecture:undefined,
        title:"",
        description:"",
        videoSrc:""
    })

    function handleInputChange(e){
        const {name,value} = e.target
        setUserInput({
            ... userInput,
            [name] : value
        })
    }

    function handleVideo(e){
        const video = e.target.files[0]
        const source = window.URL.createObjectURL(video)  //to preview an image or video before uploading it.
        
        setUserInput({
            ... userInput,
            lecture:video,
            videoSrc:source
        })
    }

    async function onFormSubmit(e){
        e.preventDefault() //stop the automatically refresh
        if(!userInput.title || !userInput.description || !userInput.lecture){
            toast.error("All field are mandatory...")
            return
        }

        const response = await dispatch(addCourseLecture(userInput))
        if(response?.payload?.success){
            navigate(-1)
            setUserInput({
                id:courseDetails?.state._id,
                lecture:undefined,
                title:"",
                description:"",
                videoSrc:""
            })
        }
    }

    useEffect(()=>{
        if(!courseDetails) navigate("/courses")
    },[])

    return(
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center text-white gap-10 mx-16">
               <div className="flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 ">
                    <header className="flex items-center justify-center relative">
                        <button onClick={()=> navigate(-1)} className=" left-2 text-xl text-green-500 absolute">
                            <AiOutlineArrowLeft/>
                        </button>
                        <h1 className="text-yellow-500 font-semibold text-xl">
                            Add lecture
                        </h1>
                    </header>

                    <form onSubmit={onFormSubmit} className="flex flex-col gap-3">
                        <input 
                           type="text"
                           name="title"
                           placeholder="Enter the title of the lecture"
                           onChange={handleInputChange}
                           className=" bg-transparent px-3 py-1 border"
                           value={userInput.title}
                        />

                        <textarea 
                           type="text"
                           name="description"
                           placeholder="Enter the description of the lecture"
                           onChange={handleInputChange}
                           className=" bg-transparent px-3 py-1 border resize-none overflow-y-scroll h-36"
                           value={userInput.description}
                        />

                        {userInput.videoSrc ? (
                            <video 
                                muted
                                src={userInput.videoSrc}
                                controls
                                controlsList="nodownload"
                                disablePictureInPicture
                                className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                            >
                            </video>
                        ):(
                            <div className=" h-48 border flex items-center justify-center cursor-pointer">
                                <label className="font-semibold text-xl cursor-pointer" htmlFor="lecture">Choose your video</label>
                                <input 
                                   type="file"
                                   name="lecture"
                                   id="lecture"
                                   onChange={handleVideo}
                                   accept="video/mp4 video/x-mp4 video/*"
                                   className="hidden"
                                />
                            </div>
                        )}

                        <button type="submit" className="btn btn-primary text-xl font-semibold text-white">
                            Add new lecture
                        </button>

                    </form>
               </div>
            </div>
        </HomeLayout>
    )
}

export default AddLectures