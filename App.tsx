import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Scissors, 
  Calendar, 
  User, 
  Sparkles, 
  Home, 
  ChevronRight, 
  Star, 
  Clock, 
  CheckCircle,
  MapPin,
  Menu,
  X,
  Gift
} from 'lucide-react';

import { SERVICES, STYLISTS, TIME_SLOTS, MOCK_REFERRAL } from './constants';
import { Service, Stylist, BookingStep } from './types';
import { AIConsultant } from './components/AIConsultant';
import { ReferralBanner } from './components/ReferralBanner';

// --- Components (Inline for single-file requirement adherence within reasonable limits) ---

const Navbar = ({ onOpenAI }: { onOpenAI: () => void }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? 'text-primary-600 font-bold' : 'text-text-muted hover:text-primary-500';
  
  return (
    <nav className="sticky top-0 z-40 bg-surface/90 backdrop-blur border-b border-gray-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-primary-600">
            <Scissors className="transform -scale-x-100" />
            <span className="text-xl font-bold tracking-tight text-text-main">Luxe<span className="text-primary-600">Salon</span></span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className={`text-sm transition-colors ${isActive('/')}`}>Home</Link>
            <Link to="/book" className={`text-sm transition-colors ${isActive('/book')}`}>Book Now</Link>
            <Link to="/referrals" className={`text-sm transition-colors ${isActive('/referrals')}`}>Referrals</Link>
            <button 
              onClick={onOpenAI}
              className="flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 hover:opacity-90 text-white px-5 py-2 rounded-full text-sm font-bold transition-all shadow-md shadow-primary-500/20"
            >
              <Sparkles size={16} />
              AI Consultant
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-text-main"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface border-b border-gray-200 p-4 space-y-4 shadow-xl">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block text-text-main font-medium hover:text-primary-500">Home</Link>
          <Link to="/book" onClick={() => setMobileMenuOpen(false)} className="block text-text-main font-medium hover:text-primary-500">Book Appointment</Link>
          <Link to="/referrals" onClick={() => setMobileMenuOpen(false)} className="block text-text-main font-medium hover:text-primary-500">Referrals</Link>
          <button 
            onClick={() => { onOpenAI(); setMobileMenuOpen(false); }}
            className="flex w-full items-center gap-2 text-primary-600 font-bold mt-4"
          >
            <Sparkles size={16} />
            AI Style Consultant
          </button>
        </div>
      )}
    </nav>
  );
};

// --- Pages ---

