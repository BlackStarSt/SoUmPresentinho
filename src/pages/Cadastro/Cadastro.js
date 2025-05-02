import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { db, serverTimestamp } from "../../db/firebase";
import { collection, addDoc } from "firebase/firestore";
import { auth } from "../../db/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import '../Login/Login.css';
import '../Cadastro/Cadastro.css';

const Cadastro = () => {
    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const [message, setMessage] = useState('');

    const [showSenha, setShowSenha] = useState(false);
    const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nome || !sobrenome || !email || !senha || !confirmarSenha) {
            setTimeout(() => setMessage(''), 2000);
            setMessage("Por favor, preencha todos os campos!");
            return;
        }

        if (senha !== confirmarSenha) {
            setMessage("As senhas não coincidem!");
            setTimeout(() => setMessage(''), 2000);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
            const user = userCredential.user;

            await addDoc(collection(db, "usuarios"), {
                uid: user.uid,
                nome,
                sobrenome,
                email,
                criado_em: serverTimestamp(),
            });

            setMessage("Usuário cadastrado com sucesso!");
            setTimeout(() => setMessage(''), 2000);
            navigate('/login');
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            if (error.code === "auth/email-already-in-use") {
                setMessage("Este e-mail já está em uso!");
                setTimeout(() => setMessage(''), 2000);
            } else {
                setMessage("Erro ao cadastrar usuário.");
                setTimeout(() => setMessage(''), 2000);
            }
        }
    };

    return (
        <div className="cadastro">
            <div className="container">
                {message && <div className="message_senha">{message}</div>}
                <p className="title">Cadastro</p>
                <form onSubmit={handleSubmit} className="ctn_cadastro">
                    <div className="nome_ctn">
                        <div className="input_ctn nome">
                            <label>Nome</label>
                            <input
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input_ctn sobrenome">
                            <label>Sobrenome</label>
                            <input
                                type="text"
                                value={sobrenome}
                                onChange={(e) => setSobrenome(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="input_ctn">
                        <label>E-mail</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input_ctn">
                        <label>Senha</label>
                        <input
                            type={showSenha ? "text" : "password"}
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowSenha(!showSenha)}
                            className="show-senha-btn">
                            {showSenha ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <div className="input_ctn">
                        <label>Confirmar senha</label>
                        <input
                            type={showConfirmarSenha ? "text" : "password"}
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmarSenha(!showConfirmarSenha)}
                            className="show-senha-btn">
                            {showConfirmarSenha ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </form>
                <div className="div_btnCadastro">
                    <Link to={'/login'} className="btnCheck">
                        <button className="btnCheck">Voltar</button>
                    </Link>
                    <button type="submit" className="btnCheck" onClick={handleSubmit}>Cadastrar</button>
                </div>
            </div>
        </div>
    );
}

export default Cadastro;