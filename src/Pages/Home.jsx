import { getDocs, collection, addDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { auth, db } from "../Config/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import TodoList from "../Components/TodoList";

function Home() {
  const history = useNavigate();
  const [showMenu, setShowmenu] = useState(null);
  const [title, setTitle] = useState("");
  const [filterTitle, setFilterTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [search, setSearch] = useState("");
  const closeMenu = useRef(null);
  const mainUser = localStorage.getItem("user");
  const parsedMainUser = JSON.parse(mainUser);
  const [filterData, setFilterData] = useState([]);
  const collectionRef = collection(db, "todo");

  const getTodoList = async () => {
    const toastId = toast.loading("loading...");
    try {
      const data = await getDocs(collectionRef);
      const filter = data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((item) => item.userid === parsedMainUser.email);
      toast.success("Success", { id: toastId });
      setTodoList(filter);
      setFilterData(filter);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getTodoList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickOutside = (event) => {
    if (closeMenu.current && !closeMenu.current.contains(event.target)) {
      setShowmenu(false);
    }
  };

  useEffect(() => {
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);
  const toggleMenu = (id) => {
    setShowmenu((prevState) => (prevState === id ? null : id));
  };
  const handleSubmit = async () => {
    if (title && description) {
      const toastId = toast.loading("loading...");
      try {
        await addDoc(collection(db, "todo"), {
          title: title,
          description: description,
          status: "true",
          userid: parsedMainUser.email,
        });
        getTodoList();
      } catch (error) {
        console.log(error);
      }

      setDescription("");
      setTitle("");
      toast.success("Added", { id: toastId });
    } else {
      toast.error("fill the empty field");
    }
  };
  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        toast.success("Logout Success");
        history("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const selectFilter = (e) => {
    const toastId = toast.loading("loading...");

    if (e.target.value === "All") {
      toast.success("all list", { id: toastId });
      setFilterTitle("All");
      return setFilterData(todoList);
    }
    const filterd = todoList.filter(
      (item) => item.status.toLowerCase() === e.target.value.toLowerCase()
    );
    toast.success(`filtered by ${e.target.value}`, { id: toastId });
    setFilterData(filterd);
    setFilterTitle(e.target.value);
  };
  useEffect(() => {
    const filteredData = todoList.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilterData(filteredData);
  }, [search, todoList]);

  return (
    <div className="">
      {parsedMainUser ? (
        <div className=" grid lg:grid-cols-2 mt-10 mx-6   h-screen ">
          <div className="  ">
            <div className=" flex justify-between">
              <svg
                className="  cursor-pointer"
                width="44"
                height="66"
                viewBox="0 0 44 66"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.8014 0.00107963C20.3383 0.00179549 17.9764 0.979076 16.2347 2.71809C14.4931 4.45709 13.5143 6.81551 13.5136 9.27482V13.4877H9.29431C8.07373 13.4867 6.86492 13.726 5.73705 14.192C4.6092 14.6579 3.58443 15.3414 2.72137 16.2032C1.85831 17.0649 1.17391 18.0882 0.707315 19.2144C0.240727 20.3406 0.00111195 21.5476 0.00217905 22.7663V32.0368H13.5114V40.4626H9.29214C6.82838 40.4622 4.46538 41.4391 2.72282 43.1782C0.980269 44.9173 0.000860639 47.2761 0 49.7362V65.758H9.29649C10.5159 65.7575 11.7232 65.5172 12.8496 65.0504C13.976 64.584 14.9992 63.9004 15.861 63.0391C16.7228 62.1777 17.4061 61.1551 17.8721 60.0298C18.3381 58.9044 18.5775 57.6989 18.5767 56.4814H18.5886V50.3604L18.5637 50.3637V11.3678L18.5843 11.3726V9.27644C18.5864 8.15872 19.0313 7.08721 19.8218 6.2958C20.6122 5.50439 21.6841 5.05735 22.8036 5.05221H38.9391V9.27644C38.9356 10.3937 38.4892 11.464 37.6976 12.2535C36.9059 13.043 35.8333 13.4873 34.7144 13.4893H20.4938V18.5459H34.7122C37.1753 18.546 39.5375 17.5692 41.2793 15.8304C43.0211 14.0915 43.9997 11.7331 44 9.27375V0L22.8014 0.00107963ZM13.5136 26.9797H5.07179V22.7668C5.07365 21.6478 5.51902 20.575 6.31067 19.7828C7.10226 18.9907 8.17576 18.5436 9.29649 18.5394H13.5158L13.5136 26.9797ZM13.5136 56.486C13.5117 57.6031 13.0667 58.6742 12.276 59.4643C11.4853 60.2548 10.4131 60.7003 9.29431 60.7031H5.06962V49.7389C5.07064 48.621 5.51624 47.5493 6.30844 46.7593C7.10069 45.9692 8.17465 45.5257 9.29431 45.5261H13.5136V56.486ZM20.4938 32.0362H31.1502V36.2534C31.146 37.3705 30.6994 38.4404 29.9079 39.2298C29.1164 40.0191 28.0442 40.4636 26.9255 40.4663H20.4938V45.5261H26.9276C28.1475 45.5267 29.3556 45.2873 30.4827 44.8215C31.6098 44.3557 32.634 43.6726 33.4965 42.8113C34.3591 41.95 35.0432 40.9274 35.5098 39.802C35.9763 38.6766 36.2161 37.4704 36.2155 36.2524H36.2198V26.9786H20.4938V32.0362Z"
                  fill="#00314F"
                />
              </svg>
            </div>
            <div onClick={handleSignout} className="  flex  justify-end mr-6">
              <button className=" bg-black text-white border px-3 py-1">
                Signout
              </button>
            </div>

            <div className=" flex flex-col  justify-center items-center mt-10 ">
              <span className=" font-[700] text-[33px]">TODO</span>
              <p className=" sm:text-[20px] text-[16px] opacity-[55%] my-4 w-[500px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet
                at eleifend feugiat vitae faucibus nibh dolor dui. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit. Aliquet at eleifend
                feugiat vitae faucibus nibh dolor dui.
              </p>
              <div className=" flex flex-col w-[380px]">
                <input
                  className=" outline-none border h-[60px]  px-3 placeholder-black text-[20px] "
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  value={title}
                  placeholder="Title"
                  name="title"
                  id=""
                />
                <input
                  className=" outline-none border mt-3 h-[64px] px-3 placeholder-black text-[20px]"
                  value={description}
                  type="text"
                  placeholder="Description"
                  onChange={(e) => setDescription(e.target.value)}
                  name="description"
                  id=""
                />
                <div
                  onClick={handleSubmit}
                  className="bg-[#597EF7] cursor-pointer  text-white px-4 py-2  text-[20px] rounded-md text-center mt-3"
                >
                  Add
                </div>
              </div>
            </div>
          </div>

          <div className=" relative">
            <div className=" ">
              <span className=" font-[700] text-[25px]">TODO LIST</span>
            </div>
            <div className=" mt-7 flex justify-between ">
              <div className=" inline-flex items-center border-[#D9D9D9] py-[5px] border px-[12px]">
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  className=" outline-none"
                  type="text"
                  name=""
                  id=""
                  placeholder="Search"
                />
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.1003 14.1182L10.4628 9.48068C11.1824 8.55032 11.5717 7.41282 11.5717 6.2164C11.5717 4.78425 11.0128 3.4414 10.0021 2.4289C8.99135 1.4164 7.64492 0.859253 6.21456 0.859253C4.78421 0.859253 3.43778 1.41818 2.42706 2.4289C1.41456 3.43961 0.857422 4.78425 0.857422 6.2164C0.857422 7.64675 1.41635 8.99318 2.42706 10.0039C3.43778 11.0164 4.78242 11.5735 6.21456 11.5735C7.41099 11.5735 8.54671 11.1843 9.47706 10.4664L14.1146 15.1021C14.1282 15.1157 14.1443 15.1265 14.1621 15.1339C14.1799 15.1412 14.1989 15.145 14.2181 15.145C14.2374 15.145 14.2564 15.1412 14.2742 15.1339C14.292 15.1265 14.3081 15.1157 14.3217 15.1021L15.1003 14.3253C15.1139 14.3117 15.1247 14.2956 15.132 14.2778C15.1394 14.26 15.1432 14.241 15.1432 14.2218C15.1432 14.2025 15.1394 14.1835 15.132 14.1657C15.1247 14.1479 15.1139 14.1318 15.1003 14.1182ZM9.04314 9.04497C8.28599 9.80032 7.28242 10.2164 6.21456 10.2164C5.14671 10.2164 4.14314 9.80032 3.38599 9.04497C2.63064 8.28782 2.21456 7.28425 2.21456 6.2164C2.21456 5.14854 2.63064 4.14318 3.38599 3.38782C4.14314 2.63247 5.14671 2.2164 6.21456 2.2164C7.28242 2.2164 8.28778 2.63068 9.04314 3.38782C9.79849 4.14497 10.2146 5.14854 10.2146 6.2164C10.2146 7.28425 9.79849 8.28961 9.04314 9.04497Z"
                    fill="black"
                    fillOpacity="0.85"
                  />
                </svg>
              </div>
              <div className="border-[#D9D9D9] py-[5px] border px-[12px]">
                <select
                  onChange={(e) => selectFilter(e)}
                  name="Filterby"
                  id="Filterby"
                  value={filterTitle}
                  className=" cursor-pointer outline-none"
                >
                  <option value="All">All</option>
                  <option value="Completed">Completed</option>
                  <option value="favourite">favourite</option>
                  <option value="Delete">Delete</option>
                </select>
              </div>
            </div>
            {filterData.length < 1 ? (
              <div className="   flex h-full justify-center  content-center mt-16">
                <div className=" text-[30px] font-semibold capitalize">
                  add your tasks{" "}
                  <span className="text-blue-800 font-semibold">
                    {filterTitle ? `to ${filterTitle}` : null}
                  </span>
                </div>
              </div>
            ) : (
              <div className=" flex justify-between flex-col px-3 items-center mt-28 w-full">
                <div>
                  {filterTitle ? (
                    <div className=" mb-8 ">
                      Filtered By &nbsp;
                      <span className=" text-blue-800 font-semibold">
                        {filterTitle}
                      </span>{" "}
                    </div>
                  ) : null}
                </div>
                <div></div>
                {filterData?.map((item) => (
                  <div key={item.id} className=" w-full">
                    <TodoList
                      item={item}
                      closeMenu={closeMenu}
                      filterData={filterData}
                      todoList={todoList}
                      showMenu={showMenu}
                      setShowmenu={setShowmenu}
                      toggleMenu={toggleMenu}
                      setFilterTitle={setFilterTitle}
                      getTodoList={getTodoList}
                      setTodoList={setTodoList}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        history("/")
      )}
    </div>
  );
}

export default Home;
