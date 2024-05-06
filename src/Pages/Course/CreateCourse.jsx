import { useState } from "react";
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createNewCourse } from "../../Redux/Slices/CourseSlice";
import HomeLayout from "../../Layout/HomeLayout";
import { AiOutlineArrowLeft } from "react-icons/ai";

function CreateCourse(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userInput, setUserInput] = useState({
        title:"",
        category:"",
        createdBy:"",
        description:"",
        thumbnail:null,
        previewImage:""
    });

    function handleInputImage(e){
        e.preventDefault()
        const uploadedImage = e.target.files[0]
        if(uploadedImage){
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage)
            fileReader.addEventListener('load',function(){
                setUserInput({
                    ... userInput,
                    previewImage:this.result,
                    thumbnail:uploadedImage
                })
            })
        }
    }

    function handleUserInput(e){
        const {name,value} = e.target;
        setUserInput({
            ... userInput,
            [name]:value
        })
    }

    async function onFormSubmit(e){
        e.preventDefault()

        if(!userInput.title || !userInput.description || !userInput.thumbnail ||!userInput.createdBy){
            toast.error("All field are mandatory")
            return
        }

        const response = await dispatch(createNewCourse(userInput))
        if(response?.payload?.success){
            setUserInput({
                title:"",
                category:"",
                createdBy:"",
                description:"",
                thumbnail:null,
                previewImage:""
            })
            navigate("/courses")
        }        
    }
    return(
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
                <form onSubmit={onFormSubmit} className="flex flex-col mx-5 justify-center gap-5 rounded-lg p-4 text-white w-[700px] my-10 shadow-[0_0_10px_black] relative">   
                    
                    <Link onClick={()=>navigate(-1)} className="absolute  top-6 text-2xl link text-accent cursor-pointer">
                        <AiOutlineArrowLeft />
                    </Link>

                    <h1 className="text-center text-2xl font-bold">
                        Create New Course
                    </h1>

                    <main className="lg:grid grid-cols-2 gap-x-10">
                        <div className="gap-y-6">
                            <div>
                                <label htmlFor="image_uploade" className="cursor-pointer">
                                    {userInput?.previewImage ? (
                                        <img 
                                            className="w-full h-44 m-auto border"
                                            src={userInput.previewImage}
                                        />
                                    ):(
                                    <div className="w-full mt-4 h-48 m-auto flex items-center justify-center border">
                                            <h1 className="font-bold text-lg">Upload your course thumbnail</h1>
                                    </div>
                                    )}
                                </label>

                                <input 
                                    type="file"
                                    id="image_uploade"
                                    className="hidden"
                                    name="image_uploade"
                                    accept=".jpg, .jpeg, .png"
                                    onChange={handleInputImage}
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="title" className="text-lg font-semibold">
                                    Course title
                                </label>

                                <input 
                                    type="text"
                                    required
                                    name="title"
                                    id="title"
                                    placeholder="Enter the course title"
                                    className=" bg-transparent px-2 py-1 border"
                                    value={userInput.title}
                                    onChange={handleUserInput}
                                />

                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="flex mt-2 lg:-mt-2 flex-col gap-1">
                                <label htmlFor="createdBy" className="text-lg font-semibold">
                                    Course instructor
                                </label>

                                <input 
                                    type="text"
                                    required
                                    name="createdBy"
                                    id="createdBy"
                                    placeholder="Enter the course instructor"
                                    className=" bg-transparent px-2 py-2 border"
                                    value={userInput.createdBy}
                                    onChange={handleUserInput}
                                />

                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="category" className="text-lg font-semibold">
                                    Course category
                                </label>

                                <input 
                                    type="text"
                                    required
                                    name="category"
                                    id="category"
                                    placeholder="Enter the course category"
                                    className=" bg-transparent px-2 py-2 border"
                                    value={userInput.category}
                                    onChange={handleUserInput}
                                />

                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="description" className="text-lg font-semibold">
                                    Course Description
                                </label>

                                <textarea 
                                    type="text"
                                    required
                                    name="description"
                                    id="description"
                                    placeholder="Enter the course description"
                                    className="bg-transparent px-2 py-2 h-28 overflow-y-scroll resize-none border"
                                    value={userInput.description}
                                    onChange={handleUserInput}
                                />

                            </div>
                        </div>
                    </main>

                    <button formNoValidate type="submit" className="w-full py-3 px-2 font-semibold text-lg rounded-sm bg-yellow-500 hover:bg-yellow-600 cursor-pointer transition-all ease-in-out duration-300">
                        Create course
                    </button>
                    

                </form>
            </div>
        </HomeLayout>
    )
}

export default CreateCourse