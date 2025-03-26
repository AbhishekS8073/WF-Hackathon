import React from 'react';
import { Shield, Bell, LogOut } from 'lucide-react';
import { useAuth } from '../App';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export function TopBar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="bg-[#D71E28] text-white px-4 py-1 text-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Shield size={16} />
          <span>Secure Banking</span>
        </div>
        <div className="flex items-center space-x-4">
          <Bell size={16} />
          <span>Notifications</span>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1 hover:bg-red-700 px-2 py-1 rounded"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}