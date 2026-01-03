// Simple server-side proxy for OpenAI Chat Completions
// Usage: set OPENAI_API_KEY env var, then `node server/index.js`

const http = require('http');
const { URL } = require('url');

const PORT = process.env.PORT || 3001;
const OPENAI_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_KEY) {
  console.warn('Warning: OPENAI_API_KEY is not set. Server will still start but will return 500 for chat requests.');
}

const server = http.createServer(async (req, res) => {
  // Allow CORS from any origin for local dev. In production restrict this.
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  if (req.method === 'POST' && url.pathname === '/api/chat') {
    try {
      let body = '';
      for await (const chunk of req) body += chunk;
      const payload = body ? JSON.parse(body) : {};

      if (!OPENAI_KEY) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Server missing OPENAI_API_KEY environment variable' }));
        return;
      }

      const openaiResp = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_KEY}`
        },
        body: JSON.stringify({
          model: payload.model || 'gpt-3.5-turbo',
          messages: payload.messages || [
            { role: 'system', content: payload.system || 'You are a helpful assistant.' },
            { role: 'user', content: payload.message || '' }
          ],
          max_tokens: payload.max_tokens || 300,
          temperature: typeof payload.temperature === 'number' ? payload.temperature : 0.7
        })
      });

      const data = await openaiResp.text();
      // forward status and body
      res.writeHead(openaiResp.status, { 'Content-Type': 'application/json' });
      res.end(data);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: String(err) }));
    }

    return;
  }

  // Not found
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
  console.log(`OpenAI proxy server listening on http://localhost:${PORT}`);
});
