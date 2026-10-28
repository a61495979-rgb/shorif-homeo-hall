import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Truck, 
  Check
} from 'lucide-react';
import { CartItem } from '../types';
import { VOUCHERS } from '../data/mockData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedCheckout: () => void;
  appliedVoucher: string | null;
  onApplyVoucher: (code: string) => boolean;
  lang: 'en' | 'bn';
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedCheckout,
  appliedVoucher,
  onApplyVoucher,
  lang,
}) => {
  const [voucherInput, setVoucherInput] = useState('');
  const [voucherError, setVoucherError] = useState('');
  const [voucherSuccess, setVoucherSuccess] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const freeShippingThreshold = 1500;
  const isFreeShipping = subtotal >= freeShippingThreshold || appliedVoucher === 'FREEHOME';
  const deliveryFee = items.length === 0 ? 0 : (isFreeShipping ? 0 : 60);

  // Calculate discount
  let discount = 0;
  if (appliedVoucher === 'SHORIF50' && subtotal >= 800) {
    discount = 50;
  } else if (appliedVoucher === 'HOMEO10' && subtotal >= 1500) {
    discount = Math.round(subtotal * 0.1);
  }

  const grandTotal = Math.max(0, subtotal - discount + deliveryFee);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setVoucherError('');
    setVoucherSuccess('');
    const code = voucherInput.trim().toUpperCase();
    if (!code) return;

    const success = onApplyVoucher(code);
    if (success) {
      setVoucherSuccess(`Coupon ${code} applied successfully!`);
      setVoucherInput('');
    } else {
      setVoucherError('Invalid code or minimum spend requirement not met.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base font-bold">
                {lang === 'en' ? 'My Cart' : 'শপিং কার্ট'} ({items.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="p-3 bg-emerald-50 border-b border-emerald-100 text-xs">
            <div className="flex items-center justify-between font-semibold text-emerald-900 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-700" />
                {isFreeShipping 
                  ? (lang === 'en' ? 'Congratulations! FREE Express Delivery unlocked!' : 'অভিনন্দন! ফ্রি এক্সপ্রেস ডেলিভারি আনলক হয়েছে!')
                  : (lang === 'en' ? `Add ৳${freeShippingThreshold - subtotal} more for FREE Delivery` : `আর ৳${freeShippingThreshold - subtotal} যোগ করলেই ফ্রি ডেলিভারি!`)
                }
              </span>
              <span className="tabular-nums font-bold">{freeShippingProgress}%</span>
            </div>
            <div className="w-full bg-emerald-200/80 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-emerald-600 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 divide-y divide-slate-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-3 text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-1">
                  {lang === 'en' ? 'Your cart is empty' : 'আপনার কার্ট খালি'}
                </h3>
                <p className="text-xs text-slate-500 max-w-xs mb-4">
                  {lang === 'en' 
                    ? 'Explore our pure German and Indian homeopathic remedies.'
                    : 'আমাদের আসল জার্মান ও ভারতীয় হোমিও ঔষধ সমূহ ঘুরে দেখুন।'
                  }
                </p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
                >
                  {lang === 'en' ? 'Start Shopping' : 'ঔষধ দেখুন'}
                </button>
              </div>
            ) : (
              items.map((item, index) => (
                <div key={`${item.product.id}-${item.potency}-${item.size}`} className="py-3.5 flex gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 object-contain rounded-xl bg-slate-50 border border-slate-200 p-1 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-1">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(index)}
                        className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-2">
                      <span className="font-semibold text-emerald-800">{item.potency}</span>
                      <span>·</span>
                      <span>{item.size}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="px-2 py-0.5 text-slate-600 hover:bg-slate-200 disabled:opacity-30 rounded-l-lg transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-slate-900 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                          className="px-2 py-0.5 text-slate-600 hover:bg-slate-200 rounded-r-lg transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-slate-900 tabular-nums">
                          ৳{item.product.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Order Summary */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 space-y-3">
              {/* Voucher Input */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={voucherInput}
                    onChange={(e) => setVoucherInput(e.target.value)}
                    placeholder="Enter Coupon (e.g. SHORIF50)"
                    className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-300 bg-white uppercase tracking-wider outline-none focus:border-emerald-600"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
                >
                  Apply
                </button>
              </form>

              {/* Voucher status text */}
              {voucherSuccess && (
                <p className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> {voucherSuccess}
                </p>
              )}
              {voucherError && (
                <p className="text-[11px] text-rose-600 font-medium">
                  {voucherError}
                </p>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                <div className="flex justify-between">
                  <span>{lang === 'en' ? 'Subtotal' : 'সাবটোটাল'}</span>
                  <span className="font-semibold text-slate-900 tabular-nums">৳{subtotal}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>{lang === 'en' ? 'Voucher Discount' : 'ভাউচার ডিসকাউন্ট'} ({appliedVoucher})</span>
                    <span className="tabular-nums">-৳{discount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>{lang === 'en' ? 'Delivery Fee' : 'ডেলিভারি চার্জ'}</span>
                  <span className="font-semibold tabular-nums">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-700 font-bold uppercase">{lang === 'en' ? 'FREE' : 'ফ্রি'}</span>
                    ) : (
                      `৳${deliveryFee}`
                    )}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-extrabold text-slate-900">
                  <span>{lang === 'en' ? 'Total Amount' : 'সর্বমোট মূল্য'}</span>
                  <span className="text-base text-emerald-700 tabular-nums">৳{grandTotal}</span>
                </div>
              </div>

              {/* Proceed to Checkout CTA */}
              <button
                onClick={onProceedCheckout}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2 transition-all hover:gap-3"
              >
                <span>{lang === 'en' ? 'Proceed to Checkout' : 'অর্ডার কনফার্ম করুন'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Order via WhatsApp */}
              <a
                href={`https://wa.me/8801981721686?text=${encodeURIComponent(
                  `আসসালামু আলাইকুম শরীফ হোমিও হল, আমি কার্টের এই ঔষধগুলো কিনতে চাই:\n\n${items
                    .map((item, idx) => `${idx + 1}. ${item.product.name} (${item.potency}, ${item.size}) - ${item.quantity}টি - ৳${item.product.price * item.quantity}`)
                    .join('\n')}\n\nসর্বমোট বিল: ৳${grandTotal}\n\nঅনুগ্রহ করে ডেলিভারি কনফার্ম করুন।`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-2xs"
              >
                <span>💬</span>
                <span>{lang === 'en' ? 'Order Cart on WhatsApp (01981721686)' : 'হোয়াটসঅ্যাপে কার্ট অর্ডার পাঠান'}</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
