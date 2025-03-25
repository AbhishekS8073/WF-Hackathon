import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { Navigation } from "./components/Navigation";
import { TopBar } from "./components/TopBar";
import { Chatbot } from "./components/Chatbot";
import { HomePage } from "./pages/HomePage";
import { AccountsPage } from "./pages/AccountsPage";
import { CardsPage } from "./pages/CardsPage";
import { LoansPage } from "./pages/LoansPage";
import { InvestmentsPage } from "./pages/InvestmentsPage";
import { OffersPage } from "./pages/OffersPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-right" />
        <TopBar />
        <Navigation />

        <main className="max-w-7xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/accounts" element={<AccountsPage />} />
            <Route path="/cards" element={<CardsPage />} />
            <Route path="/loans" element={<LoansPage />} />
            <Route path="/investments" element={<InvestmentsPage />} />
            <Route path="/offers" element={<OffersPage />} />
          </Routes>
        </main>

        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
