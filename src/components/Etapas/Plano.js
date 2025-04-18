import React, { useState } from "react";
import '../../pages/Create/Create.css';

const Plano = ({ formData, setFormData }) => {
    // Estado para controlar o plano selecionado
    const [selectedPlan, setSelectedPlan] = useState(null);

    const handleSelectPlan = (planName) => {
        setSelectedPlan(planName);
        console.log(planName)
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
                            <li>Texto dedicado</li>
                            <li>Máximo de 3 imagens</li>
                            <li>Com música</li>
                            <li>URL Personalizda</li>
                            <li>Suporte 24hrs</li>
                            <li>Uma memória</li>
                        </ul>
                        <p className="box_price">R$ 9,90</p>
                    </div>
                    <div 
                        className={`plano_box ${selectedPlan === 'Anual' ? 'selecionado' : ''}`}
                        onClick={() => handleSelectPlan('Anual')}
                    >
                        <h2 className="title_box">Anual</h2>
                        <ul className="box_list">
                            <li>Texto dedicado</li>
                            <li>Máximo de 3 imagens</li>
                            <li>Com música</li>
                            <li>URL Personalizda</li>
                            <li>Suporte 24hrs</li>
                            <li>Uma memória</li>
                        </ul>
                        <p className="box_price">R$ 79,90</p>
                    </div>
                    <div 
                        className={`plano_box ${selectedPlan === 'Vitalício' ? 'selecionado' : ''}`}
                        onClick={() => handleSelectPlan('Vitalício')}
                    >
                        <h2 className="title_box">Vitalício</h2>
                        <ul className="box_list">
                            <li>Texto dedicado</li>
                            <li>Máximo de 3 imagens</li>
                            <li>Com música</li>
                            <li>URL Personalizda</li>
                            <li>Suporte 24hrs</li>
                            <li>Uma memória</li>
                        </ul>
                        <p className="box_price">R$ 199,90</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Plano;