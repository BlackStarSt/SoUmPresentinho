import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { db } from "../../db/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

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
import PagamentoWrapper from "../Pagamento/Pagamento";

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

    const emailUsuario = sessionStorage.getItem("emailUsuario");
    const navigate = useNavigate();

    const salvarDados = async () => {
        if (!emailUsuario) {
            alert("Você precisa estar logado para salvar a página.");
            navigate('/login');
            return;
        }

        const dataCriacao = Timestamp.now();
        const dados = {
            url: formData.url,
            titulo: formData.titulo,
            mensagem: formData.mensagem,
            fotos: formData.fotos,
            musica: formData.musica,
            plano: formData.plano,
            usuarioEmail: emailUsuario,
            criado_em: dataCriacao,
        };

        try {
            await addDoc(collection(db, "paginas"), dados);
        } catch (error) {
            console.error("Erro ao salvar dados: ", error);
        }
    };

    const [mensagemErro, setMensagemErro] = useState('');

    const avancar = () => {
        if (etapaAtual === etapas.length - 2) {
            if (!formData.plano) {
                setMensagemErro('Você precisa selecionar um plano!');
                return;
            }
        }
    
        setMensagemErro('');
    
        let campoAtual = '';
        switch (etapaAtual) {
            case 0:
                campoAtual = 'url';
                break;
            case 1:
                campoAtual = 'titulo';
                break;
            case 2:
                campoAtual = 'mensagem';
                break;
            default:
                campoAtual = '';
        }
    
        if (campoAtual && formData[campoAtual].trim() === '') {
            setMensagemErro(`Por favor, preencha o campo acima!`);
            return;
        }
    
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

    const [valor, setValor] = useState(0);

    const etapas = [
        <Nome formData={formData} setFormData={setFormData} />,
        <Titulo formData={formData} setFormData={setFormData} />,
        <Mensagem formData={formData} setFormData={setFormData} />,
        <Fotos formData={formData} setFormData={setFormData} />,
        <Musica formData={formData} setFormData={setFormData} />,
        <Plano formData={formData} setFormData={setFormData} setValor={setValor} />,
        <PagamentoWrapper valorPlano={valor} selectedPlan={formData.plano} />

    ];

    return (
        <div className={`ctn_create ${etapaAtual === etapas.length - 2 ? 'ctn_plano' : ''}`}>
            <div className={`create ${etapaAtual === etapas.length - 2 ? 'plano' : ''}`}>

                <ProgressBar etapaAtual={etapaAtual} />
                {etapas[etapaAtual]}
                {mensagemErro && (
                    <div className="url_erro">
                        {mensagemErro}
                    </div>
                )}
                
                <ButtonsEtapas
                    onAvancar={avancar}
                    onVoltar={voltar}
                    isPlano={etapaAtual === 5}
                />
            </div>

            {etapaAtual !== etapas.length - 2 && (
                <Visualizer data={formData} />
            )}
        </div>
    );
};

export default Create;
