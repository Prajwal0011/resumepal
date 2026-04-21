import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { getTemplateComponent } from '../templates';
import { motion } from 'framer-motion';
import { FileText, Download, Palette, Sparkles, ArrowRight, Heart, Check, Star } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const { templates, previewData, setSelectedTemplate } = useResume();

  const handleTemplateClick = (templateId: string) => {
    setSelectedTemplate(templateId);
    navigate('/builder');
  };

  const features = [
    { icon: Palette, title: '15 Beautiful Templates', desc: 'Choose from modern, classic, creative, and more styles' },
    { icon: FileText, title: 'Easy Editor', desc: 'Fill in your details with our intuitive form builder' },
    { icon: Download, title: 'PDF Export', desc: 'Download your resume as a professional PDF instantly' },
    { icon: Sparkles, title: '100% Free', desc: 'No hidden fees, no watermarks, completely free' },
  ];

  const steps = [
    { num: '01', title: 'Pick a Template', desc: 'Browse our collection and choose your favorite design' },
    { num: '02', title: 'Fill Your Info', desc: 'Enter your details using our simple form editor' },
    { num: '03', title: 'Export PDF', desc: 'Preview and download your polished resume as PDF' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gray-900 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm mb-6">
              <Sparkles size={14} className="text-amber-400" />
              <span>Free Resume Builder — No Sign Up Required</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Build Your <span className="text-amber-400">Perfect Resume</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
              Create a stunning, professional resume in minutes. Choose from 15 expertly designed templates, customize with ease, and download as PDF — all for free.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => navigate('/builder')}
                className="bg-amber-400 text-gray-900 font-bold px-8 py-3.5 rounded-lg hover:bg-amber-300 transition-colors flex items-center gap-2"
              >
                Create Resume <ArrowRight size={18} />
              </button>
              <button
                onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white/10 text-white font-medium px-8 py-3.5 rounded-lg hover:bg-white/20 transition-colors border border-white/20"
              >
                View Templates
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Why Choose ResumePal?</h2>
            <p className="text-gray-500">Everything you need to create a professional resume</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center mb-4">
                  <f.icon size={22} className="text-amber-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">How It Works</h2>
            <p className="text-gray-500">Three simple steps to your dream resume</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="text-6xl font-black text-gray-100 mb-4">{s.num}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Gallery */}
      <section id="templates" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Choose Your Template</h2>
            <p className="text-gray-500">15 professional designs to match your style</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((template, i) => {
              const TemplateComp = getTemplateComponent(template.id);
              return (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group cursor-pointer"
                  onClick={() => handleTemplateClick(template.id)}
                >
                  <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all hover:-translate-y-1">
                    <div className="h-64 overflow-hidden bg-gray-100 relative">
                      <div className="scale-[0.35] origin-top-left w-[800px]">
                        <TemplateComp data={previewData} />
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-gray-900">{template.name}</h3>
                          <p className="text-gray-500 text-xs mt-0.5">{template.description}</p>
                        </div>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: template.color + '15' }}>
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: template.color }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Loved by Job Seekers</h2>
            <p className="text-gray-500">See what people are saying about ResumePal</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Sarah M.', role: 'Marketing Manager', text: 'I created my resume in under 15 minutes. The templates look incredibly professional and I got callbacks within days!' },
              { name: 'James K.', role: 'Software Engineer', text: 'The Tech template is perfect for developers. Clean, modern, and highlights skills beautifully. Highly recommend!' },
              { name: 'Emily R.', role: 'UX Designer', text: 'Finally a free resume builder that does not watermark or limit exports. The Creative template matched my style perfectly.' },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-50 rounded-xl p-6"
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} className="text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">"{t.text}"</p>
                <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                <p className="text-gray-500 text-xs">{t.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Land Your Dream Job?</h2>
          <p className="text-gray-400 mb-8">Create your professional resume today — it is free and takes just minutes.</p>
          <button
            onClick={() => navigate('/builder')}
            className="bg-amber-400 text-gray-900 font-bold px-10 py-4 rounded-lg hover:bg-amber-300 transition-colors text-lg flex items-center gap-2 mx-auto"
          >
            Build My Resume <ArrowRight size={20} />
          </button>
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-gray-400">
            <span className="flex items-center gap-1"><Check size={14} className="text-green-400" /> No sign up required</span>
            <span className="flex items-center gap-1"><Check size={14} className="text-green-400" /> No watermarks</span>
            <span className="flex items-center gap-1"><Check size={14} className="text-green-400" /> Unlimited downloads</span>
          </div>
        </div>
      </section>

      {/* Donation CTA */}
      <section className="py-16 px-6 bg-amber-50">
        <div className="max-w-3xl mx-auto text-center">
          <Heart size={32} className="text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Support ResumePal</h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            ResumePal is completely free. If you found it helpful, consider making a small donation to help us keep improving and adding new features.
          </p>
          <button
            onClick={() => navigate('/donate')}
            className="bg-red-500 text-white font-bold px-8 py-3 rounded-lg hover:bg-red-600 transition-colors inline-flex items-center gap-2"
          >
            <Heart size={16} /> Make a Donation
          </button>
        </div>
      </section>
    </div>
  );
}
