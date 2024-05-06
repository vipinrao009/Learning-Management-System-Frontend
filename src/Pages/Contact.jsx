import { useState } from "react"
import HomeLayout from "../Layout/HomeLayout"
import toast from "react-hot-toast"
import { isEmail } from "../helpers/regexMatcher"
import axiosInstance from "../helpers/axiosInstance"


function Contact(){

    const [userInput, setUserInput] = useState({
        name:"",
        email:"",
        message:""
    })

    function handleInputChange(e){
        const {name,value} = e.target //jo bhi current input hai vo e.target me milega aur isme se name & email destruct kar lenge
        console.log(name,value)

        setUserInput({
            ... userInput,
            [name]:value
        })
    }

    async function onFormSubmit(e){
        e.preventDefault();
        if(!userInput.name || !userInput.message || !userInput.email){
            toast.error("All field are mandatory")
            return
        }

        if(!isEmail(userInput.email)){
            toast.error("Invalid email")
            return
        }

        try {
            const response = axiosInstance.post("/contact",userInput)
            toast.promise(response,{
                loading:"Submitting your message...",
                success:"Form submitted successfully...",
                error:"Failed to submit the form..."
            })

            const contactResponse = await response;
            if(contactResponse?.data?.success){
                setUserInput({
                    name:"",
                    email:"",
                    message:""
                })
            }
        } catch (error) {
            toast.error("Operation failed...")
        }
    }
    return(
        <HomeLayout>
            <div className="flex items-center justify-center h-[90vh]">
                <form 
                    onSubmit={onFormSubmit}
                    noValidate
                    className="flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black] w-[22rem]">
                    
                    <h1 className="text-3xl font-semibold">Contact Us</h1> 

                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="name" className="text-xl font-semibold">
                            Name
                        </label>
                        <input 
                            className=" bg-transparent border px-2 py-2 rounded-sm"
                            type="text"
                            id="name"
                            placeholder="Enter your name..."
                            name="name"
                            value={userInput.name}
                            onChange={handleInputChange}
                         />
                    </div>

                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="email" className="text-xl font-semibold">
                            Email
                        </label>
                        <input 
                            className=" bg-transparent border px-2 py-2 rounded-sm"
                            type="email"
                            id="email"
                            placeholder="Enter your email..."
                            name="email"
                            value={userInput.email}
                            onChange={handleInputChange}
                         />
                    </div>

                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="message" className="text-xl font-semibold">
                            Message
                        </label>
                        <textarea 
                            className=" bg-transparent px-2 py-1 border rounded-sm h-40 resize-none"
                            id="message"
                            placeholder="Enter your message..."
                            name="message"
                            value={userInput.message}
                            onChange={handleInputChange}
                         />
                    </div>

                    <button type="submit"
                        className=" bg-yellow-500 w-full hover:bg-yellow-600 transition-all ease-out duration-300 py-2 text-lg font-semibold rounded-sm">
                        Submit
                    </button>
                </form>
            </div>
        </HomeLayout>
    )
}

export default Contact