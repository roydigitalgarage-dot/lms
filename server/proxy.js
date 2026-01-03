// Simple Node.js server proxy for OpenAI Chat Completions
// Keeps the OPENAI_API_KEY secret on the server
// Usage: OPENAI_API_KEY=sk_... node server/proxy.js

import http from 'http';
import { URL } from 'url';

const PORT = process.env.PORT || 3001;
const OPENAI_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_KEY) {
  console.error('❌ Error: OPENAI_API_KEY environment variable is not set.');
  console.error('Usage: OPENAI_API_KEY=sk_... node server/proxy.js');
  process.exit(1);
}

console.log(`✅ OpenAI API key configured.`);

const server = http.createServer(async (req, res) => {
  // CORS headers for local dev
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const url = new URL(req.url, `http://${req.headers.host}`);

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  // Health check endpoint
  if (req.method === 'GET' && url.pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ status: 'ok' }));
  }

  // Chat endpoint
  if (req.method === 'POST' && url.pathname === '/api/chat') {
    try {
      // Read request body
      let body = '';
      for await (const chunk of req) {
        body += chunk;
      }

      const payload = body ? JSON.parse(body) : {};
      const message = payload.message?.trim() || '';

      if (!message) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Empty message' }));
      }

      // Build messages array
      const messages = [
        {
          role: 'system',
          content: payload.system || 'You are a helpful assistant.'
        },
        {
          role: 'user',
          content: message
        }
      ];

      // Call OpenAI API
      const openaiResp = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages,
          max_tokens: 150,
          temperature: 0.3
        })
      });

      const responseText = await openaiResp.text();

      if (!openaiResp.ok) {
        res.writeHead(openaiResp.status, { 'Content-Type': 'application/json' });
        return res.end(responseText);
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(responseText);
    } catch (err) {
      console.error('Error:', err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: String(err) }));
    }
    return;
  }

  // 404
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
  console.log(`🚀 OpenAI proxy server listening on http://localhost:${PORT}`);
  console.log(`📢 POST /api/chat to send messages`);
  console.log(`💚 GET /health for health check`);
});
