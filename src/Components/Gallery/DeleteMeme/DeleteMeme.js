import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { useState } from "react";

import "./DeleteMeme.css";
import { useEffect } from "react";

const StyledTableCell = withStyles((theme) => ({
  head: {
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const DeleteMeme = () => {
  const [meme, setMeme] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/memes")
      .then((res) => res.json())
      .then((data) => setMeme(data));
  }, []);


  const handleDelete = (id) => {
    fetch(`http://localhost:5000/deleteMemes/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          deleteStudents();
          alert("Meme Deleted Successfully");
        }
      });
  };
  const deleteStudents = () => {
    fetch(`http://localhost:5000/memes`)
      .then((res) => res.json())
      .then((data) => setMeme(data));
  };

  const classes = useStyles();
  return (
    <div className="row m-0">
      <div className="col-md-12 mt-2 col-sm-10">
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead style={{ backgroundColor: "#0B4C61" }}>
              <TableRow>
                <StyledTableCell align="left">Image</StyledTableCell>
                <StyledTableCell align="left">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {meme.map((m) => (
                <StyledTableRow key={m.name}>
                  <StyledTableCell component="th" scope="row">
                    <img
                      style={{ width: "8rem", height: "8rem" }}
                      src={m.imageURL}
                      alt=""
                    />
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                  <button
                    className="alert alert-danger  p-button fw-bold"
                    onClick={() => handleDelete(m._id)}
                  >
                    delete
                  </button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default DeleteMeme;
