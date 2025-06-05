

'use client';
import React, { useState, useEffect, useRef } from 'react';


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

  {
    id: 9,
    name: 'André Nogueira',
    photo: 'https://i.pravatar.cc/150?img=19',
    messages: [
      { role: 'user', text: 'Quais são os materiais didáticos usados nas aulas?' },
      { role: 'vendedor', text: 'Utilizamos materiais próprios da Influx e também livros internacionais como o Interchange.' },
      { role: 'user', text: 'Os livros estão inclusos no valor da matrícula?' },
      { role: 'vendedor', text: 'O primeiro livro é incluso, os demais são adquiridos conforme o avanço do curso.' },
      { role: 'user', text: 'Entendi, obrigado pelo esclarecimento!' },
    ],
  },
  {
    id: 10,
    name: 'Camila Pires',
    photo: 'https://i.pravatar.cc/150?img=20',
    messages: [
      { role: 'user', text: 'O curso é presencial ou online?' },
      { role: 'vendedor', text: 'Oferecemos ambos os formatos, Camila. Você prefere qual modalidade?' },
      { role: 'user', text: 'Online seria ideal no momento.' },
      { role: 'vendedor', text: 'Perfeito! Temos turmas online com aulas ao vivo via Zoom.' },
      { role: 'user', text: 'Aulas gravadas também ficam disponíveis?' },
      { role: 'vendedor', text: 'Sim, você pode rever sempre que quiser pela nossa plataforma 😊' },
    ],
  },
  {
    id: 11,
    name: 'Beatriz Mendes',
    photo: 'https://i.pravatar.cc/150?img=21',
    messages: [
      { role: 'user', text: 'Como funciona o plano corporativo para empresas?' },
      { role: 'vendedor', text: 'Temos planos especiais para equipes! Personalizamos de acordo com a necessidade da empresa.' },
      { role: 'user', text: 'Legal. Vocês emitem relatórios de desempenho?' },
      { role: 'vendedor', text: 'Sim! Enviamos relatórios mensais com evolução e presença de cada colaborador.' },
    ],
  },
  {
    id: 12,
    name: 'Eduardo Silveira',
    photo: 'https://i.pravatar.cc/150?img=22',
    messages: [
      { role: 'user', text: 'Tenho uma viagem marcada. Posso repor as aulas perdidas?' },
      { role: 'vendedor', text: 'Claro! Você pode agendar reposições em turmas de mesmo nível ou aula particular.' },
      { role: 'user', text: 'Tem custo extra pra aula particular?' },
      { role: 'vendedor', text: 'Sim, mas oferecemos desconto especial para alunos ativos.' },
    ],
  },
  {
    id: 13,
    name: 'Patrícia Rocha',
    photo: 'https://i.pravatar.cc/150?img=23',
    messages: [
      { role: 'user', text: 'Como faço para mudar de nível mais rápido?' },
      { role: 'vendedor', text: 'Você pode fazer uma prova de nivelamento a cada semestre e acelerar sua progressão.' },
      { role: 'user', text: 'Ah, então posso pular etapas?' },
      { role: 'vendedor', text: 'Sim, se atingir a pontuação necessária! Podemos marcar a próxima prova pra você 😊' },
    ],
  },
  {
    id: 14,
    name: 'Daniel Almeida',
    photo: 'https://i.pravatar.cc/150?img=24',
    messages: [
      { role: 'user', text: 'Queria um curso mais intensivo. Tem essa opção?' },
      { role: 'vendedor', text: 'Temos o módulo intensivo com aulas de segunda a quinta, ideal para quem quer agilidade.' },
      { role: 'user', text: 'Quantas horas por semana?' },
      { role: 'vendedor', text: 'São 8 horas por semana com foco em conversação e vocabulário.' },
    ],
  },
  {
    id: 15,
    name: 'Mariana Lopes',
    photo: 'https://i.pravatar.cc/150?img=25',
    messages: [
      { role: 'user', text: 'Vocês trabalham com professores nativos?' },
      { role: 'vendedor', text: 'Sim! Temos professores nativos e também brasileiros fluentes com vivência no exterior.' },
      { role: 'user', text: 'Posso escolher com quem quero ter aula?' },
      { role: 'vendedor', text: 'Pode sim! A escolha é feita no momento da matrícula 😊' },
    ],
  },
  {
    id: 16,
    name: 'Felipe Souza',
    photo: 'https://i.pravatar.cc/150?img=26',
    messages: [
      { role: 'user', text: 'A escola oferece certificado ao final do curso?' },
      { role: 'vendedor', text: 'Sim! Emitimos certificado válido nacionalmente e preparamos você para certificações internacionais.' },
      { role: 'user', text: 'Tem algum custo para emitir?' },
      { role: 'vendedor', text: 'Não, o certificado da Influx é gratuito. As certificações externas têm taxa das instituições.' },
    ],
  },
  {
    id: 17,
    name: 'Rafaela Duarte',
    photo: 'https://i.pravatar.cc/150?img=27',
    messages: [
      { role: 'user', text: 'Estou procurando aulas particulares de inglês para conversação.' },
      { role: 'vendedor', text: 'Temos pacotes personalizados focados em conversação com professores experientes!' },
      { role: 'user', text: 'Quantas aulas posso fazer por semana?' },
      { role: 'vendedor', text: 'Você escolhe! Temos opções de 1 a 5 vezes por semana, conforme sua disponibilidade.' },
    ],
  },
  {
    id: 18,
    name: 'João Guilherme',
    photo: 'https://i.pravatar.cc/150?img=28',
    messages: [
      { role: 'user', text: 'Queria saber mais sobre o curso de inglês para negócios.' },
      { role: 'vendedor', text: 'Temos um módulo específico para Business English, com vocabulário profissional e simulações reais.' },
      { role: 'user', text: 'Esse curso é separado do tradicional?' },
      { role: 'vendedor', text: 'É um complemento. Você pode fazer junto ao curso regular ou de forma independente.' },
    ],
  },
  {
    id: 19,
    name: 'Tatiane Ferreira',
    photo: 'https://i.pravatar.cc/150?img=29',
    messages: [
      { role: 'user', text: 'Qual a duração total do curso completo?' },
      { role: 'vendedor', text: 'O curso regular tem duração média de 2 anos, mas pode variar conforme o seu ritmo.' },
      { role: 'user', text: 'Tem prova pra passar de nível?' },
      { role: 'vendedor', text: 'Sim! A cada módulo há uma avaliação para garantir seu progresso.' },
    ],
  },
  {
    id: 20,
    name: 'Vinicius Prado',
    photo: 'https://i.pravatar.cc/150?img=30',
    messages: [
      { role: 'user', text: 'Como são as aulas nos sábados? Tem bastante aluno?' },
      { role: 'vendedor', text: 'As turmas de sábado são bem procuradas! São mais enxutas e focadas.' },
      { role: 'user', text: 'Dá pra marcar reposição aos sábados?' },
      { role: 'vendedor', text: 'Sim, temos plantões e reposições nesse dia também.' },
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
const [customCount, setCustomCount] = useState(5); 
const [showIAInput, setShowIAInput] = useState(false);
const bottomRef = useRef(null);
useEffect(() => {
  if (bottomRef.current) {
    bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }
}, [contacts, typingMessage]);


  const selectedContact = contacts.find((c) => c.id === selectedContactId);

  const handleSendMessage = (text, fromIA = false) => {
    if (!text || !selectedContact) return;
    const newMessage = { role: fromIA ? 'ia' : 'vendedor', text, fromIA };
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
      handleSendMessage(data.answer, true);
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
    setIaQuestion("");
  };
  
  
  return (
    <div className="flex h-screen bottom-0 w-full bg-[#f7faf7] text-gray-800 font-inter overflow-hidden">
      {/* Sidebar de Contatos */}
      <aside
        className={`fixed z-20 md:relative bg-white border-r border-[#d2f0d8] h-screen w-64 transform transition-transform duration-300 ease-in-out
        ${showContactsMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-[#d2f0d8] shadow-sm">
          <h2 className="text-xl font-bold text-green-700">Contatos</h2>
          <button className="md:hidden text-2xl" onClick={() => setShowContactsMobile(false)}>
            &times;
          </button>
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
  
      {/* Área principal */}
      <main className="flex-1 flex flex-col ml-0 max-w-5xl mx-auto w-full shadow-md bg-white">
        {/* Header do Chat */}
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
               ? 'bg-[#eaf5ec] text-left'
               : msg.role === 'ia'
               ? 'ml-auto bg-[#fff7cc] text-right border border-yellow-300'
               : 'ml-auto bg-[#d2f0d8] text-left'
           }`}
         
         
                  
                >
                  <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">
                    {msg.role === 'user' ? selectedContact.name : msg.role === 'ia' ? 'IA' : 'Você'}
                  </p>
                  <p>{msg.text}</p>
                </div>
              ))}
  
              {typingMessage && (
                <div className="p-4 rounded-2xl bg-[#fff7cc] border border-yellow-300 max-w-[75%] text-right shadow-sm whitespace-pre-wrap">
                  <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">IA</p>
                  <p>{typingMessage}</p>
                </div>
              )}
               <div ref={bottomRef} />
            </section>
  
            {/* Footer com campos de entrada */}
            <footer className="p-4 bg-[#b9e2c4]space-y-3 bottom-0 shadow-inner">
              <textarea
                rows={2}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite uma mensagem para o cliente..."
                className="w-full p-4 border border-[#c8eccc] rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 bg-white transition"
              />
  
              <div className="flex flex-wrap gap-3 items-center">
             
  
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
                onClick={() => setShowIAInput(true)}
                className="py-3 px-4 bg-yellow-300 hover:bg-yellow-400 rounded-xl font-semibold text-yellow-900 text-sm tracking-wide transition"
              >
                💡 IA
              </button>
            
              </div>
  
             
            </footer>
          </>
        ) : (
          <div className="flex items-center justify-center flex-1 text-gray-500 bg-[#f7faf7]">
            Selecione um contato para iniciar
          </div>
        )}
  
        {/* Painel lateral da IA */}
        {showIAInput && (
          <div className="fixed bottom-0 right-0 md:top-0 md:h-full md:max-w-sm w-full md:w-[400px] z-50 bg-white border-l border-green-200 shadow-xl transition transform translate-y-0 md:translate-y-0">
            <div className="w-full max-w-md bg-white h-full shadow-xl p-6 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-green-700">Assistente IA</h2>
                <button
                  onClick={() => {
                    setShowIAInput(false);
                    setIaQuestion('');
                  }}
                  className="text-2xl text-gray-600 hover:text-red-500"
                >
                  &times;
                </button>
              </div>
  
              <textarea
                rows={5}
                value={iaQuestion}
                onChange={(e) => setIaQuestion(e.target.value)}
                placeholder="Digite sua pergunta para a IA..."
                className="flex-1 w-full p-4 border border-[#c8eccc] rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-[#fffef7] transition mb-4"
              />
  
              <div className="flex items-center gap-2 mb-4">
                <label htmlFor="msgCountSidebar" className="text-sm text-gray-700 font-medium">
                  Analisar últimas:
                </label>
                <select
                  id="msgCountSidebar"
                  value={messageCount === 'all' ? 'all' : messageCount === 1 ? '1' : 'custom'}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === 'all') setMessageCount('all');
                    else if (value === '1') setMessageCount(1);
                    else setMessageCount(customCount);
                  }}
                  className="border border-[#c8eccc] rounded-lg px-2 py-1 bg-white"
                >
                  <option value="1">1</option>
                  <option value="custom">Personalizado</option>
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
                    className="w-20 px-2 py-1 border border-[#c8eccc] rounded-lg"
                    placeholder="Ex: 10"
                  />
                )}
              </div>
  
              <button
                onClick={() => {
                  handleQuickSelectIA();
                  setShowIAInput(false);
                }}
                disabled={loading || !iaQuestion.trim()}
                className={`py-3 rounded-xl font-semibold text-white text-sm tracking-wide transition ${
                  !loading && iaQuestion.trim()
                    ? 'bg-yellow-400 hover:bg-yellow-500'
                    : 'bg-yellow-200 cursor-not-allowed'
                }`}
              >
                {loading ? 'Consultando IA...' : 'Enviar para IA'}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
  
  
}
