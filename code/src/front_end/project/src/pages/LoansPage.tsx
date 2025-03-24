import React from 'react';
import { Wallet } from 'lucide-react';

export function LoansPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <Wallet className="text-[#D71E28] h-8 w-8" />
        <h1 className="text-3xl font-bold">Loans</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Personal Loan</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Outstanding Balance</p>
              <p className="text-2xl font-semibold">$25,000</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Interest Rate</p>
                <p className="font-medium">5.99% APR</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Monthly Payment</p>
                <p className="font-medium">$483.25</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Next Payment</p>
                <p className="font-medium">Apr 1, 2024</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Term Remaining</p>
                <p className="font-medium">48 months</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Auto Loan</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Outstanding Balance</p>
              <p className="text-2xl font-semibold">$18,500</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Interest Rate</p>
                <p className="font-medium">4.25% APR</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Monthly Payment</p>
                <p className="font-medium">$375.50</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Next Payment</p>
                <p className="font-medium">Apr 15, 2024</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Term Remaining</p>
                <p className="font-medium">36 months</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Payment History</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Personal Loan Payment</p>
              <p className="text-sm text-gray-600">Mar 1, 2024</p>
            </div>
            <span className="text-green-600">$483.25</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Auto Loan Payment</p>
              <p className="text-sm text-gray-600">Feb 15, 2024</p>
            </div>
            <span className="text-green-600">$375.50</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Personal Loan Payment</p>
              <p className="text-sm text-gray-600">Feb 1, 2024</p>
            </div>
            <span className="text-green-600">$483.25</span>
          </div>
        </div>
      </div>
    </div>
  );
}