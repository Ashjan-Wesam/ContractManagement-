import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import About from "./About";
import BestSection from "./BestSection";
import Contact from "./Contact";
import TwoBox from "./TwoBox";
import Testimonial from "./Testimonial";


function Home() {
  return (
   <>
   <About />
   <BestSection />
   <Contact />
   <TwoBox />
   <Testimonial />

   </>
  );
}

export default Home;

