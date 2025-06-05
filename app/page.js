

'use client';

import React, { useState } from 'react';

const initialContacts = [
  {
    id: 1,
    name: 'Lucas Andrade',
    photo: 'https://i.pravatar.cc/150?img=11',
    messages: [
      { role: 'user', text: 'Oi! Gostaria de saber sobre os horários disponíveis para inglês.' },
      { role: 'vendedor', text: 'Olá Lucas! Temos turmas de manhã, tarde e noite. Qual período prefere?' },
      { role: 'user', text: 'Noite seria ótimo, trabalho durante o dia.' },
      { role: 'vendedor', text: 'Perfeito! Temos turma às 19h às segundas e quartas.' },
    ],
  },
  {
    id: 2,
    name: 'Fernanda Costa',
    photo: 'https://i.pravatar.cc/150?img=12',
    messages: [
      { role: 'user', text: 'Boa tarde. Ainda está valendo a promoção de matrícula grátis?' },
      { role: 'vendedor', text: 'Boa tarde, Fernanda! Sim, até o final do mês você garante matrícula gratuita!' },
      { role: 'user', text: 'Que ótimo! Preciso levar algum documento para fazer a inscrição?' },
      { role: 'vendedor', text: 'Apenas RG e comprovante de residência já bastam 😊' },
    ],
  },
  {
    id: 3,
    name: 'Carlos Mota',
    photo: 'https://i.pravatar.cc/150?img=13',
    messages: [
      { role: 'user', text: 'Olá! Meu filho Pedro pode mudar de turma? Ele teve um problema de horário.' },
      { role: 'vendedor', text: 'Claro, Sr. Carlos. Qual novo horário seria ideal?' },
      { role: 'user', text: 'Seria melhor às 17h em vez das 16h.' },
      { role: 'vendedor', text: 'Vamos verificar disponibilidade e confirmamos ainda hoje.' },
    ],
  },
  {
    id: 4,
    name: 'Juliana Ribeiro',
    photo: 'https://i.pravatar.cc/150?img=14',
    messages: [
      { role: 'user', text: 'Oi! Gostaria de cancelar minha matrícula.' },
      { role: 'vendedor', text: 'Oi Juliana 😢 Posso saber o motivo? Talvez possamos te ajudar com alguma condição especial.' },
      { role: 'user', text: 'É só questão de tempo mesmo, estou cheia de compromissos.' },
      { role: 'vendedor', text: 'Entendo! Que tal uma turma aos sábados? Assim não interfere na semana.' },
    ],
  },
  {
    id: 5,
    name: 'Thiago Freitas',
    photo: 'https://i.pravatar.cc/150?img=15',
    messages: [
      { role: 'user', text: 'Vocês emitem certificado válido internacionalmente?' },
      { role: 'vendedor', text: 'Sim! Após a conclusão você pode fazer os exames internacionais como TOEIC e TOEFL com nosso suporte.' },
      { role: 'user', text: 'Excelente. É incluso no curso ou pago à parte?' },
      { role: 'vendedor', text: 'O suporte é incluso, a prova oficial tem taxa separada.' },
    ],
  },
  {
    id: 6,
    name: 'Laura Martins',
    photo: 'https://i.pravatar.cc/150?img=16',
    messages: [
      { role: 'user', text: 'Gostaria de saber mais sobre o intercâmbio da Influx.' },
      { role: 'vendedor', text: 'Oi Laura! Temos parcerias com escolas no Canadá e Irlanda. É uma oportunidade incrível 😍' },
      { role: 'user', text: 'Quanto tempo de curso eu preciso ter para participar?' },
      { role: 'vendedor', text: 'A partir do segundo semestre você já pode se inscrever no programa.' },
    ],
  },
  {
    id: 7,
    name: 'Ricardo Lima',
    photo: 'https://i.pravatar.cc/150?img=17',
    messages: [
      { role: 'user', text: 'Boa noite, vocês oferecem plano família?' },
      { role: 'vendedor', text: 'Sim Ricardo! A partir de 2 matrículas você ganha desconto progressivo.' },
      { role: 'user', text: 'Maravilha. Eu e minha esposa queremos começar juntos.' },
      { role: 'vendedor', text: 'Ótimo! Vou preparar a proposta personalizada para vocês ainda hoje.' },
    ],
  },
  {
    id: 8,
    name: 'Sofia Torres',
    photo: 'https://i.pravatar.cc/150?img=18',
    messages: [
      { role: 'user', text: 'Tem vaga pra turma kids essa semana?' },
      { role: 'vendedor', text: 'Oi Sofia! Sim, temos uma vaga na turma kids segunda e quarta às 14h.' },
      { role: 'user', text: 'Meu filho tem 6 anos, pode participar?' },
      { role: 'vendedor', text: 'Com certeza! Essa turma é ideal para a faixa etária dele 😊' },
    ],
  },
];

