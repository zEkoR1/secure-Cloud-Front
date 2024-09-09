import styles from "./Button.module.css";
export default function TextButton ({text}) {
    return (
        <button className={styles.textButton}> {text} </button>
    );
}