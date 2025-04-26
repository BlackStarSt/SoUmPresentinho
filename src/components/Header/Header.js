import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./Header.css";
import "../../root.css";

import logo from "../../assets/icons/logo.png";
import userIcon from "../../assets/icons/user.png";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoginStatus = () => {
            const emailUsuario = sessionStorage.getItem("emailUsuario");
            setIsLoggedIn(!!emailUsuario);
        };

        checkLoginStatus();

        const interval = setInterval(() => {
            checkLoginStatus();
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <header>
            <div>
                <Link to={"/"}>
                    <img src={logo} alt="Logo" />
                </Link>
            </div>
            <nav>
                <ul>
                    {isLoggedIn ? (
                        <li>
                            <Link to={"/profile"}>
                                <button className="btnLogin">
                                    Perfil
                                    <img src={userIcon} alt="Usuário" className="user-icon" />
                                </button>
                            </Link>
                        </li>
                    ) : (
                        <li>
                            <Link to={"/login"}>
                                <button className="btnLogin">
                                    Login
                                    <img src={userIcon} alt="Usuário" className="user-icon" />
                                </button>
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
