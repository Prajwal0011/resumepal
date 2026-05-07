import { ResumeData } from '../types/resume';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function SidebarTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experiences, education, skills } = data;

  return (
    <div className="min-h-[1100px] flex bg-white">
      {/* Left Sidebar */}
      <div className="w-[35%] bg-gray-900 text-white p-8">
        {/* Profile */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center text-4xl font-bold mx-auto mb-4">
            {personalInfo.fullName.charAt(0)}
          </div>
          <h1 className="text-2xl font-bold">{personalInfo.fullName}</h1>
          <p className="text-gray-400 mt-1">{personalInfo.title}</p>
        </div>

        {/* Contact */}
        <div className="space-y-3 text-sm mb-8">
          {personalInfo.email && (
            <div className="flex items-center gap-2 text-gray-300">
              <Mail size={16} />
              <span className="truncate">{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2 text-gray-300">
              <Phone size={16} />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-2 text-gray-300">
              <MapPin size={16} />
              <span>{personalInfo.location}</span>
            </div>
          )}
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-4 pb-2 border-b border-gray-700">Skills</h2>
            <div className="space-y-3">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between text-xs mb-1">
                    <span>{skill.name}</span>
                    <span className="text-gray-400">{skill.level}</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
                      style={{ width: skill.level === 'Expert' ? '100%' : skill.level === 'Advanced' ? '75%' : '50%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="w-[65%] p-10">
        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b-2 border-gray-900">About</h2>
            <p className="text-gray-600 text-sm leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-900">Experience</h2>
            {experiences.map((exp) => (
              <div key={exp.id} className="mb-6">
                <h3 className="font-bold text-gray-900">{exp.position}</h3>
                <p className="text-gray-600 text-sm">{exp.company}</p>
                <p className="text-gray-400 text-xs mb-2">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                <p className="text-gray-600 text-sm">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-900">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-4">
                <h3 className="font-bold text-gray-900">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                <p className="text-gray-600 text-sm">{edu.school}</p>
                <p className="text-gray-400 text-xs">{edu.graduationDate}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
