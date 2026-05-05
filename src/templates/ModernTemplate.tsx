import { ResumeData } from '../types/resume';
import { Mail, Phone, MapPin, Globe, Link2 } from 'lucide-react';

export default function ModernTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experiences, education, skills, projects, certifications = [] } = data;

  return (
    <div className="flex min-h-[1100px] bg-white">
      {/* Sidebar */}
      <div className="w-[280px] bg-[#1e3a5f] text-white p-8 flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold leading-tight">{personalInfo.fullName}</h1>
          <p className="text-blue-200 text-sm mt-1">{experiences[0]?.position || 'Professional'}</p>
        </div>

        <div className="space-y-3 mb-8 text-sm">
          {personalInfo.email && (
            <div className="flex items-center gap-2">
              <Mail size={14} />
              <span className="text-blue-100">{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone size={14} />
              <span className="text-blue-100">{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-2">
              <MapPin size={14} />
              <span className="text-blue-100">{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-2">
              <Globe size={14} />
              <span className="text-blue-100">{personalInfo.website}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-2">
              <Link2 size={14} />
              <span className="text-blue-100">{personalInfo.linkedin}</span>
            </div>
          )}
        </div>

        {skills.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-bold uppercase tracking-wider border-b border-blue-400 pb-2 mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill.id} className="bg-blue-800 text-blue-100 text-xs px-3 py-1.5 rounded-full">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-bold uppercase tracking-wider border-b border-blue-400 pb-2 mb-4">Education</h3>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <p className="font-semibold text-sm">{edu.degree}</p>
                <p className="text-blue-200 text-xs">{edu.field}</p>
                <p className="text-blue-300 text-xs">{edu.school}</p>
                <p className="text-blue-400 text-xs">{edu.startDate} - {edu.current ? 'Present' : edu.endDate}</p>
              </div>
            ))}
          </div>
        )}

        {certifications.length > 0 && (
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider border-b border-blue-400 pb-2 mb-4">Certifications</h3>
            {certifications.map((cert) => (
              <div key={cert.id} className="mb-2">
                <p className="text-sm font-medium">{cert.name}</p>
                <p className="text-blue-300 text-xs">{cert.issuer} · {cert.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-[#1e3a5f] uppercase tracking-wider border-b-2 border-[#1e3a5f] pb-2 mb-4">Profile</h2>
            <p className="text-gray-700 text-sm leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}

        {experiences.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-[#1e3a5f] uppercase tracking-wider border-b-2 border-[#1e3a5f] pb-2 mb-4">Experience</h2>
            {experiences.map((exp) => (
              <div key={exp.id} className="mb-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">{exp.position}</h3>
                    <p className="text-[#1e3a5f] font-medium text-sm">{exp.company}</p>
                  </div>
                  <span className="text-gray-500 text-xs whitespace-nowrap">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {projects.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-[#1e3a5f] uppercase tracking-wider border-b-2 border-[#1e3a5f] pb-2 mb-4">Projects</h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-4">
                <h3 className="font-bold text-gray-900">{proj.name}</h3>
                <p className="text-gray-600 text-sm mt-1 leading-relaxed">{proj.description}</p>
                {proj.link && <p className="text-[#1e3a5f] text-xs mt-1">{proj.link}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
