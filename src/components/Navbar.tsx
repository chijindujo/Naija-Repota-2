import React, { useState } from 'react';
import { NavPage } from '../types';
import { NaijaRepotaLogo } from './NaijaRepotaLogo';
import {
  Home,
  Newspaper,
  Trophy,
  Flame,
  PhoneCall,
  Search,
  Menu,
  X,
  PlusCircle,
  Video,
  Send,
  Bell,
  Sun,
  MapPin,
} from 'lucide-react';

interface NavbarProps {
  currentPage: NavPage;
  setCurrentPage: (page: NavPage) => void;
  onOpenSearch: () => void;
  onOpenContactTip: () => void;
  selectedCategory?: string;
  setSelectedCategory?: (cat: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setCurrentPage,
  onOpenSearch,
  onOpenContactTip,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const navItems: Array<{ id: NavPage; label: string; pidginSub: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: 'home', label: 'Home', pidginSub: 'Main Tori', icon: Home },
    { id: 'news', label: 'News', pidginSub: 'Full Tori', icon: Newspaper },
    { id: 'sports', label: 'Sports', pidginSub: 'Sport Gist', icon: Trophy },
    { id: 'as-e-dey-hot', label: 'As E Dey Hot', pidginSub: '🔥 Breaking', icon: Flame },
    { id: 'contact', label: 'Contact', pidginSub: 'Reach Us', icon: PhoneCall },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-200/80 shadow-2xs">
      {/* Top Utility Ribbon (Light Green Accent) */}
      <div className="bg-emerald-50 text-emerald-900 border-b border-emerald-100 text-[11px] font-semibold py-1 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="flex items-center gap-1 text-emerald-700">
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>Naija Weather: Lagos 31°C • Abuja 29°C • Port Harcourt 28°C</span>
            </span>
            <span className="hidden md:inline text-emerald-300">|</span>
            <span className="hidden md:inline text-emerald-700">
              🇳🇬 Nigeria Number 1 Pidgin News Hub
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={onOpenContactTip}
              className="text-emerald-800 hover:text-emerald-950 font-bold flex items-center gap-1 underline underline-offset-2 transition-colors"
            >
              <Send className="w-3 h-3 text-emerald-600" />
              <span>Drop Gist Give Us</span>
            </button>
            <span className="text-emerald-700 hidden sm:inline font-mono">
              WhatsApp HotLine: 0800-NAIJA-REPOTA
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand Logo */}
          <div
            onClick={() => {
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="cursor-pointer flex items-center space-x-3"
          >
            <NaijaRepotaLogo size="md" showText={true} />
            <span className="hidden sm:inline-block text-[10px] uppercase tracking-wider font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
              Pidgin News Wire
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              const isHot = item.id === 'as-e-dey-hot';

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`relative px-3.5 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : isHot
                      ? 'text-red-600 hover:bg-red-50 font-black'
                      : 'text-slate-700 hover:text-emerald-700 hover:bg-emerald-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : isHot ? 'text-red-500 animate-pulse' : 'text-emerald-600'}`} />
                  <span>{item.label}</span>
                  {isHot && !isActive && (
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping ml-0.5" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-xl text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="Search Tori"
            >
              <Search className="w-4 h-4" />
              <span className="hidden lg:inline">Find Tori</span>
            </button>

            {/* Drop Tori Fast Button */}
            <button
              onClick={onOpenContactTip}
              className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs sm:text-sm px-3.5 sm:px-4 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5 active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Us Gist</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-emerald-50"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-emerald-200 px-4 pt-2 pb-4 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            const isHot = item.id === 'as-e-dey-hot';

            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-bold ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : isHot
                    ? 'bg-red-50 text-red-700'
                    : 'text-slate-800 hover:bg-emerald-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : isHot ? 'text-red-500' : 'text-emerald-600'}`} />
                  <span>{item.label}</span>
                </div>
                <span className={`text-xs ${isActive ? 'text-emerald-100' : 'text-slate-400'}`}>
                  {item.pidginSub}
                </span>
              </button>
            );
          })}

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between px-2 text-xs font-semibold text-emerald-800">
            <span>📞 WhatsApp: 0800-NAIJA-REPOTA</span>
            <button
              onClick={() => {
                onOpenContactTip();
                setMobileMenuOpen(false);
              }}
              className="text-emerald-700 underline font-bold"
            >
              Contact Desk
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
