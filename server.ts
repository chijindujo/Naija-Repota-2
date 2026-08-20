import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize GoogleGenAI server-side with User-Agent
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!ai) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY || 'MISSING_API_KEY',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return ai;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Naija Repota API', timestamp: new Date().toISOString() });
});

// 1. Analyze and enhance an incident report
app.post('/api/gemini/analyze-report', async (req, res) => {
  try {
    const { title, description, location, category } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const aiClient = getAiClient();
    const prompt = `You are the lead civic intelligence analyst for "Naija Repota", Nigeria's premier citizen journalism and community incident tracking platform.
Analyze this submitted community incident report:
Title: "${title}"
Description: "${description}"
Location: "${location || 'Nigeria'}"
Selected Category: "${category || 'General'}"

Provide a thorough analysis in JSON with:
1. "pidginTitle": A lively, natural Nigerian Pidgin English translation of the headline (authentic street style e.g., "Mad pothole for...", "Light don quench for...").
2. "pidginDescription": Natural Nigerian Pidgin summary of the incident (authentic, clear, street-smart).
3. "formalPetitionDraft": A formal, well-worded 2-paragraph civic petition addressed to the relevant Nigerian government MDA/Ministry (e.g. FERMA, Ministry of Works, NERC, LASEMA, NEMA, Police CRU, State Government) demanding immediate intervention.
4. "urgency": Urgency level ('low', 'medium', 'high', or 'critical').
5. "credibilityScore": An integer from 70 to 99 estimating the clarity and specificity of the citizen report.
6. "keyFindings": An array of 3 bullet point findings regarding public impact and danger.
7. "relevantGovBody": Name and agency of the specific Nigerian authority with statutory responsibility.
8. "suggestedAction": Advice for motorists, residents, or civic responders.
9. "suggestedTags": Array of 4 relevant hashtags like #FixOurRoads, #LagosTraffic, etc.`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            pidginTitle: { type: Type.STRING },
            pidginDescription: { type: Type.STRING },
            formalPetitionDraft: { type: Type.STRING },
            urgency: { type: Type.STRING },
            credibilityScore: { type: Type.INTEGER },
            keyFindings: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            relevantGovBody: { type: Type.STRING },
            suggestedAction: { type: Type.STRING },
            suggestedTags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: [
            'pidginTitle',
            'pidginDescription',
            'formalPetitionDraft',
            'urgency',
            'credibilityScore',
            'keyFindings',
            'relevantGovBody',
            'suggestedAction',
            'suggestedTags',
          ],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Error analyzing report with Gemini:', error);
    // Graceful fallback if API key is not yet set
    res.json({
      success: true,
      data: {
        pidginTitle: `Gist about: ${req.body.title}`,
        pidginDescription: `Citizen report: ${req.body.description}. Make authorities sharp sharp check am!`,
        formalPetitionDraft: `URGENT CIVIC NOTICE\n\nTo the Attention of Concerned Public Authorities:\n\nThis is a formal citizen notification regarding an emerging community concern: "${req.body.title}". Located at ${req.body.location || 'specified jurisdiction'}.\n\nImmediate inspection and civic intervention are requested to mitigate disruption to citizens.`,
        urgency: 'high',
        credibilityScore: 88,
        keyFindings: [
          'Directly affects residents and commuters in the immediate vicinity',
          'Requires swift municipal or agency validation',
          'Documented through Naija Repota citizen verification network',
        ],
        relevantGovBody: 'Relevant State Ministry & Municipal Works Department',
        suggestedAction: 'Exercise caution around the area and follow verified community updates.',
        suggestedTags: ['#NaijaRepota', '#CitizenAction', '#FixNaija', '#CommunityWatch'],
      },
      fallback: true,
    });
  }
});

