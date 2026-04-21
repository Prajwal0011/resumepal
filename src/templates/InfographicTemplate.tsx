import { ResumeData } from '../types/resume';
import { Mail, Phone, MapPin, Link2 } from 'lucide-react';

export default function InfographicTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experiences, education, skills } = data;

  return (
    <div className="min-h-[1100px] bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header with Avatar and Stats */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-10 py-10">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold backdrop-blur-sm">
            {personalInfo.fullName.charAt(0)}
          </div>
          <div>
            <h1 className="text-4xl font-bold">{personalInfo.fullName}</h1>
            <p className="text-white/80 text-lg">{personalInfo.title}</p>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
            <div className="text-3xl font-bold">{experiences?.length || 0}</div>
            <div className="text-xs text-white/70 uppercase tracking-wider">Years Exp</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
            <div className="text-3xl font-bold">{education?.length || 0}</div>
            <div className="text-xs text-white/70 uppercase tracking-wider">Degrees</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
            <div className="text-3xl font-bold">{skills?.length || 0}</div>
            <div className="text-xs text-white/70 uppercase tracking-wider">Skills</div>
          </div>
        </div>
      </div>

      {/* Contact Bar */}
      <div className="bg-white px-10 py-4 flex flex-wrap gap-6 text-sm shadow-md">
        {personalInfo.email && <span className="flex items-center gap-2 text-gray-600"><Mail size={16} /> {personalInfo.email}</span>}
        {personalInfo.phone && <span className="flex items-center gap-2 text-gray-600"><Phone size={16} /> {personalInfo.phone}</span>}
        {personalInfo.location && <span className="flex items-center gap-2 text-gray-600"><MapPin size={16} /> {personalInfo.location}</span>}
        {personalInfo.linkedin && <span className="flex items-center gap-2 text-gray-600"><Link2 size={16} /> {personalInfo.linkedin}</span>}
      </div>

      <div className="px-10 py-8">
        {/* Skills with Visual Bars */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg flex items-center justify-center text-white text-xs">⚡</span>
            Skills
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {skills?.slice(0, 6).map((skill, index) => (
              <div key={skill.id} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold text-gray-700">{skill.name}</span>
                  <span className="text-gray-500">{skill.level}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full"
                    style={{ 
                      width: skill.level === 'Expert' ? '100%' : skill.level === 'Advanced' ? '75%' : '50%',
                      background: `linear-gradient(90deg, hsl(${index * 60}, 70%, 60%), hsl(${index * 60 + 30}, 70%, 60%))`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        {experiences.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-white text-xs">💼</span>
              Experience
            </h2>
            {experiences.map((exp) => (
              <div key={exp.id} className="mb-4 bg-white rounded-xl p-5 shadow-sm border-l-4 border-violet-500">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="font-bold text-gray-900">{exp.position}</h3>
                  <span className="text-gray-400 text-xs">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p className="text-violet-600 font-semibold text-sm mb-2">{exp.company}</p>
                <p className="text-gray-600 text-sm">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center text-white text-xs">🎓</span>
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-4 bg-white rounded-xl p-5 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl"></span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                  <p className="text-gray-600 text-sm">{edu.school}</p>
                  <p className="text-gray-500 text-xs mt-1">{edu.graduationDate}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
