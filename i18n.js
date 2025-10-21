import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Екі тілге арналған аударма сөздігі
const resources = {
  kk: {
    translation: {
      welcome: "Қош келдіңіз!",
      login: "Кіру",
      register: "Тіркелу",
      logout: "Шығу",
      myResearches: "Менің зерттеулерім",
      articles: "Мақалалар",
      news: "Жаңалықтар",
      support: "Қолдау қызметі",
      dashboard: "Жеке кабинет",
      home: "Басты бет",
      // Толықтыруға болады...
    },
  },
  ru: {
    translation: {
      welcome: "Добро пожаловать!",
      login: "Вход",
      register: "Регистрация",
      logout: "Выход",
      myResearches: "Мои исследования",
      articles: "Статьи",
      news: "Новости",
      support: "Служба поддержки",
      dashboard: "Личный кабинет",
      home: "Главная",
      // Толықтыруға болады...
    },
  },
};

// i18n баптауы
i18n.use(initReactI18next).init({
  resources,
  lng: "kk", // Бастапқы тіл (қазақша)
  fallbackLng: "kk", // Егер аударма табылмаса, қазақша қолданады
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
