import { ResumeData } from '../types/resume';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function PortfolioTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experiences, education, skills, projects } = data;

  return (
    <div className="min-h-[1100px] bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Hero Section */}
      <div className="px-10 py-16 text-center">
        <div className="w-32 h-32 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full flex items-center justify-center text-5xl font-bold mx-auto mb-6 shadow-2xl">
          {personalInfo.fullName.charAt(0)}
        </div>
        <h1 className="text-5xl font-bold mb-3">{personalInfo.fullName}</h1>
        <p className="text-xl text-gray-400 mb-6">{personalInfo.title}</p>
        
        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-8">
          {personalInfo.email && (
            <a href={`mailto:${personalInfo.email}`} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-violet-500 transition-colors">
              <Mail size={18} />
            </a>
          )}
          {personalInfo.phone && (
            <a href={`tel:${personalInfo.phone}`} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-violet-500 transition-colors">
              <Phone size={18} />
            </a>
          )}
          {personalInfo.linkedin && (
            <a href={`https://${personalInfo.linkedin}`} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-violet-500 transition-colors text-xs font-bold">
              in
            </a>
          )}
          {personalInfo.github && (
            <a href={`https://${personalInfo.github}`} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-violet-500 transition-colors text-xs font-bold">
              gh
            </a>
          )}
        </div>

        {personalInfo.location && (
          <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
            <MapPin size={14} /> {personalInfo.location}
          </p>
        )}
      </div>

      {/* Content */}
      <div className="px-10 pb-10">
        {/* Skills Grid */}
        {skills.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-6">Skills</h2>
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              {skills.map((skill) => (
                <div key={skill.id} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10 hover:border-violet-500 transition-colors">
                  <p className="font-semibold">{skill.name}</p>
                  <p className="text-xs text-gray-400 mt-1">{skill.level}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Experience</h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-lg">{exp.position}</h3>
                      <p className="text-violet-400">{exp.company}</p>
                    </div>
                    <span className="text-xs text-gray-400 bg-white/10 px-3 py-1 rounded-full">
                      {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Projects</h2>
            <div className="grid grid-cols-2 gap-4">
              {projects.map((project) => (
                <div key={project.id} className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                  <h3 className="font-bold mb-2">{project.name}</h3>
                  <p className="text-gray-300 text-sm mb-3">{project.description}</p>
                  {project.technologies && (
                    <p className="text-xs text-violet-400">{project.technologies}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="font-bold">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                <p className="text-gray-400 text-sm">{edu.school}</p>
                <p className="text-gray-500 text-xs mt-2">{edu.graduationDate}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
