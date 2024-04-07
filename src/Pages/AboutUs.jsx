import HomeLayout from "../Layout/HomeLayout";
import aboutMainImage from "../assets/Images/aboutMainImage.png"
import CarouselSlide from "../Components/CarouselSlide";
import { celebrities } from "../Constants/CelebrityData";

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