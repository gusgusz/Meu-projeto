// app/api/chat/route.js
export async function POST(request) {
  const { question, messages } = await request.json();

  const formattedMessages = messages.map((msg) => {
    return `${msg.role === 'user' ? 'Cliente' : 'Vendedor'}: ${msg.text}`;
  }).join('\n');

  const prompt = `
  Você é uma assistente de vendas que atua como parceira do time comercial, ajudando de forma empática e estratégica na comunicação com clientes pelo WhatsApp.
  
  Aqui está a conversa até agora:
  ${formattedMessages}
  
  O vendedor está em dúvida e gostaria de ajuda para responder melhor a esta pergunta: ${question}
  
  Com base na conversa, se fizer sentido, sugira:
  - Ideias de resposta que sejam claras, empáticas e eficazes
  - Oportunidades sutis de aplicar técnicas como urgência, prova social ou autoridade
  - Dicas de abordagem que possam aumentar as chances de conversão
  
  Fale de forma natural e amigável, como se estivesse conversando com o vendedor. No máximo 150 palavras.
  `;
  

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    console.log(data);
    const answer = data.choices?.[0]?.message?.content || 'Sem resposta da IA.';

    return Response.json({ answer });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erro na OpenAI' }), { status: 500 });
  }
}
