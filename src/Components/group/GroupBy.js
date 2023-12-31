import React, { useState } from "react";
import Card from "../card/Card";
import backlog from "../../imgs/loading.png";
import inprogress from "../../imgs/Partial.png";
import todo from "../../imgs/record.png";
import done from "../../imgs/check.png";
import anoopsharma from "../../imgs/anoopsharma.png";
import shankarkumar from "../../imgs/shankarkumar.jpg";
import ramesh from "../../imgs/ramesh.jpg";
import suresh from "../../imgs/suresh.png";
import yogesh from "../../imgs/yogesh.png";
import avatar from "../../imgs/Avatar.png"

import cancel from "../../imgs/cancel.png";
import { useEffect } from "react";
import styles from "./styles.module.css";
import priority0 from "../../imgs/priority-0.png";
import priority1 from "../../imgs/priority-1.png";
import priority2 from "../../imgs/priority-2.png";
import priority3 from "../../imgs/priority-3.png";
import priority4 from "../../imgs/priority-4.png";

const GroupBy = ({ tickets, groupBy, orderBy, users }) => {
  // Define state to store updated filtered tickets
  const [updatedFilteredTickets, setUpdatedFilteredTickets] = useState([]);

  // Define a mapping of user icons
  const userIcons = {
    anoopsharma: anoopsharma,
    shankarkumar: shankarkumar,
    ramesh: ramesh,
    suresh: suresh,
    yogesh: yogesh,
  };

  // Map user data to include icons
  const user = users.map((user) => ({
    ...user,
    icon: userIcons[user.name.toLowerCase().split(" ").join("")] || avatar,
  }));

  // Define status options
  const status = [
    {
      icon: backlog,
      name: "Backlog",
    },
    {
      icon: todo,
      name: "Todo",
    },
    {
      icon: inprogress,
      name: "In progress",
    },
    {
      icon: done,
      name: "Done",
    },
    {
      icon: cancel,
      name: "Canceled",
    },
  ];

  // Define priority options
  const priority = [
    {
      icon: priority0,
      name: "No Priority",
      number: 0,
    },
    {
      icon: priority4,
      name: "Urgent",
      number: 4,
    },
    {
      icon: priority3,
      name: "High",
      number: 3,
    },
    {
      icon: priority2,
      name: "Medium",
      number: 2,
    },
    {
      icon: priority1,
      name: "Low",
      number: 1,
    },
  ];

  // Function to update the filtered tickets based on grouping and ordering
  const updateFilteredTickets = () => {
    switch (groupBy) {
      case "priority":
        let updatedPriority = [...priority];

        if (orderBy === "priority") {
          updatedPriority.sort((a, b) => b.number - a.number);
        }

        const updatedFilteredPriority = updatedPriority.map((priorityItem) => ({
          ...priorityItem,
          tickets: tickets
            .filter((ticket) => ticket.priority === priorityItem.number)
            .sort((a, b) => {
              if (orderBy === "title") {
                return a.title.localeCompare(b.title);
              }

              return 0;
            }),
        }));

        setUpdatedFilteredTickets(updatedFilteredPriority);
        break;
      case "status":
        const updatedFilteredStatus = status.map((statusItem) => ({
          ...statusItem,
          tickets: tickets
            .filter((ticket) => ticket.status.toLowerCase().split(" ").join("") === statusItem.name.toLowerCase().split(" ").join(""))
            .sort((a, b) => {
              if (orderBy === "priority") {
                return b.priority - a.priority;
              } else if (orderBy === "title") {
                return a.title.localeCompare(b.title);
              }
              return 0;
            }),
        }));
        setUpdatedFilteredTickets(updatedFilteredStatus);
        break;
      case "user":
        const updatedFilteredUsers = user.map((userItem) => ({
          ...userItem,
          tickets: tickets
            .filter((ticket) => ticket.userId === userItem.id)
            .sort((a, b) => {
              if (orderBy === "priority") {
                return b.priority - a.priority;
              } else if (orderBy === "title") {
                return a.title.localeCompare(b.title);
              }
              return 0;
            }),
        }));
        setUpdatedFilteredTickets(updatedFilteredUsers);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    // Function to handle the scroll event for the horizontal scroll
    const handleHorizontalScroll = () => {
      const scrollXPosition = window.scrollX;
      sessionStorage.setItem('scrollXPosition', scrollXPosition);
    };

    // Attach the scroll event listener for horizontal scroll
    window.addEventListener('scroll', handleHorizontalScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleHorizontalScroll);
    };
  }, []);

  useEffect(() => {
    // Restore the horizontal scroll position when the component mounts
    const savedScrollXPosition = sessionStorage.getItem('scrollXPosition');
    if (savedScrollXPosition) {
      window.scrollTo(parseInt(savedScrollXPosition, 10), window.scrollY);
    }
  }, []);

  useEffect(() => {
    // Update filtered tickets when grouping or ordering changes
    updateFilteredTickets();
  }, [groupBy, tickets, orderBy]);

  return (
    <>
      <div className={styles.mainConatainer}>
        <div className={styles.wrapper}>
          <>
            <div className={styles.container}>
              {updatedFilteredTickets.map((data, index) => {
                return (
                  <>
                    <div key={index} className={styles.groupCardsMainDiv}>
                      <div className={styles.headings}>
                        <div className={styles.groupSectionDiv}>
                          <div className={styles.groupIconsDiv}>
                            <img className={styles.groupIcons} src={data.icon} alt="" />

                            {groupBy === "user" && <div className={data.available ? styles.availabilityAvailable : styles.availability}></div>}
                          </div>
                          <div className={styles.ticketNames}>{data.name}</div>
                          <div className={styles.noOfTickets}>{data.tickets.length}</div>
                        </div>
                        <div className={styles.dataOptionsDiv}>
                          <div className={styles.addData}></div>
                          <div className={styles.dataOptions}></div>
                        </div>
                      </div>
                      {data.tickets.map((ticket, index) => (
                        <Card key={index} groupBy={groupBy} cardId={ticket.id} cardTitle={ticket.title} tag={ticket.tag} status={ticket.status} priority={ticket.priority} user={user} usersId={ticket.userId} />
                      ))}
                    </div>
                  </>
                );
              })}
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default GroupBy;
