// FileItem.js
import { useState, useEffect } from "react";
import { useTheme } from "../ThemeContext";
import styles from "./Files.module.css";

export default function FileItem({
  file,
  selectedFiles,
  toggleFileSelection,
  closeFoldersCounter,
  onDummyClick,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleFileSelectionSpec, setOpenFileSpecs } = useTheme();
  const [clickTimeout, setClickTimeout] = useState(null);

  // Handle opening/closing the folder
  const handleToggleOpen = () => {
    setIsOpen((prevState) => !prevState);
  };

  // Recursively select or deselect files/folders
  const handleCheckboxChange = (e) => {
    if (e) e.stopPropagation();

    const isSelected = selectedFiles.includes(file.id);
    toggleFileSelectionRecursive(file, !isSelected); // Toggle selection recursively
  };

  // Recursively toggle the selection of the folder and its children
  const toggleFileSelectionRecursive = (file, selectAll) => {
    toggleFileSelection(file, selectAll);

    if (file.children && file.children.length > 0) {
      file.children.forEach((child) => toggleFileSelectionRecursive(child, selectAll));
    }
  };

  // Handle single-click (open/close folder)
  const handleSingleClick = () => {
    if (file.type !== "file") {
      handleToggleOpen();
    }
  };

  // Handle double-click (open folder in main div)
  const handleDoubleClick = () => {
    if (file.type !== "file") {
      onDummyClick(file); // Pass the folder to open in the main view
    }
  };

  // Handle the click event with a timeout to distinguish between single and double click
  const handleClick = (e) => {
    if (e) e.stopPropagation();

    if (clickTimeout) {
      clearTimeout(clickTimeout); // Clear the timeout for double click
      setClickTimeout(null);
      handleDoubleClick(); // Perform double-click action
    } else {
      setClickTimeout(
        setTimeout(() => {
          handleSingleClick(); // Perform single-click action
          setClickTimeout(null);
        }, 200) // 200ms to distinguish between single and double click
      );
    }
  };

  const isSelected = selectedFiles.includes(file.id); // Determine if the file is selected

  // Close all folders when closeFoldersCounter changes
  useEffect(() => {
    setIsOpen(false);
  }, [closeFoldersCounter]);

  const lightThemeOpenIcon = (
    <svg className={styles.folderIconSvg} viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M24.5 6.39344V16.5H3.5V5.6V3.5H8.86322L10.0037 4.68937L12.4902 2.3051L10.0037 4.68937C11.0698 5.80109 12.5442 6.40651 14.0642 6.38466C14.3062 6.38118 14.5571 6.37806 14.8155 6.37527L24.5 6.39344Z"
        fill="#75ACDF"
        stroke="#75ACDF"
        strokeWidth="7"
        strokeLinejoin="round"
      />
      <path
        d="M24.5 16.5H3.5V9.10001H11.2662C12.7336 9.10001 14.1402 8.51363 15.173 7.4713L16.2564 6.37798L24.5 6.39345V16.5Z"
        fill="#CAE7FC"
        stroke="#CAE7FC"
        strokeWidth="7"
        strokeLinejoin="round"
      />
    </svg>
  );

  const darkThemeOpenIcon = (
    <svg className={styles.folderIconSvg} viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M24.5 6.39344V16.5H3.5V5.6V3.5H8.86322L10.0037 4.68937L12.4902 2.3051L10.0037 4.68937C11.0698 5.80109 12.5442 6.40651 14.0642 6.38466C14.3062 6.38118 14.5571 6.37806 14.8155 6.37527L24.5 6.39344Z"
        fill="#CAE7FC"
        stroke="#CAE7FC"
        strokeWidth="7"
        strokeLinejoin="round"
      />
      <path
        d="M24.5 16.5H3.5V9.10001H11.2662C12.7336 9.10001 14.1402 8.51363 15.173 7.4713L16.2564 6.37798L24.5 6.39345V16.5Z"
        fill="#75ACDF"
        stroke="#75ACDF"
        strokeWidth="7"
        strokeLinejoin="round"
      />
    </svg>
  );

  const folderIcon = theme === "light" ? lightThemeOpenIcon : darkThemeOpenIcon;

  return (
    <div className={`${styles.fileItem}`} onClick={handleClick}>
      <div className={styles.itemContent}>
        {file.type !== "file" ? (
          <>
            <span className={styles.expandIcon}>{folderIcon}</span>
            <input
              type="checkbox"
              checked={isSelected}
              onChange={handleCheckboxChange}
              onClick={(e) => e.stopPropagation()}
              className={styles.checkbox}
            />
            <span className={styles.folderName}>{file.name}</span>
          </>
        ) : (
          <>
            <span className={styles.fileIcon}>📄</span>
            <input
              type="checkbox"
              checked={isSelected}
              onChange={handleCheckboxChange}
              onClick={(e) => e.stopPropagation()}
              className={styles.checkbox}
            />
            <span className={styles.fileName}>{file.name}</span>
          </>
        )}
      </div>
      {isOpen && file.type !== "file" && file.children && file.children.length > 0 && (
        <div className={styles.innerItems}>
          {file.children.map((child) => (
            <FileItem
              key={child.id}
              file={child}
              selectedFiles={selectedFiles}
              toggleFileSelection={toggleFileSelection}
              closeFoldersCounter={closeFoldersCounter}
              onDummyClick={onDummyClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}
