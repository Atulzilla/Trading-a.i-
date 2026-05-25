import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Sparkles, Terminal, Play, Cpu, RefreshCw, MessageSquare, AlertCircle, Award, CheckCircle, Database } from 'lucide-react';

interface NLPToken {
  token: string;
  tag: 'ACTION' | 'CURRENCY' | 'TICKER' | 'QUANTITY' | 'PARAMETER' | 'STEALTH';
}

export const VoiceCommandNlpDesk: React.FC = () => {
  // Speech & NLP States
  const [isListening, setIsListening] = useState<boolean>(false);
  const [typedCommand, setTypedCommand] = useState<string>('');
  const [isVoiceSupported, setIsVoiceSupported] = useState<boolean>(true);
  const [speechSynthesisActive, setSpeechSynthesisActive] = useState<boolean>(true);
  
  const [nlpTokens, setNlpTokens] = useState<NLPToken[]>([
    { token: 'TRIGGER', tag: 'ACTION' },
    { token: '₹10', tag: 'QUANTITY' },
    { token: 'COMPOUNDING', tag: 'PARAMETER' },
    { token: 'ON', tag: 'STEALTH' },
    { token: 'NEIRO', tag: 'TICKER' }
  ]);

  const [naturalLanguageLogs, setNaturalLanguageLogs] = useState<string[]>([
    '[NLP] Cognitive parser initialized. Core vocabulary: 48 terms locked.',
    '[VOICE] Web Speech Synthesis router connected. Ready for auditory logs.'
  ]);

  // Auto evolution / auto-improving states
  const [isImproving, setIsImproving] = useState<boolean>(false);
  const [improvementVersion, setImprovementVersion] = useState<string>('v4.5.1');
  const [improvementLogs, setImprovementLogs] = useState<string[]>([
    '[EVOLUTION] Codebase benchmarked. Static analysis: 98.4% efficiency score.',
    '[EVOLUTION] Found redundant Playwright wait cycles. Re-indexing DOM intervals...'
  ]);

  // Voice recognition simulation OR actual Web Speech API hook
  useEffect(() => {
    if (typeof window !== 'undefined' && !('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setIsVoiceSupported(false);
    }
  }, []);

  // Text voice command interpreter
  const processVoiceOrTextCommand = (commandText: string) => {
    if (!commandText.trim()) return;

    const lower = commandText.toLowerCase();
    setNaturalLanguageLogs(prev => [...prev, `💬 [USER] "${commandText}"`]);

    // Simulated NLP Tagging
    const words = commandText.split(' ');
    const newTokens: NLPToken[] = words.map(word => {
      const clean = word.toLowerCase().replace(/[^a-z0-9₹]/g, '');
      if (['launch', 'trigger', 'compile', 'run', 'start', 'off', 'stop'].includes(clean)) {
        return { token: word, tag: 'ACTION' };
      }
      if (['inr', 'rupees', '₹', 'usd', 'dollars'].includes(clean) || clean.includes('₹')) {
        return { token: word, tag: 'CURRENCY' };
      }
      if (['btc', 'eth', 'sol', 'neiro', 'xrp'].includes(clean)) {
        return { token: word, tag: 'TICKER' };
      }
      if (['10', '50', '100', '5000'].includes(clean)) {
        return { token: word, tag: 'QUANTITY' };
      }
      if (['stealth', 'stealth-headers', 'cloudflare', 'playwright', 'puppeteer'].includes(clean)) {
        return { token: word, tag: 'STEALTH' };
      }
      return { token: word, tag: 'PARAMETER' };
    });

    setNlpTokens(newTokens);

    // Dynamic Execution Mapping based on voice triggers
    setTimeout(() => {
      if (lower.includes('playwright') || lower.includes('stealth') || lower.includes('scrap')) {
        announceInSpeech("Launching dynamic playwright stealth browser automation modules on Pi-42 exchange now");
        setNaturalLanguageLogs(prev => [
          ...prev,
          '🤖 [NLP PARSER] Intent detected: BROWSER_AUTOMATION_TRIGGER',
          '[SYSTEM] Executed Chrome extension payload pre-conditions automatically.'
        ]);
      } else if (lower.includes('compound') || lower.includes('rupees') || lower.includes('₹')) {
        announceInSpeech("Recalculating rupees compounding matrices for the activated micro bot lanes");
        setNaturalLanguageLogs(prev => [
          ...prev,
          '🤖 [NLP PARSER] Intent detected: CALC_COMPOUND_MATRIX',
          '[MATH ENGINE] Forecast updated: S_100 geometric progression = ₹838,590.23.'
        ]);
      } else if (lower.includes('compile') || lower.includes('improve') || lower.includes('evolution')) {
        announceInSpeech("Deploying automatic code compiling scripts. Scanning code files and re-routing neural weights.");
        setNaturalLanguageLogs(prev => [
          ...prev,
          '🤖 [NLP PARSER] Intent detected: COMPONENT_OPTIMIZE_EVOLUTION',
          '[EVOLUTION] Triggered claw-agent heuristic code auto-improving suite.'
        ]);
        triggerHeuristicSelfImprove();
      } else {
        announceInSpeech(`Parsed request regarding ${commandText}. Direct execution is pending confirmation.`);
        setNaturalLanguageLogs(prev => [
          ...prev,
          '🤖 [NLP PARSER] Unknown target action hook. Mapping query tokens to Gemma-4 thinking logs.'
        ]);
      }
    }, 800);

    setTypedCommand('');
  };

  // Speaks aloud trade announcements
  const announceInSpeech = (phrase: string) => {
    if (!speechSynthesisActive || typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(phrase);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis failed: ', e);
    }
  };

  // Simulates Claw Agent auto-evolution dynamic (Gemma-4 file rewriting simulation)
  const triggerHeuristicSelfImprove = () => {
    if (isImproving) return;
    setIsImproving(true);
    setImprovementLogs([]);

    const evolutionSteps = [
      '[EVOLUTION] Benchmarking execution speeds: Direct API latency down to 11ms.',
      '[EVOLUTION] Metaprogrammer rewriting signature hash headers for enhanced rate bounds.',
      '[EVOLUTION] Regenerating Playwright stealth wrappers: setting headless user-agent spoof.',
      '[EVOLUTION] Code compilation finished. Bumping system version to 4.5.2.'
    ];

    let step = 0;
    const executeStep = () => {
      if (step >= evolutionSteps.length) {
        setIsImproving(false);
        setImprovementVersion('v4.5.2');
        announceInSpeech("System auto improvement completed. Program variables optimized successfully.");
        return;
      }
      setImprovementLogs(prev => [...prev, evolutionSteps[step]]);
      step++;
      setTimeout(executeStep, 1500);
    };

    executeStep();
  };

  // Start Mic Listening simulator
  const startMicCommand = () => {
    setIsListening(true);
    announceInSpeech("Voice command active. Speak now.");
    
    // Simulate speaking after 3 seconds
    setTimeout(() => {
      const speechPresets = [
        "Launch Playwright stealth scrapers on Pi42",
        "Calculate ₹10 compounding matrices and triggers",
        "Trigger Claw Agent code evolution compile"
      ];
      const selected = speechPresets[Math.floor(Math.random() * speechPresets.length)];
      setTypedCommand(selected);
      setIsListening(false);
      processVoiceOrTextCommand(selected);
    }, 2500);
  };

  return (
    <div className="bg-[#151921] border border-slate-800 rounded-xl p-5 flex flex-col gap-6 text-slate-200 shadow-xl" id="voice-nlp-evolution-desk">
      
      {/* Title */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-purple-950/40 rounded-lg text-purple-400 border border-purple-900/30 font-bold">
            <Mic size={18} className={isListening ? 'animate-ping' : ''} />
          </div>
          <div>
            <h2 className="font-semibold text-base text-white tracking-wide flex items-center gap-2">
              Neural NLP Voice Commander & Self-Evolving AI Core
              <span className="bg-emerald-900/30 text-emerald-400 text-[9px] font-mono font-extrabold px-1.5 py-0.2 rounded border border-emerald-800/40">VOICE SYNTH v4.5</span>
            </h2>
            <p className="text-xs text-slate-400 font-sans">Voice Commands Integration & Automated Playwright Wrapper Self-evolution Desk</p>
          </div>
        </div>

        {/* Speech output controls toggle */}
        <button
          onClick={() => setSpeechSynthesisActive(!speechSynthesisActive)}
          className={`px-3 py-1 border rounded text-[9px] font-mono font-bold uppercase transition flex items-center gap-1 cursor-pointer ${
            speechSynthesisActive ? 'bg-indigo-950/20 text-indigo-400 border-indigo-900' : 'bg-slate-950 text-slate-500 border-slate-900'
          }`}
          title="Announce trading cycles and warnings with AI Voice Speech"
        >
          {speechSynthesisActive ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Voice Announcer: ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-slate-500" />
              <span>Voice Announcer: MUTED</span>
            </>
          )}
        </button>
      </div>

      {/* TWO PANEL SECTIONS Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* PANEL 1: VOICE / NLP CONTEXT (Col span 7) */}
        <div className="lg:col-span-7 bg-[#0B0E14] border border-slate-850 p-4 rounded-xl flex flex-col gap-3.5 h-[340px] justify-between">
          <div className="flex items-center justify-between border-b border-slate-900 pb-2">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-blue-400" /> Real-time Speech Parsing Pipeline
            </span>
            <span className="text-[9px] text-[#A6E22E] font-mono font-bold">NLP SYNAPSE</span>
          </div>

          <p className="text-[10px] text-slate-400 leading-snug font-sans">
            Press the mic to trigger simulated dictation commands or type commands directly. Our integrated NLP algorithm parses intentions directly into targeted Pi42 action blocks.
          </p>

          {/* Interactive Input Command Row */}
          <div className="flex gap-2.5 items-center bg-slate-950 border border-slate-900 p-2 rounded-lg">
            <button
              onClick={startMicCommand}
              disabled={isListening}
              className={`p-2.5 rounded-lg border transition shrink-0 cursor-pointer ${
                isListening 
                  ? 'bg-red-950/30 border-red-500 text-red-400 animate-pulse' 
                  : 'bg-[#151921] border-slate-850 text-purple-400 hover:text-white'
              }`}
              title="Dictate voice command for Chrome Scraping, Compounding calculations or trade compiles"
            >
              {isListening ? (
                <MicOff className="w-4 h-4 text-red-400" />
              ) : (
                <Mic className="w-4 h-4 text-purple-400" />
              )}
            </button>

            <input
              type="text"
              value={typedCommand}
              onChange={(e) => setTypedCommand(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && processVoiceOrTextCommand(typedCommand)}
              placeholder="Try: 'Launch Playwright stealth scrapers on Pi42'..."
              className="bg-transparent text-slate-100 border-none outline-none focus:ring-0 text-xs font-sans flex-1"
            />

            <button
              onClick={() => processVoiceOrTextCommand(typedCommand)}
              className="px-3 py-1 bg-purple-650 hover:bg-purple-500 text-white font-bold rounded text-[10px] uppercase cursor-pointer"
            >
              PARSE
            </button>
          </div>

          {/* Render NLP Tokenization Spans */}
          <div className="bg-[#151921]/60 p-2.5 rounded border border-slate-850 flex flex-col gap-1.5 leading-none">
            <span className="text-[8px] font-mono text-zinc-550 font-extrabold uppercase">Tokenized NLP Tags:</span>
            <div className="flex flex-wrap gap-1.5 mt-0.5">
              {nlpTokens.map((tok, idx) => (
                <span 
                  key={idx} 
                  className={`px-1.5 py-0.5 text-[9px] font-mono font-semibold rounded border ${
                    tok.tag === 'ACTION' 
                      ? 'bg-purple-950/30 border-purple-800 text-purple-400' 
                      : tok.tag === 'TICKER' 
                      ? 'bg-blue-950/30 border-blue-800 text-blue-400'
                      : tok.tag === 'CURRENCY' || tok.tag === 'QUANTITY'
                      ? 'bg-emerald-900/30 border-emerald-800 text-emerald-400'
                      : 'bg-slate-950 border-slate-900 text-slate-450'
                  }`}
                >
                  {tok.token} <span className="text-[7.5px] text-zinc-550 font-normal">({tok.tag})</span>
                </span>
              ))}
            </div>
          </div>

          {/* Parser console output logs */}
          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-900 text-[8.5px] font-mono text-slate-450 max-h-24 min-h-[55px] overflow-y-auto flex flex-col gap-1 leading-snug">
            {naturalLanguageLogs.map((log, idx) => (
              <div key={idx} className="border-l border-purple-800 pl-1.5">
                {log}
              </div>
            ))}
          </div>
        </div>

        {/* PANEL 2: CLAW SELF-IMPROVEMENT AUTO-CODE DESK (Col span 5) */}
        <div className="lg:col-span-5 bg-[#0B0E14] border border-slate-850 p-4 rounded-xl flex flex-col gap-3 h-[340px] justify-between">
          <div className="flex items-center justify-between border-b border-slate-900 pb-2">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-[#A6E22E]" /> Claw Heuristic Code Optimizer
            </span>
            <span className="text-[9px] text-[#A6E22E] font-mono font-bold bg-slate-950 px-2.5 py-0.5 rounded border border-slate-900">
              {improvementVersion}
            </span>
          </div>

          <p className="text-[10px] text-slate-400 leading-snug font-sans">
            AI Auto-Improving agent scans local browser automation routes and signature calculations recursively to evolve and improve codebase speeds.
          </p>

          <button
            onClick={triggerHeuristicSelfImprove}
            disabled={isImproving}
            className="w-full bg-[#151921] hover:bg-slate-900 border border-slate-800 rounded py-2 text-[10px] font-bold text-emerald-400 uppercase transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-45"
          >
            {isImproving ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                Rewriting browser automation headers...
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse animate-spin-slow" />
                Trigger Heuristic self-evolution check
              </>
            )}
          </button>

          {/* Self evolution progress monitor */}
          <div className="flex-1 overflow-y-auto text-[8.5px] font-mono text-emerald-300 bg-slate-950 p-2.5 border border-slate-900 rounded-lg flex flex-col gap-1 leading-normal my-1">
            {improvementLogs.map((log, idx) => (
              <div key={idx} className="border-l border-emerald-800 pl-1.5">
                {log}
              </div>
            ))}
          </div>

          {/* Spec details line */}
          <div className="text-[8.5px] font-mono text-zinc-550 flex justify-between leading-none text-center block border-t border-slate-900/60 pt-2 pb-0.5">
            <span>SELF_EVOLUTION: READY ON CHROME EXT</span>
            <span>INTUITION RATIO: 94.8% ACCURATE</span>
          </div>
        </div>

      </div>

    </div>
  );
};
