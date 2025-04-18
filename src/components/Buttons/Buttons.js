import React from "react";

import '../Buttons/Buttons.css';
import back from '../../assets/icons/arrow_back.png';
import forward from'../../assets/icons/arrow_forward.png';

const ButtonsEtapas = ({onVoltar, onAvancar, isPlano }) => {
    return (
        <div className={`ctn_btnEtapa ${isPlano ? 'cnt_btnPlano' : ''}`}>
            <button className="btnEtapa" onClick={onVoltar}>
                <img src={back} alt="Voltar" className="btnEtapa_icon" />
                Voltar
            </button>
            <button className="btnEtapa" onClick={onAvancar}>
                Avançar
                <img src={forward} alt="Avançar" className="btnEtapa_icon" />
            </button>
        </div>
    )
}

export default ButtonsEtapas;