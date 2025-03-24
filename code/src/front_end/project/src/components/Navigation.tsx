import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Menu, ChevronDown } from "lucide-react";

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold text-[#D71E28]">
              WeCare Bank
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <button className="flex items-center text-gray-700 hover:text-[#D71E28]">
                Personal <ChevronDown size={16} className="ml-1" />
              </button>
              <button className="flex items-center text-gray-700 hover:text-[#D71E28]">
                Small Business <ChevronDown size={16} className="ml-1" />
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="hidden md:flex items-center">
              <Search size={20} />
            </button>
            <button className="md:hidden">
              <Menu size={24} />
            </button>
            <button className="bg-[#D71E28] text-white px-6 py-2 rounded-full hover:bg-red-700">
              Sign Out
            </button>
          </div>
        </div>
        <div className="mt-4 flex space-x-6">
          <Link
            to="/accounts"
            className={`text-sm font-medium ${
              location.pathname === "/accounts"
                ? "text-[#D71E28] border-b-2 border-[#D71E28]"
                : "text-gray-500 hover:text-[#D71E28]"
            }`}
          >
            Accounts
          </Link>
          <Link
            to="/cards"
            className={`text-sm font-medium ${
              location.pathname === "/cards"
                ? "text-[#D71E28] border-b-2 border-[#D71E28]"
                : "text-gray-500 hover:text-[#D71E28]"
            }`}
          >
            Cards
          </Link>
          <Link
            to="/loans"
            className={`text-sm font-medium ${
              location.pathname === "/loans"
                ? "text-[#D71E28] border-b-2 border-[#D71E28]"
                : "text-gray-500 hover:text-[#D71E28]"
            }`}
          >
            Loans
          </Link>
          <Link
            to="/investments"
            className={`text-sm font-medium ${
              location.pathname === "/investments"
                ? "text-[#D71E28] border-b-2 border-[#D71E28]"
                : "text-gray-500 hover:text-[#D71E28]"
            }`}
          >
            Investments
          </Link>
        </div>
      </div>
    </nav>
  );
}
