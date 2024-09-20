import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { useTheme } from "./components/ThemeContext";
import { ThemeProvider } from "./components/ThemeContext";
import WelcomePage from "./components/WelcomePage/WelcomePage";
import HomePage from "./components/HomePage";
function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}
function ThemedApp() {
  const { theme } = useTheme();
  document.body.className = theme === "dark" ? "dark-theme" : "";

  return (
    <div className={theme === "dark" ? "dark-theme" : ""}>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
//  Login Page ( поля раздвинуть логин и пароль);
// Закругления уменьшить, поля сделать менее выраженными 72727  или #dedede
// homePage дефолтную картинку нахуй, при ъовере анимация
// анимация на фон
// уборать андерлайн под Files | Roles
