import React, { useEffect, useState } from "react";
import '../Visualizer/Visualizer.css';

const Visualizer = ({ data }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (data.fotos && data.fotos.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % data.fotos.length);
            }, 3000);

            return () => clearInterval(interval);
        }
    }, [data.fotos]);

    const extrairSpotifyTrackId = (url) => {
        try {
            const parsedUrl = new URL(url);
            const pathParts = parsedUrl.pathname.split('/');
            const trackIndex = pathParts.findIndex(part => part === 'track');
            return trackIndex !== -1 ? pathParts[trackIndex + 1] : null;
        } catch {
            return null;
        }
    };

    return (
        <div className="visualizer">
            <h2 className="title_visu">Pré-visualização</h2>
            <div className="ctn_visu">
                <div className="ctn_url">soumalembraancinha.com/{data.nome}</div>
                <div className="ctn_spotify">
                    {data.musica && (
                        <iframe className="ctn_spotify"
                            src={`https://open.spotify.com/embed/track/${extrairSpotifyTrackId(data.musica)}`}
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
                    <p className="textos_message">{data.message}</p>
                </div>
            </div>
        </div>
    );
}

export default Visualizer;
