import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../db/firebase.js";

import '../Profile/Profile.css';
import user from '../../assets//icons/user.png'

const Profile = () => {
    const [userData, setUserData] = useState({ nome: "", email: "" });

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
            } catch (error) {
                console.error("Erro ao buscar dados do usuário:", error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="container_profile">
            <div className="container">
                <img src={user} alt="Perfil" className="profile_img" />
                <div className="profile_data">
                    <h2 className="profile_title">Dados</h2>
                    <div className="profile_texts">
                        <p className="profile_name">Nome: {userData.nome}</p>
                        <p className="profile_email">Email: {userData.email}</p>
                    </div>
                    <div className="profile_pages"></div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
