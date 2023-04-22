import "./navbar.css";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Navbar = () => {
  
  
  const { user } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
          <div className="navLogo">
            <FontAwesomeIcon icon={faPlane} />
            <span className="logo">AirBook</span>
          </div>
        </Link>
        {user ? (
          <div className="navItems">
            <span className="navUsername">{user.username}</span>
          </div>
        ) : (
          <div className="navItems">
            <Link to="/login" style={{ textDecoration: "none" }}>
              <button className="navButton">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
