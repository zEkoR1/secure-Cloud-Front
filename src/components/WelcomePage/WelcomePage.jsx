import { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./WelcomePage.module.css";
import lightBg from "../../assets/default_light.png";
import darkBg from "../../assets/default_dark.png";
import lightHoverBg from "../../assets/hover_light.png";
import darkHoverBg from "../../assets/hover_dark.png";
import Modal from "react-modal";
import LoginPage from "../Login&Register&RecoveryPage/LoginPage";
import RegisterPage from "../Login&Register&RecoveryPage/RegisterPage";
import Recovery from "../Login&Register&RecoveryPage/Recovery";
import { useTheme } from "../ThemeContext";

Modal.setAppElement("#root");

export default function WelcomePage() {
  const location = useLocation(); // To check location state
  const navigate = useNavigate(); // For navigation
  const { theme, toggleTheme } = useTheme(); // Assuming theme context
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  // This function toggles the modal (manual toggle)
  const toggleModal = () => {
    setModalIsOpen((prevState) => !prevState);
    setCurrentPage("login");
  };

  const switchToRegister = () => setCurrentPage("register");
  const switchToLogin = () => setCurrentPage("login");
  const switchToRecovery = () => setCurrentPage("recovery");

  const currentBackground = useMemo(() => {
    return theme === "light"
      ? isButtonHovered
        ? lightHoverBg
        : lightBg
      : isButtonHovered
      ? darkHoverBg
      : darkBg;
  }, [theme, isButtonHovered]);

  // Check location state for automatic modal open when redirected from /home
  useEffect(() => {
    // Only open modal if redirected with openLoginModal state
    if (location.state?.openLoginModal) {
      console.log("Opening modal based on location state (redirect from /home)");

      setModalIsOpen(true); // Open the modal
      setCurrentPage("login");

      // Clear the state after handling to avoid re-triggering
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate]);

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
          We have your files <br />
          We manage it!
        </h1>

        <button
          className={styles.buttonJoin}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
          onClick={toggleModal} // Manual modal toggle (when clicked directly)
        >
          Join Us
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={toggleModal} // Modal close on request
        contentLabel="Login Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(10px)",
          },
          content: {
            backgroundColor: "transparent",
            border: "none",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: "2rem",
            borderRadius: "10px",
            width: "auto",
            maxWidth: "90vw",
            height: "auto",
            maxHeight: "90vh",
          },
        }}
      >
        {/* Modal Content: Login/Register/Recovery */}
        {currentPage === "login" && (
          <LoginPage
            switchToRegister={switchToRegister}
            switchToRecovery={switchToRecovery}
          />
        )}
        {currentPage === "register" && (
          <RegisterPage
            switchToLogin={switchToLogin}
            switchToRecovery={switchToRecovery}
          />
        )}
        {currentPage === "recovery" && <Recovery switchToLogin={switchToLogin} />}
      </Modal>
    </div>
  );
}