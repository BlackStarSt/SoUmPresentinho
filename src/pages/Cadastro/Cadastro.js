import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import '../Login/Login.css';
import '../Cadastro/Cadastro.css';

const Cadastro = () => {
    const [value, setValue] = useState('')

    return (
        <div className="cadastro">
            <div className="container">
                <p className="title">Cadastro</p>
                <form action="" className="ctn_cadastro">
                    <div className="nome_ctn">
                        <div className="input_ctn nome">
                            <label>Nome</label>
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                required>
                            </input>
                        </div>
                        <div className="input_ctn sobrenome">
                            <label>Sobrenome</label>
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                required>
                            </input>
                        </div>
                    </div>
                    <div className="input_ctn">
                        <label>E-mail</label>
                        <input
                            type="email"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            required>
                        </input>
                    </div>
                    <div className="input_ctn">
                        <label>Senha</label>
                        <input
                            type="password"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            required>
                        </input>
                    </div>
                    <div className="input_ctn">
                        <label>Confirmar senha</label>
                        <input
                            type="password"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            required>
                        </input>
                    </div>
                </form>
                <Link to={'/'} className="btnCheck">
                    <button className="btnCheck">Cadastrar</button>
                </Link>
            </div>
        </div>
    )
}

export default Cadastro;