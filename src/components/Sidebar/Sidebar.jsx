import styles from "./Sidebar.module.css";
import TextButton from "../Button/TextButton";
import { useState } from "react";
import { IoPlayOutline } from "react-icons/io5";
import DropDown from "./DropDown";
import Files from "../Files&Roles/Files";
import testData from "../../testData.json";
export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [showPopUp, setShowPopUp] = useState(false);
  const [activePage, setActivePage] = useState("files"); 


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleDropdownToggle = (e) => {
    e.stopPropagation(); 
    setShowPopUp(prevState => !prevState);
  };

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  return (
    <aside className={`${styles.sidebarDiv} ${isOpen ? "" : styles.closed}`}>
      <div className={styles.upperPart}>
        <h1 className={styles.sectionName}>Files</h1>
        <div className={styles.buttonGroup}>
          <TextButton
            text={"Files"}
            onClick={() => handlePageChange("files")}
            className={activePage === "files" ? styles.activeButton : ""}
          />
          <div className={styles.verticalDivider}></div>
          <TextButton
            text={"Roles"}
            onClick={() => handlePageChange("roles")}
            className={activePage === "roles" ? styles.activeButton : ""}
          />
        </div>
      </div>
      <div
        className={`${styles.horizontalDivider} ${
          !isOpen ? styles.hidden : ""
        }`}
      ></div>
      <div className={styles.selectBar}>
        <TextButton text={"Select All"} />
        <div className={styles.verticalDivider}></div>
        <TextButton text={"Close all folders"} />
      </div>
      <div
        className={`${styles.horizontalDivider} ${
          !isOpen ? styles.hidden : ""
        }`}
      ></div>
      <div className={styles.closeButtonContainer}>
        <div className={styles.verticalLine}></div>
        <button
          className={`${styles.closeButton} ${
            isOpen ? styles.closeButtonOpen : styles.closeButtonClosed
          }`}
          onClick={toggleSidebar}
        >
          <IoPlayOutline className={styles.closeIcon} size={40} />
        </button>
        <div className={`${styles.verticalLine} ${styles.bottom}`}></div>
      </div>
      <div className={`${styles.horizontalDivider} ${styles.bottomLine}`}></div>

      <div className={styles.bottomPart}>
        <div className={styles.profileIcon}></div> {/* Profile Icon */}
        <DropDown showPopUp={showPopUp} handleDropdownToggle={handleDropdownToggle} />
      </div>

      <div className={styles.content}>  
        {activePage === "files" && <Files data={testData.items}/>}
        {activePage === "roles" && <div>Roles Page Content</div>}
      </div>
    </aside>
  );
}
