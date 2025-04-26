import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../db/firebase.js";

import "../Profile/Profile.css";
import user from "../../assets/icons/user.svg";

const Profile = () => {
    const [userData, setUserData] = useState({ nome: "", email: "" });
    const [userPages, setUserPages] = useState([]);
    const [paginaAtual, setPaginaAtual] = useState(0);

    const paginasPorPagina = 3;

    const navigate = useNavigate();

    useEffect(() => {
        const emailUsuario = sessionStorage.getItem("emailUsuario");
        
        const fetchUserData = async () => {
            if (!emailUsuario) return;

            try {
                const usuariosRef = collection(db, "usuarios");
                const q = query(usuariosRef, where("email", "==", emailUsuario));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const doc = querySnapshot.docs[0];
                    setUserData(doc.data());
                }

                const paginasRef = collection(db, "paginas");
                const p = query(paginasRef, where("usuarioEmail", "==", emailUsuario));
                const paginaSnapshot = await getDocs(p);

                const pagesData = [];
                paginaSnapshot.forEach((doc) => {
                    pagesData.push({ id: doc.id, ...doc.data() });
                });
                setUserPages(pagesData);

            } catch (error) {
                console.error("Erro ao buscar dados do usuário:", error);
            }
        };

        fetchUserData();
    }, []);

    const totalPaginas = Math.ceil(userPages.length / paginasPorPagina);
    const inicio = paginaAtual * paginasPorPagina;
    const paginasVisiveis = userPages.slice(inicio, inicio + paginasPorPagina);

    const irParaAnterior = () => {
        if (paginaAtual > 0) setPaginaAtual(paginaAtual - 1);
    };

    const irParaProxima = () => {
        if (paginaAtual < totalPaginas - 1) setPaginaAtual(paginaAtual + 1);
    };

    const handleLogout = () => {
        sessionStorage.removeItem("emailUsuario");
        navigate("/login");
    };

    return (
        <div className="container_profile">
            <div className="container">
                <div className="profile">
                    <img src={user} alt="Perfil" className="profile_img" />
                    <div className="profile_data">
                        <h2 className="profile_title">Dados</h2>
                        <div className="profile_texts">
                            <p className="profile_name">Nome: {userData.nome} {userData.sobrenome}</p>
                            <p className="profile_email">Email: {userData.email}</p>
                        </div>
                        <div className="profile_pages">
                            <h3>Páginas do usuário:</h3>
                            <div className="ctn_boxs">
                                {userPages.length > 0 ? (
                                    <>
                                        {paginasVisiveis.map((page) => (
                                            <div key={page.id} className="box_page"
                                                onClick={() => window.open(`/page/${page.url}`, '_blank')}
                                                style={{ cursor: "pointer" }}
                                            >
                                                <p><strong>URL: /</strong>{page.url}</p>
                                                <p><strong>Plano: </strong>{page.plano}</p>
                                                <p><strong>Data: </strong>{new Date(page.criado_em.toDate ? page.criado_em.toDate() : page.criado_em).toLocaleDateString('pt-BR')}</p>
                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    <p>Não há páginas cadastradas.</p>
                                )}
                            </div>
                            {userPages.length > paginasPorPagina && (
                                <div className="paginacao">
                                    <button onClick={irParaAnterior} disabled={paginaAtual === 0} className="btn_pgs">
                                        ◀
                                    </button>
                                    <span>
                                        Página {paginaAtual + 1} de {totalPaginas}
                                    </span>
                                    <button onClick={irParaProxima} disabled={paginaAtual >= totalPaginas - 1} className="btn_pgs">
                                        ▶
                                    </button>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
                <div className="profile_btns">
                    <Link to={'/create'} className="p_btn">
                        <button className="p_btn">Nova página</button>
                    </Link>
                    <button className="p_btn" onClick={handleLogout}>Sair</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
