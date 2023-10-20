import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { GridLoader } from "react-spinners";
import Navbar from "../navbar/Navbar";
import styles from "./styles.module.css"
import GroupBy from "../group/GroupBy";

// Home component
const Home = () => {
  // State variables for grouping, ordering, tickets, and users
  const [groupBy, setgroupBy] = useState(sessionStorage.getItem("groupBy") || "status");
  const [orderBy, setOrderBy] = useState(sessionStorage.getItem("orderBy") || "priority");
  const [tickets, settickets] = useState([]);
  const [users, setUsers] = useState(null);

  // useEffect to fetch data from an API or use cached data from sessionStorage
  useEffect(() => {
    if (!sessionStorage.getItem("users") || !sessionStorage.getItem("tickets")) {
      // Fetch data from the API if it's not cached
      axios
        .get("https://api.quicksell.co/v1/internal/frontend-assignment")
        .then((response) => {
          console.log(response);

          // Set the fetched data in state
          settickets((prevtickets) => (prevtickets = response.data.tickets));
          setUsers((prevUser) => (prevUser = response.data.users));

          // Cache the fetched data in sessionStorage
          sessionStorage.setItem("users", JSON.stringify(response.data.users));
          sessionStorage.setItem("tickets", JSON.stringify(response.data.tickets));
        })
        .catch((error) => {
          // Handle errors if the API request fails
          alert("There is some technical issue, please try again later");
          console.log(error);
        });
    } else {
      // Use cached data from sessionStorage if it exists
      settickets(JSON.parse(sessionStorage.getItem("tickets")));
      setUsers(JSON.parse(sessionStorage.getItem("users")));
    }
  }, []);

  return (
    <div className={styles.mainContainer}>
      {/* Render the Navbar component */}
      <Navbar
        groupBy={groupBy}
        setgroupBy={setgroupBy}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
      ></Navbar>

      <div className={styles.container}>
        {users && tickets ? (
          // If users and tickets data are available, render the GroupBy component
          <GroupBy
            tickets={tickets}
            groupBy={groupBy}
            orderBy={orderBy}
            users={users}
          />
        ) : (
          // If data is not available, display a loading spinner
          <div className={styles.loader}>
            <GridLoader color="#36d7b7" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;