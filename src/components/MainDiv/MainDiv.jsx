// MainDiv.js
import { useTheme } from "../ThemeContext";
import { useMemo } from "react";
import styles from "./MainDiv.module.css";

export default function MainDiv() {
  const { isSidebarOpen, selectedFolder, selectFolder, navigateUp, fileData } = useTheme();

  const mainDivClassName = useMemo(() => {
    return `${styles.mainDiv} ${isSidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}`;
  }, [isSidebarOpen]);

  // Determine the current folder
  const currentFolder =
    selectedFolder.length === 0
      ? { name: "Root", children: fileData }
      : selectedFolder[selectedFolder.length - 1];

  return (
    <div className={mainDivClassName}>
      {/* Display "Go Up" button if not at root */}
      {selectedFolder.length > 0 && (
        <button onClick={navigateUp} className={styles.goUpButton}>
          Go Up
        </button>
      )}

      <h2>{currentFolder.name}</h2>

      {currentFolder.children && currentFolder.children.length > 0 ? (
        <div className={styles.folderContent}>
          {currentFolder.children.map((child) => (
            <div
              key={child.id}
              className={styles.folderItem}
              onDoubleClick={() => {
                if (child.type !== "file") {
                  selectFolder(child); // Navigate into the folder
                }
              }}
            >
              {child.type === "file" ? (
                <span>📄 {child.name}</span>
              ) : (
                <span>📁 {child.name}</span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>This folder is empty.</p>
      )}
    </div>
  );
}
