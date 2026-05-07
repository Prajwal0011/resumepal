import { ResumeData } from '../types/resume';
import { Mail, Phone, MapPin, Globe, Link2 } from 'lucide-react';

export default function ExecutiveTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experiences, education, skills, projects, certifications = [] } = data;

  return (
    <div className="min-h-[1100px] bg-white">
      {/* Header */}
      <div className="bg-[#1a5276] text-white px-10 py-8">
        <h1 className="text-3xl font-bold tracking-wide">{personalInfo.fullName}</h1>
        <p className="text-blue-200 text-sm mt-1">{experiences[0]?.position || 'Senior Professional'}</p>
        <div className="flex flex-wrap gap-4 mt-4 text-xs text-blue-100">
          {personalInfo.email && <span className="flex items-center gap-1"><Mail size={12} /> {personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1"><Phone size={12} /> {personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-1"><MapPin size={12} /> {personalInfo.location}</span>}
          {personalInfo.website && <span className="flex items-center gap-1"><Globe size={12} /> {personalInfo.website}</span>}
          {personalInfo.linkedin && <span className="flex items-center gap-1"><Link2 size={12} /> {personalInfo.linkedin}</span>}
        </div>
      </div>

      <div className="px-10 py-8">
        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#1a5276] border-b-2 border-[#1a5276] pb-2 mb-4">Executive Summary</h2>
            <p className="text-gray-700 text-sm leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#1a5276] border-b-2 border-[#1a5276] pb-2 mb-4">Professional Experience</h2>
            {experiences.map((exp) => (
              <div key={exp.id} className="mb-6">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-gray-900">{exp.position}</h3>
                  <span className="text-gray-500 text-xs font-medium">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p className="text-[#1a5276] font-semibold text-sm">{exp.company}</p>
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Two Column */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            {education.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-bold uppercase tracking-widest text-[#1a5276] border-b-2 border-[#1a5276] pb-2 mb-4">Education</h2>
                {education.map((edu) => (
                  <div key={edu.id} className="mb-3">
                    <p className="font-bold text-gray-900 text-sm">{edu.school}</p>
                    <p className="text-gray-700 text-sm">{edu.degree}, {edu.field}</p>
                    <p className="text-gray-500 text-xs">{edu.startDate} - {edu.current ? 'Present' : edu.endDate}</p>
                  </div>
                ))}
              </div>
            )}

            {certifications.length > 0 && (
              <div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-[#1a5276] border-b-2 border-[#1a5276] pb-2 mb-4">Certifications</h2>
                {certifications.map((cert) => (
                  <div key={cert.id} className="mb-2">
                    <p className="text-sm font-medium text-gray-900">{cert.name}</p>
                    <p className="text-gray-500 text-xs">{cert.issuer} · {cert.date}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            {skills.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-bold uppercase tracking-widest text-[#1a5276] border-b-2 border-[#1a5276] pb-2 mb-4">Core Competencies</h2>
                <div className="space-y-2">
                  {skills.map((skill) => (
                    <div key={skill.id} className="flex items-center gap-3">
                      <span className="text-sm text-gray-700 w-24">{skill.name}</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#1a5276] rounded-full"
                          style={{
                            width: skill.level === 'Beginner' ? '25%' : skill.level === 'Intermediate' ? '50%' : skill.level === 'Advanced' ? '75%' : '100%'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {projects.length > 0 && (
              <div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-[#1a5276] border-b-2 border-[#1a5276] pb-2 mb-4">Key Projects</h2>
                {projects.map((proj) => (
                  <div key={proj.id} className="mb-3">
                    <h3 className="font-bold text-gray-900 text-sm">{proj.name}</h3>
                    <p className="text-gray-600 text-xs mt-1">{proj.description}</p>
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
