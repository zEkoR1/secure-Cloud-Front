import styles from "./searchInput.module.css";
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function Input({ type, placeholder }) {
    const searchValue = useSelector((state) => state.input.searchValue);
    const dispatch = useDispatch();
  
    const handleChange = (e) => {
        if (type === 'text') {
          dispatch(setLoginValue(e.target.value));  // idk how searches should work --- chhange to normal logic
        }
    }
    return (
      <div className={styles['input-container']}>
        <input
          className={styles.input}
          type='text'
          value={searchValue}
          onChange={handleChange}
          placeholder=""
          required
        />
        <label className={searchValue || document.activeElement === document.querySelector('input') ? styles.shrink : ''}>
          {placeholder}
        </label>
      </div>
    );
  }
  