import React from "react";
import '../Visualizer/Visualizer.css';

const Visualizer = () => {
    return (
        <div className="visualizer">
            <h2 className="title_visu">Pré-visualização</h2>
            <div className="ctn_visu">
                <div className="ctn_url">soumalembraancinha.com/</div>
                <div className="ctn_spotify"></div>
                <div className="ctn_fotos"></div>
                <div className="ctn_textos"></div>
            </div>
        </div>
    )
}

export default Visualizer;