import { useState } from "react";
import HomeLayout from "../Layout/HomeLayout";
import {useDispatch} from "react-redux"
import { Form, Link, useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast"
import { login } from '../Redux/Slices/AuthSlice';

function Login(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    function handleUserInput(e) {
        const {name,value} = e.target // html element mil jayega
        setLoginData({
            ... loginData,
            [name]:value
        })
    }

    async function onLogin(event) {
        event.preventDefault() //form ka event subbmission par by default refresh karane ki koshis karata aur ham aisa nahi chahate hai ki page refresh hokhe page that's why i am using this 

        if(!loginData.email || !loginData.password){
            toast.error("Please fill all the details!!")
            return;
        }
        
        // checking the valid email
        if(!
            loginData.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            toast.error("Invalid email id")
        }

        //dispatch create account action

        const response = await dispatch(login(loginData))
        console.log(response)

        if(response?.payload?.success){
            navigate("/")
        }

        setLoginData({
            email: "",
            password: ""
        })
    }
    return(
        <HomeLayout>
            <div className="flex overflow-x-auto items-center justify-center h-[100vh]">
                <form noValidate onSubmit={onLogin} className="flex items-center justify-center flex-col gap-3 rounded-lg text-white w-96 shadow-[0_0_10px_black]">
                    <h1 className="text-2xl mt-2 font-bold text-center">Login Page</h1>

                    <div className="flex w-80 flex-col gap-1">
                        <label htmlFor="email" className=" font-semibold">Email</label>
                        <input 
                           type="email"
                           required
                           name="email"
                           id="email"
                           placeholder="Enter your email"
                           className=" bg-transparent px-2 w-full py-2 border rounded-lg"
                           onChange={handleUserInput}
                           value={loginData.email}
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
                           className=" bg-transparent px-2 py-2 border rounded-lg"
                           onChange={handleUserInput}
                           value={loginData.password}
                         />
                    </div>

                    <p className="-mr-[12rem]">
                     <Link to='/forget-password' className="text-blue-600 cursor-pointer">Forgot password?</Link>
                    </p>

                    <button type="submit"  className="w-80 px-2 py-2 mt-2  font-semibold cursor-pointer bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-200 rounded-lg">
                        Login
                    </button>

                    <p className="mb-3">
                        Don't have an account ? <Link to='/signup' className=" text-blue-600 hover:text-blue-600 cursor-pointer">Sign Up</Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    )
}

export default Login