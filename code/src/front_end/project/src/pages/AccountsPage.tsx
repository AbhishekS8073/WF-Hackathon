import React from 'react';
import { Building2 } from 'lucide-react';

export function AccountsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <Building2 className="text-[#D71E28] h-8 w-8" />
        <h1 className="text-3xl font-bold">Accounts</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Checking Account</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Available Balance</p>
              <p className="text-2xl font-semibold">$15,420.50</p>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Account Number</span>
              <span>****1234</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Routing Number</span>
              <span>****5678</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Savings Account</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Available Balance</p>
              <p className="text-2xl font-semibold">$42,850.75</p>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Account Number</span>
              <span>****5678</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Interest Rate</span>
              <span>0.50% APY</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm mt-6">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Amazon.com</p>
              <p className="text-sm text-gray-600">Mar 15, 2024</p>
            </div>
            <span className="text-red-600">-$49.99</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Salary Deposit</p>
              <p className="text-sm text-gray-600">Mar 14, 2024</p>
            </div>
            <span className="text-green-600">+$3,500.00</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Starbucks</p>
              <p className="text-sm text-gray-600">Mar 14, 2024</p>
            </div>
            <span className="text-red-600">-$5.75</span>
          </div>
        </div>
      </div>
    </div>
  );
}