import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart, 
  Activity, 
  ArrowUpRight, 
  CheckCircle2, 
  Layers 
} from 'lucide-react';

export const StockTrailShowcase = () => {
  const [holdings, setHoldings] = useState([
    { ticker: 'TCS', name: 'Tata Consultancy Services', sector: 'IT', buyPrice: 3820, currentPrice: 4120, shares: 15 },
    { ticker: 'INFY', name: 'Infosys Limited', sector: 'IT', buyPrice: 1480, currentPrice: 1590, shares: 35 },
    { ticker: 'RELIANCE', name: 'Reliance Industries', sector: 'Energy', buyPrice: 2850, currentPrice: 2980, shares: 20 },
    { ticker: 'HDFCBANK', name: 'HDFC Bank Ltd', sector: 'Banking', buyPrice: 1650, currentPrice: 1680, shares: 30 }
  ]);

  const updateShares = (ticker, delta) => {
    setHoldings(prev =>
      prev.map(h => {
        if (h.ticker !== ticker) return h;
        return { ...h, shares: Math.max(1, h.shares + delta) };
      })
    );
  };

  const totalInvested = holdings.reduce((sum, h) => sum + h.buyPrice * h.shares, 0);
  const currentTotal = holdings.reduce((sum, h) => sum + h.currentPrice * h.shares, 0);
  const netPnL = currentTotal - totalInvested;
  const netPnLPct = +((netPnL / totalInvested) * 100).toFixed(2);

  return (
    <div className="rounded-3xl glass-card border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/60 dark:border-slate-800/60 pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5" /> Quantitative Portfolio Management
          </span>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            StockTrail Real-Time P&L & Asset Allocation Engine
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-xl border border-emerald-500/20 font-bold">
          <ArrowUpRight className="w-4 h-4" /> Live Market Feed Active
        </div>
      </div>

      {/* Portfolio Top Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
          <span className="text-slate-500 text-xs font-medium">Total Current Valuation</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1 font-mono">
            ₹{currentTotal.toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-slate-400">Invested: ₹{totalInvested.toLocaleString('en-IN')}</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
          <span className="text-slate-500 text-xs font-medium">Unrealized Net P&L</span>
          <div className={`text-xl sm:text-2xl font-black mt-1 font-mono ${netPnL >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
            {netPnL >= 0 ? '+' : ''}₹{netPnL.toLocaleString('en-IN')}
          </div>
          <span className={`text-[10px] font-bold ${netPnL >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
            {netPnLPct >= 0 ? '+' : ''}{netPnLPct}% Overall Return
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
          <span className="text-slate-500 text-xs font-medium">Holdings Breakdown</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1 font-mono">
            {holdings.length} Equities
          </div>
          <span className="text-[10px] text-slate-400">Sectors: IT (68%), Energy (18%), Bank (14%)</span>
        </div>
      </div>

      {/* Holdings Interactive Table */}
      <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase bg-slate-100/50 dark:bg-slate-800/40 font-mono">
              <th className="p-3.5">Ticker / Company</th>
              <th className="p-3.5">Sector</th>
              <th className="p-3.5">Avg Buy Price</th>
              <th className="p-3.5">Current Market Price</th>
              <th className="p-3.5">Quantity (Lots)</th>
              <th className="p-3.5 text-right">Unrealized Gain/Loss</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {holdings.map(h => {
              const invested = h.buyPrice * h.shares;
              const current = h.currentPrice * h.shares;
              const pnl = current - invested;
              const pnlPct = +((pnl / invested) * 100).toFixed(2);
              const isProfit = pnl >= 0;

              return (
                <tr key={h.ticker} className="hover:bg-slate-100/40 dark:hover:bg-slate-800/40 transition">
                  <td className="p-3.5">
                    <span className="font-bold text-slate-900 dark:text-white">{h.ticker}</span>
                    <span className="text-[11px] text-slate-400 block">{h.name}</span>
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {h.sector}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono text-slate-600 dark:text-slate-300">₹{h.buyPrice}</td>
                  <td className="p-3.5 font-mono font-bold text-slate-900 dark:text-white">₹{h.currentPrice}</td>
                  <td className="p-3.5">
                    <div className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 px-2 py-1 rounded-xl border border-slate-200 dark:border-slate-700">
                      <button
                        onClick={() => updateShares(h.ticker, -5)}
                        className="text-slate-400 hover:text-rose-500 font-bold px-1"
                      >
                        -
                      </button>
                      <span className="font-mono font-bold w-6 text-center">{h.shares}</span>
                      <button
                        onClick={() => updateShares(h.ticker, 5)}
                        className="text-slate-400 hover:text-emerald-500 font-bold px-1"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="p-3.5 text-right font-mono font-bold">
                    <div className={isProfit ? 'text-emerald-500' : 'text-rose-500'}>
                      {isProfit ? '+' : ''}₹{pnl.toLocaleString('en-IN')}
                    </div>
                    <span className={`text-[10px] ${isProfit ? 'text-emerald-500' : 'text-rose-500'}`}>
                      ({isProfit ? '+' : ''}{pnlPct}%)
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
