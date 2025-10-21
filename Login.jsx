import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.email || !form.password) {
    setError("Email және құпиясөз қажет.");
    return;
  }

  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", form);
    console.log("Серверден келген жауап:", res.data);

    const { token, user } = res.data;

    // ✅ Түзетілген: token мен user бөлек сақтау
   localStorage.setItem("token", token);
localStorage.setItem("user", JSON.stringify(user));

    navigate("/homepage");
  } catch (err) {
    setError("Қате: " + (err.response?.data?.message || "Кіру мүмкін болмады"));
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Кіру</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Құпиясөз"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
          required
        />

        {/* Құпия сөзді ұмыттыңыз ба? сілтемесі */}
        <div className="flex justify-center mb-4">
  <Link
    to="/forgot-password"
    className="text-sm text-blue-600 hover:underline"
  >
    Құпия сөзді ұмыттыңыз ба?
  </Link>
</div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Кіру
        </button>
      </form>
    </div>
  );
}
