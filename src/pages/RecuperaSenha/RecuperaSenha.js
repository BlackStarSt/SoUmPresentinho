import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import '../RecuperaSenha/RecuperaSenha.css';

const RecuperaSenha = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const auth = getAuth();
        
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage('E-mail de recuperação enviado com sucesso!');
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                setMessage('Este e-mail não está registrado!');
            } else {
                setMessage('Erro ao enviar o e-mail de recuperação: ' + error.message);
            }
        } finally {
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