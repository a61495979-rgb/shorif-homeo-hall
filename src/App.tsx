/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowUpDown, 
  Star, 
  Heart,
  SlidersHorizontal,
  ChevronRight,
  FileText,
  PhoneCall
} from 'lucide-react';
import { CategoryType, Product, CartItem, Order, StoreSettings } from './types';
import { PRODUCTS, CATEGORIES, REVIEWS, VOUCHERS, SAMPLE_ORDERS } from './data/mockData';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { FlashDeals } from './components/FlashDeals';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackModal } from './components/OrderTrackModal';
import { PrescriptionUploadModal } from './components/PrescriptionUploadModal';
import { DoctorConsultModal } from './components/DoctorConsultModal';
import { AdminEditModal } from './components/AdminEditModal';
import { Footer } from './components/Footer';

export default function App() {
  // Localization: default to Bangla ('bn') as requested
  const [lang, setLang] = useState<'en' | 'bn'>('bn');

  // Store Settings (Top notice, Phone, WhatsApp, Email, Headlines)
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem('shh_settings');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return {
      topNotice: '১০০% খাঁটি জার্মানি ও দেশি ওষুধ',
      phone: '01981721686',
      whatsapp: '01981721686',
      email: '86smohammad86@gmail.com',
      ownerName: 'এস. মোহাম্মদ (S. Mohammad)',
      ownerEmail: '86smohammad86@gmail.com',
      address: '14/B Motijheel C/A, Dhaka-1000',
      heroTitle: '১০০% খাঁটি জার্মানি ও দেশি ওষুধ',
      heroSubtitle: 'জার্মানির ডক্টর রেকেওয়েগ, শোয়াবে এবং বাংলাদেশের প্রতিষ্ঠিত ল্যাবরেটরিজের আসল ঔষধ ঘরে বসেই পান দ্রুততম ডেলিভারিতে।'
    };
  });

  // Dynamic Editable Products Catalog with localStorage Persistence
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('shh_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      // ignore
    }
    return PRODUCTS;
  });

  // Filter & Search states
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [onlyInStock, setOnlyInStock] = useState(false);

  // Cart & Wishlist states
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      quantity: 1,
      potency: '30C',
      size: '11ml Original'
    }
  ]);
  const [wishlist, setWishlist] = useState<string[]>(['shh-02', 'shh-05']);
  const [appliedVoucher, setAppliedVoucher] = useState<string | null>('SHORIF50');

  // Order history
  const [orders, setOrders] = useState<Order[]>([SAMPLE_ORDERS['SHH-89421']]);

  // Modals
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderTrackOpen, setIsOrderTrackOpen] = useState(false);
  const [isPrescriptionOpen, setIsPrescriptionOpen] = useState(false);
  const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false);

  // Admin / Edit Product Modal
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Cart Calculations
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  
  let discount = 0;
  if (appliedVoucher === 'SHORIF50' && subtotal >= 800) {
    discount = 50;
  } else if (appliedVoucher === 'HOMEO10' && subtotal >= 1500) {
    discount = Math.round(subtotal * 0.1);
  }

  const isFreeDelivery = subtotal >= 1500 || appliedVoucher === 'FREEHOME';
  const deliveryFee = cartItems.length === 0 ? 0 : (isFreeDelivery ? 0 : 60);
  const cartTotal = Math.max(0, subtotal - discount + deliveryFee);

  // Handlers for cart
  const handleAddToCart = (product: Product, quantity = 1, potency?: string, size?: string) => {
    const selectedPotency = potency || product.selectedPotency || (product.availablePotencies ? product.availablePotencies[0] : 'Standard');
    const selectedSize = size || product.selectedSize || (product.availableSizes ? product.availableSizes[0] : 'Standard');

    setCartItems(prev => {
      const existingIdx = prev.findIndex(
        i => i.product.id === product.id && i.potency === selectedPotency && i.size === selectedSize
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity, potency: selectedPotency, size: selectedSize }];
    });
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    setCartItems(prev => {
      const updated = [...prev];
      if (newQty <= 0) {
        return updated.filter((_, idx) => idx !== index);
      }
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleApplyVoucher = (code: string) => {
    if (code === 'SHORIF50' && subtotal >= 800) {
      setAppliedVoucher('SHORIF50');
      return true;
    }
    if (code === 'HOMEO10' && subtotal >= 1500) {
      setAppliedVoucher('HOMEO10');
      return true;
    }
    if (code === 'FREEHOME') {
      setAppliedVoucher('FREEHOME');
      return true;
    }
    return false;
  };

  const handleBuyNow = (product: Product, quantity = 1, potency?: string, size?: string) => {
    handleAddToCart(product, quantity, potency, size);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (newOrder: Order) => {
    setOrders(prev => [newOrder, ...prev]);
    setCartItems([]);
  };

  // CRUD Handlers for Products
  const handleSaveProduct = (updated: Product) => {
    setProducts(prev => {
      const idx = prev.findIndex(p => p.id === updated.id);
      let next: Product[];
      if (idx > -1) {
        next = [...prev];
        next[idx] = updated;
      } else {
        next = [updated, ...prev];
      }
      try {
        localStorage.setItem('shh_products', JSON.stringify(next));
      } catch (e) {
        // ignore
      }
      return next;
    });
  };

  const handleAddNewProduct = (newProd: Product) => {
    setProducts(prev => {
      const next = [newProd, ...prev];
      try {
        localStorage.setItem('shh_products', JSON.stringify(next));
      } catch (e) {
        // ignore
      }
      return next;
    });
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => {
      const next = prev.filter(p => p.id !== productId);
      try {
        localStorage.setItem('shh_products', JSON.stringify(next));
      } catch (e) {
        // ignore
      }
      return next;
    });
  };

  const handleResetProducts = () => {
    setProducts(PRODUCTS);
    try {
      localStorage.removeItem('shh_products');
    } catch (e) {
      // ignore
    }
  };

  const handleSaveSettings = (newSettings: StoreSettings) => {
    setStoreSettings(newSettings);
    try {
      localStorage.setItem('shh_settings', JSON.stringify(newSettings));
    } catch (e) {
      // ignore
    }
  };

  const handleEditProductFromCard = (product: Product) => {
    setEditingProduct(product);
    setIsAdminModalOpen(true);
  };

  // Filtered Products (uses dynamic products state)
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Germany & Deshi Special Filter Tabs
      if (selectedCategory === 'germany-special' && p.originType !== 'germany') return false;
      if (selectedCategory === 'deshi-special' && p.originType !== 'deshi') return false;
      if (selectedCategory !== 'all' && selectedCategory !== 'germany-special' && selectedCategory !== 'deshi-special' && p.category !== selectedCategory) return false;

      // Brand match
      if (selectedBrand !== 'all' && !p.brand.toLowerCase().includes(selectedBrand.toLowerCase())) return false;
      // In stock
      if (onlyInStock && p.stockCount && p.stockCount <= 0) return false;
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesBn = p.bengaliName.toLowerCase().includes(q);
        const matchesBrand = p.brand.toLowerCase().includes(q);
        const matchesIndication = p.indication.toLowerCase().includes(q);
        if (!matchesName && !matchesBn && !matchesBrand && !matchesIndication) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // 'featured'
    });
  }, [products, selectedCategory, selectedBrand, onlyInStock, searchQuery, sortBy]);

  const brands = [
    { id: 'all', name: 'All Brands (সব ব্র্যান্ড)' },
    { id: 'Reckeweg', name: 'Dr. Reckeweg (Germany 🇩🇪)' },
    { id: 'Schwabe', name: 'Dr. Willmar Schwabe (Germany 🇩🇪)' },
    { id: 'Adel', name: 'Adel Pekana (Germany 🇩🇪)' },
    { id: 'Hahnemann', name: 'Hahnemann Lab (Bangladesh 🇧🇩)' },
    { id: 'Pioneer', name: 'Pioneer Homeo (Bangladesh 🇧🇩)' },
    { id: 'Federal', name: 'Federal Homeo (Bangladesh 🇧🇩)' },
    { id: 'SBL', name: 'SBL Global (India 🇮🇳)' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f7]">
      {/* Top Header */}
      <Header
        currentCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={cartCount}
        cartTotal={cartTotal}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenPrescription={() => setIsPrescriptionOpen(true)}
        onOpenDoctorModal={() => setIsDoctorModalOpen(true)}
        onOpenOrderTrack={() => setIsOrderTrackOpen(true)}
        onSelectProduct={(p) => setActiveProductModal(p)}
        lang={lang}
        onToggleLang={() => setLang(l => l === 'en' ? 'bn' : 'en')}
        topNotice={storeSettings.topNotice}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        ownerEmail={storeSettings.ownerEmail}
      />

      {/* Hero Showcase & Quick Services */}
      <HeroBanner
        currentCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onOpenPrescription={() => setIsPrescriptionOpen(true)}
        onOpenDoctorModal={() => setIsDoctorModalOpen(true)}
        lang={lang}
        heroTitle={storeSettings.heroTitle}
        heroSubtitle={storeSettings.heroSubtitle}
      />

      {/* Flash Deals Section (Daraz iconic feature) */}
      <FlashDeals
        products={products}
        onSelectProduct={(p) => setActiveProductModal(p)}
        onAddToCart={(p) => handleAddToCart(p, 1)}
        lang={lang}
      />

      {/* ShorifMall Official Brands Ribbon */}
      <div className="max-w-7xl mx-auto px-4 py-2 w-full">
        <div className="bg-white rounded-2xl p-4 md:p-5 border border-slate-200/80 shadow-2xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-700 text-white text-xs font-bold px-2 py-0.5 rounded tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                MALL
              </span>
              <h2 className="text-sm md:text-base font-extrabold text-slate-900">
                {lang === 'en' ? 'Official Certified Brands' : 'অফিসিয়াল সার্টিফাইড ব্র্যান্ডসমূহ'}
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              {lang === 'en' ? '100% Original Sealed Packaging Guaranteed' : '১০০% অরিজিনাল সিলযুক্ত গ্যারান্টি'}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { name: 'Dr. Reckeweg & Co.', origin: 'Bensheim, Germany', code: 'Reckeweg' },
              { name: 'Dr. Willmar Schwabe', origin: 'Karlsruhe, Germany', code: 'Schwabe' },
              { name: 'SBL Global Homeopathy', origin: 'New Delhi, India', code: 'SBL' },
              { name: 'Adelmar Pharma Pekana', origin: 'Osterberg, Germany', code: 'Adel' },
            ].map(b => (
              <button
                key={b.code}
                onClick={() => setSelectedBrand(selectedBrand === b.code ? 'all' : b.code)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedBrand === b.code
                    ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-[#fafafa]'
                }`}
              >
                <div className="text-xs font-bold text-slate-900 truncate">{b.name}</div>
                <div className="text-[10px] text-emerald-800 font-medium truncate">{b.origin}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Catalog & Filter Area */}
      <main className="max-w-7xl mx-auto px-4 py-4 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Desktop Filter Sidebar (Daraz-style multi-filter) */}
          <div className="hidden lg:block lg:col-span-3 space-y-4">
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-600" />
                  {lang === 'en' ? 'Filters' : 'ফিল্টার'}
                </span>
                {(selectedCategory !== 'all' || selectedBrand !== 'all' || onlyInStock || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedBrand('all');
                      setOnlyInStock(false);
                      setSearchQuery('');
                    }}
                    className="text-[11px] text-rose-600 hover:underline font-semibold"
                  >
                    {lang === 'en' ? 'Reset All' : 'রিসেট'}
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {lang === 'en' ? 'Category' : 'ক্যাটাগরি'}
                </h4>
                <div className="space-y-1">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                        selectedCategory === cat.id
                          ? 'bg-emerald-50 text-emerald-800 font-bold'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="truncate">{lang === 'en' ? cat.name : cat.bn}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {lang === 'en' ? 'Brand / Origin' : 'ব্র্যান্ড'}
                </h4>
                <div className="space-y-1">
                  {brands.map(b => (
                    <button
                      key={b.id}
                      onClick={() => setSelectedBrand(b.id)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                        selectedBrand === b.id
                          ? 'bg-emerald-50 text-emerald-800 font-bold'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="truncate">{b.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* In-Stock Toggle */}
              <div className="pt-2 border-t border-slate-100">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                  />
                  <span>{lang === 'en' ? 'In-Stock Only' : 'শুধু স্টকে থাকা ঔষধ'}</span>
                </label>
              </div>

              {/* Active Coupons Helper */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/60 text-xs text-amber-900 space-y-1.5">
                <p className="font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  {lang === 'en' ? 'Collectable Vouchers' : 'উপলব্ধ ভাউচার'}
                </p>
                <div className="text-[11px] text-amber-800 space-y-1 font-mono">
                  <p>• <span className="font-bold">SHORIF50</span>: ৳50 OFF on ৳800+</p>
                  <p>• <span className="font-bold">HOMEO10</span>: 10% OFF on ৳1,500+</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Product Grid Area */}
          <div className="lg:col-span-9 space-y-4">
            {/* Top Bar for Results & Sorting */}
            <div className="bg-white rounded-2xl p-3.5 px-4 border border-slate-200/80 shadow-2xs space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm md:text-base font-extrabold text-slate-900">
                    {selectedCategory === 'all' 
                      ? (lang === 'en' ? 'All Homeopathic Remedies' : 'সকল হোমিওপ্যাথিক ঔষধ')
                      : selectedCategory === 'germany-special'
                      ? (lang === 'en' ? '🇩🇪 Original German Imported Medicines' : '🇩🇪 ১০০% আসল জার্মান হোমিও ঔষধ')
                      : selectedCategory === 'deshi-special'
                      ? (lang === 'en' ? '🇧🇩 Authentic Deshi Bangladeshi Medicines' : '🇧🇩 বিশ্বস্ত ও সুলভ দেশীয় হোমিও ঔষধ')
                      : (CATEGORIES.find(c => c.id === selectedCategory)?.name || 'Remedies')}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {lang === 'en' ? `Showing ${filteredProducts.length} remedies` : `${filteredProducts.length}টি ঔষধ পাওয়া গেছে`}
                  </p>
                </div>

                {/* Sorting Menu */}
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <span className="text-xs text-slate-500 font-medium whitespace-nowrap">
                    {lang === 'en' ? 'Sort by:' : 'সাজান:'}
                  </span>
                  <select
                    aria-label="Sort products by"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs text-slate-700 bg-white outline-none focus:border-emerald-600"
                  >
                    <option value="featured">Popular & Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
              </div>

              {/* Germany vs Deshi Quick Segmented Switcher */}
              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-700 mr-1">
                  {lang === 'en' ? 'Quick Origin:' : 'ঔষধের উৎস:'}
                </span>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-emerald-700 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {lang === 'en' ? 'All Medicines' : 'সব ঔষধ (All)'}
                </button>

                <button
                  onClick={() => setSelectedCategory('germany-special')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    selectedCategory === 'germany-special'
                      ? 'bg-slate-900 text-amber-300 shadow-2xs ring-2 ring-amber-400/40'
                      : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  <span>🇩🇪</span>
                  <span>{lang === 'en' ? 'Germany Imported' : 'জার্মান ঔষধ (Germany)'}</span>
                </button>

                <button
                  onClick={() => setSelectedCategory('deshi-special')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    selectedCategory === 'deshi-special'
                      ? 'bg-emerald-800 text-white shadow-2xs ring-2 ring-emerald-500/40'
                      : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  <span>🇧🇩</span>
                  <span>{lang === 'en' ? 'Deshi BD Medicines' : 'দেশীয় ঔষধ (Deshi BD)'}</span>
                </button>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200/80">
                <p className="text-sm font-bold text-slate-800 mb-1">
                  {lang === 'en' ? 'No homeopathic remedies match your criteria' : 'আপনার পছন্দের কোনো ঔষধ পাওয়া যায়নি'}
                </p>
                <p className="text-xs text-slate-500 mb-4">
                  {lang === 'en' ? 'Try adjusting your search terms or filters.' : 'অনুগ্রহ করে ফিল্টার পরিবর্তন করুন বা সার্চ পরিবর্তন করুন।'}
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedBrand('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
                >
                  {lang === 'en' ? 'View All Medicines' : 'সব ঔষধ দেখুন'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={(p) => setActiveProductModal(p)}
                    onAddToCart={(p) => handleAddToCart(p, 1)}
                    onEditProduct={handleEditProductFromCard}
                    lang={lang}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Doctor & Prescription Consultation Banner */}
      <section className="max-w-7xl mx-auto px-4 py-6 w-full">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 p-6 md:p-8 text-white shadow-md relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                {lang === 'en' ? 'Specialist Clinical Healthcare' : 'অভিজ্ঞ ডাক্তারের চিকিৎসা সেবা'}
              </span>
              <h3 className="text-xl md:text-2xl font-bold leading-snug">
                {lang === 'en' 
                  ? 'Need Classical Homeopathic Prescription or Case Taking?'
                  : 'দীর্ঘস্থায়ী রোগের সঠিক হোমিওপ্যাথিক সমাধান ও পরামর্শ চান?'}
              </h3>
              <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
                {lang === 'en'
                  ? 'Consult Senior Homeopathic Physician Dr. Md. Shorif Ullah (BHMS DU) or upload your existing prescription. We carefully dispense pure dilutions under laminar airflow standards.'
                  : 'ঢাকা বিশ্ববিদ্যালয়ের বিএইচএমএস ডিগ্রিধারী সিনিয়র চিকিৎসকের পরামর্শ নিন অথবা আপনার প্রেসক্রিপশন আপলোড করে খাঁটি জার্মান ঔষধ সংগ্রহ করুন।'}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-emerald-200">
                <span className="flex items-center gap-1.5 font-bold text-white">
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                  <a href="tel:01981721686" className="hover:text-emerald-300">০১৯৮১৭২১৬৮৬ (01981721686)</a>
                </span>
                <span className="text-emerald-400/50">·</span>
                <span className="flex items-center gap-1.5">
                  <span>✉</span>
                  <a href="mailto:86smohammad86@gmail.com" className="hover:text-emerald-300 font-medium">86smohammad86@gmail.com</a>
                </span>
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 justify-center">
              <button
                onClick={() => setIsDoctorModalOpen(true)}
                className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-colors text-center"
              >
                {lang === 'en' ? 'Book Doctor Appointment (৳300)' : 'ডাক্তার অ্যাপয়েন্টমেন্ট বুক করুন'}
              </button>
              <button
                onClick={() => setIsPrescriptionOpen(true)}
                className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs transition-colors text-center"
              >
                {lang === 'en' ? 'Upload Prescription Slip' : 'প্রেসক্রিপশন আপলোড করুন'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Patient Reviews (Social Proof) */}
      <section className="max-w-7xl mx-auto px-4 py-4 w-full">
        <div className="bg-white rounded-2xl p-5 md:p-6 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                {lang === 'en' ? 'Verified Patient & Customer Reviews' : 'গ্রাহক ও রোগীদের বাস্তব অভিজ্ঞতা'}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'en' ? 'Real feedback from patients across Dhaka, Chittagong, Sylhet' : 'সারা বাংলাদেশ থেকে সম্মানিত রোগীদের মূল্যবান মতামত'}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>4.9 / 5.0 (2,400+ Orders)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {REVIEWS.map(rev => (
              <div key={rev.id} className="p-4 rounded-xl bg-[#fafafa] border border-slate-200/70 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400">{rev.date}</span>
                </div>

                <p className="text-slate-700 italic leading-relaxed">
                  "{rev.comment}"
                </p>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                  <div>
                    <span className="font-bold text-slate-900">{rev.author}</span>
                    <span className="text-slate-400 block">{rev.city}</span>
                  </div>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Verified Buyer
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer
        onSelectCategory={setSelectedCategory}
        onOpenOrderTrack={() => setIsOrderTrackOpen(true)}
        onOpenDoctorModal={() => setIsDoctorModalOpen(true)}
        onOpenPrescription={() => setIsPrescriptionOpen(true)}
        lang={lang}
        ownerName={storeSettings.ownerName}
        ownerEmail={storeSettings.ownerEmail}
      />

      {/* MODALS & DRAWERS */}
      {/* 1. Product Detail Modal */}
      <ProductDetailModal
        product={activeProductModal}
        onClose={() => setActiveProductModal(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        lang={lang}
      />

      {/* 2. Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        appliedVoucher={appliedVoucher}
        onApplyVoucher={handleApplyVoucher}
        lang={lang}
      />

      {/* 3. Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        subtotal={subtotal}
        discount={discount}
        deliveryFee={deliveryFee}
        total={cartTotal}
        onOrderSuccess={handleOrderSuccess}
        lang={lang}
      />

      {/* 4. Track My Order Modal */}
      <OrderTrackModal
        isOpen={isOrderTrackOpen}
        onClose={() => setIsOrderTrackOpen(false)}
        recentOrders={orders}
        lang={lang}
      />

      {/* 5. Upload Prescription Modal */}
      <PrescriptionUploadModal
        isOpen={isPrescriptionOpen}
        onClose={() => setIsPrescriptionOpen(false)}
        lang={lang}
      />

      {/* 6. Doctor Consultation Appointment Modal */}
      <DoctorConsultModal
        isOpen={isDoctorModalOpen}
        onClose={() => setIsDoctorModalOpen(false)}
        lang={lang}
      />

      {/* 7. Admin / Store & Medicines Edit Modal */}
      <AdminEditModal
        isOpen={isAdminModalOpen}
        onClose={() => {
          setIsAdminModalOpen(false);
          setEditingProduct(null);
        }}
        products={products}
        onSaveProduct={handleSaveProduct}
        onDeleteProduct={handleDeleteProduct}
        onAddNewProduct={handleAddNewProduct}
        onResetProducts={handleResetProducts}
        settings={storeSettings}
        onSaveSettings={handleSaveSettings}
        editingProduct={editingProduct}
        onSetEditingProduct={setEditingProduct}
        lang={lang}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center group">
        <a
          href="https://wa.me/8801981721686?text=%E0%A6%86%E0%A6%B8%E0%A6%B8%E0%A6%BE%E0%A6%B2%E0%A6%BE%E0%A6%AE%E0%A7%81%20%E0%A6%86%E0%A6%B2%E0%A6%BE%E0%A6%87%E0%A6%95%E0%A7%81%E0%A6%AE%20%E0%A6%B6%E0%A6%B0%E0%A7%80%E0%A6%AB%20%E0%A6%B9%E0%A7%8B%E0%A6%AE%E0%A6%BF%E0%A6%93%20%E0%A6%B9%E0%A6%B2%2C%20%E0%A6%86%E0%A6%AE%E0%A6%BF%20%E0%A6%94%E0%A6%B7%E0%A6%A7%20%E0%A6%85%E0%A6%B0%E0%A7%8D%E0%A6%A1%E0%A6%BE%E0%A6%B0%20%E0%A6%AC%E0%A6%BE%20%E0%A6%A4%E0%A6%A5%E0%A7%8D%E0%A6%AF%20%E0%A6%9C%E0%A6%BE%E0%A6%A8%E0%A6%A4%E0%A7%87%20%E0%A6%9A%E0%A6%BE%E0%A6%87%E0%A7%84"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-3 rounded-full shadow-2xl hover:shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all duration-200"
          title="WhatsApp: 01981721686"
        >
          <span className="text-xl leading-none">💬</span>
          <div className="text-left hidden sm:block">
            <span className="text-[10px] block opacity-90 leading-tight">
              {lang === 'en' ? 'Chat on WhatsApp' : 'হোয়াটসঅ্যাপে চ্যাট / অর্ডার'}
            </span>
            <span className="text-xs font-bold font-mono tracking-wider">01981721686</span>
          </div>
        </a>
      </div>
    </div>
  );
}
