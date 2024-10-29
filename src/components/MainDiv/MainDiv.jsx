import { useTheme } from "../ThemeContext";
import { useState } from "react";
import FolderIcon from "./Icons/FolderIcon";
import styles from "./MainDiv.module.css";
import FileSpecs from "./FileSpecs/FileSpecs";

export default function MainDiv() {
  const {
    isSidebarOpen,
    selectedFolder,
    selectFolder,
    navigateUp,
    fileData,
    selectFile,
    setSelectFile,
    toggleFileSelectionSpec,
    openFileSpecs,
  } = useTheme();

  // const mainDivClassName = useMemo(() => {
  //   return `${styles.mainDiv} ${
  //     isSidebarOpen ? styles.sidebarOpen : styles.sidebarClosed
  //   }`;
  // }, [isSidebarOpen]);

  const currentFolder =
    selectedFolder.length === 0
      ? { name: "Root", children: fileData }
      : selectedFolder[selectedFolder.length - 1];

  return (
    <div className={styles.mainDiv}>
      <h2 className={styles.folderName}>
        {"<"}
        {currentFolder.name}
        {">"}
      </h2>

      {currentFolder.children && currentFolder.children.length > 0 ? (
        <div className={styles.gridWrapper}>
          <div className={styles.folderContent}>
            {selectedFolder.length > 0 && (
              <span onDoubleClick={navigateUp} className={styles.goUpButton}>
                <FolderIcon />
                <span className={styles.itemName}>...</span>{" "}
              </span>
            )}
            {currentFolder.children.map((child) => (
              <div
                key={child.id}
                className={styles.folderItem}
                onDoubleClick={() => {
                  if (child.type !== "file") {
                    selectFolder(child); // into the folder
                  } else if (child.type === "file") {
                    toggleFileSelectionSpec(child);
                  }
                }}
              >
                {child.type === "file" ? (
                  <span className={styles.file}>
                    {" "}
                    <FolderIcon isFile={"true"} />
                    <span className={styles.itemName}> {child.name} </span>
                  </span>
                ) : (
                  <span className={styles.folder}>
                    {" "}
                    <FolderIcon /> {child.name}{" "}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>This folder is empty.</p>
      )}
      {openFileSpecs && <FileSpecs />}
    </div>
  );
}
