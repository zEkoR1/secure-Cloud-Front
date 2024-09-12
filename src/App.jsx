import "./App.css";
import LoginPage from "./components/Login&Register&RecoveryPage/LoginPage";
import RegisterPage from "./components/Login&Register&RecoveryPage/RegisterPage";
import { ThemeProvider } from "./components/ThemeContext";
import Recovery from "./components/Login&Register&RecoveryPage/Recovery";
import Sidebar from "./components/Sidebar/Sidebar";
import WelcomePage from "./components/WelcomePage/WelcomePage";
function App() {
  return (
    <ThemeProvider>
      <Sidebar /> 
       <div className="mainContent">
        <LoginPage />
        <RegisterPage />
        <Recovery />
      </div>
      {/* <WelcomePage /> */}
    </ThemeProvider>
  );
}

export default App;

