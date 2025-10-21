import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditProfile() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "",
    specialty: "",
    experience: "",
    grade: "",
    teacher: "",
    gender: "",
    birthDate: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // 🔄 бағыттауға қажет

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) setFormData(JSON.parse(userData));
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const { _id, role, ...updateData } = formData;

      const res = await axios.put(`/api/auth/update/${_id}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Профиль сәтті жаңартылды.");
      localStorage.setItem("user", JSON.stringify(res.data));

      // 🔄 Жаңартқаннан кейін жеке кабинетке бағыттау (маршрутты өзіңізге бейімдеңіз)
      setTimeout(() => {
        navigate("/dashboard"); // немесе /cabinet, /profile т.б.
      }, 1500); // 1.5 секундтан кейін бағытталады

    } catch (err) {
      console.error("Жаңарту қатесі:", err);
      setMessage("Жаңарту кезінде қате кетті.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-center text-blue-800 mb-4">
        Профильді өзгерту
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Аты-жөні"
          className="border p-2 w-full rounded"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 w-full rounded"
        />

        {/* Рөл — тек оқу үшін */}
        <input
          type="text"
          value={formData.role === "teacher" ? "Мұғалім" : "Оқушы"}
          readOnly
          className="border p-2 w-full rounded bg-gray-100 text-gray-600"
        />

        {formData.role === "teacher" && (
          <>
            <input
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              placeholder="Мамандығы"
              className="border p-2 w-full rounded"
            />
            <input
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Тәжірибе (жыл)"
              className="border p-2 w-full rounded"
            />
          </>
        )}

        {formData.role === "student" && (
          <>
            <input
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              placeholder="Сыныбы"
              className="border p-2 w-full rounded"
            />
            <input
              name="teacher"
              value={formData.teacher}
              onChange={handleChange}
              placeholder="Мұғалімі"
              className="border p-2 w-full rounded"
            />
          </>
        )}

        {/* Жынысы — тек оқу үшін */}
        <input
          type="text"
          name="gender"
          value={
            formData.gender === "male"
              ? "Ер"
              : formData.gender === "female"
              ? "Әйел"
              : ""
          }
          readOnly
          className="border p-2 w-full rounded bg-gray-100 text-gray-600"
        />

        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Сақтау
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-green-600 font-medium">{message}</p>
      )}
    </div>
  );
}
