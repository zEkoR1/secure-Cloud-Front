import styles from "./Files.module.css";
import FileItem from "./FileItem";
import {useState} from "react";
export default function Files({ data, selectedFiles, toggleFileSelection, closeFoldersCounter, openFolderInMainDiv }) {
  const [clickTimeout, setClickTimeout] = useState(null);
  const handleClick = (file) => {
    if(clickTimeout){
      clearTimeout(clickTimeout);
      setClickTimeout(null);
      handleDoubleClick(file);
    }
  }
  return (
    <div className={styles.filesDiv}>
      {Array.isArray(data) &&
        data.map((file) => (
          <FileItem
            key={file.id}
            file={file}
            selectedFiles={selectedFiles}
            toggleFileSelection={toggleFileSelection}
            closeFoldersCounter={closeFoldersCounter}
            onDummyClick={openFolderInMainDiv}
          />
        ))}
    </div>
  );
}