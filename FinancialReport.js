import React from 'react';
import './FinancialReport.css';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Import the autoTable plugin

function FinancialReport({ financialRecords, onBack }) {

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);

    // Title
    doc.text('Laporan Keuangan', 14, 20);

    // Define columns
    const columns = ['Tanggal', 'Pendapatan', 'Pengeluaran', 'Total'];
    const rows = financialRecords.map(record => [
      record.date,
      `Rp ${record.income.toLocaleString()}`,
      `Rp ${record.expenses.toLocaleString()}`,
      `Rp ${record.total.toLocaleString()}`
    ]);

    // If no records, show a message
    if (financialRecords.length === 0) {
      rows.push(['Tidak ada data keuangan', '', '', '']);
    }

    // Add table with autoTable
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 30, // Set the start Y position for the table
    });

    // Save the PDF
    doc.save('laporan_keuangan.pdf');
  };

  return (
    <div className="financial-report-container">
      <h2>Laporan Keuangan</h2>
      <table className="financial-report-table">
        <thead>
          <tr>
            <th>Tanggal</th>
            <th>Pendapatan</th>
            <th>Pengeluaran</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {financialRecords.length > 0 ? (
            financialRecords.map((record, index) => (
              <tr key={index}>
                <td>{record.date}</td>
                <td>Rp {record.income.toLocaleString()}</td>
                <td>Rp {record.expenses.toLocaleString()}</td>
                <td>Rp {record.total.toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-data">Tidak ada data keuangan</td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={onBack} className="back-button">Kembali</button>
      <button onClick={exportToPDF} className="export-button">Export to PDF</button>
    </div>
  );
}

export default FinancialReport;
