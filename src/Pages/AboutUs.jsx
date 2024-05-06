import HomeLayout from "../Layout/HomeLayout";
import aboutMainImage from "../assets/Images/aboutMainImage.png"
import CarouselSlide from "../Components/CarouselSlide";
import { celebrities } from "../Constants/CelebrityData";

function AboutUs(){
    
    return(
        <HomeLayout>
            <div className=" lg:pl-20 pt-20 flex mx-5 flex-col text-white">
                <div className="lg:flex items-center justify-center gap-5">
                  
                    <div className="lg:hidden">
                        <img
                            style={{
                                filter:"drop-shadow(0px 10px 10px rgb(0,0,0))"
                            }}
                            alt="aboutMainImage"
                            className=" drop-shadow-2px"
                            src={aboutMainImage}/>
                    </div>

                    <section className="lg:w-1/2 space-y-10">
                        <h1 className="text-3xl lg:text-5xl text-yellow-500 font-semibold">
                            Affordable and quality education
                        </h1>
                        <p className="text-xl text-gray-200">
                            Our goal is to provide the affordable and quality education to the world.
                            We are providing the plateform for the aspiring teachers and students to share
                            their skills, creativity and knowledge to each other to empower and contribute
                            in the growth and wellness of mankind. 
                        </p>
                    </section>

                    <div className="lg:flex justify-center">
                    <img
    style={{
        filter:"drop-shadow(0px 10px 10px rgb(0,0,0))"
    }}
    alt="aboutMainImage"
    className="drop-shadow-2px hidden sm:block md:block lg:flex justify-center"
    src={aboutMainImage}
/>

                    </div>
                </div>
            </div>

            <div className="carousel w-full lg:w-1/2 lg:ml-80 my-16">

                {celebrities && celebrities.map(celebrity => (<CarouselSlide
                                                               {... celebrity}
                                                               key={celebrity.slideNumber}
                                                               totalSlides={celebrities.length}
                                                             />))}

            </div>
        </HomeLayout>
    )
}

export default AboutUs