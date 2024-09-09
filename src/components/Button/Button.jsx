import logo from "../../assets/googleLogo.png";
import styles from "./Button.module.css";
export default function Button({ text, onClick, showLogo }) {
  return (
    <div className={styles.buttonDiv}>
      <button className={styles.button}>
        {showLogo ? (
          <img src={logo} alt="google-Logo" className={styles.logo} />
        ) : null}
        {text}
      </button>
    </div>
  );
}
