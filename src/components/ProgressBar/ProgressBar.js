import React from "react";
import '../ProgressBar/ProgressBar.css';

const ProgressBar = ({etapaAtual}) => {

    const etapas = 7;

    return (
        <div className="progressBar">
            <div className="bar"></div>
            <div className="ctn_points">
                {Array.from({ length: etapas }).map((_, index) => {
                    let className = "bar_point";
                    if (index < etapaAtual) {
                        className += " complete";
                    } else if (index === etapaAtual) {
                        className += " active";
                    }
                    return <div key={index} className={className}></div>;
                })}
            </div>
        </div>
    )
}

export default ProgressBar