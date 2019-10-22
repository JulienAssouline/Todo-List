import "date-fns";
import React, { useState } from "react";
import {
  Button,
  TextField,
  Switch,
  Modal,
  makeStyles,
  Fab
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import uuidv1 from "uuid/v1";
import AddIcon from "@material-ui/icons/Add";

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

function AddTasks({ addTask, task }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [status, setStatus] = useState(false);

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleChangeTitle(e) {
    setTitle(e.target.value);
  }

  function handleStatus() {
    if (status) {
      setStatus(false);
    } else {
      setStatus(true);
    }
  }

  function handleSubmit() {
    addTask([
      ...task,
      {
        id: uuidv1(),
        title: title,
        description: description,
        status: status,
        date: selectedDate
      }
    ]);
    setTitle("");
    setDescription("");
    setStatus(false);
    setSelectedDate(new Date());
    setOpen(false);
  }

  return (
    <div className="add-todo">
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={() => setOpen(false)}
        className={"pitcher modal"}
      >
        <div className={classes.paper}>
          <TextField
            value={title}
            id="item-title"
            label={"Item Title"}
            className="item-title"
            onChange={handleChangeTitle}
            type="text"
            margin="normal"
          />
          <TextField
            value={description}
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
                value={selectedDate}
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
      <Fab
        onClick={() => setOpen(true)}
        size="small"
        aria-label="add"
        className={classes.fab}
        color="primary"
      >
        <AddIcon />
      </Fab>
    </div>
  );
}

export default AddTasks;
