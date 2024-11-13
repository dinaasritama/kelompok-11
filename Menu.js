// src/Menu.js
import React from 'react';
import './Menu.css';
import logoGambar from './logopemweb.png';
import profileImage from './profilepemweb.png'; // Placeholder image
import transactionImage from './transaksi.png';
import financeImage from './hitungtotal.png';
import initialCapitalImage from './modalawal.png';

function Menu({ onNavigate, onLogout, profile }) {
  return (
    <div className="menu-container">
      <header className="menu-header">
        <div className="logo">
          <img src={logoGambar} alt="Logo" className="logo-gambar" />
        </div>
        <nav className="nav-bar">
          <button onClick={onLogout} className="logout-button">Keluar</button>
        </nav>
      </header>

      <div className="develop-experiences-section">
        <h1>Kelola Keuangan Anda dengan Mudah</h1>
        <p>Solusi sederhana dan efisien untuk mengelola keuangan toko Anda</p>
      </div>
      
      <h2 className="main-title">Menu</h2>

      <div className="content">
        <div className="menu-buttons">
          <button onClick={() => onNavigate('transaction')} className="menu-button">
            <img src={transactionImage} alt="Transaksi" className="menu-icon" />
            Lakukan Transaksi Penjualan
          </button>
          <button onClick={() => onNavigate('finance')} className="menu-button">
            <img src={financeImage} alt="Keuangan" className="menu-icon" />
            Hitung Total Keuangan
          </button>
          <button onClick={() => onNavigate('initialCapital')} className="menu-button">
            <img src={initialCapitalImage} alt="Modal Awal" className="menu-icon" />
            Masukkan Modal Awal
          </button>
          <button onClick={() => onNavigate('profitCalculator')} className="menu-button">
            <img src={financeImage} alt="Keuntungan" className="menu-icon" />
            Hitung Total Keuntungan
          </button>
        </div>

        <aside className="sidebar">
          <div className="profile-picture-container">
            {profile && profile.profilePicture ? (
              <img src={profile.profilePicture} alt="Profile" className="profile-picture" />
            ) : (
              <img src={profileImage} alt="Profile" className="profile-picture" />
            )}
          </div>
          <button onClick={() => onNavigate('profile')} className="sidebar-button">Profile</button>
          <button onClick={() => onNavigate('transaksiLain')} className="sidebar-button">Transaksi Lain</button>
          <button onClick={() => onNavigate('transactionHistory')} className="sidebar-button">Riwayat Transaksi</button>
        </aside>
      </div>
    </div>
  );
}

export default Menu;
