import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../../components/Footer";
import { Button, Card } from "flowbite-react";
import { getAllBookAPI } from "../../services/allAPIs";
import { Link } from "react-router-dom";
import { SearchContext } from "../../context/SearchContextShare";
("use client");

function AllBooks() {
  const { searchKey, setSearchKey } = useContext(SearchContext);
  console.log(searchKey);

  // to hold token
  const [token, setToken] = useState("");
  //state to hold all books after fetching
  const [allBooks, setAllBooks] = useState([]);
  //state to hold temp book data for filtering
  const [tempData, setTempData] = useState([]);
  useEffect(() => {
    setToken(sessionStorage.getItem("token"));
  }, []);
  console.log(token);
  //call api to fetch all books
  const getAllBooks = async (searchKey, token) => {
    try {
      //create reqheader
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      const result = await getAllBookAPI(searchKey, reqHeader);
      console.log(result.data);
      setAllBooks(result.data);
      setTempData(result.data);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  useEffect(() => {
    if (token) {
      getAllBooks(searchKey, token);
    }
  }, [token, searchKey]);
  console.log(allBooks);
  const handleFilter = (data) => {
    console.log(data);
    if (data == "No filter") {
      setAllBooks(tempData);
    } else {
      setAllBooks(
        tempData.filter(
          (item) =>
            item.category.toLowerCase().trim() == data.toLowerCase().trim()
        )
      );
    }
    //tempData - item ==data? => item
    // tempData.filter(item=>(item.category).toLowerCase().trim()==data.toLowerCase().trim())
    //assign data to actual state
  };
  return (
    <div>
      <Header />
      <div className="bg-white flex items-center justify-center ">
        <div className="bg-white p-6  w-full ms-180 md:ms-40 lg:ms-50 max-w-2xl mt-40">
          <h2 className="text-2xl font-bold text-center mb-4">Collections</h2>
          <div className="flex justify-center items-center ">
            <input
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              type="text"
              placeholder="Book Name : janesmith"
              className="border p-2 rounded-l-lg min-w-lg bg-yellow-50"
            />
            <button className="bg-gray-700 text-white p-2 rounded-r-lg flex items-center">
              <span>Search</span>
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="w-70 flex-none px-10 pt-[22rem] space-y-5 border-r  !z-0 fixed top-[0rem] min-h-screen">
          <h1>Filters</h1>
          <div className="space-y-2">
            <div className="space-x-1">
              <input
                onClick={() => handleFilter("Fiction")}
                className="outline-1 "
                type="radio"
                id="Literary Fiction"
                name="filter"
              />
              <label htmlFor="Literary Fiction">Literary Fiction</label>
            </div>
            <div className="space-x-1">
              <input
                onClick={() => handleFilter("Philosophy")}
                className="outline-1"
                type="radio"
                id="Philosophy"
                name="filter"
              />
              <label htmlFor="Philosophy">Philosophy</label>
            </div>
            <div className="space-x-1">
              <input
                onClick={() => handleFilter("Romance")}
                className="outline-1"
                type="radio"
                id="Romance"
                name="filter"
              />
              <label htmlFor="Romance">Romance</label>
            </div>
            <div className="space-x-1">
              <input
                onClick={() => handleFilter("Horror")}
                className="outline-1"
                type="radio"
                id="Horror"
                name="filter"
              />
              <label htmlFor="Horror">Horror</label>
            </div>

            <div className="space-x-1">
              <input
                onClick={() => handleFilter("AutoBiography")}
                className="outline-1"
                type="radio"
                id="Auto/Biography"
                name="filter"
              />
              <label htmlFor="Auto-Biography">Auto/Biography</label>
            </div>
            <div className="space-x-1">
              <input
                onClick={() => handleFilter("Self-Help")}
                className="outline-1"
                type="radio"
                id="Self Help"
                name="filter"
              />
              <label htmlFor="Horror">Self Help</label>
            </div>
            <div className="space-x-1">
              <input
                onClick={() => handleFilter("Politics")}
                className="outline-1"
                type="radio"
                id="Politics"
                name="filter"
              />
              <label htmlFor="Horror">Politics</label>
            </div>
            <div className="space-x-1">
              <input
                onClick={() => handleFilter("No filter")}
                className="outline-1"
                type="radio"
                id="No filter"
                name="filter"
              />
              <label htmlFor="Horror">No filter</label>
            </div>
          </div>
        </div>
        {allBooks.length > 0 ? (
          <div className="flex ms-70 flex-wrap gap-4 justify-start px-20">
            {allBooks.map((item) => (
              <Link
                to={`/viewBook/${item._id}`}
                hidden={item?.status == "pending" || item?.status == "sold"}
              >
                <Card
                  key={item.id}
                  className="w-48 flex flex-col items-center p-4 shadow-md hover:shadow-lg transition-shadow"
                >
                  <img
                    className="h-48 w-36 object-contain mb-2"
                    src={item.imageUrl}
                    alt={item.title}
                  />
                  <p className="text-sm text-gray-600 h-6 line-clamp-1 w-full text-center">
                    {item.author}
                  </p>
                  <p className="text-center font-medium text-blue-600 h-12 line-clamp-2 w-full cursor-pointer hover:underline">
                    {item.title}
                  </p>
                  <p className="text-center font-bold h-6 w-full">
                    र{item.price}
                  </p>
                </Card>{" "}
              </Link>
            ))}
          </div>
        ) : (
          <div className="min-h-screen flex ms-70 flex-wrap gap-4 justify-start px-20 w-full text-center">
            <p className="text-center ms-100">No Books Available</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllBooks;
