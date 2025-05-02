import React, { useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../db/firebase";

import '../../pages/Create/Create.css';

const Nome = ({ formData, setFormData, mensagemErro, setUrlError, urlError }) => {
    useEffect(() => {
        const checkUrlExists = async (url) => {
            if (url.trim() === "") {
                setUrlError(false);
                return;
            }

            const paginasRef = collection(db, "paginas");
            const q = query(paginasRef, where("url", "==", url));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                setUrlError(true);
            } else {
                setUrlError(false);
            }
        };

        checkUrlExists(formData.url);
    }, [formData.url, setUrlError]);

    const handleChange = (e) => {
        const valorFormatado = e.target.value.replace(/\s+/g, '-');
        setFormData({ ...formData, url: valorFormatado });
    };

    const erroFinal = mensagemErro || (urlError && "Este nome de página já está em uso!");

    return (
        <div className="ctn_create">
            <div className="create">
                <h2 className="title_create">Nome da página</h2>
                <p className="content_create">Escreva o nome da página (usado no link para acessar). Ex: Gabriel & Clara ou Feliz Aniversário ou etc!</p>
                <div className="ctn_inputCreate">
                    <label htmlFor="">*Esse campo não pode ser alterado logo que é o identificador da memória.</label>
                    <input
                        type="text"
                        value={formData.url || ''}
                        onChange={handleChange}
                        required
                        maxLength={30}
                    />
                    {(mensagemErro || urlError) && (<p className="url_erro">{erroFinal}</p>)}
                </div>
            </div>
        </div>
    );
};

export default Nome;
