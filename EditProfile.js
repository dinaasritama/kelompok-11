// src/components/EditProfile.js
import React, { useState } from 'react';
import './EditProfile.css';

const EditProfile = ({ onBack, onSaveProfile, profile }) => {
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [bio, setBio] = useState(profile.bio);
  const [username, setUsername] = useState(profile.username);
  const [gender, setGender] = useState(profile.gender);
  const [profilePicture, setProfilePicture] = useState(profile.profilePicture);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the updated profile data to the parent component (App)
    onSaveProfile({
      name,
      email,
      phone,
      bio,
      username,
      gender,
      profilePicture,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Profil</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="profilePicture">Foto Profil:</label>
          <input
            type="file"
            id="profilePicture"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        {profilePicture && (
          <div className="profile-picture-preview">
            <img src={profilePicture} alt="Preview Profil" />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="name">Nama:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Nomor Telepon:</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Nama Pengguna:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Jenis Kelamin:</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Pilih Jenis Kelamin</option>
            <option value="male">Laki-laki</option>
            <option value="female">Perempuan</option>
            <option value="other">Lainnya</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Simpan Perubahan</button>
      </form>
      <button onClick={onBack} className="back-button">Kembali</button>
    </div>
  );
};

export default EditProfile;
