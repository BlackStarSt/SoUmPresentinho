import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import '../Profile/Profile.css';
import user from '../../assets//icons/user.png'

import { db } from "../../db/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const Profile = () => {
    const [userData, setUserData] = useState({
        email: '',
        nome: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        // Verifica se o usuário está logado
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) {
            navigate('/login'); // Se não estiver logado, redireciona para a página de login
            return;
        }

        // Se o usuário estiver logado, busca os dados do usuário no Firestore
        const fetchUserData = async () => {
            try {
                const q = query(
                    collection(db, "usuarios"),
                    where("email", "==", userEmail)
                );
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                        const user = doc.data();
                        setUserData({
                            email: user.email,
                            nome: user.nome
                        });
                    });
                } else {
                    console.log('Usuário não encontrado!');
                    alert('Usuário não encontrado!');
                }
            } catch (error) {
                console.error("Erro ao carregar dados do usuário:", error);
                alert('Erro ao carregar os dados do usuário.');
            }
        };

        fetchUserData();
    }, [navigate]);

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
