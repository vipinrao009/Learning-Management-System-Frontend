import {useNavigate} from "react-router-dom"

function NotFound(){

    const navigate = useNavigate();
    return(
        <div className="flex h-screen flex-col w-full items-center justify-center bg-[#1A2238]">
            <h1 className="text-9xl font-extrabold text-white tracking-widest">
                404
            </h1>

            <div className=" absolute mb-7 flex items-center bg-black rotate-12 text-sm rounded">
                Page not found...
            </div>

            <button className="mt-5">
                <a className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-yellow-500 focus:outline-none focus:ring">
                    <span onClick={() => navigate(-1)} className="relative block px-8 py-3 border border-current">
                       Go Back
                    </span>
                </a>
            </button>
        </div>

        
    )
}

export default NotFound