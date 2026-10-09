import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UtensilsCrossed, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  CheckCircle2, 
  CreditCard, 
  ShieldCheck, 
  Clock, 
  Search,
  Sparkles,
  ArrowRight,
  Flame,
  X
} from 'lucide-react';
import { DemoAppHeader } from './DemoAppHeader';

export const AnnaRestroDemo = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [vegOnly, setVegOnly] = useState(false);
  const [tableNumber, setTableNumber] = useState('Table #04');
  const [cart, setCart] = useState([
    { id: 'item-1', name: 'Paneer Butter Masala', price: 280, qty: 1, isVeg: true },
    { id: 'item-4', name: 'Butter Garlic Naan', price: 60, qty: 2, isVeg: true }
  ]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [kitchenStep, setKitchenStep] = useState(1);

  const menu = [
    { id: 'item-1', name: 'Paneer Butter Masala', category: 'Main Course', price: 280, isVeg: true, desc: 'Rich tomato cashew gravy infused with aromatic butter & spices', popular: true },
    { id: 'item-2', name: 'Murgh Dum Biryani', category: 'Biryani', price: 340, isVeg: false, desc: 'Slow-cooked fragrant basmati rice with marinated spiced chicken', popular: true },
    { id: 'item-3', name: 'Crispy Corn & Water Chestnut', category: 'Starters', price: 220, isVeg: true, desc: 'Tossed in pepper garlic seasoning with spring onions' },
    { id: 'item-4', name: 'Butter Garlic Naan', category: 'Breads', price: 60, isVeg: true, desc: 'Clay oven baked flatbread with roasted garlic and creamy butter' },
    { id: 'item-5', name: 'Dal Makhani Special', category: 'Main Course', price: 240, isVeg: true, desc: 'Overnight simmered black lentils finished with cream & fenugreek' },
    { id: 'item-6', name: 'Tandoori Chicken Tikka', category: 'Starters', price: 320, isVeg: false, desc: 'Tender chicken skewers smoked in clay tandoor with mint chutney', popular: true },
    { id: 'item-7', name: 'Sizzling Brownie with Ice Cream', category: 'Desserts', price: 180, isVeg: true, desc: 'Warm fudge brownie topped with vanilla bean gelato & hot chocolate' },
    { id: 'item-8', name: 'Mango Lassi', category: 'Beverages', price: 110, isVeg: true, desc: 'Creamy yogurt beverage infused with Alphonso mango pulp' },
  ];

  const categories = ['All', 'Starters', 'Main Course', 'Biryani', 'Breads', 'Desserts', 'Beverages'];

  const filteredMenu = menu.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesVeg = !vegOnly || item.isVeg;
    return matchesCat && matchesVeg;
  });

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, qty: 1, isVeg: item.isVeg }];
    });
  };

  const updateQty = (id, delta) => {
    setCart((prev) => {
      return prev
        .map((item) => item.id === id ? { ...item, qty: item.qty + delta } : item)
        .filter((item) => item.qty > 0);
    });
  };

  const subtotal = cart.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
  const gst = Math.round(subtotal * 0.05); // 5% GST
  const grandTotal = subtotal + gst;

  const handleSimulatePayment = () => {
    setIsCheckoutOpen(false);
    setOrderConfirmed(true);
    setKitchenStep(1);
    setTimeout(() => setKitchenStep(2), 2500);
    setTimeout(() => setKitchenStep(3), 6000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans flex flex-col">
      <DemoAppHeader
        appName="AnnaRestro"
        appTagline="Digital Contactless Dining & Kitchen POS"
        githubUrl="https://github.com/Amolippar/annarestro"
        detailsSlug="annarestro"
      />

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-8">
        {/* Left: Menu & Ordering Column */}
        <div className="flex-1 space-y-6">
          {/* Header Strip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-slate-950/80 border border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <UtensilsCrossed className="w-5 h-5 text-amber-400" />
                <h2 className="text-lg font-black text-white">AnnaRestro Dining Lounge</h2>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Scan QR or Select Table to dispatch orders directly to the Kitchen Display System (KDS).
              </p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="py-1.5 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-amber-400"
              >
                <option value="Table #01">Table #01 (Patio)</option>
                <option value="Table #04">Table #04 (Indoor)</option>
                <option value="Table #09">Table #09 (VIP Booth)</option>
                <option value="Takeaway-01">Takeaway Counter</option>
              </select>

              <button
                onClick={() => setVegOnly(!vegOnly)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
                  vegOnly ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500' : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Veg Only
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  selectedCategory === cat ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMenu.map((item) => {
              const inCart = cart.find((c) => c.id === item.id);
              return (
                <div key={item.id} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-3 h-3 rounded-sm flex items-center justify-center border ${item.isVeg ? 'border-emerald-500' : 'border-rose-500'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                        </span>
                        <h4 className="font-bold text-sm text-white">{item.name}</h4>
                      </div>
                      <span className="text-sm font-black text-amber-400">₹{item.price}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{item.desc}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-900">
                    <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{item.category}</span>
                    {inCart ? (
                      <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-2 py-1">
                        <button onClick={() => updateQty(item.id, -1)} className="p-1 text-slate-400 hover:text-white">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-white px-1">{inCart.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="p-1 text-slate-400 hover:text-white">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(item)}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Cart & Kitchen Dispatch Status */}
        <div className="w-full lg:w-96 space-y-6">
          {/* Cart Box */}
          <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-amber-400" />
                <h3 className="font-bold text-sm text-white">Current Order</h3>
              </div>
              <span className="text-xs font-mono text-amber-400 font-bold">{tableNumber}</span>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-xs">
                Your cart is empty. Pick items from the menu to place an order.
              </div>
            ) : (
              <div className="space-y-3">
                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  {cart.map((c) => (
                    <div key={c.id} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-900">
                      <div>
                        <div className="font-semibold text-slate-200">{c.name}</div>
                        <div className="text-slate-500 text-[11px]">₹{c.price} × {c.qty}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">₹{c.price * c.qty}</span>
                        <button onClick={() => updateQty(c.id, -c.qty)} className="text-slate-500 hover:text-rose-400 p-1">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtotals */}
                <div className="space-y-1.5 pt-3 border-t border-slate-800 text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="text-white">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (5% Restaurant Rate):</span>
                    <span className="text-white">₹{gst}</span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-amber-400 pt-2 border-t border-slate-900">
                    <span>Grand Total:</span>
                    <span>₹{grandTotal}</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full py-3 rounded-2xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" /> Pay with Razorpay (₹{grandTotal})
                </button>
              </div>
            )}
          </div>

          {/* Real-Time Kitchen Display Order Tracker */}
          {orderConfirmed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-3xl bg-slate-950 border border-emerald-500/40 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Order Confirmed (#AR-8902)
                </span>
                <span className="text-[10px] font-mono text-slate-400">Table #04</span>
              </div>

              <div className="space-y-2 pt-2 text-xs">
                <div className={`p-2.5 rounded-xl border flex items-center justify-between ${kitchenStep >= 1 ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
                  <span>1. Ticket Received at KDS</span>
                  {kitchenStep >= 1 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <div className={`p-2.5 rounded-xl border flex items-center justify-between ${kitchenStep >= 2 ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
                  <span>2. Chef Preparing ({tableNumber})</span>
                  {kitchenStep >= 2 ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Clock className="w-3.5 h-3.5 text-slate-600 animate-spin" />}
                </div>
                <div className={`p-2.5 rounded-xl border flex items-center justify-between ${kitchenStep >= 3 ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
                  <span>3. Order Ready & Served</span>
                  {kitchenStep >= 3 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Simulated Razorpay Checkout Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-sm rounded-3xl bg-slate-900 border border-slate-700 p-6 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-indigo-400" />
                  <span className="font-extrabold text-sm text-white">Razorpay Secure Checkout</span>
                </div>
                <button onClick={() => setIsCheckoutOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
                <div className="text-slate-400">Merchant: AnnaRestro Hospitality LLP</div>
                <div className="text-slate-400">Order Ref: ORD_901928_SHA256</div>
                <div className="text-base font-black text-amber-400 pt-1">Payable Amount: ₹{grandTotal}</div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
                  <span>UPI / QR Payment</span>
                  <span className="text-[10px] text-emerald-400 font-bold">Recommended</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-800 text-slate-400">
                  Credit / Debit Card (Visa, Mastercard, RuPay)
                </div>
                <div className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-800 text-slate-400">
                  Net Banking
                </div>
              </div>

              <button
                onClick={handleSimulatePayment}
                className="w-full py-3 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Complete Payment & Verify Signature
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
