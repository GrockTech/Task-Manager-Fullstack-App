import React, { useState } from "react";
import "./task.css";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import DatePicker from "react-datepicker";
import { BsCheck2Square } from "react-icons/bs";
import { BiSolidTimer } from "react-icons/bi";

import "react-datepicker/dist/react-datepicker.css";

import { MdOutlineSearch } from "react-icons/md";
import useFetch from "../../hooks/useFetch";

const Task = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(null);

  // console.log(sort);
  const { data, error, loading, reFetch } = useFetch(
    `http://localhost:5000/api/tasks?search=${search}&sort=${sort}`
  );
  // console.log(data)
  const [formData, setFormData] = useState({
    subject: "",
    task: "",
    _id: null,
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
  };

  const [isEditing, setIsEditing] = useState(false);
  const [taskID, setTaskID] = useState("");

  const handleSubmit = async (e) => {
    const subject = e.target[0].value;
    const task = e.target[1].value;

    const dateValue = startDate;

    try {
      const res = await fetch("http://localhost:5000/api", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          subject,
          task,
          dateValue,
        }),
      });

      if (!res) {
        console.log("Task not sent");
        return;
      }

      if (res.ok) {
        console.log("task added successfuly");
        reFetch();
      }
      e.target.reset();
    } catch (error) {
      console.log({ message: error.message });
    }
  };

  const handleDelete = async (_id) => {
    try {
      fetch(`http://localhost:5000/api/${_id}`, {
        method: "DELETE",
      });

      reFetch();
      console.log("task deleted");
    } catch (error) {
      console.log("couldnt delete");
    }
  };

  // }
  const handleEdit = async (_id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/task/${_id}`);
      if (!response.ok) {
        console.log("Error fetching task data");
        return;
      }

      const taskData = await response.json();

      // Set the formData state with the fetched task data
      setFormData({
        subject: taskData.subject,
        task: taskData.task,
        id: taskData._id,
      });
      console.log("fetched successfuly");

      setTaskID(taskData._id);
      setIsEditing(true);
      // Set the DatePicker to the task's execution date
      // setStartDate(new Date(taskData.executionDate));
    } catch (error) {
      console.log("Error fetching task data:", error);
    }
  };

  const updateTask = async (e) => {
    e.preventDefault();

    try {
      await fetch(`http://localhost:5000/api/${taskID}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          subject: formData.subject,
          task: formData.task,
        }),
      });
      setFormData({ subject: "", task: "", _id: null });
      setIsEditing(false);
      reFetch();
    } catch (error) {
      console.log();
    }
  };

  return (
    <div className="taskContainer">
      <div className="taskWrapper">
        <div className="left">
          <div className="searchWrapper">
            <MdOutlineSearch size={32} />
            <input
              type="search"
              placeholder="search by content...."
              className="search-input"
              onChange={handleChange}
              value={search}
            />
          </div>

          <div className="bottom">
            {!data
              ? "no data"
              : data.map((item, index) => (
                  <div className="taskbodyWrapper" key={index}>
                    <div className="taskMessage">
                      <h3 className="taskSubject">{item.subject}</h3>

                      {item.task}
                      <br />
                      <br />

                      <div className="dateCreated">
                        <BiSolidTimer size={22} color="teal" />
                        <span>{item.createdAt}</span>
                      </div>

                      <hr />
                    </div>

                    <div className="icons">
                      {/* delete */}
                      <AiFillDelete
                        size={28}
                        color="red"
                        onClick={() => handleDelete(item._id)}
                      />
                      <BiEdit size={28} onClick={() => handleEdit(item._id)} />
                      <BsCheck2Square size={28} color="purple" />
                    </div>
                  </div>
                ))}
          </div>
        </div>
        <div className="right">
          <form
            className="addTaskWrapper"
            onSubmit={isEditing ? updateTask : handleSubmit}
          >
            <div className="taskBody">
              <input
                name="subject"
                className="input-field"
                type="text"
                value={formData.subject}
                placeholder="Task Subject"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    subject: e.target.value,
                  })
                }
              />

              <textarea
                className="input-field"
                name="Task"
                id=""
                value={formData.task}
                cols="30"
                rows="10"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    task: e.target.value,
                  })
                }
              ></textarea>
            </div>

            <div className="dateWrapper">
              {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
              <label htmlFor="executionDate">Execution Date:</label>
              <DatePicker
                id="executionDate"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>

            <div className="btnAdd">
              <AiOutlinePlus size="20" color="#fff" />
              <button className="addButton">
                {isEditing ? "Update" : "Add Task"}
              </button>
            </div>
          </form>

          <div className="sort">
            <h3>Sort By: </h3>

            <div className="sortAsc">
              <label htmlFor="asc">Latest</label>
              <input
                className="input--field"
                type="radio"
                id="asc"
                value="newest"
                onChange={(e) => setSort("asc")}
                name="sort"
              />
              <br />
            </div>

            <div className="sortDesc">
              <label htmlFor="desc">Oldest</label>
              <input
                className="input--field"
                type="radio"
                onChange={(e) => setSort("desc")}
                value="desc"
                name="sort"
                id="desc"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
