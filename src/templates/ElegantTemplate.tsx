import { ResumeData } from '../types/resume';

export default function ElegantTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experiences, education, skills, projects, certifications = [] } = data;

  return (
    <div className="min-h-[1100px] bg-[#faf9f6] p-10 max-w-[800px] mx-auto">
      {/* Header */}
      <div className="text-center mb-8 pb-6 border-b border-[#5d4e37]">
        <h1 className="text-4xl font-serif text-[#5d4e37] tracking-wide">{personalInfo.fullName}</h1>
        <div className="w-12 h-0.5 bg-[#5d4e37] mx-auto my-3" />
        <p className="text-[#8b7355] text-sm font-serif">
          {personalInfo.email} {personalInfo.phone && `| ${personalInfo.phone}`} {personalInfo.location && `| ${personalInfo.location}`}
        </p>
        <p className="text-[#8b7355] text-xs mt-1">
          {personalInfo.website} {personalInfo.linkedin && `| ${personalInfo.linkedin}`}
        </p>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-8 text-center">
          <p className="text-gray-600 text-sm font-serif leading-relaxed italic">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <div className="mb-8">
          <h2 className="text-center">
            <span className="text-xs font-serif uppercase tracking-[0.3em] text-[#5d4e37]">Experience</span>
          </h2>
          <div className="w-16 h-px bg-[#5d4e37] mx-auto my-3" />
          {experiences.map((exp) => (
            <div key={exp.id} className="mb-6">
              <div className="flex justify-between items-baseline">
                <h3 className="font-serif font-bold text-[#5d4e37] text-sm">{exp.position}</h3>
                <span className="text-[#8b7355] text-xs font-serif italic">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <p className="text-[#8b7355] font-serif text-sm italic">{exp.company}</p>
              <p className="text-gray-600 text-sm mt-2 font-serif leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-center">
            <span className="text-xs font-serif uppercase tracking-[0.3em] text-[#5d4e37]">Education</span>
          </h2>
          <div className="w-16 h-px bg-[#5d4e37] mx-auto my-3" />
          {education.map((edu) => (
            <div key={edu.id} className="mb-4 text-center">
              <p className="font-serif font-bold text-sm text-[#5d4e37]">{edu.school}</p>
              <p className="text-[#8b7355] font-serif text-sm">{edu.degree} in {edu.field}</p>
              <p className="text-[#8b7355] text-xs font-serif italic">{edu.startDate} - {edu.current ? 'Present' : edu.endDate}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-center">
            <span className="text-xs font-serif uppercase tracking-[0.3em] text-[#5d4e37]">Skills</span>
          </h2>
          <div className="w-16 h-px bg-[#5d4e37] mx-auto my-3" />
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill) => (
              <span key={skill.id} className="text-[#5d4e37] font-serif text-sm border-b border-[#5d4e37] pb-0.5">
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-center">
            <span className="text-xs font-serif uppercase tracking-[0.3em] text-[#5d4e37]">Projects</span>
          </h2>
          <div className="w-16 h-px bg-[#5d4e37] mx-auto my-3" />
          {projects.map((proj) => (
            <div key={proj.id} className="mb-4">
              <h3 className="font-serif font-bold text-sm text-[#5d4e37]">{proj.name}</h3>
              <p className="text-gray-600 text-sm font-serif mt-1">{proj.description}</p>
              {proj.link && <p className="text-[#8b7355] text-xs font-serif italic mt-1">{proj.link}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div>
          <h2 className="text-center">
            <span className="text-xs font-serif uppercase tracking-[0.3em] text-[#5d4e37]">Certifications</span>
          </h2>
          <div className="w-16 h-px bg-[#5d4e37] mx-auto my-3" />
          {certifications.map((cert) => (
            <div key={cert.id} className="mb-2 text-center">
              <p className="font-serif text-sm text-[#5d4e37]">{cert.name}</p>
              <p className="text-[#8b7355] text-xs font-serif italic">{cert.issuer} · {cert.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
