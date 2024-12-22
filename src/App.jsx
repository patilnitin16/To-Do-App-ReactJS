import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todolist, setTodolist] = useState([]);

  useEffect(() => {
    const newlist = localStorage.getItem("itemsaved");
    if (newlist) {
      try {
        setTodolist(JSON.parse(newlist));
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  const saveData = () => {
    try {
      localStorage.setItem("itemsaved", JSON.stringify(todolist));
    } catch (err) {
      console.error(err);
    }
  };

  const inputhandler = (e) => {
    setTodo(e.target.value);
    saveData();
  };

  const submittodo = () => {
    if (todo.trim() !== "") {
      setTodolist([...todolist, { text: todo, isCompleted: false }]);
    }
    setTodo("");
    saveData();
  };

  const edititem = (idx) => {
    setTodo(todolist[idx].text);
    deleteitem(idx);
    saveData();
  };

  const doneItem = (idx) => {
    let completedTodo = todolist.map((item, itemid) =>
      idx === itemid ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodolist(completedTodo);
    saveData();
  };

  const deleteitem = (idx) => {
    let newTodo = todolist.filter((_, elemid) => idx != elemid);
    setTodolist(newTodo);
    saveData();
  };

  // useEffect(() => {
  //   saveData();
  // }, [todolist]);

  return (
    <div>
      <Navbar />
      <div className="max-w-[1080px] mx-auto my-[15px] bg-slate-200 rounded py-[10px] px-[20px]">
        <div className="flex flex-col gap-[20px] mb-[20px]">
          <h2 className="text-lg mt-[6px]">ADD TODO's</h2>
          <div className="flex items-center justify-start gap-[50px]">
            <input
              className="py-[7px] px-[20px] w-[500px] border-[1px]"
              type="text"
              value={todo}
              onChange={inputhandler}
            />
            <button
              className="bg-slate-500 text-white py-[6px] px-[10px] rounded"
              onClick={submittodo}
            >
              ADD TODO
            </button>
          </div>
        </div>
      </div>

      {/* todo list */}
      <div className="max-w-[1080px] mx-auto my-[15px] bg-slate-200 rounded py-[10px] px-[20px]">
        <h2 className="text-xl underline mb-[10px]">To-Do List</h2>
        {todolist.map((elem, idx) => {
          return (
            <div
              key={idx}
              className="flex items-center justify-start gap-[130px] border-[2px] border-[black] py-[10px] px-[15px] my-[10px]"
            >
              <div className="flex gap-[20px]">
                <input
                  type="checkbox"
                  checked={elem.isCompleted}
                  onChange={() => {
                    doneItem(idx);
                  }}
                />

                <p
                  className={`w-[600px] text-lg ${
                    elem.isCompleted ? "line-through text-gray-500" : ""
                  }`}
                >
                  {elem.text}
                </p>
              </div>

              <button
                className="bg-slate-500 text-white w-[70px] h-[30px] rounded"
                onClick={() => {
                  edititem(idx);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => deleteitem(idx)}
                className="bg-slate-500 text-white w-[70px] h-[30px] rounded"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
