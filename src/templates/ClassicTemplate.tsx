import { ResumeData } from '../types/resume';
import { Mail, Phone, MapPin, Globe, Link2 } from 'lucide-react';

export default function ClassicTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experiences, education, skills, projects, certifications = [] } = data;

  return (
    <div className="min-h-[1100px] bg-white p-10 max-w-[800px] mx-auto">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-800 pb-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 tracking-wide uppercase">{personalInfo.fullName}</h1>
        <div className="flex flex-wrap justify-center gap-4 mt-3 text-sm text-gray-600">
          {personalInfo.email && <span className="flex items-center gap-1"><Mail size={13} /> {personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1"><Phone size={13} /> {personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-1"><MapPin size={13} /> {personalInfo.location}</span>}
          {personalInfo.website && <span className="flex items-center gap-1"><Globe size={13} /> {personalInfo.website}</span>}
          {personalInfo.linkedin && <span className="flex items-center gap-1"><Link2 size={13} /> {personalInfo.linkedin}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-1 mb-3">Professional Summary</h2>
          <p className="text-gray-700 text-sm leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-1 mb-3">Work Experience</h2>
          {experiences.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-gray-900">{exp.position}</h3>
                <span className="text-gray-500 text-xs">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <p className="text-gray-700 text-sm italic">{exp.company}</p>
              <p className="text-gray-600 text-sm mt-1 leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-1 mb-3">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-gray-900">{edu.school}</h3>
                <span className="text-gray-500 text-xs">{edu.startDate} - {edu.current ? 'Present' : edu.endDate}</span>
              </div>
              <p className="text-gray-700 text-sm">{edu.degree} in {edu.field}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-1 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            {skills.map((skill) => (
              <span key={skill.id} className="text-gray-700 text-sm">{skill.name}</span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-1 mb-3">Projects</h2>
          {projects.map((proj) => (
            <div key={proj.id} className="mb-3">
              <h3 className="font-bold text-gray-900 text-sm">{proj.name}</h3>
              <p className="text-gray-600 text-sm">{proj.description}</p>
              {proj.link && <p className="text-gray-500 text-xs mt-0.5">{proj.link}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-1 mb-3">Certifications</h2>
          {certifications.map((cert) => (
            <div key={cert.id} className="mb-2">
              <p className="text-gray-800 text-sm font-medium">{cert.name}</p>
              <p className="text-gray-500 text-xs">{cert.issuer} · {cert.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
