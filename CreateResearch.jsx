import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, UserIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function CreateResearch() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const { i18n } = useTranslation();

  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === "kk" ? "ru" : "kk");
  };

  // Форманы басқару
  const [formData, setFormData] = useState({
    problem: "",
    reason: "",
    solution: "",
    question: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = (e) => {
  e.preventDefault();

 const researchData = {
      title: formData.question,
      description: `${formData.problem} ${formData.reason} ${formData.solution}`,
      question: formData.question, // ✅ міндетті түрде сақтаймыз
      createdBy: storedUser?._id,
  };



// Тек негізгі мәліметтер сақталады
localStorage.setItem("researchData", JSON.stringify(researchData));

  // 🔹 Келесі бетке өту
  navigate("/research-method");
};

  if (!storedUser || storedUser.role !== "teacher") {
    return (
      <div className="text-center text-red-600 mt-10">
        Қол жеткізуге рұқсатыңыз жоқ.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-montserrat">
      {/* Жоғарғы бөлім */}
      <header className="bg-blue-800 text-white flex justify-between items-start px-10 pt-6 pb-4 shadow-md">
        <div className="flex items-start gap-4">
          <img
            src="/assets/2.png"
            alt="icon"
            className="w-20 h-20 object-contain"
          />
          <div>
            <h1 className="text-5xl font-bold uppercase text-white">
              ACTION RESEARCH
            </h1>
            <p className="mt-1 text-lg text-white">
              Зерттеуші педагогтар үшін арналған платформа
            </p>
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
      <nav className="bg-white-100 px-10 py-4 flex flex-wrap gap-8 text-blue-805 font-semibold text-lg">
        <a href="/homePage">Басты бет</a>
        <a href="/research">Зерттеу жұмыстары</a>
        {storedUser?.role !== "student" && (
          <a href="/my-research">Менің зерттеулерім</a>
        )}
        <a href="/articles">Мақалалар</a>
        <a href="/news">Жаңалықтар</a>
        <a href="/konkurs">Байқаулар</a>
        <a href="/help">Қолдау қызметі</a>
      </nav>

      {/* Зерттеу сұрағын тұжырымдау бөлімі */}
      <div className="max-w-6xl mx-auto p-6 mt-10 bg-white shadow-md rounded-lg">
        <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">
          Зерттеу сұрағын тұжырымдау
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form section */}
          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-gray-700">
                Проблеманы анықтаңыз:
              </label>
              <textarea
  name="problem"
  value={formData.problem}
  onChange={handleChange}
  className="w-full border px-4 py-2 rounded"
  rows={2}
  placeholder="Мысалы: Оқушылар сабаққа белсенді қатыспайды..."
  required
></textarea>
            </div>

            <div>
              <label className="block font-semibold text-gray-700">
                Бұл проблема неліктен туындайды?
              </label>
              <textarea
  name="reason"
  value={formData.reason}
  onChange={handleChange}
  className="w-full border px-4 py-2 rounded"
  rows={2}
  placeholder="Мысалы: Сабақ тәсілдері оқушылар қызығушылығына сай емес..."
  required
></textarea>
            </div>

            <div>
              <label className="block font-semibold text-gray-700">
                Қандай шешім жолдарын ұсынуға болады?
              </label>
             <textarea
  name="solution"
  value={formData.solution}
  onChange={handleChange}
  className="w-full border px-4 py-2 rounded"
  rows={2}
  placeholder="Мысалы: Топтық жұмыс, ойын элементтерін қосу..."
  required
></textarea>
            </div>

            <div>
              <label className="block font-semibold text-gray-700">
                Зерттеу сұрағы:
              </label>
             <textarea
  name="question"
  value={formData.question}
  onChange={handleChange}
  className="w-full border px-4 py-2 rounded"
  rows={3}
  placeholder="Мысалы: Топтық жұмыс оқушылар белсенділігіне қалай әсер етеді?"
  required
></textarea>
            </div>

            <button
              type="submit"
              className="mt-4 bg-blue-800 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition"
            >
              Әрі қарай
            </button>
          </div>

          {/* Info block */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded shadow-sm">
            <h4 className="text-xl font-semibold text-blue-800 mb-2">
              🔍 Мысалға назар аударыңыз:
            </h4>
            <ul className="list-disc list-inside text-gray-700 space-y-2 text-md">
              <li>📌 Проблема: Оқушылар сабаққа қызықпайды.</li>
              <li>📌 Себеп: Мұғалім әдістері бірсарынды.</li>
              <li>📌 Шешім: АКТ қолдану, интербелсенді тапсырмалар енгізу.</li>
              <li>📌 Сұрақ: "АКТ құралдары оқушылардың оқу белсенділігіне әсер ете ме?"</li>
            </ul>
            <p className="mt-4 italic text-gray-600">
              Сіздің сұрағыңыз мәселені шешуге бағытталған, нақты әрі өлшенетін болуы қажет.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
