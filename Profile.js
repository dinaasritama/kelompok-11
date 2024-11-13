// src/Profile.js
import React from 'react';
import './Profile.css';

const Profile = ({ profile, onBack, onEditProfile }) => {
  const defaultProfilePicture = 'profilepemweb.png';

  return (
    <div>
      <div className="profile-container">
        <h2>Profil Pengguna</h2>
        <div className="profile-info">
          <img 
            src={profile.profilePicture || defaultProfilePicture} 
            alt="Profile" 
            className="profile-picture" 
          />
          <p><strong>Nama:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Nomor Telepon:</strong> {profile.phone}</p>
          <p><strong>Nama Pengguna:</strong> {profile.username}</p>
          <p><strong>Jenis Kelamin:</strong> {profile.gender}</p>
          <p><strong>Bio:</strong> {profile.bio}</p>
        </div>
      </div>

      {/* Back and Edit buttons outside the profile container */}
      <div className="button-container">
        <button onClick={onBack} className="back-button">Kembali</button>
        <button onClick={onEditProfile} className="edit-button">Edit Profil</button>
      </div>
    </div>
  );
};

export default Profile;
