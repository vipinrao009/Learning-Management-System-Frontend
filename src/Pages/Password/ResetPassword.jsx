import { useDispatch } from "react-redux";
import HomeLayout from "../../Layout/HomeLayout"
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { resetPassword } from "../../Redux/Slices/AuthSlice";



function ResetPassword(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token} = useParams();
    
    const [data,setData] = useState({
        password:"",
        resetToken:token
    })

    async function handleUserInput(e){
        const {name,value} = e.target;
        setData({
            ... data,
            [name]:value
        })
    }

    async function onSubmit(e){
        e.preventDefault();
        
        try {
            // Assuming dispatch returns a promise
            await dispatch(resetPassword({ resetToken: data.resetToken, password: data.password })); //
            navigate("/login");
        } catch (error) {
            // Handle any errors that occur during dispatching or navigation
            console.error("An error occurred:", error);
        }
    }
    

    return(
        <HomeLayout>
            <div className="flex  items-center justify-center h-[90vh]">
                <form  onSubmit={onSubmit}>
                    <div className="flex  flex-col items-center justify-center shadow-[0_0_10px_black] gap-2 px-4 py-2">
                        <h1 className="text-xl text-white font-bold">
                            Reset password
                        </h1>

                        <div className="w-full">
                            <label className="text-xl text-white font-semibold" htmlFor="password">New password</label>
                            <input 
                                type="password" 
                                name="password" 
                                id="password"
                                placeholder="Enter new password"
                                className="px-2 py-2 w-full mt-2 bg-transparent border rounded-lg"
                                value={data.password}
                                onChange={handleUserInput}
                            />
                        </div>

                        <button type="submit"  className="w-full px-2 py-2 mt-2 mb-2 text-white font-semibold cursor-pointer bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-200 rounded-lg">
                            Update
                        </button>
                    </div>

                </form>
            </div>
        </HomeLayout>
    )
}

export default ResetPassword