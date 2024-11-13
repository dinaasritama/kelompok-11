import React, { useState } from 'react';
import './NotaTransaksi.css';

const NotaTransaksi = ({ transaksi, onSearch, onBackToMenu }) => {
  const [searchId, setSearchId] = useState('');
  const [showPrintNotification, setShowPrintNotification] = useState(false);

  // Handle search change
  const handleSearchChange = (e) => {
    setSearchId(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  // Handle print button click
  const handlePrint = () => {
    window.print();
    
    // Show notification overlay after print
    setShowPrintNotification(true);
  };

  // Handle closing the notification
  const handleNotificationClose = () => {
    setShowPrintNotification(false);
  };

  if (!transaksi) {
    return <p>Data transaksi tidak tersedia.</p>;
  }

  return (
    <div className="nota-wrapper">
      {/* Search bar outside of nota-container */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Cari Nomor Nota"
          value={searchId}
          onChange={handleSearchChange}
        />
      </div>

      <div className="nota-container">
        <h2 className="nota-title">Nota Transaksi</h2>

        <div className="nota-header">
          <p>Tanggal: {transaksi.tanggal}</p>
          <p>ID Transaksi: {transaksi.id}</p>
        </div>

        <div className="nota-content">
          {transaksi.items && transaksi.items.map((item, index) => (
            <div key={index} className="nota-item">
              <p><strong>Nama Barang:</strong> {item.nama}</p>
              <p><strong>Harga:</strong> Rp {item.harga.toLocaleString()}</p>
              <p><strong>Jumlah:</strong> {item.jumlah}</p>
              <p><strong>Total:</strong> Rp {(item.harga * item.jumlah).toLocaleString()}</p>
            </div>
          ))}

          <div className="nota-total">
            <p><strong>Total Keseluruhan:</strong> Rp {transaksi.totalKeseluruhan.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Buttons outside of nota-container */}
      <button onClick={handlePrint} className="nota-print">Cetak Nota</button>
      
      {/* Back to Menu button */}
      <button onClick={onBackToMenu} className="nota-back">Kembali ke Menu</button>

      {/* Print notification overlay */}
      {showPrintNotification && (
        <div className="print-notification-overlay">
          <div className="print-notification-content">
            <div className="print-notification-icon">✔</div>
            <p>Nota Berhasil di Cetak</p>
            <button onClick={handleNotificationClose} className="btn-selesai">Selesai</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotaTransaksi;
