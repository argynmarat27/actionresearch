import { useEffect, useState } from "react";
import { Search, User as UserIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import i18n from "../i18n";

export default function ResearchMethod() {
  const [data, setData] = useState(null);
  const [goal, setGoal] = useState("");
  const [tasks, setTasks] = useState("");
  const [methods, setMethods] = useState([]);
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const saved = localStorage.getItem("researchData");
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  const changeLanguage = () => {
    const newLang = i18n.language === "kk" ? "ru" : "kk";
    i18n.changeLanguage(newLang);
  };

  const handleMethodChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setMethods((prev) => [...prev, value]);
    } else {
      setMethods((prev) => prev.filter((method) => method !== value));
    }
  };

  const handleStart = () => {
    if (!goal || !tasks || methods.length === 0) {
      alert("Барлық өрістерді толтырыңыз және кем дегенде бір әдіс таңдаңыз.");
      return;
    }

    const updated = {
      ...data,
      goal,
      tasks,
      methods,
    };

   localStorage.setItem("researchData", JSON.stringify(updated));
    navigate("/research-process");
  };

  const handleBack = () => {
    navigate(-1); // Алдыңғы бетке оралу
  };

  if (!data) {
    return <div className="p-6 text-red-600">Зерттеу мәліметі табылмады.</div>;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-montserrat">
      {/* Header */}
      <header className="bg-blue-800 text-white flex justify-between items-start px-10 pt-6 pb-4 shadow-md">
        <div className="flex items-start gap-4">
          <img src="/assets/2.png" alt="icon" className="w-20 h-20 object-contain" />
          <div>
            <h1 className="text-5xl font-bold uppercase">ACTION RESEARCH</h1>
            <p className="mt-1 text-lg">Зерттеуші педагогтар үшін арналған платформа</p>
          </div>
        </div>

        <div className="flex gap-4 items-center mt-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Іздеу..."
              className="w-80 rounded px-4 py-2 pr-30 text-black text-md shadow"
            />
            <Search className="w-5 h-5 absolute top-3 right-3 text-gray-500" />
          </div>

          <button
            onClick={changeLanguage}
            className="bg-white text-blue-800 font-semibold px-4 py-2 rounded text-md"
          >
            {i18n.language === "kk" ? "RU" : "ҚАЗ"}
          </button>

          <a
            href="/dashboard"
            className="flex items-center gap-2 text-lg font-semibold hover:text-blue-300 transition"
          >
            <UserIcon className="w-6 h-6" />
            Жеке кабинет
          </a>

          {storedUser && (
            <button
              onClick={() => {
                localStorage.removeItem("user");
                window.location.href = "/";
              }}
              className="bg-red-600 text-white px-4 py-2 rounded text-md hover:bg-red-700 transition"
            >
              Шығу
            </button>
          )}
        </div>
      </header>

      {/* Навигация */}
      <nav className="bg-white px-10 py-4 flex flex-wrap gap-8 text-blue-800 font-semibold text-lg border-b">
        <a href="/homePage">Басты бет</a>
        <a href="/research">Зерттеу жұмыстары</a>
        {storedUser?.role !== "student" && <a href="/my-research">Менің зерттеулерім</a>}
        <a href="/articles">Мақалалар</a>
        <a href="/news">Жаңалықтар</a>
        <a href="/konkurs">Байқаулар</a>
        <a href="/help">Қолдау қызметі</a>
      </nav>

      {/* Main content */}
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded space-y-6">
        <h1 className="text-3xl font-bold text-blue-800 mb-4">Іс-әрекеттегі зерттеу</h1>

        <div className="text-lg space-y-4">
          <p><strong>🔍 Зерттеу сұрағы:</strong> {data.question}</p>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">🎯 Зерттеу мақсаты:</label>
          <textarea
            rows={3}
            className="w-full border rounded px-4 py-2"
            placeholder="Мақсатыңызды жазыңыз..."
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">📌 Зерттеу міндеттері:</label>
          <textarea
            rows={3}
            className="w-full border rounded px-4 py-2"
            placeholder="Міндеттеріңізді жазыңыз..."
            value={tasks}
            onChange={(e) => setTasks(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">🛠 Зерттеу әдістерін таңдаңыз:</label>
          <div className="space-y-2">
            {["Сауалнама", "Сұқбат", "Бақылау", "Талдау"].map((method) => (
              <label key={method} className="flex items-center gap-2 text-gray-700">
                <input
                  type="checkbox"
                  value={method}
                  checked={methods.includes(method)}
                  onChange={handleMethodChange}
                  className="w-5 h-5"
                />
                {method}
              </label>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded"
          >
            ← Артқа
          </button>

          <button
            onClick={handleStart}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded"
          >
            Бастау →
          </button>
        </div>
      </div>
    </div>
  );
}
