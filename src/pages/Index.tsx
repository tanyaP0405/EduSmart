
import React, { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Dashboard from '@/components/Dashboard';
import AIAssistant from '@/components/AIAssistant';
import ProgressAnalysis from '@/components/ProgressAnalysis';
import LearningResources from '@/components/LearningResources';

const Index = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // References to sections for smooth scrolling
  const overviewRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const analysisRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };
  
  // Scroll to section handler
  const scrollToSection = (sectionId: string) => {
    let ref = null;
    
    switch (sectionId) {
      case 'overview':
        ref = overviewRef;
        break;
      case 'progress':
        ref = progressRef;
        break;
      case 'analysis':
        ref = analysisRef;
        break;
      case 'resources':
        ref = resourcesRef;
        break;
    }
    
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Set initial dark mode based on user preference
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);
  
  // Render the active tab content
  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'assistant':
        return <AIAssistant />;
      case 'progress':
        return <ProgressAnalysis />;
      case 'resources':
        return <LearningResources />;
      default:
        return <Dashboard />;
    }
  };
  
  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="flex flex-col min-h-screen bg-background">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        <main className="flex-1 container pt-6 pb-12 px-4">
          <Navigation 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            scrollToSection={scrollToSection}
          />
          
          <div ref={overviewRef}>
            {renderActiveTab()}
          </div>
          
          {/* References for section scrolling */}
          <div ref={progressRef} className="h-0 w-0"></div>
          <div ref={analysisRef} className="h-0 w-0"></div>
          <div ref={resourcesRef} className="h-0 w-0"></div>
        </main>
        
        <footer className="bg-white dark:bg-gray-800 border-t py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <span className="font-bold text-lg text-edu-blue dark:text-white">
                  Edu<span className="text-edu-purple">Smart</span>
                </span>
                <p className="text-muted-foreground text-sm mt-1">
                  Personalized learning powered by AI
                </p>
              </div>
              <div className="flex space-x-8">
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">About Us</a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Contact</a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</a>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t text-center text-muted-foreground text-sm">
              © 2025 EduSmart. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
