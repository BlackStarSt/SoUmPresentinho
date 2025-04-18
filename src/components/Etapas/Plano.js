import React, { useState } from "react";
import '../../pages/Create/Create.css';

import check from '../../assets/icons/check.png';
import notCheck from '../../assets/icons/X.png';

const Plano = ({ formData, setFormData }) => {
    const [selectedPlan, setSelectedPlan] = useState(formData.plano || '');

    const handleSelectPlan = (planName) => {
        setSelectedPlan(planName);
        const valorFormatado = planName.replace(/\s+/g, '-');
        setFormData({ ...formData, plano: valorFormatado });
    };

    return (
        <div className="ctn_create">
            <div className="create">
                <h2 className="title_create">Planos</h2>
                <p className="content_create">Escolha o plano ideal para sua página</p>
                <div className="ctn_planoBox">
                    <div
                        className={`plano_box ${selectedPlan === 'Mensal' ? 'selecionado' : ''}`}
                        onClick={() => handleSelectPlan('Mensal')}
                    >
                        <h2 className="title_box">Mensal</h2>
                        <ul className="box_list">
                            <li className="plano_itens"><img src={check} alt="check" />Texto dedicado</li>
                            <li className="plano_itens"><img src={notCheck} alt="not check" />QrCode Exclusivo</li>
                            <li className="plano_itens"><img src={notCheck} alt="not check" />Máximo de 3 imagens</li>
                            <li className="plano_itens"><img src={check} alt="check" />Com música</li>
                            <li className="plano_itens"><img src={check} alt="check" />URL personalizada</li>
                            <li className="plano_itens"><img src={check} alt="check" />Uma memória</li>
                        </ul>
                        <p className="box_price">R$ 9,90</p>
                    </div>
                    <div
                        className={`plano_box ${selectedPlan === 'Anual' ? 'selecionado' : ''}`}
                        onClick={() => handleSelectPlan('Anual')}
                    >
                        <h2 className="title_box">Anual</h2>
                        <ul className="box_list">
                            <li className="plano_itens"><img src={check} alt="check" />Texto dedicado</li>
                            <li className="plano_itens"><img src={notCheck} alt="not check" />QrCode Exclusivo</li>
                            <li className="plano_itens"><img src={check} alt="check" />Máximo de 3 imagens</li>
                            <li className="plano_itens"><img src={check} alt="check" />Com música</li>
                            <li className="plano_itens"><img src={check} alt="check" />URL personalizada</li>
                            <li className="plano_itens"><img src={check} alt="check" />Uma memória</li>
                        </ul>
                        <p className="box_price">R$ 79,90</p>
                    </div>
                    <div
                        className={`plano_box ${selectedPlan === 'Vitalício' ? 'selecionado' : ''}`}
                        onClick={() => handleSelectPlan('Vitalício')}
                    >
                        <h2 className="title_box">Vitalício</h2>
                        <ul className="box_list">
                            <li className="plano_itens"><img src={check} alt="check" />Texto dedicado</li>
                            <li className="plano_itens"><img src={check} alt="check" />QrCode Exclusivo</li>
                            <li className="plano_itens"><img src={check} alt="check" />Máximo de 3 imagens</li>
                            <li className="plano_itens"><img src={check} alt="check" />Com música</li>
                            <li className="plano_itens"><img src={check} alt="check" />URL personalizada</li>
                            <li className="plano_itens"><img src={check} alt="check" />Uma memória</li>
                        </ul>
                        <p className="box_price">R$ 199,90</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Plano;
