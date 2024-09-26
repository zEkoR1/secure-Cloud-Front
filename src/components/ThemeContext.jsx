import { useContext, createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const ThemeContext = createContext();
const apiUrl = import.meta.env.VITE_API_URL;

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [fileData, setFileData] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null); // Initialize with null
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const selectFolder = (folder) => {
    setSelectedFolder(folder);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/files/`, {
          credentials: 'include',
        });

        if (response.status === 401) {
          console.warn('Session expired or invalid. Redirecting to login.');
          navigate('/', { state: { openLoginModal: true } });
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

    fetchData();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isSidebarOpen, toggleSidebar, selectedFolder, selectFolder, fileData }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);