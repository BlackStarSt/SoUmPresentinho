import React from "react";
import '../ProgressBar/ProgressBar.css';

const ProgressBar = () => {

    return (
        <div className="progressBar">
            <div className="bar"></div>
            <div className="ctn_points">
                <div className="bar_point active"></div>
                <div className="bar_point"></div>
                <div className="bar_point"></div>
                <div className="bar_point"></div>
                <div className="bar_point"></div>
                <div className="bar_point"></div>
                <div className="bar_point"></div>
                <div className="bar_point"></div>
                <div className="bar_point"></div>
            </div>
        </div>
    )
}

export default ProgressBar