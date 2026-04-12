export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { messages, system } = req.body;

    console.log('API key present:', !!process.env.ANTHROPIC_API_KEY);
    console.log('Airtable key present:', !!process.env.AIRTABLE_API_KEY);

    // ── Main Claude response ──────────────────────────────────────────────────
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
        system,
        messages
      })
    });

    const data = await response.json();

    if (data.error) {
      console.error('Anthropic error:', data.error);
      return res.status(500).json({ error: data.error.message });
    }

    const text = data.content[0].text;

    // ── Return response immediately — side effects run after ─────────────────
    res.status(200).json({ text });

    // ── Airtable + email — completely isolated, never affects the response ────
    try {
      const fullMessages = [...messages, { role: 'assistant', content: text }];
      const transcript = fullMessages
        .map(m => `${m.role === 'user' ? 'User' : 'Graston'}: ${m.content}`)
        .join('\n');

      // Extract lead data with a second small Claude call
      let lead = { name: null, email: null, type: 'Unknown', firm: null, emailCaptured: false, interestExpressed: false };
      try {
        const extractRes = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 150,
            system: 'You are a data extraction assistant. Return only valid JSON, nothing else.',
            messages: [{
              role: 'user',
              content: `Extract the following from this conversation if present. Return JSON only, no other text:\n{"name": string or null, "email": string or null, "type": "Candidate" or "Employer" or "Unknown", "firm": string or null, "emailCaptured": boolean, "interestExpressed": boolean}\nConversation:\n${transcript}`
            }]
          })
        });
        const extractData = await extractRes.json();
        lead = JSON.parse(extractData.content[0].text.trim());
      } catch (extractErr) {
        console.error('Lead extraction failed (non-fatal):', extractErr.message);
      }

      const leadTemp = lead.emailCaptured ? 'Hot' : lead.interestExpressed ? 'Warm' : 'Cold';

      // Save to Airtable
      try {
        const atRes = await fetch(
          `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Graston%20Conversations`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              fields: {
                Name: lead.name || 'Unknown',
                Email: lead.email || '',
                Type: lead.type || 'Unknown',
                Firm: lead.firm || '',
                'Full Transcript': transcript,
                Date: new Date().toISOString(),
                'Lead Temperature': leadTemp
              }
            })
          }
        );
        const atData = await atRes.json();
        if (atData.error) console.error('Airtable error (non-fatal):', atData.error);
        else console.log('Airtable record saved:', atData.id);
      } catch (atErr) {
        console.error('Airtable save failed (non-fatal):', atErr.message);
      }

      // Send lead email via Resend — only if email captured and key is set
      if (lead.emailCaptured && lead.email && process.env.RESEND_API_KEY) {
        try {
          const { Resend } = await import('resend');
          const resend = new Resend(process.env.RESEND_API_KEY);
          await resend.emails.send({
            from: 'Graston <graston@gradsource.co.uk>',
            to: 'aston@gradsource.co.uk',
            subject: `New Graston Lead — ${lead.name || 'Unknown'}`,
            html:
              '<h2>New lead from Graston</h2>' +
              `<p><strong>Name:</strong> ${lead.name || 'Unknown'}</p>` +
              `<p><strong>Email:</strong> ${lead.email}</p>` +
              `<p><strong>Type:</strong> ${lead.type || 'Unknown'}</p>` +
              `<p><strong>Firm:</strong> ${lead.firm || 'Not provided'}</p>` +
              '<h3>Full Transcript</h3>' +
              `<pre style="background:#f4f4f4;padding:12px;border-radius:6px;font-size:13px">${transcript}</pre>`
          });
          console.log('Lead email sent for:', lead.email);
        } catch (emailErr) {
          console.error('Resend email failed (non-fatal):', emailErr.message);
        }
      }

    } catch (sideEffectErr) {
      console.error('Side effect block failed (non-fatal):', sideEffectErr.message);
    }

  } catch (mainError) {
    console.error('Main chat error:', mainError.message, mainError.stack);
    return res.status(500).json({ error: 'Graston is having a moment — please try again.' });
  }
}
