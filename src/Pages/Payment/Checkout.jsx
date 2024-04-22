
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { getRazorPayId, purchaseCourseBundle, verifyUserPayment } from "../../Redux/Slices/RazorpaySlice";
import { useEffect } from "react";
import HomeLayout from "../../Layout/HomeLayout"
import toast from "react-hot-toast";
import { BiRupee } from "react-icons/bi";


function checkout(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const razorpayKey = useSelector((state) => state?.razorpay?.key);
    const subscription_id = useSelector((state) => state?.razorpay?.subscription_id);
    const isPaymentVerified = useSelector((state) => state?.razorpay?.isPaymentVerified);
    const userData = useSelector((state)=>state?.auth?.data)

    const paymentDetails = {
        razorpay_payment_id:"",
        razorpay_subscription_id:"",
        razorpay_signature:""
    }
    

    async function handleSubscription(e){
        e.preventDefault();
        console.log(subscription_id);
        if(!razorpayKey && !subscription_id ){
            toast.error("Somthing weeeeeeeeeeent wrong")
            return
        }

        const option = {
            key:razorpayKey,
            subscription_id:subscription_id,
            name:"Coursify Pvt. Ltd",
            description:"Subscription",
            theme:{
                color:'#F37254'  
            },
            prefill:{
                email:userData.email,
                name:userData.name
            },
            handler:async function (response){
                paymentDetails.razorpay_payment_id =  response.razorpay_payment_id
                paymentDetails.razorpay_signature = response.razorpay_signature
                paymentDetails.razorpay_subscription_id = response.razorpay_subscription_id

                toast.success("Payment successfull...")

                const res = await dispatch(verifyUserPayment(paymentDetails))
                res?.payload?.success ? navigate("/checkout/success") : navigate("/checkout/failed")
            }                            
        }

        const paymentObject = new window.Razorpay(option);
        paymentObject.open()
    }

    async function load(){
        await dispatch(getRazorPayId())
        await dispatch(purchaseCourseBundle())
    }

    useEffect(()=>{
        load()
        console.log(load());
    },[])

    return(
        <HomeLayout>
            <form onSubmit={handleSubscription} className="min-h-[90vh] flex items-center justify-center text-white" >
                <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative">
                    <h1 className="flex justify-center top-0 absolute text-center py-4 bg-yellow-500 w-full text-2xl font-bold rounded-tl-lg rounded-tr-lg">Subscription bundle</h1>
                    <div className="px-4 space-y-5 text-center">
                        <p className="text-[17px]">
                            This purchase allow you to access all the available course of our plateform for {" "}
                            <span className="text-yellow-500 font-bold">
                                
                                1 Year duration
                            </span> {" "}
                            All the existing and new launched course will be also availabe
                        </p>

                        <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
                            <BiRupee/><span>499</span>only
                        </p>
                         <div>
                            <p>100% refund on cancellation</p>
                            <p>*Term & conditions are applied*</p>
                         </div>

                         <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded-br-lg rounded-bl-lg text-xl font-semibold w-full absolute left-0 py-2 bottom-0">
                            Buy now
                         </button>
                    </div>
                </div>
            </form>
        </HomeLayout>
    )
}

export default checkout




