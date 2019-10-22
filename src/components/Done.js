import React, { useState } from "react";
import { Paper, makeStyles, Fab } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Edit from "./Edit";

const useStyles = makeStyles(() => ({
  paper: {
    display: "flex",
    flexFlow: "column",
    alignItems: "flex-start",
    margin: "auto",
    padding: 10,
    paddingRight: 20,
    paddingLeft: 20,
    width: 200,
    borderRadius: 25,
  },
  fab: {
    margin: 10
  },
  extendedIcon: {
    marginRight: 10
  }
}));

function Done({ data, doneTasks, ParseDate, removeTask, editTask }) {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({});

  const classes = useStyles();

  function handleDelete(item) {
    const dataFiltered = data.filter(d => d !== item);
    removeTask(dataFiltered);
  }

  function handleEdit(d) {
    setOpen(true);
    setEditData(d);
  }

  return (
    <div className="done-container">
      <h2 className = "task-title"> Done </h2>
      <Edit
        editTask={editTask}
        open={open}
        setOpen={setOpen}
        editData={editData}
        data={data}
      />
      {doneTasks.map((d, i) => (
        <Paper className={classes.paper} key={i + "items"}>
          <h3> {d.title} </h3>
          <p> {d.description} </p>
          <p> {ParseDate(d.date)} </p>
          <div className="edit-delete-container">
            <Fab
              size="small"
              color="secondary"
              aria-label="edit"
              className={classes.fab}
              onClick={() => handleEdit(d)}
            >
              <EditIcon />
            </Fab>
            <Fab
              onClick={() => handleDelete(d)}
              size="small"
              aria-label="delete"
              className={classes.fab}
            >
              <DeleteIcon />
            </Fab>
          </div>
        </Paper>
      ))}
    </div>
  );
}

export default Done;
