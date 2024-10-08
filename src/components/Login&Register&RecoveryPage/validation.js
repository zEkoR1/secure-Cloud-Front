import Swal from "sweetalert2";
import styles from "./Page.module.css"; 
import withReactContent from "sweetalert2-react-content";  
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9_]+$/; // Adjust based on your username rules
    return usernameRegex.test(username);
  };

  export const validateLoginInput = (login) => {
    if (validateEmail(login) || validateUsername(login)) {
      return true;
    }
  }
// Function to handle validation errors based on field
export const handleFieldValidationError = (errorMessage) => {
  let userFriendlyMessage = "";


    if (errorMessage.includes("failed on the 'email' tag")) {
      userFriendlyMessage = "Please enter a valid email address.";
    } else if (errorMessage.includes(`duplicate key value violates unique constraint "idx_users_email"`)) {
      userFriendlyMessage = "This email is already in use. Please choose another one.";
    
  } else 
    if (errorMessage.includes(`duplicate key value violates unique constraint "idx_users_username" `)) {
      userFriendlyMessage = "This username is already taken. Please choose another one.";
    }
  

  if (!userFriendlyMessage) {
    userFriendlyMessage = "An error occurred while validating your input.";
  }

  Swal.fire({
    icon: "error",
    title: "Validation Error",
    text: userFriendlyMessage,
    customClass: {
      popup: styles["swal-popup"],
      confirmButton: styles["swal-confirm-button"],
    },
  });
};

// Function to validate the inputs for registration or login
export const validateInputs = (username, email, password) => {
  if (!username) {
    Swal.fire({
      icon: "error",
      title: "Validation Error",
      text: "Username is required.",
      customClass: {
        popup: styles["swal-popup"],
        confirmButton: styles["swal-confirm-button"], 
      },
    });
    return false;
  }

  if (!email) {
    Swal.fire({
      icon: "error",
      title: "Validation Error",
      text: "Email is required.",
      customClass: {
        popup: styles["swal-popup"],
        confirmButton: styles["swal-confirm-button"],
      },
    });
    return false;
  }

  if (!validateEmail(email)) {
    Swal.fire({
      icon: "error",
      title: "Invalid Email",
      text: "Please enter a valid email address.",
      customClass: {
        popup: styles["swal-popup"],
        confirmButton: styles["swal-confirm-button"],
      },
    });
    return false;
  }

  if (!password) {
    Swal.fire({
      icon: "error",
      title: "Validation Error",
      text: "Password is required.",
      customClass: {
        popup: styles["swal-popup"],
        confirmButton: styles["swal-confirm-button"],
      },
    });
    return false;
  }

  if (password.length < 8) {
    Swal.fire({
      icon: "error",
      title: "Weak Password",
      text: "Password must be at least 8 characters long.",
      customClass: {
        popup: styles["swal-popup"],
        confirmButton: styles["swal-confirm-button"],
      },
    });
    return false;
  }

  return true; // Validation passed
};
