import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../db/firebase";

import '../Pagina/Pagina.css';

const Pagina = () => {
    const { url } = useParams();
    const [data, setData] = useState({});

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (data.fotos && data.fotos.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % data.fotos.length);
            }, 3000);

            return () => clearInterval(interval);
        }
    }, [data.fotos]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const paginasRef = collection(db, "paginas");
                const q = query(paginasRef, where("url", "==", url));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const doc = querySnapshot.docs[0];
                    setData(doc.data());
                }
            } catch (error) {
                console.error("Erro ao buscar dados da página:", error);
            }
        };

        fetchData();
    }, [url]);

    const extrairSpotifyTrackId = (url) => {
        const regex = /track\/([a-zA-Z0-9]+)/;
        const match = url.match(regex);
        return match ? match[1] : "";
    };

    return (
        <div className="pagina">
            <div className="container_pagina">
                <div className="ctn_spotify">
                    {data.musica && (
                        <iframe
                            className="ctn_spotify"
                            src={`https://open.spotify.com/embed/track/${extrairSpotifyTrackId(data.musica)}?autoplay=1`}
                            width="300"
                            height="80"
                            frameBorder="0"
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                            title="Spotify Player"
                        ></iframe>
                    )}
                </div>

                <div className="ctn_fotos">
                    {data.fotos && data.fotos.length > 0 && (
                        <img
                            src={data.fotos[currentIndex]}
                            alt={`foto-${currentIndex}`}
                            className="foto"
                        />
                    )}
                </div>

                <div className="ctn_textos">
                    <h3 className="textos_title">{data.titulo}</h3>
                    <hr />
                    <p className="textos_message">{data.mensagem}</p>
                </div>
            </div>
        </div>
    );
};

export default Pagina;