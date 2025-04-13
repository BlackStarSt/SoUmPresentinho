import React, { useState } from "react";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import Visualizer from "../../components/Visualizer/Visualizer";
import ButtonsEtapas from "../../components/Buttons/Buttons";

import '../Create/Create.css';

import Nome from "../../components/Etapas/Nome";
import Titulo from "../../components/Etapas/Titulo";
import Mensagem from "../../components/Etapas/Mensagem";
import Fotos from "../../components/Etapas/Fotos";

const Create = () => {
    const [etapaAtual, setEtapaAtual] = useState(0);

    const [formData, setFormData] = useState({
        nome: "",
        titulo: "",
        mensagem: "",
        fotos: ""
    });

    const etapas = [
        <Nome formData={formData} setFormData={setFormData} />,
        <Titulo formData={formData} setFormData={setFormData} />,
        <Mensagem formData={formData} setFormData={setFormData} />,
        <Fotos formData={formData} setFormData={setFormData} />
    ];

    const avancar = () => {
        if (etapaAtual < etapas.length - 1) {
            setEtapaAtual(etapaAtual + 1);
        }
    };

    const voltar = () => {
        if (etapaAtual > 0) {
            setEtapaAtual(etapaAtual - 1);
        }
    };

    return (
        <div className="ctn_create">
            <div className="create">
                <ProgressBar etapaAtual={etapaAtual} />

                {etapas[etapaAtual]}

                <ButtonsEtapas
                    onAvancar={avancar}
                    onVoltar={voltar}
                />
            </div>
            <Visualizer data={formData} />
        </div>
    );
};

export default Create;
