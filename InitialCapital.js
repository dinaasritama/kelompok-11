import React, { useState } from 'react';
import './InitialCapital.css';

function InitialCapital({ onBack, onSave }) {
  const [capital, setCapital] = useState(0);          // Initial Capital
  const [adjustment, setAdjustment] = useState(0);    // Adjustment value
  const [finalCapital, setFinalCapital] = useState(0); // Final capital after adjustment

  // Calculate final capital
  const calculateFinalCapital = () => {
    const parsedCapital = parseFloat(capital) || 0;
    const parsedAdjustment = parseFloat(adjustment) || 0;
    const calculatedFinalCapital = parsedCapital + parsedAdjustment;
    setFinalCapital(calculatedFinalCapital);
  };

  const handleSave = () => {
    if (onSave) {
      console.log("Saving final capital:", finalCapital); // Log for debugging
      onSave(finalCapital); // Pass the final capital to the parent component
    }
  };

  return (
    <div className="capital-container">
      <h2>Masukkan Modal Awal</h2>
      
      {/* Input for Initial Capital */}
      <div className="input-group">
        <label>Modal Awal:</label>
        <input
          type="number"
          value={capital}
          onChange={(e) => setCapital(e.target.value)}
          placeholder="Masukkan Modal Awal"
        />
      </div>

      {/* Input for Adjustment */}
      <div className="input-group">
        <label>Penyesuaian:</label>
        <input
          type="number"
          value={adjustment}
          onChange={(e) => setAdjustment(e.target.value)}
          placeholder="Masukkan Penyesuaian"
        />
      </div>

      {/* Button to calculate the final capital */}
      <button onClick={calculateFinalCapital} className="calculate-button">
        Hitung Modal Akhir
      </button>

      {/* Display the final capital */}
      <div className="final-display">
        <strong>Modal Akhir: </strong> Rp {finalCapital.toLocaleString('id-ID')}
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button onClick={onBack} className="back-button">Kembali</button>
        <button onClick={handleSave} className="save-button">Simpan</button>
      </div>
    </div>
  );
}

export default InitialCapital;
