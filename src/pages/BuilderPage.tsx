import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { useTheme } from '../context/ThemeContext';
import { getTemplateComponent } from '../templates';
import ScaledPreview from '../components/ScaledPreview';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {
  User, Briefcase, GraduationCap, Wrench, FolderOpen, Award,
  Plus, Trash2, Download, Eye, ArrowLeft, X,
  Palette, Save, Check
} from 'lucide-react';

const sections = [
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: Wrench },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'certifications', label: 'Certifications', icon: Award },
];

export default function BuilderPage() {
  const navigate = useNavigate();
  const { resumeData, setResumeData, previewData, selectedTemplate, setSelectedTemplate, templates } = useResume();
  const [activeSection, setActiveSection] = useState('personal');
  const [showPreview, setShowPreview] = useState(false);
  const [showTemplatePicker, setShowTemplatePicker] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const previewRef = useRef<HTMLDivElement>(null);

  const { isDark } = useTheme();
  const TemplateComp = getTemplateComponent(selectedTemplate);

  const handleDownloadPDF = async () => {
    setDownloading(true);
    try {
      const el = previewRef.current;
      if (!el) {
        alert('Preview not available.');
        setDownloading(false);
        return;
      }

      // Temporarily make the element visible and properly sized for capture
      const originalStyle = el.style.cssText;
      el.style.width = '800px';
      el.style.minHeight = '1130px';
      el.style.position = 'relative';
      el.style.overflow = 'visible';

      // Wait for styles to apply
      await new Promise(resolve => setTimeout(resolve, 200));

      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: 800,
        windowWidth: 800,
      });

      // Restore original styles
      el.style.cssText = originalStyle;

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const finalWidth = imgWidth * ratio;
      const finalHeight = imgHeight * ratio;
      const offsetX = (pdfWidth - finalWidth) / 2;

      pdf.addImage(imgData, 'PNG', offsetX, 0, finalWidth, finalHeight);

      const fileName = previewData.personalInfo.fullName
        ? `${previewData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`
        : 'Resume.pdf';

      pdf.save(fileName);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (error) {
      console.error('PDF error:', error);
      // Fallback: open print dialog
      try {
        const el = previewRef.current;
        if (el) {
          const printWindow = window.open('', '_blank');
          if (printWindow) {
            const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
              .map(s => s.outerHTML).join('\n');
            printWindow.document.write(`<!DOCTYPE html><html><head><title>Resume</title>${styles}
              <style>@media print { @page { margin: 0; } body { margin: 0; } * { print-color-adjust: exact !important; -webkit-print-color-adjust: exact !important; } }</style>
            </head><body style="margin:20px;background:white;">${el.innerHTML}</body></html>`);
            printWindow.document.close();
            setTimeout(() => printWindow.print(), 500);
          }
        }
      } catch {
        alert('Please use Ctrl+P (or Cmd+P) to save as PDF.');
      }
    }
    setDownloading(false);
  };

  const handleSave = () => {
    localStorage.setItem('resumepal_data', JSON.stringify(resumeData));
    localStorage.setItem('resumepal_template', selectedTemplate);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updatePersonal = (field: string, value: string) => {
    setResumeData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: value } }));
  };

  const addItem = (section: string) => {
    setResumeData(prev => {
      const newItem: any = { id: Date.now().toString() };
      if (section === 'experiences') {
        newItem.company = ''; newItem.position = ''; newItem.startDate = ''; newItem.endDate = ''; newItem.current = false; newItem.description = '';
      } else if (section === 'education') {
        newItem.school = ''; newItem.degree = ''; newItem.field = ''; newItem.startDate = ''; newItem.endDate = ''; newItem.current = false; newItem.graduationDate = '';
      } else if (section === 'skills') {
        newItem.name = ''; newItem.level = 'Intermediate';
      } else if (section === 'projects') {
        newItem.name = ''; newItem.description = ''; newItem.link = ''; newItem.technologies = '';
      } else if (section === 'certifications') {
        newItem.name = ''; newItem.issuer = ''; newItem.date = '';
      }
      return { ...prev, [section]: [...(prev as any)[section], newItem] };
    });
  };

  const removeItem = (section: string, id: string) => {
    setResumeData(prev => ({ ...prev, [section]: (prev as any)[section].filter((item: any) => item.id !== id) }));
  };

  const updateItem = (section: string, id: string, field: string, value: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: (prev as any)[section].map((item: any) => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const addQuickSkill = () => {
    const name = newSkill.trim();
    if (!name) return;
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, { id: Date.now().toString(), name, level: 'Intermediate' }]
    }));
    setNewSkill('');
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addQuickSkill();
    }
  };

  const suggestedSkills = [
    'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'Java', 'C++',
    'SQL', 'Git', 'Docker', 'AWS', 'Figma', 'HTML/CSS', 'MongoDB', 'GraphQL',
    'Flutter', 'Swift', 'Kotlin', 'PHP', 'Ruby', 'Go', 'Rust',
    'Photoshop', 'Illustrator', 'Excel', 'PowerPoint', 'Leadership', 'Communication',
    'Project Management', 'Agile', 'Scrum', 'Data Analysis', 'Machine Learning'
  ];

  const unusedSuggestions = suggestedSkills.filter(
    s => !resumeData.skills.some(sk => sk.name.toLowerCase() === s.toLowerCase())
  );

  const inputClass = `w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all ${
    isDark
      ? 'bg-slate-800 border-slate-600 text-slate-100 placeholder-slate-400'
      : 'bg-white border-gray-200 text-gray-900'
  }`;
  const labelClass = `text-xs font-semibold uppercase tracking-wider mb-1.5 block ${isDark ? 'text-slate-400' : 'text-gray-500'}`;


  const topBarClass = isDark ? 'bg-slate-800 border-b border-slate-700 px-4 py-3 flex items-center justify-between sticky top-0 z-50' : 'bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-50';
  const pageClass = isDark ? 'min-h-screen bg-slate-900 flex flex-col' : 'min-h-screen bg-gray-100 flex flex-col';

  return (
    <div className={pageClass}>
      {/* Top Bar */}
      <div className={topBarClass}>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/')} className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-slate-700' : 'hover:bg-gray-100'}`}>
            <ArrowLeft size={18} className={isDark ? 'text-slate-300' : 'text-gray-600'} />
          </button>
          <h1 className={`font-bold hidden sm:block ${isDark ? 'text-white' : 'text-gray-900'}`}>Resume Builder</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTemplatePicker(!showTemplatePicker)}
            className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isDark ? 'text-slate-300 hover:bg-slate-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Palette size={16} />
            <span className="hidden sm:inline">Templates</span>
          </button>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors lg:hidden ${showPreview ? 'bg-amber-400 text-gray-900' : isDark ? 'text-slate-300 hover:bg-slate-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            {showPreview ? <X size={16} /> : <Eye size={16} />}
            <span className="hidden sm:inline">{showPreview ? 'Edit' : 'Preview'}</span>
          </button>
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isDark ? 'text-slate-300 hover:bg-slate-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            {saved ? <Check size={16} className="text-green-500" /> : <Save size={16} className={isDark ? 'text-slate-300' : ''} />}
            <span className="hidden sm:inline">{saved ? 'Saved!' : 'Save'}</span>
          </button>
          <button
            onClick={handleDownloadPDF}
            disabled={downloading}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-400 text-gray-900 text-sm font-bold rounded-lg hover:from-amber-300 hover:to-orange-300 transition-all disabled:opacity-50 shadow-sm"
            title="Download as PDF"
          >
            <Download size={16} />
            <span className="hidden sm:inline">{downloading ? 'Exporting...' : 'Download PDF'}</span>
          </button>
        </div>
      </div>

      {/* Template Picker Dropdown */}
      <AnimatePresence>
        {showTemplatePicker && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={`${isDark ? 'bg-slate-800 border-b border-slate-700' : 'bg-white border-b border-gray-200'} overflow-hidden`}
          >
            <div className="p-4 flex gap-3 overflow-x-auto">
              {templates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setSelectedTemplate(t.id); setShowTemplatePicker(false); }}
                  className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedTemplate === t.id
                      ? 'bg-amber-400 text-gray-900'
                      : isDark ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: t.color }} />
                  {t.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-1 overflow-hidden">
        {/* Form Panel */}
        <div className={`flex-1 overflow-y-auto ${showPreview ? 'hidden lg:block' : ''} ${isDark ? 'bg-slate-900' : 'bg-gray-100'}`}>
          <div className="max-w-2xl mx-auto p-4 sm:p-6">
            {/* Section Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    activeSection === s.id
                      ? 'bg-amber-400 text-gray-900 font-bold'
                      : isDark
                        ? 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <s.icon size={14} />
                  {s.label}
                </button>
              ))}
            </div>

            {/* Personal Info */}
            {activeSection === 'personal' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Personal Information</h2>
                <div className={`border rounded-lg p-3 text-sm ${isDark ? 'bg-amber-900/30 border-amber-700 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
                  💡 Fill in your details below. The preview shows demo data until you start typing.
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Full Name</label>
                    <input className={inputClass} placeholder="e.g. John Doe" value={resumeData.personalInfo.fullName} onChange={e => updatePersonal('fullName', e.target.value)} />
                  </div>
                  <div>
                    <label className={labelClass}>Job Title</label>
                    <input className={inputClass} placeholder="e.g. Software Engineer" value={resumeData.personalInfo.title || ''} onChange={e => updatePersonal('title', e.target.value)} />
                  </div>
                  <div>
                    <label className={labelClass}>Email</label>
                    <input className={inputClass} type="email" placeholder="e.g. john@email.com" value={resumeData.personalInfo.email} onChange={e => updatePersonal('email', e.target.value)} />
                  </div>
                  <div>
                    <label className={labelClass}>Phone</label>
                    <input className={inputClass} placeholder="e.g. +977 9800000000" value={resumeData.personalInfo.phone} onChange={e => updatePersonal('phone', e.target.value)} />
                  </div>
                  <div>
                    <label className={labelClass}>Location</label>
                    <input className={inputClass} placeholder="e.g. Kathmandu, Nepal" value={resumeData.personalInfo.location} onChange={e => updatePersonal('location', e.target.value)} />
                  </div>
                  <div>
                    <label className={labelClass}>Website</label>
                    <input className={inputClass} placeholder="e.g. yourwebsite.com" value={resumeData.personalInfo.website || ''} onChange={e => updatePersonal('website', e.target.value)} />
                  </div>
                  <div>
                    <label className={labelClass}>LinkedIn</label>
                    <input className={inputClass} placeholder="e.g. linkedin.com/in/yourname" value={resumeData.personalInfo.linkedin || ''} onChange={e => updatePersonal('linkedin', e.target.value)} />
                  </div>
                  <div>
                    <label className={labelClass}>GitHub</label>
                    <input className={inputClass} placeholder="e.g. github.com/yourname" value={resumeData.personalInfo.github || ''} onChange={e => updatePersonal('github', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Professional Summary</label>
                  <textarea className={`${inputClass} min-h-[100px] resize-y`} placeholder="Write a brief summary about yourself, your experience, and what you're looking for..." value={resumeData.personalInfo.summary || ''} onChange={e => updatePersonal('summary', e.target.value)} />
                </div>
              </motion.div>
            )}

            {/* Experience */}
            {activeSection === 'experience' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Work Experience</h2>
                  <button onClick={() => addItem('experiences')} className="flex items-center gap-1 px-3 py-1.5 bg-amber-400 text-gray-900 text-xs font-bold rounded-lg hover:bg-amber-300 transition-colors">
                    <Plus size={14} /> Add
                  </button>
                </div>
                {resumeData.experiences.length === 0 && (
                  <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
                    <Briefcase size={32} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-400 text-sm mb-3">No experience added yet</p>
                    <button onClick={() => addItem('experiences')} className="inline-flex items-center gap-1 px-4 py-2 bg-amber-400 text-gray-900 text-sm font-bold rounded-lg hover:bg-amber-300 transition-colors">
                      <Plus size={14} /> Add Experience
                    </button>
                  </div>
                )}
                <div className="space-y-4">
                  {resumeData.experiences.map((exp) => (
                    <div key={exp.id} className={`rounded-xl p-5 border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                        <div>
                          <label className={labelClass}>Position</label>
                          <input className={inputClass} placeholder="e.g. Software Engineer" value={exp.position || ''} onChange={e => updateItem('experiences', exp.id, 'position', e.target.value)} />
                        </div>
                        <div>
                          <label className={labelClass}>Company</label>
                          <input className={inputClass} placeholder="e.g. Google" value={exp.company} onChange={e => updateItem('experiences', exp.id, 'company', e.target.value)} />
                        </div>
                        <div>
                          <label className={labelClass}>Start Date</label>
                          <input className={inputClass} type="month" value={exp.startDate} onChange={e => updateItem('experiences', exp.id, 'startDate', e.target.value)} />
                        </div>
                        <div>
                          <label className={labelClass}>End Date</label>
                          <input className={inputClass} type="month" value={exp.endDate} disabled={exp.current} onChange={e => updateItem('experiences', exp.id, 'endDate', e.target.value)} />
                        </div>
                      </div>
                      <label className="flex items-center gap-2 mb-3 cursor-pointer">
                        <input type="checkbox" checked={exp.current} onChange={e => updateItem('experiences', exp.id, 'current', e.target.checked)} className="rounded" />
                        <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>Currently working here</span>
                      </label>
                      <div className="mb-2">
                        <label className={labelClass}>Description</label>
                        <textarea className={`${inputClass} min-h-[80px] resize-y`} placeholder="Describe your responsibilities and achievements..." value={exp.description} onChange={e => updateItem('experiences', exp.id, 'description', e.target.value)} />
                      </div>
                      <button onClick={() => removeItem('experiences', exp.id)} className="flex items-center gap-1 text-red-500 text-xs hover:text-red-600">
                        <Trash2 size={12} /> Remove
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Education */}
            {activeSection === 'education' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Education</h2>
                  <button onClick={() => addItem('education')} className="flex items-center gap-1 px-3 py-1.5 bg-amber-400 text-gray-900 text-xs font-bold rounded-lg hover:bg-amber-300 transition-colors">
                    <Plus size={14} /> Add
                  </button>
                </div>
                {resumeData.education.length === 0 && (
                  <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
                    <GraduationCap size={32} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-400 text-sm mb-3">No education added yet</p>
                    <button onClick={() => addItem('education')} className="inline-flex items-center gap-1 px-4 py-2 bg-amber-400 text-gray-900 text-sm font-bold rounded-lg hover:bg-amber-300 transition-colors">
                      <Plus size={14} /> Add Education
                    </button>
                  </div>
                )}
                <div className="space-y-4">
                  {resumeData.education.map((edu) => (
                    <div key={edu.id} className="bg-white rounded-xl p-5 border border-gray-200">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                        <div>
                          <label className={labelClass}>School / University</label>
                          <input className={inputClass} placeholder="e.g. Tribhuvan University" value={edu.school} onChange={e => updateItem('education', edu.id, 'school', e.target.value)} />
                        </div>
                        <div>
                          <label className={labelClass}>Degree</label>
                          <input className={inputClass} placeholder="e.g. Bachelor of Science" value={edu.degree} onChange={e => updateItem('education', edu.id, 'degree', e.target.value)} />
                        </div>
                        <div>
                          <label className={labelClass}>Field of Study</label>
                          <input className={inputClass} placeholder="e.g. Computer Science" value={edu.field} onChange={e => updateItem('education', edu.id, 'field', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className={labelClass}>Start</label>
                            <input className={inputClass} type="month" value={edu.startDate} onChange={e => updateItem('education', edu.id, 'startDate', e.target.value)} />
                          </div>
                          <div>
                            <label className={labelClass}>End</label>
                            <input className={inputClass} type="month" value={edu.endDate} disabled={edu.current} onChange={e => updateItem('education', edu.id, 'endDate', e.target.value)} />
                          </div>
                        </div>
                      </div>
                      <label className="flex items-center gap-2 mb-2 cursor-pointer">
                        <input type="checkbox" checked={edu.current} onChange={e => updateItem('education', edu.id, 'current', e.target.checked)} className="rounded" />
                        <span className="text-sm text-gray-600">Currently studying</span>
                      </label>
                      <button onClick={() => removeItem('education', edu.id)} className="flex items-center gap-1 text-red-500 text-xs hover:text-red-600">
                        <Trash2 size={12} /> Remove
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Skills - Improved with quick add and suggestions */}
            {activeSection === 'skills' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Skills</h2>
                </div>

                {/* Quick Add Skill */}
                <div className="bg-white rounded-xl p-4 border border-gray-200 mb-4">
                  <label className={labelClass}>Add a Skill</label>
                  <div className="flex gap-2">
                    <input
                      className={inputClass}
                      placeholder="Type a skill and press Enter..."
                      value={newSkill}
                      onChange={e => setNewSkill(e.target.value)}
                      onKeyDown={handleSkillKeyDown}
                    />
                    <button
                      onClick={addQuickSkill}
                      disabled={!newSkill.trim()}
                      className="px-4 py-2 bg-amber-400 text-gray-900 font-bold text-sm rounded-lg hover:bg-amber-300 transition-colors disabled:opacity-30 whitespace-nowrap"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Suggested Skills */}
                {unusedSuggestions.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-400 mb-2 font-medium">Quick Add (click to add):</p>
                    <div className="flex flex-wrap gap-1.5">
                      {unusedSuggestions.slice(0, 20).map((skill) => (
                        <button
                          key={skill}
                          onClick={() => {
                            setResumeData(prev => ({
                              ...prev,
                              skills: [...prev.skills, { id: Date.now().toString() + Math.random(), name: skill, level: 'Intermediate' }]
                            }));
                          }}
                          className="px-2.5 py-1 bg-gray-100 hover:bg-amber-100 hover:border-amber-300 text-gray-600 text-xs rounded-full border border-gray-200 transition-all"
                        >
                          + {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Current Skills */}
                {resumeData.skills.length === 0 && (
                  <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
                    <Wrench size={32} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-400 text-sm">Type a skill above or click suggestions to add</p>
                  </div>
                )}
                <div className="space-y-2">
                  {resumeData.skills.map((skill) => (
                    <div key={skill.id} className="bg-white rounded-xl p-3 border border-gray-200 flex items-center gap-3">
                      <div className="flex-1">
                        <input
                          className="w-full px-2 py-1.5 border-0 text-sm focus:outline-none focus:ring-0 bg-transparent font-medium"
                          value={skill.name}
                          onChange={e => updateItem('skills', skill.id, 'name', e.target.value)}
                          placeholder="Skill name"
                        />
                      </div>
                      <select
                        className="px-2 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
                        value={skill.level}
                        onChange={e => updateItem('skills', skill.id, 'level', e.target.value)}
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Expert">Expert</option>
                      </select>
                      <button onClick={() => removeItem('skills', skill.id)} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Projects */}
            {activeSection === 'projects' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Projects</h2>
                  <button onClick={() => addItem('projects')} className="flex items-center gap-1 px-3 py-1.5 bg-amber-400 text-gray-900 text-xs font-bold rounded-lg hover:bg-amber-300 transition-colors">
                    <Plus size={14} /> Add
                  </button>
                </div>
                {resumeData.projects.length === 0 && (
                  <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
                    <FolderOpen size={32} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-400 text-sm mb-3">No projects added yet</p>
                    <button onClick={() => addItem('projects')} className="inline-flex items-center gap-1 px-4 py-2 bg-amber-400 text-gray-900 text-sm font-bold rounded-lg hover:bg-amber-300 transition-colors">
                      <Plus size={14} /> Add Project
                    </button>
                  </div>
                )}
                <div className="space-y-4">
                  {resumeData.projects.map((proj) => (
                    <div key={proj.id} className="bg-white rounded-xl p-5 border border-gray-200">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                        <div>
                          <label className={labelClass}>Project Name</label>
                          <input className={inputClass} placeholder="e.g. My Portfolio Website" value={proj.name} onChange={e => updateItem('projects', proj.id, 'name', e.target.value)} />
                        </div>
                        <div>
                          <label className={labelClass}>Link</label>
                          <input className={inputClass} placeholder="e.g. github.com/..." value={proj.link} onChange={e => updateItem('projects', proj.id, 'link', e.target.value)} />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className={labelClass}>Technologies</label>
                        <input className={inputClass} placeholder="e.g. React, Node.js, MongoDB" value={proj.technologies || ''} onChange={e => updateItem('projects', proj.id, 'technologies', e.target.value)} />
                      </div>
                      <div className="mb-2">
                        <label className={labelClass}>Description</label>
                        <textarea className={`${inputClass} min-h-[60px] resize-y`} placeholder="Describe what you built and the impact..." value={proj.description} onChange={e => updateItem('projects', proj.id, 'description', e.target.value)} />
                      </div>
                      <button onClick={() => removeItem('projects', proj.id)} className="flex items-center gap-1 text-red-500 text-xs hover:text-red-600">
                        <Trash2 size={12} /> Remove
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Certifications */}
            {activeSection === 'certifications' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Certifications</h2>
                  <button onClick={() => addItem('certifications')} className="flex items-center gap-1 px-3 py-1.5 bg-amber-400 text-gray-900 text-xs font-bold rounded-lg hover:bg-amber-300 transition-colors">
                    <Plus size={14} /> Add
                  </button>
                </div>
                {(resumeData.certifications || []).length === 0 && (
                  <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
                    <Award size={32} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-400 text-sm mb-3">No certifications added yet</p>
                    <button onClick={() => addItem('certifications')} className="inline-flex items-center gap-1 px-4 py-2 bg-amber-400 text-gray-900 text-sm font-bold rounded-lg hover:bg-amber-300 transition-colors">
                      <Plus size={14} /> Add Certification
                    </button>
                  </div>
                )}
                <div className="space-y-4">
                  {(resumeData.certifications || []).map((cert) => (
                    <div key={cert.id} className="bg-white rounded-xl p-5 border border-gray-200">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className={labelClass}>Certification</label>
                          <input className={inputClass} placeholder="e.g. AWS Certified" value={cert.name} onChange={e => updateItem('certifications', cert.id, 'name', e.target.value)} />
                        </div>
                        <div>
                          <label className={labelClass}>Issuer</label>
                          <input className={inputClass} placeholder="e.g. Amazon" value={cert.issuer} onChange={e => updateItem('certifications', cert.id, 'issuer', e.target.value)} />
                        </div>
                        <div>
                          <label className={labelClass}>Date</label>
                          <input className={inputClass} type="month" value={cert.date} onChange={e => updateItem('certifications', cert.id, 'date', e.target.value)} />
                        </div>
                      </div>
                      <button onClick={() => removeItem('certifications', cert.id)} className="flex items-center gap-1 text-red-500 text-xs hover:text-red-600 mt-3">
                        <Trash2 size={12} /> Remove
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Preview Panel — Mobile: full-screen overlay; Desktop: sidebar */}
        <div className={`${
          showPreview
            ? 'fixed inset-0 z-40 flex flex-col lg:relative lg:inset-auto lg:z-auto lg:flex'
            : 'hidden lg:flex lg:flex-col'
        } w-full lg:w-[580px] ${isDark ? 'bg-slate-700' : 'bg-gray-200'}`}>

          {/* Top bar - always visible in preview panel */}
          <div className={`flex-shrink-0 sticky top-0 z-10 px-4 py-3 flex items-center justify-between border-b ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
            <h2 className={`font-bold text-sm flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <Eye size={16} className="text-amber-500" />
              Resume Preview
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadPDF}
                disabled={downloading}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-400 to-orange-400 text-gray-900 text-xs font-bold rounded-lg disabled:opacity-50 transition-all shadow-sm"
              >
                <Download size={14} />
                <span>{downloading ? 'Generating...' : 'Download PDF'}</span>
              </button>
              {/* Close button — only on mobile */}
              <button
                onClick={() => setShowPreview(false)}
                className={`p-2 rounded-lg lg:hidden transition-colors ${isDark ? 'hover:bg-slate-700 text-slate-300' : 'hover:bg-gray-100 text-gray-600'}`}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Preview scrollable area */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            <div className="p-3 pb-8">
              {/*
                The resume itself is always rendered at full size (800px wide)
                for PDF export. On screen, CSS in index.css applies a
                transform:scale() so it fits the mobile viewport.
                overflow-hidden on the outer div clips the invisible overhang.
              */}
              <ScaledPreview previewRef={previewRef}>
                <TemplateComp data={previewData} />
              </ScaledPreview>

              <p className={`text-xs mt-3 text-center ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
                💡 Preview shows demo data until you fill in your own details
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <AnimatePresence>
        {downloadSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-[100]"
          >
            <Check size={20} />
            <span className="font-medium">PDF downloaded successfully!</span>
          </motion.div>
        )}
        {downloading && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-[100]"
          >
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Generating PDF...</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