const HomePage = () => (
  <div className="space-y-12 pb-20">
    <header className="relative py-24 px-4 text-center overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-[url('https://picsum.photos/id/1027/1200/800')] bg-cover bg-center" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-gray-900/60 to-gray-900/40" />
      
      <div className="relative z-10 max-w-2xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight drop-shadow-md">
          Refine Your <span className="text-accent">Style</span>
        </h1>
        <p className="text-lg text-gray-100 font-medium drop-shadow-sm">
          Experience premium grooming and spa services tailored to your unique look.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link 
            to="/book" 
            className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-primary-500/30"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </header>

    <section className="max-w-5xl mx-auto px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-text-main">Popular Services</h2>
        <Link to="/book" className="text-primary-600 text-sm font-bold flex items-center hover:underline">
          View All <ChevronRight size={16} />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {SERVICES.map(service => (
          <div key={service.id} className="group relative overflow-hidden rounded-xl bg-surface shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer">
            <div className="aspect-[4/3] overflow-hidden">
                <img 
                src={service.imageUrl} 
                alt={service.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>
            <div className="p-4">
              <h3 className="text-text-main font-bold truncate">{service.name}</h3>
              <p className="text-secondary-600 font-bold mt-1 text-sm">${service.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="max-w-5xl mx-auto px-4">
        <ReferralBanner stats={MOCK_REFERRAL} />
    </section>
  </div>
);

const BookingPage = () => {
  const [step, setStep] = useState<BookingStep>(BookingStep.SERVICES);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedStylist, setSelectedStylist] = useState<Stylist | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  const handleBook = () => {
    // Simulate API call
    setTimeout(() => {
      setStep(BookingStep.CONFIRMATION);
    }, 1000);
  };

  const renderProgress = () => (
    <div className="flex items-center justify-center gap-2 mb-10 text-sm">
      {['Service', 'Stylist', 'Time', 'Confirm'].map((label, index) => (
        <React.Fragment key={label}>
          <div className={`flex items-center gap-2 ${step >= index ? 'text-primary-600 font-bold' : 'text-text-muted'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                step >= index 
                ? 'border-primary-500 bg-primary-500 text-white shadow-md shadow-primary-500/20' 
                : 'border-gray-300 bg-white text-gray-400'
            }`}>
              {index + 1}
            </div>
            <span className="hidden sm:inline">{label}</span>
          </div>
          {index < 3 && <div className={`w-10 h-0.5 ${step > index ? 'bg-primary-500' : 'bg-gray-200'}`} />}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 pb-32">
      <h1 className="text-3xl font-bold text-text-main mb-8 text-center">Book Appointment</h1>
      {step !== BookingStep.CONFIRMATION && renderProgress()}

      {step === BookingStep.SERVICES && (
        <div className="grid sm:grid-cols-2 gap-4">
          {SERVICES.map(service => (
            <div 
              key={service.id}
              onClick={() => { setSelectedService(service); setStep(BookingStep.STYLIST); }}
              className="bg-surface border border-gray-200 hover:border-primary-500 p-4 rounded-xl cursor-pointer transition-all hover:shadow-lg flex gap-4 group"
            >
              <img src={service.imageUrl} alt={service.name} className="w-20 h-20 rounded-lg object-cover shadow-sm" />
              <div>
                <h3 className="font-bold text-text-main group-hover:text-primary-600 transition-colors">{service.name}</h3>
                <p className="text-text-muted text-sm mt-1 line-clamp-2">{service.description}</p>
                <div className="flex items-center gap-3 mt-2 text-sm">
                  <span className="text-primary-600 font-bold bg-primary-50 px-2 py-0.5 rounded-md">${service.price}</span>
                  <span className="text-text-muted flex items-center gap-1"><Clock size={12}/> {service.durationMin}m</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {step === BookingStep.STYLIST && (
        <div className="space-y-4">
           <button onClick={() => setStep(BookingStep.SERVICES)} className="text-text-muted text-sm hover:text-primary-600 font-medium mb-4 flex items-center gap-1">
             <ChevronRight size={14} className="rotate-180" /> Back to Services
            </button>
           <div className="grid sm:grid-cols-2 gap-4">
            {STYLISTS.map(stylist => (
              <div 
                key={stylist.id}
                onClick={() => { setSelectedStylist(stylist); setStep(BookingStep.DATETIME); }}
                className="bg-surface border border-gray-200 hover:border-primary-500 p-4 rounded-xl cursor-pointer transition-all hover:shadow-lg flex items-center gap-4 group"
              >
                <img src={stylist.imageUrl} alt={stylist.name} className="w-16 h-16 rounded-full object-cover border-2 border-gray-100 group-hover:border-primary-200" />
                <div>
                  <h3 className="font-bold text-text-main group-hover:text-primary-600 transition-colors">{stylist.name}</h3>
                  <p className="text-secondary-600 text-sm font-medium">{stylist.role}</p>
                  <div className="flex items-center gap-1 text-accent text-sm mt-1">
                    <Star size={12} fill="currentColor" /> {stylist.rating}
                  </div>
                </div>
              </div>
            ))}
           </div>
        </div>
      )}

      {step === BookingStep.DATETIME && (
        <div className="space-y-8">
          <button onClick={() => setStep(BookingStep.STYLIST)} className="text-text-muted text-sm hover:text-primary-600 font-medium flex items-center gap-1">
             <ChevronRight size={14} className="rotate-180" /> Back to Stylists
          </button>
          
          <div className="bg-surface p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="text-text-main font-bold mb-4 flex items-center gap-2"><Calendar size={18} className="text-primary-500" /> Select Date</h3>
            <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
              {[0, 1, 2, 3, 4, 5, 6].map(day => {
                const date = new Date();
                date.setDate(date.getDate() + day);
                const isSelected = selectedDate === date.toDateString();
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(date.toDateString())}
                    className={`flex-shrink-0 w-20 p-3 rounded-xl border transition-all ${
                      isSelected 
                        ? 'bg-primary-500 border-primary-500 text-white shadow-md shadow-primary-500/20' 
                        : 'border-gray-200 text-text-muted hover:border-primary-300 hover:bg-primary-50'
                    }`}
                  >
                    <span className="block text-xs uppercase font-bold opacity-80">{date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                    <span className="block text-xl font-bold">{date.getDate()}</span>
                  </button>
                );
              })}
            </div>

            <h3 className="text-text-main font-bold mt-6 mb-4 flex items-center gap-2"><Clock size={18} className="text-primary-500" /> Select Time</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {TIME_SLOTS.map(time => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-2 rounded-lg text-sm font-bold border transition-all ${
                    selectedTime === time
                      ? 'bg-secondary-500 border-secondary-500 text-white shadow-md'
                      : 'border-gray-200 text-text-muted hover:border-secondary-300 hover:bg-secondary-50'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <button
            disabled={!selectedDate || !selectedTime}
            onClick={handleBook}
            className="w-full bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-xl shadow-primary-500/25"
          >
            Confirm Booking
          </button>
        </div>
      )}

      {step === BookingStep.CONFIRMATION && (
        <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 shadow-sm">
            <CheckCircle size={48} fill="currentColor" className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-text-main mb-2">Booking Confirmed!</h2>
          <p className="text-text-muted mb-8">We've sent a confirmation email to you.</p>
          
          <div className="bg-surface rounded-xl p-8 max-w-sm mx-auto text-left space-y-4 border border-gray-100 shadow-lg">
            <div className="flex justify-between border-b border-gray-100 pb-3">
              <span className="text-text-muted text-sm">Service</span>
              <span className="text-text-main font-bold">{selectedService?.name}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-3">
              <span className="text-text-muted text-sm">Stylist</span>
              <span className="text-text-main font-bold">{selectedStylist?.name}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-3">
              <span className="text-text-muted text-sm">Date</span>
              <span className="text-text-main font-bold">{selectedDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted text-sm">Time</span>
              <span className="text-text-main font-bold">{selectedTime}</span>
            </div>
          </div>

          <div className="mt-8">
            <Link to="/" className="text-primary-600 font-bold hover:underline">Return Home</Link>
          </div>
        </div>
      )}
    </div>
  );
};

const ReferralPage = () => (
  <div className="max-w-2xl mx-auto px-4 py-8">
    <h1 className="text-2xl font-bold text-text-main mb-6">Referrals & Rewards</h1>
    <ReferralBanner stats={MOCK_REFERRAL} />
    
    <div className="mt-8 bg-surface rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h3 className="font-bold text-text-main">Your Referral History</h3>
      </div>
      <div className="divide-y divide-gray-100">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary-50 flex items-center justify-center text-secondary-600">
                <User size={18} />
              </div>
              <div>
                <p className="text-text-main text-sm font-bold">Friend #{i}</p>
                <p className="text-text-muted text-xs">Joined {i} weeks ago</p>
              </div>
            </div>
            <span className="text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-bold">+$20.00</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// --- Layout & Main App ---

const App: React.FC = () => {
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const location = useLocation();

  const isNavActive = (path: string) => location.pathname === path ? 'text-primary-600' : 'text-text-muted';

  return (
    <div className="min-h-screen bg-background text-text-main font-sans selection:bg-primary-100 selection:text-primary-900">
      <Navbar onOpenAI={() => setIsAIModalOpen(true)} />
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="/referrals" element={<ReferralPage />} />
        </Routes>
      </main>

      {isAIModalOpen && <AIConsultant onClose={() => setIsAIModalOpen(false)} />}

      {/* Mobile Bottom Nav (Fixed) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-gray-200 p-3 flex justify-around items-center z-30 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-safe">
          <Link to="/" className={`flex flex-col items-center gap-1 ${isNavActive('/')}`}>
            <Home size={22} strokeWidth={isNavActive('/') ? 2.5 : 2} />
            <span className="text-[10px] font-bold">Home</span>
          </Link>
          <Link to="/book" className={`flex flex-col items-center gap-1 ${isNavActive('/book')}`}>
            <Calendar size={22} strokeWidth={isNavActive('/book') ? 2.5 : 2} />
            <span className="text-[10px] font-bold">Book</span>
          </Link>
          <button onClick={() => setIsAIModalOpen(true)} className="flex flex-col items-center justify-center -mt-6">
            <div className="bg-gradient-to-tr from-primary-500 to-secondary-500 p-3 rounded-full shadow-lg shadow-primary-500/30 text-white transform active:scale-95 transition-transform">
              <Sparkles size={24} />
            </div>
            <span className="text-[10px] font-bold text-text-muted mt-1">Ask AI</span>
          </button>
          <Link to="/referrals" className={`flex flex-col items-center gap-1 ${isNavActive('/referrals')}`}>
            <Gift size={22} strokeWidth={isNavActive('/referrals') ? 2.5 : 2} />
            <span className="text-[10px] font-bold">Rewards</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center gap-1 text-text-muted">
            <User size={22} />
            <span className="text-[10px] font-bold">Profile</span>
          </Link>
      </div>
    </div>
  );
};

export default App;