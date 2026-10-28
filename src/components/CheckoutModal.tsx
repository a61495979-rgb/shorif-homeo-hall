import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Banknote, 
  CheckCircle, 
  ArrowRight,
  Phone,
  MapPin,
  User,
  ExternalLink
} from 'lucide-react';
import { CartItem, Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  onOrderSuccess: (order: Order) => void;
  lang: 'en' | 'bn';
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discount,
  deliveryFee,
  total,
  onOrderSuccess,
  lang,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Dhaka');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'nagad' | 'rocket' | 'card'>('cod');
  const [txId, setTxId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const orderId = `SHH-${Math.floor(10000 + Math.random() * 90000)}`;
      const trackingNumber = `PTH-${Math.floor(1000000 + Math.random() * 9000000)}-BD`;

      const newOrder: Order = {
        orderId,
        date: new Date().toISOString().replace('T', ' ').slice(0, 16),
        customerName: name,
        phone,
        district,
        address,
        paymentMethod,
        transactionId: txId || undefined,
        items: items.map(item => ({
          id: item.product.id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          potency: item.potency,
          size: item.size
        })),
        subtotal,
        discount,
        deliveryFee,
        total,
        status: 'verified',
        courierName: 'Pathao Pharmacy Express Logistics',
        trackingNumber,
        estimatedDelivery: district === 'Dhaka' ? 'Within 24 Hours' : 'Within 48-72 Hours'
      };

      setConfirmedOrder(newOrder);
      setIsSubmitting(false);
      onOrderSuccess(newOrder);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmedOrder ? (
          /* Order Confirmation Success Screen */
          <div className="p-6 sm:p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                {lang === 'en' ? 'Order Placed Successfully!' : 'অর্ডার সফলভাবে গৃহীত হয়েছে!'}
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
                {lang === 'en' ? 'Thank You for Choosing Shorif Homeo Hall' : 'শরীফ হোমিও হলকে বেছে নেওয়ার জন্য ধন্যবাদ'}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {lang === 'en' 
                  ? 'Our registered pharmacist will verify your medicines before dispatch.'
                  : 'ডেলিভারির পূর্বে আমাদের অভিজ্ঞ ফার্মাসিস্ট ঔষধের সিল ও ব্যাচ মিলিয়ে দেখবেন।'
                }
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 text-left text-xs space-y-2.5">
              <div className="flex justify-between pb-2 border-b border-slate-200 font-medium">
                <span className="text-slate-500">{lang === 'en' ? 'Order Number' : 'অর্ডার নম্বর'}:</span>
                <span className="font-mono font-bold text-slate-900">{confirmedOrder.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{lang === 'en' ? 'Recipient' : 'গ্রাহক'}:</span>
                <span className="font-semibold text-slate-900">{confirmedOrder.customerName} ({confirmedOrder.phone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{lang === 'en' ? 'Delivery Address' : 'ঠিকানা'}:</span>
                <span className="font-semibold text-slate-900 text-right max-w-xs">{confirmedOrder.address}, {confirmedOrder.district}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{lang === 'en' ? 'Courier Logistics' : 'কুরিয়ার'}:</span>
                <span className="font-semibold text-emerald-700">{confirmedOrder.courierName} ({confirmedOrder.trackingNumber})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{lang === 'en' ? 'Estimated Delivery' : 'সম্ভাব্য সময়'}:</span>
                <span className="font-bold text-slate-900">{confirmedOrder.estimatedDelivery}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-bold">
                <span className="text-slate-800">{lang === 'en' ? 'Total Payable' : 'মোট প্রদেয় বিল'}:</span>
                <span className="text-emerald-700 tabular-nums">৳{confirmedOrder.total} ({confirmedOrder.paymentMethod.toUpperCase()})</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-sm"
              >
                {lang === 'en' ? 'Continue Shopping' : 'আরও ঔষধ কিনুন'}
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <div className="p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center gap-2 mb-6">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {lang === 'en' ? 'Checkout & Delivery' : 'চেকআউট ও ডেলিভারি'}
                </h2>
                <p className="text-xs text-slate-500">
                  {lang === 'en' ? 'Fast doorstep delivery with genuine medicine guarantee' : 'আসল ঔষধের নিশ্চয়তাসহ দ্রুততম হোম ডেলিভারি'}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Contact Details */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-emerald-600" />
                  {lang === 'en' ? '1. Customer Information' : '১. গ্রাহকের তথ্য'}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {lang === 'en' ? 'Full Name' : 'পূর্ণ নাম'} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kazi Mofizur Rahman"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {lang === 'en' ? 'Mobile Phone' : 'মোবাইল নম্বর'} *
                    </label>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="tel"
                        required
                        placeholder="01712345678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {lang === 'en' ? 'District / City' : 'জেলা / শহর'} *
                    </label>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 outline-none focus:border-emerald-600 bg-white"
                    >
                      <option value="Dhaka">Dhaka (ঢাকা - 24hr delivery)</option>
                      <option value="Chattogram">Chattogram (চট্টগ্রাম)</option>
                      <option value="Sylhet">Sylhet (সিলেট)</option>
                      <option value="Rajshahi">Rajshahi (রাজশাহী)</option>
                      <option value="Khulna">Khulna (খুলনা)</option>
                      <option value="Barishal">Barishal (বরিশাল)</option>
                      <option value="Rangpur">Rangpur (রংপুর)</option>
                      <option value="Mymensingh">Mymensingh (ময়মনসিংহ)</option>
                      <option value="Cumilla">Cumilla (কুমিল্লা)</option>
                      <option value="Gazipur">Gazipur (গাজীপুর)</option>
                      <option value="Narayanganj">Narayanganj (নারায়ণগঞ্জ)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {lang === 'en' ? 'Detailed Address' : 'বিস্তারিত ঠিকানা (বাড়ি, রোড, এলাকা)'} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. House 14, Road 5, Sector 3, Uttara"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods (Daraz style: COD, bKash, Nagad, Rocket, Card) */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                  {lang === 'en' ? '2. Payment Method' : '২. পেমেন্ট মাধ্যম বেছে নিন'}
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {/* COD */}
                  <div
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xl border cursor-pointer text-center transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold ring-1 ring-emerald-600'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <Banknote className="w-5 h-5 mx-auto mb-1 text-emerald-700" />
                    <p className="text-xs">{lang === 'en' ? 'Cash On Delivery' : 'ক্যাশ অন ডেলিভারি'}</p>
                    <span className="text-[10px] text-slate-500 font-normal">Pay when received</span>
                  </div>

                  {/* bKash */}
                  <div
                    onClick={() => setPaymentMethod('bkash')}
                    className={`p-3 rounded-xl border cursor-pointer text-center transition-all ${
                      paymentMethod === 'bkash'
                        ? 'border-[#e2136e] bg-pink-50 text-pink-900 font-bold ring-1 ring-[#e2136e]'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="w-5 h-5 mx-auto mb-1 font-bold text-pink-600">bK</div>
                    <p className="text-xs">bKash</p>
                    <span className="text-[10px] text-slate-500 font-normal">Instant / Send</span>
                  </div>

                  {/* Nagad */}
                  <div
                    onClick={() => setPaymentMethod('nagad')}
                    className={`p-3 rounded-xl border cursor-pointer text-center transition-all ${
                      paymentMethod === 'nagad'
                        ? 'border-orange-500 bg-orange-50 text-orange-900 font-bold ring-1 ring-orange-500'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="w-5 h-5 mx-auto mb-1 font-bold text-orange-600">নগদ</div>
                    <p className="text-xs">Nagad</p>
                    <span className="text-[10px] text-slate-500 font-normal">Post-payment</span>
                  </div>

                  {/* Card */}
                  <div
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border cursor-pointer text-center transition-all ${
                      paymentMethod === 'card'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold ring-1 ring-emerald-600'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mx-auto mb-1 text-slate-700" />
                    <p className="text-xs">Visa / Master</p>
                    <span className="text-[10px] text-slate-500 font-normal">Credit / Debit</span>
                  </div>
                </div>

                {/* bKash instructions if selected */}
                {paymentMethod === 'bkash' && (
                  <div className="p-3 bg-pink-50 rounded-xl border border-pink-200 text-xs text-pink-950 space-y-1.5">
                    <p className="font-semibold">
                      {lang === 'en' ? 'bKash Merchant / Personal No:' : 'বিকাশ মার্চেন্ট / পার্সোনাল নম্বর:'} <span className="font-mono font-bold text-[#e2136e]">01981721686</span>
                    </p>
                    <p className="text-[11px] text-pink-800">
                      {lang === 'en' ? `Send ৳${total} to 01981721686, then enter the Transaction ID below:` : `উপরের ০১৯৮১৭২১৬৮৬ নম্বরে ৳${total} সেন্ড মানি করে নিচে Transaction ID লিখুন:`}
                    </p>
                    <input
                      type="text"
                      placeholder="e.g. 9L8K23M45"
                      value={txId}
                      onChange={(e) => setTxId(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-pink-300 bg-white font-mono text-xs uppercase"
                    />
                  </div>
                )}
              </div>

              {/* Order Items Preview */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
                <div className="font-bold text-slate-800 flex justify-between">
                  <span>{lang === 'en' ? 'Package Summary' : 'প্যাকেজ সারসংক্ষেপ'} ({items.length} items)</span>
                  <span className="text-slate-500">{district === 'Dhaka' ? 'Pathao 24hr' : 'Paperfly 48hr'}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="tabular-nums font-semibold">৳{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount:</span>
                    <span className="tabular-nums">-৳{discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Delivery Charge:</span>
                  <span className="tabular-nums font-semibold">{deliveryFee === 0 ? 'FREE' : `৳${deliveryFee}`}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-bold text-slate-900">
                  <span>Total Amount:</span>
                  <span className="text-emerald-700 tabular-nums">৳{total}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-sm shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2 transition-all"
              >
                {isSubmitting ? (
                  <span>{lang === 'en' ? 'Confirming Order...' : 'অর্ডার প্রক্রিয়াধীন...'}</span>
                ) : (
                  <>
                    <span>{lang === 'en' ? `Place Order (৳${total})` : `অর্ডার নিশ্চিত করুন (৳${total})`}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
