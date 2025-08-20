import React, { useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";

import {
  adminApprovedBookAPI,
  adminGetUsersAPI,
  getAdminAllBookAPI,
} from "../../services/allAPIs";
import { useEffect } from "react";
import { TiTick } from "react-icons/ti";

function AdminBooks() {
  const [allUsers, setAllUsers] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [token, setToken] = useState("");
  const toggleHandle1 = () => {
    setToggle(true);
  };
  const toggleHandle2 = () => {
    setToggle(false);
  };
  console.log(toggle);
  //fetch token
  useEffect(() => {
    setToken(sessionStorage.getItem("token"));
  }, []);
  console.log(token);
  //to fetch all books
  const getAllBooksAdmin = async (token) => {
    try {
      //create reqheader
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      const result = await getAdminAllBookAPI(reqHeader);
      console.log(result.data);
      setAllBooks(result.data);
    } catch (err) {
      console.log("Error:", err);
    }
  };
  useEffect(() => {
    if (token) {
      getAllBooksAdmin(token);
    }
  }, [token]);
  console.log(allBooks);
  const handleApprove = async (data) => {
    try {
      //create reqheader
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      const result = await adminApprovedBookAPI(data, reqHeader);
      console.log(result.data);
      // Refetch all books after approval
      await getAllBooksAdmin(token);
      // setAllBooks(result.data);
    } catch (err) {
      console.log("Error:", err);
    }
  };
  const getUsers = async (token) => {
    try {
      //create reqheader
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      const result = await adminGetUsersAPI(reqHeader);
      console.log(result.data);
      setAllUsers(result.data);
    } catch (err) {
      console.log("Error:", err);
    }
  };
  useEffect(() => {
    if (token) {
      getUsers(token);
    }
  }, [token]);
  console.log(allUsers);

  return (
    <div>
      <AdminHeader />
      <div className="flex">
        <div className="flex flex-col  w-1/4">
          <AdminSidebar />
        </div>
        <div className="flex  flex-col  mt-40 w-3/4">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-extrabold">All Books</h1>
            <div className="flex my-5 space-x-0">
              <p
                onClick={toggleHandle1}
                className={`p-2 hover:bg-amber-500 cursor-pointer
    ${
      toggle
        ? "border-t border-l border-r border-neutral-950 text-amber-500"
        : "border-2 border-neutral-950"
    }
  `}
              >
                BookList
              </p>
              <p
                onClick={toggleHandle2}
                className={`p-2 hover:bg-amber-500 cursor-pointer
    ${
      !toggle
        ? "border-t border-l border-r border-neutral-950 text-amber-500"
        : "border-2 border-neutral-950"
    }
  `}
              >
                Users
              </p>
            </div>
            {toggle ? (
              <div className="flex flex-col">
                <div className="flex  flex-wrap ">
                  {allBooks?.length > 0 ? (
                    allBooks.map((item) => (
                      <div
                        className={`w-1/5 ms-5 mt-10 flex flex-col items-center space-y-2 border-b border-l border-r border-neutral-800/20 rounded shadow-2xl transform transition duration-300 hover:scale-105 ${
                          item.status == "sold"
                            ? `opacity-50 cursor-not-allowed`
                            : ""
                        }`}
                      >
                        <img
                          className="w-full rounded-t h-80"
                          src={item.imageUrl}
                          alt=""
                        />
                        <p className="text-blue-800">{item.author}</p>
                        <p className="text-xl mb-1 truncate overflow-hidden whitespace-nowrap w-full text-center">
                          {item.title}
                        </p>
                        <p className="text-blue-800">₹{item.dprice}</p>
                        {item.status == "pending" ? (
                          <button
                            onClick={() => handleApprove(item)}
                            className="bg-red-500 rounded text-white font-semi-bold p-2 mb-2"
                          >
                            Approve
                          </button>
                        ) : (
                          <p className="flex items-center text-center text-blue-500 mb-2">
                            Approved <TiTick className="text-blue-500" />
                          </p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p>No books</p>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <div className="flex gap-6 flex-wrap">
                  {allUsers?.length > 0 ? (
                    allUsers.map((item) => (
                      <div className="ms-2 my-4 h-fit border flex items-center justify-content-center w-[330px] flex-col border-neutral-800/30 rounded ">
                        <p className="text-red-600 font-bold my-2 mb-4 w-full px-3">
                          ID : {item._id}
                        </p>
                        <div className="flex items-center px-3">
                          {item?.profile == "" ? (
                            <img
                              className="rounded-full w-[100px]"
                              src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
                              alt=""
                            />
                          ) : (
                            <img
                              className="rounded-full w-[100px] h-[100px] object-center object-cover "
                              src={item.profile}
                              alt=""
                              referrerPolicy="no-referrer"
                            />
                          )}
                          {/* <img
                            className="rounded-full w-[100px]"
                            src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
                            alt=""
                          /> */}
                          <div className="ms-2 w-[220px]">
                            <p className="text-left px-3 truncate overflow-hidden whitespace-nowrap w-full">
                              {" "}
                              {item.username}
                            </p>
                            <p className="text-left px-3 truncate overflow-hidden whitespace-nowrap w-full">
                              {" "}
                              {item.email}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="ms-2 my-4 h-fit flex items-center justify-content-center flex-col  rounded ">
                      <p className="text-red-600 font-bold my-2 mb-4 w-full px-3">
                        No Users Found
                      </p>
                    </div>
                  )}

                  {/* <div className="ms-2 h-fit my-4 border flex items-center justify-content-center flex-col border-neutral-800/30 rounded ">
                    <p className="text-red-600 font-bold my-2 mb-4 w-full px-3">
                      ID : juanmata@gmail.com
                    </p>
                    <div className="flex items-center px-3">
                      <img
                        className="rounded-full w-[100px]"
                        src="https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg="
                        alt=""
                      />
                      <div className="ms-2">
                        <p className="text-left px-3"> Juan Mata</p>
                        <p className="text-left px-3"> juanmata@gmail.com</p>
                      </div>
                    </div>
                  </div>
                  <div className="ms-2 h-fit my-4 border flex items-center justify-content-center flex-col border-neutral-800/30 rounded ">
                    <p className="text-red-600 font-bold my-2 mb-4 w-full px-3">
                      ID : juanmata@gmail.com
                    </p>
                    <div className="flex items-center px-3">
                      <img
                        className="rounded-full w-[100px]"
                        src="https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg="
                        alt=""
                      />
                      <div className="ms-2">
                        <p className="text-left px-3"> Juan Mata</p>
                        <p className="text-left px-3"> juanmata@gmail.com</p>
                      </div>
                    </div>
                  </div>
                  <div className="ms-2 h-fit my-4 border flex items-center justify-content-center flex-col border-neutral-800/30 rounded ">
                    <p className="text-red-600 font-bold my-2 mb-4 w-full px-3">
                      ID : juanmata@gmail.com
                    </p>
                    <div className="flex items-center px-3">
                      <img
                        className="rounded-full w-[100px]"
                        src="https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg="
                        alt=""
                      />
                      <div className="ms-2">
                        <p className="text-left px-3"> Juan Mata</p>
                        <p className="text-left px-3"> juanmata@gmail.com</p>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminBooks;
