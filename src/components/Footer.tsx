import React from 'react';
import { 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Headphones, 
  MapPin, 
  Phone, 
  Mail, 
  Award 
} from 'lucide-react';
import { CategoryType } from '../types';

interface FooterProps {
  onSelectCategory: (cat: CategoryType) => void;
  onOpenOrderTrack: () => void;
  onOpenDoctorModal: () => void;
  onOpenPrescription: () => void;
  lang: 'en' | 'bn';
  ownerName?: string;
  ownerEmail?: string;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenOrderTrack,
  onOpenDoctorModal,
  onOpenPrescription,
  lang,
  ownerName = 'এস. মোহাম্মদ (S. Mohammad)',
  ownerEmail = '86smohammad86@gmail.com',
}) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-10 pb-8 mt-12 border-t border-slate-800 text-xs">
      {/* Top 4 Value Props (Daraz hallmark trust bar) */}
      <div className="max-w-7xl mx-auto px-4 pb-10 border-b border-slate-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-900/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">
                {lang === 'en' ? '100% Authentic' : '১০০% খাঁটি ও আসল'}
              </h4>
              <p className="text-slate-400 text-xs mt-0.5">
                {lang === 'en' ? 'Direct German & Indian imports' : 'জার্মান ও ভারতীয় আমদানিকৃত'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-900/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">
                {lang === 'en' ? 'Fast Doorstep Delivery' : 'দ্রুততম হোম ডেলিভারি'}
              </h4>
              <p className="text-slate-400 text-xs mt-0.5">
                {lang === 'en' ? 'Inside Dhaka 24h, outside 48h' : 'ঢাকা ২৪ ঘণ্টায়, বাইরে ৪৮ ঘণ্টায়'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-900/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">
                {lang === 'en' ? '7 Days Return' : '৭ দিনের রিটার্ন গ্যারান্টি'}
              </h4>
              <p className="text-slate-400 text-xs mt-0.5">
                {lang === 'en' ? 'If seal is broken on delivery' : 'সিল ভাঙা থাকলে সাথে সাথে রিটার্ন'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-900/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">
                {lang === 'en' ? 'Doctor Helpline' : 'ডাক্তার হেল্পলাইন'}
              </h4>
              <p className="text-slate-400 text-xs mt-0.5">
                <a href="tel:01981721686" className="hover:text-emerald-400 font-semibold text-white">01981721686</a> (9 AM - 10 PM)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main 4 Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Col 1: Brand Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
              শ
            </div>
            <span className="text-base font-bold text-white">Shorif Homeo Hall</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {lang === 'en'
              ? 'Shorif Homeo Hall (শরীফ হোমিও হল) is Bangladesh’s premier digital homeopathic pharmacy and holistic healing clinic. Preserving classical Hahnemannian principles with modern doorstep convenience.'
              : 'শরীফ হোমিও হল বাংলাদেশের শীর্ষস্থানীয় অনলাইন হোমিওপ্যাথিক ডিসপেনসারি ও চিকিৎসা কেন্দ্র। খাঁটি ঔষধ ও নির্ভরযোগ্য ডাক্তার পরামর্শ এক ঠিকানায়।'
            }
          </p>
          <div className="pt-2 text-xs text-slate-400 space-y-1.5">
            <p className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Chamber: 14/B Motijheel C/A, Dhaka-1000</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <a href="tel:01981721686" className="hover:text-emerald-400 font-bold text-emerald-400">
                01981721686
              </a>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-emerald-400 text-sm">💬</span>
              <a 
                href="https://wa.me/8801981721686?text=%E0%A6%86%E0%A6%B8%E0%A6%B8%E0%A6%BE%E0%A6%B2%E0%A6%BE%E0%A6%AE%E0%A7%81%20%E0%A6%86%E0%A6%B2%E0%A6%BE%E0%A6%87%E0%A6%95%E0%A7%81%E0%A6%AE%20%E0%A6%B6%E0%A6%B0%E0%A7%80%E0%A6%AB%20%E0%A6%B9%E0%A7%8B%E0%A6%AE%E0%A6%BF%E0%A6%93%20%E0%A6%B9%E0%A6%B2"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-300 font-semibold text-emerald-400"
              >
                WhatsApp: 01981721686
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <a href="mailto:86smohammad86@gmail.com" className="hover:text-emerald-400 text-slate-300">
                86smohammad86@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Col 2: Customer Care */}
        <div className="space-y-2.5">
          <h4 className="text-white font-bold uppercase tracking-wider text-xs">
            {lang === 'en' ? 'Customer Care' : 'গ্রাহক সেবা'}
          </h4>
          <ul className="space-y-1.5 text-slate-400">
            <li>
              <button onClick={onOpenOrderTrack} className="hover:text-emerald-400 transition-colors">
                {lang === 'en' ? 'Track My Order' : 'অর্ডার ট্র্যাক করুন'}
              </button>
            </li>
            <li>
              <button onClick={onOpenPrescription} className="hover:text-emerald-400 transition-colors">
                {lang === 'en' ? 'Upload Doctor Prescription' : 'প্রেসক্রিপশন পাঠান'}
              </button>
            </li>
            <li>
              <button onClick={onOpenDoctorModal} className="hover:text-emerald-400 transition-colors">
                {lang === 'en' ? 'Book Homeopathic Doctor' : 'ডাক্তার অ্যাপয়েন্টমেন্ট'}
              </button>
            </li>
            <li>
              <span className="hover:text-emerald-400 transition-colors cursor-pointer">
                {lang === 'en' ? 'Shipping & Delivery Info' : 'ডেলিভারি নীতিমালা'}
              </span>
            </li>
            <li>
              <span className="hover:text-emerald-400 transition-colors cursor-pointer">
                {lang === 'en' ? 'Return & Refund Policy' : 'রিফান্ড পলিসি'}
              </span>
            </li>
          </ul>
        </div>

        {/* Col 3: Popular Categories */}
        <div className="space-y-2.5">
          <h4 className="text-white font-bold uppercase tracking-wider text-xs">
            {lang === 'en' ? 'Homeo Categories' : 'জনপ্রিয় ক্যাটাগরি'}
          </h4>
          <ul className="space-y-1.5 text-slate-400">
            <li>
              <button onClick={() => onSelectCategory('mother-tincture')} className="hover:text-emerald-400 transition-colors">
                Mother Tinctures (Q)
              </button>
            </li>
            <li>
              <button onClick={() => onSelectCategory('dilutions')} className="hover:text-emerald-400 transition-colors">
                Dr. Reckeweg Dilutions (30C, 200C)
              </button>
            </li>
            <li>
              <button onClick={() => onSelectCategory('biochemic')} className="hover:text-emerald-400 transition-colors">
                Bio-Chemic Tissue Salts (6X, 12X)
              </button>
            </li>
            <li>
              <button onClick={() => onSelectCategory('tonics')} className="hover:text-emerald-400 transition-colors">
                Health Tonics (Alfalfa, Ashwagandha)
              </button>
            </li>
            <li>
              <button onClick={() => onSelectCategory('skin-hair')} className="hover:text-emerald-400 transition-colors">
                Hair Oil & Berberis Skin Care
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Payment & Logistics Trust */}
        <div className="space-y-3">
          <h4 className="text-white font-bold uppercase tracking-wider text-xs">
            {lang === 'en' ? 'Payment Methods' : 'পেমেন্ট মাধ্যম'}
          </h4>
          <div className="flex flex-wrap gap-2 text-[11px] font-semibold text-slate-300">
            <span className="px-2 py-1 rounded bg-slate-800 border border-slate-700">Cash on Delivery</span>
            <span className="px-2 py-1 rounded bg-[#e2136e]/20 text-pink-300 border border-[#e2136e]/40">bKash</span>
            <span className="px-2 py-1 rounded bg-orange-900/30 text-orange-300 border border-orange-500/40">Nagad</span>
            <span className="px-2 py-1 rounded bg-purple-900/30 text-purple-300 border border-purple-500/40">Rocket</span>
            <span className="px-2 py-1 rounded bg-slate-800 border border-slate-700">Visa / Mastercard</span>
          </div>

          <h4 className="text-white font-bold uppercase tracking-wider text-xs pt-2">
            {lang === 'en' ? 'Courier Delivery Partners' : 'কুরিয়ার পার্টনার্স'}
          </h4>
          <div className="flex flex-wrap gap-2 text-[11px] text-slate-400">
            <span className="px-2 py-0.5 rounded bg-slate-800">Pathao Express</span>
            <span className="px-2 py-0.5 rounded bg-slate-800">Paperfly</span>
            <span className="px-2 py-0.5 rounded bg-slate-800">Sundarban Courier</span>
            <span className="px-2 py-0.5 rounded bg-slate-800">RedX</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Compliance */}
      <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3 text-slate-400 text-[11px]">
        <div>
          <p>
            © 2026 Shorif Homeo Hall (শরীফ হোমিও হল). All Rights Reserved. Reg No: DGDA/HOMEO-8421.
          </p>
          <p className="text-emerald-400 font-medium mt-1">
            {lang === 'en'
              ? `Proprietor & Official Owner: ${ownerName} · Email: ${ownerEmail}`
              : `স্বত্বাধিকারী / মূল মালিক: ${ownerName} · ইমেইল: ${ownerEmail}`}
          </p>
        </div>
        <div className="text-slate-400 text-right">
          <p className="font-semibold text-slate-300">
            {lang === 'en' ? '১০০% Pure German & Deshi Homeopathic Medicines' : '১০০% খাঁটি জার্মানি ও দেশি ওষুধ'}
          </p>
          <p className="text-[10px] text-slate-500 mt-0.5">
            14/B Motijheel C/A, Dhaka-1000 · Hotline: 01981721686
          </p>
        </div>
      </div>
    </footer>
  );
};
