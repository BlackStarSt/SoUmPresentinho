import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../Login/Login.css";
import compOu from '../../assets/icons/ou.png'

import { db } from "../../db/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !senha) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        try {
            const q = query(
                collection(db, "usuarios"),
                where("email", "==", email),
                where("senha", "==", senha)
            );

            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                alert('Email incorretas!');
            } else {
                alert('Login bem-sucedido!');
                navigate('/create');
            }
        } catch (error) {
            console.error("Erro ao tentar logar:", error);
        }
    };

    return (
        <div className="login">
            <div className="container">
                <p className="title">Login</p>
                <form className="ctn_login" onSubmit={handleLogin}>
                    <div className="input_ctn">
                        <label>E-mail</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required>
                        </input>
                    </div>
                    <div className="input_ctn">
                        <label>Senha</label>
                        <input
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required>
                        </input>
                    </div>
                </form>
                <div className="ctn_btns">
                    <button className="btnCheck" onClick={handleLogin}>Entrar</button>
                    <a href="/" className="btnSenha">Esqueceu a senha?</a>
                    <img src={compOu} alt="#" className="divider" />
                    <Link to={'/cadastro'} className="btnConta">
                        <button className="btnConta">Criar uma conta</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login;