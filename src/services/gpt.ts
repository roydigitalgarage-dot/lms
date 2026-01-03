// Lightweight OpenAI Chat completion helper for the static demo
export interface GPTRequestOptions {
  message: string;
  subject?: string;
  language?: string; // e.g. 'English', 'Telugu', 'Hindi'
}

export async function generateChatResponse(opts: GPTRequestOptions): Promise<string> {
  const proxy = (import.meta as any).env?.VITE_API_PROXY;
  const language = opts.language || 'English';
  const subject = opts.subject || 'general';

  const systemPrompt = `You are a friendly, simple ${subject} tutor for 2nd grade students. Respond ONLY in ${language} and do not include any other language. Keep answers very short (1-3 sentences), age-appropriate, use simple words, small examples, and a friendly tone. If the user asks to translate, translate into ${language}. Use occasional emoji to stay engaging. If you cannot respond in ${language}, reply with a short apology in ${language}.`;

  // If a proxy is configured (recommended), call it instead of OpenAI directly
  if (proxy) {
    const url = proxy.replace(/\/$/, '') + '/api/chat';
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: opts.message, subject, language, system: systemPrompt })
    });

    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(`Proxy error: ${resp.status} ${text}`);
    }

    const data = await resp.json();
    // If proxy forwarded OpenAI response directly, try extracting text
    if (data?.choices?.[0]?.message?.content) {
      return String(data.choices[0].message.content).trim();
    }

    // or support proxy returning { content: string }
    if (data?.content) return String(data.content).trim();

    return '';
  }

  // Fallback: direct client-side OpenAI call (not recommended for production)
  const apiKey = (import.meta as any).env?.VITE_OPENAI_API_KEY;
  if (!apiKey) throw new Error('NO_API_KEY');

  const body = {
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: opts.message }
    ],
    max_tokens: 200,
    temperature: 0.2
  };

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenAI error: ${res.status} ${text}`);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  return (content && String(content).trim()) || '';
}

export default generateChatResponse;
