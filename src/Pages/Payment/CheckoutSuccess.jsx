import { AiFillCheckCircle } from "react-icons/ai"
import HomeLayout from "../../Layout/HomeLayout"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { getUserData } from "../../Redux/Slices/AuthSlice";
import { useEffect } from "react";
function CheckoutSuccess(){

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getUserData())
    })
    
    return(
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center text-white">
                <div className=" w-80 h-[26rem] flex flex-col justify-center items-center shadow-[0_0_10px_black] rounded-lg relative">
                    <h1 className=" absolute text-center top-0 bg-green-500 w-full py-4 rounded-tl-lg rounded-tr-lg text-2xl font-bold">Payment successfull</h1>
                    <div className="px-4 flex flex-col items-center justify-center space-y-2">
                        <div className="text-center space-y-2">
                            <h2 className="text-lg font-semibold">
                                Welcome to the pro bundle
                            </h2>
                            <p className="text-left">
                                Now you can enjoy all the courses.
                            </p>
                        </div>
                        <AiFillCheckCircle className=" text-green-500 text-5xl"/>
                    </div>

                    <Link to="/" className=" bg-green-500 hover:bg-green-600 transition-all duration-300 ease-ou absolute bottom-0 w-full py-2 text-center text-lg rounded-bl-lg rounded-br-lg font-semibold">
                        <button>Go to dashboard</button>
                    </Link>
                </div>
            </div>
        </HomeLayout>
    )
}

export default CheckoutSuccess