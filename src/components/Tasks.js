import React, { useState } from "react";
import AddTasks from "./AddTasks";
import Todo from "./Todo";
import Done from "./Done";
import {ParseDate} from "../utils/ParseDate"
import uuidv1 from "uuid/v1";
import {
  TextField,
} from "@material-ui/core";
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';


function Tasks() {
  const [task, setTask] = useState([
    {
      id: uuidv1(),
      title: "todo",
      description: "first desc",
      status: false,
      date: new Date(2019, 9, 20)
    },
    {
      id: uuidv1(),
      title: "todo done",
      description: "first desc",
      status: true,
      date: new Date()
    }
  ])
  const [searchTask, setSearchTask] = useState("")

  function handleChangeTask(e) {
    setSearchTask(e.target.value)
  }

  function changeTask(value) {
    setTask(value);
  }

  if (task.length === 0) return <AddTasks task={task} addTask={changeTask} />;
  const filteredTask = task.filter(d => searchTask === "" || d.title.includes(searchTask))

  const doneTasks = filteredTask.filter(d => d.status);
  const taskTodo = filteredTask.filter(d => !d.status);

  const Dates = task.filter(d => !d.status).map(d => d.date)

  console.log(Dates)

  return (
    <div className="todo-list-container">
    <div className = "task-container">
       <TextField
            value={searchTask}
            id="item-title"
            label={"Search Task"}
            className="item-title"
            onChange={handleChangeTask}
            type="text"
            margin="normal"
            variant="outlined"
          />
      <div className="task-status-container">
        <Todo
          data={filteredTask}
          editTask={changeTask}
          taskTodo={taskTodo}
          removeTask={changeTask}
          ParseDate={ParseDate}
        />
        <Done
          data={filteredTask}
          editTask={changeTask}
          doneTasks={doneTasks}
          removeTask={changeTask}
          ParseDate={ParseDate}
        />
        <AddTasks task={filteredTask} addTask={changeTask} />
      </div>
      </div>
      <div className = "line"></div>
      <div className = "calender-container">
           <DayPicker
      initialMonth={new Date()}
      selectedDays={Dates}
    />
    </div>
    </div>
  );
}

export default Tasks;
