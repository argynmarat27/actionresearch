import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { token } = useParams(); // URL-дегі токен
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, {
  newPassword: password,
});
      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 2000); // 2 сек. кейін логин бетіне
    } catch (err) {
      setMessage("Құпия сөзді қалпына келтіру кезінде қате.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Жаңа құпиясөз</h2>

        {message && <p className="text-center text-green-600 mb-4">{message}</p>}

        <input
          type="password"
          placeholder="Жаңа құпиясөз"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Қалпына келтіру
        </button>
      </form>
    </div>
  );
}
