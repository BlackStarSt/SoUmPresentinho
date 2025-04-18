import React, { useState, useEffect } from "react";

const Musica = ({ formData, setFormData }) => {
    const [embedUrl, setEmbedUrl] = useState('');

    useEffect(() => {
        if (formData.musica) {
            try {
                const url = new URL(formData.musica);
                const pathParts = url.pathname.split('/');
                const trackIndex = pathParts.findIndex(part => part === 'track');
                const trackId = trackIndex !== -1 ? pathParts[trackIndex + 1] : null;

                if (trackId) {
                    const embed = `https://open.spotify.com/embed/track/${trackId}`;
                    setEmbedUrl(embed);
                } else {
                    setEmbedUrl('');
                }
            } catch (error) {
                setEmbedUrl('');
            }
        } else {
            setEmbedUrl('');
        }
    }, [formData.musica]);

    const handleChange = (e) => {
        setFormData({ ...formData, musica: e.target.value });
    };

    return (
        <div className="ctn_create">
            <div className="create">
                <h2 className="title_create">Música</h2>
                <p className="content_create">Pesquise uma música no Spotify, copie o link e insira no campo abaixo.</p>
                <div className="ctn_inputCreate">
                    <label htmlFor="musica"></label>
                    <input
                        type="text"
                        name="musica"
                        value={formData.musica || ''}
                        onChange={handleChange}
                        placeholder="https://open.spotify.com/track/..."
                    />
                </div>
            </div>
        </div>
    );
};

export default Musica;
