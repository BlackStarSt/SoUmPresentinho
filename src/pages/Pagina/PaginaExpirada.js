import React from 'react';
import { Link } from 'react-router-dom';

import '../Pagina/Pagina.css'

const PaginaExpirada = () => {
    return (
        <div className="pagina-expirada">
            <div className="container">
                <div className="container_exp">
                    <h2>Essa página expirou ou não está mais disponível.</h2>
                    <p>Por favor, volte para a <Link to="/">página inicial</Link>.</p>
                </div>
            </div>
        </div>
    );
};

export default PaginaExpirada;