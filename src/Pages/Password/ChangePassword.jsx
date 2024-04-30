import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import { changePassword } from "../../Redux/Slices/AuthSlice";
import HomeLayout from "../../Layout/HomeLayout"
import { AiOutlineArrowLeft } from "react-icons/ai";
import {isValidPassword} from "../../helpers/regexMatcher"

function ChangePassword(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userPassword, setUserPassword] = useState({
        oldPassword: "",
        newPassword: "",
    });
    
    function handleUserInput(e){
        const {name , value } = e.target;
        setUserPassword({
            ... userPassword,
            [name] : value
        })
    }

    async function handleFormSubmit(event){
        event.preventDefault()

        if(!userPassword.oldPassword || ! userPassword.newPassword){
            toast.error("All fields are mandatory")
            return;
        }

        if(!isValidPassword(userPassword.newPassword)){
            toast.error("Password should be at least one uppercase letter, one lowercase letter, one special character, and one number")
            return
        }

        const res = await dispatch(changePassword(userPassword));

        // clearing the input fields
        setUserPassword({
            oldPassword: "",
            newPassword: "",
        });

        // redirecting to profile page if password changed
        if (res.payload.success) navigate("/user/profile");

    }
    return(
        <HomeLayout>
            <div className="flex items-center w-full justify-center h-[100vh]">
                <form 
                    onSubmit={handleFormSubmit}
                    className=" flex justify-center gap-3 shadow-[0_0_10px_black] flex-col w-80 p-4 rounded-md h-[23rem] text-white"
                    action=""
                >
                    <h1 className="text-2xl font-bold -mt-4 text-center">Change Password</h1>
                    <div className="flex flex-col gap-1">
                        <label className=" font-semibold text-lg" htmlFor="oldPassword">Old Password</label>
                        <input 
                            required
                            type="password"
                            id="oldPassword"
                            name="oldPassword"
                            placeholder="Enter your old password"
                            className=" bg-transparent border rounded-md py-2 px-2"
                            value={userPassword.oldPassword}
                            onChange={handleUserInput}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className=" font-semibold text-lg" htmlFor="newPassword">New password</label>
                        <input 
                            required
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            placeholder="Enter your new password"
                            className=" bg-transparent border rounded-md py-2 px-2"
                            value={userPassword.newPassword}
                            onChange={handleUserInput}
                        />
                    </div>
                    
                    <Link to={"/user/profile"}>
                        <p className="link text-blue-600 cursor-pointer flex items-center justify-center w-full gap-2">
                        <AiOutlineArrowLeft /> Back to Profile
                        </p>
                    </Link>

                    <button className="flex items-center mb-2 justify-center bg-yellow-500 py-2 px-2 text-lg font-semibold hover:bg-yellow-600 transition-all cursor-pointer ease-in-out duration-300 rounded-md">
                       Change Password
                    </button>

                    
                </form>
            </div>
        </HomeLayout>
    )
}

export default ChangePassword