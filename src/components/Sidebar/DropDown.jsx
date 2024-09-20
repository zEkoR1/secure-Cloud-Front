import styles from "./DropDown.module.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
export default function DropDown() {
  return (
    <Dropdown >
      <Dropdown.Toggle
        as="button"
        className={styles.settingsPopup}
        variant="success"
        id="dropdown-basic"
      >
        <BsThreeDotsVertical size={30} />
      </Dropdown.Toggle>
      <Dropdown.Menu className={styles.dropDownMenu}>
        <Dropdown.Item href="#/action-1" className={styles.dropdownitem}>Profile</Dropdown.Item>
        <Dropdown.Item href="#/action-2"className={styles.dropdownitem}>Preferences</Dropdown.Item>
        <Dropdown.Item href="#/action-3"className={styles.dropdownitem}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
