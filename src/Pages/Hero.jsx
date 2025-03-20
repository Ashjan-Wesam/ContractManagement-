
import "../assets/css/meanmenu.css";
import topImg from "../assets/images/top_img.png";

function Hero() {
    return (
        <header>
        <div className="head_top">
   
          <section className="banner_main">
            <div className="container-fluid">
              <div className="row d_flex">
                <div className="col-md-5">
                  <div className="text-bg">
                    <h1>Rent The Electronics with Ease</h1>
                    <h2 style={{ color: "#2bcc91" }}>Rent the elelectronics at great prices with flexible plans</h2>
                    <a href="#">Buy Now</a>
                  </div>
                </div>
                <div className="col-md-7 padding_right1">
                  <div className="text-img">
                    <figure>
                      <img src={topImg} alt="Top Image" />
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </header>
    );
  }

  export default Hero;