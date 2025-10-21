import { Link } from "react-router-dom";
import bgImage from "../assets/1.png";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <img
        src={bgImage}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover z-[-2]"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-[-1]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-6 text-white">
        <h1 className="text-7xl md:text-8xl font-bold mb-4">«Ұстаз – ұлы тұлға»</h1>
        <p className="mb-7 max-w-3xl text-xl md:text-2xl">
  Бұл сайт мұғалімдердің ғылыми-зерттеу белсенділігін арттыру үшін жасалған.
          </p>
        <div className="flex gap-4">
          <Link to="/login">
            <button className="bg-white text-blue-900 font-semibold py-6 px-10 rounded-full hover:bg-gray-200 transition">
              Кіру
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-transparent border border-white text-white py-5 px-10 rounded-full hover:bg-white hover:text-blue-900 transition">
              Тіркелу
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}