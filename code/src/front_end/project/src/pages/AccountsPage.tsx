import React, { useEffect, useState } from 'react';
import { Building2 } from 'lucide-react';

export function AccountsPage() {
  // State to hold the user data fetched from the API
  // const [userData, setUserData] = useState<any>(null);
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

  // Replace this with the actual customer_id or pass it dynamically
  const customerId = '1';

  // Fetch user data from the Flask API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/user/${customerId}`);
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
  }, [customerId]);

  console.log(userData)

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const response = await fetch(`/api/transaction/${customerId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch transaction data');
        }
        const data = await response.json();
        // Ensure we're setting an array of transactions
        setTransaction(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionData();
  }, [customerId]);

  console.log(transaction);

  // If still loading, display a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there's an error fetching the data, display an error message
  if (error) {
    return <div>Error: {error}</div>;
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
              <p className="text-2xl font-semibold">{userData?`$${userData.balance}` : 'N/A'}</p>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Account Number</span>
              <span>{userData.account_number}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Savings Account</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Available Balance</p>
              <p className="text-2xl font-semibold">${userData.balance}</p>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Account Number</span>
              <span>{userData.account_number}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Interest Rate</span>
              <span>{userData.interest_rate}</span>
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
                  {transactions.type === 'debit' ? '-' : '+'}${transactions.amount}
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
