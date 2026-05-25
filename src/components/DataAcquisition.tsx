import React, { useState, useEffect } from 'react';
import { Play, Disc, CloudLightning, ShieldAlert, Cpu, Rss, ArrowRight, Activity, Terminal, Brain, Gauge, Sparkles } from 'lucide-react';
import { NewsItem, AgentResponse } from '../types';

interface DataAcquisitionProps {
  onIngestAlert: (ticker: string, newsText: string, rsi: number, macd: string) => void;
  isOrchestrating: boolean;
  agentData?: AgentResponse | null;
}

const PRESET_NEWS: { ticker: string; title: string; sentiment: 'BULLISH' | 'BEARISH' | 'NEUTRAL'; rsi: number; macd: string }[] = [
  {
    ticker: 'NEIRO',
    title: 'Spot whales accumulate over 4,500,000 USDT in isolated market order blocks',
    sentiment: 'BULLISH',
    rsi: 38,
    macd: 'Bullish Crossover'
  },
  {
    ticker: 'BTC',
    title: 'US Treasury registers record institutional inflows amid macro rate cut speculation',
    sentiment: 'BULLISH',
    rsi: 48,
    macd: 'Neutral'
  },
  {
    ticker: 'SOL',
    title: 'Minor validator state out-of-sync halts auxiliary RPC lanes; developers advising wait',
    sentiment: 'BEARISH',
    rsi: 76,
    macd: 'Bearish Crossover'
  },
  {
    ticker: 'ETH',
    title: 'Arbitrum and Optimism gas fees drop to record low 0.001¢ following EIP optimization',
    sentiment: 'BULLISH',
    rsi: 54,
    macd: 'Neutral'
  },
  {
    ticker: 'XRP',
    title: 'Regulatory classification appeal resolved with streamlined settlement and compliance parameters',
    sentiment: 'BULLISH',
    rsi: 61,
    macd: 'Bullish Crossover'
  }
];

