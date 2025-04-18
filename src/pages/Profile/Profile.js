import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../db/firebase.js";

import '../Profile/Profile.css';
import user from '../../assets/icons/user.svg'

const Profile = () => {
    const [userData, setUserData] = useState({ nome: "", email: "" });
    const [userPages, setUserPages] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            const emailUsuario = localStorage.getItem("emailUsuario");

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
                const p = query(paginasRef, where("usuarioEmail", "==", emailUsuario))
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

    return (
        <div className="container_profile">
            <div className="container">
                <div className="profile">
                    <img src={user} alt="Perfil" className="profile_img" />
                    <div className="profile_data">
                        <h2 className="profile_title">Dados</h2>
                        <div className="profile_texts">
                            <p className="profile_name">Nome: {userData.nome}</p>
                            <p className="profile_email">Email: {userData.email}</p>
                        </div>
                        <div className="profile_pages">
                            <h3>Páginas do usuário:</h3>
                            {userPages.length > 0 ? (
                                userPages.map((page) => (
                                    <div key={page.id} className="box_page"
                                        onClick={() => window.location.href = page.url}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <p><strong>URL: /</strong>{page.url}</p>
                                        <p><strong>Título:</strong> {page.titulo}</p>
                                        <p><strong>Plano:</strong> {page.plano}</p>
                                    </div>
                                ))
                            ) : (
                                <p>Não há páginas cadastradas.</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="profile_btns">
                    <Link to={'/create'} className="p_btn">
                        <button className="p_btn">Nova página</button>
                    </Link>
                    <button className="p_btn">Editar perfil</button>
                    <button className="p_btn">Sair</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
