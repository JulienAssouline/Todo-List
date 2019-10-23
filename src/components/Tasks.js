import React, { useState } from "react";
import AddTasks from "./AddTasks";
import Todo from "./Todo";
import { ParseDate } from "../utils/ParseDate";
import uuidv1 from "uuid/v1";
import { TextField } from "@material-ui/core";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

function Tasks() {
  const [task, setTask] = useState([
    {
      id: uuidv1(),
      title: "todo done",
      description: "A finished todo task",
      status: true,
      date: new Date(2019, 9, 20)
    },
    {
      id: uuidv1(),
      title: "todo",
      description: "A task I have to finish",
      status: false,
      date: new Date()
    }
  ]);
  const [searchTask, setSearchTask] = useState("");

  function handleSearchTask(e) {
    setSearchTask(e.target.value);
  }

  function changeTask(value) {
    setTask(value);
  }

  if (task.length === 0) return <AddTasks task={task} addTask={changeTask} />;

  const searchedTasks = task.filter(
    d => searchTask === "" || d.title.includes(searchTask)
  );

  const doneTasks = searchedTasks.filter(d => d.status);
  const taskTodo = searchedTasks.filter(d => !d.status);

  const dates = task.filter(d => !d.status).map(d => d.date);

  return (
    <div className="todo-list-container">
      <div className="task-container">
        <TextField
          value={searchTask}
          id="item-title"
          label={"Search Task"}
          className="item-title"
          onChange={handleSearchTask}
          type="text"
          margin="normal"
          variant="outlined"
        />
        <div className="task-status-container">
          <Todo
            data={searchedTasks}
            editTask={changeTask}
            tasksTodo={taskTodo}
            removeTask={changeTask}
            ParseDate={ParseDate}
          />
          <Todo
            data={searchedTasks}
            editTask={changeTask}
            tasksTodo={doneTasks}
            removeTask={changeTask}
            ParseDate={ParseDate}
          />
          <AddTasks task={searchedTasks} addTask={changeTask} />
        </div>
      </div>
      <div className="line"></div>
      <div className="calender-container">
        <DayPicker initialMonth={new Date()} selectedDays={dates} />
      </div>
    </div>
  );
}

export default Tasks;
