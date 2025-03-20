<<<<<<< HEAD
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
=======
export default function Home() {
    return (
      <div className="">
        <h1 className="">Welcome to Contract Management System</h1>
        <p className="">Manage contracts efficiently and securely.</p>
      </div>
    );
  }
>>>>>>> 8d8795f7fe3b04d050fcc405b379e17d741f5f81
