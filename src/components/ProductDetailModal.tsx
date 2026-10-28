import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Plus, 
  Minus, 
  ShoppingCart, 
  Heart,
  CheckCircle2,
  Info
} from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, potency: string, size: string) => void;
  onBuyNow: (product: Product, quantity: number, potency: string, size: string) => void;
  lang: 'en' | 'bn';
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  lang,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedPotency, setSelectedPotency] = useState(
    product.selectedPotency || (product.availablePotencies ? product.availablePotencies[0] : 'Standard')
  );
  const [selectedSize, setSelectedSize] = useState(
    product.selectedSize || (product.availableSizes ? product.availableSizes[0] : 'Standard')
  );
  const [addedToast, setAddedToast] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedPotency, selectedSize);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleBuy = () => {
    onBuyNow(product, quantity, selectedPotency, selectedSize);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-100 max-h-[90vh] overflow-y-auto">
          {/* Left Column: Product Imagery & Trust Attributes */}
          <div className="md:col-span-5 p-6 bg-slate-50/50 flex flex-col justify-between">
            <div>
              <div className="relative aspect-square w-full rounded-2xl bg-white p-4 border border-slate-200/80 shadow-2xs flex items-center justify-center mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
                {product.isDarazMall && (
                  <span className="absolute top-3 left-3 bg-emerald-700 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    SHORIF MALL
                  </span>
                )}
                <span className="absolute bottom-3 right-3 bg-slate-900/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded backdrop-blur-xs">
                  {product.origin}
                </span>
              </div>

              {/* Guarantees Box */}
              <div className="bg-white rounded-xl p-3 border border-slate-200/80 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Authentic German / Indian Original</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>Doorstep delivery inside Dhaka in 24 hrs</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>7-Day Return if seal is broken on delivery</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-200/60 text-xs text-slate-400">
              Drug Reg. & Import Verification No: <span className="font-mono text-slate-600">DGDA-H-98214</span>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Brand and category */}
              <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold uppercase tracking-wider mb-1.5">
                <span>{product.brand}</span>
                <span>·</span>
                <span className="text-slate-400">{product.category}</span>
              </div>

              {/* Title & Bengali */}
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug mb-1">
                {product.name}
              </h2>
              <p className="text-sm font-medium text-emerald-800 mb-3">
                {product.bengaliName}
              </p>

              {/* Reviews & Ratings */}
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100 text-xs">
                <div className="flex items-center text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-slate-300">|</span>
                <span className="text-slate-600">{product.reviewCount} {lang === 'en' ? 'Ratings & Reviews' : 'গ্রাহক রিভিউ'}</span>
                <span className="text-slate-300">|</span>
                <span className="text-emerald-700 font-semibold">{lang === 'en' ? 'In Stock (Ready to dispatch)' : 'স্টকে আছে'}</span>
              </div>

              {/* Pricing Box */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 mb-5 flex items-baseline justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
                      ৳{product.price}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-slate-400 line-through tabular-nums">
                        ৳{product.originalPrice}
                      </span>
                    )}
                    {product.discountPercent > 0 && (
                      <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 rounded">
                        -{product.discountPercent}% OFF
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {lang === 'en' ? 'Inclusive of all taxes & pharmacist verification' : 'ভ্যাট ও ফার্মাসিস্ট ভেরিফিকেশন সহ'}
                  </p>
                </div>
              </div>

              {/* Potency Selection */}
              {product.availablePotencies && product.availablePotencies.length > 0 && (
                <div className="mb-4">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    {lang === 'en' ? 'Select Potency' : 'পোটেন্সি বা শক্তি নির্বাচন করুন'}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.availablePotencies.map((potency) => (
                      <button
                        key={potency}
                        onClick={() => setSelectedPotency(potency)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          selectedPotency === potency
                            ? 'bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-500/30'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {potency}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.availableSizes && product.availableSizes.length > 0 && (
                <div className="mb-5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    {lang === 'en' ? 'Bottle / Pack Size' : 'বোতল বা প্যাকের সাইজ'}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.availableSizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          selectedSize === sz
                            ? 'bg-slate-900 text-white shadow-sm'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  {lang === 'en' ? 'Quantity' : 'পরিমাণ'}
                </span>
                <div className="flex items-center rounded-lg border border-slate-300 bg-white shadow-2xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="p-2 text-slate-600 hover:bg-slate-100 disabled:opacity-40 rounded-l-lg transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-slate-900 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-slate-600 hover:bg-slate-100 rounded-r-lg transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <button
                  onClick={handleAdd}
                  className="py-3 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-2xs"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Add to Cart' : 'কার্টে যোগ করুন'}</span>
                </button>
                <button
                  onClick={handleBuy}
                  className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-md shadow-emerald-700/20"
                >
                  <span>{lang === 'en' ? 'Buy Now' : 'এখনই কিনুন'}</span>
                </button>
              </div>

              {/* Direct WhatsApp Order Button */}
              <a
                href={`https://wa.me/8801981721686?text=${encodeURIComponent(
                  `আসসালামু আলাইকুম শরীফ হোমিও হল, আমি এই ঔষধটি অর্ডার করতে চাই:\n\nঔষধ: ${product.name} (${product.bengaliName})\nপোটেন্সি: ${selectedPotency}\nসাইজ: ${selectedSize}\nপরিমাণ: ${quantity}টি\nমূল্য: ৳${product.price * quantity}\n\nঅনুগ্রহ করে ডেলিভারি কনফার্ম করুন।`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm mb-6"
              >
                <span className="text-sm">💬</span>
                <span>{lang === 'en' ? 'Order Directly on WhatsApp (01981721686)' : 'সরাসরি হোয়াটসঅ্যাপে অর্ডার করুন (০১৯৮১৭২১৬৮৬)'}</span>
              </a>

              {/* Toast alert */}
              {addedToast && (
                <div className="p-2.5 rounded-lg bg-emerald-100 text-emerald-900 text-xs font-semibold mb-4 flex items-center gap-2 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>{product.name} ({quantity}x) {lang === 'en' ? 'added to your cart!' : 'কার্টে যুক্ত হয়েছে!'}</span>
                </div>
              )}

              {/* Medical Information Tabs */}
              <div className="space-y-3 pt-3 border-t border-slate-100 text-xs">
                <div>
                  <h4 className="font-bold text-slate-800 flex items-center gap-1.5 mb-1">
                    <Info className="w-3.5 h-3.5 text-emerald-600" />
                    {lang === 'en' ? 'Health Indications & Benefits' : 'ব্যবহার ও উপকারিতা'}
                  </h4>
                  <p className="text-slate-600 leading-relaxed pl-5">
                    {product.indication}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 flex items-center gap-1.5 mb-1">
                    <Info className="w-3.5 h-3.5 text-emerald-600" />
                    {lang === 'en' ? 'Recommended Dosage & Administration' : 'সেবনবিধি'}
                  </h4>
                  <p className="text-slate-600 leading-relaxed pl-5">
                    {product.dosage}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
