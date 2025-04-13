import React from "react";

const Titulo = ({ formData, setFormData }) => {
    const handleChange = (e) => {
        setFormData({ ...formData, titulo: e.target.value });
    };

    return (
        <div className="ctn_create">
            <div className="create">
                <h2 className="title_create">Titulo da página</h2>
                <p className="content_create">Escreva o título da página. Ex: Te amo há: ou Nossas memórias ou etc!</p>
                <div className="ctn_inputCreate">
                    <label htmlFor=""></label>
                    <input type="text" 
                        value={formData.titulo}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default Titulo;