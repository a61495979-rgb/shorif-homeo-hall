import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  FileCheck, 
  Phone, 
  User, 
  Clock, 
  ShieldCheck, 
  CheckCircle,
  FileText
} from 'lucide-react';

interface PrescriptionUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'bn';
}

export const PrescriptionUploadModal: React.FC<PrescriptionUploadModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [note, setNote] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  if (!isOpen) return null;

  const handleSimulateFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !phone.trim()) return;

    const newTicket = `RX-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketId(newTicket);
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-amber-600 to-orange-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-200" />
            <h2 className="text-base font-bold">
              {lang === 'en' ? 'Upload Doctor Prescription' : 'ডাক্তারের প্রেসক্রিপশন পাঠান'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-amber-100 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-6 sm:p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                {lang === 'en' ? 'Prescription Received' : 'প্রেসক্রিপশন সফলভাবে জমা হয়েছে'}
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                Ticket ID: <span className="font-mono text-emerald-700">{ticketId}</span>
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {lang === 'en'
                  ? `Thank you, ${patientName}. Our senior registered pharmacist will review your prescription and call you at ${phone} within 15 minutes to confirm medicine availability and pricing.`
                  : `ধন্যবাদ ${patientName}। আমাদের প্রধান ফার্মাসিস্ট প্রেসক্রিপশন দেখে ১৫ মিনিটের মধ্যে ${phone} নম্বরে ফোন করে ঔষধের দাম ও ডেলিভারি নিশ্চিত করবেন।`
                }
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
              <p className="flex items-center justify-center gap-1.5 font-medium text-slate-800">
                <Clock className="w-4 h-4 text-emerald-600" />
                {lang === 'en' ? 'Express Dispatch in 24 Hours' : '২৪ ঘণ্টার মধ্যে এক্সপ্রেস ডেলিভারি'}
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
            >
              {lang === 'en' ? 'Close' : 'বন্ধ করুন'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <p className="text-xs text-slate-500">
              {lang === 'en'
                ? 'Upload an image or PDF of your doctor’s slip. We will prepare authentic German or Indian formulations and deliver them safely.'
                : 'আপনার ডাক্তারের প্রেসক্রিপশনের ছবি তুলে পাঠান। আমরা আসল সিলযুক্ত ঔষধ প্যাক করে পৌঁছে দেব।'
              }
            </p>

            {/* File Upload Drop Area */}
            <div className="relative border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-2xl p-5 text-center cursor-pointer transition-colors bg-slate-50/60">
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleSimulateFile}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mb-2">
                  <Upload className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-slate-800">
                  {fileName ? (
                    <span className="text-emerald-700 flex items-center gap-1">
                      <FileCheck className="w-4 h-4" /> {fileName}
                    </span>
                  ) : (
                    lang === 'en' ? 'Click or drag photo of prescription' : 'প্রেসক্রিপশনের ছবি নির্বাচন করুন'
                  )}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Supports JPG, PNG, PDF up to 10MB
                </p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {lang === 'en' ? 'Patient Name' : 'রোগীর নাম'} *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shorif Ullah"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {lang === 'en' ? 'Age' : 'বয়স'}
                </label>
                <input
                  type="number"
                  placeholder="e.g. 35"
                  value={patientAge}
                  onChange={(e) => setPatientAge(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {lang === 'en' ? 'Contact Phone (Active for call)' : 'মোবাইল নম্বর'} *
              </label>
              <input
                type="tel"
                required
                placeholder="017xxxxxxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {lang === 'en' ? 'Special Instructions / Symptoms (Optional)' : 'রোগের লক্ষণ বা বিশেষ নির্দেশনা (ঐচ্ছিক)'}
              </label>
              <textarea
                rows={2}
                placeholder={lang === 'en' ? 'e.g., Needs Dr. Reckeweg German dilutions only, 1 month supply.' : 'যেমন: শুধু আসল জার্মান ড্রপস লাগবে।' }
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 outline-none focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md shadow-amber-600/20 transition-colors"
            >
              {lang === 'en' ? 'Submit Prescription for Verification' : 'প্রেসক্রিপশন পাঠান ও মূল্য জানুন'}
            </button>

            <div className="pt-2 text-center text-xs text-slate-500">
              {lang === 'en' ? 'Or directly call / email us:' : 'অথবা সরাসরি কল বা ইমেইল করতে পারেন:'}
              <div className="flex items-center justify-center gap-4 mt-1 font-semibold text-emerald-800">
                <a href="tel:01981721686" className="hover:underline">📞 01981721686</a>
                <span>·</span>
                <a href="mailto:86smohammad86@gmail.com" className="hover:underline">✉ 86smohammad86@gmail.com</a>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
