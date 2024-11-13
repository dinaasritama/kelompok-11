import React, { useState } from 'react';
import './Transaction.css';

const Transaction = () => {
  const [initialCapital, setInitialCapital] = useState('');
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const handleAddTransaction = () => {
    const newTransaction = prompt("Masukkan total transaksi:");
    if (newTransaction) {
      const total = totalRevenue + parseFloat(newTransaction);
      setTotalRevenue(total);
      setTransactions([...transactions, newTransaction]);
    }
  };

  const handleCheckReceipt = () => {
    alert("Daftar Transaksi:\n" + transactions.join("\n"));
  };

  const handleSubmitCapital = (e) => {
    e.preventDefault();
    alert(`Modal awal sebesar: ${initialCapital} telah disimpan.`);
  };

  return (
    <div className="transaction-container">
      <h2>Transaksi</h2>
      <button onClick={handleAddTransaction} className="transaction-button">Lanjutkan Transaksi Penjualan</button>
      <button onClick={handleCheckReceipt} className="transaction-button">Cek Nota</button>
      <button onClick={() => alert(`Total Keuangan: ${totalRevenue}`)} className="transaction-button">
        Hitung Total Keuangan
      </button>
      <form onSubmit={handleSubmitCapital} className="capital-form">
        <label htmlFor="initialCapital">Masukkan Modal Awal:</label>
        <input
          type="number"
          id="initialCapital"
          value={initialCapital}
          onChange={(e) => setInitialCapital(e.target.value)}
          required
        />
        <button type="submit" className="transaction-button">Simpan Modal Awal</button>
      </form>
      <button onClick={() => alert("Laporan Transaksi Proses")} className="transaction-button">Laporan Transaksi Proses</button>
    </div>
  );
};

export default Transaction;
