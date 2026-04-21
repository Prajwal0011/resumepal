import { ResumeData } from '../types/resume';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function TimelineTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experiences, education, skills } = data;

  return (
    <div className="min-h-[1100px] bg-white">
      {/* Header */}
      <div className="bg-gray-900 text-white px-10 py-12 text-center">
        <h1 className="text-4xl font-bold mb-2">{personalInfo.fullName}</h1>
        <p className="text-gray-400 text-lg">{personalInfo.title}</p>
        <div className="flex justify-center gap-6 mt-4 text-sm text-gray-400">
          {personalInfo.email && <span className="flex items-center gap-1"><Mail size={14} /> {personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1"><Phone size={14} /> {personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-1"><MapPin size={14} /> {personalInfo.location}</span>}
        </div>
      </div>

      <div className="px-10 py-8">
        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-violet-500 via-purple-500 to-pink-500 h-full" />

          {/* Experience Items */}
          {experiences.map((exp, index) => (
            <div key={exp.id} className={`relative mb-8 flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className={`w-1/2 ${index % 2 === 0 ? 'pr-10 text-right' : 'pl-10 text-left'}`}>
                <div className="bg-white border-2 border-violet-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <span className="inline-block bg-violet-100 text-violet-700 text-xs font-bold px-3 py-1 rounded-full mb-2">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                  <h3 className="font-bold text-lg text-gray-900">{exp.position}</h3>
                  <p className="text-violet-600 font-semibold">{exp.company}</p>
                  <p className="text-gray-600 text-sm mt-2">{exp.description}</p>
                </div>
              </div>
              {/* Timeline Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-violet-500 rounded-full border-4 border-white shadow-lg" />
              <div className="w-1/2" />
            </div>
          ))}

          {/* Education Items */}
          {education.map((edu, index) => (
            <div key={edu.id} className={`relative mb-8 flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className={`w-1/2 ${index % 2 === 0 ? 'pr-10 text-right' : 'pl-10 text-left'}`}>
                <div className="bg-white border-2 border-amber-200 rounded-xl p-5 shadow-sm">
                  <span className="inline-block bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full mb-2">
                    {edu.graduationDate}
                  </span>
                  <h3 className="font-bold text-lg text-gray-900">{edu.degree}</h3>
                  <p className="text-amber-600 font-semibold">{edu.school}</p>
                  {edu.field && <p className="text-gray-600 text-sm mt-1">{edu.field}</p>}
                </div>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-amber-500 rounded-full border-4 border-white shadow-lg" />
              <div className="w-1/2" />
            </div>
          ))}
        </div>

        {/* Skills Section */}
        {skills.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Skills</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((skill) => (
                <span key={skill.id} className="bg-gradient-to-r from-violet-500 to-purple-500 text-white px-5 py-2 rounded-full font-semibold text-sm shadow-md">
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
