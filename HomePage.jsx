import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { UserIcon, Search } from "lucide-react";

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const [newsIndex, setNewsIndex] = useState(0);
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const newsItems = [
    "Мұғалімдердің зерттеуі бойынша жаңа әдіс табылды",
    "Педагогикалық тәжірибе нәтижесі жарияланды",
    "Жаңа мақалалар мен зерттеулер сайтқа қосылды",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setNewsIndex((prev) => (prev + 1) % newsItems.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === "kk" ? "ru" : "kk");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-montserrat">
      {/* Жоғарғы бөлім */}
      <header className="bg-blue-800 text-white flex justify-between items-start px-10 pt-6 pb-4  shadow-md">
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

    {/* Жаңалықтар баннері */}
<main className="flex-1 flex items-center justify-center">
  <img
    src="/assets/фон1.jpg"
    alt="Banner"
    className="w-full h-[820px] object-cover shadow-md"
  />
</main>
    </div>
  );
}
