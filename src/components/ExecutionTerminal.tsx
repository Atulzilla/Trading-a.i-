import React, { useState, useEffect } from 'react';
import { ShieldCheck, TrendingUp, TrendingDown, DollarSign, PlusCircle, Trash2, ArrowUpRight, ArrowDownRight, FolderOpen, History, Info, Play } from 'lucide-react';
import { AgentResponse, TradePosition, TradeHistoryEntry } from '../types';

interface ExecutionTerminalProps {
  agentRecommendation: AgentResponse | null;
  currentTickerPrices: Record<string, number>;
  onPositionChange: (positions: TradePosition[]) => void;
  onBalanceChange: (balance: number) => void;
  walletBalance: number;
  activePositions: TradePosition[];
}

export const ExecutionTerminal: React.FC<ExecutionTerminalProps> = ({
  agentRecommendation,
  currentTickerPrices,
  onPositionChange,
  onBalanceChange,
  walletBalance,
  activePositions
}) => {
  const [activeSegment, setActiveSegment] = useState<'terminal' | 'history'>('terminal');

  // Input States for Trading terminal
  const [ticker, setTicker] = useState('NEIRO');
  const [side, setSide] = useState<'LONG' | 'SHORT'>('LONG');
  const [margin, setMargin] = useState<number>(500);
  const [leverage, setLeverage] = useState<number>(10);
  const [takeProfit, setTakeProfit] = useState<number>(1.65);
  const [stopLoss, setStopLoss] = useState<number>(1.25);

  const [tradeLogs, setTradeLogs] = useState<TradeHistoryEntry[]>([
    {
      id: 'tx-82194',
      ticker: 'BTC',
      side: 'LONG',
      entryPrice: 91200,
      exitPrice: 92450,
      margin: 1000,
      leverage: 10,
      realizedPnL: 137,
      outcome: 'PROFIT',
      timestamp: '14:21:40'
    },
    {
      id: 'tx-28190',
      ticker: 'SOL',
      side: 'SHORT',
      entryPrice: 194.2,
      exitPrice: 191.1,
      margin: 600,
      leverage: 20,
      realizedPnL: 191.5,
      outcome: 'PROFIT',
      timestamp: '14:32:15'
    }
  ]);

  const [tradeStatusMsg, setTradeStatusMsg] = useState<string | null>(null);

  // Autofill parameters from Gemini Intelligence recommendations
  const handleAutofill = () => {
    if (!agentRecommendation) return;
    const rec = agentRecommendation;
    setTicker(rec.quantAnalysis.signal === 'SELL_SHORT' ? rec.quantAnalysis.signal && 'NEIRO' : 'NEIRO'); // default or parse
    // Find matching ticker or stick to active ticker
    // Make sure we parse standard recommended parameters
    setSide(rec.decision === 'SELL_SHORT' ? 'SHORT' : 'LONG');
    
    // Compute suggested margin based on suggested capital budget percentage (maxPositionPercent) of budget
    const computedMargin = Math.round((walletBalance * (rec.riskEvaluation.maxPositionPercent / 100)));
    setMargin(computedMargin > 0 ? computedMargin : 200);
    
    setLeverage(rec.riskEvaluation.suggestedLeverage || 5);
    setTakeProfit(rec.riskEvaluation.takeProfit || 1.6);
    setStopLoss(rec.riskEvaluation.stopLoss || 1.25);
    
    // Match ticker if matching rec ticker parsed
    const matchedTicker = /BTC|ETH|SOL|NEIRO|XRP/i.exec(rec.orchestratorSummary || '');
    if (matchedTicker) {
      setTicker(matchedTicker[0].toUpperCase());
    }
    setTradeStatusMsg("Autofilled parameters from AI sub-agents recommendation!");
    setTimeout(() => setTradeStatusMsg(null), 3500);
  };

  // Sync default entry inputs as prices tick
  useEffect(() => {
    // Only auto-update TP/SL if we haven't manually adjusted them to customized values
    const livePrice = currentTickerPrices[ticker] || 10.0;
    // Simple heuristic to set target SL and TP averages if current is stale
    if (takeProfit === 1.65 || takeProfit === 0) {
      setTakeProfit(parseFloat((livePrice * (side === 'LONG' ? 1.15 : 0.85)).toFixed(2)));
    }
    if (stopLoss === 1.25 || stopLoss === 0) {
      setStopLoss(parseFloat((livePrice * (side === 'LONG' ? 0.93 : 1.07)).toFixed(2)));
    }
  }, [ticker, side, currentTickerPrices]);

  // Execute terminal position
  const handleOpenPosition = () => {
    if (margin > walletBalance) {
      setTradeStatusMsg("Error: Insufficient margin available in INR account balance.");
      setTimeout(() => setTradeStatusMsg(null), 4000);
      return;
    }
    if (margin <= 0) {
      setTradeStatusMsg("Error: Margin value must be greater than zero.");
      setTimeout(() => setTradeStatusMsg(null), 4000);
      return;
    }

    const currentPrice = currentTickerPrices[ticker] || 1.0;
    const sizeInTokens = parseFloat(((margin * leverage) / currentPrice).toFixed(4));

    const newPosition: TradePosition = {
      id: `pos-${Math.floor(Math.random() * 90000) + 10000}`,
      ticker,
      side,
      entryPrice: currentPrice,
      currentPrice,
      leverage,
      margin,
      size: sizeInTokens,
      stopLoss,
      takeProfit,
      timestamp: new Date().toLocaleTimeString()
    };

    const nextPositions = [newPosition, ...activePositions];
    onPositionChange(nextPositions);
    onBalanceChange(walletBalance - margin);

    setTradeStatusMsg(`Direct Exchange API Executed: Opened ${side} position on ${ticker} with ${leverage}x leverage.`);
    setTimeout(() => setTradeStatusMsg(null), 4000);
  };

  // Terminate dynamic margin position
  const handleClosePosition = (posId: string) => {
    const target = activePositions.find(p => p.id === posId);
    if (!target) return;

    // Calculate closed Realized PnL
    const diff = target.currentPrice - target.entryPrice;
    let profitShare = diff * target.size;
    if (target.side === 'SHORT') {
      profitShare = -profitShare;
    }

    const nextPositions = activePositions.filter(p => p.id !== posId);
    onPositionChange(nextPositions);
    onBalanceChange(walletBalance + target.margin + profitShare);

    const closedLog: TradeHistoryEntry = {
      id: `tx-${Math.floor(Math.random() * 90000) + 10000}`,
      ticker: target.ticker,
      side: target.side,
      entryPrice: target.entryPrice,
      exitPrice: parseFloat(target.currentPrice.toFixed(4)),
      margin: target.margin,
      leverage: target.leverage,
      realizedPnL: parseFloat(profitShare.toFixed(2)),
      outcome: profitShare >= 0 ? 'PROFIT' : 'LOSS',
      timestamp: new Date().toLocaleTimeString()
    };

    setTradeLogs(prev => [closedLog, ...prev]);
    setTradeStatusMsg(`Position Closed. Realized PnL: ${profitShare >= 0 ? '+' : ''}₹${profitShare.toFixed(2)} INR`);
    setTimeout(() => setTradeStatusMsg(null), 4000);
  };

  // Liquidation check logic simulator loop
  useEffect(() => {
    activePositions.forEach(pos => {
      const diff = pos.currentPrice - pos.entryPrice;
      let rawProfit = diff * pos.size;
      if (pos.side === 'SHORT') {
        rawProfit = -rawProfit;
      }
      
      const pnlPct = (rawProfit / pos.margin) * 100;
      // Close automatically as liquidation if exceeds -95% of margin collateral
      if (pnlPct <= -95) {
        const nextPositions = activePositions.filter(p => p.id !== pos.id);
        onPositionChange(nextPositions);

        const closedLog: TradeHistoryEntry = {
          id: `tx-liq-${Math.floor(Math.random() * 9000) + 1000}`,
          ticker: pos.ticker,
          side: pos.side,
          entryPrice: pos.entryPrice,
          exitPrice: parseFloat(pos.currentPrice.toFixed(4)),
          margin: pos.margin,
          leverage: pos.leverage,
          realizedPnL: -pos.margin,
          outcome: 'LIQUIDATED',
          timestamp: new Date().toLocaleTimeString()
        };

        setTradeLogs(prev => [closedLog, ...prev]);
        setTradeStatusMsg(`🚨 SHIELD ALERT: Position ${pos.ticker} was Margin Liquidated at -₹${pos.margin} due to falling below safe margin limits!`);
        setTimeout(() => setTradeStatusMsg(null), 6000);
      }
    });
  }, [activePositions, currentTickerPrices]);

  return (
    <div className="bg-[#151921] border border-slate-800/80 rounded-xl p-5 flex flex-col gap-4 text-slate-200 shadow-xl" id="execution-layer-terminal">
      {/* Title Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-950/60 rounded-lg text-emerald-400">
            <ShieldCheck size={18} />
          </div>
          <div>
            <h2 className="font-semibold text-base text-white tracking-wide font-sans">Execution Layer</h2>
            <p className="text-xs text-slate-500 font-sans">Signed Direct Exchange API Terminal</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-[#0B0E14] px-2.5 py-1 rounded text-xs font-mono border border-slate-800 ml-auto font-bold text-white">
          <span className="text-emerald-400 text-xs font-semibold">₹</span>
          <span className="text-slate-500 text-[10px] mr-1">BALANCE:</span>
          <span className="text-white font-bold">₹{walletBalance.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</span>
          <span className="text-emerald-500 text-[10px] ml-0.5 font-bold">INR</span>
        </div>
      </div>

      {/* Segment Navigation */}
      <div className="flex border-b border-slate-800 text-xs font-medium text-slate-400 font-sans">
        <button
          onClick={() => setActiveSegment('terminal')}
          className={`pb-2 px-3 focus:outline-none transition-all cursor-pointer ${activeSegment === 'terminal' ? 'text-blue-400 border-b-2 border-blue-500 font-semibold' : 'hover:text-slate-200'}`}
          id="segment-terminal"
        >
          Direct Trading Desk
        </button>
        <button
          onClick={() => setActiveSegment('history')}
          className={`pb-2 px-3 focus:outline-none transition-all cursor-pointer ${activeSegment === 'history' ? 'text-blue-400 border-b-2 border-blue-500 font-semibold' : 'hover:text-slate-200'}`}
          id="segment-history"
        >
          Direct execution logs ({tradeLogs.length})
        </button>
      </div>

      {/* STATUS BROADCAST MSG */}
      {tradeStatusMsg && (
        <div className="bg-blue-950/30 border border-blue-900/50 rounded-lg p-2.5 text-xs text-blue-300 font-sans tracking-wide leading-relaxed animate-pulse">
          {tradeStatusMsg}
        </div>
      )}

      {/* Terminal View */}
      {activeSegment === 'terminal' && (
        <div className="flex flex-col gap-4" id="view-trading-desk">
          
          {/* Autofill recommendation banner */}
          {agentRecommendation && (
            <div className="bg-blue-950/20 hover:bg-blue-950/30 border border-blue-950/40 p-2.5 rounded-lg flex items-center justify-between transition gap-2 font-sans">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-550"></span>
                </span>
                <span className="text-[11px] text-slate-300">Ready: Direct-trading recommendation received!</span>
              </div>
              <button
                onClick={handleAutofill}
                className="py-1 px-2.5 bg-blue-600 hover:bg-blue-500 transition text-[10px] font-extrabold text-white rounded flex items-center gap-1.5 cursor-pointer font-sans shadow"
              >
                <PlusCircle className="w-2.5 h-2.5" /> AUTOFILL PARAMETERS
              </button>
            </div>
          )}

          {/* Core Buy / Sell Position Config */}
          <div className="grid grid-cols-2 gap-3">
            
            {/* Left Inputs parameters */}
            <div className="flex flex-col gap-2.5 bg-[#0B0E14] p-3 rounded-lg border border-slate-800">
              <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-wider">Trading Specs</span>
              
              {/* Asset Select */}
              <div className="flex flex-col gap-1 mt-1 font-sans">
                <label className="text-[10px] text-slate-500 font-mono">Select Ticker Asset</label>
                <select
                  value={ticker}
                  onChange={(e) => {
                    setTicker(e.target.value);
                    setTakeProfit(0); // force recalc
                    setStopLoss(0);
                  }}
                  className="bg-[#151921]/90 text-slate-200 border border-slate-850 rounded p-1.5 py-1 text-xs font-mono focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="NEIRO">NEIRO (₹{currentTickerPrices['NEIRO']?.toFixed(2)})</option>
                  <option value="BTC">BTC (₹{currentTickerPrices['BTC']?.toLocaleString()})</option>
                  <option value="ETH">ETH (₹{currentTickerPrices['ETH']?.toLocaleString()})</option>
                  <option value="SOL">SOL (₹{currentTickerPrices['SOL']?.toFixed(1)})</option>
                  <option value="XRP">XRP (₹{currentTickerPrices['XRP']?.toFixed(2)})</option>
                </select>
              </div>

              {/* Side Trigger Tabs */}
              <div className="flex flex-col gap-1 mt-1 font-sans">
                <label className="text-[10px] text-slate-500 font-mono">Position Bias</label>
                <div className="grid grid-cols-2 gap-1 bg-[#151921]/60 rounded p-0.5 border border-slate-850/60">
                  <button
                    onClick={() => {
                      setSide('LONG');
                      setTakeProfit(0);
                      setStopLoss(0);
                    }}
                    className={`py-1 rounded text-[11px] font-bold tracking-wider transition cursor-pointer ${side === 'LONG' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    LONG / BUY
                  </button>
                  <button
                    onClick={() => {
                      setSide('SHORT');
                      setTakeProfit(0);
                      setStopLoss(0);
                    }}
                    className={`py-1 rounded text-[11px] font-bold tracking-wider transition cursor-pointer ${side === 'SHORT' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    SHORT / SELL
                  </button>
                </div>
              </div>

              {/* Collateral Allocation Slider */}
              <div className="flex flex-col gap-1 mt-1 font-sans">
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>Margin Budget</span>
                  <span className="text-white font-bold">₹{margin} INR</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max={Math.max(50, Math.floor(walletBalance))}
                  step="50"
                  value={margin}
                  onChange={(e) => setMargin(parseInt(e.target.value))}
                  className="w-full h-1 bg-[#151921] rounded-lg cursor-pointer accent-blue-500"
                />
              </div>
            </div>

            {/* Right Limits Parameters */}
            <div className="flex flex-col gap-2.5 bg-[#0B0E14] p-3 rounded-lg border border-slate-800">
              <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-wider">Leverage & Bounds</span>

              {/* Leverage Slider */}
              <div className="flex flex-col gap-0.5 mt-1 font-sans">
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>Leverage Rate</span>
                  <span className={`font-bold ${leverage > 25 ? 'text-amber-400 animate-pulse' : 'text-emerald-400'}`}>{leverage}x</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="75"
                  step="1"
                  value={leverage}
                  onChange={(e) => setLeverage(parseInt(e.target.value))}
                  className="w-full h-1 bg-[#151921] rounded-lg cursor-pointer accent-blue-500"
                />
                <span className="text-[9px] text-slate-500 font-sans tracking-tight">Isolated Margin limit: 75x max</span>
              </div>

              {/* Take Profit Target inputs */}
              <div className="flex flex-col gap-1 mt-1 font-sans">
                <label className="text-[10px] text-slate-500 font-mono">Take Profit Point (INR)</label>
                <input
                  type="number"
                  step="0.1"
                  value={takeProfit}
                  onChange={(e) => setTakeProfit(parseFloat(e.target.value))}
                  className="bg-[#151921]/90 text-slate-200 border border-slate-800 rounded p-1.5 py-1 text-xs font-mono focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Stop Loss Protect inputs */}
              <div className="flex flex-col gap-1 mt-1 font-sans">
                <label className="text-[10px] text-slate-500 font-mono">Stop Loss Protection (INR)</label>
                <input
                  type="number"
                  step="0.1"
                  value={stopLoss}
                  onChange={(e) => setStopLoss(parseFloat(e.target.value))}
                  className="bg-[#151921]/90 text-slate-200 border border-slate-800 rounded p-1.5 py-1 text-xs font-mono focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

          </div>

          {/* Bottom Execution Launcher Button */}
          <button
            onClick={handleOpenPosition}
            className={`w-full py-2.5 font-bold tracking-wider rounded-xl transition text-xs shadow-md border flex items-center justify-center gap-2 cursor-pointer font-sans select-none ${
              side === 'LONG' 
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500 active:scale-98'
                : 'bg-rose-600 hover:bg-rose-500 text-white border-rose-500 active:scale-98'
            }`}
            id="order-execute-btn"
          >
            <Play className="w-3.5 h-3.5 rotate-90 shrink-0" />
            EXECUTE DIRECT EXCHANGE {side} ORDER payload
          </button>

          {/* Active Isolated Margin Positions tracker */}
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
              <FolderOpen size={13} />
              <span>ACTIVE POSITION BLOCKS ({activePositions.length})</span>
            </div>

            {activePositions.length === 0 ? (
              <div className="border border-slate-800 bg-[#0B0E14]/40 p-6 rounded-xl text-center text-xs text-slate-500 font-sans">
                <Info size={18} className="mx-auto mb-2 text-slate-650" />
                No isolated margin contract positions open. Use the Trading Desk fields above to lock in trades.
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {activePositions.map((p) => {
                  const diff = p.currentPrice - p.entryPrice;
                  let rawPnl = diff * p.size;
                  if (p.side === 'SHORT') rawPnl = -rawPnl;
                  const pnlPct = (rawPnl / p.margin) * 100;
                  const isProfit = rawPnl >= 0;

                  return (
                    <div key={p.id} className="bg-[#0B0E14] border border-slate-800 rounded-xl p-3 flex flex-col gap-2 transition hover:border-slate-700/80">
                      
                      {/* Metric Line headers */}
                      <div className="flex items-center justify-between border-b border-slate-900 pb-1.5 font-sans">
                        <div className="flex items-center gap-2">
                          <span className={`${p.side === 'LONG' ? 'text-emerald-400' : 'text-rose-400'} font-bold font-mono text-xs`}>
                            {p.side === 'LONG' ? 'LONG ↗' : 'SHORT ↘'}
                          </span>
                          <span className="font-extrabold text-white text-xs">{p.ticker}</span>
                          <span className="bg-[#151921] text-slate-500 font-mono text-[9px] px-1.5 rounded border border-slate-800">
                            {p.leverage}x leverage
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-550">{p.timestamp}</span>
                      </div>

                      {/* Values Grid */}
                      <div className="grid grid-cols-4 gap-1.5 text-[11px] font-mono pr-1.5">
                        <div>
                          <span className="text-slate-550 block text-[9px] uppercase font-sans font-semibold tracking-wide">Entry Price</span>
                          <span className="text-slate-200 font-semibold">₹{p.entryPrice.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-slate-205 block text-[9px] uppercase font-sans font-semibold tracking-wide">Mark Price</span>
                          <span className="text-slate-200 font-semibold animate-pulse">₹{p.currentPrice.toFixed(p.ticker === 'NEIRO' ? 2 : 1)}</span>
                        </div>
                        <div>
                          <span className="text-slate-550 block text-[9px] uppercase font-sans font-semibold tracking-wide">Margin Collateral</span>
                          <span className="text-slate-200 font-semibold">₹{p.margin} INR</span>
                        </div>
                        <div>
                          <span className="text-slate-550 block text-[9px] uppercase font-sans font-semibold tracking-wide">Unrealized PnL</span>
                          <span className={`font-extrabold flex items-center ${isProfit ? 'text-emerald-400' : 'text-rose-450'}`}>
                            {isProfit ? <ArrowUpRight className="w-3 h-3 text-emerald-400 mr-0.5 shrink-0" /> : <ArrowDownRight className="w-3 h-3 text-rose-400 mr-0.5 shrink-0" />}
                            {isProfit ? '+' : ''}₹{rawPnl.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1})} ({pnlPct.toFixed(1)}%)
                          </span>
                        </div>
                      </div>

                      {/* Stops list and control elements */}
                      <div className="flex justify-between items-center bg-[#151921]/60 p-2 rounded border border-slate-800 mt-1">
                        <div className="flex gap-4 text-[10px] font-mono text-slate-400">
                          <div>
                            <span className="font-sans font-semibold tracking-wide text-xs">PROTECT SL:</span> <span className="text-rose-455 font-bold">₹{p.stopLoss}</span>
                          </div>
                          <div>
                            <span className="font-sans font-semibold tracking-wide text-xs">TARGET TP:</span> <span className="text-emerald-400 font-bold">₹{p.takeProfit}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleClosePosition(p.id)}
                          className="px-2 py-1 hover:bg-rose-950/40 text-rose-450 border border-rose-900/40 hover:border-rose-700/60 text-[10px] rounded font-bold transition flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 size={11} className="shrink-0" /> CLOSE POSITION
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      )}

      {/* Direct execution logs ledger list */}
      {activeSegment === 'history' && (
        <div className="flex flex-col gap-3 min-h-[400px]" id="view-execution-logs">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
            <History size={13} />
            <span>SIGNED API METRICS LEDGER BUFFER</span>
          </div>

          <div className="flex flex-col gap-2 overflow-y-auto max-h-[400px] pr-1">
            {tradeLogs.map((tx, idx) => {
              const isProfit = tx.outcome === 'PROFIT';
              const isLiq = tx.outcome === 'LIQUIDATED';

              return (
                <div key={tx.id || idx} className="bg-[#0B0E14]/85 border border-[#1e293b]/50 p-2.5 rounded-xl flex items-center justify-between text-xs transition">
                  <div className="flex flex-col gap-1 pr-1">
                    <div className="flex items-center gap-2">
                       <span className={`px-1.5 py-0.2 rounded font-mono font-bold text-[9px] ${tx.side === 'LONG' ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-450'}`}>
                        {tx.side}
                      </span>
                      <span className="font-extrabold text-white">{tx.ticker}</span>
                      <span className="text-slate-550 font-mono text-[9px]">{tx.timestamp}</span>
                    </div>
                    <div className="flex gap-2.5 text-[10px] font-mono text-slate-550">
                      <span>In: ₹{tx.entryPrice.toLocaleString()}</span>
                      <span>Out: ₹{tx.exitPrice.toLocaleString()}</span>
                      <span>Margin: ₹{tx.margin} INR</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end shrink-0 pl-1.5 border-l border-slate-900 font-mono text-right min-w-[90px]">
                    <span className={`text-[11px] font-extrabold ${isProfit ? 'text-emerald-400' : 'text-rose-450'}`}>
                      {isProfit ? '+' : ''}₹{tx.realizedPnL.toLocaleString()} PnL
                    </span>
                    <span className={`text-[9px] font-semibold tracking-wider font-sans mt-0.5 ${
                      isProfit ? 'text-emerald-500 bg-emerald-950/40 px-1 rounded' :
                      isLiq ? 'text-rose-450 bg-rose-950/80 px-1 rounded border border-rose-900/60 animate-pulse' :
                      'text-rose-500 bg-rose-950/40 px-1 rounded'
                    }`}>
                      {tx.outcome}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
