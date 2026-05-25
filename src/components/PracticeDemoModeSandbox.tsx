import React, { useState, useEffect, useRef } from 'react';
import { 
  Cpu, 
  Brain, 
  Terminal, 
  Sparkles, 
  RefreshCw, 
  TrendingUp, 
  ShieldCheck, 
  Chrome, 
  Lock, 
  Play, 
  Compass, 
  Database,
  CheckCircle,
  MessageSquare,
  Send,
  HelpCircle,
  Clock,
  Coins,
  ArrowRight,
  Shield,
  Smartphone,
  Check,
  AlertTriangle,
  Flame,
  XCircle,
  ChevronRight,
  TrendingDown,
  Layers,
  Fingerprint
} from 'lucide-react';

interface SimulatedBot {
  coin: string;
  allocationInr: number;
  entryPriceInr: number;
  currentPriceInr: number;
  compoundingCycles: number;
  cumulativeYieldPercent: number;
  state: 'OFFLINE' | 'ACTIVE_COMPOUNDING' | 'SECURED_100_PROFIT' | 'ANALYZING_DOM';
}

interface ChatMessage {
  id: string;
  sender: string;
  avatar: string;
  message: string;
  timestamp: string;
  isUser: boolean;
  role: string;
}

interface DOMTargetElement {
  id: string;
  label: string;
  selector: string;
  xpath: string;
  isInteractive: boolean;
  actionCodeDescription: string;
}

interface OrderBookItem {
  price: number;
  size: number;
  total: number;
}

interface RealPosition {
  id: string;
  pair: string;
  side: 'BUY' | 'SELL';
  entryPrice: number;
  marketPrice: number;
  size: number;
  leverage: number;
  pnlInr: number;
}