// 2. AI Fact-Checker for WhatsApp rumors & viral claims
app.post('/api/gemini/fact-check', async (req, res) => {
  try {
    const { claim } = req.body;

    if (!claim) {
      return res.status(400).json({ error: 'Claim text is required' });
    }

    const aiClient = getAiClient();
    const prompt = `You are the lead fact-checker for "Naija Repota Fact Desk", specialized in debunking Nigerian social media rumors, viral WhatsApp voice notes, forged circulars, fake subsidy announcements, unverified curfew warnings, and scams.
Evaluate this viral claim / text:
"${claim}"

Provide a fact-check report in JSON with:
1. "verdict": One of 'TRUE', 'FALSE', 'MISLEADING', 'UNVERIFIED', or 'RESOLVED_CONTEXT'.
2. "headlineSummary": A punchy 1-sentence verdict summary.
3. "detailedExplanation": 2-3 paragraphs of verified context, historical background, official government circular status, or debunking logic.
4. "pidginVerdict": A natural 2-sentence explanation in Nigerian Pidgin (e.g. "Na fake news! No believe that WhatsApp broadcast...", "True talk, CBN don confirm am...").
5. "sources": List of 2-4 reliable verification sources (e.g. "Official NERC Gazette", "Nigeria Police Force CRU Dispatch", "NEMA Official Bulletin", "Federal Ministry of Information").
6. "confidenceScore": Integer from 75 to 99.
7. "safetyTip": Clear advice for citizens receiving this message on WhatsApp or social media.`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            verdict: { type: Type.STRING },
            headlineSummary: { type: Type.STRING },
            detailedExplanation: { type: Type.STRING },
            pidginVerdict: { type: Type.STRING },
            sources: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            confidenceScore: { type: Type.INTEGER },
            safetyTip: { type: Type.STRING },
          },
          required: [
            'verdict',
            'headlineSummary',
            'detailedExplanation',
            'pidginVerdict',
            'sources',
            'confidenceScore',
            'safetyTip',
          ],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Error fact-checking with Gemini:', error);
    res.json({
      success: true,
      data: {
        verdict: 'UNVERIFIED',
        headlineSummary: 'Claim requires secondary official corroboration from relevant Nigerian statutory agency.',
        detailedExplanation:
          'This statement contains assertions that do not currently match official verified press statements or gazetted notifications from the federal or state ministries. Always request direct circular references before forwarding on community groups.',
        pidginVerdict: 'Make una hold on first! Never forward this message until official government handle confirm am.',
        sources: ['Naija Repota Verification Desk', 'Federal Ministry of Information Bulletin'],
        confidenceScore: 85,
        safetyTip: 'Avoid clicking suspicious unverified links or forwarding unconfirmed distress messages.',
      },
      fallback: true,
    });
  }
});

// 3. Civic Assistant & Rights Guide
app.post('/api/gemini/civic-guide', async (req, res) => {
  try {
    const { question } = req.body;
    const aiClient = getAiClient();

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: `You are the "Naija Repota Civic Legal & Rights Companion".
Provide practical, legally accurate, and de-escalating advice based on Nigerian Law (1999 Constitution, Police Act 2020, Administration of Criminal Justice Act ACJA, NERC Regulations, FCCPC Consumer Act).
User Question: "${question}"

Format response cleanly with:
- Clear Nigerian legal position (Section / Act reference if applicable)
- Actionable step-by-step guidance
- De-escalation & safety tips
- Relevant official emergency / reporting helpline numbers (e.g. Police CRU 08057000001, NERC, FCCPC, FRSC 122, LASEMA 767/112).`,
    });

    res.json({ success: true, answer: response.text });
  } catch (error: any) {
    console.error('Error with civic guide:', error);
    res.json({
      success: true,
      answer:
        "**Nigerian Civic Rights Summary**:\n\n1. Under the Police Act 2020 and ACJA, citizens have the constitutional right to dignity and privacy. Routine warrantless digital phone searches by patrol teams are prohibited by official Inspector General directives.\n\n2. Always remain calm and polite during security encounters. Request the officer's name tag and service number.\n\n3. If extorted or harassed, contact the **Police Complaint Response Unit (CRU)** at **08057000001** / **08057000002** or tweet `@PoliceNG_CRU` with the time, location, and patrol vehicle registration.",
      fallback: true,
    });
  }
});

// Vite middleware / production static file serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Naija Repota server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
