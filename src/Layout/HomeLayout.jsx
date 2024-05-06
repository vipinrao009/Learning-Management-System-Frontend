import { AiFillCloseCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi"
import { Link, useNavigate} from "react-router-dom";
import { useDispatch,useSelector } from "react-redux"
import Footer from "../Components/Footer";
import { logout } from "../Redux/Slices/AuthSlice";


function HomeLayout({ children }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //for checking if user is logged in
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

    //for displaying the option acc to the role
    const role = useSelector((state) =>state?.auth?.role)

   // function for changing the drawer width on menu button click
    function changeWidth() {
        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = 'auto';
    }

    // function to hide the drawer on close button click
    function hideDrawer() {
        const element = document.getElementsByClassName("drawer-toggle");
        element[0].checked = false;
        // collapsing the drawer-side width to zero
        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = '0';
    }
   
    // function to handle logout
    async function handleLogOut(e) {
        e.preventDefault();

        const res = await dispatch(logout())
        console.log(res);
        if(res?.payload?.success)

        navigate("/")
    }

    return (
        <div className="min-h-[90vh]">
            <div className="drawer absolute left-0 z-50 w-fit">
                <input className="drawer-toggle" id="my-drawer" type="checkbox" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer" className="cursor-pointer relative">
                        <FiMenu 
                            onClick={changeWidth}
                            size={"32px"}
                            className="font-bold text-white m-4"
                        />
                    </label>
                </div>
                <div className="drawer-side w-0">
                    <label htmlFor="my-drawer" className="drawer-overlay">
                    </label>
                    <ul className="menu h-[100%] p-4 w-48 sm:w-80 bg-base-200 text-white font-normal text-base relative">
                        <li className="w-fit absolute right-2 z-50">
                            <button onClick={hideDrawer}>
                                <AiFillCloseCircle size={24} />
                            </button>
                        </li>
                        <li>
                            <Link to="/">Home</Link>
                        </li>

                        {isLoggedIn && role ==='ADMIN' && (
                            <li>
                                <Link to={"/admin/dashboard"}>
                                    Admin Dashboard
                                </Link>
                            </li>
                        )}

                        {isLoggedIn && role ==='ADMIN' && (
                            <li>
                                <Link to={"/course/create"}>
                                    Create course
                                </Link>
                            </li>
                        )}

                        {isLoggedIn && (
                            <li>
                                <Link to="/courses">All Courses</Link>
                            </li>
                        )}

                        <li>
                            <Link to="/contact">Contact Us</Link>
                        </li>

                        <li>
                            <Link to="/about">About Us</Link>
                        </li>

                        {!isLoggedIn &&(
                            <li className=" absolute bottom-4 w-[90%]">
                                <div className="w-full flex items-center justify-center">

                                    <Link to={"/login"}>
                                        <button className="btn-primary bg-blue-700 text-white lg:px-10 px-[.85rem] py-2 font-semibold rounded-md w-full">
                                           Login
                                        </button>
                                    </Link>
    
                                    <Link to={"/signup"}>
                                        <button className="btn-secondry bg-yellow-700 text-white px-[.70rem] lg:px-10 py-2 font-semibold rounded-md w-full">
                                            Signup
                                        </button>
                                    </Link>
                                </div>
                            </li>
                        )}

                        {isLoggedIn && (
                            <li className=" absolute bottom-4 w-[90%]">
                                <div className="flex items-center justify-center w-full">

                                    <Link to={"/user/profile"}>
                                        <button className="btn-primary text-white  bg-blue-700 px-[.40rem] lg:px-9 py-2 rounded-md font-semibold w-full">
                                            Profile
                                        </button>
                                    </Link>

                                    <Link onClick={handleLogOut}>
                                        <button className="btn-secondry text-white bg-yellow-700 px-[.40rem] lg:px-7 py-2 rounded-md font-semibold w-full">
                                            Log Out
                                        </button>
                                    </Link>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </div>

            { children }

            <Footer />
        </div>
    );
}

export default HomeLayout;

