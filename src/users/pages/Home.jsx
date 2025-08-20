import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../../components/Footer";
import { Button, Card } from "flowbite-react";
import { getHomeBookAPI } from "../../services/allAPIs";
import { Link, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContextShare";

function Home() {
  const navigate = useNavigate();
  const { searchKey, setSearchKey } = useContext(SearchContext);
  console.log(searchKey);
  //state to hold bookdata
  const [homeBooks, setHomeBooks] = useState([]);
  //state to hold token
  const token = sessionStorage.getItem("token");

  const handleExploreMore = () => {
    if (token) {
      navigate("/allbooks");
    } else {
      alert("Please Login to Continue");
    }
  };
  const getHomeBooks = async () => {
    try {
      const result = await getHomeBookAPI();
      console.log(result);
      setHomeBooks(result.data);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const handleSearch = () => {
    const token = sessionStorage.getItem("token");
    if (searchKey == "") {
      alert("Please enter the book title");
    } else if (!token) {
      alert("Please login");
      navigate("/login");
    } else if (searchKey && token) {
      navigate("/allbooks");
    } else {
      alert("Something went wrong");
    }
  };
  useEffect(() => {
    getHomeBooks();
  }, []);
  console.log(homeBooks);
  return (
    <div>
      <Header />
      <section
        id="banner"
        className="bg-[url('https://cdn.pixabay.com/photo/2018/04/17/10/21/literature-3327166_1280.jpg')] bg-cover bg-top bg-fixed h-screen flex justify-center"
      >
        <div className="text-center mt-[14rem] p-6 bg-white/15 h-35 rounded">
          <h1 className="text-4xl mt-25 text-amber-50 hover:text-amber-50 transition duration-300 font-bold">
            Every Book Has a Journey — Discover Yours Today.
          </h1>
          <p className="text-white mt-4 text-lg font-bold">
            A curated space for passionate readers to buy and sell pre-loved
            treasures.
          </p>
          <div className="flex justify-center mt-10 ">
            <input
              onChange={(e) => setSearchKey(e.target.value)}
              value={searchKey}
              id="book"
              name="book"
              type="text"
              placeholder="Enter the Bookname"
              className="rounded-l block max-w-100 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
            />
            <button
              onClick={handleSearch}
              className="bg-amber-700 text-white p-2 rounded-r-lg flex items-center"
            >
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
      </section>
      <section className="bg-amber-50 py-5 h-175">
        <div className="text-center mb-5">
          <h4 className="text-xl">New Arrivals</h4>
          <h1 className="text-3xl font-bold">Explore Our Latest Collections</h1>
        </div>
        <div className="flex justify-center items-center gap-4">
          {homeBooks.length > 0 ? (
            <div className="flex justify-center items-center gap-4">
              {homeBooks.map((item) => (
                <Card className="max-w-xs ">
                  {/* <h5 className="text-2xl font-bold tracking-tight text-gray-900 ">
              Noteworthy technology acquisitions 2021
            </h5>
            <p className="font-normal text-gray-700 ">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p> */}
                  <img className="h-[300px]" src={item.imageUrl} alt="" />
                  <p className="text-center text-sm h-2">{item.author}</p>
                  <p className="text-center text-blue-600 font-bold h-2 cursor-pointer">
                    {item.title}
                  </p>
                  <p className="text-center text-base h-1">₹{item.price}</p>
                </Card>
              ))}
            </div>
          ) : (
            <div>nobooks</div>
          )}
        </div>
        <div className="flex justify-center items-center">
          <button
            onClick={handleExploreMore}
            className="my-10 bg-amber-950 text-xl font-semibold text-white p-2 rounded-full"
          >
            Explore More
          </button>
        </div>
      </section>
      <section className="bg-rose-50 py-5 ">
        <h1 className="ps-5 pb-1 text-xl">Featured Authors</h1>
        <h2 className="ps-5 pb-3 text-3xl font-bold">Shakespeare</h2>
        <div className="flex px-5">
          <div className="w-3/4">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
              labore doloremque quasi, eveniet, accusamus libero, possimus vitae
              minus quis non doloribus perspiciatis nesciunt ratione provident
              est! Fugit dolor aliquid omnis. Illo illum aliquam, consectetur
              provident repellat nesciunt a, commodi reprehenderit qui labore
              dignissimos iusto alias quisquam ab exercitationem consequatur
              praesentium. Tempora rem iusto tenetur rerum sed aliquid dolor
              magnam fugit? A, perspiciatis fugit laudantium itaque cumque
              dolore eum tempora blanditiis modi architecto minima molestias
              impedit quidem quisquam quos, praesentium ullam ex. Fuga, voluptas
              exercitationem numquam doloribus quisquam corporis distinctio
              obcaecati.
            </p>
          </div>
          <div className="flex justify-center w-1/4">
            <img
              className="w-[15rem] shadow-2xl rounded-lg"
              src="https://hips.hearstapps.com/hmg-prod/images/circa-1600-english-playwright-and-poet-william-shakespeare-news-photo-1744817160.pjpeg?crop=0.917xw:0.694xh;0.0683xw,0.116xh&resize=1200:*"
              alt=""
            />
          </div>
        </div>
      </section>
      <section className="bg-blue-50 py-5">
        <h1 className="text-center my-2">Testimonials</h1>
        <h2 className="text-center mb-5">Turning Pages, Winning Hearts</h2>
        <div className="flex justify-center gap-4">
          <div className="flex  items-center overflow-hidden rounded-full bg-yellow-200 h-fit">
            <img
              className="h-[12rem] rounded-circle"
              src="https://cdn.pixabay.com/photo/2022/06/13/06/21/staff-7259348_1280.jpg"
              alt=""
            />
            <p className="text-red-950 w-[36rem] ms-1">
              "Discovering this bookstore was like finding a hidden treasure.
              The curated collection of pre-loved books not only saved me money
              but introduced me to stories I would’ve otherwise missed. The
              quality, service, and passion behind every listing truly stand
              out. I’ve recommended it to every book lover I know!"
              <br />
              <span className="font-bold">Vera Fati</span>
              <br />
              <span className="font-bold">
                Literary Blogger at The Reading Quill
              </span>
            </p>
          </div>
          <div className="flex  items-center overflow-hidden rounded-full bg-yellow-200 h-fit">
            <img
              className="h-[12rem] rounded-circle"
              src="https://cdn.pixabay.com/photo/2022/06/13/06/21/staff-7259348_1280.jpg"
              alt=""
            />
            <p className="text-red-950 w-[36rem] ms-1">
              "Discovering this bookstore was like finding a hidden treasure.
              The curated collection of pre-loved books not only saved me money
              but introduced me to stories I would’ve otherwise missed. The
              quality, service, and passion behind every listing truly stand
              out. I’ve recommended it to every book lover I know!"
              <br />
              <span className="font-bold">Vera Fati</span>
              <br />
              <span className="font-bold">
                Literary Blogger at The Reading Quill
              </span>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
