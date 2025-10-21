import { useEffect, useState } from "react";
import { Search, User as UserIcon, PlusCircle, Trash2 } from "lucide-react";
import i18n from "../i18n";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResearchProcess() {
  const [researchData, setResearchData] = useState(null);
  const [methodForms, setMethodForms] = useState([]);
  const [surveyQuestions, setSurveyQuestions] = useState([
    { question: "", options: [""], selectedOptions: [] },
  ]);
  const [interviewQuestions, setInterviewQuestions] = useState([
    { question: "", answer: "" },
  ]);
  const [documents, setDocuments] = useState([{ name: "", file: null }]);
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user"));
  console.log("storedUser:", storedUser);

  // 🧩 researchData жүктеу
  useEffect(() => {
    const saved = localStorage.getItem("researchData"); // ✅ кілт сәйкестендірілді
    if (saved) {
      const form = JSON.parse(saved);
      setResearchData({
        question: form.question || "",
        goal: form.goal || "",
        tasks: form.tasks || "",
        methods: form.methods || [],
      });
    }
  }, []);

  // 📝 Сауалнама
  const addSurveyQuestion = () => {
    setSurveyQuestions([
      ...surveyQuestions,
      { question: "", options: [""], selectedOptions: [] },
    ]);
  };

  const removeSurveyQuestion = (index) => {
    const updated = [...surveyQuestions];
    updated.splice(index, 1);
    setSurveyQuestions(updated);
  };

  const handleSurveyChange = (index, field, value, optIndex = null) => {
    const updated = [...surveyQuestions];
    if (field === "question") {
      updated[index].question = value;
    } else if (field === "option") {
      updated[index].options[optIndex] = value;
    }
    setSurveyQuestions(updated);
  };

  const toggleOption = (qIdx, opt) => {
    const updated = [...surveyQuestions];
    const selected = updated[qIdx].selectedOptions;
    if (selected.includes(opt)) {
      updated[qIdx].selectedOptions = selected.filter((o) => o !== opt);
    } else {
      updated[qIdx].selectedOptions.push(opt);
    }
    setSurveyQuestions(updated);
  };

  const addSurveyOption = (index) => {
    const updated = [...surveyQuestions];
    updated[index].options.push("");
    setSurveyQuestions(updated);
  };

  // 🗣 Сұқбат
  const addInterviewQuestion = () => {
    setInterviewQuestions([...interviewQuestions, { question: "", answer: "" }]);
  };

  const removeInterviewQuestion = (index) => {
    const updated = [...interviewQuestions];
    updated.splice(index, 1);
    setInterviewQuestions(updated);
  };

  const handleInterviewChange = (index, field, value) => {
    const updated = [...interviewQuestions];
    updated[index][field] = value;
    setInterviewQuestions(updated);
  };

  // 📄 Құжат
  const handleDocumentChange = (index, field, value) => {
    const updated = [...documents];
    if (field === "name") {
      updated[index].name = value;
    } else if (field === "file") {
      updated[index].file = value.target.files[0];
    }
    setDocuments(updated);
  };

  const addNewDocument = () => {
    setDocuments([...documents, { name: "", file: null }]);
  };

  const removeDocument = (index) => {
    const updated = [...documents];
    updated.splice(index, 1);
    setDocuments(updated);
  };

  // 🔥 Жариялау
  const handlePublish = async () => {
    console.log("✅ Жариялау батырмасы басылды");

    if (!researchData) {
      alert("Зерттеу мәліметтері жүктелмеген.");
      return;
    }

    const { question, goal, tasks, methods } = researchData;

    if (!question || !goal || !tasks || !methods || methods.length === 0) {
      alert("Барлық деректерді дұрыс толтырылғанын тексеріңіз.");
      return;
    }

    // 📦 JSON форматындағы таза деректер
    const payload = {
      ...researchData,
      survey: surveyQuestions,
      interviews: interviewQuestions,
      documents: documents.map((d) => ({ name: d.name })),
      createdBy: storedUser?._id || null,
    };

    console.log("📦 Жіберілетін деректер:", payload);

    try {
      const response = await axios.post("http://localhost:5000/api/researches", payload);
      console.log("✅ Зерттеу жарияланды:", response.data);
      alert("Зерттеу сәтті жарияланды!");
      navigate("/my-research");
    } catch (error) {
      console.error("❌ Жариялау қатесі:", error.response?.data || error.message);
      alert("Жариялау кезінде қате пайда болды. Консольді тексеріңіз.");
    }
  };

  // 🧩 Әдістерге сай формалар көрсету
  useEffect(() => {
    if (researchData?.methods?.length) {
      const forms = researchData.methods.map((method) => {
        switch (method.toLowerCase()) {
          case "сауалнама":
            return (
              <div key={method} className="border p-4 rounded bg-blue-50">
                <h3 className="text-xl font-semibold mb-4">Сауалнама сұрақтары</h3>
                {surveyQuestions.map((q, idx) => (
                  <div key={idx} className="mb-6 border-b pb-3">
                    <input
                      type="text"
                      placeholder={`Сұрақ ${idx + 1}`}
                      className="w-full p-2 border rounded mb-2"
                      value={q.question}
                      onChange={(e) => handleSurveyChange(idx, "question", e.target.value)}
                    />
                    {q.options.map((opt, optIdx) => (
                      <div key={optIdx} className="flex items-center gap-2 mb-1">
                        <input
                          type="checkbox"
                          checked={q.selectedOptions.includes(opt)}
                          onChange={() => toggleOption(idx, opt)}
                        />
                        <input
                          type="text"
                          placeholder={`Нұсқа ${optIdx + 1}`}
                          className="w-full p-2 border rounded"
                          value={opt}
                          onChange={(e) =>
                            handleSurveyChange(idx, "option", e.target.value, optIdx)
                          }
                        />
                      </div>
                    ))}
                    <div className="flex justify-between mt-2">
                      <button
                        onClick={() => addSurveyOption(idx)}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        + Нұсқа қосу
                      </button>
                      <button
                        onClick={() => removeSurveyQuestion(idx)}
                        className="text-red-600 hover:underline text-sm flex items-center gap-1"
                      >
                        <Trash2 size={16} /> Өшіру
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={addSurveyQuestion}
                  className="flex items-center gap-2 text-blue-700 hover:text-blue-900 mt-2"
                >
                  <PlusCircle className="w-5 h-5" /> Жаңа сұрақ қосу
                </button>
              </div>
            );

          case "бақылау":
            return (
              <div key={method} className="border p-4 rounded bg-purple-50">
                <h3 className="text-xl font-semibold mb-2">Бақылау күнделігі</h3>
                <textarea
                  placeholder="Күнделікке жазба енгізіңіз..."
                  className="w-full p-2 border rounded"
                  rows={3}
                />
              </div>
            );

          case "сұқбат":
            return (
              <div key={method} className="border p-4 rounded bg-green-50">
                <h3 className="text-xl font-semibold mb-4">Сұқбат сұрақтары мен жауаптары</h3>
                {interviewQuestions.map((qna, idx) => (
                  <div key={idx} className="mb-4 space-y-2 border-b pb-3">
                    <textarea
                      placeholder={`Сұрақ ${idx + 1}`}
                      className="w-full p-2 border rounded"
                      rows={2}
                      value={qna.question}
                      onChange={(e) => handleInterviewChange(idx, "question", e.target.value)}
                    />
                    <textarea
                      placeholder="Жауап жазыңыз..."
                      className="w-full p-2 border rounded"
                      rows={3}
                      value={qna.answer}
                      onChange={(e) => handleInterviewChange(idx, "answer", e.target.value)}
                    />
                    <button
                      onClick={() => removeInterviewQuestion(idx)}
                      className="text-red-600 hover:underline text-sm flex items-center gap-1"
                    >
                      <Trash2 size={16} /> Өшіру
                    </button>
                  </div>
                ))}
                <button
                  onClick={addInterviewQuestion}
                  className="flex items-center gap-2 text-green-700 hover:text-green-900"
                >
                  <PlusCircle className="w-5 h-5" /> Жаңа сұрақ қосу
                </button>
              </div>
            );

          case "талдау":
            return (
              <div key={method} className="border p-4 rounded bg-red-50 space-y-4 w-[350px]">
                <h3 className="text-xl font-semibold mb-2">Құжатты талдау</h3>
                {documents.map((doc, idx) => (
                  <div key={idx} className="space-y-2 border-b pb-3">
                    <input
                      type="text"
                      placeholder="Құжат атауы"
                      className="w-full p-2 border rounded"
                      value={doc.name}
                      onChange={(e) => handleDocumentChange(idx, "name", e.target.value)}
                    />
                    <input
                      type="file"
                      className="w-full p-2 border rounded bg-white"
                      onChange={(e) => handleDocumentChange(idx, "file", e)}
                    />
                    <button
                      onClick={() => removeDocument(idx)}
                      className="text-red-600 hover:underline text-sm flex items-center gap-1"
                    >
                      <Trash2 size={16} /> Өшіру
                    </button>
                  </div>
                ))}
                <button
                  onClick={addNewDocument}
                  className="text-sm text-red-600 hover:underline"
                >
                  + Құжат қосу
                </button>
              </div>
            );

          default:
            return null;
        }
      });
      setMethodForms(forms);
    }
  }, [researchData, documents, surveyQuestions, interviewQuestions]);

  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === "kk" ? "ru" : "kk");
  };

  if (!researchData) {
    return <div className="p-6 text-red-600">Зерттеу мәліметтері табылмады.</div>;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-montserrat">
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
            <UserIcon className="w-6 h-6" /> Жеке кабинет
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

      <main className="max-w-7xl mx-auto bg-white p-6 mt-6 rounded-xl shadow space-y-6">
        <h2 className="text-3xl font-bold text-blue-800 mb-4">Зерттеу барысы</h2>

        <div className="flex flex-row gap-6 items-start">
          <div className="w-[35%] space-y-4">
            <p><strong>🔍 Зерттеу сұрағы:</strong> {researchData.question}</p>
            <p><strong>🎯 Мақсаты:</strong> {researchData.goal}</p>
            <p><strong>📌 Міндеттері:</strong> {researchData.tasks}</p>
            <div>
              <strong>🛠 Әдістері:</strong>
              <ul className="list-disc ml-6 mt-2">
                {researchData.methods.map((method, idx) => (
                  <li key={idx}>{method}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-[65%] flex flex-wrap gap-6 justify-start items-start">
            {methodForms.map((form, index) => (
              <div key={index} className="min-w-[300px] max-w-[350px] flex-1">{form}</div>
            ))}
          </div>
        </div>

        <div className="flex justify-between pt-6 border-t mt-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400"
          >
            ← Артқа
          </button>
          <button
            onClick={handlePublish}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Жариялау →
          </button>
        </div>
      </main>
    </div>
  );
}
