export interface OrchestrationParams {
  ticker: string;
  newsContent: string;
  rsi: number;
  macd: string; // "Bullish Crossover", "Bearish Crossover", "Neutral"
  riskProfile: 'Conservative' | 'Moderate' | 'Aggressive';
  maxLeverage: number;
}

export interface AgentDebateMessage {
  agent: 'Master Orchestrator' | 'Quantitative Analyst' | 'Fundamental Analyst' | 'Risk Manager';
  message: string;
  phase: 'ingest' | 'quant' | 'sentiment' | 'risk_check' | 'consensus';
}

export interface AgentResponse {
  orchestratorSummary: string;
  quantAnalysis: {
    trend: 'BULLISH' | 'BEARISH' | 'RANGEBOUND';
    support: number;
    resistance: number;
    indicatorReading: string;
    signal: 'BUY_LONG' | 'SELL_SHORT' | 'HOLD';
  };
  fundamentalAnalysis: {
    sentimentScore: number; // 0 (Extremely Bearish) to 100 (Extremely Bullish)
    sentimentLabel: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
    keyCatalyst: string;
    alternativeDataNotes: string;
  };
  riskEvaluation: {
    suggestedLeverage: number;
    maxPositionPercent: number; // e.g. 5 for 5%
    stopLoss: number;
    takeProfit: number;
    riskWarning: string;
  };
  decision: 'BUY_LONG' | 'SELL_SHORT' | 'HOLD';
  confidenceScore: number; // 0 to 100
  agentDebate: AgentDebateMessage[];
}

export interface TradePosition {
  id: string;
  ticker: string;
  side: 'LONG' | 'SHORT';
  entryPrice: number;
  currentPrice: number;
  leverage: number;
  margin: number; // in USDT
  size: number; // margin * leverage in token asset units
  stopLoss: number;
  takeProfit: number;
  timestamp: string;
}

export interface TradeHistoryEntry {
  id: string;
  ticker: string;
  side: 'LONG' | 'SHORT';
  entryPrice: number;
  exitPrice: number;
  margin: number;
  leverage: number;
  realizedPnL: number;
  outcome: 'PROFIT' | 'LOSS' | 'LIQUIDATED';
  timestamp: string;
}

export interface NewsItem {
  id: string;
  source: string;
  time: string;
  title: string;
  sentiment: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  scrapedVia: 'Playwright Browser' | 'Local Crawler Claw' | 'Exchange Feed';
}
