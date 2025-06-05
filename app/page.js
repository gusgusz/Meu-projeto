'use client'

import React, { useState } from 'react';

export default function App() {
  const [messages] = useState([
    { role: 'user', text: 'Oi, estou interessado no produto X, como ele funciona?' },
    { role: 'vendedor', text: 'Olá! O produto X ajuda a melhorar sua produtividade em até 50%.' },
    { role: 'user', text: 'Tem desconto se eu comprar dois?' },
    { role: 'vendedor', text: 'Podemos oferecer 10% se fechar agora!' },
  ]);

  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleIARequest = async () => {
    if (!question) {
      alert('Digite uma pergunta para a assistente.');
      return;
    }

    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, messages }),
      });

      const data = await res.json();
      setResponse(data.answer);
    } catch (err) {
      console.error(err);
      setResponse('❌ Erro ao buscar resposta da IA.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#121212', color: 'white', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>💬 Assistente de Vendas via WhatsApp</h1>

      <div style={{ marginBottom: '2rem' }}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: msg.role === 'user' ? '#1e88e5' : '#2a2a2a',
              padding: '1rem',
              borderRadius: '10px',
              marginBottom: '0.5rem',
              textAlign: msg.role === 'user' ? 'right' : 'left',
              color: 'white',
              maxWidth: '80%',
              marginLeft: msg.role === 'user' ? 'auto' : 0,
            }}
          >
            <strong>{msg.role === 'user' ? 'Cliente' : 'Vendedor'}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ex: O que posso responder agora para convencer o cliente?"
        rows={3}
        style={{
          width: '100%',
          maxWidth: '600px',
          padding: '1rem',
          marginBottom: '1rem',
          borderRadius: '8px',
          border: '1px solid #555',
          backgroundColor: '#1e1e1e',
          color: 'white',
        }}
      />

      <button
        onClick={handleIARequest}
        disabled={loading}
        style={{
          padding: '1rem 2rem',
          backgroundColor: '#43a047',
          color: 'white',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '10px',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Consultando IA...' : '💡 Obter Sugestão da IA'}
      </button>

      {response && (
        <div
          style={{
            marginTop: '2rem',
            padding: '1rem',
            backgroundColor: '#1a1a1a',
            border: '1px solid #333',
            borderRadius: '10px',
            whiteSpace: 'pre-wrap',
          }}
        >
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>📌 Sugestão da Assistente:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
