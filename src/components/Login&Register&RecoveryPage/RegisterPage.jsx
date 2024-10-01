import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Button from "../Button/Button.jsx";
import TextButton from "../Button/TextButton.jsx";
import Input from "../Input/Input.jsx";
import styles from "./Page.module.css";
import { useTheme } from "../ThemeContext.jsx";
import {
  validateInputs,
  handleFieldValidationError,
} from "./validation.js"; 

const MySwal = withReactContent(Swal);

export default function RegisterPage({ switchToLogin, switchToRecovery }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const registerUser = async (username, email, password) => {
    if (!validateInputs(username, email, password)) {

      return; 

    }

    try {
      const response = await fetch(`${apiUrl}/api/user/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      const contentType = response.headers.get("Content-Type");
      const data = contentType && contentType.includes("application/json")
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        if (typeof data === "object" && data !== null) {
          // Check for specific validation errors
          if (data.errors) {
            // Handle field-specific validation errors from the backend
            handleFieldValidationError(data.errors);
            return;
          }

          // If there is a general message, show it
          if (data.message) {
            MySwal.fire({
              icon: "error",
              title: "Registration Failed",
              text: data.message,
              customClass: {
                popup: styles["swal-popup"],
                confirmButton: styles["swal-confirm-button"],
              },
            });
            return;
          }
        }

        // Default fallback if there's no specific error or message
        MySwal.fire({
          icon: "error",
          title: "Registration Failed",
          text: "An unknown error occurred. Please try again later.",
          customClass: {
            popup: styles["swal-popup"],
            confirmButton: styles["swal-confirm-button"],
          },
        });
        return;
      }

      // Success case
      MySwal.fire({
        icon: "success",
        title: "Registration Successful",
        text: `Welcome, ${username}! Your account has been created.`,
        customClass: {
          popup: styles["swal-popup"],
          confirmButton: styles["swal-success-button"],
        },
      }).then(() => {
        switchToLogin();
      });
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Registration Error",
        text: error.message || "An unknown error occurred.",
        customClass: {
          popup: styles["swal-popup"],
          confirmButton: styles["swal-confirm-button"],
        },
      });
    }
  };

  const { theme } = useTheme();
  document.body.className = theme === "dark" ? "dark-theme" : "";

  return (
    <div className={styles.divWrapper}>
      <div className={styles.inputPart}>
        <h1 className={styles.welcome}> Register </h1>
        <Input
          type={"text"}
          placeholder={"Username"}
          onChange={handleUsernameChange}
        />
        <Input
          type={"text"}
          placeholder={"Email"}
          onChange={handleEmailChange}
        />
        <Input
          type={"password"}
          placeholder={"Password"}
          onChange={handlePasswordChange}
        />
      </div>

      <div className={styles.downPart}>
        <Button
          text={"Register"}
          onClick={() => registerUser(username, email, password)}
        />
        <div className={styles.divider}>
          <span className={styles.dividerText}>or</span>
        </div>
        <Button text={"Continue with Google"} showLogo={true} />
        <div className={styles.registerPart}>
          <TextButton text="Forgot Password?" onClick={switchToRecovery} />
          <TextButton text="Back to Login" onClick={switchToLogin} />
        </div>
      </div>
    </div>
  );
}