export const DataAcquisition: React.FC<DataAcquisitionProps> = ({ onIngestAlert, isOrchestrating, agentData }) => {
  const [ticker, setTicker] = useState('NEIRO');
  const [newsText, setNewsText] = useState(PRESET_NEWS[0].title);
  const [rsi, setRsi] = useState(38);
  const [macd, setMacd] = useState('Bullish Crossover');
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);

  // Simulated crawler process log
  const [clawsLog, setClawsLog] = useState<string[]>([
    "[09:41] Ingress system ONLINE: Port 3000 mapped",
    "[09:41] Puppeteer Worker Pool initialized with 4 background nodes",
    "[09:42] Listening to WebSocket feeds: Binance & Bybit isolated margin streams"
  ]);
  const [crawlerActive, setCrawlerActive] = useState(true);

  // Add random logs to simulate activity
  useEffect(() => {
    if (!crawlerActive) return;
    const interval = setInterval(() => {
      const liveActions = [
        `[WS Feed] Received live price tick for ${ticker}`,
        `[Crawler] Scraped X/Twitter trending keyword frequency for: "NEIRO"`,
        `[Proxy] Rotated local crawlers residential IP to bypass Cloudflare constraint`,
        `[REST Feed] Querying global funding rate delta indices`,
        `[Playwright] Rendered static content for macroeconomic news dashboard`
      ];
      const randomAction = liveActions[Math.floor(Math.random() * liveActions.length)];
      const now = new Date();
      const timeStr = `[${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}]`;
      
      setClawsLog(prev => {
        const next = [...prev, `${timeStr} ${randomAction}`];
        if (next.length > 5) return next.slice(1);
        return next;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [crawlerActive, ticker]);

  const selectPreset = (index: number) => {
    setSelectedPresetIndex(index);
    const item = PRESET_NEWS[index];
    setTicker(item.ticker);
    setNewsText(item.title);
    setRsi(item.rsi);
    setMacd(item.macd);
  };

  const handleTriggerIngest = (e: React.FormEvent) => {
    e.preventDefault();
    onIngestAlert(ticker, newsText, rsi, macd);
  };

  // Dynamic sentiment computations from the Gemini sub-agents vs selected preset
  let overallSentimentScore = 50;
  let quantSentimentScore = 50;
  let fundSentimentScore = 50;
  let riskSentimentScore = 50;
  let sentimentWord = 'NEUTRAL';
  let sentimentDesc = 'Awaiting real-time consensus to resolve technical parameters and narrative catalysts.';

  if (agentData) {
    const qScore = agentData.quantAnalysis.trend === 'BULLISH' ? 85 : agentData.quantAnalysis.trend === 'BEARISH' ? 18 : 50;
    const fScore = agentData.fundamentalAnalysis.sentimentScore;
    const rScore = Math.min(100, Math.max(10, Math.round(agentData.riskEvaluation.suggestedLeverage * 5 + 30)));
    
    quantSentimentScore = qScore;
    fundSentimentScore = fScore;
    riskSentimentScore = rScore;
    overallSentimentScore = agentData.confidenceScore || Math.round((qScore + fScore + rScore) / 3);
    sentimentWord = agentData.fundamentalAnalysis.sentimentLabel || (overallSentimentScore > 60 ? 'BULLISH' : overallSentimentScore < 40 ? 'BEARISH' : 'NEUTRAL');
    sentimentDesc = `Gemini sub-agent debate complete. Trend is ${agentData.quantAnalysis.trend} with ${agentData.fundamentalAnalysis.sentimentScore}% narrative confidence. Suggested leverage ${agentData.riskEvaluation.suggestedLeverage}x.`;
  } else if (selectedPresetIndex >= 0 && selectedPresetIndex < PRESET_NEWS.length) {
    const preset = PRESET_NEWS[selectedPresetIndex];
    if (preset.sentiment === 'BULLISH') {
      overallSentimentScore = 84;
      quantSentimentScore = preset.rsi < 40 ? 88 : 74;
      fundSentimentScore = 85;
      riskSentimentScore = 78;
      sentimentWord = 'BULLISH';
      sentimentDesc = `Whale accumulation and positive alternative news flow for ${preset.ticker} indicate a strong bullish catalyst.`;
    } else if (preset.sentiment === 'BEARISH') {
      overallSentimentScore = 22;
      quantSentimentScore = preset.rsi > 70 ? 15 : 28;
      fundSentimentScore = 18;
      riskSentimentScore = 25;
      sentimentWord = 'BEARISH';
      sentimentDesc = `Technical overextension (RSI ${preset.rsi}) and infrastructure blockages signal distribution risks for ${preset.ticker}.`;
    } else {
      overallSentimentScore = 50;
      quantSentimentScore = 52;
      fundSentimentScore = 50;
      riskSentimentScore = 48;
      sentimentWord = 'NEUTRAL';
      sentimentDesc = `Market ranges within baseline parameters. Sub-agents recommend awaiting volume expansion.`;
    }
  }

  return (
    <div className="bg-[#151921] border border-slate-800 rounded-xl p-5 flex flex-col gap-5 text-slate-200 shadow-xl" id="data-acquisition-hub">
      {/* Title & Status */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-950/40 rounded-lg text-blue-400 border border-blue-900/30">
            <Rss size={18} />
          </div>
          <div>
            <h2 className="font-semibold text-base text-white tracking-wide">Data Acquisition Layer</h2>
            <p className="text-xs text-slate-400">Crawlers, Scrapers & Live Feeds</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono ${crawlerActive ? 'bg-emerald-950/30 text-emerald-400 border border-emerald-900/30' : 'bg-slate-800 text-slate-400'}`}>
            <Activity className={`w-3 h-3 mr-1 ${crawlerActive ? 'animate-pulse' : ''}`} />
            {crawlerActive ? 'LIVE' : 'IDLE'}
          </span>
        </div>
      </div>

      {/* GEMINI SUB-AGENT SENTIMENT GAUGE */}
      <div className="bg-[#0B0E14] border border-slate-800 rounded-xl p-4 flex flex-col gap-3" id="gemini-sentiment-gauge-card">
        <div className="flex items-center justify-between border-b border-slate-900 pb-2">
          <span className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Gauge className="w-3.5 h-3.5 text-blue-400" /> GEMINI SENTIMENT INTELLIGENCE
          </span>
          <span className="bg-blue-950/40 text-blue-400 border border-blue-900/40 px-1 py-0.2 rounded text-[7.5px] font-mono uppercase font-bold">
            sub-agent lens
          </span>
        </div>

        <div className="flex items-center gap-4 py-1">
          {/* SVG Arc Gauge */}
          <div className="relative flex justify-center shrink-0">
            <svg className="w-24 h-16" viewBox="0 0 120 70">
              <path
                d="M 10 60 A 50 50 0 0 1 110 60"
                fill="none"
                stroke="#1a1f2c"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <path
                d="M 10 60 A 50 50 0 0 1 43.3 26.6"
                fill="none"
                stroke="#f43f5e"
                strokeWidth="10"
                strokeLinecap="round"
                className="opacity-70"
              />
              <path
                d="M 43.3 26.6 A 50 50 0 0 1 76.6 26.6"
                fill="none"
                stroke="#eab308"
                strokeWidth="10"
                strokeLinecap="round"
                className="opacity-70"
              />
              <path
                d="M 76.6 26.6 A 50 50 0 0 1 110 60"
                fill="none"
                stroke="#10b981"
                strokeWidth="10"
                strokeLinecap="round"
                className="opacity-70"
              />
              <g transform={`rotate(${((overallSentimentScore / 100) * 180) - 90} 60 60)`} className="transition-transform duration-700 ease-out">
                <line
                  x1="60"
                  y1="60"
                  x2="60"
                  y2="18"
                  stroke="#ffffff"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="drop-shadow-[0_0_4px_rgba(255,255,255,0.7)]"
                />
                <circle cx="60" cy="60" r="5" fill="#ffffff" />
              </g>
            </svg>
            <div className="absolute bottom-1 leading-none text-center left-1/2 -translate-x-1/2">
              <span className="text-[11px] font-mono font-bold text-white block">{overallSentimentScore}%</span>
              <span className={`text-[6.5px] font-extrabold uppercase px-1 py-0.2 rounded-sm ${
                sentimentWord === 'BULLISH' ? 'bg-emerald-950 text-emerald-400' : sentimentWord === 'BEARISH' ? 'bg-rose-950 text-rose-500' : 'bg-slate-800 text-slate-450'
              }`}>{sentimentWord}</span>
            </div>
          </div>

          {/* Subline detail text summary */}
          <div className="flex flex-col gap-1">
            <span className="text-[9px] text-slate-500 uppercase font-bold tracking-wider">
              Consensus Sentiment Index
            </span>
            <p className="text-[10px] text-slate-300 leading-normal font-sans line-clamp-2">
              {sentimentDesc}
            </p>
          </div>
        </div>

        {/* Breakouts list */}
        <div className="grid grid-cols-3 gap-2 border-t border-slate-900/60 pt-2.5 mt-0.5">
          <div className="bg-[#151921]/40 border border-[#1e293b]/50 p-1.5 rounded flex flex-col gap-1 font-mono text-[9px] select-none text-center">
            <span className="text-slate-500 font-extrabold text-[7.5px] uppercase tracking-wide">QUANT</span>
            <span className={`text-[11px] font-black ${quantSentimentScore > 65 ? 'text-emerald-400' : quantSentimentScore < 35 ? 'text-rose-400' : 'text-slate-300'}`}>{quantSentimentScore}%</span>
            <div className="w-full bg-slate-950 h-1 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${quantSentimentScore > 65 ? 'bg-[#10b981]' : quantSentimentScore < 35 ? 'bg-[#f43f5e]' : 'bg-[#eab308]'}`}
                style={{ width: `${quantSentimentScore}%` }}
              />
            </div>
          </div>

          <div className="bg-[#151921]/40 border border-[#1e293b]/50 p-1.5 rounded flex flex-col gap-1 font-mono text-[9px] select-none text-center">
            <span className="text-slate-500 font-extrabold text-[7.5px] uppercase tracking-wide">FUNDAMENTAL</span>
            <span className={`text-[11px] font-black ${fundSentimentScore > 65 ? 'text-emerald-400' : fundSentimentScore < 35 ? 'text-rose-400' : 'text-slate-300'}`}>{fundSentimentScore}%</span>
            <div className="w-full bg-slate-950 h-1 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${fundSentimentScore > 65 ? 'bg-[#10b981]' : fundSentimentScore < 35 ? 'bg-[#f43f5e]' : 'bg-[#eab308]'}`}
                style={{ width: `${fundSentimentScore}%` }}
              />
            </div>
          </div>

          <div className="bg-[#151921]/40 border border-[#1e293b]/50 p-1.5 rounded flex flex-col gap-1 font-mono text-[9px] select-none text-center">
            <span className="text-slate-500 font-extrabold text-[7.5px] uppercase tracking-wide">RISK</span>
            <span className={`text-[11px] font-black ${riskSentimentScore > 65 ? 'text-emerald-400' : riskSentimentScore < 35 ? 'text-rose-400' : 'text-slate-300'}`}>{riskSentimentScore}%</span>
            <div className="w-full bg-slate-950 h-1 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${riskSentimentScore > 65 ? 'bg-[#10b981]' : riskSentimentScore < 35 ? 'bg-[#f43f5e]' : 'bg-[#eab308]'}`}
                style={{ width: `${riskSentimentScore}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Preset Signals Selectors */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-300">Preset News Catalysts & Alerts</label>
          <span className="text-[10px] font-mono text-blue-400 uppercase font-semibold">Alternative Web Data</span>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {PRESET_NEWS.map((preset, index) => (
            <button
              key={index}
              onClick={() => selectPreset(index)}
              className={`p-2 rounded-lg text-left text-xs transition duration-150 border flex flex-col gap-1 cursor-pointer ${
                selectedPresetIndex === index
                  ? 'bg-blue-950/30 border-blue-500 shadow-sm text-blue-200'
                  : 'bg-[#0B0E14]/40 border-slate-800 hover:bg-[#0B0E14]/80 text-slate-300'
              }`}
              id={`preset-btn-${index}`}
            >
              <div className="flex items-center justify-between w-full">
                <span className={`px-1.5 py-0.2 rounded font-mono text-[9px] font-semibold ${
                  preset.sentiment === 'BULLISH' ? 'bg-emerald-950 text-emerald-400 border border-emerald-900/55' : 'bg-rose-950 text-rose-400 border border-rose-900/55'
                }`}>
                  {preset.ticker} • {preset.sentiment}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">RSI: {preset.rsi}</span>
              </div>
              <p className="line-clamp-2 text-slate-350 leading-relaxed font-sans">{preset.title}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Manual Configuration Form */}
      <form onSubmit={handleTriggerIngest} className="bg-[#0B0E14]/45 border border-slate-800 rounded-xl p-4 flex flex-col gap-3">
        <div className="flex items-center gap-2 pb-1 border-b border-slate-800/60">
          <Disc className="w-4 h-4 text-blue-400" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">Crawler Feed Customizer</h3>
        </div>

        {/* Ticker Selector */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[11px] text-slate-400">Target Asset</label>
            <select
              value={ticker}
              onChange={(e) => {
                setTicker(e.target.value);
                setSelectedPresetIndex(-1);
              }}
              className="bg-[#0B0E14] text-slate-200 border border-slate-800 rounded px-2.5 py-1.5 text-xs font-mono focus:border-blue-500 focus:outline-none"
              id="asset-select"
            >
              <option value="NEIRO">NEIRO (Prop Alt)</option>
              <option value="BTC">BTC (Bitcoin)</option>
              <option value="ETH">ETH (Ethereum)</option>
              <option value="SOL">SOL (Solana)</option>
              <option value="XRP">XRP (Ripple)</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] text-slate-400">MACD Profile</label>
            <select
              value={macd}
              onChange={(e) => {
                setMacd(e.target.value);
                setSelectedPresetIndex(-1);
              }}
              className="bg-[#0B0E14] text-slate-200 border border-slate-800 rounded px-2.5 py-1.5 text-xs font-mono focus:border-blue-500 focus:outline-none"
              id="macd-select"
            >
              <option value="Bullish Crossover">Bullish Crossover ↗</option>
              <option value="Bearish Crossover">Bearish Crossover ↘</option>
              <option value="Neutral">Neutral Phase →</option>
            </select>
          </div>
        </div>

        {/* RSI Slider */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-[11px]">
            <span className="text-slate-400">Technical RSI (14-period)</span>
            <span className={`font-mono font-medium ${rsi < 30 ? 'text-emerald-400' : rsi > 70 ? 'text-rose-400' : 'text-slate-300'}`}>
              {rsi} ({rsi < 30 ? 'Oversold Rebound' : rsi > 70 ? 'Overbought Fade' : 'Neutral Zone'})
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="90"
            value={rsi}
            onChange={(e) => {
              setRsi(parseInt(e.target.value));
              setSelectedPresetIndex(-1);
            }}
            className="w-full accent-blue-500 h-1 bg-[#151921] rounded-lg cursor-pointer"
            id="rsi-slider"
          />
        </div>

        {/* Custom News Text Box */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] text-slate-400">Scraped Headline Catalyst</label>
          <textarea
            value={newsText}
            onChange={(e) => {
              setNewsText(e.target.value);
              setSelectedPresetIndex(-1);
            }}
            placeholder="Type custom sentiment alert news scraped from Twitter, blogs, or forums..."
            className="bg-[#0B0E14] text-slate-200 border border-slate-800 rounded p-2 text-xs h-16 w-full resize-none font-sans leading-relaxed focus:border-blue-500 focus:outline-none"
            id="news-textarea"
          />
        </div>

        {/* Trigger Ingest Action */}
        <button
          type="submit"
          disabled={isOrchestrating}
          className={`w-full py-2 px-4 rounded-lg font-medium text-xs flex items-center justify-center gap-2 cursor-pointer transition ${
            isOrchestrating
              ? 'bg-[#151921] text-slate-500 cursor-not-allowed border border-slate-800'
              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg active:scale-98'
          }`}
          id="ingest-trigger-btn"
        >
          {isOrchestrating ? (
            <>
              <Cpu className="w-3.5 h-3.5 animate-spin" />
              Orchestrating Agent Consensus...
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              Ingest & Run Agent Consensus
            </>
          )}
        </button>
      </form>

      {/* Crawlers activity shell */}
      <div className="bg-[#0B0E14] border border-slate-800 rounded-xl p-3 flex flex-col gap-2">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-slate-400 font-mono">
          <div className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-slate-450" />
            <span>Local Crawl Claws & API Telemetry</span>
          </div>
          <button
            onClick={() => setCrawlerActive(!crawlerActive)}
            className={`font-semibold hover:underline text-[9px] cursor-pointer ${crawlerActive ? 'text-amber-400' : 'text-emerald-400'}`}
          >
            {crawlerActive ? 'PAUSE CRAWL' : 'RESUME CRAWL'}
          </button>
        </div>
        
        <div className="bg-[#0B0E14]/80 p-2.5 rounded font-mono text-[10px] text-slate-400 flex flex-col gap-1.5 min-h-24 max-h-32 overflow-y-auto select-none border border-slate-800/60">
          {clawsLog.map((log, i) => (
            <div key={i} className="leading-tight break-all border-l-2 border-slate-800 pl-2">
              <span className="text-slate-500 font-semibold">{log.slice(0, 7)}</span> 
              <span>{log.slice(7)}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center text-[9px] text-slate-500 font-mono">
          <div className="flex items-center gap-1">
            <ShieldAlert className="w-2.5 h-2.5 text-emerald-400" />
            <span>Cloudflare Bot Bypass: READY</span>
          </div>
          <div className="flex items-center gap-1">
            <CloudLightning className="w-2.5 h-2.5 text-blue-400" />
            <span>Proxy Pools: 24 active</span>
          </div>
        </div>
      </div>
    </div>
  );
};
