import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import stripePromise from './StripeConfig';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import '../Pagamento/Pagamento.css';

const Pagamento = ({ valorPlano, selectedPlan }) => {
    const [carregando, setCarregando] = useState(false);
    const [nome, setNome] = useState('');
    const [metodoPagamento, setMetodoPagamento] = useState('Cartão');
    const [planoRecorrente, setPlanoRecorrente] = useState(false);
    const [erro, setErro] = useState('');

    const navigate = useNavigate();

    const stripe = useStripe();
    const elements = useElements();

    const handlePagamento = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setCarregando(true);

        try {
            if (metodoPagamento === 'Cartão') {
                const cardElement = elements.getElement(CardElement);
                if (!cardElement) return;

                const { error } = await stripe.createToken(cardElement, {
                    name: nome,
                });

                if (error) {
                    console.error("Erro ao criar token:", error.message);
                    setErro("Erro ao processar pagamento. Tente novamente.");
                    setCarregando(false);
                    return;
                }

                alert("Pagamento realizado com sucesso!");
                navigate('/sucesso');
            } else if (metodoPagamento === 'Pix') {
                alert("Pagamento com Pix iniciado! Verifique o QR Code.");
                navigate('/sucesso');
            }

            if (planoRecorrente) {
                console.log("Criando pagamento recorrente...");
            }

        } catch (err) {
            console.error('Erro ao processar pagamento:', err);
            setErro("Erro inesperado. Tente novamente mais tarde.");
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className='container_pagamento'>
            <h2 className='title'>Pagamento</h2>
            <p className='content_create'>Plano escolhido: <strong>{selectedPlan}</strong></p>
            <p className='content_create'>Valor a ser pago: <strong>R$ {valorPlano.toFixed(2)}</strong></p>
            <p className='content_create'>Escolheu pagar com: <strong>{metodoPagamento}</strong></p>

            {erro && <div style={{ color: 'red' }}>{erro}</div>}

            <form onSubmit={handlePagamento}>
                {metodoPagamento === 'Cartão' && (
                    <input
                        type="text"
                        placeholder="Nome no cartão"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                        className='nome_pagamento'
                    />
                )}

                <div className='opt_pagamento'>
                    <label>
                        <input
                            type="radio"
                            value="Cartão"
                            checked={metodoPagamento === 'Cartão'}
                            onChange={() => setMetodoPagamento('Cartão')}
                        /> Cartão
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Pix"
                            checked={metodoPagamento === 'Pix'}
                            onChange={() => setMetodoPagamento('Pix')}
                        /> Pix
                    </label>
                </div>

                {metodoPagamento === 'Cartão' && (
                    <>
                        <CardElement options={{ hidePostalCode: true }} />
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={planoRecorrente}
                                    onChange={() => setPlanoRecorrente(!planoRecorrente)}
                                /> Pagamento recorrente (mensal)
                            </label>
                        </div>
                    </>
                )}

                <button type="submit" disabled={!stripe || carregando}>
                    {carregando ? 'Processando...' : 'Pagar'}
                </button>
            </form>
        </div>
    );
};

const PagamentoWrapper = ({ valorPlano, selectedPlan }) => (
    <Elements stripe={stripePromise}>
        <Pagamento valorPlano={valorPlano} selectedPlan={selectedPlan}/>
    </Elements>
);

export default PagamentoWrapper;
