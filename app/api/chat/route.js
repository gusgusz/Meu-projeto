// app/api/chat/route.js
export async function POST(request) {
  const { question, messages } = await request.json();

  const formattedMessages = messages.map((msg) => {
    return `${msg.role === 'user' ? 'Cliente' : 'Vendedor'}: ${msg.text}`;
  }).join('\n');

  const prompt = `
Você é uma assistente de vendas experiente que ajuda vendedores a melhorar sua comunicação com clientes via WhatsApp.

Aqui está a conversa atual:
${formattedMessages}

O vendedor quer saber: ${question}

Com base nessa conversa, forneça:
- Dicas práticas do que responder
- Oportunidades de usar técnicas de copywriting (urgência, escassez, prova social, autoridade)
- Estratégias para aumentar a taxa de conversão

Responda de forma clara, objetiva e como se estivesse dando conselhos diretos para o vendedor.
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
