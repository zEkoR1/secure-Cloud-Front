import { useState } from "react";
import { useTheme } from "../ThemeContext"; // Assuming you have ThemeContext
import styles from "./Files.module.css";

export default function FileItem({
  file,
  selectedFiles,
  toggleFileSelection,
  closeFoldersCounter,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme(); // Get the current theme (light or dark)

  const handleToggleOpen = (e) => {
    e.stopPropagation();
    setIsOpen((prevState) => !prevState);
  };

  const handleCheckboxChange = (e) => {
    e.stopPropagation();
    toggleFileSelection(file);
  };

  const isSelected = selectedFiles.includes(file.id);

  const lightThemeOpenIcon = (
    <svg
      className={styles.folderIconSvg}
      viewBox="0 0 28 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
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
    <svg
      className={styles.folderIconSvg}
      viewBox="0 0 28 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
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
    <div className={`${styles.fileItem}`}>
      <div className={styles.itemContent}>
        {file.type !== "file" ? (
          <>
            <span className={styles.expandIcon} onClick={handleToggleOpen}>
              {folderIcon} 
            </span>
            <input
              type="checkbox"
              checked={isSelected}
              onChange={handleCheckboxChange}
              onClick={(e) => e.stopPropagation()}
              className={styles.checkbox}
            />
            <span className={styles.folderName} onClick={handleToggleOpen}>
              {file.name}
            </span>
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
      {isOpen &&
        file.type !== "file" &&
        file.children &&
        file.children.length > 0 && (
          <div className={styles.innerItems}>
            {file.children.map((child) => (
              <FileItem
                key={child.id}
                file={child}
                selectedFiles={selectedFiles}
                toggleFileSelection={toggleFileSelection}
                closeFoldersCounter={closeFoldersCounter}
              />
            ))}
          </div>
        )}
    </div>
  );
}
