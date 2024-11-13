// App.js
import React, { useState } from 'react';
import Login from './components/Login';
import Menu from './components/Menu';
import TransactionPage from './components/TransactionPage';
import FinanceCalculator from './components/FinanceCalculator';
import InitialCapital from './components/InitialCapital';
import EditProfile from './components/EditProfile';
import Profile from './components/Profile';
import TransactionHistory from './components/TransactionHistory';
import TransaksiLain from './components/TransaksiLain';
import OrderPage from './components/OrderPage';
import NotaTransaksi from './components/NotaTransaksi';
import ProfitCalculator from './components/ProfitCalculator';
import FinancialReport from './components/FinancialReport';
import InitialCapitalReportPage from './components/InitialCapitalReportPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('menu');
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    bio: 'This is a sample bio',
    username: 'johndoe',
    gender: 'male',
    profilePicture: null,
  });
  const [products, setProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [financialRecords, setFinancialRecords] = useState([]);
  const [initialCapital, setInitialCapital] = useState(0);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('menu');
  };

  const handleSaveProfile = (updatedProfile) => {
    setProfile(updatedProfile);
    setCurrentPage('menu');
  };

  const handleSaveTransaction = () => {
    const newTransaction = {
      id: transactionHistory.length + 1,
      date: new Date().toISOString().split('T')[0],
      amount: subtotal,
      description: `Total purchase of ${products.length} items`
    };
    setTransactionHistory([...transactionHistory, newTransaction]);
    setCurrentPage('transactionHistory');
  };

  const handleSaveFinanceRecord = (newRecord) => {
    setFinancialRecords([...financialRecords, newRecord]);
    setCurrentPage('financialReport');
  };

  const handleSaveInitialCapital = (capital) => {
    setInitialCapital(capital);
    setCurrentPage('initialCapitalReport');
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          {currentPage === 'menu' && (
            <Menu 
              onNavigate={(page) => setCurrentPage(page)} 
              onLogout={handleLogout} 
              profile={profile}
              onProfileClick={() => setCurrentPage('profile')}
            />
          )}
          {currentPage === 'profile' && (
            <Profile 
              profile={profile}
              onBack={() => setCurrentPage('menu')}
              onEditProfile={() => setCurrentPage('editProfile')}
            />
          )}
          {currentPage === 'editProfile' && (
            <EditProfile
              profile={profile}
              onBack={() => setCurrentPage('profile')}
              onSaveProfile={handleSaveProfile}
            />
          )}
          {currentPage === 'transaction' && (
            <TransactionPage 
              onFinishTransaction={(products, subtotal) => {
                setProducts(products);
                setSubtotal(subtotal);
                setCurrentPage('order');
              }} 
              onBack={() => setCurrentPage('menu')} 
            />
          )}
          {currentPage === 'finance' && (
            <FinanceCalculator 
              onSave={handleSaveFinanceRecord}
              onBack={() => setCurrentPage('menu')}
            />
          )}
          {currentPage === 'initialCapital' && (
            <InitialCapital
              onBack={() => setCurrentPage('menu')}
              onSave={handleSaveInitialCapital}
            />
          )}
          {currentPage === 'initialCapitalReport' && (
            <InitialCapitalReportPage 
              capital={initialCapital}
              onBack={() => setCurrentPage('transaksiLain')} 
            />
          )}
          {currentPage === 'transactionHistory' && (
            <TransactionHistory 
              transactions={transactionHistory} 
              onDelete={(transactionId) => 
                setTransactionHistory(transactionHistory.filter(transaction => transaction.id !== transactionId))
              }
              onBack={() => setCurrentPage('menu')}
            />
          )}
          {currentPage === 'transaksiLain' && (
            <TransaksiLain 
              onBack={() => setCurrentPage('menu')}
              onNavigate={(page) => setCurrentPage(page)}
            />
          )}
          {currentPage === 'order' && (
            <OrderPage 
              products={products} 
              subtotal={subtotal} 
              onSaveTransaction={handleSaveTransaction} 
              onNotaClick={() => setCurrentPage('nota')} 
            />
          )}
          {currentPage === 'nota' && (
            <NotaTransaksi 
              transaksi={{
                id: `TRX-${Date.now()}`,
                tanggal: new Date().toLocaleDateString(),
                items: products.map(product => ({
                  nama: product.name, 
                  harga: product.price, 
                  jumlah: product.quantity
                })),
                totalKeseluruhan: subtotal
              }}
              onSearch={(searchId) => {
                console.log(`Search for transaction ID: ${searchId}`);
              }}
              onBackToMenu={() => setCurrentPage('menu')}
            />
          )}
          {currentPage === 'profitCalculator' && (
            <ProfitCalculator 
              onBack={() => setCurrentPage('menu')} 
              onNext={() => setCurrentPage('financialReport')}
            />
          )}
          {currentPage === 'financialReport' && (
            <FinancialReport 
              financialRecords={financialRecords} 
              onBack={() => setCurrentPage('transaksiLain')} 
            />
          )}
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
