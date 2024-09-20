import styles from "./searchInput.module.css";
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchValue } from '../../store/actions.js'; // Import the Redux action
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function Input({ placeholder }) {
    const searchValue = useSelector((state) => state.input.searchValue); // Access search state from Redux
    const dispatch = useDispatch();
  
    const handleChange = (e) => {
        dispatch(setSearchValue(e.target.value)); // Dispatch action to update search value
    };

    const handleSearch = (e) => {
        e.preventDefault();
        // Trigger search logic (can be an API call, filtering data, etc.)
        console.log("Searching for: ", searchValue);
    }

    return (
      <div className={styles['input-container']}>
        <form onSubmit={handleSearch}>
          <input
            className={styles.input}
            type='text'
            value={searchValue}
            onChange={handleChange}
            placeholder={placeholder}
            required
          />
          <label className={searchValue ? styles.shrink : ''}>
            {placeholder}
          </label>
          <button type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>
    );
}
