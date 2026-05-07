export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  summary?: string;
  title?: string;
  github?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  graduationDate: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link: string;
}

export interface Skill {
  id: string;
  name: string;
  level: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  color: string;
  category: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
}

// Empty default - users start fresh
export const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    title: '',
    summary: '',
  },
  experiences: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
};

// Demo data for preview when fields are empty
export const demoResumeData: ResumeData = {
  personalInfo: {
    fullName: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    website: 'johndoe.com',
    linkedin: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe',
    title: 'Senior Software Engineer',
    summary: 'Results-driven professional with 5+ years of experience in software development. Passionate about creating innovative solutions that drive business growth and improve user experiences.',
  },
  experiences: [
    {
      id: '1',
      company: 'Tech Solutions Inc.',
      position: 'Senior Software Engineer',
      startDate: '2021-03',
      endDate: '',
      current: true,
      description: 'Led a team of 5 developers in building scalable web applications. Improved system performance by 40% through code optimization.',
    },
    {
      id: '2',
      company: 'Digital Innovations LLC',
      position: 'Software Developer',
      startDate: '2018-06',
      endDate: '2021-02',
      current: false,
      description: 'Developed client-facing web applications using React and Node.js. Collaborated with cross-functional teams.',
    },
  ],
  education: [
    {
      id: '1',
      school: 'University of Technology',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2014-09',
      endDate: '2018-05',
      current: false,
      graduationDate: '2018-05',
    },
  ],
  skills: [
    { id: '1', name: 'React', level: 'Expert' },
    { id: '2', name: 'TypeScript', level: 'Advanced' },
    { id: '3', name: 'Node.js', level: 'Advanced' },
    { id: '4', name: 'Python', level: 'Intermediate' },
    { id: '5', name: 'AWS', level: 'Intermediate' },
    { id: '6', name: 'Docker', level: 'Intermediate' },
  ],
  projects: [
    {
      id: '1',
      name: 'E-Commerce Platform',
      description: 'Built a full-stack e-commerce platform with React, Node.js, and MongoDB.',
      link: 'github.com/johndoe/ecommerce',
      technologies: 'React, Node.js, MongoDB',
    },
  ],
  certifications: [
    { id: '1', name: 'AWS Solutions Architect', issuer: 'Amazon Web Services', date: '2023-06' },
  ],
};

export const templatesList: Template[] = [
  { id: 'modern', name: 'Modern', description: 'Clean two-column layout with a professional sidebar', color: '#1e3a5f', category: 'Professional' },
  { id: 'classic', name: 'Classic', description: 'Traditional single-column, time-tested format', color: '#2c3e50', category: 'Traditional' },
  { id: 'minimal', name: 'Minimal', description: 'Ultra-clean with generous whitespace', color: '#34495e', category: 'Clean' },
  { id: 'creative', name: 'Creative', description: 'Colorful sidebar with modern typography', color: '#6c3483', category: 'Design' },
  { id: 'professional', name: 'Executive', description: 'Corporate style for senior professionals', color: '#1a5276', category: 'Professional' },
  { id: 'elegant', name: 'Elegant', description: 'Sophisticated serif typography design', color: '#5d4e37', category: 'Traditional' },
  { id: 'tech', name: 'Tech', description: 'Developer-focused with skill visualization', color: '#0e4d64', category: 'Modern' },
  { id: 'bold', name: 'Bold', description: 'Strong typography with accent colors', color: '#c0392b', category: 'Modern' },
  { id: 'infographic', name: 'Infographic', description: 'Visual skill bars and data-driven design', color: '#e74c3c', category: 'Creative' },
  { id: 'timeline', name: 'Timeline', description: 'Vertical timeline for career progression', color: '#3498db', category: 'Creative' },
  { id: 'cards', name: 'Cards', description: 'Modern floating card design', color: '#9b59b6', category: 'Modern' },
  { id: 'sidebar', name: 'Sidebar', description: 'Fixed sidebar with scrollable content', color: '#1abc9c', category: 'Professional' },
  { id: 'minimalist', name: 'Minimalist', description: 'Ultra-clean with thin borders', color: '#95a5a6', category: 'Clean' },
  { id: 'twocolumn', name: 'Two Column', description: 'Classic split layout design', color: '#34495e', category: 'Professional' },
  { id: 'portfolio', name: 'Portfolio', description: 'Large hero section with portfolio style', color: '#e67e22', category: 'Creative' },
];
