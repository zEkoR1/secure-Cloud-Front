import styles from "./searchInput.module.css";
import React, { useMemo } from 'react';
import { useTheme } from "../ThemeContext";
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


export default function Input({ placeholder }) {  // tut tip i type doljen bit
    const { isSidebarOpen } = useTheme();
    const searchInputClassName = useMemo(() => {
      return `${styles.Input} ${isSidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}`;
    }, [isSidebarOpen]);

    const searchValue = useSelector((state) => state.input.searchValue);
    // const dispatch = useDispatch();

    // const handleChange = (e) => {
    //     if (type === 'text') {
    //         dispatch(setLoginValue(e.target.value));  // idk how searches should work --- chhange to normal logic
    //     }
    // }
    return (
        <div className={searchInputClassName}>
            {/*<div className={styles['input-container']}>*/}

                <input
                    className={styles.input}
                    type='text'
                    value={searchValue}
                    // onChange={(e) => handleChange(e)}
                    placeholder=""
                    required
                />
                <label
                    className={searchValue || document.activeElement === document.querySelector('input') ? styles.shrink : ''}>
                    {placeholder}
                </label>
            {/*</div>*/}
        </div>
    );
}