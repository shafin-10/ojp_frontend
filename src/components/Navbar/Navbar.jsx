// src/components/Navbar/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '@/lib/context/AuthContext'; // Add this import
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { 
  UserCircle, 
  LogOut, 
  Briefcase, 
  Bell,
  Settings,
  User,
  Building2,
  BookmarkIcon
} from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import PostJobModal from '../modals/PostJbModals/PostJbModlas';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isEmployer, logout } = useAuth();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [notifications] = useState(3); // Example notification count

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav
      className={`fixed w-full bg-white/80 backdrop-blur-lg shadow-sm transition-all duration-300 z-50 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <span 
              className="text-3xl font-['Bebas_Neue'] tracking-wider text-primary"
            >
              Hunt<span className="text-primary">.</span>
            </span>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                {!isEmployer ? (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                      asChild
                    >
                      <Link to="/saved-jobs">
                        <BookmarkIcon className="h-4 w-4" />
                        <span>Saved Jobs</span>
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                      asChild
                    >
                      <Link to="/applied-jobs">
                        <Briefcase className="h-4 w-4" />
                        <span>Applied ({user?.jobApplicationList?.length || 0})</span>
                      </Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                      asChild
                    >
                      <Link to="/manage-jobs">
                        <Building2 className="h-4 w-4" />
                        <span>Posted Jobs ({user?.jobsList?.length || 0})</span>
                      </Link>
                    </Button>
                    <PostJobModal 
  trigger={
    <Button
      variant="default"
      size="sm"
      className="flex items-center gap-2"
    >
      <Briefcase className="h-4 w-4" />
      <span>Post a Job</span>
    </Button>
  }
/>
                  </>
                )}

                {/* Notifications */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  onClick={() => navigate('/notifications')}
                >
                  <Bell className="h-5 w-5" />
                  {notifications > 0 && (
                    <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </Button>

                {/* Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <div className="w-full h-full bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium text-primary">
                        {user?.username?.charAt(0).toUpperCase()}
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium text-gray-900">
                          {user?.username}
                        </p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={() => navigate('/profile')}>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/settings')}>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="text-red-600 focus:text-red-600"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost"
                  size="sm"
                  asChild
                >
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button 
                  variant="default"
                  size="sm"
                  asChild
                >
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;