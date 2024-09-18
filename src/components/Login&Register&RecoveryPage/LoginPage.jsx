import Button from "../Button/Button.jsx";
import { useState } from "react";
import styles from "./Page.module.css";
import TextButton from "../Button/TextButton.jsx";
import Input from "../Input/Input.jsx";
import { useNavigate } from "react-router-dom";
import {useTheme} from "../ThemeContext.jsx"; 
export default function LoginPage({switchToRegister, switchToRecovery}) {
  const apiUrl = import.meta.env.VITE_API_URL; 
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {theme} = useTheme();
  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identity: login,
          password: password,
        }),
      });

      if (!response.ok) {
        const responseBody = await response.text(); 
        console.error("Response error:", responseBody);
        throw new Error(`Login Failed: ${responseBody || 'Unknown error'}`);
      }

      const data = await response.json();
      console.log("Login successful", data);
      navigate("/home");  
    } catch (error) {
      console.error("Login failed:", error.message || error);
    }
  };


  return (
    <div className={theme === "dark" ? "dark-theme" : ""}>
      <div className={styles.divWrapper}>
        <div className={styles.inputPart}>
          <h1 className={styles.welcome}>Welcome</h1>
          <Input
            type="text"
            placeholder="Login"
            onChange={handleLoginChange}
            value={login}
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={handlePasswordChange}
            value={password}
          />
        </div>
        <div className={styles.downPart}>
          <Button text="Log in" onClick={handleLogin} />
          <div className={styles.divider}>
            <span className={styles.dividerText}>or</span>
          </div>
          <Button text="Continue with Google" showLogo={true} />
          <div className={styles.registerPart}>
            <TextButton text="Forgot Password?" onClick={switchToRecovery} />
            <TextButton text="Register" onClick={switchToRegister} />
          </div>
        </div>
      </div>
    </div>
  );
}
