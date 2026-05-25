import React, { useState, useEffect, useRef } from 'react';
import { 
  Cpu, 
  Brain, 
  Layers, 
  Code, 
  Terminal, 
  Sparkles, 
  RefreshCw, 
  TrendingUp, 
  Award, 
  Activity, 
  Chrome, 
  Lock, 
  Play, 
  Compass, 
  Database,
  ArrowRight,
  TrendingDown,
  CheckCircle,
  FolderSync,
  Shuffle,
  FileCheck,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface DOMNode {
  id: string;
  tagName: string;
  className: string;
  selector: string;
  isInspected: boolean;
  status: 'PENDING' | 'MAPPED' | 'INJECTED';
  purpose: string;
}

interface InteractiveTile {
  coin: string;
  basePrice: number;
  currentPrice: number;
  compoundCycles: number;
  accumulatedProfitInr: number;
  tradeState: 'IDLE' | 'ANALYZING' | 'COMPOUNDING' | 'SETTLED';
}

interface WorkspaceLog {
  timestamp: string;
  source: 'GEMINI_OMNI' | 'CLAW_SWARM' | 'GOOGLE_GSUITE_SYNC' | 'X86_COMPILER';
  message: string;
  severity: 'info' | 'success' | 'warn';
}

export const AIOmniMetaOrchestrator: React.FC = () => {
  // ------- REAL-TIME COMPOUNDING SCALE SIMULATOR STATE -------
  const [initialCapital, setInitialCapital] = useState<number>(10000); // ₹ INR Original
  const [reinvestRatio, setReinvestRatio] = useState<number>(85); // % reinvested
  const [targetYieldPercent, setTargetYieldPercent] = useState<number>(4.5); // % per trade cycle
  const [cyclesSimulated, setCyclesSimulated] = useState<number>(35);
  const [isSimulatingGrowth, setIsSimulatingGrowth] = useState<boolean>(true);
  const [tickCounter, setTickCounter] = useState<number>(0);

  // Simulated multiple coins compounding tiles
  const [coinTiles, setCoinTiles] = useState<InteractiveTile[]>([
    { coin: 'NEIRO', basePrice: 121.25, currentPrice: 121.25, compoundCycles: 85, accumulatedProfitInr: 32450, tradeState: 'COMPOUNDING' },
    { coin: 'SOL', basePrice: 15568.45, currentPrice: 15568.45, compoundCycles: 42, accumulatedProfitInr: 124500, tradeState: 'COMPOUNDING' },
    { coin: 'BTC', basePrice: 7719575.00, currentPrice: 7719575.00, compoundCycles: 118, accumulatedProfitInr: 890450, tradeState: 'IDLE' },
    { coin: 'ETH', basePrice: 285610.50, currentPrice: 285610.50, compoundCycles: 19, accumulatedProfitInr: 61250, tradeState: 'SETTLED' },
    { coin: 'XRP', basePrice: 45.75, currentPrice: 45.75, compoundCycles: 5, accumulatedProfitInr: 1150, tradeState: 'ANALYZING' }
  ]);

  // ------- DOM MAPPING & AUTO-BUILDER CANVASES STATE -------
  const [domNodes, setDomNodes] = useState<DOMNode[]>([
    { id: 'node-1', tagName: 'BUTTON', className: 'order-submit-btn', selector: 'button#btn-execute-buy', isInspected: true, status: 'MAPPED', purpose: 'Triggers direct buy orders on Pi42' },
    { id: 'node-2', tagName: 'INPUT', className: 'credential-usr-input', selector: 'input[name="userSecureId"]', isInspected: true, status: 'INJECTED', purpose: 'Automates prompt entries safely' },
    { id: 'node-3', tagName: 'DIV', className: 'pricing-chart-canvas', selector: 'div.tradingview-chart-render', isInspected: false, status: 'PENDING', purpose: 'Captures active screenshots for Gemini Omni' },
    { id: 'node-4', tagName: 'SPAN', className: 'current-balance-display', selector: 'span.balance-rupees-amt', isInspected: true, status: 'MAPPED', purpose: 'Reads real-time capital outputs' },
    { id: 'node-5', tagName: 'INPUT', className: 'reCaptcha-response-token', selector: 'textarea#g-recaptcha-response', isInspected: false, status: 'PENDING', purpose: 'Injects bypassed reCAPTCHA keys v3' }
  ]);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-1');
  const [customSelectorInput, setCustomSelectorInput] = useState<string>('button.trading-submit-action');
  const [inspectAnimation, setInspectAnimation] = useState<boolean>(false);

  // ------- GEMINI OMNI & GOOGLE INTEG HUB STATE -------
  const [googleClientVerified, setGoogleClientVerified] = useState<boolean>(true);
  const [sheetsSyncActive, setSheetsSyncActive] = useState<boolean>(true);
  const [gdriveBackupHash, setGDriveBackupHash] = useState<string>('GD-HASH-7F36BC54-G4');
  const [geminiStatus, setGeminiStatus] = useState<'AWAITING_SCREENSHOT' | 'ANALYZING_CANVAS' | 'DECIDING_TRADE' | 'SYS_IDLE'>('SYS_IDLE');
  const [omniResponseJson, setOmniResponseJson] = useState<string>(`{
  "chartTrend": "UPWARD_PARABOLIC_SQUEEZE",
  "confidenceScore": 0.982,
  "action": "AUTO_COMPOUND_ENGAGED",
  "reasoningExplanation": "NEIRO/INR order bounds show 4.5M INR liquidity walls at ₹118. Short liquidations highly likely within next 12 minutes."
}`);

  // ------- MULTIPLE CLAW SWARM STATE -------
  const [selfEvolvingState, setSelfEvolvingState] = useState<string>('STABLE_NOMINAL_X86');
  const [isMutatingCode, setIsMutatingCode] = useState<boolean>(false);
  const [mutationSuccessCount, setMutationSuccessCount] = useState<number>(418);

  const [workspaceLogs, setWorkspaceLogs] = useState<WorkspaceLog[]>([
    { timestamp: '00:41:20', source: 'GEMINI_OMNI', message: 'Omni visual frame ingested. Mapped ticker coordinates for NEIRO to 99.2% precision.', severity: 'success' },
    { timestamp: '00:43:05', source: 'GOOGLE_GSUITE_SYNC', message: 'Logged compounding session transaction ID "TX_991823" directly to Google Sheets row 1145.', severity: 'info' },
    { timestamp: '00:44:12', source: 'CLAW_SWARM', message: 'Claw-04 detected Pi42.com HTML element layout adjustment. Code auto-evolving...', severity: 'warn' },
    { timestamp: '00:45:00', source: 'X86_COMPILER', message: 'Pyright check passed. Emulated binary generated and compiled with zero errors.', severity: 'success' }
  ]);

  // ------- HEARTBEAT SYSTEM SIMULATION -------
  useEffect(() => {
    const timer = setInterval(() => {
      setTickCounter(prev => prev + 1);

      // Fluctuate price trends slightly and update compounded cycles/earnings in real-time
      setCoinTiles(prevTiles => prevTiles.map(tile => {
        const drift = (Math.random() * 0.003) - 0.001; 
        const nextPrice = tile.currentPrice * (1 + drift);
        
        let newProfit = tile.accumulatedProfitInr;
        let nextCycles = tile.compoundCycles;
        
        // Simulating automated high-frequency compounding trade executions
        if (tile.tradeState === 'COMPOUNDING' && Math.random() > 0.82) {
          nextCycles += 1;
          const compoundYield = initialCapital * (targetYieldPercent / 100) * (reinvestRatio / 100);
          newProfit += parseFloat(compoundYield.toFixed(2));
        }

        return {
          ...tile,
          currentPrice: parseFloat(nextPrice.toFixed(tile.coin === 'BTC' || tile.coin === 'SOL' ? 1 : 3)),
          compoundCycles: nextCycles,
          accumulatedProfitInr: parseFloat(newProfit.toFixed(1))
        };
      }));

      // Random logs addition to simulate meta-orchestration
      if (Math.random() > 0.8) {
        const logs: WorkspaceLog[] = [
          { timestamp: new Date().toISOString().slice(11, 19), source: 'X86_COMPILER', message: `x86 instructions optimized. Memory footprint: ${Math.round(24 + Math.random() * 10)}MB.`, severity: 'info' },
          { timestamp: new Date().toISOString().slice(11, 19), source: 'GEMINI_OMNI', message: `Continuous OCR pass: Ticker is current. Compound yield rate matches targets.`, severity: 'success' },
          { timestamp: new Date().toISOString().slice(11, 19), source: 'CLAW_SWARM', message: `Multiple claws merged telemetry. System state validated: STABLE.`, severity: 'success' },
          { timestamp: new Date().toISOString().slice(11, 19), source: 'GOOGLE_GSUITE_SYNC', message: `Pre-signed sheet backups committed safely to GDrive. Hash initialized.`, severity: 'info' }
        ];
        const chosenLog = logs[Math.floor(Math.random() * logs.length)];
        setWorkspaceLogs(prev => [chosenLog, ...prev].slice(0, 10)); // keep last 10
      }
    }, 2500);

    return () => clearInterval(timer);
  }, [initialCapital, reinvestRatio, targetYieldPercent]);

  // ------- INTERACTIVE RUNNERS -------
  const handleInspectDOMElement = () => {
    if (inspectAnimation) return;
    setInspectAnimation(true);
    setGeminiStatus('ANALYZING_CANVAS');

    setWorkspaceLogs(prev => [
      { timestamp: new Date().toISOString().slice(11, 19), source: 'GEMINI_OMNI', message: `[OMNI INSPECTOR] Scanning current DOM layout structure dynamically...`, severity: 'info' },
      ...prev
    ]);

    setTimeout(() => {
      setInspectAnimation(false);
      setGeminiStatus('SYS_IDLE');
      
      // Update targeted node in credentials
      setDomNodes(prev => prev.map(node => {
        if (node.id === selectedNodeId) {
          return { ...node, isInspected: true, status: 'MAPPED' };
        }
        return node;
      }));

      setWorkspaceLogs(prev => [
        { timestamp: new Date().toISOString().slice(11, 19), source: 'GEMINI_OMNI', message: `Successfully mapped target selector to active AI database. Code compiled!`, severity: 'success' },
        ...prev
      ]);
    }, 1800);
  };

  const handleCustomSelectorAdd = () => {
    if (!customSelectorInput.includes('button') && !customSelectorInput.includes('div') && !customSelectorInput.includes('input') && !customSelectorInput.includes('.')) {
      alert('Please enter a valid CSS/XPath selector.');
      return;
    }
    const newNode: DOMNode = {
      id: `node-${Date.now()}`,
      tagName: customSelectorInput.split(/[#\.]/)[0].toUpperCase() || 'ELEMENT',
      className: customSelectorInput.split(/[#\.]/)[1] || 'generic-target',
      selector: customSelectorInput,
      isInspected: false,
      status: 'PENDING',
      purpose: 'Custom autonomous element binding'
    };
    setDomNodes([...domNodes, newNode]);
    setSelectedNodeId(newNode.id);
    setCustomSelectorInput('');
  };

  const handleTriggerSelfEvolution = () => {
    if (isMutatingCode) return;
    setIsMutatingCode(true);
    setSelfEvolvingState('CODE_MUTATING_X86_COMPILE');

    setWorkspaceLogs(prev => [
      { timestamp: new Date().toISOString().slice(11, 19), source: 'X86_COMPILER', message: `[EVOLUTION] Simulating target DOM structural collapse. Rewriting locators...`, severity: 'warn' },
      ...prev
    ]);

    setTimeout(() => {
      setIsMutatingCode(false);
      setMutationSuccessCount(curr => curr + 1);
      setSelfEvolvingState('STABLE_NOMINAL_X86');
      setWorkspaceLogs(prev => [
        { timestamp: new Date().toISOString().slice(11, 19), source: 'X86_COMPILER', message: `[EVOLUTION COMPLETE] Code fully evolved! Dynamic WAF proxies validated. 0 errors.`, severity: 'success' },
        ...prev
      ]);
    }, 2200);
  };

  // Calculation for safe-compounding projection
  const getSimulatedTotalPower = () => {
    // Basic compound growth formula: A = P * (1 + r)^n
    const r = (targetYieldPercent / 100) * (reinvestRatio / 100);
    const total = initialCapital * Math.pow(1 + r, cyclesSimulated);
    return Math.round(total);
  };

  // SVG coordinate calculation for premium compounding graph
  const getSimulatedGraphPoints = () => {
    const points: string[] = [];
    const r = (targetYieldPercent / 100) * (reinvestRatio / 100);
    const width = 500;
    const height = 110;
    
    for (let i = 0; i <= 10; i++) {
      const stepValue = initialCapital * Math.pow(1 + r, (cyclesSimulated / 10) * i);
      const maxVal = initialCapital * Math.pow(1 + r, cyclesSimulated);
      
      const x = (i / 10) * width;
      // Map stepValue proportionately from baseline to height
      const y = height - ((stepValue - initialCapital) / (maxVal - initialCapital || 1)) * (height - 20) - 10;
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  };

  return (
    <div className="bg-[#151921] border border-slate-800 rounded-xl p-5 flex flex-col gap-6 text-slate-200 shadow-xl" id="ai-omni-meta-orchestrator-root">
      
      {/* 1. MASTER HIGH-FIDELITY HEADER SECTION */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-800 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-indigo-950 to-blue-950 rounded-xl text-[#A6E22E] border border-indigo-900/40 shadow-lg animate-pulse">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-base text-white tracking-wide uppercase font-sans">
                🧠 Gemini Omni Meta-Orchestrator & DOM Compounding Engine
              </h2>
              <span className="bg-[#11141B] text-[#A6E22E] text-[9px] font-mono font-extrabold px-1.5 py-0.2 rounded border border-[#A6E22E]/30 uppercase">
                EMBEDDED COGNITIVE INTEL
              </span>
            </div>
            <p className="text-xs text-slate-400 font-sans">
              Fully autonomous ecosystem: auto-building virtual DOM mappings, routing pre-signed Google Sheets audits, executing multipronged compounding scales, and repairing active Playwright/Puppeteer code on browser DOM mutation.
            </p>
          </div>
        </div>

        {/* Global state monitor chips */}
        <div className="flex flex-wrap items-center gap-3 bg-slate-950 px-3.5 py-2.5 border border-slate-900 rounded-xl text-[9px] font-mono shrink-0 w-full md:w-auto">
          <div className="flex items-center gap-1.5 pr-2.5 border-r border-slate-850">
            <span className="text-slate-500 text-[8px] uppercase font-bold text-slate-400">EVOLUTION_LOCK:</span>
            <span className="text-[#A6E22E] font-bold">{selfEvolvingState}</span>
          </div>
          <div className="flex items-center gap-1.5 pr-2.5 border-r border-slate-850">
            <span className="text-slate-500 text-[8px] uppercase font-bold text-slate-400">REPAIRS:</span>
            <span className="text-white font-extrabold">{mutationSuccessCount} AUTOCURES</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-550 text-[8px] uppercase font-bold text-slate-400">CHROME_LIGHT:</span>
            <span className="text-emerald-400 font-extrabold">GATEWAY PORT (3000) ACTIVE</span>
          </div>
        </div>
      </div>

      {/* 2. THREE DYNAMIC FUNCTIONAL GRIDS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* PANEL A: REAL-TIME COMPOUNDING SCALE SIMULATOR (Col-span 5) */}
        <div className="lg:col-span-5 bg-[#0B0E14] border border-slate-850 p-4 rounded-xl flex flex-col gap-3 justify-between">
          <div className="flex items-center justify-between border-b border-slate-900 pb-1.5">
            <span className="text-[11px] font-mono font-bold text-slate-405 uppercase tracking-widest flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#A6E22E]" /> INR Compounding Scale Controller
            </span>
            <span className="bg-emerald-950/80 text-emerald-400 text-[8px] px-1 py-0.2 rounded border border-emerald-900/30 font-mono font-extrabold">LIVE SCALE ACTIVE</span>
          </div>

          <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
            Adjust dynamic simulation variables. Reinvestment yields compound natively in local currency (₹ INR) following high-leverage multiple coin trade segments.
          </p>

          <div className="bg-[#11141B] p-3 rounded-lg border border-slate-900 flex flex-col gap-2.5 text-[10px] mt-1">
            <div className="grid grid-cols-2 gap-3 mb-2">
              <div>
                <label className="text-zinc-550 block font-bold text-[8.5px] uppercase font-mono mb-1">Original Capital (₹):</label>
                <input 
                  type="number" 
                  value={initialCapital}
                  onChange={(e) => setInitialCapital(Math.max(10, parseInt(e.target.value) || 0))}
                  className="w-full bg-slate-950 border border-slate-800 px-2 py-1 text-slate-200 rounded font-mono focus:border-[#A6E22E] outline-none" 
                />
              </div>
              <div>
                <label className="text-zinc-550 block font-bold text-[8.5px] uppercase font-mono mb-1">Simulated Cycles:</label>
                <input 
                  type="number" 
                  value={cyclesSimulated}
                  onChange={(e) => setCyclesSimulated(Math.max(1, parseInt(e.target.value) || 0))}
                  className="w-full bg-slate-950 border border-slate-800 px-2 py-1 text-slate-200 rounded font-mono focus:border-[#A6E22E] outline-none" 
                />
              </div>
            </div>

            {/* Range adjustments */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between font-mono text-[9px]">
                <span className="text-slate-400">REINVEST RATIO: <strong className="text-[#A6E22E]">{reinvestRatio}%</strong></span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="100" 
                value={reinvestRatio} 
                onChange={(e) => setReinvestRatio(parseInt(e.target.value))}
                className="w-full accent-[#A6E22E] h-1 bg-slate-950 rounded-lg cursor-pointer" 
              />
            </div>

            <div className="flex flex-col gap-1.5 mt-1">
              <div className="flex justify-between font-mono text-[9px]">
                <span className="text-slate-400">YIELD PER STEP CONTRACT: <strong className="text-white">{targetYieldPercent}% Avg</strong></span>
              </div>
              <input 
                type="range" 
                min="0.5" 
                max="25.0" 
                step="0.5"
                value={targetYieldPercent} 
                onChange={(e) => setTargetYieldPercent(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 h-1 bg-slate-950 rounded-lg cursor-pointer" 
              />
            </div>
          </div>

          {/* Premium Compound Yield Plot SVG */}
          <div className="bg-slate-950 p-2.5 border border-slate-900 rounded-lg h-[130px] flex flex-col justify-between relative overflow-hidden mt-1 select-none">
            <span className="text-[8px] font-mono text-zinc-600 uppercase absolute top-1.5 left-2">REINVESTMENT COMPOUND CURVE PROJECTOR</span>
            
            <div className="flex-1 flex items-end pt-5">
              <svg className="w-full h-[90px] overflow-visible">
                {/* Vector paths for graph */}
                <polyline
                  fill="none"
                  stroke="#A6E22E"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={getSimulatedGraphPoints()}
                  className="drop-shadow-[0_0_8px_rgba(166,226,46,0.3)]"
                />
              </svg>
            </div>

            <div className="flex justify-between items-baseline font-mono text-[10.5px] border-t border-slate-900/80 pt-1.5">
              <span className="text-slate-550">INITIAL: <strong className="text-zinc-350">₹{initialCapital.toLocaleString()}</strong></span>
              <span className="text-slate-550">PROJECTION:  
                <strong className="text-emerald-400 text-xs ml-1 font-extrabold underline decoration-emerald-800">
                  ₹{getSimulatedTotalPower().toLocaleString()}
                </strong>
              </span>
            </div>
          </div>

          {/* Core Interactive multi-coin scales */}
          <div className="bg-slate-950 p-2 border border-slate-900 rounded-lg flex flex-col gap-1.5 text-[8.5px] mt-1 font-mono">
            <span className="text-zinc-555 block text-[7.5px] font-bold uppercase tracking-wider mb-0.5 border-b border-slate-900 pb-1">MULTIPLE TILES LIVE HIGH-SPEED REINVESTMENTS:</span>
            <div className="flex flex-col gap-1 max-h-[110px] overflow-y-auto pr-1">
              {coinTiles.map((tile, tid) => (
                <div key={tid} className="flex justify-between items-center bg-[#11141B]/80 p-1 px-2 rounded border border-slate-900/60 leading-none">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <strong className="text-white uppercase text-[9px] font-bold">{tile.coin}/INR</strong>
                  </div>
                  <div>
                    <span className="text-zinc-505 mr-2">CYCLES: <strong className="text-slate-350">{tile.compoundCycles}</strong></span>
                    <span className="text-zinc-505">PROFIT: <strong className="text-emerald-405 font-extrabold">₹{tile.accumulatedProfitInr.toLocaleString()}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* PANEL B: DOM EXAMINER & AUTO STRUCTURAL BUILDER (Col-span 4) */}
        <div className="lg:col-span-4 bg-[#0B0E14] border border-slate-850 p-4 rounded-xl flex flex-col gap-3 justify-between">
          <div className="flex items-center justify-between border-b border-slate-900 pb-1.5">
            <span className="text-[11px] font-mono font-bold text-slate-405 uppercase tracking-widest flex items-center gap-1.5">
              <Chrome className="w-4 h-4 text-purple-400" /> Web DOM Navigator Mapping
            </span>
            <span className="text-[8px] font-mono text-purple-404 uppercase">SELECTOR_SYNC</span>
          </div>

          <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
            Auto-generate secure XPath/CSS element tags on targeted interfaces like Pi42 or Google. Omni scans DOM shapes to formulate stealth navigation handles.
          </p>

          {/* List of mappable nodes */}
          <div className="flex-1 overflow-y-auto max-h-[170px] pr-1 flex flex-col gap-1.5 my-1 bg-[#11141B]/50 p-2 rounded-lg border border-slate-900">
            {domNodes.map((node) => {
              const isSelected = selectedNodeId === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`p-2 rounded border transition cursor-pointer flex flex-col gap-1 leading-none ${
                    isSelected 
                      ? 'bg-purple-950/20 border-purple-550/80 text-white' 
                      : 'bg-slate-950/80 border-slate-900 text-slate-454 hover:border-slate-800'
                  }`}
                >
                  <div className="flex justify-between items-center text-[9px]">
                    <div className="flex items-center gap-1">
                      <strong className="text-zinc-350 font-bold">{node.tagName}</strong>
                      <span className="text-zinc-550">.{node.className}</span>
                    </div>
                    
                    <span className={`px-1 py-0.2 rounded text-[7.5px] font-mono uppercase font-bold text-[7.5px] ${
                      node.status === 'MAPPED' ? 'bg-emerald-950/30 text-emerald-400 border border-emerald-900/30' : node.status === 'INJECTED' ? 'bg-blue-955/25 text-blue-400' : 'bg-slate-900 text-slate-500'
                    }`}>
                      {node.status}
                    </span>
                  </div>

                  <span className="text-[8.5px] font-mono text-purple-305 block truncate mt-0.5 select-all">{node.selector}</span>
                  <p className="text-[8px] text-slate-500 font-sans tracking-wide mt-0.5 leading-tight">{node.purpose}</p>
                </div>
              );
            })}
          </div>

          {/* Selector input for additional custom injections */}
          <div className="bg-slate-900/50 p-2.5 rounded-lg border border-slate-850 flex flex-col gap-2 mt-1">
            <span className="text-[8.5px] font-mono text-zinc-505 block uppercase font-bold tracking-wider leading-none">Register New DOM Anchor Selector:</span>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={customSelectorInput}
                onChange={(e) => setCustomSelectorInput(e.target.value)}
                placeholder="button.submit-limit-buy-layer"
                className="bg-slate-950 border border-slate-800 rounded flex-1 text-[9.5px] text-slate-100 px-2 py-1 outline-none font-mono"
              />
              <button
                onClick={handleCustomSelectorAdd}
                className="px-2.5 bg-slate-950 border border-slate-850 rounded hover:border-slate-700 text-[9.5px] font-bold text-white uppercase font-mono cursor-pointer transition leading-none"
              >
                + BIND
              </button>
            </div>

            <button
              onClick={handleInspectDOMElement}
              disabled={inspectAnimation}
              className="w-full bg-[#1F2533] hover:bg-[#252E40] border border-purple-900 font-bold text-white py-1.5 rounded uppercase font-mono text-[9px] tracking-wider transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40"
            >
              {inspectAnimation ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-purple-400" />
                  OMNI SCANNING TARGET ANCHOR...
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-[#A6E22E]" />
                  INSPECT & RESOLVE DOM WITH AI
                </>
              )}
            </button>
          </div>

          <div className="bg-slate-950 py-2 border border-slate-900 rounded font-mono text-[8.5px] text-center flex items-center justify-center gap-1.5 mt-1 text-slate-500">
            <CheckCircle className="w-3 h-3 text-emerald-400" /> Dynamic locators are integrated seamlessly.
          </div>
        </div>

        {/* PANEL C: GEMINI OMNI VISION & GOOGLE WORKSPACE SYNC (Col-span 3) */}
        <div className="lg:col-span-3 bg-[#0B0E14] border border-slate-850 p-4 rounded-xl flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-900 pb-1.5">
            <span className="text-[11px] font-mono font-bold text-slate-405 uppercase tracking-widest flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-400" /> Gemini Omni & Sheets Sync
            </span>
            <span className="text-[8px] font-mono text-indigo-404 uppercase">INTEG_HUB</span>
          </div>

          <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
            Trace automated, pre-signed database updates logged directly to Google Workspace sheets. Gemini Omni reads visual canvas frames to trigger compounding.
          </p>

          {/* GSuite active configuration status metrics */}
          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-900 flex flex-col gap-2 mt-1 font-mono text-[9px]">
            <div className="flex justify-between items-center leading-none">
              <span className="text-zinc-550 uppercase">Google Client Scope:</span>
              <span className="text-white font-bold bg-[#151921]/90 px-1 py-0.2 rounded border border-slate-850 font-extrabold uppercase text-[7.5px]">CONNECTED 🟢</span>
            </div>
            <div className="flex justify-between items-center leading-none">
              <span className="text-zinc-550 uppercase">Google Sheets Sync:</span>
              <span className="text-[#A6E22E] font-bold uppercase text-[7.5px]" id="sheets-sync-status">SYNCHRONIZED (14MS)</span>
            </div>
            <div className="flex flex-col gap-0.5 bg-[#151921] p-1.5 border border-slate-900/60 rounded text-[7.5px] leading-tight text-slate-450 mt-1">
              <span className="text-zinc-555">LOGGING TO MAIN EXCEL CELL BOUNDS:</span>
              <span className="text-white font-sans text-[8px] truncate mt-0.5">atulvibe_pi42_reinvestments_2026.xlsx [Sheet1]</span>
            </div>
          </div>

          {/* Gemini Multimodal console responses mockup */}
          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-900 flex flex-col gap-1.5 mt-2 flex-1 relative overflow-hidden h-[155px]">
            <div className="flex items-center justify-between border-b border-slate-905 pb-1 select-none">
              <span className="text-[7.5px] font-mono text-purple-404 font-bold uppercase">Incoming Frame Vision (Gemini Omni AI):</span>
              <span className="h-1 text-right block w-2 rounded-full bg-emerald-400"></span>
            </div>

            <pre className="text-[8px] text-[#A6E22E] font-mono whitespace-pre-wrap leading-tight select-all max-h-[125px] overflow-y-auto">
              {omniResponseJson}
            </pre>
          </div>

          <button 
            onClick={() => {
              setOmniResponseJson(`{
  "chartTrend": "SIDEWAYS_CONSOLIDATION_BUILDUP",
  "confidenceScore": 0.948,
  "action": "HOLD_LIMIT_STEALTH",
  "reasoningExplanation": "Broke minor support layers. Waiting for x86 scraper to confirm localized whale bid additions on Google backend logs."
}`);
            }}
            className="w-full mt-2 bg-indigo-950 hover:bg-slate-900 border border-indigo-900 font-bold text-white py-1.5 rounded uppercase font-mono text-[9px] tracking-wider transition cursor-pointer"
          >
            🔄 Query Gemini Multimodal OCR
          </button>
        </div>

      </div>

      {/* 3. MULTIPLE CLAW SWARM & HYBRID MUTATOR CONTROL PANEL (BOTTOM ROW) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch mt-1">
        
        {/* PANEL LEVEL D: CHROME LIGHT WEB SHIFT CORE & COMPILER AUTO-EVOLUTION (Col-span 7) */}
        <div className="lg:col-span-7 bg-[#0B0E14] border border-slate-850 p-4 rounded-xl flex flex-col gap-3 justify-between">
          <div className="flex items-center justify-between border-b border-slate-900 pb-1.5">
            <span className="text-[11px] font-mono font-bold text-slate-405 uppercase tracking-widest flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-orange-400" /> Auto-Evolving Meta Code Generation compiler & Pyright Check
            </span>
            <span className="bg-orange-955/30 text-orange-400 font-mono font-extrabold text-[8px] border border-orange-900/40 px-1 py-0.2 rounded">
              WAF IMMUNITY ON
            </span>
          </div>

          <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
            Direct output of compiled emulated machine code mapped from Gemini Omni definitions down to bare metal Playwright scripts.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch flex-1">
            
            {/* Left side actions and variables */}
            <div className="md:col-span-4 flex flex-col gap-2 font-mono text-[9.5px]">
              
              <div className="flex flex-col gap-0.5 bg-slate-950/80 p-2 rounded border border-slate-900 leading-tight">
                <span className="text-zinc-650 block text-[7.5px] uppercase">COGNITIVE COMPILER STATE:</span>
                <span className="text-orange-400 font-bold block mt-0.5">{selfEvolvingState}</span>
              </div>

              <div className="flex flex-col gap-0.5 bg-slate-950/80 p-2 rounded border border-slate-900 leading-tight">
                <span className="text-zinc-650 block text-[7.5px] uppercase">MUTATION METRICS:</span>
                <span className="text-white font-bold block mt-0.5">{mutationSuccessCount} Mapped DOM mutations</span>
              </div>

              <button
                onClick={handleTriggerSelfEvolution}
                disabled={isMutatingCode}
                className="w-full bg-[#1C202E] hover:bg-[#252A3C] border border-orange-900/50 text-white font-extrabold rounded py-2 text-[9px] uppercase transition flex items-center justify-center gap-1 cursor-pointer disabled:opacity-40 leading-none"
              >
                {isMutatingCode ? (
                  <>
                    <RefreshCw className="w-3 h-3 animate-spin" />
                    MUTATING ENGINE CODES...
                  </>
                ) : (
                  <>
                    <Shuffle className="w-3.5 h-3.5 text-orange-400" />
                    MUTATE & REPAIR ON TARGET SHIFT
                  </>
                )}
              </button>

              <div className="bg-slate-950 p-2 rounded border border-slate-900 text-[7px] text-zinc-550 leading-normal font-mono text-center">
                ⚠️ Sandbox auto-reconstructs Puppeteer selector parameters when Pi42 adjusts class tokens.
              </div>
            </div>

            {/* Code output display box */}
            <div className="md:col-span-8 bg-slate-950 border border-slate-900 p-2.5 rounded-lg overflow-y-auto max-h-[175px] font-mono text-[9px] relative select-all leading-normal text-slate-355 whitespace-pre">
{`/**
 * Playwright Autonomous DOM Compiling Module
 * Framework: Gemma 4 / Gemini Omni Combined
 */
import { chromium, BrowserContext } from 'playwright-extra';
import { Pi42Securities } from './securities-vault';

export async function executeAutoEvolvedMapping() {
  console.log('[INTEGNODE] Launching emulated Chrome Light viewport via port 3000...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Simulated Target Node resolved using inspector:
  const resolvedTargetSelector = "${domNodes.find(n => n.id === selectedNodeId)?.selector || 'button#btn-execute-buy'}";
  console.log(\`[COMPILER] Target element verified: $\{resolvedTargetSelector}\`);

  await page.goto('https://pi42.com/trading');
  
  // Direct human trajectory click automation bypassed Cloudflare challenge bounds
  await page.click(resolvedTargetSelector);
  
  console.log('[GSUITE_SYNC] Posting success transaction to Google audit Sheet...');
  await browser.close();
}`}
              <div className="absolute top-1 right-2 bg-slate-900 text-slate-550 border border-slate-800 px-1.5 py-0.2 rounded font-extrabold uppercase text-[7px] select-none tracking-widest leading-loose">
                AUTO EMBED CODE CAP
              </div>
            </div>

          </div>
        </div>

        {/* PANEL LEVEL E: DUAL SWARM MONITOR (Col-span 5) */}
        <div className="lg:col-span-5 bg-[#0B0E14] border border-slate-850 p-4 rounded-xl flex flex-col gap-2.5 justify-between">
          <div className="flex items-center justify-between border-b border-slate-900 pb-1.5">
            <span className="text-[11px] font-mono font-bold text-slate-405 uppercase tracking-widest flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-[#A6E22E]" /> Complete Auto Evolving Meta Swarm Logs
            </span>
            <span className="text-[7.5px] font-mono text-zinc-550">SYS_CONSOLE_PRINT</span>
          </div>

          <div className="flex-1 bg-slate-950 p-2.5 border border-slate-901 rounded-lg text-[8.5px] font-mono flex flex-col gap-1.5 max-h-[170px] overflow-y-auto leading-tight select-all">
            {workspaceLogs.map((log, lid) => (
              <div key={lid} className="flex gap-2 items-start border-l border-slate-900 pl-1.5">
                <span className="text-zinc-650 font-bold">[{log.timestamp}]</span>
                <span className={`font-extrabold text-[7.5px] shrink-0 font-mono ${
                  log.source === 'GEMINI_OMNI' ? 'text-purple-400' : log.source === 'GOOGLE_GSUITE_SYNC' ? 'text-indigo-400' : 'text-emerald-450'
                }`}>{log.source}:</span>
                <span className="text-slate-350">{log.message}</span>
              </div>
            ))}
          </div>

          <div className="bg-slate-950/40 p-2 border border-slate-900 rounded font-sans text-[8.2px] text-zinc-550 leading-relaxed text-center">
            ✔ Auto-learning triggers are enabled. Active sandbox compiles instructions with 100% full integrity security.
          </div>
        </div>

      </div>

    </div>
  );
};
