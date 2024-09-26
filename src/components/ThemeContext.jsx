import { useContext, createContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ThemeContext = createContext();
const apiUrl = import.meta.env.VITE_API_URL;

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [fileData, setFileData] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status
  const navigate = useNavigate();
  const location = useLocation(); // Get current location

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const selectFolder = (folder) => {
    setSelectedFolder(folder);
  };

  const fetchData = async () => {
    console.log('Fetching data...');
    try {
      const response = await fetch(`${apiUrl}/api/files/`, {
        credentials: 'include', 
      });

      if (response.status === 401) {
        console.warn('Session expired or invalid. Redirecting to login.');
        if (location.pathname !== '/') {
          navigate('/', { state: { openLoginModal: true } });
        }
        return;
      }

      if (!response.ok) {
        const responseBody = await response.text();
        console.error("Response error:", responseBody);
        throw new Error(`Failed to fetch files: ${responseBody || "Unknown error"}`);
      }

      const fetchedData = await response.json();
      console.log("Fetched Data:", fetchedData);
      setFileData(fetchedData.data.items);
      setSelectedFolder(fetchedData.data.items);
    } catch (error) {
      console.error("Error:", error.message || error);
    }
  };

  const checkAuthentication = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/test/`, {
        credentials: 'include',
      });

      console.log("Authentication response status:", response.status);

      if (response.status === 404 || response.status === 401) {
        console.warn("User is not authenticated or auth endpoint not found.");

        // Only navigate if not already on '/'
        if (location.pathname !== '/') {
          navigate('/', { state: { openLoginModal: true } });
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

        navigate('/home');
      } else {
        console.warn("User is not authenticated, redirecting to login.");

        if (location.pathname !== '/') {
          navigate('/', { state: { openLoginModal: true } });
          console.log("Redirecting to / with openLoginModal state");
        } else {
          console.log("Already on /, not redirecting");
        }
      }
    } catch (error) {
      console.error('Error during authentication check:', error);

      if (location.pathname !== '/') {
        navigate('/', { state: { openLoginModal: true } });
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
    <ThemeContext.Provider value={{ theme, toggleTheme, isSidebarOpen, toggleSidebar, selectedFolder, selectFolder, fileData, fetchData }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
