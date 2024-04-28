import { useState } from "react";
import HomeLayout from "../Layout/HomeLayout";
import {useDispatch} from "react-redux"
import {BsPersonCircle } from "react-icons/bs";
import { Form, Link, useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast"
import { createAccount } from '../Redux/Slices/AuthSlice';
import { isEmail, isValidPassword } from "../helpers/regexMatcher";

function SignUp(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [signupData, setSignupData] = useState({
        fullName: "",
        email: "",
        password: "",
        avatar: ""
    });

    const [previewImage, setPreviewImage] = useState("");

    function handleUserInput(e) {
        const {name,value} = e.target // html element mil jayega
        setSignupData({
            ... signupData,
            [name]:value
        })
    }

    function getImage(event) {
        event.preventDefault();
        //getting the image
        const uploadImage = event.target.files[0]

        if(uploadImage){
            setSignupData({
                ... signupData,
                avatar:uploadImage
            });

            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadImage);
            fileReader.addEventListener("load",function() {
                setPreviewImage(this.result)
            })
        }
    }

    async function createNewAccount(event) {
        event.preventDefault() //form ka event subbmission par by default refresh karane ki koshis karata aur ham aisa nahi chahate hai ki page refresh hokhe page that's why i am using this 

        if(!signupData.email || !signupData.password || !signupData.fullName || !signupData.avatar){
            toast.error("Please fill all the details!!")
            return;
        }
        
        // checking the name field length
        if(signupData.fullName.length <5){
            toast.error("Name should be atleast of 5 charactors")
            return;
        }
        
        // checking the valid email
        if(!isEmail(signupData.email)){
            toast.error("Invalid email id")
        }

        //checking password validation
        if(!isValidPassword(signupData.password)){
            toast.error("Password should be at least one uppercase letter, one lowercase letter, one special character, and one number")
        }

        const formData = new FormData();
        formData.append("fullName",signupData.fullName)
        formData.append("email",signupData.email)
        formData.append("password",signupData.password)
        formData.append("avatar",signupData.avatar)

        //dispatch create account action

        const response = await dispatch(createAccount(formData))
        console.log(response)

        if(response?.payload?.success){
            navigate("/")
        }

        setSignupData({
            fullName: "",
            email: "",
            password: "",
            avatar: ""
        })

        setPreviewImage("")
    }
    return(
        <HomeLayout>
            <div className="flex overflow-x-auto items-center justify-center h-[100vh]">
                <form noValidate onSubmit={createNewAccount} className="flex items-center justify-center flex-col gap-3 rounded-lg text-white w-96 shadow-[0_0_10px_black]">
                    <h1 className="text-2xl mt-2 font-bold text-center">Registration Form</h1>
                    <label htmlFor="image_uploads" className="cursor-pointer">
                        {previewImage ? (
                            <img className="h-24 w-24 rounded-full m-auto " src={previewImage}/>
                        ):(
                            <BsPersonCircle className="h-24 w-24 rounded-full m-auto"/>  
                        )}
                    </label>

                    <input
                        onChange={getImage}
                        type="file"
                        className="hidden"
                        id="image_uploads"
                        name="image_uploads"
                        accept=".jpg,.jpeg, .png, .svg" 
                    />

                    <div className="flex w-80 flex-col gap-1">
                        <label htmlFor="fullName" className=" font-semibold">Name</label>
                        <input 
                           type="fullName"
                           required
                           name="fullName"
                           id="fullName"
                           placeholder="Enter your name"
                           className=" bg-transparent px-2 py-1 border"
                           onChange={handleUserInput}
                           value={signupData.fullName}
                         />
                    </div>

                    <div className="flex w-80 flex-col gap-1">
                        <label htmlFor="email" className=" font-semibold">Email</label>
                        <input 
                           type="email"
                           required
                           name="email"
                           id="email"
                           placeholder="Enter your email"
                           className=" bg-transparent px-2 py-1 border"
                           onChange={handleUserInput}
                           value={signupData.email}
                         />
                    </div>
                    
                    <div className="flex w-80 flex-col gap-1">
                        <label htmlFor="password" className=" font-semibold">Password</label>
                        <input 
                           type="password"
                           required
                           name="password"
                           id="password"
                           placeholder="Enter your password"
                           className=" bg-transparent px-2 py-1 border"
                           onChange={handleUserInput}
                           value={signupData.password}
                         />
                    </div>

                    <button type="submit"  className="w-80 px-2 py-2 mt-2  font-semibold cursor-pointer bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-200 rounded-sm">
                        Create account
                    </button>

                    <p className="mb-3">
                        Already have an account ? <Link to='/login' className=" text-accent cursor-pointer">Login</Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    )
}

export default SignUp