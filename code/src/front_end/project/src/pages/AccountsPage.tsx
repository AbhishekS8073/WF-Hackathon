import React, { useEffect, useState } from 'react';
import { Building2 } from 'lucide-react';
import { useAuth } from '../App';

export function AccountsPage() {
  const { user } = useAuth();
  const [userData, setUserData] = useState({
    account_number: '',
    account_type: '',
    balance: '',
    created_at: '',
    id: '',
    interest_rate: '',
    status: '',
    updated_at: '',
    user_id: ''
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [transaction, setTransaction] = useState<any[]>([]);

  // Format number to 2 decimal places
  const formatAmount = (amount: string | number) => {
    const num = parseFloat(amount.toString());
    return isNaN(num) ? 'N/A' : `$${num.toFixed(2)}`;
  };

  // Fetch user data from the Flask API
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.id) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/user/${user.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setUserData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user?.id]);

  useEffect(() => {
    const fetchTransactionData = async () => {
      if (!user?.id) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/transaction/${user.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch transaction data');
        }
        const data = await response.json();
        setTransaction(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionData();
  }, [user?.id]);

  // If still loading, display a loading message
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D71E28]"></div>
      </div>
    );
  }

  // If there's an error fetching the data, display an error message
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600 text-center">
          <p className="text-xl font-semibold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

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
              <p className="text-2xl font-semibold">{formatAmount(userData?.balance)}</p>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Account Number</span>
              <span>{userData?.account_number || 'N/A'}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Savings Account</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Available Balance</p>
              <p className="text-2xl font-semibold">{formatAmount(userData?.balance)}</p>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Account Number</span>
              <span>{userData?.account_number || 'N/A'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Interest Rate</span>
              <span>{userData?.interest_rate ? `${parseFloat(userData.interest_rate).toFixed(2)}%` : 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm mt-6">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <div className="space-y-4">
          {Array.isArray(transaction) && transaction.length > 0 ? (
            transaction.map((transactions, index) => (
              <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{transactions.category}</p>
                  <p className="text-sm text-gray-600">{transactions.created_at}</p>
                </div>
                <span className={transactions.type === 'debit' ? 'text-red-600' : 'text-green-600'}>
                  {transactions.type === 'debit' ? '-' : '+'}{formatAmount(transactions.amount)}
                </span>
              </div>
            ))
          ) : (
            <p>No recent transactions found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
