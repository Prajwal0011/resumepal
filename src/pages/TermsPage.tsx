import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-4 py-3 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Link to="/" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft size={20} className="text-gray-600" />
          </Link>
          <h1 className="font-bold text-xl">Terms of Service</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 text-gray-700">
        <p className="text-sm text-gray-500 mb-8">Last updated: January 2026</p>

        <div className="space-y-8">
          <section>
            <h2 className="font-bold text-xl mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using ResumePal ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.</p>
          </section>

          <section>
            <h2 className="font-bold text-xl mb-3">2. Description of Service</h2>
            <p>ResumePal is a free online resume builder that allows users to create, edit, and export professional resumes using various templates. The service is provided "as is" without any warranties.</p>
          </section>

          <section>
            <h2 className="font-bold text-xl mb-3">3. User Content</h2>
            <p>You retain all rights to the content you create using ResumePal. We do not claim ownership of your resumes or personal information. Your data is stored locally in your browser unless you explicitly save it.</p>
          </section>

          <section>
            <h2 className="font-bold text-xl mb-3">4. Prohibited Uses</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Using the service for any illegal activities</li>
              <li>Attempting to gain unauthorized access to our systems</li>
              <li>Distributing malware or harmful code</li>
              <li>Spamming or abusing the donation system</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-xl mb-3">5. Privacy</h2>
            <p>Your privacy is important to us. We do not sell or share your personal data with third parties. Please review our <Link to="/privacy" className="text-amber-600 hover:underline">Privacy Policy</Link> for more details.</p>
          </section>

          <section>
            <h2 className="font-bold text-xl mb-3">6. Donations</h2>
            <p>ResumePal is completely free. Donations are voluntary and non-refundable. All donations go towards maintaining and improving the service.</p>
          </section>

          <section>
            <h2 className="font-bold text-xl mb-3">7. Limitation of Liability</h2>
            <p>ResumePal shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the service.</p>
          </section>

          <section>
            <h2 className="font-bold text-xl mb-3">8. Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.</p>
          </section>

          <section>
            <h2 className="font-bold text-xl mb-3">9. Contact</h2>
            <p>For questions about these terms, please contact us at <a href="mailto:prajwalchh2025@gmail.com" className="text-amber-600 hover:underline">prajwalchh2025@gmail.com</a></p>
          </section>
        </div>
      </div>
    </div>
  );
}
