import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../db/firebase";

import '../RecuperaSenha/RecuperaSenha.css';

const RecuperaSenha = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const auth = getAuth();

        if (!email) {
            setMessage('Preencha o campo acima!');
            setTimeout(() => setMessage(''), 2000);
            return;
        }

        try {
            const q = query(collection(db, "usuarios"), where("email", "==", email));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                setMessage('Este e-mail não está registrado!');
                setTimeout(() => setMessage(''), 2000);
                setLoading(false);
                return;
            }

            await sendPasswordResetEmail(auth, email);
            setMessage('E-mail de recuperação enviado com sucesso!');
            setTimeout(() => setMessage(''), 2000);

        } catch (error) {
            setMessage('Erro ao verificar e-mail: ' + error.message);
            setTimeout(() => setMessage(''), 2000);
            setLoading(false);
        }

    };

    return (
        <div className="senha">
            <div className="container">
                <div className="container_senha"></div>
                {message && <div className="message_senha">{message}</div>}
                <h2 className="senha_title">Recuperar senha</h2>
                <p className="senha_subtitle">Insira o e-mail cadastrado para realizar a troca de senha</p>
                <form className="ctn_login" onSubmit={handleSubmit}>
                    <div className="input_ctn">
                        <label>E-mail</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="senha_btns">
                        <button type="button" className="s_btn" onClick={() => window.history.back()}>Voltar</button>
                        <button type="submit" className="s_btn" disabled={loading}>
                            {loading ? 'Enviando...' : 'Recuperar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RecuperaSenha;