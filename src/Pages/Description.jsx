import { useEffect } from "react";
import { useLocation,Link, useNavigate} from "react-router-dom"
import HomeLayout from "../Layout/HomeLayout"
import { useSelector } from "react-redux";

function Description(){
    
    const navigate = useNavigate();
    const {state} = useLocation();
    const {role,data} = useSelector((state)=> state.auth)
    
    console.log({state});
    return(
        <HomeLayout>
            <div className="min-h-[90vh] pt-12 px-8 lg:px-20 flex flex-col items-center justify-center text-white">
                <div className=" order-2 lg:grid grid-cols-2 gap-10 py-10 relative">
                   
                    <h1 className="text-3xl font-bold text-yellow-500 mb-5 text-center lg:hidden">
                       {state?.title}
                    </h1>

                    <div className=" space-y-5">
                        <img 
                            src={state?.thumbnail?.secure_url}
                            alt="thumbnail"
                            className="w-full h-64"
                        />

                        <div className="space-y-5">
                            <div className="flex flex-col items-center justify-between text-xl">
                                <p className=" font-semibold">
                                    <span className=" text-yellow-500 font-bold">
                                        Total lectures : {" "}
                                    </span>
                                    {state?.numberOfLecture}
                                </p>

                                <p className=" font-semibold">
                                    <span className=" text-yellow-500 font-bold">
                                        Instructor : {" "}
                                    </span>
                                    {state?.createdBy}
                                </p>
                            </div>
                            {role === 'ADMIN' || data?.subscription?.status === 'active' ? (
                                <button onClick={()=> navigate("/course/displayLectures",{state:{... state}})} className=" bg-yellow-500 text-xl mt-2 rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-600 transition-all ease-in-out duration-300">
                                    Watch Lectures
                                </button>
                            ) :(

                                <Link to={"/checkout"}>
                                    <button className=" bg-yellow-500 text-xl mt-2 rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-600 transition-all ease-in-out duration-300">
                                        Subscribe
                                    </button>  
                                </Link>
                                    
                               
                            )}
                        </div>
                    </div>

                    <div className=" space-y-2 text-xl">
                        <h1 className="hidden sm:block text-3xl font-bold text-yellow-500 mb-5 text-center">
                          {state?.title}
                        </h1>
                        <p className=" text-yellow-500">Course description</p>
                        <p>{state?.description}</p>
                    </div>  
                </div>
            </div>
        </HomeLayout>
    )
} 

export default Description