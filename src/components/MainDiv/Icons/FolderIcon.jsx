// FolderIcon.js
import LightFolder from "./LightFolder";
import DarkFolder from "./DarkFolder";
import LightFile from "./LightFile";
import DarkFile from "./DarkFile";
import { useTheme } from "../../ThemeContext";

const FolderIcon = ({ isFile }) => {
  const { theme } = useTheme();

  if (isFile) {
    return theme === "dark" ? (
      <DarkFile />
    ) : (
      <LightFile  />
    );
  } else {
    return theme === "dark" ? (
      <DarkFolder />
    ) : (
      <LightFolder  />
    );
  }
};

export default FolderIcon;
