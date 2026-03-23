export const config = {
    runtime: 'edge',
};

export default async function handler(req) {
    if (req.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }

    try {
        const { age, identities, priorities, schemeNames } = await req.json();

        const anthropicApiKey = process.env.ANTHROPIC_API_KEY;
        if (!anthropicApiKey) {
            console.error('Missing ANTHROPIC_API_KEY');
            return new Response(JSON.stringify({ tagline: null, error: 'API Configuration Error' }), {
                status: 200, // Return 200 with null so client can use fallback
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const prompt = `
      You are an emotional storyteller for the LDF (Left Democratic Front) campaign in Kerala.
      Generate a short, powerful, first-person emotional tagline (under 25 words) for a voter with the following profile:
      - Age: ${age}
      - Identity: ${identities.join(', ')}
      - Interested in: ${priorities.join(', ')}
      - Benefited from these LDF schemes: ${schemeNames.join(', ')}

      Requirements:
      - Tone: Hopeful, dignified, emotional, and personal.
      - First person ("I", "We").
      - No hashtags, no slogans, no party jargon.
      - Focus on one major impact (e.g. home, dignity, future).
      - Language: English (keep it simple and resonant).
      
      Example: "I watched my daughter study in a world-class classroom we once only dreamed of. This is the Kerala we built together."
    `;

        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'x-api-key': anthropicApiKey,
                'anthropic-version': '2023-06-01',
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                model: 'claude-3-5-sonnet-20240620', // Using current stable sonnet as per PRD's latest date intent
                max_tokens: 80,
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.7,
            }),
        });

        const data = await response.json();
        const tagline = data.content?.[0]?.text?.replace(/["']/g, '')?.trim();

        return new Response(JSON.stringify({ tagline }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Edge Function Error:', error);
        return new Response(JSON.stringify({ tagline: null }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
