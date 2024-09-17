import "./App.css";
import LoginPage from "./components/Login&Register&RecoveryPage/LoginPage";
import RegisterPage from "./components/Login&Register&RecoveryPage/RegisterPage";
import { ThemeProvider } from "./components/ThemeContext";
import Recovery from "./components/Login&Register&RecoveryPage/Recovery";
import Sidebar from "./components/Sidebar/Sidebar";
import Topbar from "./components/Topbar/Topbar.jsx";
import WelcomePage from "./components/WelcomePage/WelcomePage";
import styles from "./aaa.module.css"
function App() {
  return (
    <ThemeProvider>
      <Topbar />
      <Sidebar />
      <div className="mainContent">
        {/* <LoginPage />
        <RegisterPage />
        <Recovery /> */}
        <div className={styles.fast}> </div>
      </div>
      {/* <WelcomePage /> */}
    </ThemeProvider>
  );
}

export default App;

