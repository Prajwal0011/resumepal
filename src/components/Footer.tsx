import { useNavigate } from 'react-router-dom';
import { Heart, FileText } from 'lucide-react';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <FileText size={22} className="text-amber-400" />
              <span className="text-white font-bold text-lg">ResumePal</span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              A free resume builder that helps you create professional resumes in minutes. 
              No sign-up required, no watermarks, completely free.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Quick Links</h4>
            <div className="space-y-2">
              <button onClick={() => navigate('/')} className="block text-sm hover:text-white transition-colors">Home</button>
              <button onClick={() => navigate('/builder')} className="block text-sm hover:text-white transition-colors">Create Resume</button>
              <button onClick={() => navigate('/donate')} className="block text-sm hover:text-white transition-colors">Support Us</button>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Support</h4>
            <div className="space-y-2">
              <button onClick={() => navigate('/contact')} className="block text-sm hover:text-white transition-colors">Contact Us</button>
              <button onClick={() => navigate('/donate')} className="flex items-center gap-1.5 text-sm hover:text-white transition-colors">
                <Heart size={12} /> Make a Donation
              </button>
              <a href="mailto:sewacircle123@gmail.com" className="block text-sm hover:text-white transition-colors">sewacircle123@gmail.com</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs"> ResumePal. All rights reserved.</p>
          <p className="text-xs flex items-center gap-1">
            Made with <Heart size={10} className="text-red-400" /> for job seekers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
