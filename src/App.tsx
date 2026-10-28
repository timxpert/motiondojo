import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname === '/about' ? '/about' : '/';
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname === '/about' ? '/about' : '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    setCurrentPath(path);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Persistent Responsive Navbar */}
        <Navbar currentPath={currentPath} onNavigate={navigateTo} />

        {/* Dynamic Route View */}
        <div style={{ flexGrow: 1 }}>
          {currentPath === '/about' ? (
            <AboutPage onNavigateHome={() => navigateTo('/')} />
          ) : (
            <HomePage onLearnMore={() => navigateTo('/about')} />
          )}
        </div>

        {/* Global Branded Footer */}
        <Footer currentPath={currentPath} onNavigate={navigateTo} />
      </div>
    </ThemeProvider>
  );
};

export default App;