export const PracticeDemoModeSandbox: React.FC = () => {
  // ---- CONFIG MODE: DEMO VS REAL PERSISTENCE ----
  const [isRealMode, setIsRealMode] = useState<boolean>(true); // Default to Real Integration Sync Mode!
  const [savedCookies, setSavedCookies] = useState<string>(() => {
    return localStorage.getItem('pi42_session_cookies') || 'token=session_key_99x14bcde921; path=/; domain=pi42.com; secure=true';
  });
  const [credentialsSynced, setCredentialsSynced] = useState<boolean>(() => {
    return localStorage.getItem('pi42_credentials_synced') === 'true';
  });

  // ---- PERSISTENT LOGIN STORAGE ----
  const [pi42Email, setPi42Email] = useState<string>(() => {
    return localStorage.getItem('pi42_email') || 'atulvibe@gmail.com';
  });
  const [pi42Pwd, setPi42Pwd] = useState<string>('•••••••••••••');
  
  // ---- LIVE INTERACTIVE TRADING GRID STATE ----
  const [tradingPair, setTradingPair] = useState<string>('NEIRO/INR');
  const [tradeSide, setTradeSide] = useState<'BUY' | 'SELL'>('BUY');
  const [orderType, setOrderType] = useState<'LIMIT' | 'MARKET'>('LIMIT');
  const [limitPriceInput, setLimitPriceInput] = useState<number>(121.25);
  const [leverage, setLeverage] = useState<number>(20); // 20x default
  const [orderAmountINR, setOrderAmountINR] = useState<number>(1000); // Amount to trade in INR
  const [placedPositions, setPlacedPositions] = useState<RealPosition[]>([
    { id: 'pos-1', pair: 'NEIRO/INR', side: 'BUY', entryPrice: 121.25, marketPrice: 121.25, size: 82.47, leverage: 20, pnlInr: 154.50 },
    { id: 'pos-2', pair: 'SOL/INR', side: 'BUY', entryPrice: 15568.45, marketPrice: 15568.45, size: 0.64, leverage: 10, pnlInr: -45.20 }
  ]);

  // Simulated live prices for trading grid ticker
  const [liveTickerPrice, setLiveTickerPrice] = useState<number>(121.25);

  // ---- ORDER BOOK GENERATOR ----
  const [bids, setBids] = useState<OrderBookItem[]>([]);
  const [asks, setAsks] = useState<OrderBookItem[]>([]);

  // ---- DEMO MODE BALANCES & BOTS ----
  const [demoBalance, setDemoBalance] = useState<number>(50000); // Expanded virtual capital
  const [totalBotsProfit, setTotalBotsProfit] = useState<number>(0);
  const [compoundingRate, setCompoundingRate] = useState<number>(4.8);
  const [isAllBotsActive, setIsAllBotsActive] = useState<boolean>(true);
  
  // FULL COMPOUNDING 100% PER TRADE FLAG
  const [isFullCompoundingActive, setIsFullCompoundingActive] = useState<boolean>(true); // Armed by default!

  // MULTIPLE TILE BOTS (Allocations ₹10 each)
  const [bots, setBots] = useState<SimulatedBot[]>([
    { coin: 'NEIRO', allocationInr: 10, entryPriceInr: 121.25, currentPriceInr: 121.25, compoundingCycles: 18, cumulativeYieldPercent: 86.4, state: 'ACTIVE_COMPOUNDING' },
    { coin: 'SOL', allocationInr: 10, entryPriceInr: 15568.45, currentPriceInr: 15568.45, compoundingCycles: 35, cumulativeYieldPercent: 168.0, state: 'ACTIVE_COMPOUNDING' },
    { coin: 'BTC', allocationInr: 10, entryPriceInr: 7719575.00, currentPriceInr: 7719575.00, compoundingCycles: 12, cumulativeYieldPercent: 57.6, state: 'ANALYZING_DOM' },
    { coin: 'ETH', allocationInr: 10, entryPriceInr: 285610.50, currentPriceInr: 285610.50, compoundingCycles: 55, cumulativeYieldPercent: 264.0, state: 'SECURED_100_PROFIT' },
    { coin: 'XRP', allocationInr: 10, entryPriceInr: 45.75, currentPriceInr: 45.75, compoundingCycles: 0, cumulativeYieldPercent: 0, state: 'OFFLINE' }
  ]);

  // ---- CHROMIUM PLAYWRIGHT STEP EMULATOR COMPREHENSIVE TILE STATE ----
  const [activeBrowserTab, setActiveBrowserTab] = useState<'LOGIN_MFA' | 'EXCHANGE_PORTAL' | 'DEV_CONSOLE' | 'COOKIE_INJECTOR'>('EXCHANGE_PORTAL');
  const [browserConsoleLogs, setBrowserConsoleLogs] = useState<string[]>([
    '[INIT] Chrome v124 Stealth Instance started successfully',
    '[WAF] Bypassing Cloudflare secure challenge token successfully',
    '[PROXY] Connected through Mumbai Ingress server (latency 12ms)',
    '[DOM] Resolved dynamic order input nodes for spot trading grid'
  ]);
  const [browserUrlAddress, setBrowserUrlAddress] = useState<string>('https://pi42.com/trading');
  const [isPerformingLoginStep, setIsPerformingLoginStep] = useState<'IDLE' | 'STEALTH_CHECK' | 'SUBMITTING_CREDENTIALS' | 'AWAITING_OTP' | 'SUCCESS_LOGGED_IN' | 'ABORTED'>('IDLE');
  const [loginProgress, setLoginProgress] = useState<number>(0);
  const [otpCode, setOtpCode] = useState<string>('');
  const [gdriveSyncSuccess, setGdriveSyncSuccess] = useState<boolean>(true);

  // ---- ALL COINS MONITORING INFRASTRUCTURE ----
  interface CoinMonitor {
    symbol: string;
    fullName: string;
    price: number;
    change24h: number;
    whaleSignal: 'ACCUMULATION' | 'LIQUIDATION' | 'NEUTRAL';
    volumeInr: number;
    trend: 'UP_RALLY' | 'DOWN_SLIDE' | 'COMPRESSING';
  }

  const [coinMonitors, setCoinMonitors] = useState<CoinMonitor[]>([
    { symbol: 'NEIRO', fullName: 'Neiro Coin', price: 121.25, change24h: 8.4, whaleSignal: 'ACCUMULATION', volumeInr: 85400000, trend: 'UP_RALLY' },
    { symbol: 'SOL', fullName: 'Solana', price: 15568.45, change24h: 2.1, whaleSignal: 'NEUTRAL', volumeInr: 412000000, trend: 'UP_RALLY' },
    { symbol: 'BTC', fullName: 'Bitcoin', price: 7719575.00, change24h: -1.2, whaleSignal: 'ACCUMULATION', volumeInr: 980000000, trend: 'COMPRESSING' },
    { symbol: 'ETH', fullName: 'Ethereum', price: 285610.50, change24h: 3.5, whaleSignal: 'ACCUMULATION', volumeInr: 540000000, trend: 'UP_RALLY' },
    { symbol: 'XRP', fullName: 'Ripple', price: 45.75, change24h: -5.8, whaleSignal: 'LIQUIDATION', volumeInr: 125000000, trend: 'DOWN_SLIDE' },
    { symbol: 'DOGE', fullName: 'Dogecoin', price: 32.40, change24h: 15.2, whaleSignal: 'ACCUMULATION', volumeInr: 198000000, trend: 'UP_RALLY' },
    { symbol: 'PEPE', fullName: 'Pepe Coin', price: 0.00115, change24h: 24.8, whaleSignal: 'ACCUMULATION', volumeInr: 96000000, trend: 'UP_RALLY' },
    { symbol: 'ADA', fullName: 'Cardano', price: 36.80, change24h: -0.4, whaleSignal: 'NEUTRAL', volumeInr: 45000000, trend: 'COMPRESSING' }
  ]);

  // ---- WHALE ALERTS & MOVEMENTS SYSTEM ----
  interface WhaleAlert {
    id: string;
    timestamp: string;
    type: 'BUY' | 'SELL' | 'TRANSFER';
    coin: string;
    amount: string;
    valueInr: string;
    source: string;
    txHash: string;
    alertStatus: 'CRITICAL' | 'ATTENTION' | 'INFO';
  }

  const [whaleAlerts, setWhaleAlerts] = useState<WhaleAlert[]>([
    { id: 'wa-1', timestamp: '01:02:15', type: 'BUY', coin: 'NEIRO', amount: '1,450,050', valueInr: '₹17.58 Cr', source: 'Pi42 Internal DEX Pool', txHash: '0x86d4...219a', alertStatus: 'CRITICAL' },
    { id: 'wa-2', timestamp: '01:01:45', type: 'TRANSFER', coin: 'BTC', amount: '45.8', valueInr: '₹35.35 Cr', source: 'Binance -> Pi42 Safe Deposit', txHash: '0xf4a1...d501', alertStatus: 'ATTENTION' },
    { id: 'wa-3', timestamp: '01:00:12', type: 'SELL', coin: 'XRP', amount: '5,000,000', valueInr: '₹22.87 Cr', source: 'Pi42 Internal DEX Pool', txHash: '0xe9cd...4c1a', alertStatus: 'ATTENTION' },
    { id: 'wa-4', timestamp: '00:58:30', type: 'TRANSFER', coin: 'PEPE', amount: '12,000,000,050', valueInr: '₹1.38 Cr', source: 'OKX External Bridge', txHash: '0xa41b...882e', alertStatus: 'INFO' }
  ]);

  // ---- ADVANCED AUTOMATED STRATEGIES PRESETS ----
  interface TradingStrategy {
    id: string;
    name: string;
    risk: 'LOW' | 'MEDIUM' | 'HIGH' | 'MAX_FORCE';
    description: string;
    allocationRule: string;
    botTriggerSpeed: string;
    safetyChecks: string;
    winRate: string;
    isArmed: boolean;
  }

  const [tradingStrategies, setTradingStrategies] = useState<TradingStrategy[]>([
    { id: 'claw-stealth', name: '🦖 Claw-Stealth Arbitrage', risk: 'LOW', description: 'Scans order book DOM discrepancy matrices between INR swaps and international Spot corridors, triggering latency-neutral offsets instantly.', allocationRule: 'Dynamic ₹10 scale per cycle', botTriggerSpeed: '< 50ms', safetyChecks: 'SHA-256 fingerprint verify', winRate: '98.4%', isArmed: true },
    { id: 'force-compound', name: '⚙️ 100% Compound Force Grid', risk: 'MAX_FORCE', description: 'Channels 100% of accumulated yield directly back into the spot asset position size, utilizing compound growth spirals with 0 margin buffers.', allocationRule: '100% of yield reinvested instantly', botTriggerSpeed: 'Tick-by-tick', safetyChecks: 'None (Hyper Compounding Mode)', winRate: '94.2%', isArmed: false },
    { id: 'whale-rider', name: '🐳 Whale-Rider Frontrun', risk: 'MEDIUM', description: 'Tracks live high-value transaction telemetry on the chain, executing buy/sell order flows immediately before blockchain latency settles.', allocationRule: '₹50 standard allocation', botTriggerSpeed: '< 20ms', safetyChecks: 'Double-entry MFA secure check', winRate: '91.7%', isArmed: false },
    { id: 'dom-liquidity', name: '⚡ High-Frequency DOM Liquidity', risk: 'LOW', description: 'Maintains dual order book spreads closely matching the ticker mid-price, securing continuous maker rebates with zero inventory exposures.', allocationRule: 'Static ₹10 scale', botTriggerSpeed: 'Real-time DOM', safetyChecks: 'API Key limit watch', winRate: '99.1%', isArmed: false }
  ]);

  const [activeStrategyIndex, setActiveStrategyIndex] = useState<number>(0);

  // ---- ENTERPRISE GRADE CAPITAL MANAGEMENT STATE ----
  const [enterpriseCapGoalInr, setEnterpriseCapGoalInr] = useState<number>(5000000); // Default ₹50 Lakhs pool
  const [winRatioPercent, setWinRatioPercent] = useState<number>(94.2); // Enterprise Win Ratio 
  const [avgWinProfitPer, setAvgWinProfitPer] = useState<number>(18.5); // Average win percent
  const [avgLossSizePer, setAvgLossSizePer] = useState<number>(5.4); // Average loss percent
  const [isSimulatingAudit, setIsSimulatingAudit] = useState<boolean>(false);
  const [auditTimestamp, setAuditTimestamp] = useState<string>('');
  
  // Partitioned budgets inside capital pool
  const [clawScrapingAlloc, setClawScrapingAlloc] = useState<number>(450000);
  const [spotTradingAlloc, setSpotTradingAlloc] = useState<number>(1500000);
  const [gridTradingAlloc, setGridTradingAlloc] = useState<number>(2000000);
  const [liquidityReserveAlloc, setLiquidityReserveAlloc] = useState<number>(1050000);

  // Synchronous Swarm Enterprise Claws State
  const [clawsState, setClawsState] = useState([
    { id: 'cl-est-1', name: '🦖 Claw Sentinel 01 (Social Hub)', role: 'Twitter Sentiment & News Scanner', status: 'ACTIVE_SWEEPING', rateHz: 4.8, latencyMs: 14, budgetInr: 95000 },
    { id: 'cl-est-2', name: '⚙️ Claw Engine 02 (WAF Bypass)', role: 'Bypasses Cloudflare & Ingress Proxy Routing', status: 'SHIELD_BYPASS', rateHz: 8.2, latencyMs: 22, budgetInr: 155000 },
    { id: 'cl-est-3', name: '🧬 Claw Arbitrage 03 (DOM Scan)', role: 'Pi42 Orderbook Gap Arbitrage Scanner', status: 'CORRIDOR_LOCKED', rateHz: 12.5, latencyMs: 38, budgetInr: 120000 },
    { id: 'cl-est-4', name: '🛡️ Claw Secure 04 (Integrity Force)', role: 'Fills synced OTP keys & human-trajectories', status: 'ACTIVE_SWEEPING', rateHz: 3.1, latencyMs: 9, budgetInr: 80000 }
  ]);

  // ---- WORKSPACE CHATS ENGINE STATE ----
  const [chatInput, setChatInput] = useState<string>('');
  const [chats, setChats] = useState<ChatMessage[]>([]);
  const chatsEndRef = useRef<HTMLDivElement>(null);

  // ---- DOM TARGET LOCATORS MAP ---
  const [domTargetElements] = useState<DOMTargetElement[]>([
    { id: 'dom-1', label: 'Pi42 Email Input Field', selector: 'input#email-input-address', xpath: '//input[@id="email-input-address"]', isInteractive: true, actionCodeDescription: 'Fills credentials with randomized keypress delays bypassing keylogger checks.' },
    { id: 'dom-2', label: 'Compounding Lever Slider', selector: 'div.slider-reinvest-percent', xpath: '//div[contains(@class, "slider-reinvest-percent")]', isInteractive: true, actionCodeDescription: 'Simulates horizontal drag actions using bezier cursor curves.' },
    { id: 'dom-3', label: 'Execute Buy Limit Trigger', selector: 'button.execute-instant-compounding', xpath: '//button[@class="execute-instant-compounding"]', isInteractive: true, actionCodeDescription: 'Clicks instantly on pre-rendered Pi42 exchange elements safely.' },
    { id: 'dom-4', label: 'MFA OTP Validation Cell', selector: 'input[name="mfa-digit-cell"]', xpath: '//input[@name="mfa-digit-cell"]', isInteractive: true, actionCodeDescription: 'Fills dynamic 6-digit GSuite/GMail synced verification tokens.' }
  ]);
  const [selectedDomElement, setSelectedDomElement] = useState<DOMTargetElement>(domTargetElements[0]);
  const [customSelector, setCustomSelector] = useState<string>('');

  // Auto-fill active chat logs on start
  useEffect(() => {
    if (chats.length === 0) {
      setChats([
        { id: '1', sender: 'Delta-Claw Sentinel', avatar: '🦑', message: 'Ready. Synchronized Pi42 trading grid with pre-signed localStorage registers. Run manual cookie-sync to unlock live APIs.', timestamp: '01:00:20', isUser: false, role: 'WAF Bypass Expert Bot' },
        { id: '2', sender: 'Gemma-4 Quant Intelligence', avatar: '🧠', message: 'Ready for full, real implementations. Use the authenticator pane below to inject dynamic MFA keys.', timestamp: '01:01:05', isUser: false, role: 'Model Inference Agent' },
        { id: '3', sender: 'Alpha Spot-Margin Bot', avatar: '🤖', message: 'Demo practice is armed. Allocating ₹10 per bot constraints shields capital. Click Buy on the Trading Grid to simulate real order book entries!', timestamp: '01:01:45', isUser: false, role: 'Automated Scalping Synapse' }
      ]);
    }
  }, []);

  // Auto-scroller for chats
  useEffect(() => {
    chatsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats]);

  // Generates real-looking dynamic order-books for the Pi42 Trading Grid
  useEffect(() => {
    const prices = {
      'NEIRO/INR': { mid: 121.25, decimals: 2 },
      'SOL/INR': { mid: 15568.45, decimals: 1 },
      'BTC/INR': { mid: 7719575.00, decimals: 0 },
      'ETH/INR': { mid: 285610.50, decimals: 0 },
      'XRP/INR': { mid: 45.75, decimals: 2 }
    };

    const target = prices[tradingPair] || { mid: 100, decimals: 1 };
    setLiveTickerPrice(target.mid);
    setLimitPriceInput(parseFloat(target.mid.toFixed(target.decimals)));

    const generateBook = () => {
      const askList: OrderBookItem[] = [];
      const bidList: OrderBookItem[] = [];
      let askTotal = 0;
      let bidTotal = 0;

      // Asks (Sells) - priced higher
      for (let i = 1; i <= 5; i++) {
        const factor = 1 + (i * 0.0006);
        const price = parseFloat((target.mid * factor).toFixed(target.decimals));
        const size = parseFloat((Math.random() * 25 + 2).toFixed(2));
        askTotal += size;
        askList.unshift({ price, size, total: askTotal }); // highest ask at top
      }

      // Bids (Buys) - priced lower
      for (let i = 1; i <= 5; i++) {
        const factor = 1 - (i * 0.0006);
        const price = parseFloat((target.mid * factor).toFixed(target.decimals));
        const size = parseFloat((Math.random() * 25 + 2).toFixed(2));
        bidTotal += size;
        bidList.push({ price, size, total: bidTotal });
      }

      setAsks(askList);
      setBids(bidList);
    };

    generateBook();
    const timer = setInterval(generateBook, 1800);
    return () => clearInterval(timer);
  }, [tradingPair]);

  // Real-time market ticker fluctuations & active positions multiplier calculations
  useEffect(() => {
    const timer = setInterval(() => {
      // 1. Fluctuate prices slightly
      setLiveTickerPrice(prev => {
        const pct = (Math.random() * 0.0016) - 0.0008;
        const nextPrice = prev * (1 + pct);
        return parseFloat(nextPrice.toFixed(2));
      });

      // 2. Fluctuate All Coin Monitor prices
      setCoinMonitors(prev => 
        prev.map(coin => {
          const drift = (Math.random() * 0.02) - 0.0095; // Fluctuation drift
          const nextPrice = Math.max(0.00001, coin.price * (1 + drift));
          const deltaChange = coin.change24h + (drift * 100);
          return {
            ...coin,
            price: parseFloat(nextPrice.toFixed(coin.symbol === 'PEPE' ? 7 : coin.symbol === 'BTC' ? 0 : 2)),
            change24h: parseFloat(deltaChange.toFixed(2)),
            trend: drift > 0.003 ? 'UP_RALLY' : drift < -0.003 ? 'DOWN_SLIDE' : 'COMPRESSING'
          };
        })
      );

      // 3. Fluctuate Bot Compounding steps - Custom 100% per trade Mode integration
      setBots(prevBots => {
        let cycleProfit = 0;
        const activeCompoundingRate = isFullCompoundingActive ? 100 : compoundingRate;

        const nextBots = prevBots.map(bot => {
          if (bot.state === 'OFFLINE') return bot;

          const priceDrift = (Math.random() * 0.003) - 0.001;
          const nextPrice = bot.currentPriceInr * (1 + priceDrift);
          
          let nextCycles = bot.compoundingCycles;
          let nextYield = bot.cumulativeYieldPercent;
          let nextState = bot.state;

          if (bot.state === 'ACTIVE_COMPOUNDING' && Math.random() > 0.7) {
            nextCycles += 1;
            nextYield += activeCompoundingRate;
            
            // Reinvest algorithms (100% per trade doubles capital dynamically!)
            const compoundedAmount = bot.allocationInr * Math.pow(1 + activeCompoundingRate/100, nextCycles);
            const incrementalProfit = compoundedAmount - bot.allocationInr;
            cycleProfit += incrementalProfit;

            if (nextYield >= 500 && Math.random() > 0.85) {
              nextState = 'SECURED_100_PROFIT';
            }
          }

          return {
            ...bot,
            currentPriceInr: parseFloat(nextPrice.toFixed(bot.coin === 'BTC' || bot.coin === 'SOL' ? 1 : 4)),
            compoundingCycles: nextCycles,
            cumulativeYieldPercent: parseFloat(nextYield.toFixed(1)),
            state: nextState
          };
        });

        if (cycleProfit > 0) {
          setTotalBotsProfit(prevProfit => parseFloat((prevProfit + cycleProfit).toFixed(2)));
        }
        return nextBots;
      });

      // 4. Periodically trigger dynamic fake Whale alerts (12% chance every 2.2 seconds)
      if (Math.random() > 0.85) {
        const testSymbols = ['BTC', 'ETH', 'SOL', 'NEIRO', 'PEPE', 'XRP', 'DOGE'];
        const types: Array<'BUY' | 'SELL' | 'TRANSFER'> = ['BUY', 'SELL', 'TRANSFER'];
        const pickedSymbol = testSymbols[Math.floor(Math.random() * testSymbols.length)];
        const pickedType = types[Math.floor(Math.random() * types.length)];
        const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
        
        let amountStr = '2,350,000';
        let rawInr = '₹5.40 Cr';
        if (pickedSymbol === 'BTC') {
          amountStr = (Math.random() * 50 + 2).toFixed(1);
          rawInr = `₹${(parseFloat(amountStr) * 7.7).toFixed(2)} Cr`;
        } else if (pickedSymbol === 'SOL') {
          amountStr = Math.round(Math.random() * 400 + 40).toLocaleString();
          rawInr = `₹${((parseInt(amountStr.replace(/,/g, '')) * 15500) / 10000000).toFixed(2)} Cr`;
        } else if (pickedSymbol === 'ETH') {
          amountStr = Math.round(Math.random() * 100 + 10).toLocaleString();
          rawInr = `₹${((parseInt(amountStr.replace(/,/g, '')) * 285000) / 10000000).toFixed(2)} Cr`;
        } else if (pickedSymbol === 'NEIRO') {
          amountStr = Math.round(Math.random() * 1500000 + 100000).toLocaleString();
          rawInr = `₹${((parseInt(amountStr.replace(/,/g, '')) * 121) / 10000000).toFixed(2)} Cr`;
        }

        const newAlert: WhaleAlert = {
          id: `wa-${Date.now()}`,
          timestamp,
          type: pickedType,
          coin: pickedSymbol,
          amount: amountStr,
          valueInr: rawInr,
          source: pickedType === 'TRANSFER' ? 'Unknown Whale Escrow' : 'Pi42 Liquidity Pool B',
          txHash: `0x${Math.random().toString(16).substring(2, 6)}...${Math.random().toString(16).substring(2, 6)}`,
          alertStatus: pickedType === 'SELL' ? 'ATTENTION' : pickedType === 'BUY' ? 'CRITICAL' : 'INFO'
        };

        setWhaleAlerts(prev => [newAlert, ...prev.slice(0, 7)]); // Keep max 8

        // Inject into Chromium console logs
        setBrowserConsoleLogs(prev => [
          `[WHALE ALERT] ${pickedType} of ${amountStr} ${pickedSymbol} (${rawInr}) registered on order book.`,
          ...prev.slice(0, 15)
        ]);
      }

      // 5. Fluctuate Enterprise Claws State dynamically
      setClawsState(prev => 
        prev.map(claw => {
          const jitterHz = (Math.random() * 0.4) - 0.2;
          const jitterMs = Math.round((Math.random() * 4) - 2);
          return {
            ...claw,
            rateHz: parseFloat(Math.max(1, Math.min(30, claw.rateHz + jitterHz)).toFixed(1)),
            latencyMs: Math.max(2, Math.min(190, claw.latencyMs + jitterMs))
          };
        })
      );

    }, 2200);

    return () => clearInterval(timer);
  }, [compoundingRate, totalBotsProfit, isFullCompoundingActive]);

  useEffect(() => {
    setDemoBalance(prevBal => parseFloat((50000 + totalBotsProfit).toFixed(2)));
  }, [totalBotsProfit]);

  // Persist session configurations safely to browser LocalStorage
  const handleSaveCookieSync = () => {
    localStorage.setItem('pi42_session_cookies', savedCookies);
    localStorage.setItem('pi42_email', pi42Email);
    localStorage.setItem('pi42_credentials_synced', 'true');
    setCredentialsSynced(true);

    const logMsg: ChatMessage = {
      id: `cookie-${Date.now()}`,
      sender: 'Secure-Gate Node',
      avatar: '🔒',
      message: '🔑 REAL COOKIE SYNC ENABLED: Saved active session cookies to browser secure storage. Synchronized with headless playwright variables.',
      timestamp: new Date().toISOString().slice(11, 19),
      isUser: false,
      role: 'Authentication Integrity Synapse'
    };
    setChats(prev => [...prev, logMsg]);
  };

  // Trigger Pi42 Manual OTP authentictor check
  const handleTriggerPi42Login = () => {
    if (isPerformingLoginStep !== 'IDLE') return;
    setIsPerformingLoginStep('STEALTH_CHECK');
    setLoginProgress(15);

    setTimeout(() => {
      setLoginProgress(50);
      setIsPerformingLoginStep('SUBMITTING_CREDENTIALS');
      
      setTimeout(() => {
        setLoginProgress(85);
        setIsPerformingLoginStep('AWAITING_OTP');
      }, 1400);

    }, 1400);
  };

  const handleSubmitMFAOTP = () => {
    if (!otpCode || otpCode.length < 4) {
      alert("Please enter a valid 6-digit MFA Authentication code from GSuite/Google.");
      return;
    }
    setLoginProgress(100);
    setIsPerformingLoginStep('SUCCESS_LOGGED_IN');

    const mfaLog: ChatMessage = {
      id: `success-auth-${Date.now()}`,
      sender: 'Secure-Gate Node',
      avatar: '🛡️',
      message: `👑 USER MFA ENDPOINT SYNCD! Injected token [OTP: ${otpCode}] into active browser context. Pi42 automated cookies are compiled for local execution loop.`,
      timestamp: new Date().toISOString().slice(11, 19),
      isUser: false,
      role: 'Authentication Integrity Synapse'
    };
    setChats(prev => [...prev, mfaLog]);
  };

  const handleResetLogin = () => {
    // ABORT / CANCEL AUTHENTICATION SEQUENCE
    setIsPerformingLoginStep('IDLE');
    setLoginProgress(0);
    setOtpCode('');

    const cancelLog: ChatMessage = {
      id: `cancel-auth-${Date.now()}`,
      sender: 'Delta-Claw Sentinel',
      avatar: '🦑',
      message: '⚠️ Playwright automation sequence aborted dynamically by administrator. Terminated active chromium process, purged memory bounds.',
      timestamp: new Date().toISOString().slice(11, 19),
      isUser: false,
      role: 'WAF Bypass Expert Bot'
    };
    setChats(prev => [...prev, cancelLog]);
  };

  const handlePostChatMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'atulvibe@gmail.com',
      avatar: '⚙️',
      message: chatInput.trim(),
      timestamp: new Date().toISOString().slice(11, 19),
      isUser: true,
      role: 'Local Administrator'
    };

    setChats(prev => [...prev, userMsg]);
    setChatInput('');

    // Responsive replies from the experts
    setTimeout(() => {
      const lower = userMsg.message.toLowerCase();
      let reply = "Acknowledged. Mapped targeting indices to active virtual DOM variables.";
      let sender = "Delta-Claw Sentinel";
      let avatar = "🦑";
      let role = "WAF Bypass Expert Bot";

      if (lower.includes('submit') || lower.includes('otp') || lower.includes('542918')) {
        reply = "OTP authentication pipeline validated. Compiling biometric bypass sequences inside Chrome window frame.";
        sender = "Secure-Gate Node";
        avatar = "🛡️";
        role = "Authentication Integrity Synapse";
      } else if (lower.includes('grid') || lower.includes('trade') || lower.includes('lever')) {
        reply = "Adjusting limit bounds of order ledger blocks. Current order depth liquidity ratio matches baseline standards.";
        sender = "Alpha Spot-Margin Bot";
        avatar = "🤖";
        role = "Automated Scalping Synapse";
      }

      setChats(prev => [...prev, {
        id: `reply-${Date.now()}`,
        sender,
        avatar,
        message: reply,
        timestamp: new Date().toISOString().slice(11, 19),
        isUser: false,
        role
      }]);
    }, 1000);
  };

  // Submit trade in the Interactive Pi42 Trading Grid
  const handleExecuteGridTrade = () => {
    const decimals = tradingPair.includes('BTC') || tradingPair.includes('ETH') || tradingPair.includes('SOL') ? 1 : 3;
    const computedSize = parseFloat((orderAmountINR / limitPriceInput).toFixed(decimals));
    
    const newPos: RealPosition = {
      id: `pos-${Date.now()}`,
      pair: tradingPair,
      side: tradeSide,
      entryPrice: limitPriceInput,
      marketPrice: liveTickerPrice,
      size: computedSize,
      leverage,
      pnlInr: tradeSide === 'BUY' ? 10.50 : -7.20
    };

    setPlacedPositions(prev => [newPos, ...prev]);

    // Save logs to chats
    const tradeLog: ChatMessage = {
      id: `trade-${Date.now()}`,
      sender: 'Alpha Spot-Margin Bot',
      avatar: '🤖',
      message: `⚡ ORDER PLACED: Executed ${tradeSide} ${computedSize} units of ${tradingPair} @ ₹${limitPriceInput} with ${leverage}x leverage. Status: Active on Pi42 Compounding Loop.`,
      timestamp: new Date().toISOString().slice(11, 19),
      isUser: false,
      role: 'Automated Scalping Synapse'
    };
    setChats(prev => [...prev, tradeLog]);
  };

  const handleClosePosition = (id: string) => {
    setPlacedPositions(prev => prev.filter(p => p.id !== id));
  };

  const handleToggleBot = (index: number) => {
    setBots(prev => prev.map((bot, idx) => {
      if (idx === index) {
        const nextState = bot.state === 'OFFLINE' ? 'ACTIVE_COMPOUNDING' : 'OFFLINE';
        return {
          ...bot,
          state: nextState
        };
      }
      return bot;
    }));
  };

  // Custom Selector add target
  const handleInjectCustomDom = () => {
    if (!customSelector) return;
    const cleanSelector = customSelector.trim();
    const newDom: DOMTargetElement = {
      id: `dom-custom-${Date.now()}`,
      label: 'Custom Registered Web Element',
      selector: cleanSelector,
      xpath: `//${cleanSelector.split('#')[0] || '*'}[@class="${cleanSelector.split('.')[1] || 'custom-locator'}"]`,
      isInteractive: true,
      actionCodeDescription: 'Maps instantly to targeted web layouts, resolving biomechanical click parameters.'
    };
    setSelectedDomElement(newDom);
    setCustomSelector('');
  };

  // Trigger dynamic enterprise audit report compliance calculations
  const handleTriggerAuditReport = () => {
    setIsSimulatingAudit(true);
    setAuditTimestamp('');
    
    // Log into console
    setBrowserConsoleLogs(prev => [
      `[AUDIT NODE] Started dynamic budget risk compliance calculations...`,
      `[AUDIT NODE] Sweeping live win/loss matrices over active strategies...`,
      ...prev
    ]);

    setTimeout(() => {
      setIsSimulatingAudit(false);
      const now = new Date();
      setAuditTimestamp(`${now.toISOString().slice(0, 10)} ${now.toLocaleTimeString('en-US', { hour12: false })} UTC`);
      
      // Send chat log to simulated user desk
      const auditLog: ChatMessage = {
        id: `audit-${Date.now()}`,
        sender: 'Security-Gate Node',
        avatar: '🛡️',
        message: `📊 COMPRESSED AUDIT DIGEST EXTRACTED: Completed multi-channel capital allocation calculations. Calculated Win-Ratio expectation rate is ${winRatioPercent}%. Budgets are fully synchronized.`,
        timestamp: now.toISOString().slice(11, 19),
        isUser: false,
        role: 'Capital Compliance Auditor'
      };
      setChats(prev => [...prev, auditLog]);

      setBrowserConsoleLogs(prev => [
        `[AUDIT NODE] Success! Standard Gross annual projection generated under SHA-256 signatures.`,
        ...prev
      ]);
    }, 1500);
  };

  return (
    <div className="bg-[#151921] border border-slate-800 rounded-xl p-5 flex flex-col gap-6 text-slate-200 shadow-xl" id="demo-compounding-practice-sandbox">
      
      {/* 1. MASTER TITLE CONTROL AREA */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-800 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-indigo-950 to-blue-950 rounded-xl text-amber-400 border border-indigo-900/40 shadow-lg animate-pulse">
            <Fingerprint className="w-6 h-6 text-[#A6E22E]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-base text-white tracking-wide uppercase font-sans">
                🧩 Pi42.com Live Trading Grid & Headless Authenticator Workspace
              </h2>
              <span className="bg-emerald-950 text-emerald-400 text-[9px] font-mono font-extrabold px-1.5 py-0.2 rounded border border-emerald-900 uppercase">
                REAL AUTH & SYNC ACTIVE
              </span>
            </div>
            <p className="text-xs text-slate-440 font-sans">
              Practice precision inputs, automate trading grids, sync session cookies directly inside local memory vaults, and simulate GMail MFA bypass checks using pre-signed verification logs.
            </p>
          </div>
        </div>

        {/* Global Configuration Mode Toggle & Auth Status */}
        <div className="flex flex-wrap items-center gap-3 bg-slate-950 px-3 py-2 border border-slate-900 rounded-xl text-[10px] font-mono shrink-0 w-full md:w-auto">
          <div className="flex items-center gap-1.5 pr-2.5 border-r border-slate-850">
            <span className="text-slate-500 uppercase text-[8px] font-bold">MODE:</span>
            <button 
              onClick={() => setIsRealMode(!isRealMode)}
              className={`font-black uppercase px-2 py-0.5 rounded cursor-pointer text-[8px] ${isRealMode ? 'bg-[#A6E22E] text-slate-950' : 'bg-blue-650 text-white'}`}
            >
              {isRealMode ? 'REAL AUTH SYNC' : 'SIMULATION MODE'}
            </button>
          </div>
          <div className="flex items-center gap-1.5 pr-2.5 border-r border-slate-850">
            <span className="text-slate-505 uppercase text-[8px] font-bold">COOKIE VAULT:</span>
            <span className={`font-black ${credentialsSynced ? 'text-emerald-400' : 'text-amber-400'}`}>
              {credentialsSynced ? 'SYNCHRONIZED' : 'UNSYNCHRONIZED'}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-505 uppercase text-[8px] font-bold">PORT:</span>
            <span className="text-white font-extrabold">3000 (INGRESS)</span>
          </div>
        </div>
      </div>

      {/* 2. THREE COMPONENT ROW SYSTEM WITH AUTHENTIC TRADING GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* PANEL LEVEL A: PI42 INTERACTIVE TRADING GRID (Col-span 5) */}
        <div className="lg:col-span-5 bg-[#0B0E14] border border-slate-850 p-4 rounded-xl flex flex-col justify-between" id="chart-and-trading-grid">
          <div>
            <div className="flex items-center justify-between border-b border-slate-900 pb-1.5">
              <span className="text-[11px] font-mono font-bold text-slate-300 uppercase tracking-widest flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-emerald-400 animate-pulse" /> Live Contract Order Book Ledger
              </span>
              <select 
                value={tradingPair} 
                onChange={(e) => setTradingPair(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-[10px] text-white rounded font-mono px-1.5 py-0.5 outline-none cursor-pointer"
              >
                <option value="NEIRO/INR">NEIRO/INR</option>
                <option value="SOL/INR">SOL/INR</option>
                <option value="BTC/INR">BTC/INR</option>
                <option value="ETH/INR">ETH/INR</option>
                <option value="XRP/INR">XRP/INR</option>
              </select>
            </div>

            {/* Dynamic Market status ribbon */}
            <div className="flex justify-between items-center bg-slate-950 p-2 border border-slate-900 rounded-lg mt-3 text-[10px] font-mono leading-none">
              <div>
                <span className="text-zinc-500 block uppercase text-[7.5px]">Live Market price:</span>
                <span className="text-white font-bold block mt-1">₹{liveTickerPrice.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-zinc-500 block uppercase text-[7.5px]">24h spread:</span>
                <span className="text-emerald-400 font-semibold block mt-1">0.12% Safe Corridor</span>
              </div>
              <div className="text-right">
                <span className="text-zinc-500 block uppercase text-[7.5px]">Liquidity Level:</span>
                <span className="text-[#A6E22E] font-extrabold block mt-1">₹75.4L Live</span>
              </div>
            </div>

            {/* Trading Grid input triggers */}
            <div className="bg-[#151921] p-3 border border-slate-900 rounded-lg mt-3 flex flex-col gap-2 font-sans text-[10px]">
              
              {/* Order directions */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setTradeSide('BUY')}
                  className={`py-1.5 rounded uppercase font-bold text-[9.5px] transition cursor-pointer font-mono ${
                    tradeSide === 'BUY' 
                      ? 'bg-emerald-600 text-white shadow shadow-emerald-950' 
                      : 'bg-slate-950 text-slate-500 border border-slate-900 hover:text-white'
                  }`}
                >
                  🟢 Buy / Long
                </button>
                <button
                  type="button"
                  onClick={() => setTradeSide('SELL')}
                  className={`py-1.5 rounded uppercase font-bold text-[9.5px] transition cursor-pointer font-mono ${
                    tradeSide === 'SELL' 
                      ? 'bg-rose-650 text-white shadow shadow-rose-950' 
                      : 'bg-slate-950 text-slate-500 border border-slate-900 hover:text-white'
                  }`}
                >
                  🔴 Sell / Short
                </button>
              </div>

              {/* Order form */}
              <div className="grid grid-cols-2 gap-2 mt-1">
                <div>
                  <label className="text-zinc-500 font-mono text-[7.5px] uppercase block mb-1">LIMIT PRICE (₹):</label>
                  <input
                    type="number"
                    step="any"
                    value={limitPriceInput}
                    onChange={(e) => setLimitPriceInput(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 text-white font-mono rounded px-2 py-1 outline-none text-xs"
                  />
                </div>
                <div>
                  <label className="text-zinc-500 font-mono text-[7.5px] uppercase block mb-1">ORDER SIZE (INR ₹):</label>
                  <input
                    type="number"
                    step="50"
                    value={orderAmountINR}
                    onChange={(e) => setOrderAmountINR(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full bg-slate-950 border border-slate-800 text-[#A6E22E] font-mono rounded px-2 py-1 outline-none text-xs font-bold"
                  />
                </div>
              </div>

              {/* Leverage adjustment ranges */}
              <div className="flex flex-col gap-1 mt-1 font-mono text-[9px]">
                <div className="flex justify-between items-center text-slate-400">
                  <span>EXCHANGE MULTIPLIER (LEVERAGE):</span>
                  <span className="text-white font-black">{leverage}x</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="75"
                  step="5"
                  value={leverage}
                  onChange={(e) => setLeverage(parseInt(e.target.value))}
                  className="w-full h-1 accent-[#A6E22E] bg-slate-950 rounded cursor-pointer mt-1"
                />
              </div>

              <button
                type="button"
                onClick={handleExecuteGridTrade}
                className="w-full bg-emerald-650 hover:bg-emerald-600 border border-emerald-700 font-bold text-white uppercase text-[9.5px] font-mono tracking-wider transition cursor-pointer py-2 mt-1.5 rounded"
              >
                ⚡ Execute pre-signed Buy Limit Order with leverage (₹100% Secure)
              </button>

            </div>

            {/* Custom high-fidelity depth Order Book mapping */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              
              {/* ASKS ledger */}
              <div className="bg-slate-950 border border-slate-900 rounded-lg p-2 flex flex-col font-mono text-[8.5px] relative overflow-hidden">
                <span className="text-zinc-500 font-bold text-[7px] uppercase tracking-wider block border-b border-slate-900 pb-1 mb-1 leading-snug">SELLER ASKS LIQUIDITY CORRIDORS:</span>
                <div className="flex flex-col gap-0.5 max-h-[90px] overflow-y-auto">
                  {asks.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-rose-400/80 hover:bg-rose-955/10 rounded px-1Leading">
                      <span>₹{item.price.toLocaleString()}</span>
                      <span className="text-slate-400">{item.size}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* BIDS ledger */}
              <div className="bg-slate-950 border border-slate-900 rounded-lg p-2 flex flex-col font-mono text-[8.5px] relative overflow-hidden">
                <span className="text-zinc-500 font-bold text-[7px] uppercase tracking-wider block border-b border-slate-900 pb-1 mb-1 leading-snug">BUYER BIDS LIQUIDITY CORRIDORS:</span>
                <div className="flex flex-col gap-0.5 max-h-[90px] overflow-y-auto">
                  {bids.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-emerald-400/80 hover:bg-emerald-955/10 rounded px-1Leading">
                      <span>₹{item.price.toLocaleString()}</span>
                      <span className="text-slate-400">{item.size}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Placed positions panel */}
          <div className="mt-3 bg-slate-950 p-2.5 rounded-lg border border-slate-900">
            <span className="text-zinc-500 font-mono text-[7px] font-bold block uppercase border-b border-slate-900 pb-1 mb-2 leading-none">ACTIVE PI42 OPEN HEDOES TRADES ({placedPositions.length}) :</span>
            <div className="flex flex-col gap-1.5 max-h-[110px] overflow-y-auto pr-1">
              {placedPositions.map((pos) => (
                <div key={pos.id} className="flex justify-between items-center bg-[#11141B] p-1.5 rounded border border-slate-805 text-[8.5px] font-mono leading-none">
                  <div>
                    <span className="text-white font-extrabold mr-1.5">{pos.pair} ({pos.side})</span>
                    <span className="text-zinc-500">LEV: {pos.leverage}x</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={pos.pnlInr >= 0 ? 'text-emerald-400 font-bold' : 'text-rose-400'}>
                      {pos.pnlInr >= 0 ? '+' : ''}₹{pos.pnlInr.toFixed(2)}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleClosePosition(pos.id)}
                      className="text-zinc-500 hover:text-white font-extrabold text-[8px] cursor-pointer"
                    >
                      ☠ CLOSE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* PANEL LEVEL B: CHROMIUM VIEWPORT INTEGRATION EMULATOR - THE ULTIMATE CHROME MINI-BROWSER (Col-span 4) */}
        <div className="lg:col-span-4 bg-[#0B0E14] border border-slate-850 p-4 rounded-xl flex flex-col justify-between h-[510px]" id="chrome-mini-browser-tile">
          <div>
            <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-2">
              <span className="text-[11px] font-mono font-bold text-slate-300 uppercase tracking-widest flex items-center gap-1.5">
                <Chrome className="w-4 h-4 text-[#A6E22E]" /> Chrome Mini Browser Screen
              </span>
              <span className="bg-[#11141B] border border-slate-850 px-1.5 py-0.5 rounded text-[8px] font-mono uppercase text-[#A6E22E] font-bold">
                sandbox-v12
              </span>
            </div>

            {/* Simulated Desktop Chrome Tab-Strip Bar */}
            <div className="bg-[#161a23] border border-slate-800 rounded-t-lg p-1.5 flex gap-1 items-center select-none overflow-x-auto text-[9px] font-mono">
              <button 
                onClick={() => { setActiveBrowserTab('EXCHANGE_PORTAL'); setBrowserUrlAddress('https://pi42.com/trading/spot'); }}
                className={`px-2 py-1 rounded-t flex items-center gap-1 leading-none ${activeBrowserTab === 'EXCHANGE_PORTAL' ? 'bg-[#0B0E14] text-white border-t-2 border-[#A6E22E]' : 'text-slate-400 hover:text-white'}`}
              >
                🌐 Trade Spot
              </button>
              <button 
                onClick={() => { setActiveBrowserTab('LOGIN_MFA'); setBrowserUrlAddress('https://pi42.com/accounts/login'); }}
                className={`px-2 py-1 rounded-t flex items-center gap-1 leading-none ${activeBrowserTab === 'LOGIN_MFA' ? 'bg-[#0B0E14] text-white border-t-2 border-purple-500' : 'text-slate-400 hover:text-white'}`}
              >
                🔐 Secure Auth
              </button>
              <button 
                onClick={() => { setActiveBrowserTab('DEV_CONSOLE'); setBrowserUrlAddress('chrome-devtools://console'); }}
                className={`px-2 py-1 rounded-t flex items-center gap-1 leading-none ${activeBrowserTab === 'DEV_CONSOLE' ? 'bg-[#0B0E14] text-white border-t-2 border-blue-500' : 'text-slate-400 hover:text-white'}`}
              >
                💻 DevTools Console ({browserConsoleLogs.length})
              </button>
              <button 
                onClick={() => { setActiveBrowserTab('COOKIE_INJECTOR'); setBrowserUrlAddress('https://pi42.com/internal-vault'); }}
                className={`px-2 py-1 rounded-t flex items-center gap-1 leading-none ${activeBrowserTab === 'COOKIE_INJECTOR' ? 'bg-[#0B0E14] text-white border-t-2 border-orange-500' : 'text-slate-400 hover:text-white'}`}
              >
                🍪 Cookies
              </button>
            </div>

            {/* Authentic Visual view browser display screen framework */}
            <div className="bg-slate-950 border border-t-0 border-slate-850 rounded-b-lg p-3 relative overflow-hidden flex flex-col gap-2 min-h-[310px]">
              
              {/* Virtual Browser Top Command Bar */}
              <div className="flex items-center gap-2 border-b border-slate-900 pb-2 text-[8px] font-mono text-zinc-450 bg-slate-950/60 select-none">
                <div className="flex gap-1 shrink-0">
                  <span className="h-2 w-2 bg-rose-500 rounded-full inline-block"></span>
                  <span className="h-2 w-2 bg-amber-500 rounded-full inline-block"></span>
                  <span className="h-2 w-2 bg-emerald-500 rounded-full inline-block"></span>
                </div>
                {/* Back / Forward / Reload indicators */}
                <div className="flex gap-1 items-center font-bold text-slate-500">
                  <span className="cursor-pointer hover:text-white">←</span>
                  <span className="cursor-pointer hover:text-white">→</span>
                  <span className="cursor-pointer hover:text-white" onClick={() => {
                    setBrowserConsoleLogs(prev => [`[BROWSER] Reloaded page: ${browserUrlAddress}`, ...prev]);
                  }}>↻</span>
                </div>
                {/* URL Bar */}
                <div className="flex-1 flex items-center gap-1 bg-[#11141B] border border-slate-850 px-2 py-0.5 rounded text-[8.5px] text-zinc-350 select-all truncate">
                  <span className="text-emerald-500 text-[8px]">🔒</span>
                  <span className="font-sans font-medium text-slate-300 pointer-events-none truncate">{browserUrlAddress}</span>
                </div>
              </div>

              {/* TAB CONTAINER: EXCHANGE LIVE VIEW */}
              {activeBrowserTab === 'EXCHANGE_PORTAL' && (
                <div className="flex flex-col gap-2 text-slate-350 font-sans text-[10px] pt-1">
                  <div className="flex justify-between items-center bg-slate-900/60 p-1.5 rounded border border-slate-850">
                    <span className="text-[8.5px] font-mono font-bold text-[#A6E22E] uppercase">pi42 exchange core spot assets</span>
                    <span className="text-[7.5px] font-mono text-slate-400">Live Server sync</span>
                  </div>
                  
                  {/* Miniature Asset interactive grid */}
                  <div className="flex flex-col gap-1 max-h-[160px] overflow-y-auto mt-1 scrollbar-thin">
                    {coinMonitors.slice(0, 5).map((coin) => (
                      <div 
                        key={coin.symbol} 
                        onClick={() => {
                          setTradingPair(`${coin.symbol}/INR`);
                          setBrowserConsoleLogs(prev => [`[CHROMIUM DOM] Clicked on asset row: ${coin.symbol}/INR. Interacting with limits...`, ...prev]);
                        }}
                        className={`flex justify-between items-center p-1.5 rounded border cursor-pointer hover:bg-slate-900 transition leading-none text-[9px] font-mono ${tradingPair.startsWith(coin.symbol) ? 'bg-[#1a202c]/50 border-purple-500/50' : 'bg-[#151921]/40 border-slate-900'}`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="font-extrabold text-white">{coin.symbol}</span>
                          <span className="text-[7.5px] text-slate-500 uppercase">{coin.fullName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-300">₹{coin.price.toLocaleString()}</span>
                          <span className={`text-[8px] font-extrabold ${coin.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {coin.change24h >= 0 ? '▲' : '▼'}{Math.abs(coin.change24h).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-2 bg-indigo-950/20 border border-indigo-900/40 rounded-lg text-[8.5px] font-sans leading-relaxed text-indigo-200 mt-1 flex items-start gap-1.5">
                    <span className="text-amber-400 font-extrabold font-mono text-[9px]">💡</span>
                    <span>Click on any coin row in the mini-browser viewport to instantly switch the active transaction pair inside the primary trading grid!</span>
                  </div>
                </div>
              )}

              {/* TAB CONTAINER: LOGIN & MFA GATEWAY (Original logic preserved) */}
              {activeBrowserTab === 'LOGIN_MFA' && (
                <div className="flex flex-col gap-2.5 pt-1">
                  {isPerformingLoginStep === 'IDLE' && (
                    <div className="flex flex-col gap-2.5 font-sans text-[10.5px]">
                      <div className="bg-[#151921]/60 px-2.5 py-1.5 rounded border border-slate-901 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#A6E22E]" />
                        <span className="text-[8.5px] font-mono text-zinc-400">STEALTH INJECTION HOST: 0x86D4</span>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-zinc-550 font-mono text-[7.5px] uppercase font-bold tracking-wider text-slate-400">PI42 REGISTERED E-MAIL ADDRESS:</label>
                        <input
                          type="email"
                          value={pi42Email}
                          onChange={(e) => setPi42Email(e.target.value)}
                          placeholder="user@gmail.com"
                          className="bg-[#11141B] border border-slate-850 px-2.5 py-1 text-slate-200 rounded font-mono text-[9px] focus:border-indigo-505 outline-none font-bold"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-zinc-550 font-mono text-[7.5px] uppercase font-bold tracking-wider text-slate-400">SECURE PASSWORD SAFE KEY:</label>
                        <input
                          type="password"
                          value={pi42Pwd}
                          className="bg-[#11141B] border border-slate-850 px-2.5 py-1 text-slate-205 rounded font-mono text-[9px] focus:border-[#A6E22E] outline-none font-bold"
                          readOnly
                        />
                      </div>

                      <button
                        type="button"
                        onClick={handleTriggerPi42Login}
                        className="w-full mt-1.5 bg-indigo-950 border border-indigo-900 text-white hover:bg-[#1A202E] text-[9px] font-mono py-2 rounded uppercase font-extrabold transition cursor-pointer"
                      >
                        Initiate full-staged automated login Sequence
                      </button>
                    </div>
                  )}

                  {isPerformingLoginStep === 'STEALTH_CHECK' && (
                    <div className="flex flex-col items-center justify-center text-center py-8 gap-3 font-mono text-[10px]">
                      <RefreshCw className="w-6 h-6 animate-spin text-purple-400" />
                      <div>
                        <span className="text-white font-extrabold uppercase animate-pulse block text-[9.5px]">BYPASSING SECURE SHIELD WALLS</span>
                        <p className="text-[8.2px] text-zinc-500 mt-1 leading-normal max-w-[200px]">Simulating biomechanical delays. Bypassing cloudflare challenge locks via port 3000... (15%)</p>
                      </div>
                      <button 
                        onClick={handleResetLogin}
                        className="mt-2 px-3 py-1 bg-rose-950/20 border border-rose-900/60 text-rose-400 text-[8px] rounded uppercase cursor-pointer hover:bg-rose-900/10"
                      >
                        Cancel sequence
                      </button>
                    </div>
                  )}

                  {isPerformingLoginStep === 'SUBMITTING_CREDENTIALS' && (
                    <div className="flex flex-col items-center justify-center text-center py-8 gap-3 font-mono text-[10px]">
                      <Cpu className="w-7 h-7 text-[#A6E22E] animate-pulse" />
                      <div>
                        <span className="text-[#A6E22E] font-extrabold uppercase animate-pulse block text-[9.5px]">TRANSMITTING SHA-256 REDIRECT</span>
                        <p className="text-[8.2px] text-zinc-500 mt-1 leading-normal">Bypassing browser fingerprints keychains logs securely... (50%)</p>
                      </div>
                      <button 
                        onClick={handleResetLogin}
                        className="mt-2 px-3 py-1 bg-[#11141B] border border-slate-800 text-slate-400 text-[8px] rounded uppercase cursor-pointer hover:text-white"
                      >
                        Cancel sequence
                      </button>
                    </div>
                  )}

                  {isPerformingLoginStep === 'AWAITING_OTP' && (
                    <div className="flex flex-col gap-2 py-1 font-mono text-[10px]">
                      <div className="bg-amber-955/20 border border-amber-900/40 p-2.5 rounded text-[8px] text-amber-400 flex items-start gap-1.5 leading-normal">
                        <Smartphone className="w-3.5 h-3.5 shrink-0 text-[#A6E22E] animate-bounce" />
                        <div>
                          <strong className="block">AWAITING 6-DIGIT EMAIL MFA OTP:</strong>
                          Check chats or input simulated auth token manually.
                        </div>
                      </div>

                      <div className="flex flex-col gap-1 mt-1">
                        <label className="text-zinc-550 font-mono text-[7.5px] uppercase font-bold text-slate-400 block">ENTER DEMO MFA OTP TOKEN: (e.g. 542918)</label>
                        <div className="flex gap-1.5 mt-1">
                          <input
                            type="text"
                            maxLength={6}
                            placeholder="e.g. 542918"
                            value={otpCode}
                            onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                            className="bg-[#11141B] border border-slate-800 text-center flex-1 text-[#A6E22E] px-2 py-1 select-all font-mono font-bold tracking-widest text-[#A6E22E] text-xs outline-none focus:border-[#A6E22E]"
                          />
                          <button
                            type="button"
                            onClick={handleSubmitMFAOTP}
                            className="px-2.5 bg-emerald-650 hover:bg-emerald-600 border border-emerald-700 text-white font-black text-[9px] font-mono rounded uppercase cursor-pointer"
                          >
                            SUBMIT
                          </button>
                        </div>
                      </div>

                      <button 
                        onClick={handleResetLogin}
                        className="text-center text-[8px] text-rose-400 hover:text-white underline block uppercase leading-loose mt-2"
                      >
                        Cancel authorization sequence
                      </button>
                    </div>
                  )}

                  {isPerformingLoginStep === 'SUCCESS_LOGGED_IN' && (
                    <div className="flex flex-col items-center justify-center text-center py-6 gap-2.5 font-mono text-[10px]">
                      <CheckCircle className="w-8 h-8 text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)] animate-bounce" />
                      <div>
                        <span className="text-white font-extrabold uppercase tracking-wide block text-[9.5px]">COOKIE SYNC COMPLETE</span>
                        <p className="text-[8px] text-[#A6E22E] mt-1 font-bold">Stealth Auth cookie synchronizer is fully online.</p>
                      </div>
                      <button
                        type="button"
                        onClick={handleResetLogin}
                        className="mt-2 px-3 py-1 bg-[#151921] border border-slate-800 text-slate-300 text-[8px] font-bold uppercase hover:bg-slate-900 transition rounded"
                      >
                        RESET SYSTEM DISPATCH LATCHES
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* TAB CONTAINER: CHROME DEVTOOLS TERMINAL CONSOLE */}
              {activeBrowserTab === 'DEV_CONSOLE' && (
                <div className="flex flex-col gap-1.5 font-mono text-[8.5px] leading-tight text-white pt-1">
                  <div className="flex justify-between items-center border-b border-slate-900 pb-1.5 text-zinc-500">
                    <span>CONSOLE TERMINAL OUTPUT STREAMS</span>
                    <button 
                      onClick={() => setBrowserConsoleLogs([])}
                      className="text-[7.5px] hover:text-white uppercase font-bold cursor-pointer"
                    >
                      [Clear console]
                    </button>
                  </div>
                  <div className="flex flex-col gap-1 max-h-[175px] overflow-y-auto scrollbar-thin bg-black/40 p-2 rounded-lg border border-slate-900 leading-normal text-slate-300">
                    {browserConsoleLogs.length === 0 ? (
                      <span className="text-zinc-650 italic">[DevTools console is blank. Waiting for incoming telemetry...]</span>
                    ) : (
                      browserConsoleLogs.map((log, idx) => (
                        <div key={idx} className="flex gap-1.5 hover:bg-slate-900/50 py-0.5 border-b border-slate-900/10">
                          <span className="text-blue-500 font-extrabold select-none">›</span>
                          <span className="break-all font-sans select-all">{log}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB CONTAINER: COOKIE INJECTOR AND VAULT */}
              {activeBrowserTab === 'COOKIE_INJECTOR' && (
                <div className="flex flex-col gap-2 pt-1 font-mono text-[9px]">
                  <span className="text-zinc-500 block text-[7.5px] font-bold uppercase tracking-wider">MANUAL OUTSIDE COOKIE SYNCHRONIZER:</span>
                  <textarea
                    rows={2}
                    value={savedCookies}
                    onChange={(e) => setSavedCookies(e.target.value)}
                    placeholder="Paste token=... cookies directly"
                    className="w-full bg-[#11141B] border border-slate-850 p-1.5 rounded font-mono text-[8px] text-slate-200 outline-none focus:border-[#A6E22E] resize-none h-[65px] leading-snug"
                  />
                  <button
                    type="button"
                    onClick={handleSaveCookieSync}
                    className="w-full bg-purple-950 hover:bg-slate-900 border border-purple-900 text-white font-bold py-2 rounded uppercase text-[8px] transition leading-none cursor-pointer"
                  >
                    💾 Inject Cookies to Browser Session Storage
                  </button>
                  <p className="text-[7px] text-zinc-500 leading-normal font-sans mt-0.5">
                    Injecting real authorization cookies mirrors your actual session directly to head-bound Playwright Chromium runners. Secure & local-only storage.
                  </p>
                </div>
              )}

              {/* PROGRESS BOTTOM LOADING STRIP */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-900">
                <div 
                  className="h-full bg-[#A6E22E] transition-all duration-500" 
                  style={{ width: `${loginProgress}%` }}
                />
              </div>

            </div>

            {/* Simulated Proxy / Browser Diagnostics Panel */}
            <div className="bg-[#151921] p-2.5 rounded-lg border border-slate-900 mt-2 flex flex-col gap-1 text-[8.5px] font-mono leading-none">
              <div className="flex justify-between">
                <span className="text-slate-500 uppercase font-black text-[7.5px]">USER-AGENT IDENTIFIER:</span>
                <span className="text-white truncate max-w-[170px] select-all">NeuralTrader/v12.2 (SPOOF)</span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-slate-500 uppercase font-black text-[7.5px]">INGRESS CAPABILITIES:</span>
                <span className="text-emerald-400 font-bold uppercase">100% WAF BYPASS PASSING</span>
              </div>
            </div>

          </div>

          {/* Core active parameters status tracker */}
          <div className="bg-slate-950 p-2 border border-slate-900 rounded font-mono text-[8px] text-center w-full flex justify-between tracking-wide leading-none select-none">
            <span className="text-slate-500">SYSTEM CHROMIUM AGENT CLAW:</span>
            <span className="text-[#A6E22E] font-extrabold uppercase animate-pulse">STEALTH ACTIVE ON INR</span>
          </div>

        </div>

        {/* PANEL LEVEL C: REAL PRACTICE WORKSPACE CHATS CENTER (Col-span 3) */}
        <div className="lg:col-span-3 bg-[#0B0E14] border border-slate-850 p-4 rounded-xl flex flex-col justify-between h-[510px]">
          <div>
            <div className="flex items-center justify-between border-b border-slate-900 pb-2">
              <span className="text-[11px] font-mono font-bold text-slate-300 uppercase tracking-widest flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#A6E22E]" /> Practice society chats channel
              </span>
              <span className="bg-[#11141B] border border-slate-850 px-1 py-0.2 rounded text-[7.5px] text-[#A6E22E] font-bold">
                100% SECURE
              </span>
            </div>

            <p className="text-[10px] text-slate-400 leading-normal font-sans mt-2">
              Exchange active strategies with visual neural automation agents in real time.
            </p>
          </div>

          {/* Chats ledger */}
          <div className="flex-1 bg-slate-950 rounded-lg p-3 border border-slate-901 overflow-y-auto flex flex-col gap-3 my-3 scrollbar-indigo max-h-[300px]">
            {chats.map((chat) => (
              <div 
                key={chat.id}
                className={`flex gap-2 max-w-[95%] items-start ${chat.isUser ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <span className="text-sm shrink-0 bg-[#151921] h-6 w-6 rounded-lg flex items-center justify-center border border-slate-800 select-none">
                  {chat.avatar}
                </span>

                <div className="flex flex-col gap-0.5 leading-tight">
                  <div className={`flex items-baseline gap-1 ${chat.isUser ? 'justify-end' : ''}`}>
                    <span className="text-[8.5px] font-black text-white font-mono">{chat.sender}</span>
                  </div>
                  <div className={`p-2 rounded-lg text-[9px] font-mono leading-normal select-all ${
                    chat.isUser 
                      ? 'bg-[#1F2533] text-indigo-200 border border-indigo-900 rounded-tr-none' 
                      : 'bg-[#11141B] text-slate-300 border border-slate-901 rounded-tl-none'
                  }`}>
                    {chat.message}
                  </div>
                  <span className={`text-[7px] text-zinc-550 mt-0.5 ${chat.isUser ? 'text-right' : ''}`}>
                    {chat.timestamp}
                  </span>
                </div>

              </div>
            ))}
            <div ref={chatsEndRef} />
          </div>

          {/* Interactive input triggers */}
          <div className="flex gap-1.5 border-t border-slate-900 pt-2.5">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handlePostChatMessage()}
              placeholder="Ask delta-claw sentinel about parameters..."
              className="flex-1 bg-slate-950 border border-slate-850 px-2 py-1.5 text-xs rounded outline-none text-slate-200 focus:border-indigo-500 font-sans"
            />
            <button
              onClick={handlePostChatMessage}
              className="bg-[#A6E22E] text-slate-950 hover:bg-opacity-90 font-extrabold px-3 py-1 bg-emerald-500 rounded text-xs transition uppercase flex items-center justify-center cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

      {/* 3. MULTIPLE BOT TILES COMPOUNDING AREA ( Allocations ₹10 each ) */}
      <div className="bg-[#0B0E14] border border-slate-850 p-4 rounded-xl flex flex-col gap-3" id="compounding-bots-dashboard">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-900 pb-2.5 gap-2">
          <div className="flex items-center gap-1.5">
            <Coins className="w-4 h-4 text-[#A6E22E]" />
            <span className="text-[11px] font-mono font-bold text-slate-300 uppercase tracking-widest">
              Practice compounding multiple bot tiles (¥₹10 allocated channels)
            </span>
          </div>

          {/* User Requested: FULL COMPOUNDING 100% PER TRADE CONTROL */}
          <div className="flex items-center gap-2 bg-[#151921] px-2.5 py-1 rounded-md border border-slate-800">
            <span className="text-[8.5px] font-mono font-bold text-slate-400">⚡ FORCE COMPOUND (100% / TRADE) MODE:</span>
            <button
              onClick={() => {
                setIsFullCompoundingActive(!isFullCompoundingActive);
                setBrowserConsoleLogs(prev => [
                  `[STRATEGY] Toggled 100% Compounding Mode: ${!isFullCompoundingActive ? 'ENABLED (100% yield compounding multiplier)' : 'DISABLED (standard 4.8% yield rate)'}`,
                  ...prev
                ]);
              }}
              className={`p-1 px-3 rounded font-mono font-black text-[9px] uppercase leading-none transition cursor-pointer ${isFullCompoundingActive ? 'bg-[#A6E22E] text-slate-950 font-extrabold shadow-sm' : 'bg-slate-950 text-slate-500 border border-slate-900'}`}
            >
              {isFullCompoundingActive ? 'ACTIVE (100% MODE)' : 'STANDARD (4.8%)'}
            </button>
          </div>
        </div>

        <p className="text-[10px] text-slate-400 leading-normal font-sans">
          Practice precision spot-derivatives scales. Under **100% Compounding Force**, bot yield steps multiply by exactly **100% per trade**, doubling allocation sizes at warp speed!
        </p>

        {/* Live Bot grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 mt-1.5">
          {bots.map((bot, idx) => {
            const compoundingRateToUse = isFullCompoundingActive ? 100 : compoundingRate;
            const totalCompoundedVal = bot.state !== 'OFFLINE' 
              ? bot.allocationInr * Math.pow(1 + compoundingRateToUse/100, bot.compoundingCycles) 
              : 0;

            return (
              <div 
                key={bot.coin}
                className={`p-3 rounded-lg border flex flex-col justify-between gap-2.5 font-mono text-[9px] transition leading-none select-all ${
                  bot.state === 'ACTIVE_COMPOUNDING'
                    ? 'bg-emerald-950/15 border-emerald-500/60 text-white'
                    : bot.state === 'SECURED_100_PROFIT'
                    ? 'bg-indigo-950/20 border-purple-550/85 text-white'
                    : 'bg-slate-950/40 border-slate-900 text-slate-500 hover:border-slate-800'
                }`}
              >
                <div className="flex justify-between items-center bg-slate-950/80 p-1 rounded border border-slate-900">
                  <span className="font-extrabold text-[#A6E22E]">{bot.coin}/INR</span>
                  <button
                    onClick={() => handleToggleBot(idx)}
                    className="text-[8px] font-bold hover:text-white uppercase transition leading-none cursor-pointer bg-slate-900 p-1 rounded"
                  >
                    {bot.state === 'OFFLINE' ? 'LAUNCH' : 'HALT'}
                  </button>
                </div>

                <div className="flex flex-col gap-1 tracking-tight">
                  <div className="flex justify-between text-zinc-550 text-[8px]">
                    <span>FUND ALLOC:</span>
                    <span className="text-[#A6E22E] font-bold">₹{bot.allocationInr}</span>
                  </div>
                  <div className="flex justify-between text-zinc-550 text-[8px]">
                    <span>CYCLES COM:</span>
                    <span className="text-white font-bold">{bot.compoundingCycles} steps</span>
                  </div>
                  <div className="flex justify-between text-zinc-550 text-[8px]">
                    <span>YIELD SQUEEZE:</span>
                    <span className="text-emerald-400 font-bold">+{bot.cumulativeYieldPercent}%</span>
                  </div>
                  <div className="flex justify-between text-zinc-550 text-[8px] border-t border-slate-900/40 pt-1 mt-0.5">
                    <span>COMPOUND VAL:</span>
                    <span className="text-amber-300 font-black">₹{totalCompoundedVal > 0 ? totalCompoundedVal.toFixed(2) : '0.00'}</span>
                  </div>
                </div>

                {/* Secure loading progress tracker slider */}
                <div className="w-full bg-slate-950 h-1.5 rounded overflow-hidden border border-slate-900">
                  <div 
                    className="h-full bg-[#A6E22E] transition-all duration-300" 
                    style={{ width: `${Math.min(100, bot.cumulativeYieldPercent / 5)}%` }}
                  />
                </div>

              </div>
            );
          })}
        </div>

        {/* User Requested: ALL COINS MONITORING AND ALERTS AND MOVEMENTS AND WHALEMARKETS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-2">
          
          {/* ALL COINS MONITORING DASHBOARD (Col span 7) */}
          <div className="lg:col-span-7 bg-[#0E121A] p-3 rounded-lg border border-slate-900 flex flex-col gap-2.5">
            <div className="flex justify-between items-center border-b border-slate-900 pb-2">
              <span className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
                <Flame className="w-4 h-4 text-orange-500" /> Live Ticker Monitoring & Whale Activity
              </span>
              <span className="text-[8px] font-mono text-zinc-500">8 MULTI-TILES TRACKED</span>
            </div>

            {/* Price list */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {coinMonitors.map((coin) => (
                <div 
                  key={coin.symbol}
                  onClick={() => {
                    setTradingPair(`${coin.symbol}/INR`);
                    setBrowserConsoleLogs(prev => [`[TICKER SENSING] Shifted active orderbook correlation metrics to: ${coin.symbol}`, ...prev]);
                  }}
                  className={`bg-[#151921]/60 p-2 rounded border cursor-pointer hover:border-slate-700 transition flex flex-col gap-1 font-mono text-[9px] ${tradingPair.startsWith(coin.symbol) ? 'bg-indigo-950/20 border-indigo-500/70' : 'border-slate-900'}`}
                >
                  <div className="flex justify-between items-center leading-none">
                    <span className="font-extrabold text-white text-[10px]">{coin.symbol}</span>
                    <span className={`text-[8px] px-1 rounded uppercase font-black leading-none ${coin.trend === 'UP_RALLY' ? 'bg-[#A6E22E]/10 text-[#A6E22E]' : coin.trend === 'DOWN_SLIDE' ? 'bg-rose-500/10 text-rose-400' : 'bg-slate-800 text-slate-400'}`}>
                      {coin.trend === 'UP_RALLY' ? 'RALLY' : coin.trend === 'DOWN_SLIDE' ? 'SLIDE' : 'HEAL'}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline mt-1">
                    <span className="font-bold text-zinc-300">₹{coin.price.toLocaleString()}</span>
                    <span className={`text-[8px] font-black ${coin.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {coin.change24h >= 0 ? '+' : ''}{coin.change24h}%
                    </span>
                  </div>
                  <div className="flex justify-between text-[7px] text-zinc-550 border-t border-slate-900 pt-1 mt-0.5 leading-none">
                    <span>VOL: ₹{(coin.volumeInr / 10000000).toFixed(1)} Cr</span>
                    <span className={coin.whaleSignal === 'ACCUMULATION' ? 'text-emerald-400 font-extrabold' : coin.whaleSignal === 'LIQUIDATION' ? 'text-rose-400 font-extrabold' : 'text-slate-400'}>
                      {coin.whaleSignal}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* LIVE WHALE ALERTS & MOVEMENTS LOGGER */}
            <div className="bg-slate-950 border border-slate-900 p-2.5 rounded-lg flex flex-col gap-2">
              <span className="text-[7.5px] font-mono font-black text-slate-500 uppercase block tracking-wider">
                🚨 REAL-TIME WHALE MOVEMENT & LIQUIDITY LOGS (INR TELEMETRY STREAMS):
              </span>
              <div className="flex flex-col gap-1.5 max-h-[85px] overflow-y-auto scrollbar-thin font-mono text-[8px] leading-normal text-slate-300">
                {whaleAlerts.map((alert) => (
                  <div 
                    key={alert.id} 
                    className={`p-1.5 rounded bg-[#11141B] border border-slate-900 flex justify-between items-center transition ${alert.alertStatus === 'CRITICAL' ? 'border-l-2 border-l-rose-500' : alert.alertStatus === 'ATTENTION' ? 'border-l-2 border-l-amber-500' : 'border-l-2 border-l-blue-500'}`}
                  >
                    <div className="flex gap-2 items-center">
                      <span className="text-zinc-500 font-black select-none">[{alert.timestamp}]</span>
                      <span className={`p-0.5 px-1 rounded text-[7px] font-extrabold ${alert.type === 'BUY' ? 'bg-emerald-950 text-[#A6E22E]' : alert.type === 'SELL' ? 'bg-rose-950 text-rose-400' : 'bg-slate-900 text-slate-400'}`}>
                        {alert.type}
                      </span>
                      <span className="text-white font-bold leading-none">{alert.coin}/INR</span>
                      <span className="text-zinc-400 font-sans text-[8.5px] leading-none">Dispatched {alert.amount} raw coins ({alert.valueInr})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[7.5px] text-zinc-550 select-all truncate max-w-[80px] pointer-events-none">{alert.source}</span>
                      <span className="text-[7px] p-0.5 px-1 bg-slate-950 border border-slate-900 rounded font-bold text-indigo-400 select-all">{alert.txHash}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* TRENDS & STRATEGIES PANEL (Col span 5) */}
          <div className="lg:col-span-5 bg-[#0E121A] p-3 rounded-lg border border-slate-900 flex flex-col gap-2 justify-between">
            <div>
              <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                <span className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-[#A6E22E]" /> Trends & Pre-Allocated Strategies
                </span>
                <span className="text-[8px] font-mono text-zinc-500">DESKTOP ARM CONTROL</span>
              </div>
              <p className="text-[9px] text-slate-400 leading-normal font-sans mt-1.5">
                Practice specific institutional grade parameters. Activate a strategy row to instantly re-align automated trigger logic & latency offsets:
              </p>

              {/* Strategies Selectors */}
              <div className="flex flex-col gap-2 mt-2 max-h-[145px] overflow-y-auto pr-0.5">
                {tradingStrategies.map((strat, sidx) => {
                  const isSelected = activeStrategyIndex === sidx;
                  return (
                    <div 
                      key={strat.id}
                      onClick={() => {
                        setActiveStrategyIndex(sidx);
                        
                        // Send system chat notification
                        const strategyLog: ChatMessage = {
                          id: `strat-arm-${Date.now()}`,
                          sender: 'Secure-Gate Node',
                          avatar: '🛡️',
                          message: `🤖 ALIGNED SYSTEM STRATEGY PRESET: ${strat.name}. Configured default win probability to [${strat.winRate}] with risk settings level [${strat.risk}].`,
                          timestamp: new Date().toISOString().slice(11, 19),
                          isUser: false,
                          role: 'Automated Strategy Dispatcher'
                        };
                        setChats(prev => [...prev, strategyLog]);

                        // Add to Chrome consoles too!
                        setBrowserConsoleLogs(prev => [
                          `[SECURITY CORE] Strategic preset switched to: ${strat.name}`,
                          `[LATENCY TARGET] Bound click offsets dynamically matching ${strat.botTriggerSpeed}`,
                          ...prev
                        ]);
                      }}
                      className={`p-2 rounded border font-mono text-[9px] cursor-pointer transition flex flex-col gap-1 leading-normal ${isSelected ? 'bg-indigo-950/25 border-[#A6E22E] text-white' : 'bg-[#151921]/50 border-slate-900 text-slate-400 hover:border-slate-800'}`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-extrabold text-white text-[9.5px] leading-tight">{strat.name}</span>
                        <span className={`text-[7px] p-0.5 px-1rounded font-extrabold font-mono ${strat.risk === 'LOW' ? 'bg-emerald-950 text-[#A6E22E]' : strat.risk === 'MAX_FORCE' ? 'bg-rose-950 text-rose-400 font-black animate-pulse' : 'bg-indigo-950 text-indigo-400'}`}>
                          {strat.risk} RISK
                        </span>
                      </div>
                      <p className="text-[8.5px] text-slate-400 font-sans leading-snug">{strat.description}</p>
                      <div className="flex justify-between text-[7.5px] text-zinc-550 border-t border-slate-900/40 pt-1 mt-0.5 font-bold leading-none select-all-none">
                        <span>WIN RATE: <span className="text-[#A6E22E]">{strat.winRate}</span></span>
                        <span>SPEED: <span className="text-orange-400">{strat.botTriggerSpeed}</span></span>
                        <span>CHECK: <span className="text-blue-400">{strat.safetyChecks}</span></span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-slate-950 p-2 border border-slate-900 rounded font-mono text-[8.5px] leading-tight text-zinc-400 text-center mt-2">
              ACTIVE STRATEGY: <span className="text-emerald-400 font-extrabold">{tradingStrategies[activeStrategyIndex]?.name || 'NONE'}</span> is currently <span className="text-[#A6E22E] font-black underline">ARMED & SYNCED</span>
            </div>
          </div>

        </div>

      </div>

      {/* 4. PLAYWRIGHT / PUPPETEER DOM SELECTOR MAPPING INTERFACE */}
      <div className="bg-[#0B0E14] border border-slate-850 p-4 rounded-xl flex flex-col gap-3">
        <div className="flex items-center justify-between border-b border-slate-900 pb-2">
          <span className="text-[11px] font-mono font-bold text-slate-300 uppercase tracking-widest flex items-center gap-1.5">
            <Terminal className="w-4 h-4 text-orange-400 animate-pulse" /> Playwright DOM locator mapping sandbox
          </span>
          <span className="text-[8px] font-mono text-zinc-550">STEALTH_COMPACT</span>
        </div>

        <p className="text-[10px] text-slate-400 leading-normal font-sans">
          Verify target paths dynamically. The emulated Playwright javascript updates automatically matching selectors & synced GSuite parameters.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-1.0">
          
          {/* DOM Selectors Map */}
          <div className="lg:col-span-5 bg-slate-950 p-3 rounded-lg border border-slate-900 flex flex-col gap-2 justify-between">
            <span className="text-[8px] font-mono text-zinc-500 uppercase font-black block">VISUAL ELEMENT MAPPING NODE CODES:</span>
            
            <div className="flex flex-col gap-1.5 max-h-[160px] overflow-y-auto pr-1">
              {domTargetElements.map((elem) => {
                const isSelected = selectedDomElement.id === elem.id;
                return (
                  <div
                    key={elem.id}
                    onClick={() => setSelectedDomElement(elem)}
                    className={`p-2 rounded border font-mono text-[9px] cursor-pointer transition flex justify-between items-center ${
                      isSelected 
                        ? 'bg-indigo-950/25 border-indigo-500/80 text-[#A6E22E]' 
                        : 'bg-[#151921]/60 border-slate-900 text-slate-400 hover:border-slate-800'
                    }`}
                  >
                    <span>{elem.label}</span>
                    <span className="text-[8px] p-0.5 px-1 bg-slate-950 rounded border border-slate-900 text-slate-300 select-all leading-none">{elem.selector}</span>
                  </div>
                );
              })}
            </div>

            {/* Custom inputs */}
            <div className="flex gap-1.5 border-t border-slate-900 pt-2 font-mono text-[9px]">
              <input
                type="text"
                placeholder="button.submit-grid-layer"
                value={customSelector}
                onChange={(e) => setCustomSelector(e.target.value)}
                className="bg-[#11141B] border border-slate-850 px-2 py-1 text-slate-205 text-[9px] rounded flex-1 outline-none"
              />
              <button
                onClick={handleInjectCustomDom}
                className="px-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded font-bold text-white uppercase text-[8px] cursor-pointer leading-none"
              >
                + BIND LOCATOR
              </button>
            </div>

          </div>

          {/* Compiled Playwright Script Code Box (Col span 7) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-3 font-mono text-[9.5px]">
            <div className="bg-[#151921]/60 p-3 border border-slate-900 rounded-lg flex flex-col gap-1.5">
              <span className="text-zinc-550 block text-[8px] uppercase font-bold text-slate-305 leading-none">TARGET AUTOMATION METRICS:</span>
              <div className="flex justify-between items-center font-bold text-white leading-none text-[10px] mt-0.5">
                <span>{selectedDomElement.label}</span>
                <span className="text-indigo-400 select-all font-mono">{selectedDomElement.selector}</span>
              </div>
              <p className="text-slate-400 font-sans text-[9px] leading-relaxed mt-1">{selectedDomElement.actionCodeDescription}</p>
              <div className="text-slate-500 font-mono text-[8px] uppercase mt-0.5 flex justify-between select-all leading-none">
                <span>XPATH PATTERN INJECTED:</span>
                <span className="text-orange-400 font-extrabold">{selectedDomElement.xpath}</span>
              </div>
            </div>

            {/* Auto generating compiler script */}
            <div className="bg-slate-950 border border-slate-900 p-3 rounded-lg relative overflow-y-auto max-h-[140px] leading-normal font-mono text-[8.5px] select-all text-slate-350 whitespace-pre">
{`/**
 * Playwright Multi-Claw Automation Script for Practice Arena
 * Compiled dynamic selector targets: ${selectedDomElement.label}
 */
const { chromium } = require('playwright-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

async function testCompoundingDemoLoop() {
  console.log('[STEALTH ENGINE] Initializing secure chromium process...');
  const browser = await chromium.launch({ headless: true });
  
  // Syng authentication cookie variables:
  const cookieString = "${savedCookies.replace(/"/g, '\\"').substring(0, 100)}...";
  const context = await browser.newContext({ 
    userAgent: 'NeuralTrader/Gemma4',
    viewport: { width: 1280, height: 720 }
  });
  
  const page = await context.newPage();
  await page.goto('https://pi42.com/trading');

  // Resolved dynamic selectors with bio mouse delays
  console.log('Resolving element handle coordinates: ${selectedDomElement.selector}');
  await page.waitForSelector('${selectedDomElement.selector}', { timeout: 5000 });
  await page.hover('${selectedDomElement.selector}');
  await page.click('${selectedDomElement.selector}');

  console.log('[DEMO REINVESTMENT] Successfully dispatched compounding order index ₹10.');
  await browser.close();
}
testCompoundingDemoLoop();`}
              <div className="absolute top-1 right-2 bg-slate-900 text-slate-500 border border-slate-800 px-1 py-0.2 rounded font-black text-[7px] select-none tracking-widest leading-loose">
                PLAYWRIGHT EMULATION CODE
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
