import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, MessageCircle, Clock, Heart } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('https://formspree.io/f/sewacircle123@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-8 max-w-md text-center shadow-lg">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail size={32} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h2>
          <p className="text-gray-600 mb-6">Thank you for reaching out. We'll get back to you within 24-48 hours.</p>
          <Link to="/" className="inline-block bg-amber-400 text-gray-900 font-bold px-6 py-2 rounded-lg hover:bg-amber-300 transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-4 py-3 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Link to="/" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft size={20} className="text-gray-600" />
          </Link>
          <h1 className="font-bold text-xl">Contact Us</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <MessageCircle size={32} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Get in Touch</h2>
          <p className="text-gray-600">We'd love to hear from you! Send us a message and we'll respond as soon as possible.</p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Mail size={20} className="text-amber-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Email Us</h4>
                <a href="mailto:sewacircle123@gmail.com" className="text-amber-600 hover:underline text-sm">
                  sewacircle123@gmail.com
                </a>
              </div>
            </div>
            <p className="text-xs text-gray-500">We typically respond within 24-48 hours</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Clock size={20} className="text-green-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Response Time</h4>
                <p className="text-gray-600 text-sm">Usually within 1-2 business days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="How can we help?"
                required
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us more about your question or feedback..."
                rows={6}
                required
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white resize-y"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-400 to-orange-400 text-gray-900 font-bold py-3 rounded-xl hover:from-amber-300 hover:to-orange-300 transition-all flex items-center justify-center gap-2"
            >
              <Mail size={18} />
              Send Message
            </button>
          </form>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <h3 className="font-bold text-amber-900 mb-4 flex items-center gap-2">
            <Heart size={18} className="fill-amber-600" /> Common Questions
          </h3>
          <div className="space-y-3 text-sm text-amber-900">
            <div>
              <p className="font-semibold">Is ResumePal really free?</p>
              <p className="text-amber-700">Yes! 100% free forever. No hidden charges, no premium features.</p>
            </div>
            <div>
              <p className="font-semibold">How do I download my resume?</p>
              <p className="text-amber-700">Click "Download PDF" in the builder. It works on all devices.</p>
            </div>
            <div>
              <p className="font-semibold">Can I use it offline?</p>
              <p className="text-amber-700">Yes! Once loaded, ResumePal works completely offline.</p>
            </div>
            <div>
              <p className="font-semibold">Is my data safe?</p>
              <p className="text-amber-700">Your resume data stays on your device. We never store it on servers.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
