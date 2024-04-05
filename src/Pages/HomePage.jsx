import { Link } from "react-router-dom"
import HomeLayout from "../Layout/HomeLayout"

function HomePage(){
    return(
        // as child props pass kar rahe ho HomeLayout ke ander && aur vo as child jayega HomeLayout ko milega and uska access nhi hoga 
        <HomeLayout> 
            <div className="pt-10 text-white flex items-center justify-center gap-10 mx-16 h-[90vh]">
                <div className="w-1/2 space-y-6">
                    <h1 className="text-4xl font-semibold">
                        Find out best
                        <span className="text-yellow-500 font-bold">
                            Online Course
                        </span>
                    </h1>

                    <p className="text-xl text-gray-200">
                        We have large libray of the courses taught by highly skilled and qualified faculities at a very affordable cost
                    </p>

                    <div className=" space-x-6">
                        <Link to={"/courses"}>
                            <button className=" bg-yellow-500 rounded-md px-5 py-3 text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300 ">
                                Explore courses
                            </button>
                        </Link>

                        <Link to={"/contact"}>
                            <button className=" border border-yellow-600 rounded-md px-5 py-3 text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
                                Contact Us
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="w-1/2 flex items-center justify-center">
                    <img src="https://raw.githubusercontent.com/singhsanket143/lms-frontend-hn/2c0f069530145b61c2a378ea113abb97ae919f43/src/Assets/Images/homePageMainImage.png" alt="" />
                </div>
            </div>
        </HomeLayout>
    )
}

export default HomePage

