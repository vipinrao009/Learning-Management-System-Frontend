import HomeLayout from "../../Layout/HomeLayout"
import { Link } from "react-router-dom"
import { RxCrossCircled } from "react-icons/rx"
function CheckoutFailure(){
    return(
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center text-white">
                <div className=" w-80 h-[26rem] flex flex-col justify-center items-center shadow-[0_0_10px_black] rounded-lg relative">
                    <h1 className=" absolute text-center top-0 bg-red-500 w-full py-4 rounded-tl-lg rounded-tr-lg text-2xl font-bold">Payment failed</h1>
                    <div className="px-4 flex flex-col items-center justify-center space-y-2">
                        <div className="text-center space-y-4">
                            <h2 className="text-lg font-semibold">
                                Oops ! Your payment failed
                            </h2>
                            <p className="text-center">
                                Please try again later
                            </p>
                        </div>
                        <RxCrossCircled className=" text-red-500 text-5xl"/>
                    </div>

                    <Link to="/checkout" className=" bg-red-500 hover:bg-red-600 transition-all duration-300 ease-ou absolute bottom-0 w-full py-2 text-center text-lg rounded-bl-lg rounded-br-lg font-semibold">
                        <button>Try again</button>
                    </Link>
                </div>
            </div>
        </HomeLayout>
    )
}

export default CheckoutFailure