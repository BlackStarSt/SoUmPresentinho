import React from "react";
import '../../pages/Create/Create.css';

const Mensagem = ({ formData, setFormData }) => {
    const handleChange = (e) => {
        setFormData({ ...formData, message: e.target.value });
    };
    
    return (
        <div className="ctn_create">
            <div className="create">
                <h2 className="title_create">Inserção da mensagem</h2>
                <p className="content_create">Escreva aqui sua mensagem especial para ficar eternizada na sua memória.</p>
                <div className="ctn_inputCreate">
                    <label htmlFor=""></label>
                    <input type="text"
                        value={formData.message || ''}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default Mensagem;