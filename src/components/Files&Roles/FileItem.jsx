import { useState } from "react";
import styles from "./Files.module.css";

export default function FileItem({ file }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className={styles.fileItem}>
      {file.type !== "file" ? (
        <div className={styles.folder}>
          <span className={styles.folderName} onClick={handleOpen}>
            {isOpen ? "📂 " : "📁 "} {file.name}
          </span>
          {isOpen && file.children && file.children.length > 0 && (
            <div className={styles.innerItems}>
              {file.children.map((child) => (
                <FileItem key={child.id} file={child} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className={styles.file}>
          <span>📄 {file.name}</span>
        </div>
      )}
    </div>
  );
}