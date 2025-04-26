import React, { useState } from "react";

import '../../pages/Create/Create.css';

import check from '../../assets/icons/check.png';
import notCheck from '../../assets/icons/X.png';

const planos = [
    { nome: 'Mensal', preco: 9.90, detalhes: ['Texto dedicado', 'QrCode Exclusivo', 'Máximo de 3 imagens', 'Com música', 'URL personalizada', 'Uma memória'] },
    { nome: 'Anual', preco: 79.90, detalhes: ['Texto dedicado', 'QrCode Exclusivo', 'Máximo de 3 imagens', 'Com música', 'URL personalizada', 'Uma memória'] },
    { nome: 'Vitalício', preco: 199.90, detalhes: ['Texto dedicado', 'QrCode Exclusivo', 'Máximo de 3 imagens', 'Com música', 'URL personalizada', 'Uma memória'] },
  ];  

const Plano = ({ formData, setFormData, setValor }) => {
    const [selectedPlan, setSelectedPlan] = useState(formData.plano || '');
    const [error, setError] = useState('');

    const handleSelectPlan = (planName, price) => {
        setSelectedPlan(planName);
        setFormData({ ...formData, plano: planName });
        setValor(price);
        setError('');
    };

    return (
        <div className="ctn_create">
            <div className="create">
                <h2 className="title_create">Planos</h2>
                <p className="content_create">Escolha o plano ideal para sua página</p>
                <div className="ctn_planoBox">
                    {planos.map(({ nome, preco, detalhes }) => (
                        <div
                            key={nome}
                            className={`plano_box ${selectedPlan === nome ? 'selecionado' : ''}`}
                            onClick={() => handleSelectPlan(nome, preco)}
                        >
                            <h2 className="title_box">{nome}</h2>
                            <ul className="box_list">
                                {detalhes.map((item, index) => (
                                    <li key={index} className="plano_itens">
                                        <img src={selectedPlan === nome ? check : notCheck} alt={selectedPlan === nome ? 'check' : 'not check'} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="box_price">R$ {preco ? preco.toFixed(2) : 'N/A'}</p>
                        </div>
                    ))}
                </div>

                {error && <div className="error_message">{error}</div>}
            </div>
        </div>
    );
};

export default Plano;
