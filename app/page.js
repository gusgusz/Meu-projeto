'use client';

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaRobot } from 'react-icons/fa';

export default function Home() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!question.trim()) return;

    const userMsg = { type: 'user', text: question.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setQuestion('');
    setLoading(true);

    try {
      const res = await axios.post('/api/chat', { question });
      animateBotMessage(res.data.answer);
    } catch (error) {
      animateBotMessage('❌ Erro ao obter resposta da IA.');
    } finally {
      setLoading(false);
    }
  };

  const animateBotMessage = (text) => {
    let i = 0;
    let currentText = '';

    const interval = setInterval(() => {
      currentText += text[i];

      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last && last.type === 'bot') {
          const updated = [...prev.slice(0, -1), { ...last, text: currentText }];
          return updated;
        } else {
          return [...prev, { type: 'bot', text: currentText }];
        }
      });

      i++;
      if (i >= text.length) clearInterval(interval);
    }, 12);
  };

  return (
    <div className="flex flex-col h-screen bg-[#0f0f0f] text-white">
      {/* Cabeçalho */}
      <header className="w-full bg-[#1a1a1a] border-b border-[#333] shadow-md py-4 px-4 text-center">
        <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-wide flex justify-center items-center gap-3">
          <FaRobot className="text-[#1e88e5]" size={28} />
          Assistente V4
        </h1>
      </header>

      {/* Área de mensagens */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 md:px-8 flex flex-col">
        {/* Mensagem de boas-vindas */}
        {messages.length === 0 && !loading && (
          <div className="text-center text-gray-300 text-lg md:text-xl flex flex-col items-center justify-center h-full gap-2">
            <FaRobot className="text-[#1e88e5]" size={48} />
            <p>Olá, eu sou a Assistente V4! 😊</p>
            <p>Em que posso ajudar você hoje?</p>
          </div>
        )}

        {/* Conversa */}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[85%] md:max-w-[70%] px-4 py-3 rounded-xl shadow-sm text-sm md:text-base leading-relaxed whitespace-pre-wrap ${
              msg.type === 'user'
                ? 'bg-[#1e88e5] text-white self-end ml-auto'
                : 'bg-[#2a2a2a] text-[#f1f1f1] self-start'
            }`}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className="text-sm italic text-gray-400">Assistente digitando...</div>
        )}

        <div ref={chatRef} />
      </div>

      {/* Campo de input */}
      <div className="border-t border-[#333] bg-[#1a1a1a] p-4">
        <div className="flex items-center gap-2">
          <textarea
            rows={1}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Digite sua pergunta..."
            disabled={loading}
            className="flex-1 resize-none rounded-full border border-[#333] bg-[#121212] text-white px-5 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1e88e5] transition-all"
          />
          <button
            onClick={handleSend}
            disabled={loading || !question.trim()}
            className="bg-[#1e88e5] hover:bg-[#1565c0] text-white font-semibold px-5 py-3 rounded-full shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '...' : 'Enviar'}
          </button>
        </div>
      </div>
    </div>
  );
}
