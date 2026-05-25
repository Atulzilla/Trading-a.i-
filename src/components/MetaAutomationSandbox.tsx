import React, { useState, useEffect } from 'react';
import { 
  Chrome, 
  Terminal, 
  Lock, 
  ShieldAlert, 
  Settings, 
  Key, 
  Cpu, 
  Globe, 
  Layers, 
  FileCode, 
  Database, 
  Zap, 
  Sparkles, 
  Plus, 
  Trash2, 
  Play, 
  RefreshCw, 
  CheckCircle,
  HelpCircle,
  Smartphone,
  Flame,
  Award
} from 'lucide-react';

interface PasswordCredential {
  id: string;
  siteLabel: string;
  loginUser: string;
  mockKeyHash: string;
  scope: string;
}

interface ClawAgent {
  id: string;
  agentName: string;
  clawRole: string;
  status: 'ACTIVE_SWEEPING' | 'SANDBOX_IDLE' | 'CORRIDOR_LOCKED' | 'WARNING';
  targetTarget: string;
  efficiencyIndex: number;
  lastHandoffMs: number;
}

interface MetaPlan {
  name: string;
  priceInr: string;
  cycles: string;
  botAllowance: string;
  leverageCap: string;
  hasPriorityClaws: boolean;
  colorGrade: string;
}

