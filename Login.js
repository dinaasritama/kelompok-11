import React, { useState, useEffect } from 'react';
import './Login.css';
import logoImage from './logopemweb.png'; // Import your logo image

const Login = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showUsernamePassword, setShowUsernamePassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setShowUsernamePassword(false);
  }, []);

  const switchModal = (directLogin = false) => {
    if (directLogin) {
      onLogin(); // Immediately log in and navigate to the main menu
    } else {
      setIsLogin(!isLogin);
      setShowUsernamePassword(false);
    }
  };

  const handleSocialLogin = () => {
    setShowUsernamePassword(true);
  };

  const handleBack = () => {
    setShowUsernamePassword(false);
  };

  const handleLogin = () => {
    if (username === '' || password === '') {
      setError('Username dan Password tidak boleh kosong.');
      return;
    }
    alert("Login berhasil! Mengarahkan ke menu utama...");
    onLogin(); // Call function to mark user as logged in
  };

  const handleRegistrationSubmit = (event) => {
    event.preventDefault();
    if (username === '' || password === '') {
      setError('Semua kolom harus diisi.');
      return;
    }
    alert("Registrasi berhasil! Silakan login.");
    setIsLogin(true);
    setShowUsernamePassword(true);
  };

  return (
    <div className="app-container">
      <div className="modal">
        <div className="modal-content">
          {error && <p className="error-text">{error}</p>}
          {isLogin ? (
            <>
              <div className="logo">
                <img src={logoImage} alt="Logo" className="logo-image" />
              </div>
              <div className="image-placeholder"></div>

              {!showUsernamePassword ? (
                <>
                  <button className="social-button google-button" onClick={handleSocialLogin}>Lanjutkan dengan Google</button>
                  <button className="social-button facebook-button" onClick={handleSocialLogin}>Lanjutkan dengan Facebook</button>
                  <div className="or-divider">atau</div>
                  <button className="register-button" onClick={() => switchModal()}>Registrasi Akun</button>
                  <p className="terms-text">Dengan mendaftar, Anda menyetujui persyaratan, Kebijakan, Privasi dan penggunaan kuki.</p>
                  <p className="login-link" onClick={() => switchModal()}>Sudah punya akun? masuk</p>
                </>
              ) : (
                <>
                  <label>Email
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                  </label>
                  <label>Password
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                  </label>
                  <button className="login-button" onClick={handleLogin}>Login</button>
                  <p className="forgot-password-link" onClick={switchModal}>Lupa Password?</p>
                  <button className="back-button" onClick={handleBack}>Kembali</button>
                </>
              )}
            </>
          ) : (
            <>
              <h2 className="registration-title">Registrasi Akun</h2>
              <div className="logo">
                <img src={logoImage} alt="Logo" className="logo-image" />
              </div>
              <div className="image-placeholder"></div>
              <form className="registration-form" onSubmit={handleRegistrationSubmit}>
                <label>Email
                  <input type="email" maxLength="50" placeholder="Email" />
                  <span className="char-count">0/50</span>
                </label>
                <label>User
                  <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="User" />
                </label>
                <label>Password
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                </label>
                <label>Confirm Password 
                  <input type="password" placeholder="Confirm Password" />
                </label>
                <button  type="submit" className="next-button">Lanjut</button>
              </form>
              <p className="login-link" onClick={() => switchModal(true)}>Sudah punya akun? masuk</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
