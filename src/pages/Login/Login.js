import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../Login/Login.css";
import compOu from '../../assets/icons/ou.png'

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !senha) {
            setMessage('Por favor, preencha todos os campos!');
            return;
        }

        const auth = getAuth();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, senha);
            const user = userCredential.user;

            localStorage.setItem('emailUsuario', user.email);

            navigate('/profile');
        } catch (error) {
            if (error.code === "auth/user-not-found") {
                setMessage("Usuário não encontrado.");
            } else if (error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") {
                setMessage("Email ou Senha incorreta.");
            } else {
                setMessage("Erro ao tentar realizar login.");
            }
        }
    };

    return (
        <div className="login">
            <div className="container">
                {message && <div className="message_senha">{message}</div>}
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
                    <a href="/recuperaSenha" className="btnSenha">Esqueceu a senha?</a>
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