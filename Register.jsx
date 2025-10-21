import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [role, setRole] = useState("teacher");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    organization: "",
    specialty: "",
    experience: "",
    grade: "",
    teacher: "",
    gender: "",
    birthdate: "",
    photo: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (
    !formData.fullName ||
    !formData.email ||
    !formData.password ||
    !formData.organization ||
    !formData.gender ||
    !formData.birthdate ||
    (role === "teacher" && (!formData.specialty || !formData.experience)) ||
    (role === "student" && !formData.grade)
  ) {
    toast.error("Барлық міндетті өрістерді толтырыңыз!");
    return;
  }

  try {
    const data = new FormData();
    data.append("role", role);
    Object.keys(formData).forEach((key) => {
      if (formData[key]) data.append(key, formData[key]);
    });

    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      body: data,
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Тіркелу кезінде қате болды");
    }

    toast.success("Поштаңызды растаңыз! Сілтеме жіберілді.");
    setTimeout(() => navigate("/login"), 3000);
  } catch (err) {
    toast.error(err.message || "Қате орын алды");
  }
};

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-900 to-blue-600 text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black p-8 rounded-xl shadow-lg max-w-md w-full space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Тіркелу</h2>

        {/* Рөл таңдау */}
        <div className="flex gap-4 justify-center">
          <label>
            <input
              type="radio"
              name="role"
              value="teacher"
              checked={role === "teacher"}
              onChange={() => setRole("teacher")}
            />
            <span className="ml-2">Педагог</span>
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="student"
              checked={role === "student"}
              onChange={() => setRole("student")}
            />
            <span className="ml-2">Оқушы</span>
          </label>
        </div>

        {/* Міндетті өрістер */}
        <input
          type="text"
          name="fullName"
          placeholder="Аты-жөні *"
          required
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Электронды пошта *"
          required
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Құпиясөз *"
          required
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="organization"
          placeholder="Оқу орны *"
          required
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <select
          name="gender"
          required
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Жынысы *</option>
          <option value="male">Ер</option>
          <option value="female">Әйел</option>
        </select>

        <input
          type="date"
          name="birthdate"
          required
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        {/* Педагогқа арналған */}
        {role === "teacher" && (
          <>
            <input
              type="text"
              name="specialty"
              placeholder="Мамандығы *"
              required
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="number"
              name="experience"
              placeholder="Еңбек өтілі (жыл) *"
              required
              min="0"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </>
        )}

        {/* Оқушыға арналған */}
        {role === "student" && (
          <>
            <input
              type="text"
              name="grade"
              placeholder="Сыныбы немесе курсы *"
              required
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="teacher"
              placeholder="Жетекші мұғалімі (қаласа)"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </>
        )}

        <button
          type="submit"
          className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Тіркелу
        </button>
      </form>

      {/* Хабарлама контейнері */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}  