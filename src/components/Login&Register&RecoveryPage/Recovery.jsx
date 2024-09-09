import styles from "./Page.module.css";
import Button from "../Button/Button.jsx";
import Input from "../Input/Input.jsx";
import TextButton from "../Button/TextButton.jsx";
export default function Recovery() {
  return (
    <div className={`${styles.divWrapper}  ${styles.wrapperRecovery}`}>
      <div className={styles.recoveryDiv}>
        <h1 className={styles.passReset}>Pass Reset</h1>
        <p>
          Enter your email address and we will send you a link to reset your
          password
        </p>
      </div>
      <div className={`${styles.inputPart} ${styles.inputRecovery}`}>
        <Input type={"text"} placeholder={"Email"} />
        <Button text={"Send password reset"} />

      </div>

      <div className={`${styles.downPart} ${styles.downPartRecovery}`}>
        <div className={styles.backButton}>
        <TextButton text ={ "Back to Login " }/>        </div>
      </div>
    </div>
  );
}
