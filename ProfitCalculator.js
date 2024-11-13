// src/ProfitCalculator.js
import React, { useState } from 'react';
import './ProfitCalculator.css';

const ProfitCalculator = ({ onBack, onNext }) => {
  const [modal, setModal] = useState('');
  const [hargaJual, setHargaJual] = useState('');
  const [keuntungan, setKeuntungan] = useState(null);

  const handleCalculate = () => {
    const modalValue = parseFloat(modal);
    const hargaJualValue = parseFloat(hargaJual);

    if (!isNaN(modalValue) && !isNaN(hargaJualValue)) {
      setKeuntungan(hargaJualValue - modalValue);
    } else {
      alert('Masukkan angka yang valid untuk modal dan harga jual');
    }
  };

  return (
    <div className="profit-calculator">
      <h2>Penghitung Keuntungan</h2>
      <div className="input-group">
        <label>Modal:</label>
        <input
          type="number"
          value={modal}
          onChange={(e) => setModal(e.target.value)}
          placeholder="Masukkan modal"
        />
      </div>
      <div className="input-group">
        <label>Harga Jual:</label>
        <input
          type="number"
          value={hargaJual}
          onChange={(e) => setHargaJual(e.target.value)}
          placeholder="Masukkan harga jual"
        />
      </div>
      <button onClick={handleCalculate}>Hitung Keuntungan</button>
      
      {keuntungan !== null && (
        <div className="result">
          <h3>Keuntungan: Rp {keuntungan.toLocaleString('id-ID')}</h3>
        </div>
      )}

      <div className="action-buttons">
        <button onClick={onBack} className="back-button">Kembali</button>
        <button onClick={onNext} className="next-button">Lanjut</button>
      </div>
    </div>
  );
};

export default ProfitCalculator;
