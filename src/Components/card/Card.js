import React, { useEffect } from "react";
import backlog from "../../imgs/loading.png";
import inprogress from "../../imgs/Partial.png";
import todo from "../../imgs/record.png";
import done from "../../imgs/check.png";
import priority0 from "../../imgs/priority-0.png";
import priority1 from "../../imgs/priority-1.png";
import priority2 from "../../imgs/priority-2.png";
import priority3 from "../../imgs/priority-3.png";
import priority4 from "../../imgs/priority-4.png";
import styles from "./styles.module.css";

// Define a mapping of image URLs for different card statuses
const imageMapping = {
  backlog: backlog,
  inprogress: inprogress,
  todo: todo,
  done: done,
};

// Define a mapping of priority images
const priorityMapping = [priority0, priority1, priority2, priority3, priority4];

// Card component
const Card = ({ groupBy, cardId, cardTitle, tag, status, priority, user, usersId }) => {
  // Convert the status to lowercase and remove spaces from the status string
  const stat = status.toLowerCase().split(" ").join("");

  // Get the image URL for the current card status
  const imageUrl = imageMapping[stat];

  // useEffect to log the user information when the component mounts
  useEffect(() => {
    console.log(user);
  }, []);

  // Function to get user availability based on userId
  const getUserAvailability = (userId) => {
    const users = user.find((user) => user.id === userId);
    return users;
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <div className={styles.idContainer}>
            <p className={styles.cardId}>{cardId}</p>
            {groupBy !== "user" && (
              <div className={styles.cardOwner} title={getUserAvailability(usersId).name}>
                <img className={styles.ownerAvatar} src={getUserAvailability(usersId).icon} alt="" />
                <div
                  className={getUserAvailability(usersId).available ? styles.availabilityAvailable : styles.availability}
                ></div>
              </div>
            )}
          </div>
          <div className={styles.titleContainer}>
            {groupBy !== "status" && (
              <div className={styles.titleIconDiv}>
                <img className={styles.titleIcon} src={imageUrl} alt="" />
              </div>
            )}

            <div className={styles.titleDiv}>{cardTitle}</div>
          </div>
          <div className={styles.tagContainer}>
            {groupBy !== "priority" && (
              <div className={styles.tagIconDiv}>
                <img src={priorityMapping[priority]} className={styles.tagIcon} alt=""></img>
              </div>
            )}

            <div className={styles.tagName}>
              <div className={styles.tagCircle}></div>
              {tag.map((data, index) => {
                return (
                  <div key={index} className={styles.tagTitle}>
                    {data}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
