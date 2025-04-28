import React from "react";
import { Link } from "react-router-dom";

import { QRCodeCanvas } from 'qrcode.react';

import check from '../../assets/icons/badge-check.png';

const Sucesso = ({ data }) => {
  if (!data || !data.url) return null;

  const urlDaPagina = `https://presentinhobd.web.app/page/${data.url}`;

  return (
    <div className="container_sucesso">
      <div className="ctn_create">
        <div className="create">
          <h2 className="title_create">Sucesso!</h2>
          <p className="content_create">Página criada com sucesso...</p>
          <div className="ctn_inputCreate">
            <div className="ctn_qrcode">
              <p className="sucesso_content">URL da página:
                <a href={urlDaPagina} target="_blank" rel="noopener noreferrer"> {urlDaPagina}</a>
              </p>
              <QRCodeCanvas value={urlDaPagina} size={200} className="qrcode"/>
              <Link to={'/profile'}>
                <button className="btn_sucesso"><img src={check} alt="#" className="check"/>Confirmar</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sucesso;
