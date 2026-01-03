interface ChatRequest {
  message: string;
  subject: string;
  language: 'English' | 'Telugu' | 'Hindi';
}

interface ChatResponse {
  success: boolean;
  content?: string;
  error?: string;
}

export async function getChatResponse(request: ChatRequest): Promise<ChatResponse> {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a HUMAN-LIKE EXPLAINER & TEACHER for ${request.subject}. You are NOT a text reader.

RULES:
1. Speak as if explaining to a student sitting right in front of you.
2. NEVER read paragraphs line-by-line.
3. Break explanations into: What it is, Why it exists, How it works, and a Real-world example (analogy).
4. Use conversational, calm, and clear language.
5. NO "according to the text" or "book language".
6. If technical terms appear, explain them simply immediately.
7. Start with phrases like "Let me explain this simply..." or "Imagine this...".
8. ALWAYS ask ONE gentle follow-up at the end: "Does this make sense so far?"
9. Respond in ${request.language}.`
          },
          {
            role: 'user',
            content: request.message
          }
        ],
        max_tokens: 150,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No response content');
    }

    return {
      success: true,
      content: content.trim()
    };
  } catch (error) {
    console.error('ChatGPT API Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export function detectLanguage(text: string): 'English' | 'Telugu' | 'Hindi' | 'unknown' {
  // Telugu script detection
  if (/[\u0C00-\u0C7F]/.test(text)) {
    return 'Telugu';
  }

  // Hindi script detection
  if (/[\u0900-\u097F]/.test(text)) {
    return 'Hindi';
  }

  // English (basic check)
  if (/^[a-zA-Z0-9\s.,!?'"()-]+$/.test(text.trim())) {
    return 'English';
  }

  return 'unknown';
}