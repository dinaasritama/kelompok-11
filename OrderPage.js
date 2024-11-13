import React, { useState } from 'react';
import './OrderPage.css';

function OrderPage({ products, subtotal, onSaveTransaction, onNotaClick }) {
  const [showCancelNotification, setShowCancelNotification] = useState(false);

  const handleCancelTransaction = () => {
    setShowCancelNotification(true);
  };

  const confirmCancelTransaction = () => {
    setShowCancelNotification(false);
    alert("Transaksi dibatalkan.");
    // You can add additional logic here if needed (e.g., clearing the order).
  };

  const cancelNotification = () => {
    setShowCancelNotification(false);
  };

  return (
    <div className="order-page">
      <main>
        <h2>Transaksi diProses</h2>
        <table className="product-table">
          <thead>
            <tr>
              <th>Produk</th>
              <th>Jumlah</th>
              <th>Harga Per Unit</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>Rp {product.price.toLocaleString()}</td>
                <td>Rp {(product.quantity * product.price).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="subtotal">
          <strong>Subtotal = Rp {subtotal.toLocaleString()}</strong>
        </div>
        <div className="buttons">
          <button onClick={handleCancelTransaction}>Batalkan Transaksi</button>
          <button onClick={onSaveTransaction}>Selesai</button>
          <button onClick={onNotaClick}>Nota</button>
        </div>
        
        {showCancelNotification && (
          <div className="cancel-notification">
            <p>Apakah Anda yakin ingin membatalkan transaksi ini?</p>
            <button onClick={confirmCancelTransaction}>Ya</button>
            <button onClick={cancelNotification}>Tidak</button>
          </div>
        )}
      </main>
    </div>
  );
}

export default OrderPage;
