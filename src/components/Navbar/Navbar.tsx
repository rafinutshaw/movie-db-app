import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import "./Navbar.scss";

const Navbar: React.FC = () => {
  const { isLoggedIn, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="container content">
        <div className="nav-left">
          <Link to="/">Home</Link>
          <Link to="/wishlist">Wishlist</Link>
        </div>
        <div className="nav-right">
          <button onClick={isLoggedIn ? logout : handleLogin}>
            {isLoggedIn ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
