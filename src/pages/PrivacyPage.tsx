import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-4 py-3 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Link to="/" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft size={20} className="text-gray-600" />
          </Link>
          <h1 className="font-bold text-xl">Privacy Policy</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 text-gray-700">
        <p className="text-sm text-gray-500 mb-8">Last updated: January 2026</p>

        <div className="space-y-8">
          <section>
            <h2 className="font-bold text-xl mb-3">1. Information We Collect</h2>
            <p>ResumePal is designed to protect your privacy. We collect minimal information:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Resume Data:</strong> All resume content is stored locally in your browser</li>
              <li><strong>Donation Information:</strong> When you donate, we receive your name, email, and amount via Formspree</li>
              <li><strong>Analytics:</strong> Basic, anonymized usage data (if enabled)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-xl mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To provide and improve the resume builder service</li>
              <li>To process and thank donors</li>
              <li>To send important service updates (rare)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-xl mb-3">3. Data Storage</h2>
            <p>Your resume data never leaves your device. It is stored in your browser's localStorage and is accessible only to you. We do not have servers that store your resume content.</p>
          </section>

          <section>
            <h2 className="font-bold text-xl mb-3">4. Third-Party Services</h2>
            <p>We use the following third-party services:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Formspree:</strong> Processes donation form submissions (name, email, message)</li>
              <li><strong>CDN/Hosting:</strong> Serves the application files</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-xl mb-3">5. Cookies</h2>
            <p>We use minimal cookies for essential functionality (theme preference, last used template). We do not use tracking cookies or advertising cookies.</p>
          </section>

          <section>
            <h2 className="font-bold text-xl mb-3">6. Data Security</h2>
            <p>We take reasonable measures to protect any data we receive. However, no method of transmission over the internet is 100% secure.</p>
          </section>

          <section>
            <h2 className="font-bold text-xl mb-3">7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Clear all your data at any time (via Settings → Clear Data)</li>
              <li>Request deletion of any donation information we have</li>
              <li>Export your resume data at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-xl mb-3">8. Children's Privacy</h2>
            <p>ResumePal is not directed at children under 13. We do not knowingly collect personal information from children.</p>
          </section>

          <section>
            <h2 className="font-bold text-xl mb-3">9. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify users of any material changes.</p>
          </section>

          <section>
            <h2 className="font-bold text-xl mb-3">10. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:prajwalchh2025@gmail.com" className="text-amber-600 hover:underline">prajwalchh2025@gmail.com</a></p>
          </section>
        </div>
      </div>
    </div>
  );
}
