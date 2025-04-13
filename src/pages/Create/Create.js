import React from "react";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import Visualizer from "../../components/Visualizer/Visualizer";
import ButtonsEtapas from "../../components/Buttons/Buttons";

import Nome from "../../components/Etapas/Nome";
import '../Create/Create.css';

const Create = () => {

    return (
        <div className="ctn_create">
            <div className="create">
                <ProgressBar></ProgressBar>
                <Nome></Nome>
                <ButtonsEtapas></ButtonsEtapas>
            </div>
            <Visualizer></Visualizer>
        </div>
    )
}

export default Create;