import styles from "./MainDiv.module.css";
import {useMemo } from "react";
import { useTheme } from "../ThemeContext";
export default function MainDiv() {
  const { isSidebarOpen } = useTheme();
  const mainDivClassName = useMemo(() => {
    return `${styles.mainDiv} ${isSidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}`;
  }, [isSidebarOpen]);

  return (
    // <div className={styles.mainContent}>
      <div
        className={mainDivClassName}
        
      >

      </div>
    // </div>
  );
}