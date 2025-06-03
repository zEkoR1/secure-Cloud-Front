import styles from "./Topbar.module.css";
import Search from "./Search";

export default function Topbar() {
  return (
    <div className={styles.topbarDiv}>
      
      <p className={styles.sectionName}> <span className={styles.firstLetter}>F</span> files</p>
      
      <div className={styles.searchContainer}>
        <Search />
      </div>

      <div className={styles.horizontalDivider}></div>
    </div>
  );
}
