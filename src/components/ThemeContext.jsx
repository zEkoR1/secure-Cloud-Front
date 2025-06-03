import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
const ThemeContext = createContext();
const apiUrl = import.meta.env.VITE_API_URL;

export const ThemeProvider = ({ children }) => {
const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
  const stored = localStorage.getItem("isSidebarOpen");
  return stored === null ? true : stored === "true";
});  const [fileData, setFileData] = useState([]);
  const [flattenedFiles, setFlattenedFiles] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState([]); 
  const [openFileSpecs, setOpenFileSpecs] = useState(false)

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [path, setPath] = useState([]);
  const [selectFile, setSelectFile] = useState (null);
const toggleSidebar = () => {
  setIsSidebarOpen((prevState) => {
    const newState = !prevState;
    localStorage.setItem("isSidebarOpen", newState);
    return newState;
  });
};
  const logout = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/auth/logout`, {
        method: "POST",
        credentials: "include", 
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Logged Out",
          text: "You have successfully logged out.",
          timer: 1000, // Optional: Auto-close after 2 seconds
          showConfirmButton: false, 
        }).then(() => {
          setIsAuthenticated(false);
          navigate("/"); // Redirect to login page
        });
      }
    } catch (error) {
      console.log("Error happened during logout", error);
    }
  };

const toggleTheme = () => {
  const newTheme = theme === "light" ? "dark" : "light";
  setTheme(newTheme);
  localStorage.setItem("theme", newTheme);
};

  const selectFolder = (folder) => {
    setSelectedFolder((path) => [...path, folder]);
  };

  const navigateUp = () => {
    setSelectedFolder((path) => path.slice(0, -1));
  };

  const FlattenFiles = (files) => {
    const flatFiles = [];
    const flatten = (items) => {
      items.forEach((item) => {
        if (item.type !== "file") {
          flatten(item.children);
        } else {
          flatFiles.push(item);
        }
      });
    };
    flatten(files);
    setFlattenedFiles(flatFiles);
  };

  const fetchData = async () => {
    console.log("Fetching data...");
    try {
      const response = await fetch(`${apiUrl}/api/files/`, {
        credentials: "include",
      });

      if (response.status === 401) {
        console.warn("Session expired or invalid. Redirecting to login.");
        if (location.pathname !== "/") {
          navigate("/", { state: { openLoginModal: true } });
        }
        return;
      }

      if (!response.ok) {
        const responseBody = await response.text();
        console.error("Response error:", responseBody);
        throw new Error(
          `Failed to fetch files: ${responseBody || "Unknown error"}`
        );
      }

      const fetchedData = await response.json();
      console.log("Fetched Data:", fetchedData);
      setFileData(fetchedData.data.items);
      setSelectedFolder([]);
      setPath([]);
      FlattenFiles(fetchedData.data.items); // Ensure correct data structure is passed
    } catch (error) {
      console.error("Error:", error.message || error);
    }
  };
  const toggleFileSelectionSpec = (child) => {
    if (selectFile?.id === child.id) {
      setOpenFileSpecs((prevState) => !prevState);
      
      // If we are closing the specs, deselect the file
      if (openFileSpecs) setSelectFile(null);
    } else {
      // If it's a new file, select it and open the specs
      setSelectFile(child);
      setOpenFileSpecs(true);
    }
  
   
  };
  
const fetchWithRefresh = async (input, init = {}, attemptRefresh = true) => {
  let response = await fetch(input, { ...init, credentials: "include" });

  if (response.status === 401 && attemptRefresh) {
    // Try to refresh token
    const refreshResponse = await fetch(`${apiUrl}/api/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (refreshResponse.ok) {
      // Retry the original request once
      response = await fetch(input, { ...init, credentials: "include" });
    }
  }

  return response;
};
  const checkAuthentication = async () => {
    try {
    const response = await fetchWithRefresh(`${apiUrl}/api/test/`);
        

      console.log("Authentication response status:", response.status);

      if (response.status === 404 || response.status === 401) {
        console.warn("User is not authenticated or auth endpoint not found.");

        if (location.pathname !== "/") {
          navigate("/", { state: { openLoginModal: true } });
          console.log("Redirecting to / with openLoginModal state");
        } else {
          console.log("Already on /, not redirecting");
        }
        return;
      }

      if (!response.ok) {
        console.error("Unexpected error:", response.statusText);
        return;
      }

      const authStatus = await response.json();
      console.log("Authentication response data:", authStatus);

      if (authStatus.status === "success") {
        console.log("User is authenticated. Fetching files...");

        await fetchData();

        setIsAuthenticated(true);

        navigate("/home");
      } else {
        console.warn("User is not authenticated, redirecting to login.");

        if (location.pathname !== "/") {
          navigate("/", { state: { openLoginModal: true } });
          console.log("Redirecting to / with openLoginModal state");
        } else {
          console.log("Already on /, not redirecting");
        }
      }
    } catch (error) {
      console.error("Error during authentication check:", error);

      if (location.pathname !== "/") {
        navigate("/", { state: { openLoginModal: true } });
        console.log("Redirecting to / with openLoginModal state due to error");
      } else {
        console.log("Already on /, not redirecting");
      }
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, [navigate]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        logout,
        toggleTheme,
        isSidebarOpen,
        toggleSidebar,
        selectedFolder,
        selectFolder,
        navigateUp,
        fileData,
        flattenedFiles,
        fetchData,
        path,
        setSelectFile, 
        selectFile,
        toggleFileSelectionSpec,
        openFileSpecs,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
