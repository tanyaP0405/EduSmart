
import React, { useEffect } from 'react';
import { cn } from "@/lib/utils";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  scrollToSection: (sectionId: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  activeTab, 
  setActiveTab,
  scrollToSection 
}) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'assistant', label: 'AI Assistant' },
    { id: 'progress', label: 'Progress Analysis' },
    { id: 'resources', label: 'Learning Resources' }
  ];

  const navLinks = [
    { id: 'overview', label: 'Overview' },
    { id: 'progress', label: 'Progress' },
    { id: 'analysis', label: 'Analysis' },
    { id: 'resources', label: 'Resources' }
  ];

  // Ensure smooth scrolling for navigation links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className="mb-8">
      <div className="border-b pb-2 mb-4">
        <nav className="flex space-x-1 md:space-x-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                activeTab === tab.id 
                  ? "bg-edu-blue text-white" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Your Learning Journey</h1>
          <div className="hidden md:flex space-x-4">
            {navLinks.map(link => (
              <button 
                key={link.id}
                onClick={() => {
                  scrollToSection(link.id);
                  // Update URL hash for deep linking
                  window.location.hash = link.id;
                }}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
