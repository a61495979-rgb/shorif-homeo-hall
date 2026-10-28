import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  Settings, 
  Package, 
  Check, 
  RotateCcw,
  ShieldCheck
} from 'lucide-react';
import { Product, StoreSettings, CategoryType, MedicineOrigin } from '../types';
import { CATEGORIES, RECKEWEG_IMAGE, MOTHER_TINCTURE_IMAGE, BIOCHEMIC_IMAGE, HERO_IMAGE } from '../data/mockData';

interface AdminEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSaveProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onAddNewProduct: (product: Product) => void;
  onResetProducts: () => void;
  settings: StoreSettings;
  onSaveSettings: (settings: StoreSettings) => void;
  editingProduct: Product | null;
  onSetEditingProduct: (product: Product | null) => void;
  lang: 'en' | 'bn';
}

export const AdminEditModal: React.FC<AdminEditModalProps> = ({
  isOpen,
  onClose,
  products,
  onSaveProduct,
  onDeleteProduct,
  onAddNewProduct,
  onResetProducts,
  settings,
  onSaveSettings,
  editingProduct,
  onSetEditingProduct,
  lang,
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'store'>('products');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [storeForm, setStoreForm] = useState<StoreSettings>({ ...settings });
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form state for current product edit/add
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    bengaliName: '',
    brand: 'Dr. Reckeweg (Germany)',
    originType: 'germany',
    category: 'dilutions',
    price: 350,
    originalPrice: 450,
    discountPercent: 20,
    rating: 4.8,
    reviewCount: 45,
    image: RECKEWEG_IMAGE,
    stockCount: 50,
    indication: '',
    dosage: '',
    description: '',
    origin: 'Germany',
    selectedPotency: '30C',
    selectedSize: '30ml',
    availablePotencies: ['30C', '200C', '1M'],
    availableSizes: ['15ml', '30ml', '100ml'],
  });

  // Whenever editingProduct changes, populate formData
  React.useEffect(() => {
    if (editingProduct) {
      setFormData({ ...editingProduct });
      setIsAddingNew(false);
      setActiveTab('products');
    }
  }, [editingProduct]);

  React.useEffect(() => {
    setStoreForm({ ...settings });
  }, [settings]);

  if (!isOpen) return null;

  const handleStartAddNew = () => {
    setIsAddingNew(true);
    onSetEditingProduct(null);
    setFormData({
      id: `shh-${Date.now().toString().slice(-4)}`,
      name: '',
      bengaliName: '',
      brand: 'Hahnemann Laboratories (Bangladesh)',
      originType: 'deshi',
      category: 'dilutions',
      price: 120,
      originalPrice: 150,
      discountPercent: 20,
      rating: 4.8,
      reviewCount: 10,
      image: MOTHER_TINCTURE_IMAGE,
      stockCount: 60,
      indication: 'ব্যবহার ও লক্ষণ...',
      dosage: '১০ ফোঁটা দিনে ৩ বার সেব্য।',
      description: 'খাঁটি দেশীয়/জার্মান প্রস্তুতকৃত হোমিওপ্যাথিক ঔষধ।',
      origin: 'Dhaka, Bangladesh',
      selectedPotency: '30C',
      selectedSize: '30ml',
      availablePotencies: ['30C', '200C', 'Q'],
      availableSizes: ['15ml', '30ml', '100ml'],
    });
  };

  const handleSaveProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.bengaliName) return;

    const discount = formData.originalPrice && formData.price 
      ? Math.max(0, Math.round(((formData.originalPrice - formData.price) / formData.originalPrice) * 100))
      : 0;

    const updated: Product = {
      id: formData.id || `shh-${Date.now().toString().slice(-4)}`,
      name: formData.name,
      bengaliName: formData.bengaliName,
      brand: formData.brand || 'Dr. Reckeweg (Germany)',
      originType: formData.originType || 'germany',
      category: (formData.category as CategoryType) || 'dilutions',
      price: Number(formData.price) || 100,
      originalPrice: Number(formData.originalPrice) || Number(formData.price) || 100,
      discountPercent: discount,
      rating: Number(formData.rating) || 4.8,
      reviewCount: Number(formData.reviewCount) || 20,
      image: formData.image || RECKEWEG_IMAGE,
      stockCount: Number(formData.stockCount) || 50,
      soldCount: formData.soldCount || 10,
      indication: formData.indication || 'ব্যবহার নির্দেশিকা',
      dosage: formData.dosage || 'সেবনবিধি',
      description: formData.description || 'ঔষধের বিবরণ',
      origin: formData.origin || (formData.originType === 'germany' ? 'Germany' : 'Bangladesh'),
      selectedPotency: formData.selectedPotency || '30C',
      selectedSize: formData.selectedSize || '30ml',
      availablePotencies: formData.availablePotencies || ['30C', '200C'],
      availableSizes: formData.availableSizes || ['30ml'],
      isDarazMall: formData.originType === 'germany',
      freeShipping: Number(formData.price) > 500,
    };

    if (isAddingNew) {
      onAddNewProduct(updated);
    } else {
      onSaveProduct(updated);
    }

    onSetEditingProduct(null);
    setIsAddingNew(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleSaveStoreSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(storeForm);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center font-bold">
              🛠️
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {lang === 'en' ? 'Store & Medicine Manager' : 'শরীফ হোমিও হল - এডিট ও ম্যানেজমেন্ট প্যানেল'}
              </h2>
              <p className="text-xs text-slate-400">
                {lang === 'en' ? 'Edit any product, change prices, text, or store details' : 'সব ঔষধ এডিট করুন, নতুন ঔষধ যোগ করুন ও সাইটের লেখা পরিবর্তন করুন'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center justify-between px-6 py-2.5 bg-slate-50 border-b border-slate-200 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveTab('products');
                setIsAddingNew(false);
              }}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-colors ${
                activeTab === 'products'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? `Medicines Catalog (${products.length})` : `ঔষধ তালিকা ও এডিট (${products.length}টি)`}</span>
            </button>

            <button
              onClick={() => setActiveTab('store')}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-colors ${
                activeTab === 'store'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Top Text & Store Settings' : 'উপরের লেখা ও দোকানের তথ্য'}</span>
            </button>
          </div>

          {activeTab === 'products' && !isAddingNew && !editingProduct && (
            <button
              onClick={handleStartAddNew}
              className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold flex items-center gap-1 shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? '+ Add New Medicine' : '+ নতুন ঔষধ যোগ করুন'}</span>
            </button>
          )}
        </div>

        {saveSuccess && (
          <div className="mx-6 mt-3 p-2.5 bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-semibold rounded-xl flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-700" />
            <span>সফলভাবে সেভ করা হয়েছে! (Changes saved successfully!)</span>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'store' ? (
            /* STORE SETTINGS FORM (TOP TEXT, PHONE, WHATSAPP, EMAIL) */
            <form onSubmit={handleSaveStoreSettings} className="space-y-4 max-w-2xl">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 font-medium">
                💡 <span className="font-bold">উপরের লেখাটি এখান থেকে পরিবর্তন করতে পারবেন:</span> আপনি চাইলে "১০০% খাঁটি জার্মানি ও দেশি ওষুধ" অথবা নিজের মতো যেকোনো ঘোষণা টেক্সট দিতে পারেন।
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  উপরের প্রধান ব্যানার ও নোটিশ টেক্সট (Top Announcement Text):
                </label>
                <input
                  type="text"
                  required
                  value={storeForm.topNotice}
                  onChange={(e) => setStoreForm({ ...storeForm, topNotice: e.target.value })}
                  placeholder="১০০% খাঁটি জার্মানি ও দেশি ওষুধ"
                  className="w-full px-3 py-2 text-sm font-bold text-slate-900 rounded-xl border border-slate-300 focus:border-emerald-600 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    হটলাইন / মোবাইল নম্বর (Phone):
                  </label>
                  <input
                    type="tel"
                    required
                    value={storeForm.phone}
                    onChange={(e) => setStoreForm({ ...storeForm, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-emerald-600 outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    হোয়াটসঅ্যাপ নম্বর (WhatsApp):
                  </label>
                  <input
                    type="tel"
                    required
                    value={storeForm.whatsapp}
                    onChange={(e) => setStoreForm({ ...storeForm, whatsapp: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-emerald-600 outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    ইমেইল ঠিকানা (Email Address):
                  </label>
                  <input
                    type="email"
                    required
                    value={storeForm.email}
                    onChange={(e) => setStoreForm({ ...storeForm, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-emerald-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    চেম্বার / শপ ঠিকানা (Address):
                  </label>
                  <input
                    type="text"
                    value={storeForm.address}
                    onChange={(e) => setStoreForm({ ...storeForm, address: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-emerald-600 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  প্রধান হিরো ব্যানার শিরোনাম (Hero Headline):
                </label>
                <input
                  type="text"
                  value={storeForm.heroTitle}
                  onChange={(e) => setStoreForm({ ...storeForm, heroTitle: e.target.value })}
                  placeholder="১০০% খাঁটি জার্মানি ও দেশি ওষুধ"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-emerald-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  হিরো ব্যানার বিস্তারিত বিবরণ (Hero Subtitle):
                </label>
                <textarea
                  rows={2}
                  value={storeForm.heroSubtitle}
                  onChange={(e) => setStoreForm({ ...storeForm, heroSubtitle: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-emerald-600 outline-none"
                />
              </div>

              <button
                type="submit"
                className="py-2.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>দোকানের তথ্য সংরক্ষণ করুন (Save Store Info)</span>
              </button>
            </form>
          ) : isAddingNew || editingProduct ? (
            /* PRODUCT EDIT / ADD FORM */
            <form onSubmit={handleSaveProductSubmit} className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-emerald-600" />
                  <span>{isAddingNew ? 'নতুন ঔষধ যোগ করুন (Add New Medicine)' : `ঔষধ এডিট করুন: ${formData.name}`}</span>
                </h3>

                <button
                  type="button"
                  onClick={() => {
                    setIsAddingNew(false);
                    onSetEditingProduct(null);
                  }}
                  className="text-xs text-slate-500 hover:text-slate-800"
                >
                  বাতিল (Cancel)
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ঔষধের নাম (English Name) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Arnica Montana 30C"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-emerald-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    বাংলা নাম (Bangla Name) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: আর্নিকা মন্টানা ৩০সি"
                    value={formData.bengaliName || ''}
                    onChange={(e) => setFormData({ ...formData, bengaliName: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-emerald-600 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ঔষধের উৎস (Origin) *
                  </label>
                  <select
                    value={formData.originType || 'germany'}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      originType: e.target.value as MedicineOrigin,
                      origin: e.target.value === 'germany' ? 'Germany' : 'Bangladesh'
                    })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-emerald-600 outline-none bg-white font-semibold"
                  >
                    <option value="germany">🇩🇪 জার্মান ঔষধ (Germany Imported)</option>
                    <option value="deshi">🇧🇩 দেশীয় ঔষধ (Deshi Bangladesh)</option>
                    <option value="india">🇮🇳 ভারতীয় ঔষধ (India)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ব্র্যান্ড / কোম্পানি (Brand)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Reckeweg / Hahnemann Lab BD"
                    value={formData.brand || ''}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-emerald-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ক্যাটাগরি (Category)
                  </label>
                  <select
                    value={formData.category || 'dilutions'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as CategoryType })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-emerald-600 outline-none bg-white"
                  >
                    {CATEGORIES.filter(c => c.id !== 'all' && c.id !== 'germany-special' && c.id !== 'deshi-special').map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.bn}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    বিক্রয় মূল্য (Price ৳) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price || 0}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-emerald-600 outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    আসল মূল্য (Original ৳)
                  </label>
                  <input
                    type="number"
                    value={formData.originalPrice || 0}
                    onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-emerald-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    স্টক পরিমাণ (Stock)
                  </label>
                  <input
                    type="number"
                    value={formData.stockCount || 50}
                    onChange={(e) => setFormData({ ...formData, stockCount: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-emerald-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    প্যাক সাইজ (Size)
                  </label>
                  <input
                    type="text"
                    placeholder="15ml / 30ml / 100ml"
                    value={formData.selectedSize || '30ml'}
                    onChange={(e) => setFormData({ ...formData, selectedSize: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-emerald-600 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  রোগের লক্ষণ ও ব্যবহার নির্দেশিকা (Indication):
                </label>
                <textarea
                  rows={2}
                  value={formData.indication || ''}
                  onChange={(e) => setFormData({ ...formData, indication: e.target.value })}
                  placeholder="যেমন: সর্দি, কাশি, ব্যথা ইত্যাদিতে নির্দেশিত..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-emerald-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  সেবনবিধি (Dosage):
                </label>
                <input
                  type="text"
                  value={formData.dosage || ''}
                  onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                  placeholder="যেমন: ১০ ফোঁটা পানিতে দিনে ৩ বার সেব্য।"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-emerald-600 outline-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="py-2.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{isAddingNew ? 'নতুন ঔষধ সেভ করুন' : 'ঔষধ আপডেট করুন'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsAddingNew(false);
                    onSetEditingProduct(null);
                  }}
                  className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                >
                  বাতিল
                </button>
              </div>
            </form>
          ) : (
            /* PRODUCT LIST TABLE VIEW (ALL MEDICINES WITH EDIT / DELETE BUTTONS) */
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 pb-2">
                <span>মোট {products.length}টি ঔষধ ক্যাটালগে রয়েছে। যেকোনো ঔষধ এডিট করতে 'এডিট' বাটনে চাপ দিন।</span>
                <button
                  onClick={onResetProducts}
                  className="text-amber-700 hover:underline flex items-center gap-1 font-semibold"
                  title="Restore original sample products"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>ডিফল্ট রিসেট</span>
                </button>
              </div>

              <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-white">
                {products.map(prod => (
                  <div key={prod.id} className="p-3.5 flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 object-contain rounded-lg bg-slate-100 p-1 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                            prod.originType === 'germany' 
                              ? 'bg-slate-900 text-amber-300' 
                              : prod.originType === 'deshi'
                              ? 'bg-emerald-800 text-white'
                              : 'bg-orange-100 text-orange-900'
                          }`}>
                            {prod.originType === 'germany' ? '🇩🇪 জার্মান' : prod.originType === 'deshi' ? '🇧🇩 দেশীয়' : '🇮🇳 ভারত'}
                          </span>
                          <h4 className="text-xs font-bold text-slate-900 truncate">{prod.name}</h4>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">{prod.bengaliName} · {prod.brand}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <div className="text-xs font-bold text-slate-900 tabular-nums">৳{prod.price}</div>
                        <div className="text-[10px] text-slate-400">স্টক: {prod.stockCount || 50}</div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            onSetEditingProduct(prod);
                            setIsAddingNew(false);
                          }}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800 transition-colors"
                          title="Edit this medicine"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteProduct(prod.id)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-100 text-slate-700 hover:text-rose-700 transition-colors"
                          title="Delete this medicine"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
