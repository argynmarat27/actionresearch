import { FileText, Target, ClipboardList, BarChart } from "lucide-react";

export default function InfoBlock() {
  return (
    <div className="grid gap-6 p-6 bg-white rounded-2xl shadow-md mt-10">
      <div className="flex items-start gap-4">
        <FileText className="text-blue-600" size={28} />
        <div>
          <h3 className="text-lg font-semibold">🧠 Зерттеу тақырыбы</h3>
          <p className="text-gray-600">
            Бұл зерттеу жұмысының негізгі бағытын көрсететін бөлім. Мұнда нақты, анық әрі қысқа тақырып жазылады.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <Target className="text-green-600" size={28} />
        <div>
          <h3 className="text-lg font-semibold">🎯 Мақсаты</h3>
          <p className="text-gray-600">
            Сіздің зерттеуіңіздің неге бағытталғанын, қандай нәтиже күтетініңізді сипаттаңыз.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <ClipboardList className="text-orange-600" size={28} />
        <div>
          <h3 className="text-lg font-semibold">🛠️ Құралдар</h3>
          <p className="text-gray-600">
            Сауалнама, сұхбат, бақылау немесе басқа әдістерді қалай қолданатыныңызды көрсетіңіз.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <BarChart className="text-purple-600" size={28} />
        <div>
          <h3 className="text-lg font-semibold">📊 Нәтижелер</h3>
          <p className="text-gray-600">
            Зерттеу барысында алынған деректерді диаграмма, график немесе кесте арқылы беріңіз.
          </p>
        </div>
      </div>
    </div>
  );
}
