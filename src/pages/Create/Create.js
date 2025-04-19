import React, { useState } from "react";

import { db } from "../../db/firebase";
import { collection, addDoc } from "firebase/firestore";

import ProgressBar from "../../components/ProgressBar/ProgressBar";
import Visualizer from "../../components/Visualizer/Visualizer";
import ButtonsEtapas from "../../components/Buttons/Buttons";

import "../Create/Create.css";

import Nome from "../../components/Etapas/Nome";
import Titulo from "../../components/Etapas/Titulo";
import Mensagem from "../../components/Etapas/Mensagem";
import Fotos from "../../components/Etapas/Fotos";
import Musica from "../../components/Etapas/Musica";
import Plano from "../../components/Etapas/Plano";

const Create = () => {

    const [etapaAtual, setEtapaAtual] = useState(0);
    const [formData, setFormData] = useState({
        url: "",
        titulo: "",
        mensagem: "",
        fotos: [],
        musica: "",
        plano: ""
    });

    const salvarDados = async () => {
        const dados = {
            url: formData.url,
            titulo: formData.titulo,
            mensagem: formData.mensagem,
            fotos: formData.fotos,
            musica: formData.musica,
            plano: formData.plano,
        };

        try {
            const docRef = await addDoc(collection(db, "paginas"), dados);
            console.log("Documento gravado com ID: ", docRef.id);
        } catch (error) {
            console.error("Erro ao salvar dados: ", error);
        }
    };

    const avancar = () => {
        if (etapaAtual < etapas.length - 1) {
            setEtapaAtual(etapaAtual + 1);
        } else {
            salvarDados();
        }
    };

    const voltar = () => {
        if (etapaAtual > 0) {
            setEtapaAtual(etapaAtual - 1);
        }
    };

    const etapas = [
        <Nome formData={formData} setFormData={setFormData} />,
        <Titulo formData={formData} setFormData={setFormData} />,
        <Mensagem formData={formData} setFormData={setFormData} />,
        <Fotos formData={formData} setFormData={setFormData} />,
        <Musica formData={formData} setFormData={setFormData} />,
        <Plano formData={formData} setFormData={setFormData} />
    ];

    return (
        <div className={`ctn_create ${etapaAtual === etapas.length - 1 ? 'ctn_plano' : ''}`}>
            <div className={`create ${etapaAtual === etapas.length - 1 ? 'plano' : ''}`}>
                <ProgressBar etapaAtual={etapaAtual} />

                {etapas[etapaAtual]}

                <ButtonsEtapas
                    onAvancar={avancar}
                    onVoltar={voltar}
                    isPlano={etapaAtual === 5}
                />
            </div>
            {etapaAtual !== etapas.length - 1 && (
                <Visualizer data={formData} />
            )}
        </div>
    );
};

export default Create;