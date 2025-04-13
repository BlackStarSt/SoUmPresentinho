import React from "react";
import '../../pages/Create/Create.css';

const Fotos = () => {

    return (
        <div className="ctn_create">
            <div className="create">
                <h2 className="title_create">Inserção de fotos</h2>
                <p className="content_create">Selecione fotos para decorar a página. Máximo de 3 imagens.</p>
                <div className="ctn_inputCreate">
                    <label htmlFor=""></label>
                    <input type="text" id="createNome"/>
                </div>
            </div>
        </div>
    )
}

export default Fotos;