import { ResumeData } from '../types/resume';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function CardsTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experiences, education, skills } = data;

  return (
    <div className="min-h-[1100px] bg-gray-50">
      {/* Header Card */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-10 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">{personalInfo.fullName}</h1>
          <p className="text-blue-100 text-lg mb-4">{personalInfo.title}</p>
          <div className="flex flex-wrap gap-4 text-sm">
            {personalInfo.email && <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full"><Mail size={14} /> {personalInfo.email}</span>}
            {personalInfo.phone && <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full"><Phone size={14} /> {personalInfo.phone}</span>}
            {personalInfo.location && <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full"><MapPin size={14} /> {personalInfo.location}</span>}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-10 py-8">
        {/* Experience Cards */}
        {experiences.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Experience</h2>
            <div className="grid gap-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-xl text-gray-900">{exp.position}</h3>
                      <p className="text-blue-600 font-semibold">{exp.company}</p>
                    </div>
                    <span className="text-gray-400 text-sm bg-gray-100 px-3 py-1 rounded-full">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p className="text-gray-600">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education Cards */}
        {education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Education</h2>
            <div className="grid gap-4">
              {education.map((edu) => (
                <div key={edu.id} className="bg-white rounded-2xl p-6 shadow-md">
                  <h3 className="font-bold text-xl text-gray-900">{edu.degree}</h3>
                  <p className="text-blue-600 font-semibold">{edu.school}</p>
                  {edu.field && <p className="text-gray-600 text-sm mt-1">{edu.field}</p>}
                  <p className="text-gray-400 text-sm mt-2">{edu.graduationDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Pills */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill.id} className="bg-white border-2 border-blue-200 text-blue-700 px-4 py-2 rounded-full font-medium text-sm hover:bg-blue-50 transition-colors">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
