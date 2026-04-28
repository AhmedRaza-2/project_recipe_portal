import React, { useState } from 'react';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: 'Takashi Yamamoto',
    specialty: 'Japanese Cuisine Master',
    bio: 'Chef Takashi has over 20 years of experience in traditional Japanese cuisine...',
    email: 'takashi@recipenest.com'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="edit-profile-page container" style={{ padding: '4rem 0' }}>
      <div className="flex-center">
        <div className="edit-card" style={{ 
          background: 'white', 
          padding: '3rem', 
          borderRadius: '20px', 
          boxShadow: 'var(--shadow-lg)',
          width: '100%',
          maxWidth: '600px'
        }}>
          <h2 style={{ marginBottom: '2rem' }}>Edit Your <span className="text-orange">Profile</span></h2>
          
          <div className="profile-upload flex-center" style={{ marginBottom: '2rem', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ 
              width: '120px', 
              height: '120px', 
              borderRadius: '50%', 
              background: '#eee',
              backgroundImage: 'url(https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=120&h=120&fit=crop)',
              backgroundSize: 'cover'
            }}></div>
            <button className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>Change Photo</button>
          </div>

          <form className="flex" style={{ flexDirection: 'column', gap: '1.5rem' }}>
            <div className="form-group flex" style={{ flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: '600' }}>Full Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name} 
                onChange={handleChange}
                style={{ padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #ddd' }} 
              />
            </div>

            <div className="form-group flex" style={{ flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: '600' }}>Specialty</label>
              <input 
                type="text" 
                name="specialty"
                value={formData.specialty} 
                onChange={handleChange}
                style={{ padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #ddd' }} 
              />
            </div>

            <div className="form-group flex" style={{ flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: '600' }}>Bio</label>
              <textarea 
                name="bio"
                value={formData.bio} 
                onChange={handleChange}
                rows="4"
                style={{ padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #ddd', resize: 'none' }} 
              ></textarea>
            </div>

            <div className="flex" style={{ gap: '1rem', marginTop: '1rem' }}>
              <button type="submit" className="btn btn-primary" style={{ flex: '1' }}>Save Changes</button>
              <button type="button" className="btn btn-outline" style={{ flex: '1' }}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
