import { ResumeData } from '../types/resume';
import { Mail, Phone, MapPin, Globe, Link2 } from 'lucide-react';

export default function BoldTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experiences, education, skills, projects, certifications = [] } = data;

  return (
    <div className="min-h-[1100px] bg-white">
      {/* Bold Header */}
      <div className="bg-[#c0392b] text-white px-10 py-10">
        <h1 className="text-5xl font-black tracking-tighter uppercase">{personalInfo.fullName}</h1>
        <div className="w-20 h-1 bg-white mt-3 mb-4" />
        <p className="text-red-100 text-sm font-medium">{experiences[0]?.position || 'Professional'}</p>
      </div>

      {/* Contact Bar */}
      <div className="bg-gray-900 text-white px-10 py-3 flex flex-wrap gap-6 text-xs">
        {personalInfo.email && <span className="flex items-center gap-1.5"><Mail size={12} /> {personalInfo.email}</span>}
        {personalInfo.phone && <span className="flex items-center gap-1.5"><Phone size={12} /> {personalInfo.phone}</span>}
        {personalInfo.location && <span className="flex items-center gap-1.5"><MapPin size={12} /> {personalInfo.location}</span>}
        {personalInfo.website && <span className="flex items-center gap-1.5"><Globe size={12} /> {personalInfo.website}</span>}
        {personalInfo.linkedin && <span className="flex items-center gap-1.5"><Link2 size={12} /> {personalInfo.linkedin}</span>}
      </div>

      <div className="px-10 py-8">
        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-2xl font-black text-[#c0392b] uppercase tracking-tight mb-3">Profile</h2>
            <p className="text-gray-700 text-sm leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-black text-[#c0392b] uppercase tracking-tight mb-4">Experience</h2>
            {experiences.map((exp) => (
              <div key={exp.id} className="mb-6 border-l-4 border-[#c0392b] pl-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-black text-gray-900 text-base">{exp.position}</h3>
                  <span className="text-gray-400 text-xs font-bold">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p className="text-[#c0392b] font-bold text-sm">{exp.company}</p>
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            {education.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-black text-[#c0392b] uppercase tracking-tight mb-3">Education</h2>
                {education.map((edu) => (
                  <div key={edu.id} className="mb-3">
                    <p className="font-black text-gray-900 text-sm">{edu.school}</p>
                    <p className="text-gray-700 text-sm">{edu.degree}, {edu.field}</p>
                    <p className="text-gray-400 text-xs font-bold">{edu.startDate} - {edu.current ? 'Present' : edu.endDate}</p>
                  </div>
                ))}
              </div>
            )}

            {certifications.length > 0 && (
              <div>
                <h2 className="text-xl font-black text-[#c0392b] uppercase tracking-tight mb-3">Certifications</h2>
                {certifications.map((cert) => (
                  <div key={cert.id} className="mb-2">
                    <p className="text-sm font-black text-gray-900">{cert.name}</p>
                    <p className="text-gray-500 text-xs">{cert.issuer} · {cert.date}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            {skills.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-black text-[#c0392b] uppercase tracking-tight mb-3">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span key={skill.id} className="bg-gray-900 text-white text-xs font-bold px-3 py-1.5 uppercase tracking-wide">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {projects.length > 0 && (
              <div>
                <h2 className="text-xl font-black text-[#c0392b] uppercase tracking-tight mb-3">Projects</h2>
                {projects.map((proj) => (
                  <div key={proj.id} className="mb-3">
                    <h3 className="font-black text-gray-900 text-sm">{proj.name}</h3>
                    <p className="text-gray-600 text-xs mt-1">{proj.description}</p>
                    {proj.link && <p className="text-[#c0392b] text-xs font-bold mt-1">{proj.link}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
