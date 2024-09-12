import styles from "./Button.module.css";
export default function TextButton ({text, onClick}) {
    return (
        <button className={styles.textButton}  onClick={onClick}> {text} </button>
    );
}