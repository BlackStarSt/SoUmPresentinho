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
    const [message, setMessage] = useState('');
    const [paginasPorPagina, setPaginasPorPagina] = useState(3);
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
                    const pageData = doc.data();
                    const pageCreationTime = pageData.criado_em.toDate ? pageData.criado_em.toDate() : pageData.criado_em;

                    let expirationTime = null;
                    if (pageData.plano === 'Mensal') {
                        expirationTime = new Date(pageCreationTime);
                        expirationTime.setMonth(expirationTime.getMonth() + 1);
                    } else if (pageData.plano === 'Anual') {
                        expirationTime = new Date(pageCreationTime);
                        expirationTime.setFullYear(expirationTime.getFullYear() + 1);
                    } else if (pageData.plano === 'Vitalício') {
                        expirationTime = null;
                    }

                    const isExpired = expirationTime && new Date().getTime() > expirationTime.getTime();

                    pagesData.push({ id: doc.id, ...pageData, isExpired });
                });

                setUserPages(pagesData);

            } catch (error) {
                console.error("Erro ao buscar dados do usuário:", error);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setPaginasPorPagina(2);
            } else {
                setPaginasPorPagina(3);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handlePageClick = (e, page) => {
        if (page.isExpired) {
            e.preventDefault();
            setMessage("Esta página está expirada e não pode ser acessada.");

            setTimeout(() => {
                setMessage('');
            }, 2000);
        } else {
            window.open(`/page/${page.url}`, '_blank');
        }
    };

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
                        <h2 className="profile_title">Meus dados</h2>
                        <div className="profile_texts">
                            <div className="label_text">
                                <label htmlFor="">Nome: </label>
                                <input type="text" value={userData.nome + ' ' + userData.sobrenome} readOnly/>
                            </div>
                            <div className="label_text">
                                <label htmlFor="">Email: </label>
                                <input type="text" value={userData.email} readOnly/>
                            </div>
                        </div>
                        <div className="profile_pages">
                            <h3>Páginas do usuário:</h3>
                            {message && <div className="error_message">{message}</div>}
                            <div className="ctn_boxs">
                                {userPages.length > 0 ? (
                                    <>
                                        {paginasVisiveis.map((page) => (
                                            <div
                                                key={page.id}
                                                className="box_page"
                                                onClick={(e) => handlePageClick(e, page)}
                                                style={{
                                                    cursor: "pointer",
                                                    opacity: page.isExpired ? 0.5 : 1,
                                                    border: page.isExpired ? "3px dashed red" : "3px dashed var(--roxo)"
                                                }}
                                            >
                                                <p><strong>URL: /</strong>{page.url}</p>
                                                <p><strong>Plano: </strong>{page.plano}</p>
                                                <p><strong>Data: </strong>{new Date(page.criado_em.toDate ? page.criado_em.toDate() : page.criado_em).toLocaleDateString('pt-BR')}</p>
                                                {page.isExpired && <p className="expired">Página Expirada</p>}
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