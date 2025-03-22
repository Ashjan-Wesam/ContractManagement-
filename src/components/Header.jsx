import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; 
import "../assets/css/meanmenu.css";
import logo from "../assets/images/logo.png"; 
import '../assets/css/logout.css';

const Header = () => {
  const { user, logout } = useAuth();  

  const handleLogout = () => {
    logout();  
  };

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
                        <Link className="nav-link" to="/about">About</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/contact">Contact Us</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/device">Devices</Link>
                      </li>
                    </ul>
                    <div className="sign_btn">
                      {}
                      {user ? (
                        <div className="user-info">
                        <Link to="/profile" style={{backgroundColor:"white",color:"black"}}>
        <span className="user-name">{user.name}</span>
      </Link>
                          {user.img && (
                            <img
                              src={user.img}
                              alt="User Avatar"
                              className="user-avatar"
                              style={{
                                width: "30px",
                                height: "30px",
                                borderRadius: "50%",
                                marginRight: "10px",
                              }}
                            />
                          )}
                          <button onClick={handleLogout} className="logout-btn">Logout</button>
                          </div>
                      ) : (
                        <Link to="/Login">Sign in</Link>
                      )}
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;













// import { Link } from "react-router-dom";
// import "../assets/css/meanmenu.css";
// import logo from "../assets/images/logo.png";
// const Header = () => {
//   return (
//     <header>
//       <div className="head_top">
//         <div className="header">
//           <div className="container">
//             <div className="row">
//               <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col logo_section">
//                 <div className="full">
//                   <div className="center-desk">
//                     <div className="logo">
//                       <Link to="/">
//                         <img src={logo} alt="Logo" />
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9">
//                 <nav className="navigation navbar navbar-expand-md navbar-dark">
//                   <button
//                     className="navbar-toggler"
//                     type="button"
//                     data-toggle="collapse"
//                     data-target="#navbarsExample04"
//                     aria-controls="navbarsExample04"
//                     aria-expanded="false"
//                     aria-label="Toggle navigation"
//                   >
//                     <span className="navbar-toggler-icon"></span>
//                   </button>
//                   <div className="collapse navbar-collapse" id="navbarsExample04">
//                     <ul className="navbar-nav mr-auto">
//                       <li className="nav-item">
//                         <Link className="nav-link" to="/">Home</Link>
//                       </li>
//                       <li className="nav-item">
//                         <a className="nav-link" to="/about">About</a>
//                       </li>
//                       <li className="nav-item">
//                         <Link className="nav-link" to="/contact">Contact us</Link>
//                       </li>
//                       <li className="nav-item">
//                         <Link className="nav-link" to="/Device">Supscriptions</Link>
//                       </li>
//                     </ul>
//                     <div className="sign_btn">
//                       <Link to="/signin">Sign in</Link>
//                     </div>
//                   </div>
//                 </nav>
//               </div>
//             </div>
//           </div>
//         </div>
        
//       </div>
//     </header>
//   );
// };

// export default Header;

