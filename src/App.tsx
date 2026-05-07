import { HashRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ResumeProvider } from './context/ResumeContext';
import { ThemeProvider } from './context/ThemeContext';
import { useTheme } from './context/ThemeContext';
import HomePage from './pages/HomePage';
import BuilderPage from './pages/BuilderPage';
import DonatePage from './pages/DonatePage';
import ThankYouPage from './pages/ThankYouPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import SettingsPage from './pages/SettingsPage';
import ContactPage from './pages/ContactPage';
import Footer from './components/Footer';
import { Home, FileText, Heart, Settings } from 'lucide-react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function BottomNav() {
  const { pathname } = useLocation();
  const { isDark } = useTheme();

  const navBg = isDark
    ? 'bg-slate-800 border-t border-slate-700'
    : 'bg-white border-t border-gray-200';

  const activeColor = 'text-amber-500';
  const inactiveColor = isDark ? 'text-slate-500 hover:text-slate-300' : 'text-gray-400 hover:text-gray-600';

  const items = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/builder', icon: FileText, label: 'Create' },
    { to: '/donate', icon: Heart, label: 'Support' },
    { to: '/settings', icon: Settings, label: 'More' },
  ];

  return (
    <nav className={`fixed bottom-0 left-0 right-0 ${navBg} z-[9999] safe-area-pb shadow-[0_-10px_30px_rgba(0,0,0,0.08)]`}>
      <div className="mx-auto flex max-w-6xl items-center justify-around px-2 py-2 sm:py-3">
        {items.map(({ to, icon: Icon, label }) => {
          const isActive = to === '/' ? pathname === '/' : pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              className={`flex flex-1 flex-col items-center rounded-xl py-1.5 transition-all ${isActive ? activeColor : inactiveColor}`}
            >
              <div className={`rounded-xl p-1 sm:p-1.5 ${isActive ? 'bg-amber-400/10' : ''}`}>
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <span className={`mt-0.5 text-[10px] font-semibold sm:text-xs ${isActive ? 'text-amber-500' : ''}`}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function AppLayout() {
  const { pathname } = useLocation();
  const { isDark } = useTheme();
  const showFooter = pathname === '/';
  const showBottomNav = true;

  return (
    <div className={`flex min-h-screen flex-col ${showBottomNav ? 'pb-20 sm:pb-24' : ''} ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <ScrollToTop />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/builder" element={<BuilderPage />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
      {showFooter && <Footer />}
      {showBottomNav && <BottomNav />}
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <ThemeProvider>
        <ResumeProvider>
          <AppLayout />
        </ResumeProvider>
      </ThemeProvider>
    </HashRouter>
  );
}
