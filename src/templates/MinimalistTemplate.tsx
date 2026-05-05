import { ResumeData } from '../types/resume';

export default function MinimalistTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experiences, education, skills } = data;

  return (
    <div className="min-h-[1100px] bg-white px-16 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-light text-gray-900 mb-3 tracking-wide">{personalInfo.fullName}</h1>
        <p className="text-gray-500 text-sm tracking-widest uppercase">{personalInfo.title}</p>
        <div className="flex justify-center gap-6 mt-4 text-xs text-gray-400">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </div>

      {/* Divider */}
      <div className="w-16 h-px bg-gray-200 mx-auto mb-12" />

      {/* Experience */}
      {experiences.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">Experience</h2>
          {experiences.map((exp) => (
            <div key={exp.id} className="mb-8 last:mb-0">
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="font-medium text-gray-900">{exp.position}</h3>
                <span className="text-xs text-gray-400">{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <p className="text-sm text-gray-500 mb-2">{exp.company}</p>
              <p className="text-sm text-gray-600 leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-6 last:mb-0">
              <div className="flex justify-between items-baseline">
                <h3 className="font-medium text-gray-900">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                <span className="text-xs text-gray-400">{edu.graduationDate}</span>
              </div>
              <p className="text-sm text-gray-500">{edu.school}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill.id} className="text-xs text-gray-600 border border-gray-200 px-3 py-1">
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
