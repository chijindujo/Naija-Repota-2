import React, { useState } from 'react';
import { ContactMessage } from '../types';
import {
  PhoneCall,
  Mail,
  MapPin,
  Send,
  Camera,
  Video,
  CheckCircle2,
  Clock,
  Shield,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

interface ContactViewProps {
  onSendMessage?: (msg: ContactMessage) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onSendMessage }) => {
  const [name, setName] = useState<string>('');
  const [phoneOrEmail, setPhoneOrEmail] = useState<string>('');
  const [state, setState] = useState<string>('Lagos');
  const [subject, setSubject] = useState<string>('');
  const [category, setCategory] = useState<string>('Hot Gist & News Tip');
  const [message, setMessage] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMsg: ContactMessage = {
      id: 'msg-' + Date.now(),
      name: isAnonymous ? 'Anonymous Whistleblower' : name.trim() || 'Active Reader',
      phoneOrEmail: isAnonymous ? 'Hidden for security' : phoneOrEmail.trim(),
      state,
      subject: subject.trim() || 'New Gist Tip',
      category,
      message: message.trim(),
      timestamp: 'Just now',
    };

    if (onSendMessage) onSendMessage(newMsg);
    setIsSubmitted(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner (Light Green Theme) */}
      <div className="bg-emerald-600 text-white rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-white/20 text-white text-[11px] font-extrabold px-3 py-0.5 rounded-full backdrop-blur-xs">
            <PhoneCall className="w-3.5 h-3.5" />
            <span>NAIJA REPOTA NEWSROOM DESK</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-black tracking-tight">
            Reach Out To Us • Drop Gist & Video Tip
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            You get hot video, breaking gist, or you wan advertise with us? Drop message give our editors directly!
          </p>
        </div>

        <div className="bg-emerald-700/90 text-white px-4 py-2.5 rounded-2xl border border-emerald-500 text-xs font-mono text-center self-stretch sm:self-auto">
          <div className="text-[10px] text-emerald-200 uppercase font-bold">24/7 WhatsApp Hotline</div>
          <div className="text-sm font-black text-white">+234 800 NAIJA REPOTA</div>
        </div>
      </div>

      {/* Main Form and Office Locations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Contact / Gist Drop Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-sm space-y-6">
          <div className="space-y-1 border-b border-slate-100 pb-3">
            <h2 className="text-lg font-black text-slate-900 tracking-tight">
              Send Message or Drop News Tip
            </h2>
            <p className="text-xs text-slate-500">
              Fill this simple form make our journalists call or verify your story.
            </p>
          </div>

          {isSubmitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto text-xl shadow-xs">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Gist Don Land Our Newsroom Desk!
              </h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                Thank you for reaching out to Naija Repota. Our editors go review your story and follow up sharp sharp.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setMessage('');
                  setSubject('');
                }}
                className="text-xs font-bold text-emerald-700 bg-white hover:bg-emerald-100 px-4 py-2 rounded-xl border border-emerald-300 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Name (Optional):
                  </label>
                  <input
                    type="text"
                    value={name}
                    disabled={isAnonymous}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Chukwuma, Aisha, Tunde"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone / WhatsApp or Email:
                  </label>
                  <input
                    type="text"
                    value={phoneOrEmail}
                    disabled={isAnonymous}
                    onChange={(e) => setPhoneOrEmail(e.target.value)}
                    placeholder="080... or name@gmail.com"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Select Topic / Category:
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:border-emerald-500 font-semibold cursor-pointer"
                  >
                    <option value="Hot Gist & News Tip">🔥 Hot Gist & News Tip</option>
                    <option value="Send Video or Picture Evidence">📸 Send Video / Photo Evidence</option>
                    <option value="Advert & Partnership">💼 Advert & Brand Promotion</option>
                    <option value="Feedback & Correction">✍️ Feedback & Correction</option>
                    <option value="General Enquiry">💬 General Enquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your State in Nigeria:
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:border-emerald-500 font-semibold cursor-pointer"
                  >
                    <option value="Lagos">Lagos State</option>
                    <option value="Abuja">Abuja (FCT)</option>
                    <option value="Rivers">Rivers (Port Harcourt)</option>
                    <option value="Kano">Kano State</option>
                    <option value="Oyo">Oyo (Ibadan)</option>
                    <option value="Enugu">Enugu State</option>
                    <option value="Delta">Delta State</option>
                    <option value="Kaduna">Kaduna State</option>
                    <option value="Diaspora">Outside Nigeria (Diaspora)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Headline / Gist Title:
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Give your message a short title (e.g. Heavy flood for Lekki Phase 1)"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Message / Story Details:
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Explain wetin happen, who dey involved, location, and any details wey go help our reporters..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:border-emerald-500 focus:bg-white transition-colors leading-relaxed"
                  required
                />
              </div>

              {/* Anonymous Shield Toggle */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className={`w-4 h-4 ${isAnonymous ? 'text-emerald-700' : 'text-slate-400'}`} />
                  <span className="text-xs font-bold text-slate-800">
                    Submit as Anonymous Whistleblower (Hide my identity 100%)
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Gist to Naija Repota</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right: Office Bureau & Direct Contacts (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Main Offices Card */}
          <div className="bg-white rounded-3xl p-6 border border-emerald-200 shadow-sm space-y-4">
            <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <span>Naija Repota Bureau Offices</span>
            </h3>

            <div className="space-y-3.5 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                <div className="font-bold text-emerald-950 text-sm">📍 Lagos Head Office:</div>
                <p className="text-slate-600">
                  Plot 14, Commercial Avenue, Ikeja CBD, Lagos State.
                </p>
                <div className="text-[11px] text-slate-400">Phone: 01-888-REPOTA</div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                <div className="font-bold text-emerald-950 text-sm">📍 Abuja Bureau:</div>
                <p className="text-slate-600">
                  Suite 402, Federal Secretariat Complex, Central Business District, Abuja.
                </p>
                <div className="text-[11px] text-slate-400">Phone: 09-777-REPOTA</div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                <div className="font-bold text-emerald-950 text-sm">📍 Port Harcourt Desk:</div>
                <p className="text-slate-600">
                  18 Olu Obasanjo Road, GRA Phase 2, Port Harcourt, Rivers State.
                </p>
                <div className="text-[11px] text-slate-400">Phone: 084-666-REPOTA</div>
              </div>
            </div>
          </div>

          {/* Email Contacts */}
          <div className="bg-emerald-50 rounded-3xl p-5 border border-emerald-200 space-y-2 text-xs">
            <h4 className="font-bold text-emerald-950 flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-emerald-700" />
              <span>Direct Email Inboxes:</span>
            </h4>
            <div className="space-y-1 text-slate-700">
              <div>📰 <strong>Newsroom:</strong> news@naijarepota.ng</div>
              <div>💼 <strong>Adverts:</strong> ads@naijarepota.ng</div>
              <div>⚖️ <strong>Legal:</strong> legal@naijarepota.ng</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
