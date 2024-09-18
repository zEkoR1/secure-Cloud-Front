import Button from "../Button/Button.jsx";
import TextButton from "../Button/TextButton.jsx";
import styles from "./Page.module.css";
import Input from "../Input/Input.jsx";
import { useTheme } from "../ThemeContext.jsx";
import { useState } from "react";
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

      // Log the response to check if it's in the expected format
      console.log(response);

      const contentType = response.headers.get("Content-Type");

      if (contentType && contentType.includes("application/json")) {
        const data = await response.json(); // Parse JSON response
        console.log("Registration successful", data);
      } else {
        const text = await response.text(); // Parse as plain text if not JSON
        console.error("Registration failed:", text);
      }
    } catch (error) {
      console.error("Registration failed:", error.message || error);
    }
  };

  const { theme, toggleTheme } = useTheme();
  document.body.className = theme === "dark" ? "dark-theme" : "";
  return (
    <div className={styles.divWrapper}>
      {/* <button onClick={toggleTheme} className={styles.themeToggle}>
        {" "}
        Toggle theme{" "}
      </button> */}

      <div className={styles.inputPart}>
        <h1 className={styles.welcome}> Register </h1>
        <Input
          type={"text"}
          placeholder={"Username"}
          onChange={handleUsernameChange}
        />
        <Input
          type={"text"}
          placeholder={"Login"}
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
