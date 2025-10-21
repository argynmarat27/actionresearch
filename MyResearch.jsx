import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Search, User as UserIcon, PlusCircle, Info, Edit, Trash2 } from "lucide-react";
import i18n from "../i18n";

export default function MyResearch() {
  const [researchList, setResearchList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyResearch = async () => {
      try {
        if (!storedUser || storedUser.role === "student") {
          setError("Қол жеткізуге рұқсат жоқ.");
          setLoading(false);
          return;
        }

        const token = storedUser.token; // ✅ token localStorage-дан
        const res = await axios.get(`http://localhost:5000/api/research/my/${storedUser._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setResearchList(res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Деректерді жүктеу қатесі.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyResearch();
  }, [storedUser]);

  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === "kk" ? "ru" : "kk");
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Сіз бұл зерттеуді жойғыңыз келе ме?");
    if (!confirm) return;

    try {
      const token = storedUser.token;
      await axios.delete(`http://localhost:5000/api/research/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResearchList(researchList.filter((r) => r._id !== id));
    } catch (err) {
      alert("Жою кезінде қате орын алды.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-montserrat text-lg">
      {/* Header */}
      <header className="bg-blue-800 text-white flex justify-between items-start px-10 pt-6 pb-4 shadow-md">
        <div className="flex items-start gap-4">
          <img src="/assets/2.png" alt="icon" className="w-20 h-20 object-contain" />
          <div>
            <h1 className="text-5xl font-bold uppercase text-white">ACTION RESEARCH</h1>
            <p className="mt-1 text-lg text-white">Зерттеуші педагогтар үшін арналған платформа</p>
          </div>
        </div>

        <div className="flex gap-4 items-center mt-2">
          <div className="relative">
            <input type="text" placeholder="Іздеу..." className="w-80 rounded px-4 py-2 pr-30 text-black text-md shadow"/>
            <Search className="w-5 h-5 absolute top-3 right-3 text-gray-500"/>
          </div>

          <button onClick={changeLanguage} className="bg-white text-blue-800 font-semibold px-4 py-2 rounded text-md">
            {i18n.language === "kk" ? "RU" : "ҚАЗ"}
          </button>

          <a href="/dashboard" className="flex items-center gap-2 text-lg font-semibold hover:text-blue-300 transition">
            <UserIcon className="w-6 h-6"/> Жеке кабинет
          </a>

          {storedUser && (
            <button onClick={() => { localStorage.removeItem("user"); window.location.href = "/"; }}
              className="bg-red-600 text-white px-4 py-2 rounded text-md hover:bg-red-700 transition">
              Шығу
            </button>
          )}
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white-100 px-10 py-4 flex flex-wrap gap-8 text-blue-805 font-semibold text-lg">
        <a href="/homePage">Басты бет</a>
        <a href="/research">Зерттеу жұмыстары</a>
        {storedUser?.role !== "student" && <a href="/my-research">Менің зерттеулерім</a>}
        <a href="/articles">Мақалалар</a>
        <a href="/news">Жаңалықтар</a>
        <a href="/konkurs">Байқаулар</a>
        <a href="/help">Қолдау қызметі</a>
      </nav>

      {/* Main */}
      <div className="max-w-6xl mx-auto mt-10 px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-blue-800">Менің зерттеулерім</h2>
        </div>

        {storedUser?.role === "teacher" && (
          <div className="flex justify-between items-start gap-10 mb-10">
            <button onClick={() => navigate("/create-research")}
              className="flex items-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-800 transition text-lg">
              <PlusCircle className="w-6 h-6"/> Жаңа зерттеу қосу
            </button>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded shadow flex items-start gap-3 max-w-xl">
              <Info className="text-blue-600 mt-1"/>
              <div>
                <h4 className="font-semibold text-blue-800 mb-1">Құралдар сипаттамасы</h4>
                <p className="text-sm text-gray-700">
                  Зерттеуде қолданылатын құралдарға сауалнама, сұқбат, бақылау, тест, фокус-топ сияқты әдістер кіреді.
                  Әр құралдың нәтижесі график немесе статистика түрінде көрінеді.
                </p>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <p className="text-center mt-10">Жүктелуде...</p>
        ) : error ? (
          <p className="text-center mt-10 text-red-600">{error}</p>
        ) : researchList.length === 0 ? (
          <p className="text-center text-gray-600">Әзірге зерттеу жұмысы жоқ.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {researchList.map((research) => (
              <div key={research._id} className="border rounded-lg p-5 shadow bg-white hover:shadow-md transition relative">
                <h3 className="text-xl font-semibold text-blue-700">{research.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{research.description}</p>
                <p className="text-xs text-gray-500 mt-2">Құралдар: {research.tools?.join(", ")}</p>
                <p className="text-xs text-gray-500 mt-1">Күні: {new Date(research.createdAt).toLocaleDateString("kk-KZ")}</p>
                <p className="text-xs mt-1">
                  Статус: <span className={research.published ? "text-green-600 font-semibold" : "text-yellow-600"}>
                    {research.published ? "Жарияланған" : "Жарияланбаған"}
                  </span>
                </p>

                <div className="flex gap-4 mt-4">
                  <button onClick={() => navigate(`/edit-research/${research._id}`)}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition">
                    <Edit className="w-5 h-5"/> Өңдеу
                  </button>
                  <button onClick={() => handleDelete(research._id)}
                    className="flex items-center gap-1 text-red-600 hover:text-red-800 transition">
                    <Trash2 className="w-5 h-5"/> Жою
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
