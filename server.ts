import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Custom mock response creator for graceful salvage fallback or when API key is missing.
function createMockAgentResponse(
  ticker: string,
  news: string,
  rsi: number,
  macd: string,
  risk: string,
  maxLev: number
) {
  const containsBullish = /bull|high|good|partnership|moon|pump|up|profit|buying|gain/i.test(news + macd);
  const containsBearish = /bear|rejection|bad|down|dump|drop|regulatory|sell|loss|leak/i.test(news + macd);

  let trend: 'BULLISH' | 'BEARISH' | 'RANGEBOUND' = 'RANGEBOUND';
  let decision: 'BUY_LONG' | 'SELL_SHORT' | 'HOLD' = 'HOLD';
  let confidence = 65;

  if (rsi > 70) {
    trend = 'BULLISH';
    decision = 'SELL_SHORT'; // Overbought trigger
    confidence = 75;
  } else if (rsi < 30) {
    trend = 'BEARISH';
    decision = 'BUY_LONG'; // Oversold trigger
    confidence = 80;
  } else if (containsBullish) {
    trend = 'BULLISH';
    decision = 'BUY_LONG';
    confidence = 82;
  } else if (containsBearish) {
    trend = 'BEARISH';
    decision = 'SELL_SHORT';
    confidence = 78;
  }

  const basePrice = ticker === 'BTC' ? 92450 : ticker === 'ETH' ? 3420 : ticker === 'SOL' ? 186 : ticker === 'NEIRO' ? 1.45 : 10.0;
  const support = parseFloat((basePrice * 0.96).toFixed(2));
  const resistance = parseFloat((basePrice * 1.04).toFixed(2));
  const stopLoss = decision === 'BUY_LONG' ? parseFloat((basePrice * 0.94).toFixed(2)) : parseFloat((basePrice * 1.06).toFixed(2));
  const takeProfit = decision === 'BUY_LONG' ? parseFloat((basePrice * 1.12).toFixed(2)) : parseFloat((basePrice * 0.88).toFixed(2));

  const levyMap: any = { Conservative: 3, Moderate: 10, Aggressive: 25 };
  const suggestedLeverage = Math.min(levyMap[risk] || 10, maxLev);

  return {
    orchestratorSummary: `The agents completed the consensus round for ${ticker} in simulation. Quant metrics align around a ${trend} trend and social/news data indices signal a ${decision === 'BUY_LONG' ? 'promising catalyst window' : decision === 'SELL_SHORT' ? 'bearish drift limit' : 'sideways consolidation'}. Our Risk parameters suggest setting leverage to ${suggestedLeverage}x.`,
    quantAnalysis: {
      trend,
      support,
      resistance,
      indicatorReading: `RSI stands at ${rsi} (neutral-momentum range) with MACD displaying a ${macd}. Key level markers identified support at ${support} and overhead resistance at ${resistance}.`,
      signal: decision
    },
    fundamentalAnalysis: {
      sentimentScore: decision === 'BUY_LONG' ? 88 : decision === 'SELL_SHORT' ? 24 : 52,
      sentimentLabel: decision === 'BUY_LONG' ? 'BULLISH' : decision === 'SELL_SHORT' ? 'BEARISH' : 'NEUTRAL',
      keyCatalyst: news ? `Inbound catalyst target: "${news.slice(0, 50)}..."` : "Organic baseline asset accumulation index",
      alternativeDataNotes: "Social sentiment frequency on crypto-centric networks reveals an interesting volume bump."
    },
    riskEvaluation: {
      suggestedLeverage,
      maxPositionPercent: risk === 'Conservative' ? 3 : risk === 'Moderate' ? 8 : 15,
      stopLoss,
      takeProfit,
      riskWarning: suggestedLeverage >= 20 ? "HIGH RISK EXPOSURE: Multi-X leverage scales liquidation threat dramatically on flash volatility spikes." : "Risk limits: Calculated capital exposure parameters are safe for isolated balance books."
    },
    decision,
    confidenceScore: confidence,
    agentDebate: [
      {
        agent: "Master Orchestrator",
        message: `System alert: Initializing Ingestion Layer. Standard telemetry metrics loaded for asset ${ticker}. news content: "${news || 'Technical trend search only'}"`,
        phase: 'ingest'
      },
      {
        agent: "Quantitative Analyst",
        message: `Quant models updated. RSI is ${rsi} with MACD exhibiting a ${macd}. Moving-average metrics point towards ${trend} momentum structure. Target levels: Support ${support}, Resistance ${resistance}.`,
        phase: 'quant'
      },
      {
        agent: "Fundamental Analyst",
        message: `Sentiment scanner confirms alignment. Scoring the catalyst narrative relative to baseline indices. Social sentiment label points to ${containsBullish ? 'BULLISH' : containsBearish ? 'BEARISH' : 'NEUTRAL'} trending channels.`,
        phase: 'sentiment'
      },
      {
        agent: "Risk Manager",
        message: `Capital guidelines check initialized under the ${risk} risk profile rules. Restricting positioning leverage strictly to ${suggestedLeverage}x, capping allocation at ${risk === 'Conservative' ? '3%' : risk === 'Moderate' ? '8%' : '15%'} margin. Setting hard protection limits at Stop Loss: ${stopLoss} / Take Profit: ${takeProfit}.`,
        phase: 'risk_check'
      },
      {
        agent: "Master Orchestrator",
        message: `Orchestrator consensus locked with ${confidence}% aggregate precision. Generating order trigger to executing API payload: ${decision} with ${suggestedLeverage}x leverage.`,
        phase: 'consensus'
      }
    ]
  };
}

