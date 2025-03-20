
import { Link } from "react-router-dom";
import "../assets/css/meanmenu.css";
import logo from "../assets/images/logo.png";
import topImg from "../assets/images/top_img.png";

const Header = () => {
  return (
    <header>
      <div className="head_top">
        <div className="header">
          <div className="container">
            <div className="row">
              <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col logo_section">
                <div className="full">
                  <div className="center-desk">
                    <div className="logo">
                      <Link to="/">
                        <img src={logo} alt="Logo" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9">
                <nav className="navigation navbar navbar-expand-md navbar-dark">
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarsExample04"
                    aria-controls="navbarsExample04"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarsExample04">
                    <ul className="navbar-nav mr-auto">
                      <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" to="/about">About</a>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/contact">Contact us</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/contact">Supscriptions</Link>
                      </li>
                    </ul>
                    <div className="sign_btn">
                      <Link to="/signin">Sign in</Link>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
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
};

export default Header;

