import { ResumeData } from '../types/resume';
import { Mail, Phone, MapPin, Globe, Link2, Code2, Cpu, Database, Cloud, Terminal, Layers, Shield } from 'lucide-react';

const skillIcons = [Code2, Cpu, Database, Cloud, Terminal, Layers, Shield, Code2, Cpu, Database, Cloud];

export default function TechTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experiences, education, skills, projects, certifications = [] } = data;

  return (
    <div className="min-h-[1100px] bg-[#0a1628] text-gray-100">
      {/* Header */}
      <div className="bg-[#0e4d64] px-10 py-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">{personalInfo.fullName}</h1>
        <p className="text-cyan-300 text-sm mt-1 font-mono">{experiences[0]?.position || 'Software Engineer'}</p>
        <div className="flex flex-wrap gap-4 mt-4 text-xs text-cyan-200">
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
            <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3">{'>'} about</h2>
            <p className="text-gray-300 text-sm leading-relaxed border-l-2 border-cyan-600 pl-4">{personalInfo.summary}</p>
          </div>
        )}

        {/* Skills Grid */}
        {skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-4">{'>'} tech_stack</h2>
            <div className="grid grid-cols-2 gap-3">
              {skills.map((skill, i) => {
                const Icon = skillIcons[i % skillIcons.length];
                return (
                  <div key={skill.id} className="flex items-center gap-3 bg-[#111d35] p-3 rounded border border-[#1a2d4a]">
                    <Icon size={16} className="text-cyan-400" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-200">{skill.name}</p>
                      <div className="h-1 bg-[#1a2d4a] rounded-full mt-1 overflow-hidden">
                        <div
                          className="h-full bg-cyan-500 rounded-full"
                          style={{
                            width: skill.level === 'Beginner' ? '25%' : skill.level === 'Intermediate' ? '50%' : skill.level === 'Advanced' ? '75%' : '100%'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-4">{'>'} experience</h2>
            {experiences.map((exp) => (
              <div key={exp.id} className="mb-5 bg-[#111d35] p-4 rounded border border-[#1a2d4a]">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-white text-sm">{exp.position}</h3>
                    <p className="text-cyan-300 text-xs font-mono">{exp.company}</p>
                  </div>
                  <span className="text-gray-500 text-xs font-mono">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p className="text-gray-400 text-sm mt-2 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Two column for education and projects */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            {education.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3">{'>'} education</h2>
                {education.map((edu) => (
                  <div key={edu.id} className="bg-[#111d35] p-3 rounded border border-[#1a2d4a] mb-2">
                    <p className="font-bold text-white text-sm">{edu.school}</p>
                    <p className="text-cyan-300 text-xs font-mono">{edu.degree} in {edu.field}</p>
                    <p className="text-gray-500 text-xs font-mono">{edu.startDate} - {edu.current ? 'Present' : edu.endDate}</p>
                  </div>
                ))}
              </div>
            )}

            {certifications.length > 0 && (
              <div>
                <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3">{'>'} certs</h2>
                {certifications.map((cert) => (
                  <div key={cert.id} className="bg-[#111d35] p-3 rounded border border-[#1a2d4a] mb-2">
                    <p className="text-sm text-white">{cert.name}</p>
                    <p className="text-gray-500 text-xs font-mono">{cert.issuer} · {cert.date}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            {projects.length > 0 && (
              <div>
                <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3">{'>'} projects</h2>
                {projects.map((proj) => (
                  <div key={proj.id} className="bg-[#111d35] p-3 rounded border border-[#1a2d4a] mb-2">
                    <h3 className="font-bold text-white text-sm">{proj.name}</h3>
                    <p className="text-gray-400 text-xs mt-1">{proj.description}</p>
                    {proj.link && <p className="text-cyan-400 text-xs font-mono mt-1">{proj.link}</p>}
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
