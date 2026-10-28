import React from 'react';
import { 
  ShieldCheck, 
  Truck, 
  Award, 
  Stethoscope, 
  FileUp, 
  ArrowRight,
  Flame
} from 'lucide-react';
import { CategoryType } from '../types';
import { CATEGORIES, HERO_IMAGE } from '../data/mockData';

interface HeroBannerProps {
  currentCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  onOpenPrescription: () => void;
  onOpenDoctorModal: () => void;
  lang: 'en' | 'bn';
  heroTitle?: string;
  heroSubtitle?: string;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  currentCategory,
  onSelectCategory,
  onOpenPrescription,
  onOpenDoctorModal,
  lang,
  heroTitle = '১০০% খাঁটি জার্মানি ও দেশি ওষুধ',
  heroSubtitle,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-4 pb-2">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Side: Desktop Category Tree (Daraz Marketplace style) */}
        <div className="hidden lg:block lg:col-span-3 bg-white rounded-2xl p-3 shadow-sm border border-slate-200/80">
          <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            {lang === 'en' ? 'Remedy Categories' : 'ঔষধের প্রধান বিভাগ'}
          </div>
          <div className="space-y-1">
            {CATEGORIES.map((cat) => {
              const isActive = currentCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm font-semibold'
                      : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-800'
                  }`}
                >
                  <span className="truncate">{lang === 'en' ? cat.name : cat.bn}</span>
                  <ArrowRight className={`w-3.5 h-3.5 opacity-60 ${isActive ? 'translate-x-0.5' : ''}`} />
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 px-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200/60">
              <Flame className="w-4 h-4 text-amber-500 shrink-0" />
              <span>{lang === 'en' ? 'Use code: SHORIF50 for ৳50 OFF' : 'ভাউচার কোড SHORIF50 দিয়ে ৳৫০ ছাড়'}</span>
            </div>
          </div>
        </div>

        {/* Center: Main Promotional Campaign Showcase */}
        <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-slate-900 group min-h-[300px] md:min-h-[360px] flex items-center">
          <img
            src={HERO_IMAGE}
            alt="Shorif Homeo Hall Apothecary"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent" />

          <div className="relative z-10 p-6 md:p-8 max-w-lg text-white">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-3">
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'en' ? '100% Genuine Medicine' : '১০০% খাঁটি ও গুণগত মান নিশ্চিত'}</span>
            </div>

            <div className="text-xs md:text-sm font-bold text-emerald-400 uppercase tracking-wide mb-1">
              শরীফ হোমিও হল (Shorif Homeo Hall)
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white mb-2 text-balance">
              {heroTitle}
            </h1>

            <p className="text-xs md:text-sm text-slate-300 mb-5 leading-relaxed">
              {heroSubtitle || (lang === 'en' 
                ? 'Shop original Dr. Reckeweg & Schwabe German dilutions and authentic Bangladeshi Hahnemann Lab homeopathic remedies with nationwide delivery.'
                : 'জার্মানির ডক্টর রেকেওয়েগ, শোয়াবে এবং বাংলাদেশের প্রতিষ্ঠিত ল্যাবরেটরিজের আসল ঔষধ ঘরে বসেই পান দ্রুততম ডেলিভারিতে।'
              )}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onSelectCategory('all')}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs md:text-sm font-bold shadow-md shadow-emerald-700/30 transition-all flex items-center gap-2"
              >
                <span>{lang === 'en' ? 'Shop Remedies' : 'ঔষধ অর্ডার করুন'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenPrescription}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs md:text-sm font-semibold border border-white/20 backdrop-blur-sm transition-colors flex items-center gap-2"
              >
                <FileUp className="w-4 h-4 text-amber-300" />
                <span>{lang === 'en' ? 'Upload Prescription' : 'প্রেসক্রিপশন দিন'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Quick Action & Healthcare Badges (Daraz Feature Box) */}
        <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-3">
          {/* Tile 1: Prescription Upload */}
          <div 
            onClick={onOpenPrescription}
            className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-200/80 cursor-pointer hover:border-amber-300 transition-all hover:shadow-sm"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-sm">
                <FileUp className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs md:text-sm font-bold text-slate-900 leading-tight">
                  {lang === 'en' ? 'Have a Prescription?' : 'প্রেসক্রিপশন আছে?'}
                </h4>
                <p className="text-[11px] text-amber-800 font-medium">
                  {lang === 'en' ? 'Fast Dispense & Delivery' : 'ছবি তুলে পাঠিয়ে দিন'}
                </p>
              </div>
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              {lang === 'en' 
                ? 'Our certified pharmacists verify and prepare genuine doses.'
                : 'আমাদের বিশেষজ্ঞ ফার্মাসিস্ট দেখে সঠিক ঔষধ তৈরি করে পাঠাবেন।'
              }
            </p>
          </div>

          {/* Tile 2: Online Doctor Consultation */}
          <div 
            onClick={onOpenDoctorModal}
            className="p-4 rounded-2xl bg-gradient-to-br from-teal-500/10 to-emerald-500/5 border border-teal-200/80 cursor-pointer hover:border-teal-300 transition-all hover:shadow-sm"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                <Stethoscope className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs md:text-sm font-bold text-slate-900 leading-tight">
                  {lang === 'en' ? 'Doctor Consultation' : 'ডাক্তার দেখান'}
                </h4>
                <p className="text-[11px] text-emerald-800 font-medium">
                  {lang === 'en' ? 'Online or Chamber' : 'ভিডিও বা চেম্বার পরামর্শ'}
                </p>
              </div>
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              {lang === 'en'
                ? 'Consult Dr. Shorif Ullah (BHMS) for chronic & holistic healing.'
                : 'অভিজ্ঞ বিএইচএমএস ডাক্তারদের থেকে সরাসরি রোগ বিশ্লেষণ ও চিকিৎসা নিন।'
              }
            </p>
          </div>

          {/* Tile 3: Trust & Courier info */}
          <div className="col-span-2 lg:col-span-1 p-3.5 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-between text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium">{lang === 'en' ? 'Hologram Sealed' : 'হলোগ্রাম সীলযুক্ত'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium">{lang === 'en' ? 'Cash on Delivery' : 'ক্যাশ অন ডেলিভারি'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
