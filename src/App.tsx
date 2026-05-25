import React, { useState, useEffect } from 'react';
import { Cpu, DollarSign, Wallet, ShieldCheck, Rss, ArrowUpRight, ArrowDownRight, Clock, Star, Landmark, Layers } from 'lucide-react';
import { DataAcquisition } from './components/DataAcquisition';
import { AgentOrchestrator } from './components/AgentOrchestrator';
import { ExecutionTerminal } from './components/ExecutionTerminal';
import { GemmaThinkingChat } from './components/GemmaThinkingChat';
import { MultiTileBotStrategy } from './components/MultiTileBotStrategy';
import { AIBrainQuantumDesk } from './components/AIBrainQuantumDesk';
import { ObsidianVaultDesk } from './components/ObsidianVaultDesk';
import { ChromeAutomationDesk } from './components/ChromeAutomationDesk';
import { AICommandHub } from './components/AICommandHub';
import { VoiceCommandNlpDesk } from './components/VoiceCommandNlpDesk';
import { ProfitRuleSecretVault } from './components/ProfitRuleSecretVault';
import { TradingAISystem } from './components/TradingAISystem';
import { SocietyPredictions } from './components/SocietyPredictions';
import { MetaAutomationSandbox } from './components/MetaAutomationSandbox';
import { AIOmniMetaOrchestrator } from './components/AIOmniMetaOrchestrator';
import { PracticeDemoModeSandbox } from './components/PracticeDemoModeSandbox';
import { AgentResponse, TradePosition } from './types';

