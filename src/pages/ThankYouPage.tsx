import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Home, Sparkles, Users, TrendingUp } from 'lucide-react';

export default function ThankYouPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { amount, name } = (location.state as { amount?: number; name?: string }) || {};

  const impactItems = [
    { icon: Users, text: 'Helping thousands of job seekers create free resumes' },
    { icon: Sparkles, text: 'Enabling us to build new templates and features' },
    { icon: TrendingUp, text: 'Keeping ResumePal running and improving' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full"
      >
        <div className="bg-white rounded-2xl p-10 text-center border border-gray-200 shadow-lg">
          {/* Animated Heart */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            >
              <Heart size={36} className="text-red-500 fill-red-500" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Thank You{name ? `, ${name}` : ''}!</h1>
            {amount && (
              <p className="text-amber-600 font-bold text-lg mb-2">Your Rs. {amount} donation means the world to us.</p>
            )}
            <p className="text-gray-500 mb-8">
              Your generosity helps us keep ResumePal free and accessible to everyone. 
              We are incredibly grateful for supporters like you.
            </p>
          </motion.div>

          {/* Impact */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-50 rounded-xl p-5 mb-8 text-left"
          >
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 text-center">Your Impact</h3>
            <div className="space-y-3">
              {impactItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon size={16} className="text-amber-600" />
                  </div>
                  <p className="text-gray-600 text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <button
              onClick={() => navigate('/builder')}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors"
            >
              <Sparkles size={16} />
              Create a Resume
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
            >
              <Home size={16} />
              Go Home
            </button>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-xs text-gray-400 mt-6"
        >
          Want to share ResumePal with others? Spread the word!
        </motion.p>
      </motion.div>
    </div>
  );
}
