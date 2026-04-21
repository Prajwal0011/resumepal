import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ResumeProvider } from './context/ResumeContext';
import HomePage from './pages/HomePage';
import BuilderPage from './pages/BuilderPage';
import DonatePage from './pages/DonatePage';
import ThankYouPage from './pages/ThankYouPage';
import Footer from './components/Footer';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppLayout() {
  const { pathname } = useLocation();
  const showFooter = pathname === '/';

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/builder" element={<BuilderPage />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
        </Routes>
      </div>
      {showFooter && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <ResumeProvider>
        <AppLayout />
      </ResumeProvider>
    </HashRouter>
  );
}
