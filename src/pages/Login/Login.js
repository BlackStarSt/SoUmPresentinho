import React from "react";
import { useState } from "react";
import "../Login/Login.css";
import compOu from '../../assets/icons/ou.png'

const Login = () => {
    const [value, setValue] = useState('')

    return (
        <div className="login">
            <div className="container">
                <p className="title">Login</p>
                <div className="ctn_login">
                    <div className="input_ctn">
                        <label>E-mail</label>
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            required>
                        </input>
                    </div>
                    <div className="input_ctn">
                        <label>Senha</label>
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            required>
                        </input>
                    </div>
                </div>
                <div className="ctn_btns">
                    <button className="btnCheck">Entrar</button>
                    <a href="/" className="btnSenha">Esqueceu a senha?</a>
                    <img src={compOu} alt="#" className="divider" />
                    <button className="btnConta">Criar uma conta</button>
                </div>
            </div>
        </div>
    )
}

export default Login;