export default function App() {
  const [contacts, setContacts] = useState(initialContacts);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [input, setInput] = useState('');
  const [iaQuestion, setIaQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [typingMessage, setTypingMessage] = useState('');
  const [showContactsMobile, setShowContactsMobile] = useState(false);
  const [messageCount, setMessageCount] = useState(1);
const [customCount, setCustomCount] = useState(5); // valor padrão para personalizado



  const selectedContact = contacts.find((c) => c.id === selectedContactId);

  const handleSendMessage = (text) => {
    if (!text || !selectedContact) return;
    const newMessage = { role: 'vendedor', text };
    const updatedContacts = contacts.map((contact) => {
      if (contact.id === selectedContact.id) {
        return { ...contact, messages: [...contact.messages, newMessage] };
      }
      return contact;
    });
    setContacts(updatedContacts);
    setInput('');
  };

  const handleIARequest = async (messagesToSend) => {
    if (!selectedContact) return;
    if (!iaQuestion.trim()) {
      alert('Digite a pergunta que quer enviar para a IA.');
      return;
    }

    setLoading(true);
    setTypingMessage('Digitando...');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: iaQuestion, messages: messagesToSend }),
      });

      const data = await res.json();
      setTypingMessage('');
handleSendMessage(data.answer);
setLoading(false);

    } catch (err) {
      console.error(err);
      simulateTyping('❌ Erro ao buscar resposta da IA.');
    }
  };

  const simulateTyping = (text) => {
    let index = 0;
    setTypingMessage('');

    const interval = setInterval(() => {
      if (index < text.length) {
        setTypingMessage((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(interval);
        setTypingMessage('');
        handleSendMessage(text);
        setLoading(false);
      }
    }, 20);
  };
  const handleQuickSelectIA = () => {
    if (!selectedContact) return;
  
    const messagesToSend =
      messageCount === 'all'
        ? selectedContact.messages
        : selectedContact.messages.slice(-messageCount);
  
    handleIARequest(messagesToSend);
  };
  
  
  return (
    <div className="flex h-screen w-full bg-[#f7faf7] text-gray-800 font-inter overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed z-20 md:relative bg-white border-r  border-[#d2f0d8] h-screen w-64 transform transition-transform duration-300 ease-in-out
        ${showContactsMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-[#d2f0d8] shadow-sm">
          <h2 className="text-xl font-bold text-green-700">Contatos</h2>
          <button className="md:hidden text-2xl" onClick={() => setShowContactsMobile(false)}>&times;</button>
        </div>
        <div className="overflow-y-auto h-full">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => {
                setSelectedContactId(contact.id);
                setShowContactsMobile(false);
              }}
              className={`flex items-center px-4 py-4 cursor-pointer hover:bg-[#e3f9ea] transition ${
                selectedContactId === contact.id ? 'bg-[#b2e5bf]/50' : ''
              } border-b border-[#eaf5ec]`}
            >
              <img src={contact.photo} alt={contact.name} className="w-11 h-11 rounded-full mr-3 shadow-sm" />
              <div className="truncate">
                <div className="font-semibold text-gray-800">{contact.name}</div>
                <div className="text-sm text-gray-500 truncate max-w-[180px]">
                  {contact.messages[contact.messages.length - 1]?.text.slice(0, 30)}...
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>
  
      {/* Main chat window */}
      <main className="flex-1 flex flex-col ml-0 max-w-5xl mx-auto w-full shadow-md bg-white">
  <header className="flex items-center justify-between p-4 bg-[#b9e2c4] shadow-sm">
    <button
      className="text-2xl md:hidden"
      onClick={() => setShowContactsMobile(true)}
      aria-label="Abrir contatos"
    >
      ☰
    </button>
    <strong className="truncate text-lg text-green-800 font-semibold">
      {selectedContact ? `Conversando com ${selectedContact.name}` : 'Selecione um contato'}
    </strong>
  </header>

  {selectedContact ? (
    <>
      {/* Mensagens */}
      <section className="flex-1 overflow-y-auto px-6 py-4 space-y-3 bg-[#f7faf7]">
        {selectedContact.messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-2xl shadow-sm max-w-[75%] transition whitespace-pre-wrap ${
              msg.role === 'user'
                ? 'ml-auto bg-[#d2f0d8] text-right'
                : msg.fromIA
                ? 'bg-[#fff7cc] text-left border border-yellow-300'
                : 'bg-[#eaf5ec] text-left'
            }`}
          >
            <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">
              {msg.role === 'user' ? 'Cliente' : msg.fromIA ? 'IA' : 'Você'}
            </p>
            <p>{msg.text}</p>
          </div>
        ))}

        {/* Simulação de digitação da IA (não vai pro histórico) */}
        {typingMessage && (
          <div className="p-4 rounded-2xl bg-[#fff7cc] border border-yellow-300 max-w-[75%] text-left shadow-sm whitespace-pre-wrap">
            <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">IA</p>
            <p>{typingMessage}</p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="p-4 bg-[#b9e2c4] space-y-3 shadow-inner">
        <textarea
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite uma mensagem para o cliente..."
          className="w-full p-4 border border-[#c8eccc] rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 bg-white transition"
        />
        <textarea
          rows={2}
          value={iaQuestion}
          onChange={(e) => setIaQuestion(e.target.value)}
          placeholder="Pergunta para a IA (ex: O que posso responder?)"
          className="w-full p-4 border border-[#c8eccc] rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 bg-white transition"
        />

        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <label htmlFor="msgCount" className="font-medium">Mensagens analisadas:</label>
            <select
              id="msgCount"
              value={messageCount === 'all' ? 'all' : messageCount === 1 ? '1' : 'custom'}
              onChange={(e) => {
                const value = e.target.value;
                if (value === 'all') setMessageCount('all');
                else if (value === '1') setMessageCount(1);
                else setMessageCount(customCount);
              }}
              className="border border-[#c8eccc] rounded-lg px-3 py-1 bg-white focus:ring-1 focus:ring-green-400"
            >
              <option value="1">Última</option>
              <option value="custom">Escolher número</option>
              <option value="all">Todas</option>
            </select>

            {messageCount !== 'all' && messageCount > '-1' && (
              <input
                type="number"
                min="1"
                max="1000"
                value={customCount}
                onChange={(e) => {
                  const val = e.target.value;
                  setCustomCount(val);
                  const parsed = parseInt(val);
                  if (!isNaN(parsed)) setMessageCount(parsed);
                }}
                className="w-24 px-3 py-1 border border-[#c8eccc] rounded-lg focus:outline-none focus:ring-1 focus:ring-green-400"
                placeholder="Ex: 10"
              />
            )}
          </div>

          <button
            onClick={() => handleSendMessage(input)}
            disabled={!input}
            className={`flex-1 py-3 rounded-xl font-semibold text-white text-sm tracking-wide transition ${
              input ? 'bg-green-500 hover:bg-green-600' : 'bg-green-200 cursor-not-allowed'
            }`}
          >
            Enviar Mensagem
          </button>

          <button
            onClick={handleQuickSelectIA}
            disabled={loading || !iaQuestion.trim()}
            className={`flex-1 py-3 rounded-xl font-semibold text-white text-sm tracking-wide transition ${
              !loading && iaQuestion.trim()
                ? 'bg-green-400 hover:bg-green-500'
                : 'bg-green-200 cursor-not-allowed'
            }`}
          >
            {loading ? 'Consultando IA...' : '💡 Perguntar IA'}
          </button>
        </div>
      </footer>
    </>
  ) : (
    <div className="flex items-center justify-center flex-1 text-gray-500 bg-[#f7faf7]">
      Selecione um contato para iniciar
    </div>
  )}
</main>

    </div>
  );
  
  
}
