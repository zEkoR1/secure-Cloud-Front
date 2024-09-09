import Button from "../Button/Button.jsx";
import styles from "./Page.module.css";
import Input from "../Input/Input.jsx";
import {useTheme} from '../ThemeContext.jsx'
import TextButton from "../Button/TextButton.jsx";
export default function LoginPage() {
  const {theme, toggleTheme} = useTheme();
  document.body.className = theme === "dark" ? "dark-theme" : "";
  return (
    <div className={styles.divWrapper}>
          <button onClick={toggleTheme} className={styles.themeToggle}> Toggle theme </button>

      <div className ={styles.inputPart}>
      <h1 className={styles.welcome}> Welcome </h1>
      <Input type={"text"} placeholder={"Login"} />
      <Input type={"password"} placeholder={"Password"} />
      </div>
      <div className={styles.downPart}>
        <Button text={"Log in"} />
        <div className={styles.divider}>
          <span className={styles.dividerText}>or</span>
        </div>
        <Button text={"Continue with Google"} showLogo={true} />
        <div className={styles.registerPart}>
          <TextButton text ={ "Forgot Password? " }/>
          <TextButton text ={ "Register " }/>
        </div>
      </div>
    </div>
  );
}