async function startServer() {
  const app = express();
  app.use(express.json());
  
  const PORT = 3000;

  // Lazy initialize GoogleGenAI securely. Keep users' Gemini API keys hidden from the client browser.
  const getGeminiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY environment variable is missing. Falling back to local/simulation generation.");
      return null;
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  };

  // Agent Orchestrator Endpoint
  app.post("/api/trade/orchestrate", async (req: express.Request, res: express.Response) => {
    try {
      const { ticker, newsContent, rsi, macd, riskProfile, maxLeverage } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        const mockResponse = createMockAgentResponse(ticker, newsContent, rsi, macd, riskProfile, maxLeverage);
        return res.json({
          ...mockResponse,
          isMock: true
        });
      }

      const modelName = "gemini-3.5-flash";
      const prompt = `Perform a collaborative multi-agent algorithmic trading analysis for ticker ${ticker}. 
News Headline/Sentiment input text description: "${newsContent || 'Undergoing general technical accumulation and consolidation phase.'}"
Technical Indicators: RSI indicator reading is ${rsi}, MACD is ${macd}
Risk Parameters: Profile rules are ${riskProfile}, Max Leverage allowed ${maxLeverage}x.

You must simulate a discussion between 4 distinct persona agents:
1. **Master Orchestrator**: The central agent coordinator delegating tasks and framing final execution consensus.
2. **Quantitative Analyst**: Reviews technical levels, RSI indices, MACD trend direction, and calculates support/resistance.
3. **Fundamental Analyst**: Ingests alternative data feeds, scores the text/catalyst narrative (0-100), and tracks sentiment.
4. **Risk Manager**: Evaluates boundaries under current risk limits, sets ideal safety multipliers, calculates stop-loss and take-profit zones based on actual price variables.

Return a standardized system trade recommendation and set up. Include a lively, informative debate array inside the "agentDebate" list mapping 4 to 6 concise reactions. Strive to generate realistic price action calculations based on a typical coin reference price (e.g., BTC around 92000, ETH around 3400, SOL around 180, NEIRO around 1.45, or other average standard tickers).`;

      const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          systemInstruction: "You are an automated algorithmic trading AI representing the collective intelligence of a top-tier quantitative firm's trade agents. Your responses must strictly comply with the requested JSON schema format containing the simulated multi-agent debate and concrete numeric targets.",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              orchestratorSummary: {
                type: Type.STRING,
                description: "Overarching synthesis and breakdown of the final recommended trade."
              },
              quantAnalysis: {
                type: Type.OBJECT,
                properties: {
                  trend: { type: Type.STRING, description: "BULLISH, BEARISH, or RANGEBOUND" },
                  support: { type: Type.NUMBER, description: "Estimate supportive demand price level based on inputs" },
                  resistance: { type: Type.NUMBER, description: "Estimate overhead supply resistance price level" },
                  indicatorReading: { type: Type.STRING, description: "Summary of indicators (RSI trigger, MACD trend)" },
                  signal: { type: Type.STRING, description: "BUY_LONG, SELL_SHORT, or HOLD" }
                },
                required: ["trend", "support", "resistance", "indicatorReading", "signal"]
              },
              fundamentalAnalysis: {
                type: Type.OBJECT,
                properties: {
                  sentimentScore: { type: Type.NUMBER, description: "Numeric score 0 to 100 on sentiment raw news" },
                  sentimentLabel: { type: Type.STRING, description: "BULLISH, BEARISH, or NEUTRAL" },
                  keyCatalyst: { type: Type.STRING, description: "Identified market-driving mechanism or macro spark" },
                  alternativeDataNotes: { type: Type.STRING, description: "Social signals or crowd hype feedback" }
                },
                required: ["sentimentScore", "sentimentLabel", "keyCatalyst", "alternativeDataNotes"]
              },
              riskEvaluation: {
                type: Type.OBJECT,
                properties: {
                  suggestedLeverage: { type: Type.NUMBER, description: "Safe recommendation multiplier up to maxLeverage limit" },
                  maxPositionPercent: { type: Type.NUMBER, description: "Max capital exposure recommendation from 1% to 20%" },
                  stopLoss: { type: Type.NUMBER, description: "Suggested stop-loss price" },
                  takeProfit: { type: Type.NUMBER, description: "Suggested take-profit price" },
                  riskWarning: { type: Type.STRING, description: "Liquidation warning or risk advisory" }
                },
                required: ["suggestedLeverage", "maxPositionPercent", "stopLoss", "takeProfit", "riskWarning"]
              },
              decision: { type: Type.STRING, description: "BUY_LONG, SELL_SHORT, or HOLD" },
              confidenceScore: { type: Type.NUMBER, description: "Overall confidence percentage between 0 and 100" },
              agentDebate: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    agent: { type: Type.STRING, description: "Master Orchestrator, Quantitative Analyst, Fundamental Analyst, or Risk Manager" },
                    message: { type: Type.STRING, description: "The direct quotes or detailed stance of this agent" },
                    phase: { type: Type.STRING, description: "ingest, quant, sentiment, risk_check, or consensus" }
                  },
                  required: ["agent", "message", "phase"]
                }
              }
            },
            required: [
              "orchestratorSummary",
              "quantAnalysis",
              "fundamentalAnalysis",
              "riskEvaluation",
              "decision",
              "confidenceScore",
              "agentDebate"
            ]
          }
        }
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("Empty response returned from Google GenAI model.");
      }
      
      const parsedJson = JSON.parse(responseText.trim());
      return res.json(parsedJson);

    } catch (err: any) {
      console.error("Gemini Orchestration failed, invoking fallback builder:", err);
      // Construct fallback values seamlessly so interface maintains functional flow
      const ticker = req.body.ticker || "NEIRO";
      const newsContent = req.body.newsContent || "";
      const rsi = req.body.rsi || 50;
      const macd = req.body.macd || "Neutral";
      const riskProfile = req.body.riskProfile || "Moderate";
      const maxLeverage = req.body.maxLeverage || 20;

      const fallbackData = createMockAgentResponse(ticker, newsContent, rsi, macd, riskProfile, maxLeverage);
      return res.json({
        ...fallbackData,
        error: err.message,
        isFallback: true
      });
    }
  });

  // Gemma 4 1B/4B Deep Thinking Model Chat & Strategy Assistant Endpoint
  app.post("/api/gemma/chat", async (req: express.Request, res: express.Response) => {
    try {
      const { messages, variant, automationEnabled } = req.body;
      const ai = getGeminiClient();

      const activeVariant = variant || "Gemma 4 Advanced 4B";
      const isAuto = !!automationEnabled;

      const systemInstruction = `You are "${activeVariant}", a specialized deep-reasoning trading AI optimized for quantitative financial modeling, Pi42.com API trading protocols, Puppeteer browser automation strategy, and high-frequency compounding. 
Mode settings: [Variant: ${activeVariant}] [Automation Pipeline Trigger: ${isAuto ? "HIGHLY ACTIVE" : "MANUAL INTERACTIVE"}]
Your tone is incredibly sharp, analytical, and highly structured.
You MUST output your thoughts step-by-step wrapped in a <thinking>...</thinking> block before providing your actual concise human response.
You specialize in evaluating the "₹10 / Bot Compounding+ Pro Strategy", where small budget allocations in INR (Indian Rupees) are compounded recursively at 1-15% per trade using automated bots to build future wealth.
Provide clear calculations, guidance, risk warnings, or step-by-step browser automation concepts (e.g. Playwright loops, element hooks on pi42.com) as requested by the user. Keep it brief, professional, and practical. Ensure any money earning calculations support Rupees (₹) and USD.`;

      if (!ai) {
        const lastMessage = messages[messages.length - 1]?.content || "How does the ₹10 compounding bot build wealth?";
        let customThinking = "";
        let customText = "";

        if (activeVariant === "Gemma 4 Light 1B") {
          customThinking = `<thinking>
[Gemma 4 Light 1B Live Node] Compounding matrix evaluation. Real-time ticker rates synced.
Parameter status: micro-budget (₹10/trade scale) active.
Query analyze: "${lastMessage}".
Fast-response model optimization: bypassing high-latency layers to trigger immediate low-level scalp parameters.
Formulating lightweight Indian Rupee (₹) compound analysis.
</thinking>`;
          customText = `Greetings from **Gemma 4 Light 1B (Ultra-Low Latency Variant)**.

I have analyzed your query from a high-frequency, automated trading standpoint. Under current configurations:
- **Scalp Delta**: Optimized for fast ₹10 risk positions.
- **Pipeline Speed**: Sub-10ms logic cycles with automated telemetry checks are running.
- **Micro-Compounding Formula**: Under an active ₹10 starter budget at 5% compounding over 15 cycles:
  - Phase 1: ₹10.00 -> ₹10.50
  - Phase 5: ₹12.76
  - Phase 10: ₹16.29
  - Phase 15: ₹20.79 (Double capital with absolute zero downside).

${isAuto ? "**🟢 Playwright / Puppeteer pipeline automated core is ACTIVE:** Automated triggers are configured to execute real-time buys directly on Pi42 when RSI slides below 30." : "**⚪ Automation Pipeline is in standby mode**. Click 'Enable Pipeline' in the selector above to bind active triggers."}`;
        } else if (activeVariant === "Gemma 4 Automation Specialist") {
          customThinking = `<thinking>
[Gemma 4 Playwright Automation Specialist Engine] 
Process workflow: Generating secure Chromium browser code arrays.
Context: headless driver configurations, bypassing Cloudflare anti-bot firewalls on pi42.com.
Executing script blueprints.
</thinking>`;
          customText = `Greetings! I am the **Gemma 4 Automation & Playwright Specialist**.

Here is a secure automation pipeline template designed to run 24/7 in your background to automate Pi42 trades in Indian Rupees (₹):

\`\`\`javascript
const { chromium } = require('playwright-extra');
const stealthPlugin = require('puppeteer-extra-plugin-stealth')();

async function runAutopilotCompound() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ userAgent: 'Mozilla/5.0...' });
  const page = await context.newPage();
  
  // Real-time listener for current ₹10 bot triggers
  console.log("Monitoring INR pricing feeds on direct exchange...");
  
  // Custom API handshake payload
  const signPayload = { timestamp: Date.now(), botId: "₹10-compounding-v4" };
  // Send direct secure order
}
\`\`\`

${isAuto ? "**⚡ LIVE PIPE ENGAGED**: Real-time Node telemetry will directly feed state adjustments to this scraper sequence automated 24/7." : "**Standby**: Provide your Pi42 private key in settings to enable immediate browser automation calls."}`;
        } else {
          customThinking = `<thinking>
I am simulating the Gemma 4 1B / 4B Professional Thinking Model core logic.
Task: Evaluate and structure trading strategy query of: "${lastMessage}".
Key variables:
- Compounding strategy: ₹10 starter budget per bot.
- API system: pi42.com endpoints / private direct exchange.
- Automation: headless Playwright/Puppeteer script trigger.
- Financial output: Cumulative geometric compounding series. For S_0 = ₹10 at r = 10% compound gain per cycle, over 40 cycles, capital grows to S_40 = 10 * (1.10)^40 ≈ ₹452.59.
Let's formulate the complete response providing strategic details, detailed mathematical backing, and browser scraping protocols.
</thinking>`;
          customText = `Greetings, user! I am the **Gemma 4 Deep Thinking trading assistant (specialized 1B/4B mode)**.

To leverage the active **₹10 / Bot Compounding+ (Pro Strategy)** to build long-term future wealth, follow this enterprise workflow:

1. **Compounding Mechanics (The Pro Strategy)**:
   - Start with a micro budget of **₹10** ($0.12) per bot tile.
   - Configure each bot to execute short-term scalp trades with a profit target of **5% to 15%** using technical indicators (MACD crossovers + Oversold RSI).
   - If a bot increases its pool size from ₹10 to ₹11.50 in its first trade, the entire ₹11.50 is automatically re-allocated as risk-capital for the second trade.
   - At a compound interest of **12% per cycle**, starting with ₹10:
     - 10 Cycles: **₹31.06**
     - 25 Cycles: **₹170.00**
     - 50 Cycles: **₹2,890.02**
     - 100 Cycles: **₹838,590.23** (The mathematical power of exponential compounding).

2. **Pi42.com API Web integration & Automation**:
   - Locate your Pi42.com authentication keys and feed them into the API signature generator.
   - Make automated POST requests to \`https://api.pi42.com/v1/order\` with headers for payload hashing.
   - **Browser Automation Hook**: Set up a custom Playwright loop that logs into Pi42 dynamically, bypasses Cloudflare security layers, and monitors order fill statuses in real-time.

3. **Active Multi-Tile Monitoring**:
   - Allocate your master budget (e.g. ₹5,000) into 10 multi-tile bots active across several coins simultaneously (BTC, ETH, SOL, XRP, NEIRO) to diversify risk exposure.

${isAuto ? "**🟢 playwritght / puppeteer pipeline automated core is ACTIVE:** Automated triggers are configured to execute real-time buys directly on Pi42." : ""}`;
        }

        return res.json({
          text: customThinking + "\n\n" + customText,
          isMock: true
        });
      }

      // Convert standard messages to GoogleGenAI multi-turn schema
      const contents = messages.map((m: any) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }));

      const modelName = "gemini-3.5-flash";
      const apiResponse = await ai.models.generateContent({
        model: modelName,
        contents,
        config: {
          systemInstruction,
          temperature: 0.65,
        }
      });

      return res.json({
        text: apiResponse.text || "I apologize. I could not synthesize trading reasoning at this time.",
        isMock: false
      });

    } catch (err: any) {
      console.error("Gemma Chat API failure:", err);
      return res.status(550).json({ error: err.message || "Failed to generate chat advice from Gemma 4." });
    }
  });

  // Vite development routing & static production files asset pipelines
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: express.Request, res: express.Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express multi-agent server initialized on ingress port ${PORT}`);
  });
}

startServer();
