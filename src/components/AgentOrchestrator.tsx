import React, { useState } from 'react';
import { Cpu, Users, Star, TrendingUp, TrendingDown, RefreshCw, BarChart2, ShieldCheck, MessageSquare, AlertCircle } from 'lucide-react';
import { AgentResponse, AgentDebateMessage } from '../types';

interface AgentOrchestratorProps {
  agentData: AgentResponse | null;
  isOrchestrating: boolean;
  error: string | null;
}

export const AgentOrchestrator: React.FC<AgentOrchestratorProps> = ({ agentData, isOrchestrating, error }) => {
  const [activeTab, setActiveTab] = useState<'roundtable' | 'quant' | 'sentiment' | 'risk'>('roundtable');

  const getAgentColor = (agent: string) => {
    switch (agent) {
      case 'Master Orchestrator': return 'text-indigo-400 border-indigo-900 bg-indigo-950/20';
      case 'Quantitative Analyst': return 'text-emerald-400 border-emerald-900 bg-emerald-950/20';
      case 'Fundamental Analyst': return 'text-sky-400 border-sky-900 bg-sky-950/20';
      case 'Risk Manager': return 'text-amber-400 border-amber-900 bg-amber-950/20';
      default: return 'text-slate-400 border-slate-900 bg-slate-950/20';
    }
  };

  const getAgentNickname = (agent: string) => {
    switch (agent) {
      case 'Master Orchestrator': return 'M.O. MASTER';
      case 'Quantitative Analyst': return 'Q.A. QUANT';
      case 'Fundamental Analyst': return 'F.A. SENTIMENT';
      case 'Risk Manager': return 'R.M. SAFETY';
      default: return 'AGENT';
    }
  };

  return (
    <div className="bg-[#151921] border border-slate-800 rounded-xl p-5 flex flex-col gap-4 text-slate-200 shadow-xl" id="agent-orchestrator-panel">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-950/40 rounded-lg text-blue-400 border border-blue-900/30">
            <Users size={18} />
          </div>
          <div>
            <h2 className="font-semibold text-base text-white tracking-wide">Intelligence Layer</h2>
            <p className="text-xs text-slate-400">Orchestrator & Sub-Agent Consensus</p>
          </div>
        </div>
        <div>
          {agentData?.isMock && (
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-950/80 text-amber-400 border border-amber-900/60" id="sandbox-indicator">
              SIMULATOR RUNNING
            </span>
          )}
        </div>
      </div>

      {/* Loading State */}
      {isOrchestrating && (
        <div className="flex flex-col items-center justify-center py-16 gap-4" id="orchestrator-loader">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-4 border-blue-900/60 border-t-blue-500 animate-spin flex items-center justify-center"></div>
            <Cpu className="w-5 h-5 text-blue-400 absolute top-3.5 left-3.5 animate-pulse" />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-white">Aggregating Sub-Agent Perspectives...</p>
            <p className="text-xs text-slate-405 mt-1 max-w-[280px]">Calling server-side Gemini 3.5 models to simulate debate and formulate optimal margin execution...</p>
          </div>
          {/* Mock progress timeline */}
          <div className="w-full max-w-xs mt-2 flex flex-col gap-1 text-[11px] font-mono text-slate-500 bg-[#0B0E14] p-3 rounded-lg border border-slate-800">
            <div className="flex items-center gap-1.5 text-blue-400"><span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" /> Scrapers & Web crawlers compiled...</div>
            <div className="flex items-center gap-1.5 text-slate-400"><RefreshCw className="w-3 h-3 animate-spin" /> Technical indicators mapping...</div>
            <div className="flex items-center gap-1.5 text-slate-400"><RefreshCw className="w-3 h-3 animate-spin" /> Framing Risk Kelly bounds...</div>
          </div>
        </div>
      )}

      {/* Idle Prompt State */}
      {!isOrchestrating && !agentData && !error && (
        <div className="flex flex-col items-center justify-center py-16 text-center text-slate-400 gap-3 border border-dashed border-slate-800 rounded-xl bg-[#0B0E14]/30" id="orchestrator-idle">
          <Cpu className="w-10 h-10 text-slate-600 animate-pulse" />
          <div>
            <p className="text-sm font-semibold text-slate-300">Awaiting Data Ingress</p>
            <p className="text-xs text-slate-500 max-w-xs mt-1 leading-relaxed">
              Configure parameters on the left and click <b>Ingest & Run Agent Consensus</b>. 
              The agents will evaluate live data and draft recommendations.
            </p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !isOrchestrating && (
        <div className="border border-red-900/50 bg-red-950/20 rounded-xl p-4 flex gap-3 text-red-300 text-xs" id="orchestrator-error">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
          <div>
            <span className="font-semibold block text-red-200">Consensus Engine Interrupted</span>
            <p className="mt-1 leading-relaxed text-slate-400">{error}</p>
          </div>
        </div>
      )}

      {/* Complete Data Visualizers */}
      {agentData && !isOrchestrating && (
        <div className="flex flex-col gap-4 animate-fade-in" id="consensus-content">
          
          {/* Quick Metrics Header */}
          <div className="grid grid-cols-3 gap-2.5 bg-[#0B0E14] p-3 rounded-xl border border-slate-800">
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Decision</span>
              <span className={`text-xs font-bold font-mono py-0.5 px-2 rounded mt-1 ${
                agentData.decision === 'BUY_LONG' 
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-900/60'
                  : agentData.decision === 'SELL_SHORT'
                  ? 'bg-rose-950 text-rose-400 border border-rose-900/60'
                  : 'bg-slate-800 text-slate-300 border border-slate-700'
              }`}>
                {agentData.decision}
              </span>
            </div>
            
            <div className="flex flex-col items-center justify-center text-center border-x border-slate-800/60">
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Confidence</span>
              <span className="text-sm font-extrabold font-mono text-blue-400 mt-1">
                {agentData.confidenceScore}%
              </span>
            </div>

            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Safe Leverage</span>
              <span className="text-sm font-extrabold font-mono text-amber-400 mt-1">
                {agentData.riskEvaluation.suggestedLeverage}x
              </span>
            </div>
          </div>

          {/* Sub-Agent Tab Grid Navigation */}
          <div className="flex border-b border-slate-800 text-xs text-slate-400 font-medium">
            <button
              onClick={() => setActiveTab('roundtable')}
              className={`pb-2 px-3 focus:outline-none transition-all cursor-pointer ${activeTab === 'roundtable' ? 'text-blue-400 border-b-2 border-blue-500 font-semibold' : 'hover:text-slate-200'}`}
              id="tab-roundtable"
            >
              Debate Roundtable
            </button>
            <button
              onClick={() => setActiveTab('quant')}
              className={`pb-2 px-3 focus:outline-none transition-all cursor-pointer ${activeTab === 'quant' ? 'text-emerald-400 border-b-2 border-emerald-500 font-semibold' : 'hover:text-slate-200'}`}
              id="tab-quant"
            >
              Technical Quant
            </button>
            <button
              onClick={() => setActiveTab('sentiment')}
              className={`pb-2 px-3 focus:outline-none transition-all cursor-pointer ${activeTab === 'sentiment' ? 'text-sky-400 border-b-2 border-sky-500 font-semibold' : 'hover:text-slate-200'}`}
              id="tab-sentiment"
            >
              Sentiment / Catalyst
            </button>
            <button
              onClick={() => setActiveTab('risk')}
              className={`pb-2 px-3 focus:outline-none transition-all cursor-pointer ${activeTab === 'risk' ? 'text-amber-400 border-b-2 border-amber-500 font-semibold' : 'hover:text-slate-200'}`}
              id="tab-risk"
            >
              Risk Evaluation
            </button>
          </div>

          {/* Tab 1: Debate Roundtable */}
          {activeTab === 'roundtable' && (
            <div className="flex flex-col gap-3 min-h-[300px]" id="pane-roundtable">
              {/* Orchestrator Master Summary */}
              <div className="bg-[#0B0E14] border border-blue-950/40 rounded-xl p-3.5 text-xs text-slate-350 leading-relaxed border-l-4 border-l-blue-500">
                <span className="font-semibold text-slate-200 text-[10px] tracking-widest uppercase flex items-center gap-1.5 pb-1 text-blue-400">
                  <Star className="w-3.5 h-3.5 fill-blue-400 text-blue-400" />
                  Master Consolidated Strategy
                </span>
                <p className="font-sans leading-relaxed text-slate-300 mt-1">{agentData.orchestratorSummary}</p>
              </div>

              {/* Debate Feed Transcript */}
              <div className="flex flex-col gap-2.5 max-h-[300px] overflow-y-auto pr-1">
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest pl-1">ROUNDTABLE CHAT BUFFER (UTC)</div>
                {agentData.agentDebate && agentData.agentDebate.map((msg, idx) => (
                  <div key={idx} className="bg-slate-950/70 border border-slate-850 rounded-xl p-3 flex flex-col gap-1 transition">
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className={`px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[9px] ${getAgentColor(msg.agent)}`}>
                        {getAgentNickname(msg.agent)}
                      </span>
                      <span className="text-slate-500 text-[9px] uppercase font-semibold">{msg.phase.replace('_', ' ')}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans mt-1">"{msg.message}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Technical Quant */}
          {activeTab === 'quant' && (
            <div className="bg-[#0B0E14] border border-emerald-950/60 p-4 rounded-xl flex flex-col gap-3 min-h-[300px]" id="pane-quant">
              <div className="flex items-center gap-2 border-b border-slate-900 pb-2">
                <BarChart2 className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Quantitative Analyst Metrics</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-1">
                <div className="bg-[#151921]/65 border border-slate-800 rounded-lg p-2.5">
                  <span className="text-[10px] font-mono text-slate-500 font-semibold uppercase tracking-wider">Underlying Trend</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    {agentData.quantAnalysis.trend === 'BULLISH' ? (
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                    ) : agentData.quantAnalysis.trend === 'BEARISH' ? (
                      <TrendingDown className="w-4 h-4 text-rose-400" />
                    ) : (
                      <RefreshCw className="w-3.5 h-3.5 text-slate-400 animate-spin" />
                    )}
                    <span className={`text-xs font-bold ${
                      agentData.quantAnalysis.trend === 'BULLISH' ? 'text-emerald-400' :
                      agentData.quantAnalysis.trend === 'BEARISH' ? 'text-rose-400' :
                      'text-slate-300'
                    }`}>{agentData.quantAnalysis.trend}</span>
                  </div>
                </div>

                <div className="bg-[#151921]/65 border border-slate-800 rounded-lg p-2.5">
                  <span className="text-[10px] font-mono text-slate-500 font-semibold uppercase tracking-wider">Calculated Signal</span>
                  <span className="text-xs block font-bold text-white mt-1 font-mono">
                    {agentData.quantAnalysis.signal}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 bg-[#151921]/65 border border-slate-800 rounded-lg p-3 mt-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold">Identified Liquidity Levels</span>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="border-l-2 border-emerald-500 pl-2">
                    <span className="text-slate-500 text-[10px] block">Support / Buy-Wall</span>
                    <span className="text-emerald-400 font-bold">${agentData.quantAnalysis.support}</span>
                  </div>
                  <div className="border-l-2 border-rose-500 pl-2">
                    <span className="text-slate-500 text-[10px] block">Resistance / Supply-Wall</span>
                    <span className="text-rose-400 font-bold">${agentData.quantAnalysis.resistance}</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#151921]/65 border border-slate-800 p-3 rounded-lg text-xs leading-relaxed text-slate-350">
                <span className="text-[10px] font-mono text-slate-500 block mb-1">Indicators Interpretation</span>
                <p className="font-sans text-slate-300 leading-relaxed">{agentData.quantAnalysis.indicatorReading}</p>
              </div>
            </div>
          )}

          {/* Tab 3: Sentiment & Fundamental Analyst */}
          {activeTab === 'sentiment' && (
            <div className="bg-[#0B0E14] border border-sky-955/40 p-4 rounded-xl flex flex-col gap-3 min-h-[300px]" id="pane-sentiment">
              <div className="flex items-center gap-2 border-b border-slate-900 pb-2">
                <Cpu className="w-4 h-4 text-sky-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Fundamental Sentiment Analysis</h3>
              </div>

              {/* Sentiment Score Gauge */}
              <div className="bg-[#151921]/65 border border-slate-800 rounded-lg p-3.5 flex items-center justify-between mt-1">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-slate-500 font-semibold uppercase tracking-wider">Narrative Score Coefficient</span>
                  <span className={`text-xl font-extrabold font-mono mt-1 ${
                    agentData.fundamentalAnalysis.sentimentScore > 65 ? 'text-emerald-400' :
                    agentData.fundamentalAnalysis.sentimentScore < 35 ? 'text-rose-400' : 'text-slate-300'
                  }`}>
                    {agentData.fundamentalAnalysis.sentimentScore} / 100
                  </span>
                </div>
                <span className={`px-2.5 py-1 rounded text-xs font-bold border ${
                  agentData.fundamentalAnalysis.sentimentLabel === 'BULLISH' ? 'bg-emerald-950 text-emerald-400 border-emerald-900/60' :
                  agentData.fundamentalAnalysis.sentimentLabel === 'BEARISH' ? 'bg-rose-955 text-rose-400 border-rose-900/60' :
                  'bg-slate-900 text-slate-300 border-slate-800'
                }`}>
                  {agentData.fundamentalAnalysis.sentimentLabel}
                </span>
              </div>

              {/* Catalyst Box */}
              <div className="bg-[#151921]/65 border border-slate-800 p-3 rounded-lg text-xs leading-relaxed text-slate-350">
                <span className="text-[10px] font-mono text-sky-400 font-semibold block mb-1">Identified Macro Catalyst</span>
                <p className="font-sans leading-relaxed text-slate-300">"{agentData.fundamentalAnalysis.keyCatalyst}"</p>
              </div>

              {/* Social Crowd Sentiment */}
              <div className="bg-[#151921]/65 border border-slate-800 p-3 rounded-lg text-xs leading-relaxed text-slate-350">
                <span className="text-[10px] font-mono text-slate-500 block mb-1">Crowd & Alternative Data Notes</span>
                <p className="font-sans leading-relaxed text-slate-300">{agentData.fundamentalAnalysis.alternativeDataNotes}</p>
              </div>
            </div>
          )}

          {/* Tab 4: Risk Evaluator */}
          {activeTab === 'risk' && (
            <div className="bg-[#0B0E14] border border-amber-955/60 p-4 rounded-xl flex flex-col gap-3 min-h-[300px]" id="pane-risk">
              <div className="flex items-center gap-2 border-b border-slate-900 pb-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Risk Manager Limits</h3>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-1">
                <div className="bg-[#151921]/65 border border-slate-800 rounded-lg p-2.5 pr-1">
                  <span className="text-[10px] font-mono text-slate-500 block font-semibold uppercase tracking-wider">Suggested Leverage Cap</span>
                  <span className="text-sm font-bold font-mono text-amber-400">{agentData.riskEvaluation.suggestedLeverage}x</span>
                  <span className="text-[9px] text-slate-500 block mt-0.5 font-sans">Isolated Margin Lock</span>
                </div>

                <div className="bg-[#151921]/65 border border-slate-800 rounded-lg p-2.5 pr-1">
                  <span className="text-[10px] font-mono text-slate-500 block font-semibold uppercase tracking-wider">Max Capital Trigger %</span>
                  <span className="text-sm font-bold font-mono text-white">{agentData.riskEvaluation.maxPositionPercent}%</span>
                  <span className="text-[9px] text-slate-500 block mt-0.5 font-sans">Under risk budgeting caps</span>
                </div>
              </div>

              {/* Recommended SL / TP limits */}
              <div className="flex flex-col gap-2.5 bg-[#151921]/65 border border-slate-800 rounded-lg p-3 mt-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold">Survival Bounds (TP / SL Points)</span>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="border-l-2 border-emerald-500 pl-2">
                    <span className="text-slate-500 text-[10px] block font-sans">Take Profit Target</span>
                    <span className="text-emerald-400 font-bold">${agentData.riskEvaluation.takeProfit}</span>
                  </div>
                  <div className="border-l-2 border-rose-500 pl-2">
                    <span className="text-slate-500 text-[10px] block font-sans">Stop Loss Floor</span>
                    <span className="text-rose-400 font-bold">${agentData.riskEvaluation.stopLoss}</span>
                  </div>
                </div>
              </div>

              {/* Safe warnings */}
              {agentData.riskEvaluation.riskWarning && (
                <div className="bg-amber-950/20 border border-amber-900/50 p-3 rounded-lg text-xs leading-relaxed text-amber-305 mt-1 flex gap-2">
                  <MessageSquare className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-amber-200 text-[10px] uppercase font-mono">Risk Advisory</span>
                    <p className="mt-0.5 leading-relaxed text-slate-300 font-sans">{agentData.riskEvaluation.riskWarning}</p>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      )}
    </div>
  );
};
