import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { UserIcon, Search, Pencil } from "lucide-react";
import { Link } from "react-router-dom";

export default function Profile() {
  const { t, i18n } = useTranslation();
  const [user, setUser] = useState(null);
  const [newsIndex, setNewsIndex] = useState(0);

  const newsItems = [
    "Мұғалімдердің зерттеуі бойынша жаңа әдіс табылды",
    "Педагогикалық тәжірибе нәтижесі жарияланды",
    "Жаңа мақалалар мен зерттеулер сайтқа қосылды",
  ];

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    const interval = setInterval(() => {
      setNewsIndex((prev) => (prev + 1) % newsItems.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === "kk" ? "ru" : "kk");
  };

  if (!user) {
    return (
      <div className="text-center mt-20 text-xl font-semibold text-red-600">
        Пайдаланушы табылмады
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-montserrat">
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
            <UserIcon className="w-6 h-6" /> Жеке кабинет
          </a>
          <button
            onClick={() => {
              localStorage.removeItem("user");
              window.location.href = "/";
            }}
            className="bg-red-600 text-white px-4 py-2 rounded text-md hover:bg-red-700 transition"
          >
            Шығу
          </button>
        </div>
      </header>

      {/* Навигация */}
      <nav className="bg-white px-10 py-4 flex flex-wrap gap-8 text-blue-800 font-semibold text-lg shadow-sm">
        <a href="/homepage">Басты бет</a>
        <a href="/research">Зерттеу жұмыстары</a>
        {user?.role !== "student" && (
          <a href="/my-research">Менің зерттеулерім</a>
        )}
        <a href="/articles">Мақалалар</a>
        <a href="/news">Жаңалықтар</a>
        <a href="/konkurs">Байқаулар</a>
        <a href="/help">Қолдау қызметі</a>
      </nav>

      {/* Профиль бөлімі */}
      <div className="w-full px-10 py-16">
        <div className="max-w-6xl mx-auto bg-white p-10 rounded-3xl shadow-xl border border-gray-200">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold text-blue-800">
              👤 Жеке кабинет
            </h2>
            <a
              href="/edit-profile"
              className="flex items-center gap-2 text-blue-700 hover:text-blue-900 font-semibold"
            >
              <Pencil className="w-5 h-5" /> Деректерді өзгерту
            </a>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Сурет */}
            <div className="flex-shrink-0 flex justify-center lg:justify-start">
              {user.photo ? (
                <img
                  src={`http://localhost:5000/uploads/${user.photo}`}
                  alt="Пайдаланушы суреті"
                  className="w-60 h-80 object-cover shadow-lg border-4 border-blue-300"
                />
              ) : (
                <div className="w-60 h-80 bg-gray-200 flex items-center justify-center text-6xl text-gray-600 shadow-lg">
                  ?
                </div>
              )}
            </div>

            {/* Деректер */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 text-lg">
              <div>
                <p className="font-semibold text-gray-700">Аты-жөні:</p>
                <p className="text-blue-900 text-2xl">{user.fullName}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">Email:</p>
                <p className="text-blue-900 text-2xl">{user.email}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">Рөлі:</p>
                <p className="text-blue-900 text-2xl">
                  {user.role === "teacher" ? "Педагог" : "Оқушы"}
                </p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">Оқу орны:</p>
                <p className="text-blue-900 text-2xl">{user.organization}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">Жынысы:</p>
                <p className="text-blue-900 text-2xl">
                  {user.gender === "male" ? "Ер" : "Әйел"}
                </p>
              </div>

              <div>
                  <p className="font-semibold text-gray-700">Туған күні:</p>
  <p className="text-blue-900 text-2xl">
    {user.birthDate || "—"}
  </p>
              </div>

              {user.role === "teacher" && (
                <>
                  <div>
                    <p className="font-semibold text-gray-700">Мамандығы:</p>
                    <p className="text-blue-900 text-2xl">{user.specialty}</p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-700">Еңбек өтілі:</p>
                    <p className="text-blue-900 text-2xl">{user.experience} жыл</p>
                  </div>
                </>
              )}

              {user.role === "student" && (
                <>
                  <div>
                    <p className="font-semibold text-gray-700">Сыныбы/курсы:</p>
                    <p className="text-blue-900 text-2xl">{user.grade}</p>
                  </div>

                  {user.teacher && (
                    <div>
                      <p className="font-semibold text-gray-700">Жетекші мұғалімі:</p>
                      <p className="text-blue-900 text-2xl">{user.teacher}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
