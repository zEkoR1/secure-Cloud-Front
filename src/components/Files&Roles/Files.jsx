import styles from "./Files.module.css";
import FileItem from "./FileItem";

export default function Files({
  data,
  selectedFiles,
  toggleFileSelection,
  closeFoldersCounter,
  openFolderInMainDiv,
}) {
  return (
    <div className={styles.filesDiv}>
      {Array.isArray(data) &&
        data.map((file) => (
          <FileItem
            key={file.id}
            file={file}
            selectedFiles={selectedFiles}
            toggleFileSelection={toggleFileSelection}
            closeFoldersCounter={closeFoldersCounter} // Pass counter to FileItem component
            onDummyClick={openFolderInMainDiv}
          />
        ))}
    </div>
  );
}