import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Check, Copy, Smartphone, Building2, Users, Server, Code, Coffee } from 'lucide-react';

export default function DonatePage() {
  const [amount, setAmount] = useState<number | string>('');
  const [customAmount, setCustomAmount] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'khalti' | 'bank'>('khalti');

  const presetAmounts = [100, 250, 500, 1000];

  const handleAmountSelect = (amt: number) => {
    setAmount(amt);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(value);
    setAmount(value ? parseInt(value) : '');
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('https://formspree.io/f/prajwalchh2025@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          amount: amount || 'Not specified',
          type: 'Donation Notification'
        }),
      });
    } catch { /* silent */ }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart size={40} className="text-green-500 fill-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Thank You! 🙏</h2>
          <p className="text-gray-600 mb-6">
            Your generosity means the world to us! Your support helps keep ResumePal free for everyone.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      {/* Header */}
      <div className="bg-white/5 backdrop-blur border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm">
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 sm:py-10">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-pink-500/20 border border-pink-500/30 rounded-full px-4 py-1.5 mb-4">
            <Heart size={14} className="text-pink-400 fill-pink-400" />
            <span className="text-pink-300 font-medium text-sm">Support Our Mission</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Help Keep ResumePal <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-pink-400">Free Forever</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
            ResumePal is 100% free — no hidden charges, no premium plans, no ads. Your donation helps us pay for servers, development, and keeping this tool accessible to everyone.
          </p>
        </motion.div>

        {/* Why Donate - Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8"
        >
          {[
            { icon: Server, label: 'Server Costs', desc: 'Hosting & bandwidth' },
            { icon: Code, label: 'Development', desc: 'New features & fixes' },
            { icon: Users, label: 'Free for All', desc: 'No paywalls ever' },
            { icon: Coffee, label: 'Fuel the Dev', desc: 'Coffee keeps us going!' },
          ].map((item, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
              <div className="w-10 h-10 bg-amber-400/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <item.icon size={18} className="text-amber-400" />
              </div>
              <h4 className="text-white text-xs font-bold mb-0.5">{item.label}</h4>
              <p className="text-gray-500 text-[10px]">{item.desc}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Left: QR Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden sticky top-6">
              {/* Tabs */}
              <div className="flex border-b border-gray-100">
                <button
                  onClick={() => setActiveTab('khalti')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold transition-colors ${
                    activeTab === 'khalti'
                      ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Smartphone size={16} />
                  Khalti
                </button>
                <button
                  onClick={() => setActiveTab('bank')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold transition-colors ${
                    activeTab === 'bank'
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Building2 size={16} />
                  Bank
                </button>
              </div>

              {/* QR Content */}
              <div className="p-4">
                {activeTab === 'khalti' ? (
                  <div>
                    <div className="bg-purple-50 rounded-xl p-3 mb-3">
                      <img
                        src="./khalti-qr.png"
                        alt="Khalti QR Code - Scan to Pay"
                        className="w-full h-auto rounded-lg"
                        style={{ maxHeight: '300px', objectFit: 'contain', margin: '0 auto', display: 'block' }}
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-gray-500 text-xs mb-1">Khalti Account</p>
                      <p className="font-bold text-gray-900">Prajwal Chaudhary</p>
                      <div className="flex items-center justify-center gap-2 mt-1">
                        <span className="font-mono text-gray-600 text-sm">9804334966</span>
                        <button
                          onClick={() => copyToClipboard('9804334966', 'khalti')}
                          className="p-1 hover:bg-purple-100 rounded transition-colors"
                        >
                          {copied === 'khalti' ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="text-gray-400" />}
                        </button>
                      </div>
                    </div>
                    <div className="mt-3 bg-purple-50 rounded-lg p-3">
                      <p className="text-purple-800 text-xs font-bold mb-1.5">📱 How to Pay:</p>
                      <ol className="text-purple-700 text-[11px] space-y-0.5">
                        <li>1. Open Khalti app</li>
                        <li>2. Scan QR or search: 9804334966</li>
                        <li>3. Enter amount & confirm</li>
                      </ol>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="bg-blue-50 rounded-xl p-3 mb-3">
                      <img
                        src="./qr-code.png"
                        alt="Bank QR Code - Scan to Pay"
                        className="w-full h-auto rounded-lg"
                        style={{ maxHeight: '300px', objectFit: 'contain', margin: '0 auto', display: 'block' }}
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-gray-500 text-xs mb-1">Global IME Bank</p>
                      <p className="font-bold text-gray-900">Prajwal Chaudhary</p>
                      <div className="flex items-center justify-center gap-2 mt-1">
                        <span className="font-mono text-gray-600 text-sm">29507010026743</span>
                        <button
                          onClick={() => copyToClipboard('29507010026743', 'bank')}
                          className="p-1 hover:bg-blue-100 rounded transition-colors"
                        >
                          {copied === 'bank' ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="text-gray-400" />}
                        </button>
                      </div>
                    </div>
                    <div className="mt-3 bg-blue-50 rounded-lg p-3">
                      <p className="text-blue-800 text-xs font-bold mb-1.5">🏦 How to Pay:</p>
                      <ol className="text-blue-700 text-[11px] space-y-0.5">
                        <li>1. Open your banking app</li>
                        <li>2. Scan QR or enter account number</li>
                        <li>3. Enter amount & confirm</li>
                      </ol>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right: Amount + Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3 space-y-5"
          >
            {/* Amount Selection */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-5 border border-white/10">
              <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                <Heart size={16} className="text-pink-400 fill-pink-400" />
                Choose Amount (NPR)
              </h3>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {presetAmounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => handleAmountSelect(amt)}
                    className={`py-2.5 rounded-xl font-bold text-sm transition-all ${
                      amount === amt
                        ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-gray-900 shadow-lg shadow-amber-400/30'
                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                    }`}
                  >
                    Rs. {amt}
                  </button>
                ))}
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 text-sm font-medium">Rs.</span>
                <input
                  type="text"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  placeholder="Custom amount"
                  className="w-full bg-white/10 border border-white/20 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-amber-400 transition-all"
                />
              </div>
            </div>

            {/* Donation Form */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-5 border border-white/10">
              <h3 className="text-white font-bold mb-1 flex items-center gap-2">
                📧 Notify Us (Optional)
              </h3>
              <p className="text-gray-400 text-xs mb-4">Let us know about your donation so we can thank you personally</p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input type="hidden" name="amount" value={typeof amount === 'number' ? `Rs. ${amount}` : 'Not specified'} />
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-white/70 text-xs font-medium mb-1">Your Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your name"
                      className="w-full bg-white/10 border border-white/20 rounded-xl py-2.5 px-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-amber-400 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 text-xs font-medium mb-1">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full bg-white/10 border border-white/20 rounded-xl py-2.5 px-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-amber-400 transition-all"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white/70 text-xs font-medium mb-1">Message (Optional)</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Leave a kind message..."
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-xl py-2.5 px-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-amber-400 transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-400 to-pink-400 text-gray-900 font-bold py-3 rounded-xl hover:from-amber-300 hover:to-pink-300 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Heart className="fill-gray-900" size={16} />
                  Send Donation Info
                </button>
              </form>
            </div>

            {/* Why Your Donation Matters */}
            <div className="bg-white/5 backdrop-blur rounded-2xl p-5 border border-white/10">
              <h3 className="text-white font-bold mb-3">💖 Why Your Donation Matters</h3>
              <div className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-base">🆓</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">100% Free, No Paywalls</h4>
                    <p className="text-gray-400 text-xs">We believe everyone deserves a great resume. Your donation ensures we never charge users.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-base">🎓</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">Helping Students & Job Seekers</h4>
                    <p className="text-gray-400 text-xs">Students and freshers who can't afford premium resume builders can use ResumePal for free.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-base">🚀</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">Continuous Improvement</h4>
                    <p className="text-gray-400 text-xs">Your support helps us add new templates, features, and keep the site running smoothly.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-base">🇳🇵</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">Made in Nepal 🇳🇵</h4>
                    <p className="text-gray-400 text-xs">Built by a Nepali developer for the global community. Every rupee helps!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Thank You Note */}
            <div className="bg-gradient-to-r from-amber-400/10 to-pink-400/10 border border-amber-400/20 rounded-2xl p-4 text-center">
              <p className="text-amber-200 text-sm">
                ✨ Even Rs. 100 makes a difference. Thank you for being amazing! ✨
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
