import React, { useState, useEffect } from 'react';
import { Flame, Clock, Plus, Check } from 'lucide-react';
import { Product } from '../types';

interface FlashDealsProps {
  products: Product[];
  onSelectProduct: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  lang: 'en' | 'bn';
}

export const FlashDeals: React.FC<FlashDealsProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  lang,
}) => {
  // Live Countdown timer
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 42, seconds: 18 });
  const [addedId, setAddedId] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 6, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashItems = products.filter(p => p.isFlashDeal).slice(0, 4);

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-slate-200/90">
        {/* Flash Sale Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-amber-600 font-extrabold text-base md:text-lg uppercase tracking-wide">
              <Flame className="w-5 h-5 fill-amber-500 text-amber-500 animate-pulse" />
              <span>{lang === 'en' ? 'Flash Deals' : 'ফ্ল্যাশ সেল'}</span>
            </div>

            {/* Countdown Badge */}
            <div className="flex items-center gap-1.5 bg-slate-900 text-white text-xs font-mono px-2.5 py-1 rounded-lg">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-bold tabular-nums">
                {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            {lang === 'en' ? 'Limited stocks at wholesale price' : 'সীমিত স্টক পাইকারি মূল্যে'}
          </div>
        </div>

        {/* Flash Sale Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {flashItems.map((product) => {
            const isAdded = addedId === product.id;
            const soldPercent = Math.min(100, Math.round(((product.soldCount || 10) / (product.stockCount || 50)) * 100));

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group relative flex flex-col justify-between bg-[#fafafa] hover:bg-white rounded-xl p-3 border border-slate-200/70 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer"
              >
                {/* Discount Badge */}
                <div className="absolute top-2 left-2 z-10 bg-amber-500 text-white text-[11px] font-extrabold px-1.5 py-0.5 rounded shadow-sm">
                  -{product.discountPercent}%
                </div>

                {/* Product Image */}
                <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-white mb-2 flex items-center justify-center p-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Info */}
                <div>
                  <p className="text-[10px] font-semibold text-emerald-800 uppercase tracking-wider truncate mb-0.5">
                    {product.brand.split(' ')[0]} {product.brand.includes('Reckeweg') ? 'Germany' : ''}
                  </p>
                  <h4 className="text-xs md:text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                    {product.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mb-2">
                    {product.bengaliName}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-sm md:text-base font-extrabold text-slate-900 tabular-nums">
                      ৳{product.price}
                    </span>
                    <span className="text-xs text-slate-400 line-through tabular-nums">
                      ৳{product.originalPrice}
                    </span>
                  </div>

                  {/* Stock progress */}
                  <div className="space-y-1 mb-3">
                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-amber-500 h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${soldPercent}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                      <span>{product.soldCount} {lang === 'en' ? 'Sold' : 'বিক্রি'}</span>
                      <span>{product.stockCount} {lang === 'en' ? 'Left' : 'বাকি'}</span>
                    </div>
                  </div>

                  {/* Quick Add Button */}
                  <button
                    onClick={(e) => handleQuickAdd(e, product)}
                    className={`w-full py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white hover:bg-emerald-600 text-slate-800 hover:text-white border border-slate-300 hover:border-emerald-600 shadow-2xs'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{lang === 'en' ? 'Added!' : 'যুক্ত হয়েছে'}</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>{lang === 'en' ? 'Add to Cart' : 'কার্টে যোগ করুন'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
