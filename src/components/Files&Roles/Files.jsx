import styles from './Files.module.css';
import FileItem from './FileItem';

export default function Files({ data }) {
  return (
    <div className={styles.filesDiv}>
      {Array.isArray(data) && data.map(file => (
        <FileItem key={file.id} file={file} />
      ))}
    </div>
  );
}