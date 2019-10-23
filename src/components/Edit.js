import "date-fns";
import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Switch,
  Modal,
  makeStyles
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles(theme => ({
  paper: {
    display: "flex",
    flexFlow: "column",
    width: "50%",
    margin: "auto",
    marginTop: window.innerHeight / 6,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

function Edit({ open, editData, data, setOpen, editTask }) {
  const classes = useStyles();
  const [updatedTask, setUpdatedTask] = useState({ ...editData });

  useEffect(() => {
    setUpdatedTask(editData);
  }, [editData]);

  function handleDateChange(date) {
    setUpdatedTask({ ...updatedTask, date: date });
  }

  function handleChangeDescription(e) {
    setUpdatedTask({ ...updatedTask, description: e.target.value });
  }

  function handleChangeTitle(e) {
    setUpdatedTask({ ...updatedTask, title: e.target.value });
  }

  function handleStatus() {
    if (updatedTask.status) {
      return setUpdatedTask({ ...updatedTask, status: false });
    }
    return setUpdatedTask({ ...updatedTask, status: true });
  }

  function handleSubmit(e) {
    Object.assign(
      data[data.findIndex(d => d.id === updatedTask.id)],
      updatedTask
    );
    editTask([...data]);
    setOpen(false);
    e.preventDefault();
  }
  return (
    <div className="edit-todo">
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={() => setOpen(false)}
        className={"pitcher modal"}
      >
        <div className={classes.paper}>
          <TextField
            value={updatedTask.title}
            id="item-title"
            label={"Item Title"}
            className="item-title"
            onChange={handleChangeTitle}
            type="text"
            margin="normal"
          />
          <TextField
            value={updatedTask.description}
            id="description"
            label={"Description"}
            className="description"
            onChange={handleChangeDescription}
            type="text"
            margin="normal"
          />
          <div className="toggle-container">
            <p> To Do </p>
            <Switch
              checked={updatedTask.status}
              value="checkedC"
              inputProps={{ "aria-label": "primary checkbox" }}
              onClick={handleStatus}
            />
            <p> Done </p>
          </div>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="flex-start">
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date picker inline"
                value={updatedTask.date}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>

          <Button
            variant="contained"
            color="primary"
            className="submit button"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default Edit;
