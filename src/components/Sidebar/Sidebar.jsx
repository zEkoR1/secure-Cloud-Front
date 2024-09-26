import styles from "./Sidebar.module.css";
import TextButton from "../Button/TextButton";
import { useEffect, useState } from "react";
import DropDown from "./DropDown";
import Files from "../Files&Roles/Files";
import { useTheme } from "../ThemeContext";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [activePage, setActivePage] = useState("files");
  const { isSidebarOpen, fileData, selectFolder, toggleSidebar } = useTheme();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [closeFoldersCounter, setCloseFoldersCounter] = useState(0);

  const navigate = useNavigate();

  // Helper to get all file IDs
  const getAllFileIds = (items) => {
    let ids = [];
    if (Array.isArray(items)) {
      items.forEach((item) => {
        ids.push(item.id);
        if (item.children) {
          ids = ids.concat(getAllFileIds(item.children));
        }
      });
    }
    return ids;
  };

  // Handle Select All/Deselect All functionality
  const handleSelectAll = () => {
    const allIds = getAllFileIds(fileData || []);
    if (selectedFiles.length === allIds.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(allIds);
    }
  };

  return (
    <aside className={`${styles.sidebarDiv} ${isSidebarOpen ? "" : styles.closed}`}>
      <div className={styles.upperPart}>
        <h1 className={styles.sectionName}>Files</h1>
        <div className={styles.buttonGroup}>
          <button
            onClick={() => setActivePage("files")}
            className={activePage === "files" ? styles.activeButton : styles.notActive}
          >
            Files
          </button>
          <div className={styles.verticalDivider}></div>
          <button
            onClick={() => setActivePage("roles")}
            className={activePage === "roles" ? styles.activeButton : styles.notActive}
          >
            Roles
          </button>
        </div>
      </div>
      <div className={styles.horizontalDivider}></div>
      <div className={styles.selectBar}>
        <TextButton
          text={
            selectedFiles.length === getAllFileIds(fileData || []).length
              ? "Deselect All"
              : "Select All"
          }
          onClick={handleSelectAll}
        />
        <div className={styles.verticalDivider}></div>
        <TextButton text={"Close all folders"} 
        // onClick={handleCloseAllFolders}
         />
      </div>
      <div className={`${styles.horizontalDivider} ${!isSidebarOpen ? styles.hidden : ""}`}></div>
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
          <path className={styles.closeIconPath} d="M2 14L18.5 1.87564L18.5 26.1244L2 14Z" />
        </svg>
        <div className={`${styles.verticalLine} ${styles.bottom}`}></div>
      </div>

      <div className={styles.bottomPart}>
        <div className={styles.profileIcon}></div>
        <DropDown />
      </div>

      <div className={styles.content}>
      {console.log("fileData:", fileData)}

        {activePage === "files" && fileData && fileData.length > 0 ? (
          <Files
            data={fileData}
            selectedFiles={selectedFiles}
            toggleFileSelection={(file) => {
              setSelectedFiles((prevSelectedFiles) =>
                prevSelectedFiles.includes(file.id)
                  ? prevSelectedFiles.filter((id) => id !== file.id)
                  : [...prevSelectedFiles, file.id]
              );
            }}
            closeFoldersCounter={closeFoldersCounter}
            openFolderInMainDiv={(folder) => {
              console.log("Selected folder:", folder);
              selectFolder(folder);
            }}
          />
        ) : (
          <div>No files to display.</div>
        )}
        {activePage === "roles" && <div>Roles Page Content</div>}
      </div>
    </aside>
  );
}