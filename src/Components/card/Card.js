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
const imageMapping = {
  backlog: backlog,
  inprogress: inprogress,
  todo: todo,
  done: done,
};

const priorityMapping = [priority0, priority1, priority2, priority3, priority4];
const Card = ({ groupBy, cardId, cardTitle, tag, status, priority, user, usersId }) => {
  const stat = status.toLowerCase().split(" ").join("");

  const imageUrl = imageMapping[stat];

  useEffect(()=>{
    console.log(user);
  },[])
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
                  // className={`availability ${
                  //   getUserAvailability(usersId).available ? "available" : ""
                  // }`}
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
