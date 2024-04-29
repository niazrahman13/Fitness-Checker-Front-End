import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/features/auth/authSlice';

const UpdateBmi = () => {
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [weightKgs, setWeightKgs] = useState('');
  const [message, setMessage] = useState('');

  const [bmiData, setBmiData] = useState<{ bmi: number; bmiStatus: string; recommendations: string } | null>(null);
  const [loading, setLoading] = useState(true);

  const currentUser = useSelector(selectCurrentUser);
  const userId = currentUser?.userId;

  useEffect(() => {
    console.log("User ID:", userId); // Log userId to the console
    const fetchBmiData = async () => {
      try {
        const response = await axios.get(`https://fitnesschecker.vercel.app/api/v1/users/bmi/${userId}`);
        console.log(loading)
        const data = response.data.bmiData;
        
        if (data) {
          setBmiData(data._id);
        } else {
          throw new Error('BMI data not found');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching BMI data:', error);
        setLoading(false);
      }
    };

    if (userId) {
      fetchBmiData();
    }
  }, [userId]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://fitnesschecker.vercel.app/api/v1/users/bmi/${bmiData}`, {
        heightFeet: parseFloat(heightFeet),
        heightInches: parseFloat(heightInches),
        weightKgs: parseFloat(weightKgs)
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error updating BMI:', error);
      setMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>Update BMI</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontWeight: 'bold' }}>Height (Feet):</label>
          <input type="number" value={heightFeet} onChange={(e) => setHeightFeet(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontWeight: 'bold' }}>Height (Inches):</label>
          <input type="number" value={heightInches} onChange={(e) => setHeightInches(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontWeight: 'bold' }}>Weight (Kgs):</label>
          <input type="number" value={weightKgs} onChange={(e) => setWeightKgs(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>
        <button type="submit" style={{ width: '100%', padding: '0.5rem', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Submit</button>
      </form>
      {message && <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '1.2rem' }}>{message}</p>}
    </div>
  );
};

export default UpdateBmi;
