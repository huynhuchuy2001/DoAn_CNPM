import react, { useState, useEffect } from "react";

import {
  Table,
  TableHead,
  TableCell,
  Paper,
  TableRow,
  TableBody,
  Button,
  makeStyles,
} from "@material-ui/core";
import { getUsers, deleteUser, getAllUsers, sendEmail } from "../Service/api";
import { Link } from "react-router-dom";
import "../App.css";
import { faSortUp } from "@fortawesome/free-solid-svg-icons";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const useStyles = makeStyles({
  table: {
    width: "90%",
    margin: "50px 0 0 50px",
  },
  thead: {
    "& > *": {
      fontSize: 20,
      background: "#808080",
      color: "#black",
    },
  },
  row: {
    "& > *": {
      fontSize: 18,
    },
  },
  pagination: {
    margin: "30px",
  },
});
const styleButton = {
  background: "#white",
};

const AllUsers = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [query, setQuery] = useState({ pageNumber: 0, sort: "" });
  // const [sortQuery, setSortQuery] = useState("");
  // const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState([]);
  const pages = new Array(totalPages).fill(null).map((v, i) => i);
  const previous = () => {
    // setPageNumber(Math.max(0, pageNumber - 1))
    setQuery({ pageNumber: Math.max(0, query.pageNumber - 1), sort: query.sort });
  };
  const next = () => {
    // setPageNumber(Math.min(totalPages - 1, pageNumber + 1));
    setQuery({ pageNumber: Math.min(totalPages - 1, query.pageNumber + 1), sort: query.sort });
  };
  useEffect(() => {
    getAllUsers().then((res) => setAllUsers(res.data));
  }, []);
  useEffect(() => {
    getUsers(query.pageNumber, query.sort).then((res) => {
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
    });
  }, [query]);
  
  useEffect(() => {
    setUsers(
      allUsers.filter((val) => {
        // eslint-disable-next-line eqeqeq
        if (searchTerm == "") {
          return val;
        } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          return val;
        }
      })
    );
  }, [searchTerm]);
  const deleteUserData = async (id) => {
    await deleteUser(id);
    getAllUsers().then((res) => setAllUsers(res.data));
    getUsers(query.pageNumber,query.sort).then((res) => {
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
    });
  };

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Search by name..."
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />
      <button><FontAwesomeIcon icon={faSearch}/></button>
      <Table className={classes.table}>
        <TableHead>
          <TableRow className={classes.thead}>
            <TableCell>Name <button style={{styleButton}} onClick={()=>setQuery({ pageNumber: query.pageNumber, sort: 'name' })}><FontAwesomeIcon icon={faSortUp}/></button> <button onClick={()=>setQuery({ pageNumber: query.pageNumber, sort: '-name' })}><FontAwesomeIcon icon={faSortDown}/></button></TableCell>
            <TableCell>Username <button onClick={()=>setQuery({ pageNumber: query.pageNumber, sort: 'username' })}><FontAwesomeIcon icon={faSortUp} /></button> <button onClick={()=>setQuery({ pageNumber: query.pageNumber, sort: '-username' })}><FontAwesomeIcon icon={faSortDown} /></button></TableCell>
            <TableCell>Email <button onClick={()=>setQuery({ pageNumber: query.pageNumber, sort: 'email' })}><FontAwesomeIcon icon={faSortUp} /></button> <button onClick={()=>setQuery({ pageNumber: query.pageNumber, sort: '-email' })}><FontAwesomeIcon icon={faSortDown} /></button></TableCell>
            <TableCell>Phone <button onClick={()=>setQuery({ pageNumber: query.pageNumber, sort: 'phone' })}><FontAwesomeIcon icon={faSortUp} /></button> <button onClick={()=>setQuery({ pageNumber: query.pageNumber, sort: '-phone' })}><FontAwesomeIcon icon={faSortDown} /></button></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow className={classes.row} key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}{" "}<Button
                  color="primary"
                  variant="contained"
                  style={{ float:'right' }}
                  onClick={() => sendEmail(user._id)}
                >
                  Send email
                </Button></TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>
                <Button
                  color="primary"
                  variant="contained"
                  style={{ marginRight: 10 }}
                  component={Link}
                  to={`/edit/${user._id}`}
                >
                  Edit
                </Button>{" "}
                {/* change it to user.id to use JSON Server */}
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => deleteUserData(user._id)}
                >
                  Delete
                </Button>{" "}
                {/* change it to user.id to use JSON Server */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.pagination}>
        <button onClick={()=>previous()}>Previous</button>
        {pages.map((pageIndex) => (
          <button onClick={() => {
            // setPageNumber(pageIndex);
            setQuery({ pageNumber: pageIndex, sort: query.sort });
            }}>
            {pageIndex + 1}
          </button>
        ))}
        <button onClick={()=>next()}>Next</button>
      </div>
    </div>
  );
};

export default AllUsers;
