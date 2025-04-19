import React from "react";

import "../../pages/Create/Create.css";

const Fotos = ({ formData, setFormData }) => {
    const handleChange = (e) => {
        const files = Array.from(e.target.files);

        if (files.length > 3) {
            alert("Você só pode selecionar até 3 fotos.");
            return;
        }

        const newFotos = files.map((file) => {
            const reader = new FileReader();

            return new Promise((resolve) => {
                reader.onloadend = () => {
                    resolve(reader.result);
                };
                reader.readAsDataURL(file);
            });
        });

        Promise.all(newFotos).then((fotosBase64) => {
            setFormData({ ...formData, fotos: fotosBase64 });
        });
    };

    const handleRemove = (indexToRemove) => {
        const updatedFotos = formData.fotos.filter((_, index) => index !== indexToRemove);
        setFormData({ ...formData, fotos: updatedFotos });
    };

    return (
        <div className="ctn_create">
            <div className="create create_photo">
                <h2 className="title_create">Inserção de fotos</h2>
                <p className="content_create">Selecione fotos para decorar a página. Máximo de 3 imagens.</p>
                <div className="ctn_inputCreate photo_input">
                    <input
                        type="file"
                        accept="image/*"
                        id="createNome"
                        multiple
                        onChange={handleChange}
                    />
                    <div className="photo_text">
                        <strong>Clique para adicionar fotos</strong><br />
                        <span>PNG, JPG, JPEG, GIF (max. 3 fotos)</span>
                    </div>
                </div>
                <div className="selectPhotos">
                    {formData.fotos.map((foto, index) => (
                        <div key={index} className="preview-box">
                            <img
                                src={foto}
                                alt={`preview-${index}`}
                                className="preview-img"
                            />
                            <button
                                type="button"
                                className="remove-btn"
                                onClick={() => handleRemove(index)}
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Fotos;