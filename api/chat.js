import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

async function callAnthropic(messages, system, maxTokens = 300) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: maxTokens,
      system,
      messages
    })
  });
  return response.json();
}

function formatTranscript(messages) {
  return messages.map(m =>
    `${m.role === 'user' ? 'User' : 'Graston'}: ${m.content}`
  ).join('\n');
}

async function extractLeadData(transcript) {
  try {
    const data = await callAnthropic(
      [{ role: 'user', content: `Extract the following from this conversation if present. Return JSON only, no other text:\n{\n  "name": string or null,\n  "email": string or null,\n  "type": "Candidate" or "Employer" or "Unknown",\n  "firm": string or null,\n  "emailCaptured": boolean,\n  "interestExpressed": boolean\n}\nConversation:\n${transcript}` }],
      'You are a data extraction assistant. Return only valid JSON, nothing else.',
      150
    );
    const raw = data.content[0].text.trim();
    return JSON.parse(raw);
  } catch (err) {
    console.error('Lead extraction failed:', err.message);
    return { name: null, email: null, type: 'Unknown', firm: null, emailCaptured: false, interestExpressed: false };
  }
}

async function saveToAirtable(fields) {
  try {
    const res = await fetch(
      'https://api.airtable.com/v0/' + process.env.AIRTABLE_BASE_ID + '/Graston%20Conversations',
      {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + process.env.AIRTABLE_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fields })
      }
    );
    const data = await res.json();
    if (data.error) console.error('Airtable error:', data.error);
    else console.log('Airtable record saved:', data.id);
  } catch (err) {
    console.error('Airtable save failed:', err.message);
  }
}

async function sendLeadEmail(name, email, type, firm, transcript) {
  try {
    await resend.emails.send({
      from: 'Graston <graston@gradsource.co.uk>',
      to: 'aston@gradsource.co.uk',
      subject: 'New Graston Lead — ' + (name || 'Unknown'),
      html:
        '<h2>New lead from Graston</h2>' +
        '<p><strong>Name:</strong> ' + (name || 'Unknown') + '</p>' +
        '<p><strong>Email:</strong> ' + email + '</p>' +
        '<p><strong>Type:</strong> ' + (type || 'Unknown') + '</p>' +
        '<p><strong>Firm:</strong> ' + (firm || 'Not provided') + '</p>' +
        '<h3>Full Transcript</h3>' +
        '<pre style="background:#f4f4f4;padding:12px;border-radius:6px;font-size:13px">' + transcript + '</pre>'
    });
    console.log('Lead email sent for:', email);
  } catch (err) {
    console.error('Resend email failed:', err.message);
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { messages, system } = req.body;

    console.log('API key present:', !!process.env.ANTHROPIC_API_KEY);

    // Main Graston response
    const data = await callAnthropic(messages, system);

    if (data.error) {
      console.error('Anthropic error:', data.error);
      return res.status(500).json({ error: data.error.message });
    }

    const text = data.content[0].text;

    // Build full transcript including Graston's latest reply
    const fullMessages = [...messages, { role: 'assistant', content: text }];
    const transcript = formatTranscript(fullMessages);

    // Extract lead data asynchronously — don't block the response
    extractLeadData(transcript).then(async (lead) => {
      const leadTemp = lead.emailCaptured ? 'Hot' : lead.interestExpressed ? 'Warm' : 'Cold';

      await saveToAirtable({
        Name: lead.name || 'Unknown',
        Email: lead.email || '',
        Type: lead.type || 'Unknown',
        Firm: lead.firm || '',
        'Full Transcript': transcript,
        Date: new Date().toISOString(),
        'Lead Temperature': leadTemp
      });

      if (lead.emailCaptured && lead.email) {
        await sendLeadEmail(lead.name, lead.email, lead.type, lead.firm, transcript);
      }
    }).catch(err => console.error('Post-response processing error:', err.message));

    return res.status(200).json({ text });

  } catch (error) {
    console.error('Full error:', error.message, error.stack);
    return res.status(500).json({ error: error.message });
  }
}
