import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../../components/Footer";
import { FiMapPin } from "react-icons/fi";
import { BsBoxArrowUpRight } from "react-icons/bs";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import { adminGetJobsAPI, addApplicationAPI } from "../../services/allAPIs";

function Careers() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    qualification: "",
    email: "",
    phone: "",
    coverletter: "",
    resume: null,
  });
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(sessionStorage.getItem("token"));
  }, []);
  const [jobs, setJobs] = useState([]);
  const getJobs = async () => {
    try {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      const result = await adminGetJobsAPI(reqHeader);
      setJobs(result.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  useEffect(() => {
    if (token) {
      getJobs();
    }
  }, [token]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleFileChange = (e) => {
    setForm((prev) => ({ ...prev, resume: e.target.files[0] }));
  };

  // Handle Apply button click
  const handleApplyClick = (jobTitle) => {
    setSelectedJobTitle(jobTitle);
    setOpenModal(true);
  };

  // Handle Submit
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("fullName", form.fullName);
    formData.append("qualification", form.qualification);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("coverletter", form.coverletter);
    formData.append("jobTitle", selectedJobTitle);
    if (form.resume) formData.append("resume", form.resume);

    const reqHeader = { Authorization: `Bearer ${token}` };
    try {
      await addApplicationAPI(formData, reqHeader);
      setOpenModal(false);
      setForm({
        fullName: "",
        qualification: "",
        email: "",
        phone: "",
        coverletter: "",
        resume: null,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-white px-4 py-10 flex flex-col items-center justify-center">
        <div className="max-w-4xl w-full  text-center mt-15">
          <h1 className="text-3xl font-semibold mb-4">Careers</h1>
          <p className="text-gray-700 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
            inventore placeat nemo voluptatem iure, iste asperiores quia amet
            sint, similique corrupti praesentium delectus nesciunt odit
            laudantium. Beatae repudiandae amet odit! Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Soluta, doloremque ullam itaque
            atque totam quasi molestias cumque ducimus fuga voluptate suscipit
            vel distinctio omnis voluptates obcaecati quidem quas iure? Facere?
          </p>
        </div>
        {/* Search Bar */}
        <div className="mt-10 w-full max-w-4xl flex justify-center">
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Job Title"
              className="px-4 py-2 w-full focus:outline-none bg-yellow-50"
            />
            <button className="bg-amber-800 text-white px-4 py-2 hover:bg-amber-900">
              search
            </button>
          </div>
        </div>
        {/* Current Openings */}
        <div className="w-full max-w-4xl mt-12">
          <h2 className="text-xl font-medium mb-4">Current openings</h2>
          {jobs.length > 0 ? (
            jobs.map((item) => (
              <div
                className="border rounded-md p-6 shadow-md my-3 bg-white"
                key={item._id}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <FiMapPin className="mr-1" />
                      <span>{item.location}</span>
                    </div>
                    <p className="text-sm mb-1">
                      <strong>Job Type:</strong> {item.jobType}
                    </p>
                    <p className="text-sm mb-1">
                      <strong>Salary:</strong> ₹{item.salary}
                    </p>
                    <p className="text-sm mb-1">
                      <strong>Qualification:</strong>
                      {item.qualification}
                    </p>
                    <p className="text-sm mb-1">
                      <strong>Experience:</strong> {item.experience}
                    </p>
                    <p className="text-sm">
                      <strong>Description:</strong>
                      {item.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleApplyClick(item.title)}
                    className="bg-amber-800 hover:bg-amber-950 text-white px-4 py-2 rounded-md text-sm flex items-center"
                  >
                    Apply <BsBoxArrowUpRight className="ml-1" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div>
              <p>No jobs listed</p>
            </div>
          )}
        </div>
        {/* Modal outside the map */}
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <ModalHeader className="flex items-center justify-center bg-amber-800 h-[10px]">
            <div className="flex justify-center items-center ">
              <p className="text-center text-yellow-50">Application Form</p>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-6">
              <div className="flex justify-center space-x-3">
                <input
                  className="bg-yellow-50 min-h-10 outline-1 outline-amber-800 rounded px-2"
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Fullname"
                />
                <input
                  className="bg-yellow-50 min-h-10 outline-1 outline-amber-800 rounded px-2"
                  type="text"
                  name="qualification"
                  value={form.qualification}
                  onChange={handleChange}
                  placeholder="Qualification"
                />
              </div>
              <div className="flex justify-center space-x-3">
                <input
                  className="bg-yellow-50 min-h-10 outline-1 outline-amber-800 rounded px-2"
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email ID"
                />
                <input
                  className="bg-yellow-50 min-h-10 outline-1 outline-amber-800 rounded px-2"
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                />
              </div>
              <div className="flex justify-center">
                <textarea
                  id="coverletter"
                  name="coverletter"
                  rows="4"
                  value={form.coverletter}
                  onChange={handleChange}
                  placeholder="Cover Letter"
                  className=" p-3 border border-gray-300 w-[28rem] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-yellow-50 text-gray-700"
                />
              </div>
              <div className="flex justify-center flex-col">
                <label
                  htmlFor="fileUpload"
                  className="block mb-2 text-sm font-medium text-gray-700 mx-[4rem]"
                >
                  Resume
                </label>
                <div className="flex justify-center items-center">
                  <input
                    type="file"
                    id="fileUpload"
                    name="resume"
                    onChange={handleFileChange}
                    className="outline-1 outline-amber-800 rounded w-[28rem] file:bg-amber-800 bg-yellow-50 text-gray-400"
                  />
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter className="flex justify-end">
            <Button
              className="bg-yellow-400"
              onClick={() => {
                setForm({
                  fullName: "",
                  qualification: "",
                  email: "",
                  phone: "",
                  coverletter: "",
                  resume: null,
                });
                setOpenModal(false);
              }}
            >
              Reset
            </Button>
            <Button className="bg-amber-800" onClick={handleSubmit}>
              Submit
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      <Footer />
    </div>
  );
}

export default Careers;
