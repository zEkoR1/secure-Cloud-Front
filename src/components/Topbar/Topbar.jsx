import styles from "./Topbar.module.css";
import Input from "./searchInput";

import horizontalStyles from "../Sidebar/Sidebar.module.css";
// import { useState } from "react";
export default function Topbar() {

    return (
        <div className={styles.topbarDiv}>
            
            <div className={styles.upperPart}>
                <Input type={"text"} placeholder={"Search"} />
                </div>
            <div className={styles.horizontalDivider}></div>
            
        </div>


    );
};

