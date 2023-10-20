import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { GridLoader } from "react-spinners";
import Navbar from "../navbar/Navbar";
import styles from "./styles.module.css"
import GroupBy from "../group/GroupBy";
const Home = () => {
  const [groupBy, setgroupBy] = useState(sessionStorage.getItem("groupBy") || "status");
  const [orderBy, setOrderBy] = useState(sessionStorage.getItem("orderBy") || "priority");
  const [tickets, settickets] = useState([]);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    if(!sessionStorage.getItem("users") || !sessionStorage.getItem("tickets")){
      axios
      .get("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => {
        console.log(response);
        settickets((prevtickets) => (prevtickets = response.data.tickets));
        setUsers((prevUser) => (prevUser = response.data.users));
        sessionStorage.setItem("users",JSON.stringify(response.data.users));
        sessionStorage.setItem("tickets",JSON.stringify(response.data.tickets));
      })
      .catch((error) => {
        alert("There is some technical issue please try later");
        console.log(error);
      });
    }else{
      settickets(JSON.parse(sessionStorage.getItem("tickets")));
      setUsers(JSON.parse(sessionStorage.getItem("users")));
    }
    
  }, []);

  return (
    <div className={styles.mainContainer}>
      <Navbar
        groupBy={groupBy}
        setgroupBy={setgroupBy}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
      ></Navbar>

      <div className={styles.container}>
        {users && tickets ? (
          <GroupBy
            tickets={tickets}
            groupBy={groupBy}
            orderBy={orderBy}
            users={users}
          />
        ) : (
          <div className={styles.loader}>
            <GridLoader color="#36d7b7" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
