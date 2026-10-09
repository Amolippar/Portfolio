import React, { useState } from 'react';
import { 
  Utensils, 
  ShoppingBag, 
  Plus, 
  Minus, 
  CheckCircle2, 
  CreditCard, 
  ShieldCheck, 
  QrCode, 
  Clock, 
  Flame,
  ChefHat
} from 'lucide-react';

export const AnnaRestroShowcase = () => {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [cart, setCart] = useState({
    1: 2, // Paneer Tikka Masala
    3: 1  // Butter Garlic Naan
  });
  const [orderStage, setOrderStage] = useState('CART'); // 'CART', 'PAYING', 'KOT_PREPARING', 'DELIVERED'

  const menuItems = [
    { id: 1, name: 'Paneer Tikka Masala', category: 'MAIN', price: 280, veg: true, desc: 'Cottage cheese cubes simmered in spiced tomato gravy' },
    { id: 2, name: 'Chicken Biryani (Dum)', category: 'MAIN', price: 340, veg: false, desc: 'Aromatic basmati rice cooked with tender marinated chicken' },
    { id: 3, name: 'Butter Garlic Naan', category: 'BREADS', price: 55, veg: true, desc: 'Clay-oven baked flatbread brushed with garlic butter' },
    { id: 4, name: 'Crispy Corn Salt & Pepper', category: 'STARTER', price: 190, veg: true, desc: 'Golden sweet corn tossed with spring onions and crushed pepper' },
    { id: 5, name: 'Mango Lassi / Beverage', category: 'DRINKS', price: 90, veg: true, desc: 'Thick churned yogurt blended with Alphonso mango pulp' }
  ];

  const updateQuantity = (id, delta) => {
    setCart(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      const updated = { ...prev };
      if (next === 0) {
        delete updated[id];
      } else {
        updated[id] = next;
      }
      return updated;
    });
  };

  const filteredItems = menuItems.filter(item => {
    if (activeCategory === 'ALL') return true;
    if (activeCategory === 'VEG') return item.veg;
    return item.category === activeCategory;
  });

  const subtotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = menuItems.find(m => m.id === Number(id));
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const gstTax = Math.round(subtotal * 0.05);
  const total = subtotal + gstTax;

  const simulateCheckout = () => {
    setOrderStage('PAYING');
    setTimeout(() => {
      setOrderStage('KOT_PREPARING');
    }, 1500);
  };

  return (
    <div className="rounded-3xl glass-card border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/60 dark:border-slate-800/60 pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
            <QrCode className="w-3.5 h-3.5" /> Table #07 QR Ordering Simulation
          </span>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            AnnaRestro Digital Dining & Payment Verification Flow
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono bg-amber-500/10 text-amber-600 dark:text-amber-400 px-3 py-1.5 rounded-xl border border-amber-500/20">
          <ChefHat className="w-4 h-4" /> Real-time Kitchen Order Ticket (KOT)
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Interactive Menu */}
        <div className="lg:col-span-2 space-y-4">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {['ALL', 'VEG', 'MAIN', 'STARTER', 'BREADS', 'DRINKS'].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                  activeCategory === cat
                    ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Menu Items List */}
          <div className="space-y-3">
            {filteredItems.map(item => {
              const qty = cart[item.id] || 0;
              return (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          item.veg ? 'bg-emerald-500' : 'bg-rose-500'
                        }`}
                        title={item.veg ? 'Vegetarian' : 'Non-Vegetarian'}
                      />
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                        {item.name}
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{item.desc}</p>
                    <span className="font-bold text-xs text-amber-600 dark:text-amber-400">
                      ₹{item.price}
                    </span>
                  </div>

                  {/* Quantity Counter */}
                  <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-2 py-1 rounded-xl border border-slate-200 dark:border-slate-700">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1 hover:text-amber-500 text-slate-500 transition"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-mono font-bold w-4 text-center">{qty}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1 hover:text-amber-500 text-slate-500 transition"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Live Cart & Razorpay Checkout */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4 text-amber-500" /> Current Table Cart
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {Object.values(cart).reduce((a, b) => a + b, 0)} items
              </span>
            </div>

            {/* Bill Calculation */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Items Subtotal</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Restaurant GST (5%)</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">₹{gstTax}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-800">
                <span>Grand Total</span>
                <span className="font-mono text-amber-600 dark:text-amber-400">₹{total}</span>
              </div>
            </div>

            {/* Razorpay Webhook Simulation */}
            {orderStage === 'KOT_PREPARING' && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-600 dark:text-emerald-400 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Razorpay Signature Verified
                </div>
                <p className="text-[10px] text-slate-500 font-mono">
                  HMAC_SHA256 signature match: KOT #4910 dispatched to kitchen display!
                </p>
              </div>
            )}
          </div>

          <div>
            {orderStage === 'CART' ? (
              <button
                onClick={simulateCheckout}
                disabled={subtotal === 0}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white transition shadow-md shadow-amber-500/20 disabled:opacity-40"
              >
                Pay & Dispatch to Kitchen (₹{total})
              </button>
            ) : orderStage === 'PAYING' ? (
              <div className="py-2.5 text-center text-xs font-bold text-indigo-500 animate-pulse">
                Verifying Razorpay Gateway Webhook...
              </div>
            ) : (
              <button
                onClick={() => setOrderStage('CART')}
                className="w-full py-2 rounded-xl text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                Reset Order Simulator
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
