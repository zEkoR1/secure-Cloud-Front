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
  const { isSidebarOpen, toggleSidebar } = useTheme();
  const [data, setData] = useState({}); // Initialize with an empty object
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [closeFoldersCounter, setCloseFoldersCounter] = useState(0);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/files/`, {
        credentials: 'include',
      });

      if (response.status === 401) {
        console.warn('Session expired or invalid. Redirecting to login.');
        navigate('/');
        return;
      }

      if (!response.ok) {
        const responseBody = await response.text();
        console.error("Response error:", responseBody);
        throw new Error(`Failed to fetch files: ${responseBody || "Unknown error"}`);
      }

      const fetchedData = await response.json();
      console.log("Fetched Data:", fetchedData); // Log to ensure we're getting the right structure
      setData(fetchedData.data); // Use fetchedData.data to access the items array
    } catch (error) {
      console.error("Error:", error.message || error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Helper to get all file IDs
  const getAllFileIds = (items) => {
    let ids = [];
    if (items) {
      items.forEach((item) => {
        ids.push(item.id);
        if (item.children) {
          ids = ids.concat(getAllFileIds(item.children));
        }
      });
    }
    return ids;
  };

  // Helper to get file and all child IDs
  const getFileAndChildIds = (file) => {
    let ids = [file.id];
    if (file.children) {
      file.children.forEach((child) => {
        ids = ids.concat(getFileAndChildIds(child));
      });
    }
    return ids;
  };

  // Handle Select All/Deselect All functionality
  const handleSelectAll = () => {
    const allIds = getAllFileIds(data.items || []); // Ensure we're accessing data.items
    if (selectedFiles.length === allIds.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(allIds);
    }
  };

  // Handle file or folder selection/deselection
  const toggleFileSelection = (file) => {
    const allIds = getFileAndChildIds(file); // Get all child file IDs as well
    if (selectedFiles.some((id) => allIds.includes(id))) {
      setSelectedFiles(selectedFiles.filter((id) => !allIds.includes(id)));
    } else {
      setSelectedFiles([...selectedFiles, ...allIds]);
    }
  };

  const handleCloseAllFolders = () => {
    setCloseFoldersCounter((prev) => prev + 1);
  };

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  return (
    <aside className={`${styles.sidebarDiv} ${isSidebarOpen ? "" : styles.closed}`}>
      <div className={styles.upperPart}>
        <h1 className={styles.sectionName}>Files</h1>
        <div className={styles.buttonGroup}>
          <button
            onClick={() => handlePageChange("files")}
            className={activePage === "files" ? styles.activeButton : styles.notActive}
          >
            Files
          </button>
          <div className={styles.verticalDivider}></div>
          <button
            onClick={() => handlePageChange("roles")}
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
            selectedFiles.length === getAllFileIds(data.items || []).length
              ? "Deselect All"
              : "Select All"
          }
          onClick={handleSelectAll}
        />
        <div className={styles.verticalDivider}></div>
        <TextButton text={"Close all folders"} onClick={handleCloseAllFolders} />
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
        {activePage === "files" && data.items && data.items.length > 0 ? (
          <Files
            data={data.items} // Pass the correct data to the Files component
            selectedFiles={selectedFiles}
            toggleFileSelection={toggleFileSelection}
            closeFoldersCounter={closeFoldersCounter}
          />
        ) : (
          <div>No files to display.</div>
        )}
        {activePage === "roles" && <div>Roles Page Content</div>}
      </div>
    </aside>
  );
}
