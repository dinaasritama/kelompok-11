import React, { useState } from 'react';
import './InitialCapitalReportPage.css';
import { jsPDF } from 'jspdf';

function InitialCapitalReportPage({ capital, onBack }) {
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    alert(`Laporan Modal Awal\nDeskripsi: ${description}\nModal Awal: Rp ${capital.toLocaleString('id-ID')}`);
  };

  // Function to generate PDF and download it
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add title and content to the PDF
    doc.setFontSize(18);
    doc.text('Laporan Modal Awal', 14, 20);
    
    doc.setFontSize(12);
    doc.text(`Modal Awal: Rp ${capital.toLocaleString('id-ID')}`, 14, 40);
    doc.text(`Deskripsi: ${description}`, 14, 50);

    // Save the generated PDF
    doc.save('laporan-modal-awal.pdf');
  };

  return (
    <div className="initial-capital-page">
      <h1>Laporan Modal Awal</h1>
      
      <div className="form-group">
        <label>Modal Awal (Rp):</label>
        <p>Rp {capital.toLocaleString('id-ID')}</p>
      </div>

      <div className="form-group">
        <label htmlFor="description">Deskripsi:</label>
        <textarea 
          id="description" 
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Masukkan Deskripsi Modal Awal"
        />
      </div>

      <button onClick={handleSubmit} className="submit-button">Kirim Laporan</button>
      <button onClick={onBack} className="back-button">Kembali</button>

      {/* Export to PDF Button */}
      <button onClick={generatePDF} className="export-pdf-button">Export to PDF</button>
    </div>
  );
}

export default InitialCapitalReportPage;
