import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  ShoppingCart, 
  FileText, 
  Stethoscope, 
  Truck, 
  PhoneCall, 
  ShieldCheck, 
  Heart,
  ChevronDown,
  X
} from 'lucide-react';
import { CategoryType, Product } from '../types';
import { CATEGORIES, PRODUCTS } from '../data/mockData';

interface HeaderProps {
  currentCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cartCount: number;
  cartTotal: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenPrescription: () => void;
  onOpenDoctorModal: () => void;
  onOpenOrderTrack: () => void;
  onSelectProduct: (product: Product) => void;
  lang: 'en' | 'bn';
  onToggleLang: () => void;
  topNotice?: string;
  onOpenAdmin?: () => void;
  ownerEmail?: string;
}


export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  cartCount,
  cartTotal,
  wishlistCount,
  onOpenCart,
  onOpenPrescription,
  onOpenDoctorModal,
  onOpenOrderTrack,
  onSelectProduct,
  lang,
  onToggleLang,
  topNotice = '১০০% খাঁটি জার্মানি ও দেশি ওষুধ',
  onOpenAdmin,
  ownerEmail = '86smohammad86@gmail.com',
}) => {
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = searchQuery.trim()
    ? PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.bengaliName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.indication.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-slate-200">
      {/* Top Utility Ribbon with 100% khti germani o deshi osod text */}
      <div className="bg-[#e6f7f0] border-b border-emerald-200 text-xs text-slate-700 px-4 py-1.5 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-5">
            {/* The exact requested text: 100% khti germani o deshi osod */}
            <span className="flex items-center gap-1.5 text-emerald-950 font-extrabold bg-emerald-100/90 px-2.5 py-0.5 rounded-md border border-emerald-300 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>{topNotice}</span>
            </span>

            <span className="flex items-center gap-1.5 text-slate-700">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
              <a href="tel:01981721686" className="hover:text-emerald-700 font-semibold">
                {lang === 'en' ? 'Helpline: 01981721686' : 'হটলাইন: ০১৯৮১৭২১৬৮৬'}
              </a>
            </span>

            <span className="text-slate-400 hidden xl:inline">|</span>

            {/* Owner Email Badge */}
            <span className="hidden xl:flex items-center gap-1.5 text-slate-700 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              <span className="text-emerald-800 font-bold">{lang === 'en' ? 'Owner:' : 'মূল মালিক:'}</span>
              <a href={`mailto:${ownerEmail}`} className="hover:text-emerald-700 text-emerald-900 font-semibold">
                {ownerEmail}
              </a>
            </span>
          </div>

          <div className="flex items-center gap-4">
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold transition-all shadow-2xs"
                title="Edit medicines and store details"
              >
                <span>🛠️</span>
                <span>{lang === 'en' ? 'Edit Store & Medicines' : 'এডিট প্যানেল'}</span>
              </button>
            )}
            <button 
              onClick={onOpenOrderTrack}
              className="flex items-center gap-1.5 hover:text-emerald-700 font-medium transition-colors"
            >
              <Truck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{lang === 'en' ? 'Track My Order' : 'অর্ডার ট্র্যাক'}</span>
            </button>
            <span className="text-slate-300">·</span>
            <button 
              onClick={onOpenDoctorModal}
              className="flex items-center gap-1.5 hover:text-emerald-700 font-medium transition-colors"
            >
              <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
              <span>{lang === 'en' ? 'Doctor Consult' : 'ডাক্তার অ্যাপয়েন্টমেন্ট'}</span>
            </button>
            <span className="text-slate-300">·</span>
            <button 
              onClick={onToggleLang}
              className="px-2 py-0.5 rounded bg-emerald-100/70 hover:bg-emerald-200 text-emerald-900 font-semibold transition-colors"
            >
              {lang === 'en' ? 'বাংলা' : 'English'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Bar (Daraz style: Logo, Large Search, Prescription CTA, Wishlist, Cart) */}
      <div className="max-w-7xl mx-auto px-4 py-3.5">
        <div className="flex items-center justify-between gap-4 md:gap-6">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => onSelectCategory('all')}>
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-md shadow-emerald-700/20">
              <span className="text-xl font-bold font-serif">শ</span>
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-900">
                  Shorif <span className="text-emerald-700">Homeo</span>
                </span>
                <span className="hidden sm:inline-block text-xs font-semibold px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                  HALL
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-wide">
                {lang === 'en' ? 'শরীফ হোমিও হল · Online Pharmacy' : 'শরীফ হোমিও হল · অনলাইন ফার্মেসী'}
              </p>
            </div>
          </div>

          {/* Central Search Bar (Daraz-inspired with Category Filter + Instant Suggest) */}
          <div ref={searchRef} className="flex-1 max-w-2xl relative">
            <div className="flex items-center rounded-xl border-2 border-emerald-600 bg-white overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-emerald-400/40">
              <select
                aria-label="Filter by category"
                value={currentCategory}
                onChange={(e) => onSelectCategory(e.target.value as CategoryType)}
                className="hidden lg:block bg-slate-50 text-slate-700 text-xs font-medium px-3 py-2.5 border-r border-slate-200 outline-none cursor-pointer hover:bg-slate-100"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {lang === 'en' ? cat.name : cat.bn}
                  </option>
                ))}
              </select>

              <div className="relative flex-1 flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    onSearchChange(e.target.value);
                    setShowSearchDropdown(true);
                  }}
                  onFocus={() => setShowSearchDropdown(true)}
                  placeholder={lang === 'en' ? 'Search German remedies, Arnica, Mother Tinctures, Dr. Reckeweg...' : 'জার্মান ঔষধ, আর্নিকা, মাদার টিংচার, রেকেওয়েগ খুঁজুন...'}
                  className="w-full px-3.5 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="p-1 text-slate-400 hover:text-slate-600 mr-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <button 
                onClick={() => setShowSearchDropdown(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 flex items-center justify-center transition-colors"
                title="Search remedies"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* Instant Search Suggestions Dropdown */}
            {showSearchDropdown && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden divide-y divide-slate-100">
                <div className="px-3 py-1.5 bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  {lang === 'en' ? 'Matching Medicines & Products' : 'সংশ্লিষ্ট হোমিওপ্যাথিক ঔষধসমূহ'}
                </div>
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      onSelectProduct(product);
                      setShowSearchDropdown(false);
                    }}
                    className="flex items-center gap-3 p-3 hover:bg-emerald-50/50 cursor-pointer transition-colors"
                  >
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      referrerPolicy="no-referrer"
                      className="w-11 h-11 object-cover rounded-lg bg-slate-100 shrink-0" 
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">{product.name}</p>
                      <p className="text-xs text-slate-500 truncate">{product.bengaliName} · {product.brand}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-sm font-bold text-emerald-700 tabular-nums">৳{product.price}</span>
                      {product.originalPrice > product.price && (
                        <p className="text-[11px] text-slate-400 line-through tabular-nums">৳{product.originalPrice}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Action Cluster (Prescription, Wishlist, Cart) */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* WhatsApp Direct Order Button */}
            <a
              href="https://wa.me/8801981721686?text=%E0%A6%86%E0%A6%B8%E0%A6%B8%E0%A6%BE%E0%A6%B2%E0%A6%BE%E0%A6%AE%E0%A7%81%20%E0%A6%86%E0%A6%B2%E0%A6%BE%E0%A6%87%E0%A6%95%E0%A7%81%E0%A6%AE%20%E0%A6%B6%E0%A6%B0%E0%A7%80%E0%A6%AB%20%E0%A6%B9%E0%A7%8B%E0%A6%AE%E0%A6%BF%E0%A6%93%20%E0%A6%B9%E0%A6%B2%2C%20%E0%A6%86%E0%A6%AE%E0%A6%BF%20%E0%A6%94%E0%A6%B7%E0%A6%A7%20%E0%A6%85%E0%A6%B0%E0%A7%8D%E0%A6%A1%E0%A6%BE%E0%A6%B0%20%E0%A6%95%E0%A6%B0%E0%A6%A4%E0%A7%87%20%E0%A6%9A%E0%A6%BE%E0%A6%87%E0%A7%84"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold shadow-sm transition-all hover:shadow"
              title="WhatsApp: 01981721686"
            >
              <span>💬</span>
              <span>{lang === 'en' ? 'WhatsApp' : 'হোয়াটসঅ্যাপ'}</span>
            </a>

            {/* Prescription Upload Button */}
            <button
              onClick={onOpenPrescription}
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold shadow-sm transition-all hover:shadow"
            >
              <FileText className="w-4 h-4" />
              <span className="whitespace-nowrap">{lang === 'en' ? 'Upload Rx' : 'প্রেসক্রিপশন পাঠান'}</span>
            </button>

            {/* Wishlist count */}
            <div className="relative hidden md:block">
              <button 
                className="p-2.5 rounded-xl text-slate-600 hover:text-emerald-700 hover:bg-slate-100 transition-colors"
                title="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>
            </div>

            {/* Shopping Cart (Daraz style with count and total preview) */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 text-emerald-900 transition-colors"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-emerald-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-[11px] font-bold px-1.5 min-w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="text-left hidden lg:block">
                <p className="text-[10px] text-slate-500 font-medium leading-none">{lang === 'en' ? 'Cart Total' : 'মোট কার্ট'}</p>
                <p className="text-xs font-bold text-emerald-800 tabular-nums">৳{cartTotal}</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Categories Bar (Daraz Mega Navigation) */}
      <div className="bg-slate-900 text-white text-xs font-medium border-t border-slate-800 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 md:gap-4 py-2">
          {/* All Categories Dropdown Toggle */}
          <div className="relative shrink-0">
            <button
              onClick={() => setShowCategoryMenu(!showCategoryMenu)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors"
            >
              <span>{lang === 'en' ? 'Categories' : 'ক্যাটাগরি সমূহ'}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {showCategoryMenu && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onSelectCategory(cat.id);
                      setShowCategoryMenu(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between hover:bg-emerald-50 transition-colors ${
                      currentCategory === cat.id ? 'bg-emerald-50 font-bold text-emerald-700' : 'text-slate-700'
                    }`}
                  >
                    <span>{lang === 'en' ? cat.name : cat.bn}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap scrollbar-none py-0.5">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3 py-1 rounded-lg text-xs transition-colors shrink-0 ${
                  currentCategory === cat.id 
                    ? 'bg-slate-800 text-emerald-400 font-bold' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {lang === 'en' ? cat.name : cat.bn}
              </button>
            ))}
          </div>

          <div className="ml-auto hidden xl:flex items-center gap-3 text-emerald-300 shrink-0">
            <span className="text-[11px] font-semibold flex items-center gap-1">
              <Truck className="w-3 h-3" /> {lang === 'en' ? 'Free Delivery on ৳1,500+' : '৳১,৫০০+ অর্ডারে ফ্রি ডেলিভারি'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
