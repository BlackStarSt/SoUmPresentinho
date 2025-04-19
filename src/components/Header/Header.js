import React from "react";
import "./Header.css";
import "../../root.css";
import logo from "../../assets/icons/logo.png";
import userIcon from "../../assets/icons/user.png";
import { Link } from "react-router-dom";


const Header = () => {
        
    return (
        <header>
            <div>
                <Link to={"/"}>
                    <img src={logo} alt="Logo" />
                </Link> 
            </div>
            <nav>
                <ul>
                    <li>
                        <Link to={"/login"}>
                            <button className="btnLogin">
                                Login
                                <img src={userIcon} alt="Usuário" className="user-icon" />
                            </button>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
