import { useTheme } from "../../ThemeContext";
import DeleteIcon from "./ButtonIcons/DeleteIcon";
import DownloadIcon from "./ButtonIcons/Download";
import RolesIcon from "./ButtonIcons/RolesIcon";
import ShareIcon from "./ButtonIcons/ShareIcon";
import styles from "./FileSpecs.module.css";

export default function FileSpecs() {
  const { selectFile } = useTheme();

  // Assuming selectFile has properties: name, size, addedDate, lastEdited, type, availableRoles, tags
  return (
    <div className={styles.specsDiv}>
      <h3 className={styles.fileName}>
        {"<"}
        {selectFile.name}
        {">"}
      </h3>
      <dl className={styles.specsList}>
        <div className={styles.specItem}>
          <dt>File Size:</dt>
          <dd></dd>
        </div>
        <div className={styles.specItem}>
          <dt>Added Date:</dt>
          <dd></dd>
        </div>
        <div className={styles.specItem}>
          <dt>Last Edited:</dt>
          <dd></dd>
        </div>
        <div className={styles.specItem}>
          <dt>File Type:</dt>
          <dd>{selectFile.type}</dd>
        </div>
        <div className={styles.specItem}>
          <dt>Available for Roles:</dt>
          <dd></dd>
        </div>
        <div className={styles.specItem}>
          <dt>Tags:</dt>
          <dd></dd>
        </div>
      </dl>
      <div className={styles.divider}></div>
      <div className={styles.buttonDiv}>
        <button className={styles.actionButton} aria-label="Download">
          <DownloadIcon />
        </button>
        <button className={styles.actionButton} aria-label="Share">
          <RolesIcon />
        </button>
        <button className={styles.actionButton} aria-label="Edit">
          <ShareIcon />
        </button>
        <button className={styles.actionButton} aria-label="Delete">
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}
