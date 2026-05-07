import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Moon, Sun, Monitor, Mail, FileText, Shield, Phone,
  Star, Share2, ChevronRight, Trash2, Heart,
  MessageCircle, AlertCircle
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const { theme, isDark, setTheme } = useTheme();
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [cleared, setCleared] = useState(false);
  const [shared, setShared] = useState(false);

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun, desc: 'Classic' },
    { value: 'dark',  label: 'Dark',  icon: Moon, desc: 'Easy on eyes' },
    { value: 'system', label: 'System', icon: Monitor, desc: 'Auto' },
  ];

  const bg     = isDark ? 'bg-slate-900' : 'bg-gray-50';
  const card   = isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200';
  const head   = isDark ? 'bg-slate-800 border-b border-slate-700' : 'bg-white border-b border-gray-200';
  const txt    = isDark ? 'text-white' : 'text-gray-900';
  const sub    = isDark ? 'text-slate-400' : 'text-gray-500';
  const row    = isDark ? 'hover:bg-slate-700' : 'hover:bg-gray-50';
  const rowTxt = isDark ? 'text-slate-200' : 'text-gray-700';
  const divider = isDark ? 'border-slate-700' : 'border-gray-100';
  const chevron = isDark ? 'text-slate-500' : 'text-gray-400';

  const handleClearData = () => {
    localStorage.removeItem('resumepal_data');
    localStorage.removeItem('resumepal_template');
    localStorage.removeItem('resumepal_theme');
    setCleared(true);
    setShowClearConfirm(false);
    setTimeout(() => window.location.reload(), 1200);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'ResumePal – Free Resume Builder',
      text: '🚀 Create a professional resume for FREE in minutes! 15+ templates, PDF export, no sign-up needed.',
      url: window.location.origin,
    };
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(shareData.url);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  const handleRate = () => {
    window.open('https://play.google.com/store', '_blank');
  };

  return (
    <div className={`min-h-screen ${bg} pb-28`}>
      {/* Header */}
      <div className={`${head} px-4 py-4 sticky top-0 z-50`}>
        <div className="max-w-xl mx-auto flex items-center gap-3">
          <Link to="/" className={`p-2 rounded-xl transition-colors ${isDark ? 'hover:bg-slate-700' : 'hover:bg-gray-100'}`}>
            <ArrowLeft size={20} className={isDark ? 'text-slate-300' : 'text-gray-600'} />
          </Link>
          <h1 className={`font-bold text-lg ${txt}`}>Settings</h1>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 py-6 space-y-5">

        {/* ─── App Identity Card ─── */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className={`${card} rounded-2xl p-5 text-center`}>
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
            <FileText size={28} className="text-white" />
          </div>
          <h2 className={`font-bold text-lg ${txt}`}>ResumePal</h2>
          <p className={`text-sm ${sub} mt-1`}>Free Resume Builder · v1.0.0</p>
          <div className={`mt-3 flex items-center justify-center gap-2 text-xs ${sub}`}>
            <span>🇳🇵 Made in Nepal</span>
            <span>·</span>
            <span>100% Free Forever</span>
          </div>
        </motion.div>

        {/* ─── Appearance / Dark Mode ─── */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className={`${card} rounded-2xl overflow-hidden`}>
          <div className="px-5 pt-5 pb-3">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isDark ? 'bg-indigo-900' : 'bg-indigo-100'}`}>
                {isDark ? <Moon size={18} className="text-indigo-400" /> : <Sun size={18} className="text-indigo-600" />}
              </div>
              <div>
                <h3 className={`font-semibold text-sm ${txt}`}>Appearance</h3>
                <p className={`text-xs ${sub}`}>Choose how ResumePal looks</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {themeOptions.map(({ value, label, icon: Icon, desc }) => {
                const active = theme === value;
                return (
                  <button key={value} onClick={() => setTheme(value as any)}
                    className={`flex flex-col items-center py-4 px-2 rounded-xl border-2 transition-all duration-200 ${
                      active
                        ? 'border-amber-400 bg-amber-400/10'
                        : isDark
                          ? 'border-slate-600 hover:border-slate-500 hover:bg-slate-700'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}>
                    <Icon size={22} className={active ? 'text-amber-400' : isDark ? 'text-slate-400' : 'text-gray-400'} />
                    <span className={`text-xs font-bold mt-1.5 ${active ? 'text-amber-400' : isDark ? 'text-slate-300' : 'text-gray-700'}`}>{label}</span>
                    <span className={`text-[10px] mt-0.5 ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>{desc}</span>
                  </button>
                );
              })}
            </div>
            <div className={`mt-3 px-3 py-2 rounded-lg text-xs flex items-center gap-2 ${isDark ? 'bg-slate-700 text-slate-300' : 'bg-gray-100 text-gray-600'}`}>
              <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isDark ? 'bg-blue-400' : 'bg-amber-400'}`} />
              Currently: <strong className="ml-1">{isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}</strong>
            </div>
          </div>
        </motion.div>

        {/* ─── Features Info ─── */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className={`${card} rounded-2xl overflow-hidden`}>
          <div className="px-5 pt-4 pb-1">
            <h3 className={`font-semibold text-sm mb-3 ${txt}`}>What You Get (100% Free)</h3>
          </div>
          {[
            { icon: '📄', label: '15 Professional Resume Templates' },
            { icon: '⬇️', label: 'Unlimited PDF Downloads' },
            { icon: '✏️', label: 'Live Preview While Editing' },
            { icon: '💾', label: 'Auto-saves in Browser Storage' },
            { icon: '📵', label: 'Works Offline (No Internet Needed)' },
            { icon: '🔒', label: 'Your Data Never Leaves Your Device' },
            { icon: '🚫', label: 'No Sign-up · No Ads · No Paywall' },
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-3 px-5 py-3 border-t ${divider}`}>
              <span className="text-base flex-shrink-0">{item.icon}</span>
              <span className={`text-sm ${rowTxt}`}>{item.label}</span>
            </div>
          ))}
        </motion.div>

        {/* ─── Support & Contact ─── */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className={`${card} rounded-2xl overflow-hidden`}>
          <div className="px-5 pt-4 pb-1">
            <h3 className={`font-semibold text-sm mb-3 ${txt}`}>Help & Contact</h3>
          </div>

          <Link to="/contact" className={`flex items-center gap-3 px-5 py-3.5 border-t ${divider} ${row} transition-colors`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-blue-900' : 'bg-blue-100'}`}>
              <MessageCircle size={16} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
            </div>
            <div className="flex-1">
              <p className={`text-sm font-medium ${rowTxt}`}>Contact Support</p>
              <p className={`text-xs ${sub}`}>Get help with any issue</p>
            </div>
            <ChevronRight size={16} className={chevron} />
          </Link>

          <a href="mailto:sewacircle123@gmail.com" className={`flex items-center gap-3 px-5 py-3.5 border-t ${divider} ${row} transition-colors`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-amber-900' : 'bg-amber-100'}`}>
              <Mail size={16} className={isDark ? 'text-amber-400' : 'text-amber-600'} />
            </div>
            <div className="flex-1">
              <p className={`text-sm font-medium ${rowTxt}`}>Email Us</p>
              <p className={`text-xs ${sub}`}>sewacircle123@gmail.com</p>
            </div>
            <ChevronRight size={16} className={chevron} />
          </a>

          <Link to="/donate" className={`flex items-center gap-3 px-5 py-3.5 border-t ${divider} ${row} transition-colors`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-red-900' : 'bg-red-100'}`}>
              <Heart size={16} className={isDark ? 'text-red-400 fill-red-400' : 'text-red-500 fill-red-500'} />
            </div>
            <div className="flex-1">
              <p className={`text-sm font-medium ${rowTxt}`}>Support ResumePal</p>
              <p className={`text-xs ${sub}`}>Buy us a coffee ☕ (optional)</p>
            </div>
            <ChevronRight size={16} className={chevron} />
          </Link>
        </motion.div>

        {/* ─── Share & Rate ─── */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className={`${card} rounded-2xl overflow-hidden`}>
          <div className="px-5 pt-4 pb-1">
            <h3 className={`font-semibold text-sm mb-3 ${txt}`}>Share & Rate</h3>
          </div>

          <button onClick={handleShare} className={`w-full flex items-center gap-3 px-5 py-3.5 border-t ${divider} ${row} transition-colors text-left`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-green-900' : 'bg-green-100'}`}>
              <Share2 size={16} className={isDark ? 'text-green-400' : 'text-green-600'} />
            </div>
            <div className="flex-1">
              <p className={`text-sm font-medium ${rowTxt}`}>Share ResumePal</p>
              <p className={`text-xs ${sub}`}>{shared ? '✓ Link copied!' : 'Help others create great resumes'}</p>
            </div>
            <ChevronRight size={16} className={chevron} />
          </button>

          <button onClick={handleRate} className={`w-full flex items-center gap-3 px-5 py-3.5 border-t ${divider} ${row} transition-colors text-left`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-yellow-900' : 'bg-yellow-100'}`}>
              <Star size={16} className={isDark ? 'text-yellow-400' : 'text-yellow-600'} />
            </div>
            <div className="flex-1">
              <p className={`text-sm font-medium ${rowTxt}`}>Rate on Play Store</p>
              <p className={`text-xs ${sub}`}>Your review motivates us!</p>
            </div>
            <ChevronRight size={16} className={chevron} />
          </button>

          <a href="https://wa.me/?text=Create%20your%20resume%20for%20FREE%20with%20ResumePal%20%F0%9F%9A%80%20No%20sign-up%20needed!" target="_blank" rel="noreferrer"
            className={`flex items-center gap-3 px-5 py-3.5 border-t ${divider} ${row} transition-colors`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-green-900' : 'bg-green-100'}`}>
              <Phone size={16} className={isDark ? 'text-green-400' : 'text-green-600'} />
            </div>
            <div className="flex-1">
              <p className={`text-sm font-medium ${rowTxt}`}>Share on WhatsApp</p>
              <p className={`text-xs ${sub}`}>Tell your friends & family</p>
            </div>
            <ChevronRight size={16} className={chevron} />
          </a>
        </motion.div>

        {/* ─── Legal ─── */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className={`${card} rounded-2xl overflow-hidden`}>
          <div className="px-5 pt-4 pb-1">
            <h3 className={`font-semibold text-sm mb-3 ${txt}`}>Legal</h3>
          </div>

          <Link to="/terms" className={`flex items-center gap-3 px-5 py-3.5 border-t ${divider} ${row} transition-colors`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-slate-700' : 'bg-gray-100'}`}>
              <FileText size={16} className={isDark ? 'text-slate-400' : 'text-gray-500'} />
            </div>
            <p className={`flex-1 text-sm font-medium ${rowTxt}`}>Terms of Service</p>
            <ChevronRight size={16} className={chevron} />
          </Link>

          <Link to="/privacy" className={`flex items-center gap-3 px-5 py-3.5 border-t ${divider} ${row} transition-colors`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-slate-700' : 'bg-gray-100'}`}>
              <Shield size={16} className={isDark ? 'text-slate-400' : 'text-gray-500'} />
            </div>
            <p className={`flex-1 text-sm font-medium ${rowTxt}`}>Privacy Policy</p>
            <ChevronRight size={16} className={chevron} />
          </Link>

          <a href="mailto:sewacircle123@gmail.com?subject=Report%20an%20Issue" className={`flex items-center gap-3 px-5 py-3.5 border-t ${divider} ${row} transition-colors`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-orange-900' : 'bg-orange-100'}`}>
              <AlertCircle size={16} className={isDark ? 'text-orange-400' : 'text-orange-600'} />
            </div>
            <p className={`flex-1 text-sm font-medium ${rowTxt}`}>Report an Issue</p>
            <ChevronRight size={16} className={chevron} />
          </a>
        </motion.div>

        {/* ─── Danger Zone: Reset ─── */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className={`${card} rounded-2xl overflow-hidden`}>
          <div className="px-5 pt-4 pb-1">
            <h3 className={`font-semibold text-sm mb-3 ${isDark ? 'text-red-400' : 'text-red-600'}`}>Reset</h3>
          </div>

          {!showClearConfirm && !cleared ? (
            <button onClick={() => setShowClearConfirm(true)}
              className={`w-full flex items-center gap-3 px-5 py-3.5 border-t ${divider} transition-colors text-left ${isDark ? 'hover:bg-red-900/30' : 'hover:bg-red-50'}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-red-900' : 'bg-red-100'}`}>
                <Trash2 size={16} className="text-red-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-red-500">Reset App</p>
                <p className={`text-xs ${sub}`}>Clear all local resume data</p>
              </div>
            </button>
          ) : cleared ? (
            <div className="px-5 py-4 border-t border-green-200/30 text-center">
              <p className="text-green-500 text-sm font-medium">✓ Cleared! Reloading...</p>
            </div>
          ) : (
            <div className={`px-5 py-4 border-t ${divider}`}>
              <p className={`text-sm mb-3 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                ⚠️ This will delete all resume data saved on this device. This cannot be undone.
              </p>
              <div className="flex gap-2">
                <button onClick={() => setShowClearConfirm(false)}
                  className={`flex-1 py-2 rounded-xl text-sm font-semibold border transition-colors ${isDark ? 'border-slate-600 text-slate-300 hover:bg-slate-700' : 'border-gray-200 text-gray-600 hover:bg-gray-100'}`}>
                  Cancel
                </button>
                <button onClick={handleClearData}
                  className="flex-1 py-2 rounded-xl text-sm font-bold bg-red-500 hover:bg-red-600 text-white transition-colors">
                  Yes, Reset
                </button>
              </div>
            </div>
          )}
          <p className={`px-5 pb-4 pt-2 text-xs ${sub}`}>
            Note: Data is stored only in your browser. Clearing browser cache will also remove it.
          </p>
        </motion.div>

        {/* ─── About / Credits ─── */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="text-center space-y-2 pt-2 pb-4">
          <p className={`text-xs ${sub}`}>ResumePal v1.0.0 · 2026</p>
          <p className={`text-xs ${sub}`}>Built with ❤️ in Nepal 🇳🇵</p>
          <a href="mailto:sewacircle123@gmail.com" className="block text-xs font-medium text-amber-500 hover:text-amber-400 transition-colors">
            sewacircle123@gmail.com
          </a>
          <div className={`flex items-center justify-center gap-4 pt-1`}>
            <Link to="/terms" className={`text-xs ${sub} hover:text-amber-500 transition-colors`}>Terms</Link>
            <span className={`text-xs ${sub}`}>·</span>
            <Link to="/privacy" className={`text-xs ${sub} hover:text-amber-500 transition-colors`}>Privacy</Link>
            <span className={`text-xs ${sub}`}>·</span>
            <Link to="/contact" className={`text-xs ${sub} hover:text-amber-500 transition-colors`}>Contact</Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
