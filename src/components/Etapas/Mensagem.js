import React from "react";
import '../../pages/Create/Create.css';

const Mensagem = ({ formData, setFormData, mensagemErro }) => {
    const handleChange = (e) => {
        setFormData({ ...formData, mensagem: e.target.value });
    };

    return (
        <div className="ctn_create">
            <div className="create">
                <h2 className="title_create">Inserção da mensagem</h2>
                <p className="content_create">Escreva aqui sua mensagem especial para ficar eternizada na sua memória.</p>
                <div className="ctn_inputCreate">
                    <label htmlFor=""></label>
                    <textarea type="text" className="mensagem"
                        value={formData.mensagem || ''}
                        onChange={handleChange}
                        maxLength={350}
                        required
                    />
                    {(mensagemErro) && (
                        <p className="url_erro url_erro-msg">{mensagemErro}</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Mensagem;