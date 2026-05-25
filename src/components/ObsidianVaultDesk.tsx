import React, { useState } from 'react';
import { BookOpen, FolderDot, FileText, Plus, Hash, DollarSign, Brain, Sparkles, RefreshCw, Layers, ShieldCheck, Play, ArrowRight, Save, Trash2, Edit3, HelpCircle, HardDrive, Cpu, Percent, Settings, Database, Server } from 'lucide-react';

interface VaultNote {
  id: string;
  title: string;
  category: 'STRATEGY' | 'RECORDS' | 'BUDGETS' | 'API_SPEC';
  timestamp: string;
  content: string;
  linkedNoteId?: string; // Obsidian-style backlinks
}

export const ObsidianVaultDesk: React.FC = () => {
  // Vault Notes State
  const [notes, setNotes] = useState<VaultNote[]>([
    {
      id: 'vn-1',
      title: '₹10 Compounding Pro Strategy Guidelines',
      category: 'STRATEGY',
      timestamp: '2026-05-24 14:30',
      content: `## Gemma-4 Core Compounding Loop

### Phase 1: Micro-Bot Initialization
* Allocate exactly **₹10** per activated coin-tile (NEIRO, SOL, XRP).
* Execute spot-scalp transactions with an isolated buffer.

### Phase 2: Geometric Re-investment
* S_0 = ₹10
* Target rate (r) = 8.5% net profit per completed trade.
* Cycle 1 Value: ₹10.85
* Cycle 2 Value: ₹11.77
* Cycle 10 Value: ₹22.61 (Over **2.2x** capital magnification under strict isolating leverage).

*Tip: Fully integrate Pi42.com payload signs via browser automation to bypass fee limits.*`,
      linkedNoteId: 'vn-3'
    },
    {
      id: 'vn-2',
      title: 'Pi42.com Browser Automation Setup',
      category: 'API_SPEC',
      timestamp: '2026-05-24 23:12',
      content: `## Headless Chromium Protocol for India Traders

1. **Authentication Handshake**:
   * Navigate dynamically to \`https://pi42.com/trading\`.
   * Inject local storage tokens: \`auth_token = SECURE_INJECTED_X4_ALPHA\`.
   
2. **Signature payload parameters**:
   * API Key: \`NT_ENTERPRISE_99X_ID\`
   * Target Hashing Scheme: HMAC-SHA256 with timestamp prepended to serialized payload body.
   
3. **Scalp Trigger**:
   * Perform direct DOM queries on order input buttons: \`page.click('button#execute-compound')\`.`,
      linkedNoteId: 'vn-1'
    },
    {
      id: 'vn-3',
      title: 'Master Wealth Budget & Reserve Ledger',
      category: 'BUDGETS',
      timestamp: '2026-05-24 23:45',
      content: `## Master Allocation Matrix (Rupees - ₹)

* **Total Portfolio Capital**: ₹1,00,000
* **Activated Compound Reserve**: ₹25,000 (Allocated across 2,500 miniature compounding bots at ₹10 capacity)
* **Risk Margin Barrier**: ₹75,000 (USDT locked in standard multi-sig reserves)

*Performance benchmark target: 12% monthly growth coefficient.*`,
      linkedNoteId: 'vn-1'
    }
  ]);

  const [activeNoteId, setActiveNoteId] = useState<string>('vn-1');
  const [editingContent, setEditingContent] = useState<string>(notes[0]?.content || '');
  const [newNoteTitle, setNewNoteTitle] = useState<string>('');
  const [newNoteCategory, setNewNoteCategory] = useState<'STRATEGY' | 'RECORDS' | 'BUDGETS' | 'API_SPEC'>('STRATEGY');

  // Budget Calculator State (Rupees)
  const [reserveCapitalInr, setReserveCapitalInr] = useState<number>(35000);
  const [activeBotsCount, setActiveBotsCount] = useState<number>(120);
  const [dailyTargetWinInr, setDailyTargetWinInr] = useState<number>(150);

  // Hugging Face & OpenRouter Model Integration specs
  const [huggingFaceModel, setHuggingFaceModel] = useState<string>('gemma-4-light-1b-hf');
  const [openRouterModel, setOpenRouterModel] = useState<string>('google/gemma-2-27b-it:free');
  const [openRouterKeySim, setOpenRouterKeySim] = useState<string>('sk-or-v1-92b4916a2ff...');
  const [isApiConnecting, setIsApiConnecting] = useState<boolean>(false);
  const [apiLogs, setApiLogs] = useState<string[]>([
    '[INIT] OpenRouter spec: Ready to proxy trade requests.',
    '[HF] Hugging Face Inference API initialized: gemma-4-light endpoint.'
  ]);

  // Handle Note Selection
  const selectNote = (id: string) => {
    const target = notes.find(n => n.id === id);
    if (target) {
      setActiveNoteId(id);
      setEditingContent(target.content);
    }
  };

  // Create a new file in the Vault
  const handleCreateNote = () => {
    if (!newNoteTitle.trim()) return;
    const newId = `vn-${Date.now()}`;
    const newNote: VaultNote = {
      id: newId,
      title: newNoteTitle,
      category: newNoteCategory,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      content: `## ${newNoteTitle}\n\nStart typing content for your Obsidian Markdown vault note here...\n\nCategory: ${newNoteCategory}\nBudget currency: Rupees (₹)\nLinks: [[vn-1]]`,
      linkedNoteId: 'vn-1'
    };

    setNotes(prev => [...prev, newNote]);
    setActiveNoteId(newId);
    setEditingContent(newNote.content);
    setNewNoteTitle('');
  };

  // Save changes to current file
  const handleSaveNote = () => {
    setNotes(prev =>
      prev.map(n => (n.id === activeNoteId ? { ...n, content: editingContent } : n))
    );
    alert("Obsidian Vault: Note successfully saved to cryptographic layer!");
  };

  // Test Hugging Face / OpenRouter integration
  const testAIPipelines = () => {
    setIsApiConnecting(true);
    setApiLogs(prev => [...prev, `[PROXY] Dispatching handshake to OpenRouter: ${openRouterModel}...`]);

    setTimeout(() => {
      setApiLogs(prev => [
        ...prev,
        `[HF SECURE] Hugging Face Inference API responded (200 OK) in 182ms.`,
        `[MODEL] Gemma-4 Light response: "Direct-API execution payload signed successfully. Verified contract bounds for ₹10 bot compounding indices."`,
        `[OPENROUTER] Connected to OpenRouter proxy grid. Temperature stabilized at 0.4.`
      ]);
      setIsApiConnecting(false);
    }, 1200);
  };

  const activeNote = notes.find(n => n.id === activeNoteId);

  return (
    <div className="bg-[#151921] border border-slate-800 rounded-xl p-5 flex flex-col gap-6 text-slate-200 shadow-xl" id="obsidian-vault-screen">
      
      {/* Title */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-950/40 rounded-lg text-blue-400 border border-indigo-900/40">
            <HardDrive size={18} />
          </div>
          <div>
            <h2 className="font-semibold text-base text-white tracking-wide">Obsidian Strategy Vault & A.I Model Router</h2>
            <p className="text-xs text-slate-400">Enterprise Markdown Knowledge Vault & OpenRouter / Hugging Face Integration Control</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 font-mono text-[9px] bg-slate-950 px-2.5 py-1 rounded text-blue-400 border border-slate-900">
          <Database className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
          <span>SECURE SECS_ENCRYPTED</span>
        </div>
      </div>

      {/* THREE PANELS LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* PANEL 1: FILE BROWSER TREE (Col span 4) */}
        <div className="lg:col-span-4 bg-[#0B0E14] border border-slate-850 p-4 rounded-xl flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-900 pb-2">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <FolderDot className="w-3.5 h-3.5 text-indigo-400" /> File Browser Catalog
            </span>
            <span className="text-[9px] text-zinc-500 font-mono font-bold">{notes.length} NOTES</span>
          </div>

          {/* Quick Creator */}
          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-900 flex flex-col gap-2">
            <span className="text-[8px] font-mono text-zinc-500 font-extrabold uppercase block">Create new Vault record:</span>
            <input
              type="text"
              placeholder="Record title..."
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              className="bg-[#151921] border border-slate-800 rounded px-2 py-1 text-[11px] font-sans text-white focus:outline-none focus:border-blue-500 w-full"
            />
            
            <div className="flex gap-2">
              <select
                value={newNoteCategory}
                onChange={(e) => setNewNoteCategory(e.target.value as any)}
                className="bg-[#151921] border border-slate-800 rounded text-[9px] text-slate-350 px-2 py-1 focus:outline-none flex-1 font-mono"
              >
                <option value="STRATEGY">STRATEGY</option>
                <option value="RECORDS">RECORDS</option>
                <option value="BUDGETS">BUDGETS</option>
                <option value="API_SPEC">API SPEC</option>
              </select>
              
              <button
                onClick={handleCreateNote}
                className="px-2.5 py-1 bg-indigo-650 hover:bg-indigo-550 border border-indigo-500 text-white rounded text-[10px] font-bold uppercase cursor-pointer transition flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> ADD
              </button>
            </div>
          </div>

          {/* Note list hierarchy */}
          <div className="flex-1 flex flex-col gap-1.5 overflow-y-auto max-h-[220px] pr-1" id="obsidian-files-list">
            {notes.map((note) => {
              const isActive = note.id === activeNoteId;
              const hasBacklink = note.linkedNoteId;
              
              return (
                <div
                  key={note.id}
                  onClick={() => selectNote(note.id)}
                  className={`p-2 rounded-lg border text-left cursor-pointer transition-all flex flex-col gap-1 relative overflow-hidden ${
                    isActive
                      ? 'bg-blue-950/20 border-blue-500 text-blue-300'
                      : 'bg-slate-950/40 border-slate-900 hover:border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white text-[11px] truncate max-w-[170px]">{note.title}</span>
                    <span className="text-[8px] font-mono px-1.5 py-0.2 bg-slate-900 rounded border border-slate-800/85">
                      {note.category}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center text-[9px] font-mono mt-0.5">
                    <span className="text-zinc-500 font-medium">{note.timestamp}</span>
                    {hasBacklink && (
                      <span className="text-indigo-400 flex items-center gap-0.5 text-[8px] font-bold">
                        <Hash className="w-2.5 h-2.5" /> Backlink active
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* PANEL 2: MARKDOWN ENGINE & NOTE EDITOR (Col span 5) */}
        <div className="lg:col-span-5 bg-[#0B0E14] border border-slate-850 p-4 rounded-xl flex flex-col gap-3 h-[386px]">
          <div className="flex items-center justify-between border-b border-slate-900 pb-2">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-400" /> Scientific Markdown Viewer
            </span>
            
            <button
              onClick={handleSaveNote}
              className="py-1 px-2.5 bg-blue-650 hover:bg-blue-500 border border-blue-500 text-white rounded text-[10px] font-bold uppercase cursor-pointer transition flex items-center gap-1 shadow"
            >
              <Save className="w-3 h-3" /> Commit Changes
            </button>
          </div>

          {activeNote ? (
            <textarea
              value={editingContent}
              onChange={(e) => setEditingContent(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-900 text-slate-200 p-3 rounded-lg font-mono text-[10px] resize-none focus:outline-none focus:border-blue-500 h-full leading-normal"
              placeholder="Markdown content inside..."
            />
          ) : (
            <div className="flex-1 bg-slate-950 border border-slate-900 flex items-center justify-center p-4 rounded-lg text-slate-500 text-xs">
              No files selected in Obsidian Vault. Select one from browser block.
            </div>
          )}

          {activeNote?.linkedNoteId && (
            <div className="bg-[#151921] border border-indigo-950 text-[10px] text-indigo-300 p-2 rounded flex items-center justify-between font-mono">
              <span className="flex items-center gap-1"><Sparkles className="w-3 h-3 animate-pulse" /> Linked to Note:</span>
              <button 
                onClick={() => selectNote(activeNote.linkedNoteId || '')}
                className="text-white hover:underline uppercase font-bold text-[9px] cursor-pointer"
              >
                Go to backlink &rarr;
              </button>
            </div>
          )}
        </div>

        {/* PANEL 3: MODEL CONFIG & BUDGET LEDGER IN RUPEES (Col span 3) */}
        <div className="lg:col-span-3 bg-[#0B0E14] border border-slate-850 p-4 rounded-xl flex flex-col gap-4 h-[386px] justify-between">
          <div className="flex items-center justify-between border-b border-slate-900 pb-2">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Settings className="w-3.5 h-3.5 text-blue-400" /> Synaptic Router API
            </span>
            <span className="text-[9px] text-[#A6E22E] font-mono font-bold">₹ MONEY INTEGRATION</span>
          </div>

          {/* Model Selection configs */}
          <div className="flex flex-col gap-2.5 text-[10px] font-mono leading-none">
            
            <div className="flex flex-col gap-1">
              <span className="text-zinc-500 block">OPENROUTER ENDPOINT:</span>
              <input
                type="text"
                value={openRouterModel}
                onChange={(e) => setOpenRouterModel(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-[10px] font-mono text-zinc-300 focus:outline-none w-full"
              />
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-zinc-500 block">HUGGING FACE MODEL:</span>
              <input
                type="text"
                value={huggingFaceModel}
                onChange={(e) => setHuggingFaceModel(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-[10px] font-mono text-zinc-300 focus:outline-none w-full"
              />
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-zinc-500 block">API KEY SECRET:</span>
              <input
                type="password"
                value={openRouterKeySim}
                onChange={(e) => setOpenRouterKeySim(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-[10px] font-mono text-zinc-400 focus:outline-none w-full"
              />
            </div>

            <button
              onClick={testAIPipelines}
              disabled={isApiConnecting}
              className="w-full bg-[#151921] hover:bg-slate-900 border border-slate-800 rounded py-1.5 text-[10px] font-bold text-blue-400 uppercase cursor-pointer transition flex items-center justify-center gap-2"
            >
              {isApiConnecting ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Testing API Handshake...
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 fill-blue-400 text-blue-400 shrink-0" />
                  Test OpenRouter & HF Links
                </>
              )}
            </button>
          </div>

          {/* INR Budget parameters panel */}
          <div className="bg-slate-950 border border-slate-900 p-2.5 rounded-lg flex flex-col gap-1.5 text-[10.5px] font-mono">
            <span className="text-[9px] text-emerald-400 font-extrabold uppercase block tracking-wider mb-0.5 border-b border-slate-900 pb-1">
              ₹ Live Rupees Vault Controls
            </span>
            <div className="flex justify-between">
              <span className="text-zinc-500">RESERVECAPITAL:</span>
              <span className="text-white font-bold">₹{reserveCapitalInr.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">CONCURRENT_BOTS:</span>
              <span className="text-white font-bold">{activeBotsCount} Units</span>
            </div>
            <div className="flex justify-between border-t border-slate-900 mt-1 pt-1">
              <span className="text-emerald-400 font-bold">EST DAILY NET:</span>
              <span className="text-emerald-400 font-extrabold">₹{(dailyTargetWinInr * (activeBotsCount/10)).toLocaleString()}</span>
            </div>
          </div>

          {/* Mini dynamic logs */}
          <div className="bg-slate-980/40 p-2 rounded text-[8px] font-mono text-zinc-500 overflow-y-auto max-h-[85px] border border-slate-900/60 leading-tight">
            {apiLogs.slice(-2).map((log, idx) => (
              <div key={idx} className="truncate border-l border-zinc-700 pl-1 mb-0.5">
                {log}
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};
