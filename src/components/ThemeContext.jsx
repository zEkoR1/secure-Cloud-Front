// ThemeContext.js
import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ThemeContext = createContext();
const apiUrl = import.meta.env.VITE_API_URL;

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [fileData, setFileData] = useState([]);
  const [flattenedFiles, setFlattenedFiles] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState([]); // Initialize as an empty array
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
 const [path, setPath] = useState([]); 
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
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

  const checkAuthentication = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/test/`, {
        credentials: "include",
      });

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
        checkAuthentication,
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
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
