import React, { useEffect, useState } from "react";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";

const AllUserScreen = () => {
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState("ALL");
  const [allUsersList, setAllUsersList] = useState([]);

  const handleChange = (event) => {
    setSelectedUser(event.target.value);
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    const getUsersList = async () => {
      const response = await axios.post(
        "http://localhost:3030/getUsers",
        {
          query: selectedUser,
        },
        { withCredentials: true }
      );

      setAllUsersList(response.data.result);
    };

    getUsersList();
  }, []);

  const getUsers = async () => {
    const response = await axios.post(
      "http://localhost:3030/getUsers",
      {
        query: selectedUser,
      },
      { withCredentials: true }
    );

    setUserList(response.data.result);
  };

  return (
    <div style={styles.root}>
      <div style={styles.nonTableContainer}>
        <FormControl variant="filled" style={styles.formTableStyle}>
          <InputLabel id="demo-simple-select-filled-label">Users</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={selectedUser}
            onChange={handleChange}
          >
            <MenuItem value="ALL">
              <em>ALL</em>
            </MenuItem>
            {allUsersList.map((user) => {
              return (
                <MenuItem value={user.name}>
                  <em>{user.name}</em>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <SearchIcon
          style={styles.iconStyle}
          onClick={() => {
            getUsers();
          }}
        />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Cell Number</TableCell>
              <TableCell align="right">Created At</TableCell>
              <TableCell align="right">Is Deleted</TableCell>
              <TableCell align="right">Age</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map((row) => (
              <TableRow
                key={row.Id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="right" scope="row">
                  {row.Id}
                </TableCell>
                <TableCell component="right" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.cell_no}</TableCell>
                <TableCell align="right">{row.created_at}</TableCell>
                <TableCell align="right">
                  {row.is_deleted === 0 ? "NO" : "YES"}
                </TableCell>
                <TableCell align="right">{row.age}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const styles = {
  root: {
    display: "flex",
    flex: 1,
    width: "100%",
    height: "100vh",
    flexDirection: "column",
  },
  nonTableContainer: {
    display: "flex",
    width: "100%",
    height: "10vh",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  formTableStyle: {
    display: "flex",
    width: "75%",
  },
  iconStyle: {
    cursor: "pointer",
    fontSize: "50px",
    display: "flex",
    width: "10%",
  },
};

export default AllUserScreen;
