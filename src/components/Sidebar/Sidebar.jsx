import styles from "./Sidebar.module.css";
import TextButton from "../Button/TextButton";
import { useState } from "react";
import { IoPlayOutline } from "react-icons/io5";
import DropDown from "./DropDown";
import Files from "../Files&Roles/Files";
import testData from "../../testData.json";
import {useTheme} from "../ThemeContext"
export default function Sidebar() {
  const [showPopUp, setShowPopUp] = useState(false);
  const [activePage, setActivePage] = useState("files");
  const {isSidebarOpen, toggleSidebar} = useTheme();



  const handleDropdownToggle = (e) => {
    e.stopPropagation();
    setShowPopUp((prevState) => !prevState);
  };

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  return (
    <aside className={`${styles.sidebarDiv} ${isSidebarOpen ? "" : styles.closed}`}>
      <div className={styles.upperPart}>
        <h1 className={styles.sectionName}>Ffiles</h1>
        <div className={styles.buttonGroup}>
          <button
            onClick={() => handlePageChange("files")}
            className={
              activePage === "files" ? styles.activeButton : styles.notActive
            }
          >
            Files{" "}
          </button>
          <div className={styles.verticalDivider}></div>
          <button
            onClick={() => handlePageChange("roles")}
            className={
              activePage === "roles" ? styles.activeButton : styles.notActive
            }
          >
            Roles{" "}
          </button>
        </div>
      </div>
      <div
        className={styles.horizontalDivider}
      ></div>
      <div className={styles.selectBar}>
        <TextButton text={"Select All"} />
        <div className={styles.verticalDivider}></div>
        <TextButton text={"Close all folders"} />
      </div>
      <div
        className={`${styles.horizontalDivider} ${
          !isSidebarOpen ? styles.hidden : ""
        }`}
      ></div>
      <div className={styles.closeButtonContainer}>
        <div className={styles.verticalLine}></div>
        <svg
          onClick={toggleSidebar}
          className={`${styles.closeIcon} ${
            isSidebarOpen ? styles.closeButtonOpen : styles.closeButtonClosed
          }`}
          viewBox="0 0 20 28"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className={styles.closeIconPath}
            d="M2 14L18.5 1.87564L18.5 26.1244L2 14Z"
          />
        </svg>


        <div className={`${styles.verticalLine} ${styles.bottom}`}></div>
      </div>
      {/* <div className={`${styles.horizontalDivider} ${styles.bottomLine}`}></div> */}

      <div className={styles.bottomPart}>
        <div className={styles.profileIcon}></div> {/* Profile Icon */}
        <DropDown
          showPopUp={showPopUp}
          handleDropdownToggle={handleDropdownToggle}
        />
      </div>

      <div className={styles.content}>
        {activePage === "files" && <Files data={testData.items} />}
        {activePage === "roles" && <div>Roles Page Content</div>}
      </div>
    </aside>
  );
}
