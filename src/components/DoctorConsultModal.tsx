import React, { useState } from 'react';
import { 
  X, 
  Stethoscope, 
  Star, 
  Calendar, 
  Video, 
  Building2, 
  CheckCircle,
  PhoneCall,
  Clock
} from 'lucide-react';
import { DOCTORS } from '../data/mockData';

interface DoctorConsultModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'bn';
}

export const DoctorConsultModal: React.FC<DoctorConsultModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const [selectedDoctorId, setSelectedDoctorId] = useState(DOCTORS[0].id);
  const [consultType, setConsultType] = useState<'video' | 'chamber'>('video');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [slot, setSlot] = useState('Today, 7:30 PM');
  const [isBooked, setIsBooked] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!isOpen) return null;

  const selectedDoctor = DOCTORS.find(d => d.id === selectedDoctorId) || DOCTORS[0];

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const ref = `SHH-DOC-${Math.floor(100 + Math.random() * 900)}`;
    setBookingRef(ref);
    setIsBooked(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-teal-800 to-emerald-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-emerald-300" />
            <h2 className="text-base font-bold">
              {lang === 'en' ? 'Book Homeopathic Consultation' : 'হোমিওপ্যাথিক ডাক্তার অ্যাপয়েন্টমেন্ট'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-teal-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isBooked ? (
          <div className="p-6 sm:p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                {lang === 'en' ? 'Appointment Confirmed' : 'অ্যাপয়েন্টমেন্ট নিশ্চিত হয়েছে'}
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                Booking ID: <span className="font-mono text-emerald-700">{bookingRef}</span>
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {lang === 'en'
                  ? `Your appointment with ${selectedDoctor.name} for ${slot} has been reserved. Our clinical coordinator will WhatsApp you the call link at ${phone}.`
                  : `${selectedDoctor.name}-এর সাথে আপনার অ্যাপয়েন্টমেন্ট বুক হয়েছে (${slot})। আমাদের ক্লিনিক থেকে ${phone} নম্বরে যোগাযোগ করা হবে।`
                }
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1.5 text-left">
              <div className="flex justify-between">
                <span className="text-slate-400">Consultant:</span>
                <span className="font-semibold text-slate-900">{selectedDoctor.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Consultation Fee:</span>
                <span className="font-bold text-emerald-700">৳{selectedDoctor.consultationFee} (Pay after consult)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Type:</span>
                <span className="font-semibold capitalize text-slate-900">{consultType} Consultation</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-colors"
            >
              {lang === 'en' ? 'Done' : 'ঠিক আছে'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleBook} className="p-6 space-y-5">
            {/* Select Doctor Profile */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {lang === 'en' ? 'Select Specialist Doctor' : 'হোমিওপ্যাথিক কনসালট্যান্ট নির্বাচন করুন'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {DOCTORS.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDoctorId(doc.id)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                      selectedDoctorId === doc.id
                        ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-sm shrink-0">
                        {doc.name.split(' ').slice(-1)[0][0]}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 truncate">{doc.name}</h4>
                        <p className="text-[10px] text-emerald-800 font-semibold">{doc.qualification.split(',')[0]}</p>
                        <p className="text-[10px] text-slate-500 truncate">{doc.specialty}</p>
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                      <span className="text-amber-500 font-bold flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {doc.rating}
                      </span>
                      <span className="font-extrabold text-emerald-700">৳{doc.consultationFee}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mode selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {lang === 'en' ? 'Consultation Mode' : 'পরামর্শের মাধ্যম'}
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setConsultType('video')}
                  className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold transition-all ${
                    consultType === 'video'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-600'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Video className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp Video Call</span>
                </button>
                <button
                  type="button"
                  onClick={() => setConsultType('chamber')}
                  className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold transition-all ${
                    consultType === 'chamber'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-600'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-emerald-600" />
                  <span>Chamber Visit (Dhaka)</span>
                </button>
              </div>
            </div>

            {/* Patient Name & Phone */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {lang === 'en' ? 'Patient Name' : 'রোগীর নাম'} *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shorif Ullah"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {lang === 'en' ? 'WhatsApp Phone' : 'হোয়াটসঅ্যাপ / ফোন নম্বর'} *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="017xxxxxxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            {/* Preferred Time Slot */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {lang === 'en' ? 'Preferred Time Slot' : 'পছন্দের সময়'}
              </label>
              <select
                value={slot}
                onChange={(e) => setSlot(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 outline-none focus:border-emerald-600 bg-white"
              >
                <option value="Today, 7:30 PM">Today, 7:30 PM (Evening Slot)</option>
                <option value="Today, 8:45 PM">Today, 8:45 PM (Evening Slot)</option>
                <option value="Tomorrow, 11:30 AM">Tomorrow, 11:30 AM (Morning Slot)</option>
                <option value="Tomorrow, 6:00 PM">Tomorrow, 6:00 PM (Evening Slot)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md shadow-emerald-700/20 transition-colors"
            >
              {lang === 'en' ? `Confirm Booking (৳${selectedDoctor.consultationFee})` : `অ্যাপয়েন্টমেন্ট বুক করুন (৳${selectedDoctor.consultationFee})`}
            </button>

            <div className="pt-2 text-center text-xs text-slate-500">
              {lang === 'en' ? 'Direct Clinic Helpline:' : 'সরাসরি চেম্বার হটলাইন:'}
              <div className="flex items-center justify-center gap-3 mt-1 font-bold text-emerald-800">
                <a href="tel:01981721686" className="hover:underline">📞 01981721686</a>
                <span>·</span>
                <a href="mailto:86smohammad86@gmail.com" className="hover:underline font-normal text-slate-600">✉ 86smohammad86@gmail.com</a>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