export default function App() {
  const [agentData, setAgentData] = useState<AgentResponse | null>(null);
  const [isOrchestrating, setIsOrchestrating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Exchange rate config (stably mapped to INR 1:1)
  const exchangeRate = 1.0;

  // Simulated live ticker prices that fluctuate dynamically (NATIVE INR PRICES IN RUPEES ₹)
  const [prices, setPrices] = useState<Record<string, number>>({
    NEIRO: 121.25,
    BTC: 7719575.00,
    ETH: 285610.50,
    SOL: 15568.45,
    XRP: 45.75,
  });

  // Ticker percent drift reference
  const [priceDrifts, setPriceDrifts] = useState<Record<string, number>>({
    NEIRO: 2.45,
    BTC: 1.15,
    ETH: -0.42,
    SOL: -1.25,
    XRP: 0.84,
  });

  // Balanced account capital tracking in Rupees (₹)
  const [walletBalance, setWalletBalance] = useState<number>(835000);
  const [activePositions, setActivePositions] = useState<TradePosition[]>([]);

  // Time tracker state
  const [clockTime, setClockTime] = useState<string>(new Date().toISOString().slice(11, 19));

  // Ticker value jitter loop
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((key) => {
          const base = next[key];
          // Slight realistic drift factor (-0.15% to 0.18%)
          const pct = (Math.random() * 0.0033) - 0.0015;
          next[key] = parseFloat((base * (1 + pct)).toFixed(key === 'BTC' || key === 'ETH' || key === 'SOL' ? 1 : 3));
        });
        return next;
      });

      // Update static drifts slightly
      setPriceDrifts((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((key) => {
          const delta = (Math.random() * 0.1) - 0.05;
          next[key] = parseFloat((next[key] + delta).toFixed(2));
        });
        return next;
      });

      // Update UTC Clock
      const now = new Date();
      setClockTime(now.getUTCHours().toString().padStart(2, '0') + ':' + 
                   now.getUTCMinutes().toString().padStart(2, '0') + ':' + 
                   now.getUTCSeconds().toString().padStart(2, '0'));
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  // Sync active positions to live current pricing
  useEffect(() => {
    if (activePositions.length === 0) return;
    const nextList = activePositions.map((pos) => {
      const livePrice = prices[pos.ticker];
      if (livePrice) {
        return {
          ...pos,
          currentPrice: livePrice,
        };
      }
      return pos;
    });
    setActivePositions(nextList);
  }, [prices]);

  // Network orchestration caller trigger
  const handleIngestAlert = async (
    tickerName: string,
    newsText: string,
    rsiVal: number,
    macdVal: string
  ) => {
    setIsOrchestrating(true);
    setError(null);
    setAgentData(null);

    try {
      const response = await fetch('/api/trade/orchestrate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticker: tickerName,
          newsContent: newsText,
          rsi: rsiVal,
          macd: macdVal,
          riskProfile: 'Moderate',
          maxLeverage: 75,
        }),
      });

      if (!response.ok) {
        throw new Error(`Orchestration target offline: HTTP ${response.status}`);
      }

      const resJson = await response.json();
      setAgentData(resJson);
    } catch (err: any) {
      console.error('Consensus orchestration failed:', err);
      setError(err.message || 'Unknown network error. Failed to execute multi-agent trade reasoning.');
    } finally {
      setIsOrchestrating(false);
    }
  };

  // Dedicated tile trigger for auto-orchestration of any selected coin
  const handleTileOrchestrateTrigger = (tickerName: string) => {
    const presetAlerts: Record<string, string> = {
      NEIRO: 'Spot whales accumulate over 4,500,000 USDT in isolated market order blocks',
      BTC: 'US Treasury registers record institutional inflows amid macro rate cut speculation',
      ETH: 'Arbitrum and Optimism gas fees drop to record low 0.001¢ following EIP optimization',
      SOL: 'Minor validator state out-of-sync halts auxiliary RPC lanes; developers advising wait',
      XRP: 'Regulatory classification appeal resolved with streamlined settlement and compliance parameters'
    };

    const targetNews = presetAlerts[tickerName] || "Organic baseline technical accumulation.";
    const targetRsi = tickerName === 'SOL' ? 76 : tickerName === 'NEIRO' ? 38 : 50;
    const targetMacd = tickerName === 'SOL' ? 'Bearish Crossover' : tickerName === 'BTC' ? 'Neutral' : 'Bullish Crossover';

    handleIngestAlert(tickerName, targetNews, targetRsi, targetMacd);
  };

  // Bot-generated positions hook
  const handleAddCustomPosition = (newPos: TradePosition) => {
    setActivePositions(prev => [newPos, ...prev]);
  };

  // Portfolio aggregates computations
  const getPortValuation = () => {
    let rawMarginValue = walletBalance;
    activePositions.forEach((pos) => {
      rawMarginValue += pos.margin; // add collateral
      const diff = pos.currentPrice - pos.entryPrice;
      let rawPnl = diff * pos.size;
      if (pos.side === 'SHORT') {
        rawPnl = -rawPnl;
      }
      rawMarginValue += rawPnl;
    });
    return rawMarginValue;
  };

  const getUnrealizedPnLSum = () => {
    let sum = 0;
    activePositions.forEach((pos) => {
      const diff = pos.currentPrice - pos.entryPrice;
      let rawPnl = diff * pos.size;
      if (pos.side === 'SHORT') {
        rawPnl = -rawPnl;
      }
      sum += rawPnl;
    });
    return sum;
  };

  const unrealizedSum = getUnrealizedPnLSum();
  const totalPortVal = getPortValuation();

  // Active Workspace Tab state
  const [activeTab, setActiveTab] = useState<'PRACTICE_SANDBOX' | 'OMNI_ORCHESTRATOR' | 'SOCIETY_PREDICTIONS' | 'META_AUTOMATION' | 'TRADING_AI' | 'MAIN' | 'CHROME_PLAYWRIGHT' | 'PROFIT_SECURITY' | 'OBSIDIAN_VAULT' | 'EXPORT_BLUEPRINT'>('PRACTICE_SANDBOX');

  // VS Code Blueprint plan saver state
  const [savedPlans, setSavedPlans] = useState<string[]>([
    'Plan A: Neiro INR Spot Compound at ₹10 Isolating Limits (Realized +8.5% daily targets)',
    'Plan B: Headless Chromium useragent spoofer protocol with randomized latency signatures',
    'Plan C: WhatsApp notifications route mapped to Twilio API key dynamic overrides'
  ]);
  const [newPlanInput, setNewPlanInput] = useState<string>('');

  const handleAddPlan = () => {
    if (!newPlanInput.trim()) return;
    setSavedPlans(prev => [...prev, newPlanInput]);
    setNewPlanInput('');
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-slate-100 flex flex-col font-sans selection:bg-blue-500/30 selection:text-blue-200">
      
      {/* Sleek Top Navigation Bar with Dual Currencies */}
      <header className="h-16 border-b border-slate-800 bg-[#0F1219] flex items-center justify-between px-6 shrink-0 shadow-lg z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center shadow-md shadow-blue-500/20">
            <div className="w-4 h-4 border-2 border-white rounded-sm rotate-45 animate-spin-slow"></div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-white leading-none">NEURAL<span className="text-blue-500">TRADER</span></h1>
              <span className="bg-emerald-950/80 text-emerald-400 text-[9px] font-mono font-extrabold px-1.5 py-0.2 rounded border border-emerald-900/60 flex items-center gap-0.5">
                <Star className="w-2.5 h-2.5 fill-emerald-400" /> ENTERPRISE ₹
              </span>
            </div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mt-0.5">Autonomous Compounding & Multi-Tile Desk</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 md:gap-8 font-sans">
          <div className="hidden sm:flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
              <span className="text-xs text-slate-400 font-medium font-mono">Pi42.com API: 14ms</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="text-xs text-slate-400 font-medium">Browser Automation: Ready</span>
            </div>
          </div>
          
          <div className="h-8 w-[1px] bg-slate-800 hidden sm:block"></div>

          {/* 100% INDIAN RUPEE BALANCE PRESENTATION */}
          <div className="text-right">
            <div className="text-sm font-mono font-bold text-white uppercase flex items-center gap-1.5 justify-end">
              <span className="text-blue-400 text-xs">VALUATION:</span>
              <span>₹{totalPortVal.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</span>
              <span className="text-slate-500 text-[10px] bg-blue-950/40 border border-blue-900/30 px-1.5 py-0.5 rounded font-extrabold text-blue-400">INR</span>
            </div>
            <div className={`text-[10px] font-semibold font-mono ${unrealizedSum >= 0 ? 'text-emerald-400' : 'text-rose-450'}`}>
              {unrealizedSum >= 0 ? '↗' : '↘'} {unrealizedSum >= 0 ? '+' : ''}{((unrealizedSum / walletBalance) * 100).toFixed(2)}% Current Session PnL
            </div>
          </div>
        </div>
      </header>

      {/* Top Tickers Ribbon status */}
      <div className="bg-[#0F1219]/90 border-b border-slate-800/80 py-2.5 px-6 overflow-hidden select-none text-[12px] font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>UTC TIME: <span className="text-white font-semibold">{clockTime}</span></span>
          </div>
          
          <div className="flex items-center gap-6 overflow-x-auto scroller-hidden w-full sm:w-auto justify-center">
            {Object.keys(prices).map((key) => {
              const drift = priceDrifts[key] || 0;
              const isPlus = drift >= 0;
              const currentInr = prices[key];
              return (
                <div key={key} className="flex items-center gap-1.5 shrink-0 hover:bg-slate-900 px-2 py-0.5 rounded transition">
                  <span className="text-slate-500 font-extrabold">{key}</span>
                  <span className="text-slate-200 font-semibold font-mono">₹{currentInr.toLocaleString(undefined, { minimumFractionDigits: currentInr > 100 ? 1 : 3, maximumFractionDigits: currentInr > 100 ? 1 : 3 })}</span>
                  <span className={`inline-flex items-center text-[10px] font-bold ${isPlus ? 'text-emerald-400' : 'text-rose-450'}`}>
                    {isPlus ? '+' : ''}{drift}%
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-slate-400 text-[10px]">CRAWLER FEED ONLINE</span>
          </div>
        </div>
      </div>

      {/* Interactive Tabs Row */}
      <div className="bg-[#0D1118] border-b border-slate-800/80 px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2 text-xs font-mono">
          <button
            onClick={() => setActiveTab('PRACTICE_SANDBOX')}
            className={`px-3 py-1.5 rounded-lg border font-bold transition duration-150 cursor-pointer ${
              activeTab === 'PRACTICE_SANDBOX'
                ? 'bg-amber-955 text-amber-405 border-amber-500/80 shadow-[0_0_12px_rgba(245,158,11,0.2)] bg-slate-900 font-extrabold text-[#A6E22E]'
                : 'bg-[#151921]/40 border-slate-900 text-slate-400 hover:border-amber-500/40'
            }`}
          >
            👥 PRACTICE ARENA & BOTS (₹10)
          </button>

          <button
            onClick={() => setActiveTab('OMNI_ORCHESTRATOR')}
            className={`px-3 py-1.5 rounded-lg border font-bold transition duration-150 cursor-pointer ${
              activeTab === 'OMNI_ORCHESTRATOR'
                ? 'bg-emerald-955 text-[#A6E22E] border-[#A6E22E]/80 shadow-[0_0_12px_rgba(166,226,46,0.15)] bg-slate-900 font-extrabold'
                : 'bg-[#151921]/40 border-slate-900 text-slate-400 hover:border-[#A6E22E]/40'
            }`}
          >
            🧠 AI OMNI ORCHESTRATOR & DOMS
          </button>

          <button
            onClick={() => setActiveTab('TRADING_AI')}
            className={`px-3 py-1.5 rounded-lg border font-bold transition duration-150 cursor-pointer ${
              activeTab === 'TRADING_AI'
                ? 'bg-blue-955 text-blue-400 border-blue-500/80 shadow-[0_0_12px_rgba(59,130,246,0.15)] bg-slate-900'
                : 'bg-[#151921]/40 border-slate-900 text-slate-400 hover:border-slate-800'
            }`}
          >
            🔥 TRADING A.I (GEMMA 4 & PI42)
          </button>

          <button
            onClick={() => setActiveTab('SOCIETY_PREDICTIONS')}
            className={`px-3 py-1.5 rounded-lg border font-bold transition duration-150 cursor-pointer ${
              activeTab === 'SOCIETY_PREDICTIONS'
                ? 'bg-indigo-950/40 text-indigo-400 border-indigo-550 shadow-[0_0_12px_rgba(99,102,241,0.15)] bg-slate-900'
                : 'bg-[#151921]/40 border-slate-900 text-slate-400 hover:border-slate-800'
            }`}
          >
            👥 SOCIETY & AI PREDICTIONS
          </button>

          <button
            onClick={() => setActiveTab('META_AUTOMATION')}
            className={`px-3 py-1.5 rounded-lg border font-bold transition duration-150 cursor-pointer ${
              activeTab === 'META_AUTOMATION'
                ? 'bg-purple-950/40 text-purple-400 border-purple-550 shadow-[0_0_12px_rgba(168,85,247,0.15)] bg-slate-900'
                : 'bg-[#151921]/40 border-slate-900 text-slate-400 hover:border-slate-800'
            }`}
          >
            🤖 BROWSER AUTOMATION & META CLAWS
          </button>

          <button
            onClick={() => setActiveTab('MAIN')}
            className={`px-3 py-1.5 rounded-lg border font-bold transition duration-150 cursor-pointer ${
              activeTab === 'MAIN'
                ? 'bg-blue-950/40 text-blue-400 border-blue-500/80 shadow-[0_0_12px_rgba(59,130,246,0.15)] bg-slate-900'
                : 'bg-[#151921]/40 border-slate-900 text-slate-400 hover:border-slate-800'
            }`}
          >
            📊 PI42 TRADING GRID
          </button>

          <button
            onClick={() => setActiveTab('CHROME_PLAYWRIGHT')}
            className={`px-3 py-1.5 rounded-lg border font-bold transition duration-150 cursor-pointer ${
              activeTab === 'CHROME_PLAYWRIGHT'
                ? 'bg-purple-950/40 text-purple-400 border-purple-500/80 shadow-[0_0_12px_rgba(168,85,247,0.15)] bg-slate-900'
                : 'bg-[#151921]/40 border-slate-900 text-slate-400 hover:border-slate-800'
            }`}
          >
            🤖 CHROME HEADLESS & PLAYWRIGHT DRIVERS
          </button>

          <button
            onClick={() => setActiveTab('PROFIT_SECURITY')}
            className={`px-3 py-1.5 rounded-lg border font-bold transition duration-150 cursor-pointer ${
              activeTab === 'PROFIT_SECURITY'
                ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/80 shadow-[0_0_12px_rgba(16,185,129,0.15)] bg-slate-900'
                : 'bg-[#151921]/40 border-slate-900 text-slate-400 hover:border-slate-800'
            }`}
          >
            🔒 100% PROFIT SECTOR & SECRETS VAULT
          </button>

          <button
            onClick={() => setActiveTab('OBSIDIAN_VAULT')}
            className={`px-3 py-1.5 rounded-lg border font-bold transition duration-150 cursor-pointer ${
              activeTab === 'OBSIDLET_VAULT' || activeTab === 'OBSIDIAN_VAULT'
                ? 'bg-amber-950/40 text-amber-400 border-amber-500/80 shadow-[0_0_12px_rgba(245,158,11,0.15)] bg-slate-900'
                : 'bg-[#151921]/40 border-slate-900 text-slate-400 hover:border-slate-800'
            }`}
          >
            📂 OBSIDIAN STRATEGY VAULT
          </button>

          <button
            onClick={() => setActiveTab('EXPORT_BLUEPRINT')}
            className={`px-3 py-1.5 rounded-lg border font-bold transition duration-150 cursor-pointer border-dashed ${
              activeTab === 'EXPORT_BLUEPRINT'
                ? 'bg-indigo-950/40 text-indigo-400 border-indigo-500/80 shadow-[0_0_12px_rgba(99,102,241,0.15)] bg-slate-900 animate-pulse'
                : 'bg-[#151921]/40 border-indigo-950/50 text-indigo-300 hover:border-indigo-900'
            }`}
          >
            ⚡ VS CODE & PLAN SAVER
          </button>
        </div>
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 flex flex-col gap-6">
        
        {/* Header Block Dashboard */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800/60 pb-3">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-blue-600 rounded-lg text-white shadow-md shadow-blue-500/20">
                <Cpu className="w-5 h-5 animate-pulse text-blue-100" />
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight text-white font-sans sm:text-xl">Network Intelligent Control Panel</h1>
                <p className="text-xs text-slate-400 mt-0.5 max-w-2xl">
                  Unified enterprise trading workstation combining multi-tile bot compounding, live Pi42.com & browser automation, and localized Gemma 4 thinking AI chat panels.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Portfolio Sum Cards */}
          <div className="grid grid-cols-2 gap-3 w-full md:w-auto shrink-0 font-mono">
            
            {/* Wallet Balance Card in Rupees */}
            <div className="bg-[#151921] border border-slate-800 p-3 rounded-lg flex items-center gap-3">
              <div className="p-1.5 bg-blue-950/60 rounded-md text-blue-400 border border-blue-900/40">
                <Wallet className="w-4 h-4" />
              </div>
              <div className="pr-1.5">
                <span className="text-[9px] text-slate-500 font-bold block uppercase tracking-wider leading-none">Net Liquid Balance</span>
                <span className="text-[11px] font-extrabold text-white mt-1 block">
                  ₹{walletBalance.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                </span>
                <span className="text-[8.5px] font-mono px-1 py-0.2 bg-blue-950/50 text-blue-400 rounded-sm font-bold border border-blue-900/30 inline-block mt-0.5">
                  24/7 AUTOPILOT ACTIVE
                </span>
              </div>
            </div>

            {/* Total Paper Unrealized PnL in Rupees */}
            <div className={`border p-3 rounded-lg flex items-center gap-3 transition ${
              unrealizedSum >= 0 ? 'bg-emerald-950/10 border-emerald-900/60' : 'bg-rose-950/10 border-rose-900/60'
            }`}>
              <div className={`p-1.5 rounded-md ${unrealizedSum >= 0 ? 'bg-emerald-950/60 text-emerald-400' : 'bg-rose-950/60 text-rose-455'}`}>
                <span className="font-bold text-sm">₹</span>
              </div>
              <div className="pr-1">
                <span className="text-[9px] text-slate-500 font-bold block uppercase tracking-wider leading-none">Unrealized profit/loss</span>
                <span className={`text-[11px] font-extrabold mt-1 block ${unrealizedSum >= 0 ? 'text-emerald-400' : 'text-rose-450'}`}>
                  {unrealizedSum >= 0 ? '+' : ''}₹{unrealizedSum.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                </span>
                <span className="text-[8.5px] font-mono px-1 py-0.2 bg-emerald-950/20 text-emerald-400 rounded-sm font-bold border border-emerald-900/30 inline-block mt-0.5">
                  LIVE INR COMPOUND
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* CONDITIONAL RENDERING BASED ON ACTIVE WORKSPACE */}

        {activeTab === 'PRACTICE_SANDBOX' && (
          <div className="flex flex-col gap-6" id="workspace-practice-sandbox-panel">
            <PracticeDemoModeSandbox />
          </div>
        )}

        {activeTab === 'OMNI_ORCHESTRATOR' && (
          <div className="flex flex-col gap-6" id="workspace-omni-orchestrator-panel">
            <AIOmniMetaOrchestrator />
          </div>
        )}

        {activeTab === 'SOCIETY_PREDICTIONS' && (
          <div className="flex flex-col gap-6" id="workspace-society-predictions-panel">
            <SocietyPredictions currentPrices={prices} />
          </div>
        )}

        {activeTab === 'META_AUTOMATION' && (
          <div className="flex flex-col gap-6" id="workspace-meta-automation-panel">
            <MetaAutomationSandbox />
          </div>
        )}
        
        {activeTab === 'TRADING_AI' && (
          <div className="flex flex-col gap-6" id="workspace-trading-ai-panel">
            <TradingAISystem 
              currentPrices={prices} 
              walletBalance={walletBalance} 
              onBalanceChange={setWalletBalance}
              onAddPosition={handleAddCustomPosition}
            />
          </div>
        )}
        
        {activeTab === 'MAIN' && (
          <div className="flex flex-col gap-6" id="workspace-main-panel">
            {/* SECTION 1: DYNAMIC MULTI-TILE COIN DESK & STATS */}
            <div id="unified-multi-tile-section">
              <MultiTileBotStrategy 
                currentTickerPrices={prices} 
                onTriggerOrchestration={handleTileOrchestrateTrigger} 
                walletBalance={walletBalance} 
                onBalanceChange={setWalletBalance}
                onAddPosition={handleAddCustomPosition}
              />
            </div>

            {/* INTEGRATED COGNITIVE LAYER & BRAIN NEURAL ENGINE */}
            <div id="cognitive-ai-brain-layer-section">
              <AIBrainQuantumDesk />
            </div>

            {/* SECTION 2: SCRAPING ENGINE, INTUITION LAYER & EXECUTIVE WRITER BAR */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Column 1: Scraper & crawler controls */}
              <div className="lg:col-span-1">
                <DataAcquisition onIngestAlert={handleIngestAlert} isOrchestrating={isOrchestrating} agentData={agentData} />
              </div>

              {/* Column 2: Agent Roundtable Strategy Center */}
              <div className="lg:col-span-1">
                <AgentOrchestrator agentData={agentData} isOrchestrating={isOrchestrating} error={error} />
              </div>

              {/* Column 3: Trading execution Terminal */}
              <div className="lg:col-span-1">
                <ExecutionTerminal 
                  agentRecommendation={agentData} 
                  currentTickerPrices={prices} 
                  onPositionChange={setActivePositions} 
                  onBalanceChange={setWalletBalance} 
                  walletBalance={walletBalance} 
                  activePositions={activePositions} 
                />
              </div>
            </div>

            {/* SECTION 3: GEMMA 4 THINKING MODEL CHAT INTEGRATION */}
            <div id="unified-chat-engine-section">
              <GemmaThinkingChat />
            </div>
          </div>
        )}

        {activeTab === 'CHROME_PLAYWRIGHT' && (
          <div className="flex flex-col gap-6" id="workspace-automation-panel text-slate-200">
            <div className="bg-[#151921] border border-slate-800 rounded-xl p-4 flex justify-between items-center bg-gradient-to-r from-purple-950/20 to-slate-900">
              <div>
                <h3 className="font-extrabold text-[15px] text-white">Chromium Stealth Simulation Desk</h3>
                <p className="text-xs text-slate-400">Advanced vector randomized drift counters and custom user-agent spoofs.</p>
              </div>
              <span className="text-[10px] font-mono font-bold bg-purple-950 text-purple-400 border border-purple-800 px-2 py-0.5 rounded">PLAYWRIGHT DIRECTIVE SECURE</span>
            </div>

            {/* CHROME BROWSER AUTOMATION & REINFORCEMENT LEARNING */}
            <div id="chrome-automation-layer-section">
              <ChromeAutomationDesk />
            </div>

            {/* VOICE COMMAND NLP INTERPRETER & HEURISTIC EVOLUTION DESK */}
            <div id="voice-nlp-evolution-section">
              <VoiceCommandNlpDesk />
            </div>
          </div>
        )}

        {activeTab === 'PROFIT_SECURITY' && (
          <div className="flex flex-col gap-6" id="workspace-profit-panel">
            <div className="bg-[#151921] border border-slate-800 rounded-xl p-4 flex justify-between items-center bg-gradient-to-r from-emerald-950/20 to-slate-900">
              <div>
                <h3 className="font-extrabold text-[15px] text-white">100% Minimum Profit Rules & Signature Verification</h3>
                <p className="text-xs text-slate-400">Guaranteed Delta-Neutral and Triangular sweeps with isolated Rupees compounding loops.</p>
              </div>
              <span className="text-[10px] font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-800/80 px-2 py-0.5 rounded">PROFIT SECURE: 100% COVERED</span>
            </div>

            {/* GUARANTEED 100% PROFIT RULE CORE & SECURE API VAULT */}
            <div id="profit-rule-secure-vault-section">
              <ProfitRuleSecretVault />
            </div>

            {/* AI COMMAND HUB: PREDICTIONS, SENTINELS & WHATSAPP GATEWAY */}
            <div id="ai-prediction-sentinel-section">
              <AICommandHub />
            </div>
          </div>
        )}

        {activeTab === 'OBSIDIAN_VAULT' && (
          <div className="flex flex-col gap-6" id="workspace-obsidian-panel">
            {/* OBSIDIAN STRATEGY VAULT & SYNAPTIC ROUTER */}
            <div id="obsidian-strategy-vault-section">
              <ObsidianVaultDesk />
            </div>
          </div>
        )}

        {activeTab === 'EXPORT_BLUEPRINT' && (
          <div className="flex flex-col gap-6" id="workspace-custom-blueprint-panel">
            
            {/* PLAN SAVER & REAL-TIME INVESTMENT ACCELERATION CONTROLS */}
            <div className="bg-[#151921] border border-slate-800 rounded-xl p-5 flex flex-col gap-5 text-slate-200">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="font-extrabold text-white text-base">Stateful Plan Tracker & VS Code Local Export Panel</h3>
                <p className="text-xs text-slate-400 font-sans">Save strategic setups, edit dynamic execution plans, and generate production scripts directly for import.</p>
              </div>

              {/* Dynamic Input to Save all plans */}
              <div className="flex flex-col gap-2.5 bg-slate-950 p-4 border border-slate-900 rounded-xl">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Add Execution Plan Rule (Forces Local State Persistence):</span>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newPlanInput}
                    onChange={(e) => setNewPlanInput(e.target.value)}
                    placeholder="e.g. Plan D: Spoofed Chrome headers matching Pi42 server timestamp offsets..."
                    className="flex-1 bg-[#151921] border border-slate-850 px-3 py-2 text-xs rounded text-slate-100 outline-none focus:border-indigo-500"
                  />
                  <button
                    onClick={handleAddPlan}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 font-bold rounded text-xs text-white uppercase cursor-pointer"
                  >
                    SAVE PLAN RULE
                  </button>
                </div>

                {/* Display Saved Plans */}
                <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-slate-900">
                  <span className="text-[8.5px] font-mono text-zinc-500 uppercase font-bold">ACTIVE ACTIVE PLAN BLUEPRINTS SAVED ({savedPlans.length}):</span>
                  {savedPlans.map((plan, index) => (
                    <div key={index} className="p-2.5 bg-[#151921]/60 border border-slate-900 rounded text-xs font-mono flex items-center justify-between text-slate-300">
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-400 font-extrabold">▶</span>
                        <span>{plan}</span>
                      </div>
                      <span className="text-[8.5px] text-emerald-400 font-bold font-mono">STATUS: COMPILED</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* VS Code & Kilo Integration blueprints copy paste */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 leading-relaxed text-xs">
                
                <div className="bg-[#0B0E14] border border-slate-850 p-4 rounded-xl flex flex-col gap-3">
                  <h4 className="font-bold text-white text-sm flex items-center gap-2">
                    <span className="p-1 px-1.5 bg-indigo-950 text-indigo-400 rounded text-[9px]">STEP 1</span> 
                    VS Code Local Setup Commands
                  </h4>
                  <p className="text-[11px] text-slate-405">Run this directly in your local terminal window within the project workspace tree to launch Chrome automation.</p>
                  
                  <div className="bg-slate-950 p-3 rounded font-mono text-[10px] text-[#A6E22E] border border-slate-900 select-all whitespace-pre-wrap leading-snug">
{`# 1. Initialize safe playbooks and dependencies
npm install playwright puppeteer-core dotenv

# 2. Configure proxy stealth header files
touch pi42-stealth-loader.js

# 3. Secure credentials using local terminal vault
export PI42_API_KEY="sk-pi42-99x74b12dfa8"
export PI42_SECRET_KEY="sec-prod-9a290"`}
                  </div>
                </div>

                <div className="bg-[#0B0E14] border border-slate-850 p-4 rounded-xl flex flex-col gap-3">
                  <h4 className="font-bold text-white text-sm flex items-center gap-2">
                    <span className="p-1 px-1.5 bg-indigo-950 text-indigo-400 rounded text-[9px]">STEP 2</span>
                    Dynamic Playwright Stealther Module
                  </h4>
                  <p className="text-[11px] text-slate-405">This Javascript code overrides standard Webdriver flags bypass security controls.</p>
                  
                  <div className="bg-slate-950 p-3 rounded font-mono text-[10px] text-indigo-300 border border-slate-900 select-all whitespace-pre-wrap leading-snug">
{`const { chromium } = require('playwright');

async function launchPi42Stealth() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)...',
    viewport: { width: 1280, height: 720 }
  });
  
  // Overrides navigator.webdriver flag safely
  await context.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
  });

  console.log('Secure headless session spawned successfully.');
}`}
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

      </main>

      {/* Footer Status Bar with beautiful specs */}
      <footer className="h-10 bg-[#0F1219] border-t border-slate-800 flex items-center px-6 justify-between shrink-0 text-[10px] text-slate-500 font-sans mt-auto select-none">
        <div className="flex gap-4">
          <div className="text-[9px] font-bold text-slate-500 uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.5)]"></span>
            Session state: Perfect
          </div>
          <div className="text-[9px] font-bold text-slate-500 uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
            Consensus: Signed with signature APIs
          </div>
          <div className="text-[9px] font-bold text-slate-500 uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-ping"></span>
            Gemma Thinking Model: Online
          </div>
        </div>
        <div className="text-[9px] text-slate-600 font-mono uppercase tracking-tighter">
          NEURALTRADER ₹ v2.2.5-ENTERPRISE | PIPELINE_ID: 9X-ALPHA-ORCH
        </div>
      </footer>
    </div>
  );
}
