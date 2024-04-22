import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { getUserData, updateProfile } from "../../Redux/Slices/AuthSlice";
import HomeLayout from "../../Layout/HomeLayout"
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";

function EditProfile(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [data, setData] = useState({
        previewImage:"",
        fullName:"",
        avatar:undefined,
        userId:useSelector((state)=>state?.auth?.data?._id)
    })

    function handleInputImage(e){
        e.preventDefault()
        const uploadedImage = e.target.files[0]
        if(uploadedImage){
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage)

            fileReader.addEventListener("load",function(){
                setData({
                    ... data,
                    previewImage:this.result,
                    avatar:uploadedImage
                })
            })
        }
    }


    function handleInput(e) {
        const {name, value} = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    async function onFormSubmit(e){
        e.preventDefault();
        if(!data.avatar && !data.fullName){
            toast.error("All field are mandatory")
        }

        const formData = new FormData()
        formData.append("fullName",data.fullName)
        formData.append("avatar",data.avatar)
        
        console.log(formData.entries().next())
        console.log(formData.entries().next())
        await dispatch(updateProfile([data.userId, formData]));
        await dispatch(getUserData())
        console.log(getUserData());

        navigate("/user/profile")
    }


    return(
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
                <form onSubmit={onFormSubmit} className="flex flex-col justify-center gap-5 rounded p-4 text-white w-80 min-h-[26rem] shadow-[0_0_10px_black]">
                    <h1 className="text-center text-lg font-semibold">Edit profile</h1>
                    <label htmlFor="image_upload" className="cursor-pointer">
                        {data.previewImage ? (
                            <img 
                               className="w-28 h-28 rounded-full m-auto"
                               src={data.previewImage}
                               alt="" />
                        ):(
                            <BsPersonCircle className="w-28 h-28 rounded-full m-auto"/>
                        )}
                    </label>

                    <input 
                        type="file"
                        id="image_upload"
                        name="image_upload"
                        hidden
                        onChange={handleInputImage}
                        accept=".jpg, .png, .svg, .jpeg"
                    />

                    <div className="flex flex-col gap-1">
                        <label className=" font-semibold text-lg" htmlFor="fullName">Full Name</label>
                        <input 
                            formNoValidate
                            required
                            type="text"
                            id="fullName"
                            name="fullName"
                            placeholder="Enter your full name"
                            value={data.fullName}
                            onChange={handleInput}
                            className="bg-transparent py-1 px-2 border"
                        />
                    </div>

                    <button className="bg-yellow-500 text-lg font-semibold rounded-sm hover:bg-yellow-600 transition-all ease-in-out duration-300 py-2 px-1 ">
                        Update Profile
                    </button>

                    <Link to={"/user/profile"}>
                        <p className="flex items-center justify-center link text-accent gap-1 w-full">
                            <AiOutlineArrowLeft/> go back to profile
                        </p>
                    </Link>
                </form>
            </div>

            
        </HomeLayout>
    )
}



export default EditProfile


