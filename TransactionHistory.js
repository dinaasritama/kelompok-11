import React, { useState } from 'react';
import './TransactionHistory.css';

// Importing PDF generation library
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const TransactionHistory = ({ transactions, onDelete, onBack }) => {
  const [transactionToDelete, setTransactionToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState('');

  // Show confirmation for deletion
  const handleDeleteClick = (transactionId) => {
    setTransactionToDelete(transactionId);
  };

  // Confirm deletion with a fallback check
  const confirmDelete = () => {
    if (onDelete && typeof onDelete === 'function') {
      onDelete(transactionToDelete);
    } else {
      console.warn("onDelete function is not defined");
    }
    setTransactionToDelete(null);
  };

  // Cancel deletion
  const cancelDelete = () => {
    setTransactionToDelete(null);
  };

  // Handle Search Query Change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter transactions based on the search query
  const filteredTransactions = transactions.filter((transaction) => 
    transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.amount.toString().includes(searchQuery)
  );

  // Generate PDF function
  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.text('Transaction History', 14, 16);
    doc.autoTable({
      startY: 20,
      head: [['Tanggal', 'Jumlah', 'Deskripsi']],
      body: filteredTransactions.map(transaction => [
        transaction.date,
        `Rp ${transaction.amount.toLocaleString()}`,
        transaction.description,
      ]),
    });
    doc.save('transaction-history.pdf');
    setNotification('PDF berhasil dibuat!');
    setTimeout(() => setNotification(''), 3000); // Clear notification after 3 seconds
  };

  return (
    <div>
      {/* Search Container */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Cari transaksi..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      {/* Notification outside container */}
      {notification && <div className="notification">{notification}</div>}

      <div className="transaction-history-container">
        <header className="transaction-history-header">
          <h2>History Transaksi</h2>
        </header>

        {/* Transaction Table */}
        {filteredTransactions.length > 0 ? (
          <table className="transaction-table">
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Jumlah</th>
                <th>Deskripsi</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="transaction-row">
                  <td>{transaction.date}</td>
                  <td>Rp {transaction.amount.toLocaleString()}</td>
                  <td>{transaction.description}</td>
                  <td>
                    <button onClick={() => handleDeleteClick(transaction.id)} className="delete-button">
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-transactions-message">Tidak ada transaksi untuk ditampilkan.</p>
        )}

        {/* Delete Confirmation */}
        {transactionToDelete && (
          <div className="delete-confirmation-overlay">
            <div className="delete-confirmation">
              <p>Apakah Anda yakin ingin menghapus transaksi ini?</p>
              <button onClick={confirmDelete} className="confirm-button">Ya</button>
              <button onClick={cancelDelete} className="cancel-button">Tidak</button>
            </div>
          </div>
        )}
      </div>

      {/* Buttons outside container */}
      <div className="action-buttons">
        <button onClick={onBack} className="back-button">Kembali</button>
        <button onClick={handleGeneratePDF} className="pdf-button">Cetak PDF</button>
      </div>
    </div>
  );
};

export default TransactionHistory;