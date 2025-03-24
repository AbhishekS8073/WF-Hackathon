import React from 'react';
import { Shield, Bell } from 'lucide-react';

export function TopBar() {
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
        </div>
      </div>
    </div>
  );
}