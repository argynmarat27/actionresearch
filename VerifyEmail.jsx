import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function VerifyEmail() {
  const { token } = useParams(); // URL параметрінен токен алу
  const [message, setMessage] = useState("Расталып жатыр...");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/auth/verify/${token}`);

        if (response.data.message) {
          setMessage(response.data.message);

          // ✅ Автоматты түрде 3 секундтан соң басқа бетке жіберу
          setTimeout(() => {
            navigate('/verified-success'); // React Router арқылы бағыттау
          }, 3000);
        } else {
          setMessage("Пошта расталды!");
        }
      } catch (err) {
        console.error(err);
        setError("Күте тұрыңыз...");
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      {loading ? (
        <h2>Расталып жатыр...</h2>
      ) : error ? (
        <h2 style={{ color: 'red' }}>{error}</h2>
      ) : (
        <h2 style={{ color: 'green' }}>{message}</h2>
      )}
    </div>
  );
}

export default VerifyEmail;
