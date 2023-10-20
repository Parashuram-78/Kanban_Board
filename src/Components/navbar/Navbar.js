import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./styles.module.css";
import listenForOutsideClicks from "../helper/ListenForQutsideClicks"; // Import a function for listening to outside clicks

// Navbar component
const Navbar = ({ groupBy, setgroupBy, orderBy, setOrderBy }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the menu open/close
  const toggle = (isOpen) => {
    setIsOpen(!isOpen);
  };

  // Function to handle the group by selection change
  const handleGroupBy = (e) => {
    setgroupBy(e.target.value);
    sessionStorage.setItem('groupBy', e.target.value); // Store the selected grouping in sessionStorage
  };

  // Function to handle the order by selection change
  const handleOrderBy = (e) => {
    setOrderBy(e.target.value);
    sessionStorage.setItem('orderBy', e.target.value); // Store the selected ordering in sessionStorage
  };

  // Create a reference to the menu element
  const menuRef = useRef(null);

  // State variable to track whether the menu is actively listening for outside clicks
  const [listening, setListening] = useState(false);

  // Use the listenForOutsideClicks function to add an event listener for outside clicks
  useEffect(listenForOutsideClicks(listening, setListening, menuRef, setIsOpen));

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.wrapper}>
          <div ref={menuRef}>
            <div
              className={styles.selectOption}
              onClick={() => {
                toggle(isOpen); // Toggle the menu open/close when clicked
              }}
            >
              <div className={styles.selectIcon}></div>
              <div className={styles.selected}>Display</div>
              <div className={styles.arrow}></div>
            </div>

            {isOpen ? ( // Conditionally render the options when the menu is open
              <div className={styles.optionBox}>
                <div className={styles.groupBy}>
                  <div>Grouping</div>
                  <select className={styles.groupBySelect} value={groupBy} onChange={handleGroupBy} id="">
                    <option value="status">Status</option>
                    <option value="priority">Priority</option>
                    <option value="user">User</option>
                  </select>
                </div>
                <div className={styles.orderBy}>
                  <div>Ordering </div>
                  <select className={styles.orderBySelect} value={orderBy} onChange={handleOrderBy} id="">
                    <option value="priority">Priority</option>
                    <option value="title">Title</option>
                  </select>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
