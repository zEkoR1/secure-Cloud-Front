import { useState, useEffect } from "react";
import { useCombobox } from "downshift";
import { useTheme } from "../ThemeContext";
import styles from "./Search.module.css";

export default function Search() {
  const { flattenedFiles } = useTheme();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (flattenedFiles && flattenedFiles.length > 0) {
      setSearchResults(flattenedFiles);
    } else {
      setSearchResults([]);
    }
  }, [flattenedFiles]);

  const handleInputChange = ({ inputValue }) => {
    if (!inputValue) {
      setSearchResults(flattenedFiles || []);
    } else {
      setSearchResults(
        (flattenedFiles || []).filter((file) =>
          file.name.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    }
  };

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items: searchResults,
    onInputValueChange: handleInputChange,
    itemToString: (item) => (item ? item.name : ""),
  });

  return (
    <div className={styles.div}>
      <div {...getComboboxProps}>
        <input className={styles.input} {...getInputProps()} placeholder="Search files..." />
      </div>
      {isOpen && (
        <ul {...getMenuProps()} className={styles.ul}>
          {searchResults.map((item, index) => (
            <li
              className={styles.listItem}
              key={item.id || index}
              {...getItemProps({
                index,
                item,
                style: {
                  backgroundColor:
                    highlightedIndex === index ? "#bde4ff" : "white",
                },
              })}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}