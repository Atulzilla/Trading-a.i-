import React, { useState, useEffect } from 'react';
import { ToggleLeft, ToggleRight, Play, Server, Layers, Trash2, Cpu, HelpCircle, TrendingUp, DollarSign, Activity, Terminal, ArrowUpRight, ArrowDownRight, Smartphone, Clock, SmartphoneIcon, RefreshCw } from 'lucide-react';
import { TradePosition } from '../types';

interface MultiTileBotStrategyProps {
  currentTickerPrices: Record<string, number>;
  onTriggerOrchestration: (ticker: string) => void;
  walletBalance: number;
  onBalanceChange: (balance: number) => void;
  onAddPosition: (newPos: TradePosition) => void;
}

interface BotState {
  ticker: string;
  isActive: boolean;
  budgetInr: number; // starts at INR 10!
  currentValueInr: number;
  cycles: number;
  compoundPercent: number; // e.g. 8%
  lastSignal: string;
}

export const MultiTileBotStrategy: React.FC<MultiTileBotStrategyProps> = ({
  currentTickerPrices,
  onTriggerOrchestration,
  walletBalance,
  onBalanceChange,
  onAddPosition
}) => {
  // Exchange rate USD to INR
  const [exchangeRate, setExchangeRate] = useState<number>(83.5);
  
  // Custom budget state in INR
  const [totalBudgetInr, setTotalBudgetInr] = useState<number>(5000);
  const [inrAllocationPerBot, setInrAllocationPerBot] = useState<number>(10); // user can change from ₹10 to other values, defaults to ₹10 compounding!
  const [targetCycles, setTargetCycles] = useState<number>(50);
  const [targetCompoundRate, setTargetCompoundRate] = useState<number>(8.5);

  // Active Multi-Tile Bot States
  const [bots, setBots] = useState<BotState[]>([
    { ticker: 'NEIRO', isActive: false, budgetInr: 10, currentValueInr: 10, cycles: 0, compoundPercent: 8.5, lastSignal: 'IDLE' },
    { ticker: 'BTC', isActive: false, budgetInr: 10, currentValueInr: 10, cycles: 0, compoundPercent: 4.2, lastSignal: 'IDLE' },
    { ticker: 'ETH', isActive: false, budgetInr: 10, currentValueInr: 10, cycles: 0, compoundPercent: 5.1, lastSignal: 'IDLE' },
    { ticker: 'SOL', isActive: false, budgetInr: 10, currentValueInr: 10, cycles: 0, compoundPercent: 6.8, lastSignal: 'IDLE' },
    { ticker: 'XRP', isActive: false, budgetInr: 10, currentValueInr: 10, cycles: 0, compoundPercent: 7.2, lastSignal: 'IDLE' },
  ]);

  // Browser automation status state
  const [automationLogs, setAutomationLogs] = useState<string[]>([
    "[SYSTEM] Ready for browser automation sequence on Pi42 APIs.",
    "[SYSTEM] Select compile on a bot tile to trigger local script run."
  ]);
  const [isAutomationRunning, setIsAutomationRunning] = useState<boolean>(false);
  const [automationProgress, setAutomationProgress] = useState<number>(0);
  const [activeAutomationTicker, setActiveAutomationTicker] = useState<string>('NEIRO');
  const [browserStep, setBrowserStep] = useState<string>('Headless Browser Idle');

  // Multi-tile Bot Compounding simulation interval
  useEffect(() => {
    const interval = setInterval(() => {
      setBots(prevBots =>
        prevBots.map(bot => {
          if (!bot.isActive) return bot;

          // Standard simulated compounding step (randomly trigger cycle completion)
          const completesCycle = Math.random() > 0.65;
          if (completesCycle) {
            const nextCycle = bot.cycles + 1;
            const factor = 1 + (bot.compoundPercent / 100);
            const nextVal = parseFloat((bot.currentValueInr * factor).toFixed(2));
            
            // Randomly flip trade signal for visualization
            const signals = ['COMPLETED_BUY', 'RE-INVESTED_PROFIT', 'Direct-API SIGN', 'COMPLETED_SELL'];
            const lastSignal = signals[Math.floor(Math.random() * signals.length)];

            return {
              ...bot,
              cycles: nextCycle,
              currentValueInr: nextVal,
              lastSignal
            };
          }
          return bot;
        })
      );
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  const toggleBot = (ticker: string) => {
    setBots(prev =>
      prev.map(bot => {
        if (bot.ticker === ticker) {
          const nextActive = !bot.isActive;
          
          // Deduct/Refill values on wallet (INR values directly)
          const costInr = inrAllocationPerBot;
          if (nextActive) {
            if (walletBalance < costInr) {
              alert("Insufficient main wallet balance to initialize this compounding bot!");
              return bot;
            }
            onBalanceChange(walletBalance - costInr);
          } else {
            // Return bot's current worth to wallet (INR values directly)
            const worthInr = bot.currentValueInr;
            onBalanceChange(walletBalance + worthInr);
          }

          return {
            ...bot,
            isActive: nextActive,
            budgetInr: inrAllocationPerBot,
            currentValueInr: nextActive ? inrAllocationPerBot : 10,
            cycles: nextActive ? 0 : bot.cycles,
            lastSignal: nextActive ? 'BOOTED' : 'IDLE'
          };
        }
        return bot;
      })
    );
  };

  // Run a complete simulated Playwright Browser Automation cycle
  const runBrowserAutomation = (coin: string) => {
    if (isAutomationRunning) return;
    setIsAutomationRunning(true);
    setActiveAutomationTicker(coin);
    setAutomationProgress(5);
    setAutomationLogs([]);

    const steps = [
      { p: 15, s: "Launching chromium instances in headless mode...", log: "[Playwright] Spawned headless chromium, PID: 3418" },
      { p: 35, s: "Navigating to https://pi42.com/ ...", log: "[Playwright] Navigation successful, DOM loaded (742ms)" },
      { p: 55, s: "Injecting authorization session keys...", log: "[Pi42] Session injected securely. API secret key confirmed." },
      { p: 75, s: "Generating Cryptographic direct-API payload hash...", log: "[Pi42] Signed Direct Exchange buy/sell parameters." },
      { p: 90, s: "Placing Compounding scalp order: ₹" + inrAllocationPerBot + " allocation...", log: "[Direct API] Order match successful. Executed isolation contract." },
      { p: 100, s: "Monitoring position closed logs. Compounding profit register locked.", log: "[SYSTEM] Browser automation cycle completed safely!" }
    ];

    let currentStepIdx = 0;
    const executeStep = () => {
      if (currentStepIdx >= steps.length) {
        setIsAutomationRunning(false);
        setBrowserStep('Automation Completed (100%)');
        return;
      }
      
      const step = steps[currentStepIdx];
      setBrowserStep(step.s);
      setAutomationProgress(step.p);
      setAutomationLogs(prev => [...prev, step.log]);
      
      currentStepIdx++;
      setTimeout(executeStep, 1500);
    };

    executeStep();
  };

  // Mathematical wealth metrics computations
  const getSimulatedFutureCompoundingValue = () => {
    let result = inrAllocationPerBot;
    for (let i = 0; i < targetCycles; i++) {
      result *= (1 + targetCompoundRate / 100);
    }
    return result;
  };

  const futureWorth = getSimulatedFutureCompoundingValue();
  const multipleBotsCapacity = Math.floor(totalBudgetInr / inrAllocationPerBot);

  return (
    <div className="bg-[#151921] border border-slate-800 rounded-xl p-5 flex flex-col gap-6 text-slate-200 shadow-xl" id="multi-tile-strategic-desk">
      
      {/* Title block */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-950/40 rounded-lg text-emerald-400 border border-blue-900/30">
            <Layers size={18} />
          </div>
          <div>
            <h2 className="font-semibold text-base text-white tracking-wide">Multi-Tile Coin Desk & Pro compounding Bots</h2>
            <p className="text-xs text-slate-400">Deploy Multiple Independent Scalper Cycles</p>
          </div>
        </div>
        
        {/* Exchange rates config */}
        <div className="flex items-center gap-1 bg-[#0B0E14] border border-slate-800 px-3 py-1 rounded text-xs">
          <span className="text-slate-500 font-mono text-[9px]">EXCHANGE RATE:</span>
          <span className="text-white font-extrabold font-mono text-xs">1 USD = ₹{exchangeRate}</span>
        </div>
      </div>

      {/* MULTIPLE COIN TILES GRID */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-300">Live Cryptographic Tiles</span>
          <span className="text-[10px] text-slate-500 font-semibold font-mono">STABILIZED INR PRICES</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5" id="multi-tile-grid">
          {bots.map((bot) => {
            const inrPrice = currentTickerPrices[bot.ticker] || 10;
            const stateIsActive = bot.isActive;

            return (
              <div 
                key={bot.ticker} 
                className={`flex flex-col justify-between border rounded-xl p-3 bg-[#0B0E14] transition-all relative overflow-hidden ${
                  stateIsActive 
                    ? 'border-emerald-500/80 shadow-[0_0_12px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/30' 
                    : 'border-slate-800/80 hover:border-slate-700'
                }`}
                id={`coin-tile-${bot.ticker}`}
              >
                {/* Active Indicator Glow */}
                {stateIsActive && (
                  <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-emerald-500 animate-pulse" />
                )}

                {/* Target Information Column headers */}
                <div className="flex items-center justify-between pb-1 border-b border-slate-900/80">
                  <div className="flex flex-col">
                    <span className="font-extrabold text-sm text-white tracking-wide">{bot.ticker}</span>
                    <span className="text-[10px] text-slate-500 font-mono">INR Paired</span>
                  </div>
                  
                  {/* Master Switch bot toggle */}
                  <button 
                    onClick={() => toggleBot(bot.ticker)}
                    className="p-1 focus:outline-none cursor-pointer text-slate-400 hover:text-white"
                    title={stateIsActive ? "Teardown Bot" : "Deploy ₹10 Compounding Bot"}
                  >
                    {stateIsActive ? (
                      <ToggleRight className="w-8 h-8 text-emerald-400" />
                    ) : (
                      <ToggleLeft className="w-8 h-8 text-slate-600" />
                    )}
                  </button>
                </div>

                {/* Price block Rupee label */}
                <div className="py-2">
                  <span className="text-xs font-bold text-white block mt-0.5">
                    ₹{inrPrice.toLocaleString(undefined, { minimumFractionDigits: inrPrice > 1000 ? 1 : 3, maximumFractionDigits: inrPrice > 1000 ? 1 : 3 })}
                  </span>
                  <span className="text-[8.5px] text-zinc-550 block font-mono">
                    PI42 LIVE RATE
                  </span>
                </div>

                {/* BOT CYCLE PROGRESS (₹10 COMPOUNDING STATUS) */}
                {stateIsActive ? (
                  <div className="bg-[#151921] border border-emerald-950 p-2 rounded-lg mt-1 flex flex-col gap-1 text-[10px] font-mono leading-none">
                    <div className="flex justify-between">
                      <span className="text-slate-500">START PRINCIPAL:</span>
                      <span className="text-slate-350 font-bold">₹{bot.budgetInr}</span>
                    </div>
                    <div className="flex justify-between mt-0.5">
                      <span className="text-emerald-400 font-semibold text-[9px]">CURRENT VALUE:</span>
                      <span className="text-emerald-400 font-extrabold">₹{bot.currentValueInr}</span>
                    </div>
                    <div className="flex justify-between mt-0.5">
                      <span className="text-slate-500">BOT CYCLES:</span>
                      <span className="text-slate-300 font-bold">{bot.cycles} completed</span>
                    </div>
                    <div className="flex justify-between mt-0.5 text-[8px] text-slate-500">
                      <span>STATUS LOG:</span>
                      <span className="text-slate-400 font-bold overflow-hidden truncate max-w-[60px]">{bot.lastSignal}</span>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#151921]/40 border border-slate-900 px-2 py-2.5 rounded-lg text-center text-[10px] text-slate-500 leading-snug mt-1">
                    Scalp bot deactivated. Toggle switches to initialize comp.
                  </div>
                )}

                {/* ACTIONS BUTTON ROW */}
                <div className="grid grid-cols-2 gap-1.5 mt-2.5 pt-2 border-t border-slate-900/40">
                  <button
                    onClick={() => onTriggerOrchestration(bot.ticker)}
                    className="py-1 px-1 bg-slate-950 hover:bg-slate-900 text-[8px] font-bold text-blue-400 border border-slate-800 rounded font-mono cursor-pointer"
                    title="Run multi-agent debate sandbox for this coin"
                  >
                    ORCHESTRATE
                  </button>
                  <button
                    onClick={() => runBrowserAutomation(bot.ticker)}
                    disabled={isAutomationRunning}
                    className="py-1 px-1 bg-slate-950 hover:bg-slate-900 text-[8px] font-bold text-purple-400 border border-slate-800 rounded font-mono cursor-pointer disabled:opacity-45"
                    title="Simulate direct Playwright automation execution"
                  >
                    BROWSER RUN
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* BUDGET, PROFIT CALCULATOR & PRO COMPANION MODEL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 border-t border-slate-800 pt-5">
        
        {/* Left Side: INR Compounding Budget Master Calculator */}
        <div className="lg:col-span-2 bg-[#0B0E14] border border-slate-800/80 p-4 rounded-xl flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-slate-900 pb-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-sans">
              ₹10 Pro Strategy Compounding & Wealth Calculator
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-slate-500 font-mono">Master Budget limit (Rupees)</label>
              <input
                type="number"
                value={totalBudgetInr}
                onChange={(e) => setTotalBudgetInr(parseFloat(e.target.value) || 0)}
                className="bg-[#151921] text-slate-100 border border-slate-850 rounded px-2.5 py-1 text-xs font-mono focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-slate-500 font-mono">Allocation Per Bot (₹)</label>
              <input
                type="number"
                value={inrAllocationPerBot}
                onChange={(e) => setInrAllocationPerBot(parseFloat(e.target.value) || 10)}
                className="bg-[#151921] text-slate-100 border border-slate-850 rounded px-2.5 py-1 text-xs font-mono focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-slate-500 font-mono">Target Cycles (Trades)</label>
              <input
                type="number"
                value={targetCycles}
                onChange={(e) => setTargetCycles(parseInt(e.target.value) || 50)}
                className="bg-[#151921] text-slate-100 border border-slate-850 rounded px-2.5 py-1 text-xs font-mono focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-slate-500 font-mono">Profit / Cycle (%)</label>
              <input
                type="number"
                step="0.5"
                value={targetCompoundRate}
                onChange={(e) => setTargetCompoundRate(parseFloat(e.target.value) || 8.5)}
                className="bg-[#151921] text-slate-100 border border-slate-850 rounded px-2.5 py-1 text-xs font-mono focus:border-blue-500 focus:outline-none"
              />
            </div>

          </div>

          {/* Mathematical forecast output blocks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-950 p-3 rounded-lg border border-slate-900 border-l-4 border-l-emerald-500 leading-normal">
            <div className="flex flex-col">
              <span className="text-[9px] text-slate-500 font-mono uppercase font-semibold">1 Bot Compounding projection (Future Wealth)</span>
              <span className="text-sm font-extrabold text-emerald-400 font-mono mt-0.5">
                ₹{futureWorth.toLocaleString(undefined, { maximumFractionDigits: 1 })}
              </span>
              <span className="text-[8px] text-slate-550 block mt-0.5">Multiplier coefficient: {(futureWorth/inrAllocationPerBot).toFixed(1)}x capital</span>
            </div>

            <div className="flex flex-col border-y md:border-y-0 md:border-x border-slate-900 py-2 md:py-0 md:px-3">
              <span className="text-[9px] text-slate-500 font-mono uppercase font-semibold">Max concurrent bots supported</span>
              <span className="text-sm font-extrabold text-white font-mono mt-0.5">
                {multipleBotsCapacity} Bots active
              </span>
              <span className="text-[8px] text-slate-550 block mt-0.5">at ₹{inrAllocationPerBot} per initialized tile</span>
            </div>

            <div className="flex flex-col">
              <span className="text-[9px] text-slate-500 font-mono uppercase font-semibold">Aggregate compound pool forecast</span>
              <span className="text-sm font-extrabold text-blue-400 font-mono mt-0.5">
                ₹{(futureWorth * multipleBotsCapacity).toLocaleString(undefined, { maximumFractionDigits: 1 })}
              </span>
              <span className="text-[8px] text-slate-550 block mt-0.5">Earned future wealth from target pool</span>
            </div>
          </div>
        </div>

        {/* Right Side: Direct Browser Automation console & Pi42.com API Sign Logger */}
        <div className="bg-[#0B0E14] border border-slate-800/80 p-4 rounded-xl flex flex-col gap-3">
          <div className="flex items-center justify-between border-b border-slate-900 pb-2">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-purple-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-sans">
                Browser Automation Engine
              </h3>
            </div>
            
            {isAutomationRunning && (
              <span className="h-2 w-2 rounded-full bg-purple-500 animate-ping"></span>
            )}
          </div>

          <div className="flex flex-col gap-1.5 font-mono text-[10px]">
            <div className="flex justify-between items-center text-slate-500 text-[9px] font-semibold">
              <span>ACTIVE COIN: <span className="text-white">{activeAutomationTicker}</span></span>
              <span>BROWSER THREAD: ACTIVE</span>
            </div>
            
            {/* Step Status Text */}
            <div className="bg-[#151921] p-2 text-slate-300 rounded border border-slate-900 tracking-tight text-center">
              {isAutomationRunning ? (
                <div className="flex items-center justify-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 text-purple-400 animate-spin" />
                  <span>{browserStep}...</span>
                </div>
              ) : (
                <span className="text-slate-500">Playwright execution logs idle</span>
              )}
            </div>

            {/* Custom Fake visual progress bar */}
            {isAutomationRunning && (
              <div className="w-full bg-[#151921] h-1.5 rounded-full overflow-hidden mt-0.5 border border-slate-900">
                <div 
                  className="bg-purple-500 h-full transition-all duration-300"
                  style={{ width: `${automationProgress}%` }}
                />
              </div>
            )}
          </div>

          {/* Trace Logger Outputs */}
          <div className="bg-black/45 p-2 rounded text-[9px] font-mono text-slate-450 border border-slate-900 overflow-y-auto max-h-24 min-h-[75px] flex flex-col gap-1">
            {automationLogs.map((log, lIdx) => (
              <div key={lIdx} className="leading-tight border-l border-purple-800 pl-1.5">
                {log}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
