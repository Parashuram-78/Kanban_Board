import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./styles.module.css";
import listenForOutsideClicks from "../helper/ListenForQutsideClicks";

const Navbar = ({ groupBy, setgroupBy, orderBy, setOrderBy }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = (isOpen) => {
    setIsOpen(!isOpen);
  };

  const handleGroupBy = (e) => {
    setgroupBy(e.target.value);
    sessionStorage.setItem('groupBy', e.target.value);
  };
  const handleOrderBy = (e) => {
    setOrderBy(e.target.value);
    sessionStorage.setItem('orderBy', e.target.value);
  };

  const menuRef = useRef(null);
  const [listening, setListening] = useState(false);
  useEffect(listenForOutsideClicks(listening, setListening, menuRef, setIsOpen));

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.wrapper}>
          <div ref={menuRef}>
            <div
              className={styles.selectOption}
              onClick={() => {
                toggle(isOpen);
              }}
            >
              <div className={styles.selectIcon}></div>
              <div className={styles.selected}>Display</div>
              <div className={styles.arrow}></div>
            </div>

            {isOpen ? (
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
