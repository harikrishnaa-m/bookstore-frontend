import React, { useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import { IoLocation } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import {
  adminAddJobAPI,
  adminDeleteJobAPI,
  adminGetJobsAPI,
  getApplicantsAPI,
} from "../../services/allAPIs";

import { useEffect } from "react";

function AdminCareers() {
  // State for applicants
  const [applicants, setApplicants] = useState([]);
  //state to get token
  const [token, setToken] = useState("");
  //useEffect to get token
  useEffect(() => {
    setToken(sessionStorage.getItem("token"));
  }, []);
  console.log(token);
  //state to hold jobs
  const [jobs, setJobs] = useState([]);
  //function to get jobs
  const getJobs = async () => {
    try {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      const result = await adminGetJobsAPI(reqHeader);
      console.log(result.data);
      setJobs(result.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  //useeffect for geting jobs
  useEffect(() => {
    if (token) {
      getJobs();
    }
  }, [token]);
  console.log(jobs);

  //create state for job details
  const [jobDetails, setJobDetails] = useState({
    title: "",
    location: "",
    jobType: "",
    salary: "",
    qualification: "",
    experience: "",
    description: "",
  });
  console.log(jobDetails);
  const handleReset = () => {
    setJobDetails({
      title: "",
      location: "",
      jobType: "",
      salary: "",
      qualification: "",
      experience: "",
      description: "",
    });
  };
  const handleAddJob = async () => {
    if (!token) {
      toast.error("You must be logged in to add a job.");
      return;
    }
    if (
      jobDetails.title.trim() === "" ||
      jobDetails.location.trim() === "" ||
      jobDetails.jobType.trim() === "" ||
      jobDetails.salary.trim() === "" ||
      jobDetails.qualification.trim() === "" ||
      jobDetails.experience.trim() === "" ||
      jobDetails.description.trim() === ""
    ) {
      toast.warning("Please fill in all the fields before submitting.");
      return;
    }
    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const result = await adminAddJobAPI(jobDetails, reqHeader);

      if (result.status === 200) {
        toast.success("Job added successfully!");
        handleReset();
        getJobs();
        setOpenModal(false);
      } else {
        toast.error(result.data || "Failed to add job");
      }
    } catch (error) {
      console.error("Error adding job:", error);
      toast.error("Something went wrong while adding the job.");
    }
  };
  const handleDelete = async (id) => {
    console.log(id);
    try {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      const result = await adminDeleteJobAPI(id, reqHeader);

      if (result.status === 200) {
        toast.success("Job deleted successfully!");
        // refresh the list after delete
        getJobs();
      } else {
        toast.error("Failed to delete job.");
      }
    } catch (error) {
      toast.error("Error deleting job: " + error.message);
    }
  };

  const [openModal, setOpenModal] = useState(false);
  const [toggle, setToggle] = useState(true);
  const toggleHandle1 = () => {
    setToggle(true);
  };
  const toggleHandle2 = () => {
    setToggle(false);
  };
  console.log(toggle);
  // Fetch applicants when toggle is false (View Applicants tab)
  useEffect(() => {
    const fetchApplicants = async () => {
      if (!toggle && token) {
        try {
          const reqHeader = { Authorization: `Bearer ${token}` };
          const result = await getApplicantsAPI(reqHeader);
          setApplicants(result.data);
        } catch (error) {
          console.log("Error fetching applicants:", error);
        }
      }
    };
    fetchApplicants();
  }, [toggle, token]);
  return (
    <div>
      <AdminHeader />
      <div className="flex">
        <div className="flex flex-col  w-1/4">
          <AdminSidebar />
        </div>
        <div className="flex  flex-col  mt-40 w-3/4">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-extrabold">Careers</h1>
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
                Job Post
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
                View Applicants
              </p>
            </div>
            {toggle ? (
              <div className="flex flex-col w-full p-2 px-4">
                <div className="flex justify-between ">
                  <div className="flex">
                    <input
                      className="border-b rounded-l border-t border-l border-2 p-2 bg-yellow-50"
                      type="text"
                      name=""
                      id=""
                      placeholder="Search By Title"
                    />
                    <button className="bg-amber-800 text-white p-2 rounded-r">
                      search
                    </button>
                  </div>
                  <button
                    onClick={() => setOpenModal(true)}
                    className="bg-amber-800 text-white p-2"
                  >
                    Add Job
                  </button>
                  <Modal show={openModal} onClose={() => setOpenModal(false)}>
                    <ModalHeader className="flex items-center justify-center bg-amber-800 h-[10px]">
                      <div className="flex justify-center items-center ">
                        <p className="text-center text-yellow-50">
                          Application Form
                        </p>
                      </div>
                    </ModalHeader>
                    <ModalBody>
                      <div className="space-y-3">
                        <div className="flex justify-center item-center space-x-3 ">
                          <input
                            className="bg-yellow-50 w-3/4 min-h-10 outline-1 outline-amber-800 rounded px-2"
                            type="text"
                            name=""
                            id=""
                            value={jobDetails.title}
                            onChange={(e) =>
                              setJobDetails({
                                ...jobDetails,
                                title: e.target.value,
                              })
                            }
                            placeholder="Job Title"
                          />
                        </div>
                        <div className="flex justify-center item-center space-x-3 ">
                          <input
                            className="bg-yellow-50 w-3/4 min-h-10 outline-1 outline-amber-800 rounded px-2"
                            value={jobDetails.location}
                            onChange={(e) =>
                              setJobDetails({
                                ...jobDetails,
                                location: e.target.value,
                              })
                            }
                            type="text"
                            name=""
                            id=""
                            placeholder="Location"
                          />
                        </div>
                        <div className="flex justify-center item-center space-x-3 ">
                          <input
                            value={jobDetails.jobType}
                            onChange={(e) =>
                              setJobDetails({
                                ...jobDetails,
                                jobType: e.target.value,
                              })
                            }
                            className="bg-yellow-50 w-3/4 min-h-10 outline-1 outline-amber-800 rounded px-2"
                            type="text"
                            name=""
                            id=""
                            placeholder="Job Type"
                          />
                        </div>
                        <div className="flex justify-center item-center space-x-3 ">
                          <input
                            value={jobDetails.salary}
                            onChange={(e) =>
                              setJobDetails({
                                ...jobDetails,
                                salary: e.target.value,
                              })
                            }
                            className="bg-yellow-50 w-3/4 min-h-10 outline-1 outline-amber-800 rounded px-2"
                            type="text"
                            name=""
                            id=""
                            placeholder="Salary"
                          />
                        </div>
                        <div className="flex justify-center item-center space-x-3 ">
                          <input
                            value={jobDetails.qualification}
                            onChange={(e) =>
                              setJobDetails({
                                ...jobDetails,
                                qualification: e.target.value,
                              })
                            }
                            className="bg-yellow-50 w-3/4 min-h-10 outline-1 outline-amber-800 rounded px-2"
                            type="text"
                            name=""
                            id=""
                            placeholder="Qualification"
                          />
                        </div>
                        <div className="flex justify-center item-center space-x-3 ">
                          <input
                            value={jobDetails.experience}
                            onChange={(e) =>
                              setJobDetails({
                                ...jobDetails,
                                experience: e.target.value,
                              })
                            }
                            className="bg-yellow-50 w-3/4 min-h-10 outline-1 outline-amber-800 rounded px-2"
                            type="text"
                            name=""
                            id=""
                            placeholder="Experience"
                          />
                        </div>

                        <div className="flex justify-center">
                          <textarea
                            value={jobDetails.description}
                            onChange={(e) =>
                              setJobDetails({
                                ...jobDetails,
                                description: e.target.value,
                              })
                            }
                            id="message"
                            name="message"
                            rows="2"
                            placeholder="Description"
                            className=" p-3 border border-gray-300 w-3/4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-yellow-50 text-gray-700"
                          />
                        </div>
                      </div>
                    </ModalBody>
                    <ModalFooter className="flex justify-end">
                      <Button className="bg-yellow-400" onClick={handleReset}>
                        Reset
                      </Button>
                      <Button className="bg-amber-800" onClick={handleAddJob}>
                        Add
                      </Button>
                    </ModalFooter>
                  </Modal>
                </div>
                {jobs?.length > 0 ? (
                  <div>
                    {jobs.map((item) => (
                      <div className="flex flex-col p-2 border rounded my-2 mt-5">
                        <div className="flex">
                          <div className="flex flex-col flex-1">
                            <h1 className="text-3xl font-bold">{item.title}</h1>
                            <hr className="border-2 border-neutral-950" />
                            <p className="text-blue-600 text-xl font-bold flex items-center">
                              <IoLocation className="me-1" /> {item.location}
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              handleDelete(item._id);
                            }}
                            className="bg-amber-800 text-white p-2 me-3 text-center rounded flex flex-col items-center"
                          >
                            Delete <MdDelete className="text-white text-3xl" />
                          </button>
                        </div>
                        <p className="my-1 ">
                          <span className="me-5">Job Type </span>:{" "}
                          {item.jobType}
                        </p>
                        <p className="my-1">
                          {" "}
                          <span className="me-19">Salary</span>:{item.salary}
                        </p>
                        <p className="my-1">
                          {" "}
                          <span className="me-2">Qualification</span>:
                          {item.qualification}
                        </p>
                        <p className="my-1">
                          <span className="me-9"> Experience</span>:
                          {item.experience}
                        </p>
                        <p className="my-1">
                          <span className="me-4">Description</span>:{" "}
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No Jobs Found</p>
                )}
                {/* <div className="flex flex-col p-2 border rounded my-2 mt-5">
                  <div className="flex">
                    <div className="flex flex-col flex-1">
                      <h1 className="text-3xl font-bold">Hr Assistant</h1>
                      <hr className="border-2 border-neutral-950" />
                      <p className="text-blue-600 text-xl font-bold flex items-center">
                        <IoLocation className="me-1" /> Kochi
                      </p>
                    </div>
                    <button className="bg-amber-800 text-white p-2 me-3 text-center rounded flex flex-col items-center">
                      Delete <MdDelete className="text-white text-3xl" />
                    </button>
                  </div>
                  <p className="my-1 ">
                    <span className="me-5">Job Type </span>:
                  </p>
                  <p className="my-1">
                    {" "}
                    <span className="me-19">Salary</span>:{" "}
                  </p>
                  <p className="my-1">
                    {" "}
                    <span className="me-2">Qualification</span>:{" "}
                  </p>
                  <p className="my-1">
                    <span className="me-9"> Experience</span>:{" "}
                  </p>
                  <p className="my-1">
                    <span className="me-4">Description</span>: Lorem ipsum dolor
                    sit amet consectetur adipisicing elit. Minus fugit hic
                    iusto. Eos quisquam quos sit autem, perferendis
                    exercitationem magni ipsam praesentium, rerum earum fuga
                    deleniti quaerat dolore consequuntur ratione!{" "}
                  </p>
                </div> */}
              </div>
            ) : (
              <div className="w-full">
                <div className="flex flex-col w-full p-2 px-4">
                  <table className="table-auto border-collapse border-2 border-gray-400 w-full text-left">
                    <thead className="bg-amber-100">
                      <tr>
                        <th className="border-2 border-gray-400 px-4 py-2">
                          Sl
                        </th>
                        <th className="border-2 border-gray-400 px-4 py-2">
                          Job Title
                        </th>
                        <th className="border-2 border-gray-400 px-4 py-2">
                          Name
                        </th>
                        <th className="border-2 border-gray-400 px-4 py-2">
                          Qualification
                        </th>
                        <th className="border-2 border-gray-400 px-4 py-2">
                          Email
                        </th>
                        <th className="border-2 border-gray-400 px-4 py-2">
                          Phone
                        </th>
                        <th className="border-2 border-gray-400 px-4 py-2">
                          Cover Letter
                        </th>
                        <th className="border-2 border-gray-400 px-4 py-2">
                          Resume
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {applicants.length > 0 ? (
                        applicants.map((applicant, idx) => (
                          <tr key={applicant._id}>
                            <td className="border-2 border-gray-400 px-4 py-2">
                              {idx + 1}
                            </td>
                            <td className="border-2 border-gray-400 px-4 py-2">
                              {applicant.jobTitle}
                            </td>
                            <td className="border-2 border-gray-400 px-4 py-2">
                              {applicant.fullName}
                            </td>
                            <td className="border-2 border-gray-400 px-4 py-2">
                              {applicant.qualification}
                            </td>
                            <td className="border-2 border-gray-400 px-4 py-2">
                              {applicant.email}
                            </td>
                            <td className="border-2 border-gray-400 px-4 py-2">
                              {applicant.phone}
                            </td>
                            <td className="border-2 border-gray-400 px-4 py-2 hover:underline hover:text-blue-600 cursor-pointer">
                              {applicant.coverletter}
                            </td>
                            <td className="border-2 border-gray-400 px-4 py-2 hover:underline hover:text-blue-600 cursor-pointer">
                              <a
                                href={`/uploads/${applicant.resume}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                              >
                                Download
                              </a>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={8} className="text-center py-4">
                            No applicants found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AdminCareers;
