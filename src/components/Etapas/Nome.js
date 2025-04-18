import React from "react";
import '../../pages/Create/Create.css';

const Nome = ({ formData, setFormData }) => {
    const handleChange = (e) => {
        const valorFormatado = e.target.value.replace(/\s+/g, '-');
        setFormData({ ...formData, nome: valorFormatado });
    };

    return (
        <div className="ctn_create">
            <div className="create">
                <h2 className="title_create">Nome da página</h2>
                <p className="content_create">Escreva o nome da página (usado no link para acessar). Ex: Gabriel & Clara ou Feliz Aniversário ou etc!</p>
                <div className="ctn_inputCreate">
                    <label htmlFor="">*Esse campo não pode ser alterado logo que é o identificador da memória.</label>
                    <input
                        type="text"
                        value={formData.nome || ''}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default Nome;