export const MetaAutomationSandbox: React.FC = () => {
  // --- PASSWORD MANAGER / CREDENTIAL SAFE STATE ---
  const [credentials, setCredentials] = useState<PasswordCredential[]>([
    { id: 'c-1', siteLabel: 'Pi42.com Production Api Keys', loginUser: 'atulvibe@gmail.com', mockKeyHash: 'sc-pi42-prod-••••••••9a29', scope: 'Direct trade + Account info' },
    { id: 'c-2', siteLabel: 'Hugging Face API Gateways', loginUser: 'atul_hugging', mockKeyHash: 'hf-token-••••••••55bf', scope: 'Model weights download & compile' }
  ]);
  const [newLabel, setNewLabel] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newSecret, setNewSecret] = useState('');
  const [selectedScope, setSelectedScope] = useState('Full Access');

  // --- EMBEDDED CHROME LIGHT SYSTEM STATE ---
  const [browserUrl, setBrowserUrl] = useState('https://pi42.com/trading');
  const [browserIsLoading, setBrowserIsLoading] = useState(false);
  const [browserConsoleLogs, setBrowserConsoleLogs] = useState<string[]>([
    '[CHROME LIGHT] Secure Chromium sandbox process started.',
    '[PORT LINK] Proxied safely through container port 3000.'
  ]);
  const [isLogingIn, setIsLogingIn] = useState(false);
  const [loginProgress, setLoginProgress] = useState(0);
  const [browserLoggedIn, setBrowserLoggedIn] = useState(false);

  // --- HYBRID AUTOMATION WORKFLOW GENERATOR ---
  const [metaSystemLanguage, setMetaSystemLanguage] = useState<'Playwright' | 'Puppeteer' | 'Pyright Compiler'>('Playwright');
  const [isCompilingMeta, setIsCompilingMeta] = useState(false);
  const [selectedGemmaVariant, setSelectedGemmaVariant] = useState('Gemma 4 Light 1B-Instruct');
  const [gemmaModelWeights, setGemmaModelWeights] = useState('FP16 Quantized (94.2% accuracy)');
  const [compilationProgress, setCompilationProgress] = useState<string[]>([
    '[INIT] Node.js compiler initialized.',
    '[HF] Model weights mapped to system: Gemma 4 Light 1B.'
  ]);

  // --- MULTIPLE CLAW AGENTS (HYBRID CLAWS) STATE ---
  const [claws, setClaws] = useState<ClawAgent[]>([
    { id: 'cl-1', agentName: 'Claw-Beta Sentiment', clawRole: 'Scrapes Twitter & news grids for volatile keywords on NEIRO', status: 'ACTIVE_SWEEPING', targetTarget: 'https://twitter.com/neiro', efficiencyIndex: 98, lastHandoffMs: 14 },
    { id: 'cl-2', agentName: 'Claw-X86 Liquidity Depth', clawRole: 'Monitors Pi42 orderbook bid-ask gap spreads', status: 'ACTIVE_SWEEPING', targetTarget: 'https://pi42.com/orderbook', efficiencyIndex: 99, lastHandoffMs: 22 },
    { id: 'cl-3', agentName: 'Claw-Hedge Arbitrageur', clawRole: 'Calculates futures-spot spot-spread arbitrage metrics', status: 'CORRIDOR_LOCKED', targetTarget: 'https://pi42.com/exchange/SOL_INR', efficiencyIndex: 94, lastHandoffMs: 40 },
    { id: 'cl-4', agentName: 'Claw-AntiBot Disguiser', clawRole: 'Sets random human mouse trajectories & stealth agent headers', status: 'ACTIVE_SWEEPING', targetTarget: 'CF Bypass Proxy API', efficiencyIndex: 97, lastHandoffMs: 8 }
  ]);

  // --- ADMIN DETAILS AND SECURITY ---
  const [adminSecurityKeys, setAdminSecurityKeys] = useState({
    sessionTimeout: '120 minutes',
    activeTokenID: 'NT-ENTERPRISE-G4-99X-ALPHA',
    preSignedEnforcement: true,
    encryptionMode: 'AES-256-GCM',
    sandboxMode: 'x86 Instruction Emulator'
  });

  // --- PRICING PLANS STATE ---
  const METRIC_PLANS: MetaPlan[] = [
    { name: 'Micro-Scalp Free', priceInr: '₹0', cycles: '50 free trades/day', botAllowance: '1 active instance', leverageCap: '10x leverage max', hasPriorityClaws: false, colorGrade: 'from-slate-900 to-slate-950 text-slate-400 border-slate-800' },
    { name: 'Pro Copier Compounder', priceInr: '₹1,500/mo', cycles: 'Unlimited trades/day', botAllowance: '15 active instances', leverageCap: '50x leverage max', hasPriorityClaws: true, colorGrade: 'from-blue-950/20 to-indigo-950/20 text-blue-400 border-blue-900/40' },
    { name: 'Enterprise Gemma Ultra', priceInr: '₹12,500/mo', cycles: 'Autonomous auto-learning', botAllowance: 'Unlimited active instances', leverageCap: '100x leverage max', hasPriorityClaws: true, colorGrade: 'from-purple-950/20 to-indigo-950/25 text-purple-400 border-purple-800/60' }
  ];
  const [selectedPlan, setSelectedPlan] = useState<string>('Enterprise Gemma Ultra');

  // --- REAL-TIME FLUTTER FOR CLAWS MS LATENCY AND Heartbeats ---
  useEffect(() => {
    const interval = setInterval(() => {
      setClaws(prev => prev.map(claw => {
        if (claw.status === 'SANDBOX_IDLE') return claw;
        const deltaLatency = Math.round((Math.random() * 6) - 3);
        const nextLatency = Math.max(2, Math.min(120, claw.lastHandoffMs + deltaLatency));
        const deltaEff = Math.round((Math.random() * 2) - 1);
        const nextEff = Math.max(90, Math.min(100, claw.efficiencyIndex + deltaEff));
        return {
          ...claw,
          lastHandoffMs: nextLatency,
          efficiencyIndex: nextEff
        };
      }));

      // Occasionally add active chromium simulation logs
      if (Math.random() > 0.7) {
        const chromiumActivities = [
          `[STEALTH_WAF] Biometric mouse drift coordinates matched at (x: ${Math.round(Math.random()*400)}, y: ${Math.round(Math.random()*400)})`,
          `[SESSION] Rotation token refresh approved. Session parameters validated.`,
          `[PYRIGHT] Code parsing checked. Imports mapped to root /src/types.ts.`,
          `[CLAW_BOT] Successfully scraped and ingested localized candle spread metrics in 12ms.`
        ];
        setBrowserConsoleLogs(prev => [
          ...prev,
          chromiumActivities[Math.floor(Math.random() * chromiumActivities.length)]
        ].slice(-6)); // keep last 6 logs
      }
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  // --- CREATE PASSWORD ---
  const handleCreateCredential = () => {
    if (!newLabel.trim() || !newUsername.trim() || !newSecret.trim()) return;
    const newCred: PasswordCredential = {
      id: `c-${Date.now()}`,
      siteLabel: newLabel.trim(),
      loginUser: newUsername.trim(),
      mockKeyHash: `••••••••${newSecret.slice(-4) || 'prod'}`,
      scope: selectedScope
    };
    setCredentials([newCred, ...credentials]);
    setNewLabel('');
    setNewUsername('');
    setNewSecret('');
    
    setBrowserConsoleLogs(prev => [
      ...prev,
      `🔑 [SECURITY] Saved encrypted credential for brand: "${newCred.siteLabel}" in local browser locker.`
    ]);
  };

  const handleDeleteCred = (id: string) => {
    setCredentials(prev => prev.filter(c => c.id !== id));
  };

  // --- WEB NAVIGATION TRIGGER ---
  const handleNavigateUrl = () => {
    if (!browserUrl.trim()) return;
    setBrowserIsLoading(true);
    setBrowserConsoleLogs(prev => [
      ...prev,
      `[CHROME LIGHT] Navigating headless worker session context to: ${browserUrl}...`
    ]);

    setTimeout(() => {
      setBrowserIsLoading(false);
      setBrowserConsoleLogs(prev => [
        ...prev,
        `[CHROME LIGHT] Successful DOM load. Web elements synchronized securely.`
      ]);
    }, 1100);
  };

  // --- BROWSER LOGIN PILOT SEQUENCE ---
  const handleTriggerBrowserLogin = () => {
    if (isLogingIn) return;
    setIsLogingIn(true);
    setLoginProgress(0);
    setBrowserLoggedIn(false);

    setBrowserConsoleLogs(prev => [
      ...prev,
      `🔐 [CHROME LIGHT] Initiating Autopilot secure credentials fill sequence for pi42.com...`
    ]);

    const interval = setInterval(() => {
      setLoginProgress(curr => {
        const next = curr + 25;
        if (next >= 100) {
          clearInterval(interval);
          setIsLogingIn(false);
          setBrowserLoggedIn(true);
          setBrowserConsoleLogs(prevLogs => [
            ...prevLogs,
            `🟢 [CHROME LIGHT] Authentication SUCCESS! Auth token key pre-signed via HMAC-SHA255. Cookie persistent.`,
            `🤖 [AUTOPILOT] Cloud Crawlers onPi42.com are now fully synchronized with active workspace triggers!`
          ]);
          return 100;
        }

        const loginPhases = {
          25: '填 Ingress password fields automatically targeting DOM...',
          50: 'Verifying reCAPTCHA enterprise fingerprint bypass token...',
          75: 'Bypassing Cloudflare protection via stealth webdriver injection...'
        };
        const msg = loginPhases[next as keyof typeof loginPhases] || 'Signing cryptographic digests...';
        setBrowserConsoleLogs(prevLogs => [...prevLogs, `[CHROME LIGHT] ${msg}`]);

        return next;
      });
    }, 900);
  };

  // --- AUTOMATION CODE COMPILING OR HF DEPLOYMENT SIMULATING ---
  const handleCompileAutocode = () => {
    if (isCompilingMeta) return;
    setIsCompilingMeta(true);
    setCompilationProgress([`[INIT] Compiling hybrid automation code for framework: ${metaSystemLanguage}...`]);

    const compileLogs = [
      `[LINTER] Parsing syntax structures. Verifying Pyright type alignments...`,
      `[HUGGINGFACE] Dispatching pre-trained model request to Hugging Face Hub (gemma4-variants-api)...`,
      `[MODEL HUB] Loaded selected variant: "${selectedGemmaVariant}" [${gemmaModelWeights}]`,
      `[STEALTH COMP] Injecting zero-webdriver tracking parameters bypass structures...`,
      `[X86 EMULATOR] Mapped virtual bytecode vectors to local x86 sandbox assembler blocks. Successfully compiled!`,
      `[SUCCESS] Autopilot bytecode dispatched to active claw workers. Swarm live.`
    ];

    let index = 0;
    const tick = () => {
      if (index >= compileLogs.length) {
        setIsCompilingMeta(false);
        return;
      }
      setCompilationProgress(prev => [...prev, compileLogs[index]]);
      index++;
      setTimeout(tick, 700);
    };
    tick();
  };

  // Dynamic code structure depending on parameters selected
  const getDynamicCompilerCode = () => {
    if (metaSystemLanguage === 'Playwright') {
      return `/**
 * Playwright Hybimeta Core Automation Module
 * Target Model: ${selectedGemmaVariant}
 * Architecture: x86 Emulated Swarm
 */
const { chromium } = require('playwright-extra');
const hfHub = require('@huggingface/inference');

async function executeStealthCompileFlow() {
  console.log('[Meta Client] Initializing stealth crawler swarms...');
  const browser = await chromium.launch({ 
    headless: true, 
    executablePath: '/usr/bin/chrome-light' 
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; x86_64) Gemma4Worker/2.2'
  });
  
  const page = await context.newPage();
  await page.goto('${browserUrl}');
  
  // Fill order coordinates bypass Cloudflare anti-bot
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
  });

  console.log('[Comp-Script] Execution complete. Code persistent.');
  await browser.close();
}
executeStealthCompileFlow();`;
    } else if (metaSystemLanguage === 'Puppeteer') {
      return `/**
 * Puppeteer-Extra Hybrid Multi-Claw Automation
 * Compiled via Hugging Face Models
 */
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

async function runPuppeteerGemmaCompounding() {
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.goto('${browserUrl}');
  
  console.log('[Puppeteer Engine] Executing automated credentials payload injection...');
  await page.type('#user-login-field', 'atulvibe@gmail.com');
  await page.click('#submit-auth-credentials');
  
  console.log('[Autopilot] Active multi-claws synchronized.');
  await browser.close();
}
runPuppeteerGemmaCompounding();`;
    } else {
      return `/**
 * x86 Assemblies Emulating bytecode compiler outputs
 * Pyright Lint Check: 0 warnings, 0 errors
 */
import { compileCode } from 'pyright-analyzer';
import { Pi42Securities } from './securities-vault';

export async function assembleMetaEcosystem() {
  const binaryPayload = Buffer.from('x86_MACHINE_CODE_INTEL_ASM');
  const signature = Pi42Securities.hashSHA256(binaryPayload);
  
  console.log('[Pyright Compiler] Checking signature headers: ' + signature);
  return {
    ecosystemState: 'AUTO_EVOLVING',
    activeClaws: 4,
    variantSync: '${selectedGemmaVariant}',
    integrity: 'AES_256_VERIFIED_SECURE'
  };
}`;
    }
  };

  return (
    <div className="bg-[#151921] border border-slate-800 rounded-xl p-5 flex flex-col gap-6 text-slate-200 shadow-xl" id="meta-automation-sandbox-workspace">
      
      {/* 1. MASTER SUMMARY HEADER */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-800 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-purple-900 to-slate-900 rounded-xl text-purple-405 border border-purple-800/40 animate-pulse">
            <Chrome className="w-5.5 h-5.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-base text-white tracking-wide uppercase">
                Chrome Light, Hybrid Multi-Claw & Meta Automation Console
              </h2>
              <span className="bg-purple-950/85 text-purple-300 text-[9px] font-mono font-extrabold px-1.5 py-0.2 rounded border border-purple-900/60 uppercase">
                X86 EMULATED SWARM
              </span>
            </div>
            <p className="text-xs text-slate-400 font-sans">
              Deploy integrated Playwright, Puppeteer and Pyright automated loops, manage local credential databases, and trigger autonomous multiple claw agents.
            </p>
          </div>
        </div>

        {/* Global Security Metrics */}
        <div className="flex items-center gap-4 bg-slate-950 px-3 py-2 border border-slate-900 rounded-lg text-[9.5px] font-mono shrink-0 w-full md:w-auto overflow-x-auto">
          <div className="flex items-center gap-1.5 pr-3 border-r border-slate-850">
            <span className="text-slate-505 block uppercase text-[7.5px]">API_GATEWAY_PORT:</span>
            <span className="text-white font-extrabold text-[11px]">3000 (STEALTH)</span>
          </div>
          <div className="flex items-center gap-1.5 pr-3 border-r border-slate-850">
            <span className="text-slate-505 block uppercase text-[7.5px]">ENCRYPTION:</span>
            <span className="text-emerald-400 font-extrabold">AES-255-SHA</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-505 block uppercase text-[7.5px]">CLAW AGENTS:</span>
            <span className="text-purple-400 font-extrabold">4/4 ENGAGED</span>
          </div>
        </div>
      </div>

      {/* 2. DUAL ROW MULTI-COLUMN DESIGN (FITS EMBEDDED BROWSER AND PARAMETERS IN TOP ROW, COMPILER AND CLAWS BOTTOM ROW) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* PANEL LEVEL A: CHROME LIGHT EMBEDDED VIEWPORT SIMULATOR (Col-span 7) */}
        <div className="lg:col-span-7 bg-[#0B0E14] border border-slate-850 p-4 rounded-xl flex flex-col gap-3.5 h-[390px] justify-between">
          
          <div className="flex flex-col gap-2.5 flex-1">
            {/* Window control header bar representing Chromium */}
            <div className="flex items-center justify-between border-b border-slate-900 pb-2 gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 block"></span>
                <span className="text-[10px] font-mono text-zinc-550 ml-1.5 uppercase font-bold tracking-wider">Chrome Light v1.2</span>
              </div>
              
              {/* Target Address bar */}
              <div className="flex-1 max-w-[65%] flex bg-[#151921] border border-slate-850 p-1 rounded-sm text-[9.5px] font-mono">
                <span className="text-zinc-650 px-1 select-none">https://</span>
                <input
                  type="text"
                  value={browserUrl.replace('https://', '')}
                  onChange={(e) => setBrowserUrl('https://' + e.target.value.replace('https://', ''))}
                  onKeyDown={(e) => e.key === 'Enter' && handleNavigateUrl()}
                  className="bg-transparent text-slate-100 flex-1 outline-none text-[9.5px]"
                />
              </div>

              <button
                onClick={handleNavigateUrl}
                disabled={browserIsLoading}
                className="p-1 px-1.5 bg-slate-950 border border-slate-800 text-[8.5px] rounded hover:border-slate-700 cursor-pointer font-mono font-bold text-indigo-400"
              >
                GO
              </button>
            </div>

            {/* Simulated Live Viewport Pane representing target login */}
            <div className="flex-1 bg-slate-950 rounded-lg p-4 border border-slate-900 relative flex flex-col justify-center items-center text-center overflow-hidden">
              {browserIsLoading ? (
                <div className="flex flex-col items-center gap-2">
                  <RefreshCw className="w-6 h-6 animate-spin text-purple-405" />
                  <span className="text-xs font-mono text-slate-400 animate-pulse">Decompressing secure DOM elements from Pi42 exchange indices...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 w-full max-w-[85%] z-1">
                  <div className="w-10 h-10 bg-indigo-950/70 text-indigo-400 rounded-xl flex items-center justify-center border border-indigo-900/30">
                    <Globe className="w-5.5 h-5.5 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white text-xs uppercase font-mono">Pi42.com Autonomous Ingress Endpoint</h4>
                    <p className="text-[10px] text-zinc-550 mt-1">Headless Chromium has locked coordinates for: <strong className="text-slate-350">{browserUrl}</strong></p>
                  </div>

                  {/* Simulated login forms */}
                  <div className="w-full bg-[#11141B] p-3 rounded-lg border border-slate-900/60 flex flex-col gap-2 relative">
                    <div className="absolute top-1 right-2 flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                      <span className="text-[7.5px] font-mono text-emerald-400 font-extrabold uppercase">Stealth active</span>
                    </div>

                    <div className="flex items-center gap-2 text-[9.5px] text-left">
                      <span className="text-zinc-550 font-mono w-20 uppercase">SECURE USER:</span>
                      <input
                        type="text"
                        readOnly
                        value={credentials[0]?.loginUser || 'atulvibe@gmail.com'}
                        className="bg-slate-950 border border-slate-850 text-slate-200 text-[9px] px-2 py-0.5 rounded flex-1 select-none pointer-events-none font-mono"
                      />
                    </div>
                    <div className="flex items-center gap-2 text-[9.5px] text-left">
                      <span className="text-zinc-550 font-mono w-20 uppercase">PASSWORD SAFE:</span>
                      <input
                        type="password"
                        readOnly
                        value="DUMMY_HEX_SAFE"
                        className="bg-slate-950 border border-slate-850 text-slate-200 text-[9px] px-2 py-0.5 rounded flex-1 select-none pointer-events-none"
                      />
                    </div>

                    {isLogingIn ? (
                      <div className="h-5 bg-indigo-950 rounded flex items-center justify-center border border-indigo-900/40 overflow-hidden relative">
                        <div className="absolute left-0 bottom-0 top-0 bg-indigo-600/30 transition-all duration-300" style={{ width: `${loginProgress}%` }} />
                        <span className="text-[9px] font-mono font-extrabold text-indigo-400 z-1 uppercase animate-pulse">AUTOPILOT ENFORCING CREDIT FILL: {loginProgress}%</span>
                      </div>
                    ) : (
                      <button
                        onClick={handleTriggerBrowserLogin}
                        className={`w-full text-[9px] py-1 font-mono font-bold uppercase transition rounded border cursor-pointer ${
                          browserLoggedIn 
                            ? 'bg-emerald-950/20 text-emerald-400 border-emerald-900/40' 
                            : 'bg-indigo-950/40 text-indigo-400 border-indigo-900 hover:bg-slate-900 hover:border-indigo-700'
                        }`}
                      >
                        {browserLoggedIn ? '🟢 AUTOPILOT AUTH COMPLETED' : '⚡ TRIGGER SECURE LOGIN BYPASS'}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Browser console logs list */}
          <div className="bg-slate-950 p-2 border border-slate-900 rounded-lg text-[8.5px] font-mono text-indigo-305 flex flex-col gap-0.5 leading-snug">
            <span className="text-slate-505 block text-[7.5px] uppercase font-bold border-b border-slate-900 pb-0.5 mb-1.5">CHROME STEALTH DEVT SHELL LOGS:</span>
            {browserConsoleLogs.map((log, idx) => (
              <div key={idx} className="truncate">
                <span className="text-purple-400 mr-1.5">❯</span>{log}
              </div>
            ))}
          </div>
        </div>

        {/* PANEL LEVEL B: CRYPTOGRAPHIC PASSWORD LOCKER & DEPLOY TACTICS (Col-span 5) */}
        <div className="lg:col-span-5 bg-[#0B0E14] border border-slate-850 p-4 rounded-xl flex flex-col gap-3 justify-between h-[390px]">
          
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-slate-900 pb-2">
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-orange-400" /> Admin Credentials Safe
              </span>
              <span className="text-[9px] font-mono text-zinc-550 lowercase">password-vault</span>
            </div>

            <p className="text-[9.5px] text-slate-400 leading-snug">
              Encrypted credentials stored client-side in the ecosystem browser locker using SHA-256 secure memory offsets.
            </p>

            {/* Inputs to store dynamic keys */}
            <div className="bg-[#151921]/40 border border-slate-850 p-2.5 rounded-xl flex flex-col gap-2 text-[9.5px]">
              <span className="text-[8.5px] font-mono text-zinc-555 font-bold uppercase block tracking-wider leading-none">
                Vault New Key/Password Credentials:
              </span>
              
              <div className="grid grid-cols-2 gap-1.5">
                <input
                  type="text"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  placeholder="App Label (e.g. Pi42)"
                  className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-[9.5px] text-slate-200 outline-none focus:border-indigo-500 font-sans"
                />
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="Username / API Key"
                  className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-[9.5px] text-slate-200 outline-none focus:border-indigo-500 font-sans"
                />
                <input
                  type="password"
                  value={newSecret}
                  onChange={(e) => setNewSecret(e.target.value)}
                  placeholder="Password / Secret Key"
                  className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-[9.5px] text-slate-200 outline-none focus:border-indigo-500 font-sans"
                />
                <select
                  value={selectedScope}
                  onChange={(e) => setSelectedScope(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-[9.5px] text-slate-200 outline-none font-mono focus:border-indigo-500"
                >
                  <option value="Direct Trade Access">Direct Trade</option>
                  <option value="HuggingFace API read">HF Model sync</option>
                  <option value="Administration Access">Admin Control</option>
                </select>
              </div>

              <button
                onClick={handleCreateCredential}
                className="w-full bg-[#1A2333] hover:bg-[#202B3E] font-bold text-white border border-indigo-950 py-1 rounded text-[9px] uppercase transition cursor-pointer"
              >
                + STASH KEY IN SECURE MEMORY
              </button>
            </div>

            {/* Credentials display listing scroller */}
            <div className="flex flex-col gap-1.5 overflow-y-auto max-h-[140px] pr-1 mt-1 font-mono text-[9px] leading-tight">
              {credentials.map((cred) => (
                <div key={cred.id} className="p-2 bg-slate-950/80 border border-slate-900 rounded flex justify-between items-center text-slate-350 select-all">
                  <div className="flex flex-col gap-0.5 truncate max-w-[80%]">
                    <span className="font-extrabold text-white text-[9.5px] truncate">{cred.siteLabel}</span>
                    <span className="text-[8px] text-zinc-550">User: {cred.loginUser} • hash: <strong className="text-orange-400">{cred.mockKeyHash}</strong></span>
                    <span className="text-[7.5px] text-indigo-400 tracking-wider">Scope: {cred.scope}</span>
                  </div>
                  <button 
                    onClick={() => handleDeleteCred(cred.id)}
                    className="p-1 text-slate-500 hover:text-rose-455 transition cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Admin security statistics metrics */}
          <div className="grid grid-cols-2 gap-1.5 border-t border-slate-900 pt-2 font-mono text-[8.5px] leading-none mb-0.5">
            <span className="text-zinc-650 uppercase">Securities Integrity: <strong className="text-emerald-400 block font-bold mt-0.5">AES_256_ACTIVE</strong></span>
            <span className="text-zinc-650 uppercase text-right mr-1">Admin Session ID: <strong className="text-white block font-bold mt-0.5">G4-99X-ALPH</strong></span>
          </div>

        </div>

      </div>

      {/* 3. COOPERATIVE BOTTOM SECTOR - HYBRID COMPILER & SWARM CLAWS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* PANEL LEVEL C: HYBRID CODE COMPILER COCKPIT (Col-span 7) */}
        <div className="lg:col-span-7 bg-[#0B0E14] border border-slate-850 p-4 rounded-xl flex flex-col gap-3 justify-between">
          <div className="flex items-center justify-between border-b border-slate-900 pb-2">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <FileCode className="w-3.5 h-3.5 text-indigo-400" /> Playwright, Puppeteer & Pyright compiler
            </span>

            {/* Code framework selector toggle */}
            <div className="flex bg-[#151921] border border-slate-850 p-0.5 rounded font-mono text-[8.5px] gap-0.5 leading-none">
              {(['Playwright', 'Puppeteer', 'Pyright Compiler'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setMetaSystemLanguage(lang)}
                  className={`px-1.5 py-0.5 rounded cursor-pointer font-bold ${
                    metaSystemLanguage === lang 
                      ? 'bg-indigo-950/60 text-indigo-400 border border-indigo-900/30 font-extrabold' 
                      : 'text-zinc-500 hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch flex-1">
            
            {/* Left selector inputs side */}
            <div className="md:col-span-4 flex flex-col gap-2.5 font-sans text-[10px]">
              
              <div className="flex flex-col gap-1">
                <span className="text-[8.5px] font-mono text-zinc-505 font-bold uppercase block leading-none">Hugging Face Variant API:</span>
                <select
                  value={selectedGemmaVariant}
                  onChange={(e) => {
                    setSelectedGemmaVariant(e.target.value);
                    const wt = {
                      'Gemma 4 Light 1B-Instruct': 'FP16 Quantized (94.2% accuracy)',
                      'Gemma 4 Alpha 4B-Direct': 'RAW INT8 (97.15% accuracy)',
                      'Gemma 4 Specular 2B': 'FP32 Precision (95.8% accuracy)'
                    };
                    setGemmaModelWeights(wt[e.target.value as keyof typeof wt] || 'custom weight');
                  }}
                  className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-[10px] text-slate-100 font-mono focus:outline-none focus:border-indigo-500"
                >
                  <option value="Gemma 4 Light 1B-Instruct">Gemma 4 Light 1B (Fast)</option>
                  <option value="Gemma 4 Alpha 4B-Direct">Gemma 4 Alpha 4B (Direct)</option>
                  <option value="Gemma 4 Specular 2B">Gemma 4 Specular 2B</option>
                </select>
              </div>

              <div className="flex flex-col gap-0.5 bg-slate-950/60 p-2 rounded border border-slate-900 font-mono text-[8.5px] leading-tight">
                <span className="text-zinc-550 block text-[7.5px] uppercase">Model weight details:</span>
                <span className="text-emerald-400 font-bold block mt-0.5">{gemmaModelWeights}</span>
              </div>

              <button
                onClick={handleCompileAutocode}
                disabled={isCompilingMeta}
                className="w-full bg-indigo-600 hover:bg-indigo-500 border border-indigo-555 text-white font-bold rounded py-2 text-[9.5px] uppercase transition flex items-center justify-center gap-1 cursor-pointer disabled:opacity-40"
              >
                {isCompilingMeta ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    AUTOBULLD CODES...
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-white" />
                    AUTO BUILD BY API
                  </>
                )}
              </button>

              {/* Compilation results log rolling */}
              <div className="flex-1 bg-slate-950 p-2 border border-slate-900 rounded font-mono text-[8px] text-orange-400 flex flex-col gap-0.5 max-h-[110px] overflow-y-auto leading-tight">
                <span className="text-zinc-550 block text-[7.5px] uppercase border-b border-zinc-900 pb-0.5 mb-1 text-center font-bold">X86 ASSEMBLER OUTPUTS:</span>
                {compilationProgress.map((p, idx) => (
                  <div key={idx} className="truncate"><span className="text-zinc-500">▶</span> {p}</div>
                ))}
              </div>
            </div>

            {/* Right generated pre code view block */}
            <div className="md:col-span-8 bg-slate-950 border border-slate-900 p-2.5 rounded-lg overflow-y-auto max-h-[220px] font-mono text-[9px] relative select-all leading-normal text-slate-355 whitespace-pre">
              {getDynamicCompilerCode()}
              <div className="absolute top-1 right-2 bg-slate-900 text-slate-500 border border-slate-800 px-1 py-0.2 rounded font-extrabold uppercase text-[7px] select-none tracking-widest leading-loose">
                {metaSystemLanguage.toUpperCase()} DIRECTIVE MAPPED
              </div>
            </div>

          </div>
        </div>

        {/* PANEL LEVEL D: HYBRID CLAWS & MULTIPLE CLAW AGENTS MONITOR (Col-span 5) */}
        <div className="lg:col-span-5 bg-[#0B0E14] border border-slate-850 p-4 rounded-xl flex flex-col gap-3 justify-between">
          <div className="flex items-center justify-between border-b border-slate-900 pb-2">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" /> Synchronous Swarm Claw Agents ({claws.length})
            </span>
            <span className="bg-[#11141B] text-[#A6E22E] font-mono text-[8px] px-1 py-0.2 border border-slate-900 uppercase font-bold text-emerald-405">CRAWLER LIVE</span>
          </div>

          <p className="text-[10px] text-slate-400 leading-snug">
            Oversee active robotic crawls running simultaneously in memory backends, validating order ledger depths in real-time.
          </p>

          <div className="flex-1 flex flex-col gap-2 overflow-y-auto max-h-[160px] pr-1 mt-1 font-mono text-[9px] leading-tight">
            {claws.map((claw) => (
              <div key={claw.id} className="p-2.5 bg-[#151921]/60 border border-slate-900 rounded-lg flex flex-col gap-1.5">
                <div className="flex justify-between items-center leading-none">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                    <strong className="text-white text-[9.5px] font-bold">{claw.agentName}</strong>
                  </div>
                  <span className={`px-1 py-0.2 rounded text-[7px] font-extrabold border ${
                    claw.status === 'ACTIVE_SWEEPING' 
                      ? 'bg-emerald-950/10 text-emerald-400 border-emerald-900/30' 
                      : 'bg-indigo-955/20 text-indigo-400 border-indigo-900/30'
                  }`}>
                    {claw.status.replace('_', ' ')}
                  </span>
                </div>

                <p className="text-[8.5px] text-slate-400 font-sans leading-normal">{claw.clawRole}</p>

                <div className="grid grid-cols-3 gap-1 grid-flow-row pt-1 border-t border-slate-900/40 text-[8.5px] text-slate-455">
                  <span className="text-zinc-650 truncate max-w-[100px]">TARGET LINK: <strong className="text-slate-350 font-bold block truncate">{claw.targetTarget}</strong></span>
                  <span className="text-zinc-650 text-center">SYS EFFICIENCY: <strong className="text-emerald-400 font-extrabold block">{claw.efficiencyIndex}%</strong></span>
                  <span className="text-zinc-650 text-right mr-1">HEURISTIC DELAY: <strong className="text-indigo-400 font-extrabold block">{claw.lastHandoffMs}ms</strong></span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[9px] text-[#A6E22E] italic font-mono text-center block pt-1 leading-normal border-t border-slate-900">
            ✔ Claws auto-scale thread processes relative to CPU heap metrics.
          </p>
        </div>

      </div>

      {/* 4. ENTERPRISE PLANS TABLE */}
      <div className="bg-[#0B0E14] border border-slate-850 p-4 rounded-xl flex flex-col gap-3 mt-1.5">
        <div className="flex items-center justify-between border-b border-slate-900 pb-2">
          <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-500 animate-spin-slow" /> Select Ecosystem Compounding Plans
          </span>
          <span className="text-[9px] font-mono text-indigo-400 font-bold">SUBSCRIBE FOR UNLIMITED CLAWS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs pt-1">
          {METRIC_PLANS.map((plan) => {
            const isSelected = selectedPlan === plan.name;
            return (
              <div 
                key={plan.name}
                onClick={() => setSelectedPlan(plan.name)}
                className={`p-3.5 rounded-xl border flex flex-col gap-2.5 transition relative cursor-pointer ${
                  isSelected 
                    ? 'border-indigo-500 bg-indigo-950/20 text-slate-100 ring-1 ring-indigo-500/30' 
                    : 'border-slate-850 bg-slate-950/40 text-slate-400 hover:border-slate-805'
                }`}
              >
                {isSelected && (
                  <span className="absolute top-2 right-2 bg-indigo-650 text-[7px] font-mono text-white px-1.5 py-0.5 rounded font-extrabold uppercase tracking-wide">
                    ACTIVE PLAN SELECTED
                  </span>
                )}
                
                <div className="flex justify-between items-start leading-none gap-2">
                  <span className="text-[12.5px] font-extrabold text-white tracking-wide">{plan.name}</span>
                </div>

                <div className="flex items-baseline gap-1.5 leading-none">
                  <span className="text-[17px] font-extrabold text-emerald-400">{plan.priceInr}</span>
                  <span className="text-[9px] text-zinc-550 font-mono font-semibold uppercase">{plan.cycles}</span>
                </div>

                {/* Characteristics bullet limits */}
                <div className="flex flex-col gap-1 text-[10.5px] font-sans border-t border-slate-900/60 pt-2 text-slate-400">
                  <div className="flex justify-between">
                    <span>Scalper Bot capacity:</span>
                    <strong className="text-white font-semibold">{plan.botAllowance}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Leverage slider cap:</span>
                    <strong className="text-white font-semibold">{plan.leverageCap}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Priority claw latency:</span>
                    <strong className="text-white font-semibold">{plan.hasPriorityClaws ? 'Yes (3ms limits)' : 'Standard (40ms limits)'}</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
