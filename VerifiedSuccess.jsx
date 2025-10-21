import { useNavigate } from "react-router-dom";

export default function VerifiedSuccess() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-900">
          Поштаңыз сәтті расталды!
        </h1>
        <p className="text-center text-gray-700 mb-6">
          <span className="font-semibold">  Енді жүйеге кіре аласыз</span>
        </p>
        <button
          onClick={() => navigate("/login")}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Кіру
        </button>
      </div>
    </div>
  );
}
