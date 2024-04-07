import HomeLayout from "../Layout/HomeLayout";
import aboutMainImage from "../assets/Images/aboutMainImage.png"
import apj from "../assets/Images/apj.png"
import billGates from "../assets/Images/billGates.png"
import einstein from "../assets/Images/einstein.png"
import steveJobs from "../assets/Images/steveJobs.png"
import nelsonMandela from "../assets/Images/nelsonMandela.png"


function AboutUs(){
    return(
        <HomeLayout>
            <div className="pl-20 pt-20 flex flex-col text-white">
                <div className="flex items-center gap-5 mx-10">
                    <section className="w-1/2 space-y-10">
                        <h1 className="text-5xl text-yellow-500 font-semibold">
                            Affordable and quality education
                        </h1>
                        <p className="text-xl text-gray-200">
                            Our goal is to provide the affordable and quality education to the world.
                            We are providing the plateform for the aspiring teachers and students to share
                            their skills, creativity and knowledge to each other to empower and contribute
                            in the growth and wellness of mankind. 
                        </p>
                    </section>

                    <div className="w-1/2">
                        <img
                            style={{
                                filter:"drop-shadow(0px 10px 10px rgb(0,0,0))"
                            }}
                            alt="aboutMainImage"
                            className=" drop-shadow-2px"
                            src={aboutMainImage}/>
                    </div>
                </div>
            </div>

            <div className="carousel w-1/2 ml-80 my-16">

                <div id="slide1" className="carousel-item relative w-full">
                    <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                        <img src={nelsonMandela} className="w-40 rounded-full border-2 border-gray-200 " />
                        <p className="text-xl text-gray-200">
                            {"Education is the most powerful tool you can use to change the world."}
                        </p>
                        <h3 className="text-2xl font-semibold">Nelson Mandela</h3>
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide5" className="btn btn-circle">❮</a> 
                            <a href="#slide2" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                </div> 

                <div id="slide2" className="carousel-item relative w-full">
                   <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                        <img src={apj} className="w-40 rounded-full border-2 border-gray-200 " />
                        <p className="text-xl text-gray-200">
                            {"Climbing to the top demands strength, whether it is to the top of Mount Everest or to the top of your career."}
                        </p>
                        <h3 className="text-2xl font-semibold">Apj Abdul Kalam</h3>
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide1" className="btn btn-circle">❮</a> 
                            <a href="#slide3" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                </div>

                <div id="slide3" className="carousel-item relative w-full">
                    <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                        <img src={einstein} className="w-40 rounded-full border-2 border-gray-200 " />
                        <p className="text-xl text-gray-200">
                            {"Great spirits have always encountered violent opposition from mediocre minds."}
                        </p>
                        <h3 className="text-2xl font-semibold">Einstein</h3>
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide2" className="btn btn-circle">❮</a> 
                            <a href="#slide4" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                </div> 

                <div id="slide4" className="carousel-item relative w-full">
                    <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                        <img src={steveJobs} className="w-40 rounded-full border-2 border-gray-200 " />
                        <p className="text-xl text-gray-200">
                            {"Your time is limited, so don’t waste it living someone else’s life."}
                        </p>
                        <h3 className="text-2xl font-semibold">Steve Jobs</h3>
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide3" className="btn btn-circle">❮</a> 
                            <a href="#slide5" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                </div>

                <div id="slide5" className="carousel-item relative w-full">
                   <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                        <img src={billGates} className="w-40 rounded-full border-2 border-gray-200 " />
                        <p className="text-xl text-gray-200">
                            {"Success is the lousy teacher. It seduces smart people into thinking they can't loose. "}
                        </p>
                        <h3 className="text-2xl font-semibold">Bill Gates</h3>
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide4" className="btn btn-circle">❮</a> 
                            <a href="#slide1" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default AboutUs