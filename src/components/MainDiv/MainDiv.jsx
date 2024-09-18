import styles from "./MainDiv.module.css";
import { useTheme } from "../ThemeContext";
import LoginPage from "../Login&Register&RecoveryPage/LoginPage";
export default function MainDiv() {
  const { isSidebarOpen } = useTheme();
  return (
    // <div className={styles.mainContent}>
      <div
        className={`${styles.mainDiv} ${
          isSidebarOpen ? styles.sidebarOpen : styles.sidebarClosed
        }`}
        
      >

      </div>
    // </div>
  );
}