import React from "react";
import { useState } from "react";
import "../Login/Login.css";
import logo from "../../assets/icons/presente.png"
import check from "../../assets/icons/badge-check.png"
import { Link } from "react-router-dom";

const Login = () => {
    const [value, setValue] = useState('')

    return (
        <div className="container">
            <img src={logo} alt="Logo da empresa" className="logo_img" />
            <div className="ctn_login">
                <div className="input_ctn">
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        required>
                    </input>
                    <label>E-mail</label>
                </div>
                <div className="input_ctn">
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        required>
                    </input>
                    <label>Senha</label>
                </div>
            </div>
            <Link to={"/"} className="no_under">
                <button className="btnCheck">
                    Entrar
                    <img src={check} alt="Check badge" className="check_icon" />
                </button>
            </Link>
            <p>Ou cadastre-se <Link to={"/"} className="link">aqui!</Link></p>
        </div> 
    )
}

export default Login;