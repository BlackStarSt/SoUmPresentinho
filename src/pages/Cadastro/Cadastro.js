import React, { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";

import { db, serverTimestamp } from "../../db/firebase";
import { collection, addDoc } from "firebase/firestore";

import '../Login/Login.css';
import '../Cadastro/Cadastro.css';

const Cadastro = () => {
    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nome || !sobrenome || !email || !senha || !confirmarSenha) {
            alert("Por favor, preencha todos os campos!");
            return;
        }

        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem!");
            return;
        }

        try {
            await addDoc(collection(db, "usuarios"), {
                nome,
                email,
                senha,
                criado_em: serverTimestamp(),
            });

            alert("Usuário cadastrado com sucesso!");
            navigate('/login');
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
        }
    };

    return (
        <div className="cadastro">
            <div className="container">
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
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input_ctn">
                        <label>Confirmar senha</label>
                        <input
                            type="password"
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                            required
                        />
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