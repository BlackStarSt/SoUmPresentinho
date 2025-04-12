import React from "react";
import '../Home/Home.css';
import check from '../../assets/icons/check.png'
import notCheck from '../../assets/icons/X.png'
import heroImg from '../../assets/icons/hero_img.png'

const Home = () => {

    return (
        <>
            <div className="home">
                <section className="hero_section">
                    <div className="ctn_text">
                        <h1 className="title">Só uma lembrancinha</h1>
                        <p className="content">Já imaginou eternizar um momento especial de forma única e digital?<br />
                            Preencha o formulário e receba um site exclusivo com um link pronto para compartilhar com quem você ama.
                            Personalize com fotos, mensagens, músicas e contadores interativos para tornar o presente ainda mais emocionante.
                        </p>
                        <div className="ctn_btn">
                            <button className="btn_hero">Criar agora</button>
                        </div>
                    </div>
                    <img src={heroImg} alt="Pessoas comemorando em cima de uma caixa de presente" className="hero_img"/>
                </section>
                <section className="func_section">
                    <h1 className="title">Como funciona?</h1>
                    <p className="content">Com poucos cliques, registre lembranças e tenha memórias sempre à mão. Relembre, reviva e ressignifique momentos especiais.</p>
                    <div className="ctn_box">
                        <div className="box">
                            <p className="num">1.</p>
                            <p className="num_txt">Complete o formulário com carinho para começar a criar sua memória.</p>
                        </div>
                        <div className="box">
                            <p2 className="num">2.</p2>
                            <p2 className="num_txt">Finalize com segurança usando Cartão de Crédito ou PIX.</p2>
                        </div>
                        <div className="box">
                            <p className="num">3.</p>
                            <p className="num_txt">Receba na hora o QR Code e o link por e-mail para reviver seu momento.</p>
                        </div>
                        <div className="box">
                            <p className="num">4.</p>
                            <p className="num_txt">Encante alguém especial ou guarde para sempre. Compartilhe sua memória!</p>
                        </div>
                    </div>
                </section>
                <section className="plano_section">
                    <h1 className="title">Planos</h1>
                    <div className="ctn_boxPlano">
                        <div className="box_plano">
                            <p className="plano_title">Mensal</p>
                            <ul className="plano_lista">
                                <li className="plano_itens"><img src={check} alt="check" />Texto dedicado</li>
                                <li className="plano_itens"><img src={notCheck} alt="not check" />QrCode Exclusivo</li>
                                <li className="plano_itens"><img src={notCheck} alt="not check" />Máximo de 3 imagens</li>
                                <li className="plano_itens"><img src={check} alt="check" />Com música</li>
                                <li className="plano_itens"><img src={check} alt="check" />URL personalizada</li>
                                <li className="plano_itens"><img src={check} alt="check" />Uma memória</li>
                            </ul>
                            <p className="plano_value">R$ 9,90</p>
                        </div>
                        <div className="box_plano">
                            <p className="plano_title">Anual</p>
                            <ul className="plano_lista">
                                <li className="plano_itens"><img src={check} alt="check" />Texto dedicado</li>
                                <li className="plano_itens"><img src={notCheck} alt="not check" />QrCode Exclusivo</li>
                                <li className="plano_itens"><img src={check} alt="check" />Máximo de 3 imagens</li>
                                <li className="plano_itens"><img src={check} alt="check" />Com música</li>
                                <li className="plano_itens"><img src={check} alt="check" />URL personalizada</li>
                                <li className="plano_itens"><img src={check} alt="check" />Uma memória</li>
                            </ul>
                            <p className="plano_value">R$ 79,90</p>
                        </div>
                        <div className="box_plano">
                            <p className="plano_title">Vitálicio</p>
                            <ul className="plano_lista">
                                <li className="plano_itens"><img src={check} alt="check" />Texto dedicado</li>
                                <li className="plano_itens"><img src={check} alt="check" />QrCode Exclusivo</li>
                                <li className="plano_itens"><img src={check} alt="check" />Máximo de 3 imagens</li>
                                <li className="plano_itens"><img src={check} alt="check" />Com música</li>
                                <li className="plano_itens"><img src={check} alt="check" />URL personalizada</li>
                                <li className="plano_itens"><img src={check} alt="check" />Uma memória</li>
                            </ul>
                            <p className="plano_value">R$ 199,90</p>
                        </div>
                    </div>
                </section>
            </div>
            <footer className="footer">
                <p className="content">Transforme sentimentos em experiências inesquecíveis — simples,<br />marcante e feito por você.</p>
            </footer></>
    )
}

export default Home;