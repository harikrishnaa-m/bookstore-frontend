import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../../components/Footer";
import { IoImagesOutline } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa";
import { loadStripe } from "@stripe/stripe-js";

("use client");
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import { useState } from "react";
import {
  FaEye,
  FaArrowLeft,
  FaShoppingCart,
  FaBook,
  FaLanguage,
  FaDollarSign,
  FaEnvelope,
  FaGlobeAmericas,
} from "react-icons/fa";

import { Link, useParams } from "react-router-dom";
import { getABookAPI, makePaymentAPI } from "../../services/allAPIs";
function ViewBook() {
  const serverURL = "http://localhost:3000";
  const [openModal, setOpenModal] = useState(false);

  //to hold book data
  const [bookData, setBookData] = useState([]);
  // to hold token
  const [token, setToken] = useState("");
  //to hold uploadedimages
  const [UploadedImages, setUploadedImages] = useState([]);
  //state to hold all books after fetching
  const [allBooks, setAllBooks] = useState([]);
  useEffect(() => {
    setToken(sessionStorage.getItem("token"));
  }, []);
  //useParams for getting id by destructuring the as the params is an object
  const { id } = useParams();
  console.log(id);

  const getABook = async (id) => {
    try {
      //create reqheader
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      const result = await getABookAPI(id, reqHeader);
      console.log(result.data);
      setBookData(result.data);
      setUploadedImages(result.data.UploadedImages);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (token) {
      getABook(id);
    }
  }, [token]);
  console.log(bookData);
  const makepayment = async () => {
    console.log(bookData);
    const stripe = await loadStripe(
      "pk_test_51RuT9W2MMbUr2oAY3g6FJ5pQJZtMGQR36IYZsUGdUfzxOy8Ts08CmuEgBZsVZT5PBDJYuUp9WAb3uyYMHINlwcmO00UoWhCKKL"
    );

    console.log(stripe);
    //data to be updated in backend
    const reqBody = {
      bookDetails: bookData,
    };
    const reqHeader = { Authorization: `Bearer ${token}` };
    try {
      const result = await makePaymentAPI(reqBody, reqHeader);
      console.log(result);
      const sessionID = result.data.sessionID;
      const response = stripe.redirectToCheckout({ sessionId: sessionID });
      if (response.error) {
        console.log("error in payment");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen pt-[10rem]">
        <div className="max-w-4xl mx-auto p-6 bg-yellow-100 rounded-lg shadow-lg ">
          {/* Back Button */}
          <button className="flex w-full items-center justify-between text-blue-600 hover:text-blue-800 mb-6">
            <Link to={"/allbooks"}>
              <div className="flex items-center">
                <FaArrowLeft className="mr-2 text-3xl text-amber-800" />
                <span className=" text-amber-800">Back</span>
              </div>
            </Link>
            <IoImagesOutline
              onClick={() => setOpenModal(true)}
              className="mr-2 text-3xl text-amber-800"
            />
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
              <ModalHeader>
                <p className="text-black">Uploaded Images</p>
              </ModalHeader>
              <ModalBody>
                <div className="flex justify-around">
                  {UploadedImages.length > 0 ? (
                    UploadedImages.map((item) => (
                      <img
                        src={`${serverURL}/upload/${item}`}
                        width="100px"
                        height="100px"
                        alt={`Uploaded `}
                      />
                    ))
                  ) : (
                    <p>No images found</p>
                  )}
                </div>
              </ModalBody>
            </Modal>
          </button>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column - Book Cover */}
            <div className="md:w-1/3 flex justify-center">
              <div className="w-64 h-96 bg-gray-200 rounded-lg shadow-md flex items-center justify-center text-gray-400">
                <img src={bookData.imageUrl} alt="" />
              </div>
            </div>

            {/* Right Column - Book Details */}
            <div className="md:w-2/3">
              {/* Title and Author */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">
                  {bookData.title}
                </h1>
                <p className="text-xl text-gray-600 italic">
                  {bookData.author}
                </p>
              </div>

              {/* Divider */}
              <div className="border-b border-amber-700 mb-6"></div>

              {/* Book Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start">
                  <FaGlobeAmericas className="text-gray-500 mt-1 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Publisher</p>
                    <p className="text-gray-800">{bookData.publisher}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaEnvelope className="text-gray-500 mt-1 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Seller Mail</p>
                    <p className="text-gray-800">{bookData.userMail}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaRupeeSign className="text-gray-500 mt-1 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Real Price</p>
                    <p className="text-gray-800">{bookData.price}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaLanguage className="text-gray-500 mt-1 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Language</p>
                    <p className="text-gray-800">{bookData.language}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaBook className="text-gray-500 mt-1 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">No. of pages</p>
                    <p className="text-gray-800">{bookData.noofpages}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaBook className="text-gray-500 mt-1 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">ISBN</p>
                    <p className="text-gray-800">{bookData.isbn}</p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-b border-amber-700 mb-6"></div>

              {/* Description */}
              <div className="mb-8">
                <p className="text-gray-700 leading-relaxed">
                  {bookData.abstract}
                </p>
              </div>

              {/* Divider */}
              <div className="border-b border-gray-200 mb-6"></div>

              {/* Buy Button */}
              <div className="flex justify-end">
                <button
                  onClick={makepayment}
                  className="flex items-center bg-amber-900 hover:bg-amber-700 text-white px-6 py-3 rounded-lg shadow-md transition duration-300"
                >
                  <FaShoppingCart className="mr-2" />
                  <span>Buy ₹{bookData.dprice}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ViewBook;
