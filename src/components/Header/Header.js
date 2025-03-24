import React from "react";
import "./Header.css";
import "../../root.css";
import logo from "../../assets/icons/logo.png";
import userIcon from "../../assets/icons/user.png";

const Header = () => {
    return (
        <header>
            <div>
                <img src={logo} alt="Logo" />
            </div>
            <nav>
                <ul>
                    <button className="btnLogin">
                        Login
                        <img src={userIcon} alt="Usuário" className="user-icon" />
                    </button>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
