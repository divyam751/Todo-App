import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";

import "./todo.css";

const Todo = ({ setStart }) => {
  const [task, setTask] = useState("");
  const [data, setData] = useState([]);

  const changeState = (id) => {
    let flag = true;
    for (let i of data) {
      if (i.id === id) {
        console.log(!i.status, i.id);
        if (i.status) {
          flag = false;
          break;
        }
      } else {
        console.log(i.status, i.id);
        if (!i.status) {
          flag = false;
          break;
        }
      }
    }
    if (flag) {
      setStart(true);
    }
  };

  const fetchData = () => {
    axios.get("http://localhost:8080/todos").then((res) => {
      setData(res.data);
    });
  };

  // Toggle Function
  const handleToggle = async (id, status) => {
    await axios.patch(`http://localhost:8080/todos/${id}`, { status: !status });

    await fetchData();

    await changeState(id);
  };
  // CheckBox Function for display Delte Button
  const handleCheckbox = (id, checked) => {
    axios
      .patch(`http://localhost:8080/todos/${id}`, { checked: !checked })
      .then(() => {
        fetchData();
      });
  };
  //   Delete function
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/todos/${id}`).then(() => {
      fetchData();
    });
  };

  //  Submit Function
  const handleSubmit = () => {
    axios.post("http://localhost:8080/todos", {
      title: task,
      status: false,
      checked: false,
    });
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Todo Application</h1>
      <input
        type='text'
        placeholder='Enter Todo Task'
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      &nbsp;
      <button onClick={handleSubmit}>Submit</button>
      <br />
      <br />
      <div className='Container'>
        {data.map((item) => {
          return (
            <div id='card' key={item.id}>
              <h3>
                <input
                  type='checkbox'
                  onChange={() => handleCheckbox(item.id, item.checked)}
                />
                {item.title}
              </h3>
              <div id='buttons'>
                <button
                  onClick={() => handleToggle(item.id, item.status)}
                  className={item.status ? "Green" : "Red"}
                >
                  {item.status ? "Completed" : "Pending"}
                </button>
                &nbsp; &nbsp;
                {item.checked ? (
                  <button id='btn' onClick={() => handleDelete(item.id)}>
                    Delete
                    <AiFillDelete />
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
