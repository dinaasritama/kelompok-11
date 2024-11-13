// TransaksiLain.js
import React from 'react';
import './TransaksiLain.css';

function TransaksiLain({ onBack, onNavigate }) {
  return (
    <div className="transaction-container">
      <h2>Transaksi Lain</h2>
      <ul className="menu-list">
        <li className="transaksi-item" onClick={() => onNavigate('profile')}>1. Profile</li>
        <li className="transaksi-item" onClick={() => onNavigate('financialReport')}>2. Laporan Keuangan</li>
        <li className="transaksi-item" onClick={() => onNavigate('initialCapitalReport')}>3. Laporan Modal Awal</li>
      </ul>
      <button onClick={onBack} className="back-button">Kembali</button>
    </div>
  );
}

export default TransaksiLain;
