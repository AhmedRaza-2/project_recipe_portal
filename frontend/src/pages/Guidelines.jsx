import React from 'react';

const Guidelines = () => {
  return (
    <div className="container" style={{ padding: '5rem 0' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '3rem' }}>Chef <span className="text-orange">Guidelines</span></h1>
      
      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
        <div className="card" style={{ padding: '2.5rem' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>1. Quality Standards</h2>
          <p style={{ lineHeight: '1.8', color: '#555' }}>
            We strive for excellence. All recipes shared on RecipeNest should be original or properly credited. 
            Ensure that your instructions are clear, concise, and easy to follow for cooks of all levels.
          </p>
          <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
            <li>High-quality images are mandatory.</li>
            <li>Accurate measurements (Metric or Imperial).</li>
            <li>Clear step-by-step instructions.</li>
          </ul>
        </div>

        <div className="card" style={{ padding: '2.5rem' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>2. Professional Conduct</h2>
          <p style={{ lineHeight: '1.8', color: '#555' }}>
            As a RecipeNest Chef, you represent our community. Maintain professionalism in your bio and when 
            interacting with users in the comments section.
          </p>
          <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
            <li>No offensive language or content.</li>
            <li>Respect intellectual property.</li>
            <li>Engage positively with the community.</li>
          </ul>
        </div>

        <div className="card" style={{ padding: '2.5rem' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>3. Profile Optimization</h2>
          <p style={{ lineHeight: '1.8', color: '#555' }}>
            Your profile is your digital business card. Keep it updated with your latest achievements, 
            specialties, and a professional profile picture.
          </p>
        </div>

        <div className="card" style={{ padding: '2.5rem' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>4. Content Ownership</h2>
          <p style={{ lineHeight: '1.8', color: '#555' }}>
            You retain full ownership of your recipes. However, by posting on RecipeNest, you grant us 
            the right to feature your work on our social media and newsletters.
          </p>
        </div>
      </div>

      <div style={{ marginTop: '5rem', textAlign: 'center', background: '#f9f9f9', padding: '4rem', borderRadius: '20px' }}>
        <h2>Ready to join our elite ranks?</h2>
        <p style={{ margin: '1rem 0 2rem' }}>Start your journey as a RecipeNest Chef today.</p>
        <button className="btn btn-primary" style={{ padding: '1rem 3rem' }}>Apply Now</button>
      </div>
    </div>
  );
};

export default Guidelines;
