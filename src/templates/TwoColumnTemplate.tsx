import { ResumeData } from '../types/resume';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function TwoColumnTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experiences, education, skills } = data;

  return (
    <div className="min-h-[1100px] flex bg-white">
      {/* Left Column - Narrow */}
      <div className="w-[30%] bg-slate-800 text-white p-6">
        {/* Profile Initial */}
        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6">
          {personalInfo.fullName.charAt(0)}
        </div>

        {/* Contact */}
        <div className="space-y-4 text-xs mb-8">
          {personalInfo.email && (
            <div className="flex items-start gap-2">
              <Mail size={14} className="mt-0.5 flex-shrink-0" />
              <span className="break-all">{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone size={14} className="flex-shrink-0" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-2">
              <MapPin size={14} className="flex-shrink-0" />
              <span>{personalInfo.location}</span>
            </div>
          )}
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-sm font-bold mb-4 pb-2 border-b border-slate-600 uppercase tracking-wider">Skills</h2>
            <div className="space-y-2">
              {skills.map((skill) => (
                <div key={skill.id} className="text-xs">
                  <div className="flex justify-between mb-1">
                    <span>{skill.name}</span>
                  </div>
                  <div className="h-1.5 bg-slate-600 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-cyan-400 rounded-full"
                      style={{ width: skill.level === 'Expert' ? '100%' : skill.level === 'Advanced' ? '75%' : '50%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education (in sidebar) */}
        {education.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm font-bold mb-4 pb-2 border-b border-slate-600 uppercase tracking-wider">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-4">
                <p className="text-xs font-semibold">{edu.degree}</p>
                <p className="text-xs text-slate-400">{edu.school}</p>
                <p className="text-xs text-slate-500">{edu.graduationDate}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Column - Wide */}
      <div className="w-[70%] p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">{personalInfo.fullName}</h1>
          <p className="text-cyan-600 text-lg">{personalInfo.title}</p>
          {personalInfo.summary && (
            <p className="text-gray-600 text-sm mt-4 leading-relaxed">{personalInfo.summary}</p>
          )}
        </div>

        {/* Experience */}
        {experiences.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b-2 border-cyan-500">Experience</h2>
            {experiences.map((exp) => (
              <div key={exp.id} className="mb-6">
                <h3 className="font-bold text-gray-900">{exp.position}</h3>
                <p className="text-cyan-600 text-sm font-medium">{exp.company}</p>
                <p className="text-gray-400 text-xs mb-2">{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b-2 border-cyan-500">Projects</h2>
            {data.projects.map((project) => (
              <div key={project.id} className="mb-4">
                <h3 className="font-bold text-gray-900">{project.name}</h3>
                <p className="text-gray-600 text-sm">{project.description}</p>
                {project.technologies && <p className="text-cyan-600 text-xs mt-1">{project.technologies}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
