import { useDispatch } from "react-redux";
import HomeLayout from "../../Layout/HomeLayout"
import { forgotPassword } from "../../Redux/Slices/AuthSlice";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { isEmail } from "../../helpers/regexMatcher";
import toast from "react-hot-toast";

function ForgetPassword(){
    const dispatch = useDispatch();
    
    const [data, setData] = useState({
        email: "",
    });

    async function handleUserInput(e){
        const {name,value} = e.target;
        console.log(data);
        setData({
            ... data,
            [name]:value
        })
    }

    async function onSubmit(e){
        e.preventDefault()

        // checking for the empty field
        if (!(data.email)) {
         toast.error("Email is mandatory");
         return;
        }

        // checking the valid email
        if(!isEmail(data.email)){
           toast.error("Invalid email id")
           return;
        }

        const res = await dispatch(forgotPassword(data))
        setData("")
    }

    return(
        <HomeLayout>
            <div className="flex  items-center justify-center h-[100vh]">
                <form noValidate onSubmit={onSubmit}>
                    <div className="flex  flex-col items-center text-white justify-center shadow-[0_0_10px_black] gap-2 px-4 py-2">
                        <h1 className="text-xl font-bold">
                            Forget Password
                        </h1>
                        <div className="w-full">
                            <label className=" text-lg text-white font-semibold" htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                id="email"
                                placeholder="Enter your email"
                                className="px-2 py-2 w-full mt-2 bg-transparent border rounded-lg"
                                value={data.email}
                                onChange={handleUserInput}
                            />
                        </div>


                        <button type="submit"  className="w-80 px-2 py-2 mt-2 text-white font-semibold cursor-pointer bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-200 rounded-lg">
                            Forgot password
                        </button>

                        
                        <Link to={"/user/profile"}>
                            <p className="link text-blue-600 cursor-pointer mb-1 flex items-center justify-center w-full gap-2">
                                <AiOutlineArrowLeft /> Back to profile
                            </p>
                        </Link>
                    </div>

                </form>
            </div>
        </HomeLayout>
    )
}

export default ForgetPassword