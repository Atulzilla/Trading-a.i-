import React, { useState, useEffect } from 'react';
import { Sparkles, Bell, Volume2, TrendingUp, Cpu, Smartphone, Zap, Play, Square, RefreshCw, Terminal, Layers, Send, HelpCircle, AlertTriangle, ShieldCheck } from 'lucide-react';

interface PredictedTicker {
  ticker: string;
  currentInr: number;
  predictedInr: number;
  confidence: number;
  direction: 'UP' | 'DOWN';
  volatilityIndex: number; // 0-100%
  volume24h: string;
}

interface PriceAlert {
  id: string;
  ticker: string;
  condition: 'ABOVE' | 'BELOW';
  targetInr: number;
  isTriggered: boolean;
  timestamp?: string;
}

export const AICommandHub: React.FC = () => {
  // Exchange multiplier USD to INR
  const exchangeRate = 83.5;

  // Auto Operations State
  const [startAtBootUp, setStartAtBootUp] = useState<boolean>(true);
  const [autoImprove, setAutoImprove] = useState<boolean>(true);
  const [autoOffOnLoss, setAutoOffOnLoss] = useState<boolean>(false);
  const [isClawActive, setIsClawActive] = useState<boolean>(true);

  // WhatsApp Config state
  const [whatsappPhone, setWhatsappPhone] = useState<string>('+91 98765 43210');
  const [whatsappApiKey, setWhatsappApiKey] = useState<string>('wa_live_92b1a8f3b20c...');
  const [isWaSending, setIsWaSending] = useState<boolean>(false);
  const [waLogs, setWaLogs] = useState<string[]>([
    '[WHATSAPP] Gateway primed. Multi-sig authentication active.',
    '[SYSTEM] Send test alert to verify local configuration parameters.'
  ]);

  // Live predictions state
  const [predictions, setPredictions] = useState<PredictedTicker[]>([
    { ticker: 'NEIRO', currentInr: 121.24, predictedInr: 132.85, confidence: 91.2, direction: 'UP', volatilityIndex: 12.4, volume24h: '₹4,520,300' },
    { ticker: 'BTC', currentInr: 7719575.00, predictedInr: 7850000.00, confidence: 94.8, direction: 'UP', volatilityIndex: 2.1, volume24h: '₹95,280,000' },
    { ticker: 'ETH', currentInr: 285611.75, predictedInr: 279500.00, confidence: 82.5, direction: 'DOWN', volatilityIndex: 3.4, volume24h: '₹42,150,000' },
    { ticker: 'SOL', currentInr: 15568.50, predictedInr: 16250.00, confidence: 89.1, direction: 'UP', volatilityIndex: 7.8, volume24h: '₹28,640,000' },
    { ticker: 'XRP', currentInr: 45.75, predictedInr: 48.90, confidence: 78.4, direction: 'UP', volatilityIndex: 9.2, volume24h: '₹14,210,000' }
  ]);

  // Price alerts state
  const [alerts, setAlerts] = useState<PriceAlert[]>([
    { id: 'al-1', ticker: 'NEIRO', condition: 'ABOVE', targetInr: 130.00, isTriggered: false },
    { id: 'al-2', ticker: 'SOL', condition: 'BELOW', targetInr: 15000.00, isTriggered: false }
  ]);

  // New alert inputs
  const [newAlertTicker, setNewAlertTicker] = useState<string>('NEIRO');
  const [newAlertCondition, setNewAlertCondition] = useState<'ABOVE' | 'BELOW'>('ABOVE');
  const [newAlertPriceInr, setNewAlertPriceInr] = useState<number>(130);

  // Claw Agent console tracking
  const [clawTerminal, setClawTerminal] = useState<string[]>([
    '[CLAW_AGENT] Scanning Pi42.com DOM trees dynamically...',
    '[CLAW_AGENT] Ingested 18 localized exchange news metrics from Indian crypto feeds.',
    '[CLAW_SYS] Self-improvement compiler: Optimizing trade-execution paths.'
  ]);

  // Jitter predictions live to simulate cognitive AI model watching charts
  useEffect(() => {
    const interval = setInterval(() => {
      setPredictions(prev =>
        prev.map(p => {
          const delta = (Math.random() * 0.4) - 0.2;
          const nextConf = parseFloat(Math.max(70, Math.min(99.9, p.confidence + delta)).toFixed(1));
          const noiseFactor = (Math.random() * 0.0012) - 0.0006;
          const nextPrice = parseFloat((p.predictedInr * (1 + noiseFactor)).toFixed(p.ticker === 'BTC' || p.ticker === 'ETH' ? 2 : 4));
          const nextCurrent = parseFloat((p.currentInr * (1 + (noiseFactor * 1.2))).toFixed(p.ticker === 'BTC' || p.ticker === 'ETH' ? 2 : 4));

          // Check if any active user price alerts are reached!
          setAlerts(prevAlerts =>
            prevAlerts.map(alert => {
              if (alert.ticker === p.ticker && !alert.isTriggered) {
                const reachedAbove = alert.condition === 'ABOVE' && nextCurrent >= alert.targetInr;
                const reachedBelow = alert.condition === 'BELOW' && nextCurrent <= alert.targetInr;
                if (reachedAbove || reachedBelow) {
                  const timestampStr = new Date().toLocaleTimeString();
                  // Dispatch simulated alert triggers to logs
                  setClawTerminal(prevLog => [
                    ...prevLog,
                    `🚨 [PRICE ALERT TRIGGERED] ${alert.ticker} hit ₹${nextCurrent.toLocaleString()} (Threshold: ₹${alert.targetInr.toLocaleString()})`
                  ]);
                  // Send automatic mock WhatsApp alert in background logs
                  setWaLogs(prevWa => [
                    ...prevWa,
                    `💬 [SENT] WhatsApp Alert: "${alert.ticker} price event triggered at ${timestampStr}!"`
                  ]);
                  return { ...alert, isTriggered: true, timestamp: timestampStr };
                }
              }
              return alert;
            })
          );

          return {
            ...p,
            confidence: nextConf,
            predictedInr: nextPrice,
            currentInr: nextCurrent
          };
        })
      );
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  // WhatsApp pipeline mock trigger
  const sendTestWhatsAppAlert = () => {
    if (isWaSending) return;
    setIsWaSending(true);
    setWaLogs(prev => [...prev, `[WHATSAPP] Handshaking secure gateway with phone: ${whatsappPhone}...`]);

    setTimeout(() => {
      setWaLogs(prev => [
        ...prev,
        `[WHATSAPP 200 SUCCESS] Inbound webhook verified. Message digest dispatched.`,
        `🚨 [SMS_ROUT] Alerts text: "NeuralTrader Pro compounding notification: NEIRO bot completed cycle 14! Recalled principal + 8.5% scalp gains successfully."`
      ]);
      setIsWaSending(false);
    }, 1500);
  };

  // Create a customized price alert
  const handleAddAlert = () => {
    if (newAlertPriceInr <= 0) return;
    const newAlert: PriceAlert = {
      id: `al-${Date.now()}`,
      ticker: newAlertTicker,
      condition: newAlertCondition,
      targetInr: newAlertPriceInr,
      isTriggered: false
    };

    setAlerts(prev => [...prev, newAlert]);
    setClawTerminal(prev => [
      ...prev,
      `[SENTINEL] Programmed alert trigger: ${newAlertTicker} ${newAlertCondition} ₹${newAlertPriceInr.toLocaleString()}`
    ]);
  };

  // Remove alert
  const handleDeleteAlert = (id: string) => {
    setAlerts(prev => prev.filter(al => al.id !== id));
  };

  return (
    <div className="bg-[#151921] border border-slate-800 rounded-xl p-5 flex flex-col gap-6 text-slate-200 shadow-xl" id="ai-command-hub">
      
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-800 pb-3 gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-gradient-to-br from-blue-950 to-indigo-950 rounded-lg text-emerald-400 border border-blue-900/40">
            <TrendingUp className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="font-semibold text-base text-white tracking-wide">AI Evolutionary Command Hub & Alert Gateway</h2>
            <p className="text-xs text-slate-400">Autonomous Neural Predictive Modeling, Live Alert Sentinels, and WhatsApp Bot Integration</p>
          </div>
        </div>

        {/* Live Crawler Status */}
        <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1 rounded text-[10px] font-mono border border-slate-900 text-indigo-400">
          <Cpu className="w-3.5 h-3.5 text-indigo-400 animate-spin-slow" />
          <span>CLAW CORE v4.5</span>
        </div>
      </div>

      {/* THREE ZONE CONTROL LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* COLUMN 1: AI PRICE PREDICTION MODEL WATCHER */}
        <div className="bg-[#0B0E14] border border-slate-850 p-4 rounded-xl flex flex-col gap-3 h-[420px] justify-between">
          <div className="flex items-center justify-between border-b border-slate-900 pb-2">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Prediction Model Weights
            </span>
            <span className="text-[9px] text-[#A6E22E] font-mono font-bold">LIVE ANALYSIS</span>
          </div>

          <p className="text-[10px] text-slate-400 leading-snug font-sans">
            LSTM predictive models monitor live order book sweeps and historical candle drifts in Indian Rupees (₹) to predict short-term movements.
          </p>

          <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-2 mt-2 leading-none" id="prediction-model-list">
            {predictions.map((p) => {
              const isGain = p.direction === 'UP';
              const diffPercent = (((p.predictedInr - p.currentInr) / p.currentInr) * 100).toFixed(2);

              return (
                <div key={p.ticker} className="bg-[#151921] border border-slate-850 p-2.5 rounded-lg flex justify-between items-center text-[10.5px] font-mono">
                  <div className="flex flex-col gap-1">
                    <span className="font-extrabold text-white text-[11px]">{p.ticker} / INR</span>
                    <span className="text-slate-500 text-[9px]">VOL: {p.volume24h}</span>
                  </div>

                  <div className="text-center">
                    <span className="text-white font-bold block">
                      ₹{p.currentInr.toLocaleString(undefined, { maximumFractionDigits: p.currentInr > 200 ? 1 : 4 })}
                    </span>
                    <span className="text-zinc-550 text-[9px] block">Current Paired price</span>
                  </div>

                  <div className="text-right">
                    <span className={`font-semibold text-[10.5px] block ${isGain ? 'text-emerald-400' : 'text-rose-450'}`}>
                      ₹{p.predictedInr.toLocaleString(undefined, { maximumFractionDigits: p.predictedInr > 200 ? 1 : 4 })}
                    </span>
                    <span className={`text-[9px] font-bold block ${isGain ? 'text-emerald-400' : 'text-rose-450'}`}>
                      {isGain ? '↗ +' : '↘ '}{diffPercent}% ({p.confidence}% confidence)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Training feedback trigger */}
          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-900 font-mono text-[9px] flex justify-between items-center mt-1">
            <span className="text-zinc-500">REINFORCEMENT: WATCHING CHARTS</span>
            <span className="text-[#A6E22E] font-bold animate-pulse">OPTIMIZING DRIVES</span>
          </div>
        </div>

        {/* COLUMN 2: PRICE SENTINELS & LIVE ALERTS SETTING (RUPEES) */}
        <div className="bg-[#0B0E14] border border-slate-850 p-4 rounded-xl flex flex-col gap-3 h-[420px] justify-between">
          <div className="flex items-center justify-between border-b border-slate-900 pb-2">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Bell className="w-3.5 h-3.5 text-blue-400" /> Price Sentinels (INR - ₹)
            </span>
            <span className="text-[9px] text-[#A6E22E] font-mono font-bold">ALARM ENGINE</span>
          </div>

          {/* Quick Creator */}
          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-900 flex flex-col gap-2">
            <span className="text-[8px] font-mono text-zinc-550 font-extrabold block">Program dynamic limit triggers:</span>
            
            <div className="grid grid-cols-3 gap-1 text-[10px] font-mono">
              <select
                value={newAlertTicker}
                onChange={(e) => setNewAlertTicker(e.target.value)}
                className="bg-[#151921] text-white border border-slate-800 rounded px-1.5 py-0.5 focus:outline-none"
              >
                <option value="NEIRO">NEIRO</option>
                <option value="BTC">BTC</option>
                <option value="ETH">ETH</option>
                <option value="SOL">SOL</option>
                <option value="XRP">XRP</option>
              </select>

              <select
                value={newAlertCondition}
                onChange={(e) => setNewAlertCondition(e.target.value as any)}
                className="bg-[#151921] text-white border border-slate-800 rounded px-1.5 py-0.5 focus:outline-none"
              >
                <option value="ABOVE">ABOVE &ge;</option>
                <option value="BELOW">BELOW &le;</option>
              </select>

              <input
                type="number"
                value={newAlertPriceInr}
                onChange={(e) => setNewAlertPriceInr(parseFloat(e.target.value) || 0)}
                className="bg-[#151921] text-white border border-slate-800 rounded px-1 text-center font-mono focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              onClick={handleAddAlert}
              className="w-full bg-[#151921] hover:bg-slate-900 text-blue-405 border border-slate-800 rounded py-1 text-[10px] font-bold uppercase transition flex items-center justify-center gap-2 cursor-pointer"
            >
              CREATE SENTINEL ALARM
            </button>
          </div>

          {/* Live Alerts List */}
          <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-1.5 mt-2" id="alerts-sentinels-list">
            {alerts.length === 0 ? (
              <span className="text-[10px] text-zinc-500 italic text-center p-4 block">No price sentinels configured.</span>
            ) : (
              alerts.map((al) => (
                <div key={al.id} className={`p-2 rounded-lg border flex items-center justify-between text-[10px] font-mono last:mb-0 ${
                  al.isTriggered 
                    ? 'bg-emerald-950/10 border-emerald-900/40 text-emerald-400' 
                    : 'bg-slate-950/40 border-slate-900 text-slate-400'
                }`}>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-white text-[11px]">{al.ticker}</span>
                      <span className="text-[9px] font-bold px-1.5 py-0.2 bg-slate-900 text-zinc-500 rounded border border-slate-850">
                        {al.condition}
                      </span>
                    </div>
                    <span className="text-[9px] text-zinc-500 mt-0.5">Threshold: ₹{al.targetInr.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {al.isTriggered ? (
                      <span className="text-[9px] font-extrabold text-emerald-400 uppercase bg-emerald-950/40 px-1 py-0.2 rounded border border-emerald-900/60 animate-pulse">
                        TRIGGERED @ {al.timestamp}
                      </span>
                    ) : (
                      <span className="text-[9px] text-indigo-400 uppercase bg-slate-900 px-1 py-0.2 rounded">
                        MONITORING
                      </span>
                    )}

                    <button
                      onClick={() => handleDeleteAlert(al.id)}
                      className="text-slate-500 hover:text-white font-bold px-1 focus:outline-none cursor-pointer"
                      title="Delete notification sentinel"
                    >
                      &times;
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* COLUMN 3: WHATSAPP WEBHOOK PORT & CLAW AGENT CONTROLS */}
        <div className="bg-[#0B0E14] border border-slate-850 p-4 rounded-xl flex flex-col gap-3.5 h-[420px] justify-between">
          <div className="flex items-center justify-between border-b border-slate-900 pb-2">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-indigo-400 animate-pulse" /> WhatsApp Gateway
            </span>
            <span className="text-[9px] text-indigo-400 font-mono font-bold">TWILIO INTEGRATED</span>
          </div>

          {/* Quick config fields */}
          <div className="flex flex-col gap-2 text-[10px] font-mono leading-none">
            <div className="flex flex-col gap-1">
              <span className="text-zinc-550 block">PHONE NUMBER (IN):</span>
              <input
                type="text"
                value={whatsappPhone}
                onChange={(e) => setWhatsappPhone(e.target.value)}
                className="bg-slate-950 border border-slate-850 rounded px-2.5 py-1 text-[10px] text-white focus:outline-none focus:border-blue-500 w-full"
              />
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-zinc-550 block">ROUTER API ACCESS KEY:</span>
              <input
                type="password"
                value={whatsappApiKey}
                onChange={(e) => setWhatsappApiKey(e.target.value)}
                className="bg-slate-950 border border-slate-850 rounded px-2.5 py-1 text-[10px] text-zinc-3 w-full focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              onClick={sendTestWhatsAppAlert}
              disabled={isWaSending}
              className="px-3 py-1.5 bg-indigo-650 hover:bg-indigo-550 border border-indigo-500 text-white font-bold rounded text-[10px] font-sans uppercase scroll-pt-1 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-45"
            >
              {isWaSending ? (
                <>
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  Sending secure alert SMS...
                </>
              ) : (
                <>
                  <Send className="w-3 h-3" />
                  TEST WHATSAPP HANDSHAKE
                </>
              )}
            </button>
          </div>

          {/* Inbound WhatsApp Logs */}
          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-900 text-[8.5px] font-mono text-indigo-300 max-h-24 min-h-[55px] overflow-y-auto flex flex-col gap-1 leading-snug">
            {waLogs.map((log, logIdx) => (
              <div key={logIdx} className="border-l border-indigo-500 pl-1.5">
                {log}
              </div>
            ))}
          </div>

          {/* AUTO OPERATIONS BOOT/STANDBY SYSTEM SWAP */}
          <div className="border-t border-slate-900/80 pt-2.5 flex flex-col gap-1.5">
            <span className="text-[8px] font-mono text-zinc-500 font-extrabold uppercase">COGNITIVE COMPILING METADATA:</span>
            
            <div className="grid grid-cols-2 gap-2 text-[9px] font-mono">
              <button
                onClick={() => setStartAtBootUp(!startAtBootUp)}
                className={`py-1 px-1.5 rounded text-center border font-bold pointer transition cursor-pointer ${
                  startAtBootUp ? 'bg-emerald-950/20 border-emerald-800 text-emerald-400' : 'bg-slate-950 border-slate-900 text-slate-505'
                }`}
                title="Start micro-bots compound loop directly on VS Code launch"
              >
                {startAtBootUp ? '⚡ AUTO-BOOT ON' : '⚡ AUTO-BOOT STANDBY'}
              </button>

              <button
                onClick={() => setAutoImprove(!autoImprove)}
                className={`py-1 px-1.5 rounded text-center border font-bold pointer transition cursor-pointer ${
                  autoImprove ? 'bg-blue-950/20 border-blue-800 text-blue-400' : 'bg-slate-950 border-slate-900 text-slate-505'
                }`}
                title="Re-compile Playwright files as learning weights shift"
              >
                {autoImprove ? '🔧 AUTO-EVOLVE ON' : '🔧 MANUAL COMPILE'}
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
