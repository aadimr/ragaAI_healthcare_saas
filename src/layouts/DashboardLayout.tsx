import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Activity, LogOut, Menu, UserCircle, Bell, ChevronDown } from 'lucide-react';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { showLocalNotification } from '../utils/serviceWorkerRegistration';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import toast from 'react-hot-toast';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Patients', path: '/patients' },
    { icon: Activity, label: 'Analytics', path: '/analytics' },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Successfully logged out!');
    } catch (error) {
      toast.error('Logout failed.');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans overflow-hidden">
      
      {/* Top Header Navbar */}
      <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 sm:px-6 z-40 border-b border-gray-200 shrink-0">
        <div className="flex items-center gap-4">
          <button 
            className="p-2 text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle Sidebar"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-extrabold text-primary-600 tracking-tight hidden sm:block">HealthAdmin</h1>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={() => showLocalNotification('New Appointment', { body: 'Jane Doe is waiting in Cardiology.' })}
            className="relative p-2 text-gray-400 hover:text-primary-600 focus:outline-none transition-colors hidden sm:block"
            title="Simulate Notification"
          >
            <Bell className="h-6 w-6" />
            <span className="absolute top-1 right-1 block h-2.5 w-2.5 bg-red-500 rounded-full ring-2 ring-white" />
          </button>
          <div className="h-6 w-px bg-gray-200 hidden sm:block" />
          <div className="relative">
            <button 
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-full border border-gray-200 transition-all duration-200"
            >
              <UserCircle className="h-5 w-5 sm:mr-2 text-primary-600" />
              <span className="max-w-[100px] truncate hidden sm:block">{user?.displayName || 'Dr. Admin'}</span>
              <ChevronDown className="h-4 w-4 ml-1 sm:ml-2 text-gray-500" />
            </button>

            {profileOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setProfileOpen(false)} 
                />
                <div className="absolute right-0 mt-2 w-56 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20 overflow-hidden transform origin-top-right transition-all">
                  <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                    <p className="text-sm font-medium text-gray-900 truncate">{user?.displayName || 'Health Admin'}</p>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{user?.email || 'admin@healthcare.local'}</p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Layout Area */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-20 md:hidden transition-opacity duration-300"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div 
          className={`absolute md:relative z-30 h-full bg-white shadow-xl md:shadow-none border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden
            ${sidebarOpen ? 'w-64 translate-x-0' : 'w-64 md:w-0 -translate-x-full md:translate-x-0'}
          `}
        >
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto w-64">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => {
                    if (window.innerWidth < 768) setSidebarOpen(false);
                  }}
                  className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 group'
                  }`}
                >
                  <Icon className={`mr-3 h-5 w-5 shrink-0 transition-colors ${isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                  <span className="whitespace-nowrap">{item.label}</span>
                </Link>
              );
            })}
          </nav>
          
          <div className="p-4 border-t border-gray-200 w-64 shrink-0">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors group"
            >
              <LogOut className="mr-3 h-5 w-5 shrink-0 transition-transform group-hover:-translate-x-1" />
              <span>Log out</span>
            </button>
          </div>
        </div>

        {/* Dynamic Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50/50 min-w-0">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;
