
import "bootstrap/dist/css/bootstrap.min.css";
import About from "./About";
import BestSection from "./BestSection";
import Contact from "./Contact";
import Hero from "./Hero";
import YouTubeVideos from "./YouTubeVideos";


function Home() {
  return (
   <>
   <Hero />
   <About />
   <BestSection />
   <YouTubeVideos />
   <Contact />
   </>
  );
}

export default Home;

