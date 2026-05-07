import { ResumeData } from '../types/resume';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function GraphicTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experiences, education, skills } = data;

  return (
    <div className="min-h-[1100px] bg-white">
      {/* Geometric Header */}
      <div className="relative bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 text-white px-10 py-12 overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-6">
            <div className="w-28 h-28 bg-white rounded-2xl flex items-center justify-center text-5xl font-bold text-emerald-600 shadow-xl">
              {personalInfo.fullName.charAt(0)}
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-1">{personalInfo.fullName}</h1>
              <p className="text-emerald-100 text-lg">{personalInfo.title}</p>
            </div>
          </div>
          
          {/* Contact Pills */}
          <div className="flex flex-wrap gap-3 mt-6">
            {personalInfo.email && (
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm flex items-center gap-2">
                <Mail size={14} /> {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm flex items-center gap-2">
                <Phone size={14} /> {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm flex items-center gap-2">
                <MapPin size={14} /> {personalInfo.location}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="px-10 py-8">
        {/* Skills - Visual Grid */}
        {skills.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-5">Skills</h2>
            <div className="grid grid-cols-4 gap-3">
              {skills.map((skill, index) => (
                <div 
                  key={skill.id} 
                  className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 text-center border border-emerald-100 hover:shadow-md transition-shadow"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2">
                    {skill.name.charAt(0)}
                  </div>
                  <p className="font-semibold text-sm text-gray-800">{skill.name}</p>
                  <p className="text-xs text-emerald-600 mt-1">{skill.level}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience - Card Style */}
        {experiences.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-5">Experience</h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-emerald-500">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-xl text-gray-900">{exp.position}</h3>
                      <p className="text-emerald-600 font-semibold">{exp.company}</p>
                    </div>
                    <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                      {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education - Timeline Style */}
        {education.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-5">Education</h2>
            <div className="relative pl-8 border-l-2 border-emerald-200 space-y-6">
              {education.map((edu) => (
                <div key={edu.id} className="relative">
                  <div className="absolute -left-[41px] w-5 h-5 bg-emerald-500 rounded-full border-4 border-white shadow" />
                  <div className="bg-gradient-to-r from-emerald-50 to-white rounded-xl p-5 border border-emerald-100">
                    <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                    {edu.field && <p className="text-emerald-600 text-sm">{edu.field}</p>}
                    <p className="text-gray-600 text-sm mt-1">{edu.school}</p>
                    <p className="text-gray-400 text-xs mt-2">{edu.graduationDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Summary */}
        {personalInfo.summary && (
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-3">About Me</h2>
            <p className="text-emerald-50 text-sm leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}
