import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLoginValue, setPasswordValue } from '../../store/inputSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import styles from './Input.module.css';

export default function Input({ type, placeholder }) {
  const [showPassword, setShowPassword] = useState(false);
  const loginValue = useSelector((state) => state.input.loginValue);
  const passwordValue = useSelector((state) => state.input.passwordValue);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (type === 'text') {
      dispatch(setLoginValue(e.target.value));
    } else if (type === 'password') {
      dispatch(setPasswordValue(e.target.value));
    }
  };

  const value = type === 'text' ? loginValue : passwordValue;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles['input-container']}>
      <input
        className={styles.input}
        type={type === 'password' && showPassword ? 'text' : type}
        value={value}
        onChange={handleChange}
        placeholder=""
        required
      />
      <label className={value || document.activeElement === document.querySelector('input') ? styles.shrink : ''}>
        {placeholder}
      </label>
      {type === 'password' && (
        <button
          type="button"
          className={styles['toggle-button']}
          onClick={togglePasswordVisibility}
        >
          <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
        </button>
      )}
    </div>
  );
}
