import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { MdOutlineVerified } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdCloudUpload } from "react-icons/md";
import EditProfile from "../components/EditProfile";
import { RiImageAddFill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import { uploadBookApi } from "../../services/allAPIs";
function Profile() {
  //to hold book details
  const [bookDetails, setBookDetails] = useState({
    title: "",
    author: "",
    noofpages: "",
    imageUrl: "",
    price: "",
    dprice: "",
    abstract: "",
    publisher: "",
    language: "",
    isbn: "",
    category: "",
    UploadedImages: [],
  });
  console.log(bookDetails);
  const [toggle, setToggle] = useState(1);
  const handleToggle1 = () => {
    setToggle(1);
  };
  const handleToggle2 = () => {
    setToggle(2);
  };
  const handleToggle3 = () => {
    setToggle(3);
  };
  console.log(toggle);
  const [preview, setPreview] = useState("");
  //to hold list of images
  const [previewList, setPreviewList] = useState([]);
  const handleUpload = (e) => {
    //image value
    console.log(e.target.files[0]);
    //to avoid undefined
    if (!e.target.files[0]) {
      return;
    }
    let imgArray = bookDetails.UploadedImages;
    imgArray.push(e.target.files[0]);
    console.log(imgArray);
    setBookDetails({ ...bookDetails, UploadedImages: imgArray });
    //obj to url conversion
    const url = URL.createObjectURL(e.target.files[0]);
    console.log(url);
    setPreview(url);
    //create a new array for holding image list
    let imgListArray = previewList;
    imgListArray.push(url);
    setPreviewList(imgListArray);
  };
  const handleReset = () => {
    setBookDetails({
      title: "",
      author: "",
      noofpages: "",
      imageUrl: "",
      price: "",
      dprice: "",
      abstract: "",
      publisher: "",
      language: "",
      isbn: "",
      category: "",
      UploadedImages: [],
    });
    setPreview("");
    setPreviewList([]);
  };
  //to hold token
  const [token, setToken] = useState("");
  const handleAddBook = async () => {
    //get values from state using desrtucturing
    const {
      title,
      author,
      noofpages,
      imageUrl,
      price,
      dprice,
      abstract,
      publisher,
      language,
      isbn,
      category,
      UploadedImages,
    } = bookDetails;
    //create request header that includes token
    if (
      !title ||
      !author ||
      !noofpages ||
      !imageUrl ||
      !price ||
      !dprice ||
      !abstract ||
      !publisher ||
      !language ||
      !isbn ||
      !category ||
      !UploadedImages
    ) {
      toast.error("Please fill the form", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      //add api
      //create reqheader
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      const reqBody = new FormData();
      //reqBody.append ("title",title)
      for (let key in bookDetails) {
        if (key !== "UploadedImages") {
          reqBody.append(key, bookDetails[key]);
        } else {
          bookDetails.UploadedImages.forEach((item) =>
            reqBody.append("UploadedImages", item)
          );
        }
      }
      try {
        const result = await uploadBookApi(reqBody, reqHeader);
        console.log(result);
        if (result.status == 200) {
          toast.success("Book added successfully..", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          handleReset();
        } else {
          toast.error(result.response.data, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          handleReset();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  //useeffect to fetch token
  useEffect(() => {
    setToken(sessionStorage.getItem("token"));
  }, []);
  console.log(token);

  console.log(bookDetails);
  return (
    <div>
      <Header />
      <div className="pt-20 z-0">
        <div className="w-full bg-amber-100 h-64 text-white ">
          <label htmlFor="profile">
            <img
              className="h-[12rem] relative  top-40 left-38 rounded-circle cursor-pointer "
              src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png"
              alt=""
            />
          </label>
          <input id="profile" type="file" style={{ display: "none" }} />
        </div>
        <div className="flex flex-col justify-center items-center mt-25">
          <div className="w-3/4 ">
            <div className="flex justify-between">
              <div className="flex items-center">
                <p className="text-2xl font-black">User Name</p>
                <MdOutlineVerified className="text-blue-700 mx-1 text-3xl" />
              </div>
              <div>
                <EditProfile />
              </div>
            </div>
            <div className="my-3">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Laborum veniam voluptate doloribus, non tempore minus sequi eos
                nam debitis quisquam sit neque accusantium reprehenderit rerum
                quam aliquam ad porro odio? Praesentium, quam. Eum atque,
                deleniti, repellat facilis alias amet doloribus eligendi dolor
                debitis est, quibusdam temporibus voluptate sequi explicabo
                molestias incidunt enim! Velit maxime et hic quaerat perferendis
                explicabo iste?
              </p>
            </div>
            <div className="flex justify-center items-center mt-5">
              <button
                onClick={handleToggle1}
                className={`${
                  toggle == 1
                    ? "btn text-blue-600 border underline font-bold "
                    : "text-neutral-950 border font-bold btn"
                }`}
              >
                Sell Book
              </button>
              <button
                onClick={handleToggle2}
                className={`${
                  toggle == 2
                    ? "btn text-blue-600 border underline font-bold "
                    : "text-neutral-950 border font-bold btn"
                }`}
              >
                Book Status
              </button>
              <button
                onClick={handleToggle3}
                className={`${
                  toggle == 3
                    ? "btn text-blue-600 border underline font-bold "
                    : "text-neutral-950 border font-bold btn"
                }`}
              >
                Purchase History
              </button>
            </div>
            <div>
              {toggle == 1 ? (
                <div>
                  <div className="w-full flex flex-col bg-violet-200 my-3 p-2">
                    <h1 className="text-center font-bold text-2xl my-4">
                      Book Details
                    </h1>
                    <div className="flex items-center justify-center">
                      <div className="flex flex-col w-1/3 mx-4">
                        <input
                          value={bookDetails.title}
                          onChange={(e) =>
                            setBookDetails({
                              ...bookDetails,
                              title: e.target.value,
                            })
                          }
                          className="border rounded my-1 p-2 text-sm"
                          type="text"
                          placeholder="Title"
                        />
                        <input
                          value={bookDetails.author}
                          onChange={(e) =>
                            setBookDetails({
                              ...bookDetails,
                              author: e.target.value,
                            })
                          }
                          className="border rounded my-1 p-2 text-sm"
                          type="text"
                          placeholder="Author"
                        />
                        <input
                          value={bookDetails.noofpages}
                          onChange={(e) =>
                            setBookDetails({
                              ...bookDetails,
                              noofpages: e.target.value,
                            })
                          }
                          className="border rounded my-1 p-2 text-sm"
                          type="text"
                          placeholder="No of Pages"
                        />
                        <input
                          value={bookDetails.imageUrl}
                          onChange={(e) =>
                            setBookDetails({
                              ...bookDetails,
                              imageUrl: e.target.value,
                            })
                          }
                          className="border rounded my-1 p-2 text-sm"
                          type="text"
                          placeholder="Image Url"
                        />
                        <input
                          value={bookDetails.price}
                          onChange={(e) =>
                            setBookDetails({
                              ...bookDetails,
                              price: e.target.value,
                            })
                          }
                          className="border rounded my-1 p-2 text-sm"
                          type="text"
                          placeholder="Price"
                        />
                        <input
                          value={bookDetails.dprice}
                          onChange={(e) =>
                            setBookDetails({
                              ...bookDetails,
                              dprice: e.target.value,
                            })
                          }
                          className="border rounded my-1 p-2 text-sm"
                          type="text"
                          placeholder="Discount Price"
                        />
                        <textarea
                          value={bookDetails.abstract}
                          onChange={(e) =>
                            setBookDetails({
                              ...bookDetails,
                              abstract: e.target.value,
                            })
                          }
                          placeholder="Abstract"
                          className="my-1 p-2 text-sm rounded"
                          name=""
                          rows={4}
                          id=""
                        ></textarea>
                      </div>
                      <div className="flex flex-col w-1/3">
                        <input
                          value={bookDetails.publisher}
                          onChange={(e) =>
                            setBookDetails({
                              ...bookDetails,
                              publisher: e.target.value,
                            })
                          }
                          className="border rounded my-1 p-2 text-sm"
                          type="text"
                          placeholder="Publisher"
                        />
                        <input
                          value={bookDetails.language}
                          onChange={(e) =>
                            setBookDetails({
                              ...bookDetails,
                              language: e.target.value,
                            })
                          }
                          className="border rounded my-1 p-2 text-sm"
                          type="text"
                          placeholder="Language"
                        />
                        <input
                          value={bookDetails.isbn}
                          onChange={(e) =>
                            setBookDetails({
                              ...bookDetails,
                              isbn: e.target.value,
                            })
                          }
                          className="border rounded my-1 p-2 text-sm"
                          type="text"
                          placeholder="ISBN"
                        />
                        <input
                          value={bookDetails.category}
                          onChange={(e) =>
                            setBookDetails({
                              ...bookDetails,
                              category: e.target.value,
                            })
                          }
                          className="border rounded my-1 p-2 text-sm"
                          type="text"
                          placeholder="Category"
                        />
                        <div className="flex flex-col items-center justify-center">
                          <label htmlFor="bookimage">
                            {preview ? (
                              <div>
                                <img
                                  className="h-[8rem] my-1"
                                  src={preview}
                                  alt=""
                                />
                              </div>
                            ) : (
                              <MdCloudUpload className="text-center text-blue-600 text-[8rem] cursor-pointer" />
                            )}

                            <input
                              onChange={(e) => handleUpload(e)}
                              id="bookimage"
                              type="file"
                              style={{ display: "none" }}
                            />
                          </label>

                          {preview && (
                            <div className="flex items-center space-x-2">
                              {previewList?.map((item) => (
                                <img
                                  className="h-[40px] w-[40px]"
                                  src={item}
                                  alt=""
                                />
                              ))}
                              {previewList?.length < 3 && (
                                <label htmlFor="bookimage">
                                  <RiImageAddFill className="text-blue-500 text-3xl" />
                                  <input
                                    id="bookimage"
                                    type="file"
                                    style={{ display: "none" }}
                                  />
                                </label>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end items-end my-3 pr-3">
                      <button
                        onClick={handleReset}
                        className="mx-2 btn rounded bg-amber-600 hover:font-bold hover:bg-amber-700"
                      >
                        Reset
                      </button>
                      <button
                        onClick={handleAddBook}
                        className="mx-2 btn rounded bg-green-600 text-white hover:font-bold hover:bg-green-700"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
              {toggle == 2 ? (
                <div>
                  <div className="w-full bg-violet-200 p-3 mt-3">
                    <div className="flex flex-col border-1 rounded shadow-lg">
                      <div className="flex justify-between my-2">
                        <div className="flex flex-col mx-5  w-1/8 items-center justify-start mt-3">
                          <p>J</p>
                          <p>ed</p>
                          <p className="text-blue-600">$3</p>
                          <p>fd</p>
                          <img
                            src="https://psdstamps.com/wp-content/uploads/2022/04/pending-stamp-png.png"
                            alt=""
                          />
                        </div>
                        <div className="flex flex-col mx-5 w-1/8 items-center justify-start mt-3">
                          <img
                            className="h-[150px] w-[200px]"
                            src="https://blog-cdn.reedsy.com/directories/gallery/248/large_65b0ae90317f7596d6f95bfdd6131398.jpg"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="flex items-end justify-end my-3 mx-5">
                        <button className="btn bg-red-500 text-white hover:font-bold hover:bg-red-600">
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center border-1 rounded shadow-lg my-3 h-[250px]">
                      <p className="text-2xl">No book Added</p>
                    </div>
                  </div>
                </div>
              ) : null}
              {toggle == 3 ? (
                <div>
                  <div className="w-full bg-violet-200 p-3 mt-3">
                    <div className="flex flex-col border-1 rounded shadow-lg">
                      <div className="flex  my-2 mx-5">
                        <div className="flex flex-col mx-1   items-start justify-start mt-3">
                          <p className="font-bold text-lg">
                            Beyond The Ocean Door
                          </p>
                          <p className="text-sm">Amisha Sathi</p>
                          <p className="text-blue-600 font-black">$3</p>
                          <p className="text-justify my-1">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Laudantium dolores totam corrupti cupiditate
                            aperiam iste quam pariatur sequi, numquam cum est
                            recusandae ipsum! Voluptatum eos, quisquam inventore
                            fugiat suscipit accusantium. Praesentium repellendus
                            facere ratione ipsa molestiae, modi hic porro illo
                            cupiditate, commodi quod quas rerum deleniti. Sit
                            iste aspernatur quo quod eligendi est animi facilis
                            alias cupiditate numquam, hic dolorum. Alias facilis
                            fugiat magni atque, iste cum qui, aut saepe
                            repellendus laboriosam, inventore voluptatum animi
                            recusandae optio nemo eum fuga fugit rem beatae.
                            Voluptatum libero id in, sapiente laborum velit!
                          </p>
                          <img
                            className="h-[60px] mt-2"
                            src="https://static.vecteezy.com/system/resources/previews/021/433/029/non_2x/sold-rubber-stamp-free-png.png"
                            alt=""
                          />
                        </div>
                        <div className="flex flex-col mx-5 items-center justify-center mt-3">
                          <img
                            className="h-[250px] w-[800px]"
                            src="https://blog-cdn.reedsy.com/directories/gallery/248/large_65b0ae90317f7596d6f95bfdd6131398.jpg"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Profile;
