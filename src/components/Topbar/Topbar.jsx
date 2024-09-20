import styles from "./Topbar.module.css";
import Input from "./searchInput";
import { useSelector } from 'react-redux';

import horizontalStyles from "../Sidebar/Sidebar.module.css";

export default function Topbar() {
    const searchValue = useSelector((state) => state.input.searchValue); // Access the search value from Redux

    const items = ["React", "JavaScript", "CSS", "HTML", "Redux"]; // Example items to search through

    // Fix the search filtering logic
    const filteredItems = items.filter(item =>
        item.toLowerCase().includes((searchValue || "").toLowerCase())
    );

    return (
        <div className={styles.topbarDiv}>
            <div className={styles.upperPart}>
                <Input placeholder="Search..." />
                <ul>
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item, index) => <li key={index}>{item}</li>)
                    ) : (
                        <li>No items found</li>
                    )}
                </ul>
            </div>
            <div className={styles.horizontalDivider}></div>
        </div>
    );
}
