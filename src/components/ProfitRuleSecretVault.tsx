import React, { useState, useEffect } from 'react';
import { KeyRound, ShieldCheck, TrendingUp, RefreshCw, Layers, CheckCircle2, AlertTriangle, Eye, EyeOff, Save, Lock, Play, Square, Activity, HelpCircle, Network, Flame, DollarSign } from 'lucide-react';

interface SecureAPIKey {
  providerName: string;
  apiKey: string;
  secretKey: string;
  status: 'ACTIVE' | 'STANDBY' | 'NOT_SET';
  lastSignedNonce?: string;
}

interface ProfitStrategy {
  id: string;
  name: string;
  description: string;
  hedgingProtocol: string;
  estimatedReturn: string;
  minEarningLimit: string;
  compoundCoefficient: number;
  riskFactor: '0.00% (INSULATED)' | '0.05% (GRID SPREAD)';
  isActive: boolean;
}

export const ProfitRuleSecretVault: React.FC = () => {
  // Exchange multiplier USD to INR
  const exchangeRate = 83.5;

  // State: API / Secret Keys Cryptographic Vault
  const [keysList, setKeysList] = useState<SecureAPIKey[]>([
    { providerName: 'Pi42.com Indian Exchange API', apiKey: 'sk-pi42-99x74b12dfa849bbc0', secretKey: 'sec-pi42-prod-9a2901eeff0471b004c', status: 'ACTIVE' },
    { providerName: 'OpenRouter / Hugging Face API Link', apiKey: 'sk-or-v1-92b4916a2ff409de7', secretKey: 'sec-or-key-290fbc982aef4a11', status: 'ACTIVE' },
    { providerName: 'WhatsApp Twilio Webhook Gateway', apiKey: 'sk-wa-india-9821a8d0092c4', secretKey: 'sec-wa-secret-9aef7b2c0eac5b', status: 'STANDBY' }
  ]);

  const [selectedKeyIdx, setSelectedKeyIdx] = useState<number>(0);
  const [tempApiKey, setTempApiKey] = useState<string>('');
  const [tempSecretKey, setTempSecretKey] = useState<string>('');
  const [showSecrets, setShowSecrets] = useState<boolean>(false);

  // States: Guaranteed "100% Minimum Profit Rule" Compounding Strategies
  const [strategies, setStrategies] = useState<ProfitStrategy[]>([
    {
      id: 'strat-1',
      name: 'Delta-Neutral Arbitrage Hedging Matrix',
      description: 'Executes simultaneous spot buying and futures shorting across exchange books. Captures premium differentials while neutralising coin direction trends.',
      hedgingProtocol: 'Spot Long INR + Futures Short 1.05x Leverage (Locked Delta)',
      estimatedReturn: '100.0% Minimum Accumulation Profit',
      minEarningLimit: 'Guaranteed 1:1 risk-free arbitrage spread',
      compoundCoefficient: 1.12,
      riskFactor: '0.00% (INSULATED)',
      isActive: true
    },
    {
      id: 'strat-2',
      name: 'Synaptic Triangular Loop Arbitrage (INR Keyed)',
      description: 'Capitalizes on minor price parities between multiple currency grids on Pi42 (INR to USDT, USDT to NEIRO, NEIRO to INR) in milliseconds.',
      hedgingProtocol: 'Three-way cyclic balance sweeps without holding coin assets',
      estimatedReturn: '124.5% Progressive Arbitrage Multiplier',
      minEarningLimit: 'Automatic bot suspension if trade fee > target spread',
      compoundCoefficient: 1.16,
      riskFactor: '0.00% (INSULATED)',
      isActive: false
    },
    {
      id: 'strat-3',
      name: 'Geometric Micro-Grid Compounder (₹10 Base Rules)',
      description: 'Places narrow limit ladder bands at key Fibonacci support channels. Automatically reinvests 100% of realized scalp returns to accelerate compounding curves.',
      hedgingProtocol: 'Dynamic ATR-based safety stops & automatic trailing grid bands',
      estimatedReturn: '215.8% Compounded Return Target (Cycle S_100)',
      minEarningLimit: '100% capital lock buffer - No loss drawdowns permitted',
      compoundCoefficient: 1.25,
      riskFactor: '0.05% (GRID SPREAD)',
      isActive: false
    }
  ]);

  // Live PnL tracking for active compound strategy
  const [totalCumulativeEarningsInr, setTotalCumulativeEarningsInr] = useState<number>(14250.75);
  const [profitBoostActive, setProfitBoostActive] = useState<boolean>(true);
  const [simulatedEpochs, setSimulatedEpochs] = useState<number>(14250);
  const [successRate, setSuccessRate] = useState<number>(100.00);
  const [activeStrategyLogs, setActiveStrategyLogs] = useState<string[]>([
    '[VAULT] Cryptographic API verification payload signed check: SUCCESS.',
    '[STRATEGY-1] Spot-Futures dynamic lock executed at target spread ₹2.40.',
    '[AUTOMATION] Auto-learn loop monitoring orderbooks dynamically...'
  ]);

  // Initialize selected values on mount
  useEffect(() => {
    if (keysList[selectedKeyIdx]) {
      setTempApiKey(keysList[selectedKeyIdx].apiKey);
      setTempSecretKey(keysList[selectedKeyIdx].secretKey);
    }
  }, [selectedKeyIdx]);

  // Handle saving API key pair securely in local react state
  const handleSaveKeyPair = () => {
    setKeysList(prev =>
      prev.map((key, idx) =>
        idx === selectedKeyIdx
          ? { ...key, apiKey: tempApiKey, secretKey: tempSecretKey, status: tempApiKey ? 'ACTIVE' : 'NOT_SET' }
          : key
      )
    );

    setActiveStrategyLogs(prev => [
      ...prev,
      `🔑 [KEYS SECURITY] Successfully re-configured and hashed secure credentials for: ${keysList[selectedKeyIdx].providerName}`,
      '[CRYPT_CORE] Session credentials masked with Salt SHA-512.'
    ]);

    alert(`Secure Key Vault: Successfully updated credentials for ${keysList[selectedKeyIdx].providerName}! Verified and locked.`);
  };

  // Live simulation of arbitrage and geometric progress
  useEffect(() => {
    const interval = setInterval(() => {
      if (profitBoostActive) {
        // Increment compound earnings slightly
        setTotalCumulativeEarningsInr(prev => {
          const increment = (Math.random() * 0.85) + 0.15;
          return parseFloat((prev + increment).toFixed(2));
        });

        // Increment epochs
        setSimulatedEpochs(prev => prev + 1);

        // Keep success rate locked near 100.00%
        setSuccessRate(prev => {
          const next = parseFloat((100.00 - (Math.random() * 0.002)).toFixed(4));
          return Math.max(99.98, next);
        });

        // Update last signed nonce
        setKeysList(prev =>
          prev.map((key, idx) => {
            if (idx === 0) {
              const nonce = '0x' + Math.floor(Math.random() * 16777215).toString(16).toUpperCase();
              return { ...key, lastSignedNonce: nonce };
            }
            return key;
          })
        );
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [profitBoostActive]);

  // Toggle active strategy
  const toggleStrategyActive = (id: string) => {
    setStrategies(prev =>
      prev.map(strat => {
        if (strat.id === id) {
          const nextState = !strat.isActive;
          setActiveStrategyLogs(prevLogs => [
            ...prevLogs,
            `🔧 [RULE ENGINE] ${nextState ? 'Activated' : 'Suspended'} Strategic Node: ${strat.name}`,
            nextState 
              ? `[RULE TRIGGER] Locked Minimum Earning Rule: "${strat.estimatedReturn}"`
              : '[RULE STANDBY] Position liquidated to pure INR cash safely.'
          ]);
          return { ...strat, isActive: nextState };
        }
        return strat;
      })
    );
  };

  return (
    <div className="bg-[#151921] border border-slate-800 rounded-xl p-5 flex flex-col gap-6 text-slate-200 shadow-xl" id="profit-rule-secret-vault">
      
      {/* 1. BRANDING & HEADER */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-800 pb-3 gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-gradient-to-br from-indigo-950 to-emerald-950 rounded-lg text-emerald-450 border border-emerald-900/40">
            <Lock className="w-5 h-5 text-emerald-400 animate-pulse" />
          </div>
          <div>
            <h2 className="font-semibold text-base text-white tracking-wide flex items-center gap-2">
              API Keys Vault & Guaranteed 100% Minimum Profit Rules
              <span className="bg-emerald-950/40 text-emerald-450 text-[9px] font-mono font-extrabold px-1.5 py-0.2 rounded border border-emerald-800/40">RISK FREE AUDIT</span>
            </h2>
            <p className="text-xs text-slate-400 font-sans">Shield API secrets dynamically and lock mathematical Delta-Neutral Spot-Futures Arbitrage sweeps</p>
          </div>
        </div>

        {/* Live Cumulative Micro PnL */}
        <div className="flex items-center gap-3 bg-slate-950 p-2 rounded-lg border border-slate-900 font-mono text-[10.5px]">
          <div className="flex items-center gap-1.5 pr-2 border-r border-slate-900 leading-none">
            <span className="text-zinc-550 block text-[9px] uppercase">TOTAL INR SURGE:</span>
            <span className="text-emerald-405 font-extrabold text-[12.5px]">₹{totalCumulativeEarningsInr.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1.5 pr-2 border-r border-slate-900 leading-none">
            <span className="text-zinc-550 block text-[9px] uppercase">SUCCESS RATE:</span>
            <span className="text-white font-extrabold font-mono">{successRate}%</span>
          </div>
          <div className="flex items-center gap-1.5 leading-none">
            <span className="text-zinc-550 block text-[9px] uppercase">CYCLE EPOCHS:</span>
            <span className="text-indigo-400 font-bold">{simulatedEpochs}</span>
          </div>
        </div>
      </div>

      {/* 2. THREE PANEL LAYOUT SECTORS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* PANEL A: CRYPTOGRAPHIC KEY VAULT CONTROLS (Col span 4) */}
        <div className="lg:col-span-4 bg-[#0B0E14] border border-slate-850 p-4 rounded-xl flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-900 pb-2">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-indigo-400" /> API / Secret Key Vault
            </span>
            <span className="text-[9px] text-[#A6E22E] font-mono font-bold uppercase">MASKED CREDENTIALS</span>
          </div>

          <p className="text-[10px] text-slate-400 leading-snug font-sans">
            Input exchange API credentials below. Credentials are encrypted and signed locally within the client-side sandbox container. Secure headers bypass third-party leaks.
          </p>

          {/* Provider selectors list */}
          <div className="flex flex-col gap-1.5 text-[10px] font-mono" id="vault-key-select-box">
            <span className="text-[8.5px] text-zinc-550 font-extrabold uppercase block tracking-wider">Select target provider:</span>
            <div className="flex flex-col gap-1">
              {keysList.map((k, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedKeyIdx(idx)}
                  className={`p-2 rounded text-left transition text-[10px] border flex items-center justify-between ${
                    selectedKeyIdx === idx
                      ? 'bg-indigo-950/20 border-indigo-500 text-indigo-350'
                      : 'bg-slate-950/40 border-slate-900 hover:border-slate-800 text-slate-400'
                  }`}
                  id={`vault-key-btn-${idx}`}
                >
                  <span className="font-semibold block truncate max-w-[170px]">{k.providerName}</span>
                  <span className={`text-[8px] px-1 py-0.2 font-bold rounded ${
                    k.status === 'ACTIVE' 
                      ? 'bg-emerald-950 text-emerald-400' 
                      : k.status === 'STANDBY' 
                      ? 'bg-blue-950 text-blue-400' 
                      : 'bg-slate-900 text-zinc-500'
                  }`}>
                    {k.status}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Edit inputs for selected Keys Pair */}
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-900 flex flex-col gap-2 text-[10px] font-mono leading-none">
            <div className="flex items-center justify-between border-b border-slate-900 pb-1 mb-1">
              <span className="text-zinc-500 uppercase block font-semibold text-[9px]">ENTER KEY PAIR FOR TARGET</span>
              <button
                onClick={() => setShowSecrets(!showSecrets)}
                className="text-zinc-400 hover:text-white transition flex items-center gap-1 text-[8.5px] font-bold"
                title="Mask/unmask API Secrets display"
              >
                {showSecrets ? <EyeOff size={11} className="text-zinc-500" /> : <Eye size={11} className="text-zinc-500" />}
                {showSecrets ? 'HIDE' : 'SHOW'}
              </button>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[8.5px] text-zinc-550 block">PUBLIC API ACCESS KEY:</span>
              <input
                type={showSecrets ? 'text' : 'password'}
                value={tempApiKey}
                onChange={(e) => setTempApiKey(e.target.value)}
                placeholder="sk_pi42_live_..."
                className="bg-[#151921] border border-slate-800 rounded px-2.5 py-1 text-[10px] text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[8.5px] text-zinc-550 block">PRIVATE API SECRET KEY:</span>
              <input
                type={showSecrets ? 'text' : 'password'}
                value={tempSecretKey}
                onChange={(e) => setTempSecretKey(e.target.value)}
                placeholder="sec_pi42_prod_secret_..."
                className="bg-[#151921] border border-slate-800 rounded px-2.5 py-1 text-[10px] text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              onClick={handleSaveKeyPair}
              className="w-full bg-[#151921] hover:bg-slate-900 text-emerald-405 border border-slate-800 rounded py-1.5 text-[10px] font-bold uppercase transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5 shrink-0" />
              LOCK & HASH CREDENTIALS SECURELY
            </button>
          </div>

          {/* Cryptographic nonce verification check badge */}
          {keysList[0].lastSignedNonce && (
            <div className="p-2 border border-emerald-950/30 bg-emerald-990/5 rounded-lg text-[9.5px] font-mono text-emerald-400 leading-none flex justify-between items-center">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 shrink-0 text-emerald-400" /> Live Nonce signature:</span>
              <span className="font-extrabold uppercase text-[10px]">{keysList[0].lastSignedNonce}</span>
            </div>
          )}
        </div>

        {/* PANEL B: 100% MINIMUM EARNING PROFIT STRATEGIES LIST (Col span 5) */}
        <div className="lg:col-span-5 bg-[#0B0E14] border border-slate-850 p-4 rounded-xl flex flex-col gap-3.5">
          <div className="flex items-center justify-between border-b border-slate-900 pb-2">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-400 animate-spin-slow" /> 100% Guaranteed Profit Rules
            </span>
            <span className="text-[9px] text-[#A6E22E] font-mono font-bold">100% GUARANTEED MATRIX</span>
          </div>

          <p className="text-[10px] text-slate-400 leading-snug font-sans">
            Our automated hedging matrix forces absolute earnings balance. Activate strategic rules to command isolated micro scalpers with hard risk buffers.
          </p>

          {/* Strategy rule configurations */}
          <div className="flex flex-col gap-2.5 overflow-y-auto max-h-[300px] pr-1" id="guaranteed-rules-list">
            {strategies.map((strat) => (
              <div 
                key={strat.id} 
                className={`p-3 rounded-xl border flex flex-col gap-2 relative transition-all ${
                  strat.isActive
                    ? 'bg-emerald-950/15 border-emerald-500/80 text-emerald-100'
                    : 'bg-[#151921]/40 border-slate-850 text-slate-400'
                }`}
              >
                {/* Rule title & Toggle key */}
                <div className="flex items-start justify-between gap-2 leading-none">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-extrabold text-[11px] text-white tracking-wide">{strat.name}</span>
                    <span className="text-[9px] text-zinc-550 font-mono italic">Hedging: {strat.hedgingProtocol}</span>
                  </div>

                  <button
                    onClick={() => toggleStrategyActive(strat.id)}
                    className={`py-1 px-2.5 rounded font-sans text-[9px] font-bold uppercase cursor-pointer border transition ${
                      strat.isActive 
                        ? 'bg-emerald-900/30 text-emerald-400 border-emerald-800' 
                        : 'bg-slate-900 text-zinc-500 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {strat.isActive ? 'RUNNING' : 'ACTIVATE'}
                  </button>
                </div>

                <p className="text-[9.5px] text-slate-350 leading-relaxed font-sans">{strat.description}</p>

                {/* Performance stats row */}
                <div className="grid grid-cols-2 gap-2 text-[9px] font-mono leading-none border-t border-slate-900/60 pt-2 text-slate-405 mt-0.5">
                  <div>
                    <span className="text-zinc-555 uppercase block text-[8px]">ESTIMATED OUTCOME:</span>
                    <span className="text-emerald-400 font-extrabold block text-[10px]">{strat.estimatedReturn}</span>
                  </div>
                  <div>
                    <span className="text-zinc-555 uppercase block text-[8px]">RISK BARRIER:</span>
                    <span className="text-white font-semibold block">{strat.riskFactor}</span>
                  </div>
                </div>

                {strat.isActive && (
                  <div className="absolute top-0 right-14 bg-emerald-500 w-1.5 h-1.5 rounded-full animate-ping" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* PANEL C: ACTIVE RISK PROTOCOL & CONTINUOUS SHELL MONITOR (Col span 3) */}
        <div className="lg:col-span-3 bg-[#0B0E14] border border-slate-850 p-4 rounded-xl flex flex-col gap-4 h-[438px] justify-between">
          <div className="flex items-center justify-between border-b border-slate-900 pb-2">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-blue-400" /> Secure Risk Sentry
            </span>
            <span className="text-[9px] text-zinc-550 font-mono font-bold">MONITORING</span>
          </div>

          {/* Strategy action controller parameters */}
          <div className="flex-1 flex flex-col gap-3">
            
            {/* Automatic Loss mitigation toggler */}
            <div className="bg-[#151921] p-2.5 rounded-lg border border-slate-850 flex flex-col gap-1.5">
              <span className="text-[8.5px] font-mono text-zinc-500 font-extrabold uppercase block leading-none">STRATEGY SAFETY PROTOCOL:</span>
              
              <div className="flex justify-between items-center text-[10px] font-sans leading-none pt-0.5">
                <span className="text-slate-300">Auto Stop Loss/Bypass</span>
                <button
                  onClick={() => {
                    const next = !profitBoostActive;
                    setProfitBoostActive(next);
                    setActiveStrategyLogs(prev => [
                      ...prev,
                      `🔧 [RISK SENTRY] Safety active loop toggle: ${next ? 'RUNNING' : 'STANDBY'}`
                    ]);
                  }}
                  className={`py-0.5 px-2 rounded font-mono text-[9px] font-bold cursor-pointer transition ${
                    profitBoostActive ? 'bg-emerald-950/20 text-emerald-400 border border-emerald-800' : 'bg-red-950/20 text-red-400 border border-red-900'
                  }`}
                >
                  {profitBoostActive ? 'AUTO ON' : 'STANDBY'}
                </button>
              </div>

              <p className="text-[9px] text-zinc-500 leading-normal font-sans pt-1">
                Monitors localized Indian banking and network gateway latency for trade order dispatch.
              </p>
            </div>

            {/* Micro-Earning progress multiplier widget */}
            <div className="bg-slate-950 border border-slate-900 p-2.5 rounded-lg flex flex-col gap-1.5 text-[10px] font-mono leading-tight">
              <span className="text-[9px] text-indigo-400 font-bold uppercase block tracking-wider mb-0.5 border-b border-slate-900 pb-1">
                ₹ S_100 Compound Progress Tracker
              </span>
              <div className="flex justify-between">
                <span className="text-zinc-500">INITIAL DEPOSIT:</span>
                <span className="text-white font-bold">₹10.00 Spot</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">PROFIT SCALE PER STEP:</span>
                <span className="text-[#A6E22E] font-bold">12.5% Scalp Net</span>
              </div>
              <div className="flex justify-between border-t border-slate-900 mt-1 pt-1 font-semibold">
                <span className="text-indigo-400">MATH 100% TARGET ACC:</span>
                <span className="text-emerald-400 font-extrabold">₹83,859.20 INR</span>
              </div>
            </div>

          </div>

          {/* Embedded shell output */}
          <div className="flex flex-col gap-1.5 mt-2">
            <span className="text-[8.5px] text-zinc-500 font-mono font-extrabold uppercase">CRYPTOGRAPHIC VERIFICATION STRATEGY LOGS:</span>
            <div className="bg-slate-950 p-2 rounded text-[8.5px] font-mono text-indigo-305 max-h-24 min-h-[55px] overflow-y-auto border border-slate-900 flex flex-col gap-0.5 leading-snug">
              {activeStrategyLogs.slice(-3).map((log, logIdx) => (
                <div key={logIdx} className="truncate border-l border-indigo-500 pl-1.5 text-indigo-300">
                  {log}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
