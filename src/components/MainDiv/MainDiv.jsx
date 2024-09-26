import { useTheme } from "../ThemeContext";
import { useMemo } from "react";
import styles from "./MainDiv.module.css";

export default function MainDiv() {
  const { isSidebarOpen, selectedFolder } = useTheme();

  const mainDivClassName = useMemo(() => {
    return `${styles.mainDiv} ${isSidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}`;
  }, [isSidebarOpen]);

  console.log("Selected folder in MainDiv:", selectedFolder);

  return (
    <div className={mainDivClassName}>
       {/* Handle the case where selectedFolder is an array of folders  */}
      {Array.isArray(selectedFolder) && selectedFolder.length > 0 ? (
        <div>
          {selectedFolder.map((folder) => (
            <div key={folder.id}>
              <h2>{folder.name}</h2>
              {folder.children && folder.children.length > 0 ? (
                <div className={styles.folderContent}>
                  {folder.children.map((child) => (
                    <div key={child.id} className={styles.folderItem}>
                      {child.type === "file" ? <span>📄 {child.name}</span> : <span>📁 {child.name}</span>}
                    </div>
                  ))}
                </div>
              ) : (
                <p>This folder is empty.</p>
              )}
            </div>
          ))}
        </div>
      ) : selectedFolder && selectedFolder.children ? (
        // Handle the case where selectedFolder is a single folder with children
        <div>
          <h2>{selectedFolder.name}</h2>
          {selectedFolder.children.length > 0 ? (
            <div className={styles.folderContent}>
              {selectedFolder.children.map((child) => (
                <div key={child.id} className={styles.folderItem}>
                  {child.type === "file" ? <span>📄 {child.name}</span> : <span>📁 {child.name}</span>}
                </div>
              ))}
            </div>
          ) : (
            <p>This folder is empty.</p>
          )}
        </div>
      ) : (
        <p>No folder selected.</p>
      )}
    </div>
  );
}
