import { ResumeData } from '../types/resume';
import { Mail, Phone, MapPin, Globe, Link2 } from 'lucide-react';

export default function CreativeTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experiences, education, skills, projects, certifications = [] } = data;

  return (
    <div className="flex min-h-[1100px] bg-white">
      {/* Left Sidebar */}
      <div className="w-[260px] bg-[#6c3483] text-white p-7">
        <div className="w-24 h-24 rounded-full bg-white/20 mx-auto mb-5 flex items-center justify-center text-3xl font-bold">
          {personalInfo.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
        </div>
        <h1 className="text-xl font-bold text-center mb-1">{personalInfo.fullName}</h1>
        <p className="text-purple-200 text-center text-sm mb-6">{experiences[0]?.position || 'Professional'}</p>

        <div className="space-y-2.5 mb-8 text-xs">
          {personalInfo.email && (
            <div className="flex items-center gap-2"><Mail size={12} /><span className="text-purple-100">{personalInfo.email}</span></div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2"><Phone size={12} /><span className="text-purple-100">{personalInfo.phone}</span></div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-2"><MapPin size={12} /><span className="text-purple-100">{personalInfo.location}</span></div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-2"><Globe size={12} /><span className="text-purple-100">{personalInfo.website}</span></div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-2"><Link2 size={12} /><span className="text-purple-100">{personalInfo.linkedin}</span></div>
          )}
        </div>

        {skills.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-wider border-b border-purple-400 pb-2 mb-3">Skills</h3>
            {skills.map((skill) => (
              <div key={skill.id} className="mb-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>{skill.name}</span>
                </div>
                <div className="h-1.5 bg-purple-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white/80 rounded-full"
                    style={{
                      width: skill.level === 'Beginner' ? '25%' : skill.level === 'Intermediate' ? '50%' : skill.level === 'Advanced' ? '75%' : '100%'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider border-b border-purple-400 pb-2 mb-3">Education</h3>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <p className="font-semibold text-xs">{edu.degree}</p>
                <p className="text-purple-200 text-xs">{edu.field}</p>
                <p className="text-purple-300 text-xs">{edu.school}</p>
                <p className="text-purple-400 text-xs">{edu.startDate} - {edu.current ? 'Present' : edu.endDate}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-base font-bold text-[#6c3483] uppercase tracking-wider border-b-2 border-[#6c3483] pb-2 mb-4">About Me</h2>
            <p className="text-gray-700 text-sm leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}

        {experiences.length > 0 && (
          <div className="mb-8">
            <h2 className="text-base font-bold text-[#6c3483] uppercase tracking-wider border-b-2 border-[#6c3483] pb-2 mb-4">Experience</h2>
            {experiences.map((exp) => (
              <div key={exp.id} className="mb-5 relative pl-5 border-l-2 border-purple-200">
                <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-[#6c3483]" />
                <h3 className="font-bold text-gray-900 text-sm">{exp.position}</h3>
                <p className="text-[#6c3483] font-medium text-xs">{exp.company}</p>
                <p className="text-gray-400 text-xs mb-1">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {projects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-base font-bold text-[#6c3483] uppercase tracking-wider border-b-2 border-[#6c3483] pb-2 mb-4">Projects</h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-4">
                <h3 className="font-bold text-gray-900 text-sm">{proj.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{proj.description}</p>
                {proj.link && <p className="text-[#6c3483] text-xs mt-1">{proj.link}</p>}
              </div>
            ))}
          </div>
        )}

        {certifications.length > 0 && (
          <div>
            <h2 className="text-base font-bold text-[#6c3483] uppercase tracking-wider border-b-2 border-[#6c3483] pb-2 mb-4">Certifications</h2>
            {certifications.map((cert) => (
              <div key={cert.id} className="mb-2">
                <p className="text-sm font-medium text-gray-900">{cert.name}</p>
                <p className="text-gray-500 text-xs">{cert.issuer} · {cert.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
