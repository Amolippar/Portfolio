import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart, 
  Plus, 
  ArrowUpRight, 
  ArrowDownRight, 
  Search, 
  CheckCircle2, 
  Wallet, 
  BarChart3,
  X,
  RefreshCw,
  SlidersHorizontal
} from 'lucide-react';
import { DemoAppHeader } from './DemoAppHeader';

const INITIAL_HOLDINGS = [
  { symbol: "TCS", name: "Tata Consultancy Services", shares: 45, avgPrice: 3520, cmp: 3980, sector: "Technology", currency: "INR" },
  { symbol: "RELIANCE", name: "Reliance Industries Ltd", shares: 60, avgPrice: 2450, cmp: 2940, sector: "Energy", currency: "INR" },
  { symbol: "HDFCBANK", name: "HDFC Bank Ltd", shares: 120, avgPrice: 1480, cmp: 1625, sector: "Banking", currency: "INR" },
  { symbol: "TATAMOTORS", name: "Tata Motors Commercial", shares: 150, avgPrice: 620, cmp: 980, sector: "Automotive", currency: "INR" },
  { symbol: "INFY", name: "Infosys Technologies", shares: 80, avgPrice: 1410, cmp: 1610, sector: "Technology", currency: "INR" },
];

export const StockTrailDemo = () => {
  const [cashBalance, setCashBalance] = useState(145000);
  const [holdings, setHoldings] = useState(INITIAL_HOLDINGS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStockForTrade, setSelectedStockForTrade] = useState(null);
  const [tradeType, setTradeType] = useState('BUY'); // 'BUY' or 'SELL'
  const [tradeShares, setTradeShares] = useState(10);
  const [tradeToast, setTradeToast] = useState(null);

  // Compute portfolio KPIs
  const totalInvested = holdings.reduce((sum, item) => sum + (item.shares * item.avgPrice), 0);
  const currentPortfolioValue = holdings.reduce((sum, item) => sum + (item.shares * item.cmp), 0);
  const totalPnL = currentPortfolioValue - totalInvested;
  const pnlPercent = totalInvested > 0 ? (totalPnL / totalInvested) * 100 : 0;
  const netWorth = currentPortfolioValue + cashBalance;

  // Filtered holdings
  const filteredHoldings = holdings.filter(h => 
    h.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.sector.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExecuteTrade = (e) => {
    e.preventDefault();
    if (!selectedStockForTrade) return;

    const qty = parseInt(tradeShares, 10);
    if (isNaN(qty) || qty <= 0) return;

    const stock = selectedStockForTrade;
    const tradeTotal = qty * stock.cmp;

    if (tradeType === 'BUY') {
      if (tradeTotal > cashBalance) {
        alert("Insufficient cash balance for this transaction!");
        return;
      }
      setCashBalance(prev => prev - tradeTotal);
      setHoldings(prev => {
        const existing = prev.find(h => h.symbol === stock.symbol);
        if (existing) {
          const newShares = existing.shares + qty;
          const newAvgPrice = Math.round(((existing.shares * existing.avgPrice) + tradeTotal) / newShares);
          return prev.map(h => h.symbol === stock.symbol ? { ...h, shares: newShares, avgPrice: newAvgPrice } : h);
        } else {
          return [...prev, { ...stock, shares: qty, avgPrice: stock.cmp }];
        }
      });
      setTradeToast(`Successfully bought ${qty} shares of ${stock.symbol} @ ₹${stock.cmp}`);
    } else {
      // SELL
      const existing = holdings.find(h => h.symbol === stock.symbol);
      if (!existing || existing.shares < qty) {
        alert("Cannot sell more shares than currently owned!");
        return;
      }
      setCashBalance(prev => prev + tradeTotal);
      setHoldings(prev => {
        return prev.map(h => {
          if (h.symbol === stock.symbol) {
            return { ...h, shares: h.shares - qty };
          }
          return h;
        }).filter(h => h.shares > 0);
      });
      setTradeToast(`Successfully sold ${qty} shares of ${stock.symbol} @ ₹${stock.cmp}`);
    }

    setSelectedStockForTrade(null);
    setTimeout(() => setTradeToast(null), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col">
      <DemoAppHeader
        appName="StockTrail"
        appTagline="Personal Finance & Portfolio Asset Tracker"
        githubUrl="https://github.com/Amolippar/stocktrail-main"
        detailsSlug="stocktrail"
      />

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Live Ticker Bar */}
        <div className="overflow-x-auto bg-slate-900/80 border border-slate-800/80 rounded-2xl p-3 flex items-center gap-6 text-xs font-semibold backdrop-blur-md">
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold uppercase tracking-wider pl-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>NSE Live</span>
          </div>
          <div className="flex items-center gap-6 whitespace-nowrap">
            <div className="flex items-center gap-2">
              <span className="text-slate-300">NIFTY 50:</span>
              <span className="text-white font-bold">24,852.15</span>
              <span className="text-emerald-400 flex items-center text-[11px]"><ArrowUpRight className="w-3 h-3" />+0.64%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-300">SENSEX:</span>
              <span className="text-white font-bold">81,420.30</span>
              <span className="text-emerald-400 flex items-center text-[11px]"><ArrowUpRight className="w-3 h-3" />+0.58%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-300">TCS:</span>
              <span className="text-white font-bold">₹3,980.00</span>
              <span className="text-emerald-400 flex items-center text-[11px]"><ArrowUpRight className="w-3 h-3" />+1.2%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-300">RELIANCE:</span>
              <span className="text-white font-bold">₹2,940.00</span>
              <span className="text-emerald-400 flex items-center text-[11px]"><ArrowUpRight className="w-3 h-3" />+0.8%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-300">TATAMOTORS:</span>
              <span className="text-white font-bold">₹980.00</span>
              <span className="text-emerald-400 flex items-center text-[11px]"><ArrowUpRight className="w-3 h-3" />+2.4%</span>
            </div>
          </div>
        </div>

        {/* Portfolio KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase">
              <span>Total Net Worth</span>
              <Wallet className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="mt-2">
              <div className="text-2xl font-black text-white">₹{netWorth.toLocaleString('en-IN')}</div>
              <span className="text-xs text-slate-400 mt-0.5 block">Assets + Available Cash</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase">
              <span>Holdings Current Value</span>
              <BarChart3 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="mt-2">
              <div className="text-2xl font-black text-white">₹{currentPortfolioValue.toLocaleString('en-IN')}</div>
              <span className="text-xs text-slate-400 mt-0.5 block">Invested: ₹{totalInvested.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase">
              <span>Total Profit / Loss</span>
              {totalPnL >= 0 ? (
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              ) : (
                <TrendingDown className="w-4 h-4 text-rose-400" />
              )}
            </div>
            <div className="mt-2">
              <div className={`text-2xl font-black flex items-center gap-1.5 ${totalPnL >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                <span>{totalPnL >= 0 ? '+' : ''}₹{totalPnL.toLocaleString('en-IN')}</span>
              </div>
              <span className={`text-xs font-bold ${totalPnL >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {totalPnL >= 0 ? '+' : ''}{pnlPercent.toFixed(2)}% overall return
              </span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase">
              <span>Available Cash</span>
              <DollarSign className="w-4 h-4 text-amber-400" />
            </div>
            <div className="mt-2">
              <div className="text-2xl font-black text-white">₹{cashBalance.toLocaleString('en-IN')}</div>
              <span className="text-xs text-slate-400 mt-0.5 block">Instant buying liquidity</span>
            </div>
          </div>
        </div>

        {/* Action Toast */}
        {tradeToast && (
          <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-between gap-3 text-emerald-400 text-sm font-semibold animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <span>{tradeToast}</span>
            </div>
            <button onClick={() => setTradeToast(null)} className="text-emerald-400/80 hover:text-emerald-400">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Holdings Directory & Trade Interface */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="p-5 border-b border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Equity Holdings</span>
                <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-xs font-semibold">
                  {holdings.length} stocks
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Real-time ledger and instant simulated order execution.</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter holdings..."
                  className="bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                onClick={() => {
                  setSelectedStockForTrade(holdings[0]);
                  setTradeType('BUY');
                }}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5 whitespace-nowrap"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Quick Trade</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/50 text-slate-400 uppercase font-semibold border-b border-slate-800 text-[11px]">
                <tr>
                  <th className="py-3 px-4">Instrument</th>
                  <th className="py-3 px-4">Qty</th>
                  <th className="py-3 px-4">Avg Buy Price</th>
                  <th className="py-3 px-4">CMP</th>
                  <th className="py-3 px-4">Current Value</th>
                  <th className="py-3 px-4">P&L</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {filteredHoldings.map((stock) => {
                  const currentValue = stock.shares * stock.cmp;
                  const investedValue = stock.shares * stock.avgPrice;
                  const profit = currentValue - investedValue;
                  const returnPct = investedValue > 0 ? (profit / investedValue) * 100 : 0;

                  return (
                    <tr key={stock.symbol} className="hover:bg-slate-800/40 transition">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white text-sm">{stock.symbol}</div>
                        <div className="text-[11px] text-slate-400">{stock.name} • {stock.sector}</div>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-200">{stock.shares}</td>
                      <td className="py-3.5 px-4 text-slate-300">₹{stock.avgPrice.toLocaleString('en-IN')}</td>
                      <td className="py-3.5 px-4 font-bold text-white">₹{stock.cmp.toLocaleString('en-IN')}</td>
                      <td className="py-3.5 px-4 font-bold text-slate-200">₹{currentValue.toLocaleString('en-IN')}</td>
                      <td className="py-3.5 px-4">
                        <div className={`font-bold ${profit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {profit >= 0 ? '+' : ''}₹{profit.toLocaleString('en-IN')}
                        </div>
                        <div className={`text-[11px] ${profit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {profit >= 0 ? '+' : ''}{returnPct.toFixed(2)}%
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              setSelectedStockForTrade(stock);
                              setTradeType('BUY');
                            }}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 font-bold border border-emerald-500/30 transition"
                          >
                            Buy
                          </button>
                          <button
                            onClick={() => {
                              setSelectedStockForTrade(stock);
                              setTradeType('SELL');
                            }}
                            className="px-2.5 py-1 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 font-bold border border-rose-500/30 transition"
                          >
                            Sell
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Trade Execution Modal */}
      <AnimatePresence>
        {selectedStockForTrade && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-white">Execute Equity Order</h3>
                  <p className="text-xs text-slate-400">{selectedStockForTrade.symbol} • CMP: ₹{selectedStockForTrade.cmp}</p>
                </div>
                <button
                  onClick={() => setSelectedStockForTrade(null)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-white bg-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* BUY / SELL Switch */}
              <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setTradeType('BUY')}
                  className={`py-2 rounded-lg text-xs font-bold transition ${
                    tradeType === 'BUY'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  BUY
                </button>
                <button
                  type="button"
                  onClick={() => setTradeType('SELL')}
                  className={`py-2 rounded-lg text-xs font-bold transition ${
                    tradeType === 'SELL'
                      ? 'bg-rose-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  SELL
                </button>
              </div>

              {/* Order Form */}
              <form onSubmit={handleExecuteTrade} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Quantity (Shares)</label>
                  <input
                    type="number"
                    min="1"
                    max={tradeType === 'SELL' ? selectedStockForTrade.shares : 1000}
                    value={tradeShares}
                    onChange={(e) => setTradeShares(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 font-bold"
                  />
                  {tradeType === 'SELL' && (
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      Max available to sell: {selectedStockForTrade.shares} shares
                    </span>
                  )}
                </div>

                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="flex justify-between text-slate-400">
                    <span>Order Type:</span>
                    <span className="text-white font-bold">MARKET</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Estimated Total:</span>
                    <span className="text-white font-bold">
                      ₹{(parseInt(tradeShares || 0, 10) * selectedStockForTrade.cmp).toLocaleString('en-IN')}
                    </span>
                  </div>
                  {tradeType === 'BUY' && (
                    <div className="flex justify-between text-slate-400">
                      <span>Available Cash:</span>
                      <span className="text-amber-400 font-bold">₹{cashBalance.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className={`w-full py-3 rounded-xl font-black text-sm text-white shadow-lg transition ${
                    tradeType === 'BUY'
                      ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30'
                      : 'bg-rose-600 hover:bg-rose-500 shadow-rose-600/30'
                  }`}
                >
                  Confirm {tradeType} Order
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
