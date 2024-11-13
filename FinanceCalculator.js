import React, { useState } from 'react';
import './FinanceCalculator.css';

function FinanceCalculator({ onSave, onBack }) {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [total, setTotal] = useState(0);

  const calculateTotal = () => {
    setTotal(income - expenses);
  };

  const handleSave = () => {
    const newRecord = {
      date: new Date().toLocaleDateString(),
      income: income,
      expenses: expenses,
      total: total,
    };
    onSave(newRecord);  // Pass new record to parent component
  };

  return (
    <div className="finance-container">
      <h2>Hitung Total Keuangan</h2>
      <div className="input-group">
        <label>Pendapatan:</label>
        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(parseFloat(e.target.value) || 0)}
          placeholder="Masukkan Pendapatan"
        />
      </div>
      <div className="input-group">
        <label>Pengeluaran:</label>
        <input
          type="number"
          value={expenses}
          onChange={(e) => setExpenses(parseFloat(e.target.value) || 0)}
          placeholder="Masukkan Pengeluaran"
        />
      </div>
      <button onClick={calculateTotal} className="calculate-button">Hitung Total</button>

      <div className="total-display">
        <strong>Total Keuangan: </strong> Rp {total.toLocaleString()}
      </div>

      <div className="action-buttons">
        <button onClick={onBack} className="save-button">Kembali</button>
        <button onClick={handleSave} className="save-button">Simpan</button>
      </div>
    </div>
  );
}

export default FinanceCalculator;
