export async function POST(request) {
  const { question } = await request.json();

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: question }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || 'Sem resposta da IA.';

    return Response.json({ answer });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erro na OpenAI' }), { status: 500 });
  }
}