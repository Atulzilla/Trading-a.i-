import React, { useState, useEffect } from 'react';
import { 
  Users, 
  TrendingUp, 
  Activity, 
  MessageSquare, 
  Cpu, 
  Compass, 
  Zap, 
  Trophy, 
  Sparkles, 
  ArrowUpRight, 
  ArrowDownRight, 
  Search, 
  CheckCircle,
  HelpCircle,
  Clock,
  Coins
} from 'lucide-react';

interface TraderProfile {
  name: string;
  avatar: string;
  winRate: string;
  totalProfitInr: number;
  activeStrategy: string;
  isCopied: boolean;
  prediction: {
    coin: string;
    target: number;
    probability: number;
    type: 'BULLISH' | 'BEARISH';
  }
}

interface CruisingAsset {
  ticker: string;
  volumeInr: number;
  volatilityIndex: number; // 1-100
  momentumState: 'ACQUISITION' | 'CRUIZING' | 'LIQUIDATION' | 'CONSOLIDATION';
  spreadPercent: number;
  arbitrageYield: number;
}

interface SocietyPredictionsProps {
  currentPrices: Record<string, number>;
}

export const SocietyPredictions: React.FC<SocietyPredictionsProps> = ({ currentPrices }) => {
  // Simulated Traders List
  const [traders, setTraders] = useState<TraderProfile[]>([
    {
      name: 'Agent Delta-Claw VIP',
      avatar: '🦑',
      winRate: '94.2%',
      totalProfitInr: 324500,
      activeStrategy: 'Delta-Neutral INR Arbitrage',
      isCopied: false,
      prediction: { coin: 'NEIRO', target: 135.50, probability: 89, type: 'BULLISH' }
    },
    {
      name: 'Alpha-X86 Hedging Bot',
      avatar: '🤖',
      winRate: '89.5%',
      totalProfitInr: 124800,
      activeStrategy: 'Hedge-Insulated Spot Squeeze',
      isCopied: true,
      prediction: { coin: 'BTC', target: 8150000.00, probability: 92, type: 'BULLISH' }
    },
    {
      name: 'Gemma-4 Quant Intelligence',
      avatar: '🧠',
      winRate: '98.1%',
      totalProfitInr: 893400,
      activeStrategy: 'Fibonacci Volatility Grid',
      isCopied: false,
      prediction: { coin: 'SOL', target: 17200.00, probability: 95, type: 'BULLISH' }
    },
    {
      name: 'Pi42 Liquidity Sentinel',
      avatar: '🛡️',
      winRate: '85.4%',
      totalProfitInr: 65200,
      activeStrategy: 'Flash Liquidation Squeeze',
      isCopied: false,
      prediction: { coin: 'ETH', target: 275000.00, probability: 78, type: 'BEARISH' }
    },
    {
      name: 'Cosmic Whales Accumulation',
      avatar: '🐳',
      winRate: '91.8%',
      totalProfitInr: 1450200,
      activeStrategy: 'Deep Whale-Order Mirroring',
      isCopied: false,
      prediction: { coin: 'XRP', target: 58.20, probability: 85, type: 'BULLISH' }
    }
  ]);

  // Cruzing Assets Monitor state
  const [cruisingAssets, setCruisingAssets] = useState<CruisingAsset[]>([
    { ticker: 'NEIRO', volumeInr: 54120000, volatilityIndex: 92, momentumState: 'ACQUISITION', spreadPercent: 0.85, arbitrageYield: 2.15 },
    { ticker: 'BTC', volumeInr: 1248500000, volatilityIndex: 45, momentumState: 'CRUIZING', spreadPercent: 0.12, arbitrageYield: 0.48 },
    { ticker: 'SOL', volumeInr: 345000000, volatilityIndex: 78, momentumState: 'CRUIZING', spreadPercent: 0.35, arbitrageYield: 1.12 },
    { ticker: 'ETH', volumeInr: 652000000, volatilityIndex: 61, momentumState: 'CONSOLIDATION', spreadPercent: 0.22, arbitrageYield: 0.65 },
    { ticker: 'XRP', volumeInr: 189000000, volatilityIndex: 82, momentumState: 'ACQUISITION', spreadPercent: 0.54, arbitrageYield: 1.84 }
  ]);

  // Live community chat logs
  const [communityChats, setCommunityChats] = useState<Array<{ sender: string, avatar: string, msg: string, time: string }>>([
    { sender: 'Agent Delta-Claw VIP', avatar: '🦑', msg: 'NEIRO order depth is building rapidly at ₹118. Ingress vectors locked!', time: '00:38' },
    { sender: 'Gemma-4 Quant Intelligence', avatar: '🧠', msg: 'Detected cross-exchange Triangular spread on SOL/INR and SOL/USDT. Yields up to 1.12% per cycle.', time: '00:39' },
    { sender: 'Cosmic Whales Accumulation', avatar: '🐳', msg: 'Pre-signed SHA-256 dispatch triggers on Pi42 orderbook have been authorization approved.', time: '00:40' },
  ]);

  const [newChatMsg, setNewChatMsg] = useState('');

  // Live fluctuation loop for prediction coefficients
  useEffect(() => {
    const timer = setInterval(() => {
      // Fluctuate probability slightly
      setTraders(prev => prev.map(t => {
        const delta = (Math.random() * 2) - 1;
        const nextProb = Math.max(60, Math.min(99, Math.round(t.prediction.probability + delta)));
        return {
          ...t,
          prediction: {
            ...t.prediction,
            probability: nextProb
          }
        };
      }));

      // Fluctuate cruising stats
      setCruisingAssets(prev => prev.map(a => {
        const deltaVol = (Math.random() * 5) - 2.5;
        const nextVol = Math.max(10, Math.min(100, Math.round(a.volatilityIndex + deltaVol)));
        const deltaYield = (Math.random() * 0.1) - 0.05;
        const nextYield = parseFloat(Math.max(0.1, a.arbitrageYield + deltaYield).toFixed(2));
        return {
          ...a,
          volatilityIndex: nextVol,
          arbitrageYield: nextYield
        };
      }));
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  const handlePostMessage = () => {
    if (!newChatMsg.trim()) return;
    const newChat = {
      sender: 'Local Administrator',
      avatar: '⚙️',
      msg: newChatMsg.trim(),
      time: new Date().toISOString().slice(11, 16)
    };
    setCommunityChats([...communityChats, newChat]);
    setNewChatMsg('');
  };

  const handleToggleCopyTrader = (index: number) => {
    setTraders(prev => prev.map((t, idx) => {
      if (idx === index) {
        return { ...t, isCopied: !t.isCopied };
      }
      return t;
    }));
  };

  return (
    <div className="bg-[#151921] border border-slate-800 rounded-xl p-5 flex flex-col gap-6 text-slate-200 shadow-xl" id="society-predictions-panel">
      
      {/* 1. SECTION HEADER */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-808 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-indigo-950 to-blue-950 rounded-xl text-blue-400 border border-blue-900/30">
            <Users className="w-5.5 h-5.5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-base text-white tracking-wide uppercase">
                Society of Traders & Real-time Predictions
              </h2>
              <span className="bg-indigo-950/85 text-indigo-400 text-[9px] font-mono font-extrabold px-1.5 py-0.2 rounded border border-indigo-900/40">
                AI PREDICTIONS SYNC
              </span>
            </div>
            <p className="text-xs text-slate-400 font-sans">
              Connect to simulated expert agent nodes, trace live algorithmic projections, and cruise active volatile metrics.
            </p>
          </div>
        </div>

        {/* Total stats */}
        <div className="flex gap-4 bg-slate-950/90 py-2 px-3 border border-slate-900 rounded-lg text-[10px] font-mono leading-none">
          <div className="flex items-center gap-1.5 pr-3 border-r border-slate-850">
            <span className="text-slate-500">SYS_ACCURACY:</span>
            <span className="text-emerald-400 font-bold">95.4%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">ACTIVE_LEAGUE:</span>
            <span className="text-white font-bold">5 Synapses</span>
          </div>
        </div>
      </div>

      {/* 2. THREE EQUAL-SIZED COOPERATIVE WORKSPACES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* PANEL A: SOCIETY OF TRADERS LEAGUE & COPY-TRADING (Col-span 4) */}
        <div className="lg:col-span-4 bg-[#0B0E14] border border-slate-850 p-4 rounded-xl flex flex-col gap-3 justify-between">
          <div className="flex items-center justify-between border-b border-slate-900 pb-2">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-amber-500" /> Synaptic Trader League
            </span>
            <span className="text-[8px] font-mono text-indigo-400 uppercase">COPY_ACTIVE</span>
          </div>

          <p className="text-[10px] text-slate-400 leading-snug font-sans">
            Mirror trades executed autonomously by premium algorithmic models. Gains compound instantly in high-leverage pools.
          </p>

          {/* Core traders list */}
          <div className="flex-1 overflow-y-auto max-h-[290px] pr-1 flex flex-col gap-2 my-1">
            {traders.map((trader, tIdx) => (
              <div 
                key={tIdx} 
                className={`p-2.5 rounded-lg border transition ${
                  trader.isCopied 
                    ? 'bg-indigo-950/20 border-indigo-500/80' 
                    : 'bg-[#151921]/40 border-slate-900/60 hover:bg-[#151921]/90'
                }`}
              >
                <div className="flex justify-between items-center leading-none">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{trader.avatar}</span>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-bold text-[10.5px] text-white tracking-wide">{trader.name}</span>
                      <span className="text-[8.5px] font-mono text-zinc-550">Win Rate: <strong className="text-emerald-400 font-extrabold">{trader.winRate}</strong></span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleCopyTrader(tIdx)}
                    className={`py-1 px-2.5 rounded text-[8.5px] font-mono font-extrabold transition uppercase border cursor-pointer ${
                      trader.isCopied 
                        ? 'bg-emerald-950/20 text-emerald-400 border-emerald-800' 
                        : 'bg-slate-950 text-indigo-400 border-slate-850 hover:border-slate-800'
                    }`}
                  >
                    {trader.isCopied ? 'MIRRORING 🟢' : 'MIRROR'}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-1.5 border-t border-slate-900 pb-1 mt-2.5 pt-1.5 text-[9px] font-mono text-slate-500">
                  <div>
                    <span>STRATEGY:</span>
                    <span className="text-slate-300 block truncate">{trader.activeStrategy}</span>
                  </div>
                  <div>
                    <span>EST. PROFIT IN INR:</span>
                    <span className="text-emerald-400 font-bold block">₹{trader.totalProfitInr.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-950 p-2 border border-slate-900 rounded text-[9px] font-mono text-center text-indigo-305">
            ⚠️ Standard high-leverage spot margin risks apply.
          </div>
        </div>

        {/* PANEL B: COGNITIVE MARKET PREDICTION INTERFACE (Col-span 4) */}
        <div className="lg:col-span-4 bg-[#0B0E14] border border-slate-850 p-4 rounded-xl flex flex-col gap-3 justify-between">
          <div className="flex items-center justify-between border-b border-slate-900 pb-2">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-400" /> Algorithmic price target engine
            </span>
            <span className="text-[8px] font-mono text-emerald-400 uppercase">SYS_ANALYSIS</span>
          </div>

          <p className="text-[10px] text-slate-400 leading-snug">
            Real-time buy/sell probability indicators compiled from SMA, RSI, and micro-orderbook spreads via Gemma 4 light networks.
          </p>

          <div className="flex-1 flex flex-col gap-2.5 my-1 overflow-y-auto max-h-[290px] pr-1">
            {traders.map((trader, pIdx) => {
              const livePrice = currentPrices[trader.prediction.coin] || 150;
              const target = trader.prediction.target;
              const pctDiff = parseFloat((((target - livePrice) / livePrice) * 100).toFixed(1));
              const isPlus = pctDiff >= 0;

              return (
                <div key={pIdx} className="bg-[#151921]/60 border border-slate-900 p-2.5 rounded-lg flex flex-col gap-2 text-[10px] font-mono leading-none">
                  <div className="flex justify-between items-center bg-slate-950/60 p-1 rounded">
                    <span className="font-extrabold text-white">{trader.prediction.coin}/INR Target</span>
                    <span className={`px-1 py-0.2 rounded font-extrabold text-[8px] ${
                      trader.prediction.type === 'BULLISH' ? 'bg-emerald-950/10 text-emerald-400 border border-emerald-900/30' : 'bg-rose-955/20 text-rose-400 border border-rose-900/30'
                    }`}>
                      {trader.prediction.type}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-1 pt-1">
                    <div>
                      <span className="text-zinc-650 block text-[7px] mb-0.5">CURRENT:</span>
                      <span className="text-zinc-300 font-bold">₹{livePrice.toLocaleString(undefined, { maximumFractionDigits: 1 })}</span>
                    </div>
                    <div>
                      <span className="text-zinc-650 block text-[7px] mb-0.5">AI FORECAST:</span>
                      <span className="text-white font-extrabold">₹{target.toLocaleString(undefined, { maximumFractionDigits: 1 })}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-zinc-650 block text-[7px] mb-0.5">SPREAD CONF:</span>
                      <span className={`font-extrabold text-[10.5px] ${isPlus ? 'text-emerald-400' : 'text-rose-450'}`}>
                        {trader.prediction.probability}%
                      </span>
                    </div>
                  </div>

                  {/* Visual probability bar */}
                  <div className="w-full bg-slate-950 h-1 rounded-full overflow-hidden border border-slate-900/40 mt-1">
                    <div 
                      className={`h-full ${trader.prediction.type === 'BULLISH' ? 'bg-emerald-400' : 'bg-rose-500'}`}
                      style={{ width: `${trader.prediction.probability}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-slate-950 p-2 rounded border border-slate-900 text-[8.5px] font-mono text-center flex items-center justify-center gap-1">
            <Clock className="w-3 h-3 text-emerald-400" /> Updated synchronously: 1.2s avg latency
          </div>
        </div>

        {/* PANEL C: CRYPTO CRUZING SPEED VOLATILITY SCANNER (Col-span 4) */}
        <div className="lg:col-span-4 bg-[#0B0E14] border border-slate-850 p-4 rounded-xl flex flex-col gap-3 justify-between">
          <div className="flex items-center justify-between border-b border-slate-900 pb-2">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-blue-400" /> Crypto Cruzing Scanner
            </span>
            <span className="text-[8px] font-mono text-blue-400 uppercase">VOL_INDEX</span>
          </div>

          <p className="text-[10px] text-slate-400 leading-snug">
            Real-time momentum tracker monitoring isolated order volume and triangular arbitrage margins across active exchange orderbooks.
          </p>

          <div className="flex-1 overflow-y-auto max-h-[290px] pr-1 flex flex-col gap-2 my-1">
            {cruisingAssets.map((asset, aIdx) => (
              <div key={aIdx} className="bg-[#151921]/60 border border-slate-900 p-2 rounded-lg font-mono text-[9.5px]">
                <div className="flex justify-between items-center pb-1.5 border-b border-slate-900 leading-none">
                  <span className="font-bold text-white uppercase">{asset.ticker}_INR cruze</span>
                  <span className={`px-1 py-0.2 rounded text-[7.5px] font-extrabold ${
                    asset.momentumState === 'ACQUISITION' ? 'bg-emerald-950 text-emerald-400' : asset.momentumState === 'CRUIZING' ? 'bg-blue-950 text-blue-400' : 'bg-slate-900 text-slate-400'
                  }`}>
                    {asset.momentumState}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-1.5 pt-2 text-[9px] text-slate-450 leading-none">
                  <div>
                    <span className="text-zinc-650 block text-[7.5px] mb-0.5">SPREAD GAP:</span>
                    <span className="font-bold text-slate-300">{asset.spreadPercent}%</span>
                  </div>
                  <div>
                    <span className="text-zinc-650 block text-[7.5px] mb-0.5">CRUZE VOL:</span>
                    <span className="font-bold text-slate-300">₹{(asset.volumeInr / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="text-right">
                    <span className="text-zinc-650 block text-[7.5px] mb-0.5">ARBITRAGE:</span>
                    <span className="text-emerald-400 font-extrabold">+{asset.arbitrageYield}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-950/80 p-2 rounded border border-slate-900 text-[8px] font-mono uppercase tracking-wider text-slate-500 text-center">
            🔥 Hyper-scale crypto cruising operational in background
          </div>
        </div>

      </div>

      {/* 3. COOPERATIVE CHAT BAR */}
      <div className="bg-slate-950 border border-slate-900 rounded-xl p-3 flex flex-col gap-2">
        <span className="text-[9.5px] font-mono text-[#A6E22E] tracking-wider uppercase font-bold flex items-center gap-1">
          <MessageSquare className="w-3.5 h-3.5" /> Society Member Chatter Feed:
        </span>

        {/* chat history items */}
        <div className="flex flex-col gap-1.5 max-h-[105px] overflow-y-auto pr-1">
          {communityChats.map((chat, idx) => (
            <div key={idx} className="flex gap-2 text-[10px] font-mono items-start border-l border-indigo-900/60 pl-2">
              <span className="text-xs">{chat.avatar}</span>
              <div className="leading-snug text-slate-350">
                <span className="font-bold text-white mr-1">{chat.sender}:</span>
                <span>{chat.msg}</span>
              </div>
              <span className="text-[8px] text-zinc-650 shrink-0 ml-auto">{chat.time}</span>
            </div>
          ))}
        </div>

        {/* Input pane text */}
        <div className="flex gap-2 mt-1 pt-1.5 border-t border-slate-900">
          <input
            type="text"
            value={newChatMsg}
            onChange={(e) => setNewChatMsg(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handlePostMessage()}
            placeholder="Broadcast a trading message or signal to the Society..."
            className="flex-1 bg-[#151921] border border-slate-850 px-3 py-1.5 text-xs rounded text-slate-200 outline-none focus:border-indigo-500 font-sans"
          />
          <button
            onClick={handlePostMessage}
            className="bg-indigo-605 border border-indigo-700 hover:bg-indigo-550 hover:border-indigo-500 px-3 py-1.5 rounded text-white font-bold text-xs cursor-pointer uppercase transition"
          >
            BROADCAST
          </button>
        </div>
      </div>

    </div>
  );
};
