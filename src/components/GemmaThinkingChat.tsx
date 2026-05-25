import React, { useState, useRef, useEffect } from 'react';
import { Brain, Send, Flame, Sparkles, AlertCircle, HelpCircle, RefreshCw, Cpu, Layers, DollarSign, ArrowRight } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

export const GemmaThinkingChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      role: 'model',
      content: `<thinking>
Initializing Gemma 4 1B Deep Thinking model...
Context loaded: 
- Local budget matrix active (INR/Rupees support)
- Strategy: ₹10 / Bot Compounding+ (geometric progression scalp)
- Live API links: pi42.com & direct exchange terminal
- Browser automation hook: Headless Playwright controller

Let's welcome the user, present the ₹10 Pro compounding formula, and invite analytical queries about automated wealth creation.
</thinking>

Greetings! I am the **Gemma 4 Advanced Thinking Intelligence (1B/4B Optimization)**. 

I am fully synchronized with your active multi-coin trading terminal to help you build **future wealth** through automated compound matrices. Ask me any technical questions, request automated Playwright code blocks, or debug your **Pi42.com API signature payload**.

**🚀 Pro Strategy Ready**: Underneath, you can deploy the **₹10 Bot Compounding+ Strategy** to recursively multiply capital at extremely high velocity. Let’s start analyzing!`,
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentThinking, setCurrentThinking] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string>('Gemma 4 Light 1B');
  const [automationEnabled, setAutomationEnabled] = useState<boolean>(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested questions to trigger quick trades
  const SUGGESTIONS = [
    { text: "Calculate ₹10 compound over 50 cycles at 8% profit", query: "Explain the math and calculate how ₹10 compounds over 50 trading cycles at an average of 8% profit per trade. Show calculations in Rupees (₹)." },
    { text: "Pi42 API sign signature headers", query: "Can you provide the Node.js/Python code to sign API signature headers for pi42.com trading pairs to execute direct exchange buy/long calls?" },
    { text: "Write Playwright browser automation trace", query: "Show me a Playwright browser automation script template to monitor trading charts and execute scalp triggers automatically when RSI is oversold." }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `m-usr-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const chatHistory = [...messages, userMsg].map(m => ({
        role: m.role,
        content: m.content
      }));

      const response = await fetch('/api/gemma/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: chatHistory,
          variant: selectedVariant,
          automationEnabled
        })
      });

      if (!response.ok) {
        throw new Error(`Gemma engine offline: HTTP ${response.status}`);
      }

      const resJson = await response.json();
      
      const modelMsg: ChatMessage = {
        id: `m-gem-${Date.now()}`,
        role: 'model',
        content: resJson.text || "No response received.",
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, modelMsg]);
    } catch (err: any) {
      console.error(err);
      const errMsg: ChatMessage = {
        id: `m-err-${Date.now()}`,
        role: 'model',
        content: `⚠️ **Gemma Intelligence Pipeline Interrupted**: ${err.message || "Failed to establish secure proxy handshakes. Please check your config panels."}`,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Safe parser to extract and render <thinking> blocks beautifully
  const parseMessage = (content: string) => {
    const thinkingRegex = /<thinking>([\s\S]*?)<\/thinking>/gi;
    const match = thinkingRegex.exec(content);

    if (match) {
      const thinkingContent = match[1].trim();
      const cleanText = content.replace(thinkingRegex, '').trim();
      return {
        thinking: thinkingContent,
        text: cleanText
      };
    }

    return {
      thinking: null,
      text: content
    };
  };

  return (
    <div className="bg-[#151921] border border-slate-800 rounded-xl p-5 flex flex-col gap-4 text-slate-200 shadow-xl overflow-hidden h-auto lg:h-[610px]" id="gemma-thinking-panel">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-950/60 rounded-lg text-purple-400 border border-purple-900/30">
            <Brain size={18} className="animate-pulse" />
          </div>
          <div>
            <h2 className="font-semibold text-base text-white tracking-wide font-sans flex items-center gap-2">
              Gemma 4 Core Intelligence <span className="bg-purple-900/30 text-purple-400 text-[10px] font-mono font-bold px-1.5 py-0.2 rounded border border-purple-800/40">1B/4B THINKING</span>
            </h2>
            <p className="text-xs text-slate-500 font-sans">Specialized Algorithmic & Compounding Strategy Advisor</p>
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-[9px] bg-slate-950/80 px-2 py-0.5 rounded text-amber-500 border border-slate-900">
          <Sparkles className="w-2.5 h-2.5 text-amber-500 animate-spin-slow" />
          <span>INR REASONER v4.2</span>
        </div>
      </div>

      {/* Model Option buttons and Automation switch */}
      <div className="bg-slate-950/70 rounded-xl p-2.5 border border-slate-900 flex flex-wrap gap-2.5 items-center justify-between">
        <div className="flex bg-[#11141B] rounded-lg p-0.5 border border-slate-900/60 font-mono text-[9px] gap-0.5">
          <button
            onClick={() => setSelectedVariant('Gemma 4 Light 1B')}
            className={`px-2 py-1 rounded font-bold transition cursor-pointer select-none ${
              selectedVariant === 'Gemma 4 Light 1B'
                ? 'bg-purple-950/60 text-purple-400 font-extrabold border border-purple-900/30'
                : 'text-slate-505 hover:text-slate-300'
            }`}
          >
            ⚡ LIGHT 1B (FAST)
          </button>
          <button
            onClick={() => setSelectedVariant('Gemma 4 Advanced 4B')}
            className={`px-2 py-1 rounded font-bold transition cursor-pointer select-none ${
              selectedVariant === 'Gemma 4 Advanced 4B'
                ? 'bg-purple-950/60 text-purple-400 font-extrabold border border-purple-900/30'
                : 'text-slate-505 hover:text-slate-300'
            }`}
          >
            🧠 ADVANCED 4B
          </button>
          <button
            onClick={() => setSelectedVariant('Gemma 4 Automation Specialist')}
            className={`px-2 py-1 rounded font-bold transition cursor-pointer select-none ${
              selectedVariant === 'Gemma 4 Automation Specialist'
                ? 'bg-purple-950/60 text-purple-400 font-extrabold border border-purple-900/30'
                : 'text-slate-505 hover:text-slate-300'
            }`}
          >
            🤖 AUTO ENGINE
          </button>
        </div>

        <div className="flex items-center gap-2 font-mono text-[9px]">
          <span className="text-slate-450 hidden sm:inline flex items-center gap-1">
            <span className={`w-1.5 h-1.5 rounded-full ${automationEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'} inline-block`}></span>
            {automationEnabled ? 'TELEMETRY RECEPTOR ON' : 'OFFLINE'}
          </span>
          <button
            onClick={() => setAutomationEnabled(p => !p)}
            className={`px-2 py-1 text-[8px] font-bold rounded uppercase transition cursor-pointer ${
              automationEnabled
                ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-900/40'
                : 'bg-zinc-900 text-slate-500 border border-slate-850'
            }`}
          >
            {automationEnabled ? 'ACTIVE IN AUTOMATION (24/7)' : 'ENABLE AUTO'}
          </button>
        </div>
      </div>

      {/* Messages Log Layout */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-3.5 pr-1.5 max-h-[360px]" id="gemma-scroller-box">
        {messages.map((m) => {
          const { thinking, text } = parseMessage(m.content);
          const isUser = m.role === 'user';

          return (
            <div key={m.id} className={`flex flex-col gap-1 max-w-[90%] ${isUser ? 'self-end bg-blue-900/10 border border-blue-900/40 text-slate-200 p-3 rounded-2xl rounded-tr-none' : 'self-start bg-[#0F1219]/70 border border-slate-800 text-slate-350 p-3 rounded-2xl rounded-tl-none'}`}>
              
              <div className="flex items-center gap-1.5 text-[9px] font-mono text-slate-500 mb-0.5">
                <span className="font-bold text-slate-400">{isUser ? 'YOU / TRADER' : 'GEMMA 4 COGNITIVE ENGINE'}</span>
                <span>•</span>
                <span>{m.timestamp}</span>
              </div>

              {/* RENDER SYSTEM THINKING ENGINE ACCORDION */}
              {thinking && (
                <div className="mb-2 bg-slate-950/90 rounded-lg border border-purple-950/60 overflow-hidden font-mono text-[10px]">
                  <div className="flex items-center justify-between px-2.5 py-1 bg-purple-950/20 border-b border-purple-950/50 text-purple-405 font-bold">
                    <span className="flex items-center gap-1">
                      <Cpu className="w-3 h-3 text-purple-400 animate-spin-slow animate-pulse" />
                      GEMMA REASONING TRACE
                    </span>
                    <span className="text-[8px] tracking-widest text-slate-500">COGNITION_ONLINE</span>
                  </div>
                  <div className="p-2 text-purple-300 bg-black/45 max-h-36 overflow-y-auto leading-relaxed border-l-2 border-purple-500">
                    {thinking.split('\n').map((line, i) => (
                      <div key={i} className="py-0.5">{line}</div>
                    ))}
                  </div>
                </div>
              )}

              {/* RENDER HUMAN OUTPUT */}
              <div className="text-xs font-sans leading-relaxed text-slate-250 whitespace-pre-wrap">
                {text}
              </div>

            </div>
          );
        })}
        {isLoading && (
          <div className="flex items-center gap-2 self-start bg-[#0B0E14] border border-slate-800 p-3 rounded-2xl rounded-tl-none text-xs text-slate-450 font-sans">
            <RefreshCw className="animate-spin w-3.5 h-3.5 text-purple-400" />
            <span>Gemma 4 is processing compounding chains and assembling deep-thinking traces...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Strategy Prompts status banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1.5">
        {SUGGESTIONS.map((s, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(s.query)}
            disabled={isLoading}
            className="text-left text-[10px] bg-slate-950 hover:bg-slate-900 border border-slate-850 p-1.5 rounded transition font-sans text-slate-400 truncate cursor-pointer hover:text-white"
          >
            🔥 {s.text}
          </button>
        ))}
      </div>

      {/* Chat Input Interface */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend(inputMessage)}
          placeholder="Ask Gemma about Pi42 APIs, ₹10 compound math, or trade setups..."
          disabled={isLoading}
          className="bg-[#0B0E14] text-slate-200 border border-slate-800 rounded-xl px-3 py-2 text-xs font-sans flex-1 focus:border-purple-500 focus:outline-none"
        />
        <button
          onClick={() => handleSend(inputMessage)}
          disabled={isLoading}
          className="p-2 bg-purple-600 hover:bg-purple-500 font-bold tracking-wider rounded-xl transition text-xs shadow-md border border-purple-500 active:scale-98 flex items-center justify-center text-white cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
