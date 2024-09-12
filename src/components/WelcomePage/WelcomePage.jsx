import { useState } from "react";
import styles from "./WelcomePage.module.css";
import lightBg from "../../assets/default_light.png";
import darkBg from "../../assets/default_dark.png";
import lightHoverBg from "../../assets/hover_light.png";
import darkHoverBg from "../../assets/hover_dark.png";

export default function WelcomePage() {
  const [theme, setTheme] = useState("light");
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const currentBackground =
    theme === "light"
      ? isButtonHovered
        ? lightHoverBg
        : lightBg
      : isButtonHovered
      ? darkHoverBg
      : darkBg;

  return (
    <div
      className={`${styles.welcomePage} ${
        theme === "light" ? styles.light : styles.dark
      }`}
      style={{
        backgroundImage: `linear-gradient(to right, ${
          theme === "light"
            ? "rgba(255, 255, 255, 1), rgba(255, 255, 255, 0)"
            : "rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)"
        }), url(${currentBackground})`,
      }}
    >
      <button onClick={toggleTheme}>Toggle Theme</button>

      <div className={styles.buttonDiv}>
        <h1 className={styles.welcomeH}>
          We have your mom <br />
          We manage it!
        </h1>

        <button
          className={styles.buttonJoin}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
        >
          Join Us
        </button>
      </div>
    </div>
  );
}
