import {  doc, updateDoc } from "firebase/firestore";
import React from "react";
import { db } from "../Config/firebase";
import toast from "react-hot-toast";     

function TodoList({
  item,
  showMenu,
  setShowmenu,
  toggleMenu,
  closeMenu,
  filterData,
  setTodoList,
  getTodoList,
  setFilterTitle,
}) {
  const handleDelete = async (id) => {
    try {
      const deleteTodo = doc(db, "todo", id);
      await updateDoc(deleteTodo, {
        status: "delete",
      });
      const data = filterData.filter((item) => item.id !== id);
      setTodoList(data);
      setFilterTitle("All");
      getTodoList();
      setShowmenu(false);
      toast.success("Deleted..!");
    } catch (err) {
      console.log(err);
    }
  };

  const handleFavourite = async (id) => {
    try {
      const deleteTodo = doc(db, "todo", id);
      await updateDoc(deleteTodo, {
        status: "favourite",
      });

      const data = filterData.filter((item) => item.id !== id);
      setTodoList(data);
      getTodoList();
      setFilterTitle("All");
      setShowmenu(false);
      toast.success("Favourited..!");
    } catch (err) {
      console.log(err);
    }
  };

  const handleComplete = async (id) => {
    try {
      const deleteTodo = doc(db, "todo", id);
      await updateDoc(deleteTodo, {
        status: "completed",
      });

      const data = filterData.filter((item) => item.id !== id);
      setTodoList(data);
      setFilterTitle("All");
      getTodoList();
      setShowmenu(false);
      toast.success("Completed..!");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className=" w-full mb-5 hover:bg-gray-500 cursor-pointer hover:rounded-md">
        <div className="   px-2  w-full flex  justify-between items-center">
          <div className=" flex flex-col">
            <span className=" font-[600] text-[17px]">{item.title}</span>
            <span className=" font-[400] text-[13px] opacity-[85%]">
              {item.description}{" "}
            </span>
          </div>

          <div>
            <svg
              onClick={() => toggleMenu(item.id)}
              className=" cursor-pointer"
              width="4"
              height="16"
              viewBox="0 0 4 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.75 1.73047C0.75 2.06199 0.881696 2.37993 1.11612 2.61435C1.35054 2.84877 1.66848 2.98047 2 2.98047C2.33152 2.98047 2.64946 2.84877 2.88388 2.61435C3.1183 2.37993 3.25 2.06199 3.25 1.73047C3.25 1.39895 3.1183 1.08101 2.88388 0.846585C2.64946 0.612165 2.33152 0.480469 2 0.480469C1.66848 0.480469 1.35054 0.612165 1.11612 0.846585C0.881696 1.08101 0.75 1.39895 0.75 1.73047ZM0.75 7.98047C0.75 8.31199 0.881696 8.62993 1.11612 8.86435C1.35054 9.09877 1.66848 9.23047 2 9.23047C2.33152 9.23047 2.64946 9.09877 2.88388 8.86435C3.1183 8.62993 3.25 8.31199 3.25 7.98047C3.25 7.64895 3.1183 7.33101 2.88388 7.09659C2.64946 6.86217 2.33152 6.73047 2 6.73047C1.66848 6.73047 1.35054 6.86217 1.11612 7.09659C0.881696 7.33101 0.75 7.64895 0.75 7.98047ZM0.75 14.2305C0.75 14.562 0.881696 14.8799 1.11612 15.1144C1.35054 15.3488 1.66848 15.4805 2 15.4805C2.33152 15.4805 2.64946 15.3488 2.88388 15.1144C3.1183 14.8799 3.25 14.562 3.25 14.2305C3.25 13.8989 3.1183 13.581 2.88388 13.3466C2.64946 13.1122 2.33152 12.9805 2 12.9805C1.66848 12.9805 1.35054 13.1122 1.11612 13.3466C0.881696 13.581 0.75 13.8989 0.75 14.2305Z"
                fill="black"
                fillOpacity="0.85"
              />
            </svg>
          </div>
        </div>
        <hr className=" mt-2" />
      </div>

      <div>
        {showMenu === item.id ? (
          <div
            ref={closeMenu}
            className="inline-flex bg-slate-300  absolute right-0 top-[240px]
               flex-col text-[14px]  font-[400] W-[220px] mt-2 shadow-md px-3 py-2  cursor-pointer "
          >
            <span
              onClick={() => handleComplete(item.id)}
              className=" hover:bg-[#F5F5F5]  w-full "
            >
              Completed
            </span>
            <span
              onClick={() => handleFavourite(item.id)}
              className=" my-2 hover:bg-[#F5F5F5]"
            >
              Favourite
            </span>
            <span
              onClick={() => handleDelete(item.id)}
              className="hover:bg-[#F5F5F5]"
            >
              Delete
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default TodoList;
