import styles from "./Topbar.module.css";
import Search from "./Search";

export default function Topbar() {
  return (
    <div className={styles.topbarDiv}>
      <h1 className={styles.sectionName}>Ffiles</h1>

      {/* Search is wrapped in a container for centering */}
      <div className={styles.searchContainer}>
        <Search />
      </div>

      <div className={styles.horizontalDivider}></div>
    </div>
  );
}
