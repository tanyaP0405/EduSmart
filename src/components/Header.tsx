
import React, { useState } from 'react';
import { Bell, Moon, Search, Sun, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Math assignment due tomorrow', isNew: true },
    { id: 2, text: 'Physics test in 3 days', isNew: true },
    { id: 3, text: 'Biology project submission next week', isNew: false }
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isNew: false })));
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm py-3 px-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <span className="font-bold text-2xl text-edu-blue dark:text-white">
          Edu<span className="text-edu-purple">Smart</span>
        </span>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-10 pr-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-edu-blue"
          />
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleDarkMode} 
          className="text-gray-700 dark:text-gray-200"
        >
          {darkMode ? 
            <Sun className="h-5 w-5" /> : 
            <Moon className="h-5 w-5" />
          }
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-gray-700 dark:text-gray-200" />
              {notifications.some(n => n.isNew) && (
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-edu-red"></span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <div className="flex justify-between items-center p-2 border-b">
              <h3 className="font-medium">Notifications</h3>
              <Button variant="ghost" size="sm" onClick={markAllRead}>
                Mark all read
              </Button>
            </div>
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                No new notifications
              </div>
            ) : (
              notifications.map(notification => (
                <DropdownMenuItem key={notification.id} className="p-3 cursor-default">
                  <div className="flex items-start gap-2">
                    {notification.isNew && (
                      <div className="h-2 w-2 rounded-full bg-edu-blue mt-2"></div>
                    )}
                    <span>{notification.text}</span>
                  </div>
                </DropdownMenuItem>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5 text-gray-700 dark:text-gray-200" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
