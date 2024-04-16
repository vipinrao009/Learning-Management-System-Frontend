import {useSelector } from "react-redux"
import HomeLayout from "../../Layout/HomeLayout"
import { Link } from "react-router-dom";

function Profile(){
    
    const userData = useSelector((state)=>state?.auth?.data)
    console.log(userData);

    return(
        <HomeLayout>
            <div className=" min-h-[90vh] flex items-center justify-center">
                <div className="my-10 flex-col gap-4 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                    <img 
                        src={userData?.avatar?.secure_url}
                        className="w-40 m-auto rounded-full border border-black"
                    />

                    <h3 className="text-xl font-semibold py-1 text-center capitalize">
                        {userData?.fullName}
                    </h3>
                    
                    <div className="grid gap-[0.5px] grid-cols-2">
                        <p>Email: </p><p>{userData?.email}</p>
                        <p>Role: </p><p>{userData?.role}</p>
                        <p>Subscription: </p>
                        <p>{userData?.subscription?.status === "active" ? "Action" : "Inactive"}</p>
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-2">
                        <Link to="/changepassword"className="w-1/2 bg-yellow-500 hover:bg-yellow-600 text-center transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer">
                            <button>Change password</button>
                        </Link>

                        <Link to={"/user/editprofile"} className="w-1/2 bg-yellow-500 hover:bg-yellow-600 text-center  transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer">
                            <button>
                                Edit profile       
                            </button>
                        </Link>
                    </div>

                    {userData?.subscription?.status === "active" && (
                        <button className=" w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center">
                            Cancel Subscription
                        </button>
                    )}

                </div>
            </div>
        </HomeLayout>
    )
}

export default Profile


