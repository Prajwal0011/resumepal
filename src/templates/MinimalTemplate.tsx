import { ResumeData } from '../types/resume';

export default function MinimalTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experiences, education, skills, projects, certifications = [] } = data;

  return (
    <div className="min-h-[1100px] bg-white p-12 max-w-[700px] mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-light text-gray-900 tracking-tight">{personalInfo.fullName}</h1>
        <p className="text-gray-400 text-sm mt-2 tracking-wide">
          {personalInfo.email} {personalInfo.phone && `· ${personalInfo.phone}`} {personalInfo.location && `· ${personalInfo.location}`}
          {personalInfo.website && ` · ${personalInfo.website}`}
        </p>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-8">
          <p className="text-gray-600 text-sm leading-loose">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400 mb-5">Experience</h2>
          {experiences.map((exp) => (
            <div key={exp.id} className="mb-6">
              <div className="flex justify-between items-baseline">
                <h3 className="font-medium text-gray-900 text-sm">{exp.position}</h3>
                <span className="text-gray-400 text-xs">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <p className="text-gray-500 text-sm">{exp.company}</p>
              <p className="text-gray-600 text-sm mt-2 leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400 mb-5">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-medium text-gray-900 text-sm">{edu.school}</h3>
                <span className="text-gray-400 text-xs">{edu.startDate} - {edu.current ? 'Present' : edu.endDate}</span>
              </div>
              <p className="text-gray-500 text-sm">{edu.degree} in {edu.field}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400 mb-5">Skills</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            {skills.map((s) => s.name).join(' · ')}
          </p>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400 mb-5">Projects</h2>
          {projects.map((proj) => (
            <div key={proj.id} className="mb-4">
              <h3 className="font-medium text-gray-900 text-sm">{proj.name}</h3>
              <p className="text-gray-600 text-sm mt-1">{proj.description}</p>
              {proj.link && <p className="text-gray-400 text-xs mt-1">{proj.link}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div>
          <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400 mb-5">Certifications</h2>
          {certifications.map((cert) => (
            <div key={cert.id} className="mb-3">
              <p className="text-gray-800 text-sm font-medium">{cert.name}</p>
              <p className="text-gray-400 text-xs">{cert.issuer} · {cert.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
