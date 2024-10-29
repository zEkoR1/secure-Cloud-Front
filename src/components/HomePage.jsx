import "../App.css";
import Topbar from "./TopBar/TopBar";
import Sidebar from "./Sidebar/Sidebar";
import MainDiv from "./MainDiv/MainDiv";
import { useTheme } from "./ThemeContext";
import styles from "./HomePage.module.css";
export default function HomePage() {
  const { theme } = useTheme();

  return (
    <div className={theme === "dark" ? "dark-theme" : ""}>
      <Topbar />
      <div className={styles.div}>
        <Sidebar />
        <MainDiv />
      </div>
    </div>
  );
}
