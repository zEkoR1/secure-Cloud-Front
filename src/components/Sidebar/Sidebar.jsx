import styles from "./Sidebar.module.css";
import TextButton from "../Button/TextButton";
import { useState } from "react";
import closeButton from "../../assets/closeButtpn.svg";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside className={`${styles.sidebarDiv} ${isOpen ? "" : styles.closed}`}>
      <div className={styles.upperPart}>
        <h1 className={styles.sectionName}>Files</h1>
        <div className={styles.buttonGroup}>
          <TextButton text={"Files"} />
          <div className={`${styles.horizontalDivider} ${!isOpen ? styles.hidden : ""}`}></div>
          <TextButton text={"Roles"} />
        </div>
      </div>
      <div className={`${styles.horizontalDivider} ${!isOpen ? styles.hidden : ""}`}></div>
      <div className={styles.selectBar}>
        <TextButton text={"Select All"} />
        <div className={styles.verticalDivider}></div>
        <TextButton text={"Close all folders"} />
      </div>
      <div className={`${styles.horizontalDivider} ${!isOpen ? styles.hidden : ""}`}></div>
      <div className={styles.closeButtonContainer}>
        <div className={styles.verticalLine}></div>
        <button
          className={`${styles.closeButton} ${
            isOpen ? styles.closeButtonOpen : styles.closeButtonClosed
          }`}
          onClick={toggleSidebar}
        >
          <img src={closeButton} alt="close button" />
        </button>
        <div className={`${styles.verticalLine} ${styles.bottom}`}></div>
      </div>
    </aside>
  );
}