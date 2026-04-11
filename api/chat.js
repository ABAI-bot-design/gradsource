export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  console.log('API key present:', !!process.env.ANTHROPIC_API_KEY);
  console.log('Request body:', req.body);

  try {
    const { messages, system } = req.body;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 300,
        system: system,
        messages: messages
      })
    });

    const data = await response.json();
    console.log('Anthropic response status:', response.status);
    console.log('Anthropic response data:', JSON.stringify(data));
    const text = data.content[0].text;
    return res.status(200).json({ text });

  } catch (error) {
    console.error('Graston error:', error);
    return res.status(500).json({
      error: 'Graston is having a moment — please try again.'
    });
  }
}
