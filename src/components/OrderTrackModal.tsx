import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Package, 
  MapPin, 
  ShieldCheck, 
  PhoneCall 
} from 'lucide-react';
import { SAMPLE_ORDERS } from '../data/mockData';
import { Order } from '../types';

interface OrderTrackModalProps {
  isOpen: boolean;
  onClose: () => void;
  recentOrders: Order[];
  lang: 'en' | 'bn';
}

export const OrderTrackModal: React.FC<OrderTrackModalProps> = ({
  isOpen,
  onClose,
  recentOrders,
  lang,
}) => {
  const [searchId, setSearchId] = useState('');
  const [activeOrder, setActiveOrder] = useState<any>(SAMPLE_ORDERS['SHH-89421']);
  const [notFound, setNotFound] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchId.trim().toUpperCase();
    if (!query) return;

    // Check recent user orders
    const matchedRecent = recentOrders.find(o => o.orderId.toUpperCase() === query);
    if (matchedRecent) {
      setActiveOrder(matchedRecent);
      setNotFound(false);
      return;
    }

    // Check sample orders
    if (SAMPLE_ORDERS[query]) {
      setActiveOrder(SAMPLE_ORDERS[query]);
      setNotFound(false);
      return;
    }

    setNotFound(true);
  };

  const steps = [
    { title: 'Order Placed', bn: 'অর্ডার গৃহীত হয়েছে', icon: Clock, completed: true },
    { title: 'Pharmacist Verified', bn: 'ফার্মাসিস্ট ভেরিফাইড', icon: ShieldCheck, completed: true },
    { title: 'Packed & Sealed', bn: 'সিলযুক্ত প্যাকিং সম্পন্ন', icon: Package, completed: true },
    { 
      title: 'Handed to Courier', 
      bn: 'কুরিয়ারে হস্তান্তর', 
      icon: Truck, 
      completed: activeOrder?.status === 'courier' || activeOrder?.status === 'delivered' 
    },
    { 
      title: 'Out for Delivery', 
      bn: 'ডেলিভারির পথে', 
      icon: CheckCircle2, 
      completed: activeOrder?.status === 'delivered' 
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold">
              {lang === 'en' ? 'Track My Order' : 'অর্ডার ট্র্যাকিং'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[85vh] overflow-y-auto space-y-6">
          {/* Search Box */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder={lang === 'en' ? 'Enter Order ID (e.g. SHH-89421)' : 'অর্ডার আইডি দিন (যেমন: SHH-89421)'}
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 outline-none focus:border-emerald-600 font-mono uppercase"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-2xs"
            >
              {lang === 'en' ? 'Track' : 'খুঁজুন'}
            </button>
          </form>

          {notFound && (
            <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-xl border border-rose-200">
              {lang === 'en' ? 'Order not found. Try sample order: SHH-89421' : 'কোনো অর্ডার পাওয়া যায়নি। স্যাম্পল ট্রাই করুন: SHH-89421'}
            </div>
          )}

          {activeOrder && (
            <div className="space-y-6">
              {/* Status Header */}
              <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200/80">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                      {lang === 'en' ? 'Active Shipment' : 'চলমান শিপমেন্ট'}
                    </span>
                    <h3 className="text-base font-mono font-extrabold text-slate-900">
                      {activeOrder.orderId}
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-bold shadow-2xs">
                    {activeOrder.status === 'courier' ? 'In Transit / কুরিয়ারে প্রেরিত' : 'Processing'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-2 border-t border-emerald-100">
                  <div>
                    <p className="text-[10px] text-slate-400">Courier Partner:</p>
                    <p className="font-semibold text-slate-900">{activeOrder.courierName}</p>
                    <p className="text-[11px] font-mono text-emerald-800">{activeOrder.trackingNumber}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400">Estimated Delivery:</p>
                    <p className="font-bold text-slate-900">{activeOrder.estimatedDelivery}</p>
                  </div>
                </div>
              </div>

              {/* Step Progress Timeline */}
              <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {steps.map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <div key={idx} className="relative flex items-start gap-3">
                      <div className={`absolute -left-6 w-6 h-6 rounded-full flex items-center justify-center text-white ${
                        step.completed ? 'bg-emerald-600 shadow-sm' : 'bg-slate-300'
                      }`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h4 className={`text-xs font-bold ${step.completed ? 'text-slate-900' : 'text-slate-400'}`}>
                          {lang === 'en' ? step.title : step.bn}
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          {step.completed ? 'Completed' : 'Pending'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Info & Destination */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-800">{activeOrder.customerName} ({activeOrder.phone})</p>
                    <p className="text-slate-600">{activeOrder.address}, {activeOrder.district}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-between font-medium">
                  <span className="text-slate-500">Package Total:</span>
                  <span className="font-bold text-emerald-700 tabular-nums">৳{activeOrder.total}</span>
                </div>
              </div>
            </div>
          )}

          {/* Need Help Box */}
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-between text-xs text-amber-900">
            <span className="flex items-center gap-1.5 font-medium">
              <PhoneCall className="w-3.5 h-3.5 text-amber-600" />
              {lang === 'en' ? 'Need help with your shipment?' : 'শিপমেন্টে কোনো সমস্যা?'}
            </span>
            <a href="tel:01981721686" className="font-bold text-amber-950 hover:underline">01981721686</a>
          </div>
        </div>
      </div>
    </div>
  );
};
