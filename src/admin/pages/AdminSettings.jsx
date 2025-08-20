import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import {
  getAdminDetailsAPI,
  updateAdminDetailsAPI,
} from "../../services/allAPIs";

function AdminSettings() {
  const [preview, setPreview] = useState("");

  const [adminDetails, setAdminDetails] = useState({
    username: "",
    password: "",
    cpassword: "",
    bio: "",
    profile: null,
  });
  console.log(adminDetails);
  const handleReset = () => {
    setAdminDetails({
      username: "",
      password: "",
      cpassword: "",
      bio: "",
      profile: null,
    });
    setPreview("");
  };
  const handleUpdate = async () => {
    const token = sessionStorage.getItem("token");
    const { username, password, profile, bio, cpassword } = adminDetails;
    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };
    const reqBody = new FormData();
    for (let key in adminDetails) {
      reqBody.append(key, adminDetails[key]);
    }
    console.log([...reqBody.entries()]);

    if (username == "" || password == "" || bio == "" || profile == null) {
      alert("Please fill the form");
    }
    if (password != cpassword) {
      alert("Password Missmatch");
    } else {
      try {
        const result = await updateAdminDetailsAPI(reqBody, reqHeader);
        console.log(result);
        handleReset();
      } catch (err) {
        console.log(err);
      }
    }
  };
  console.log(preview);
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(sessionStorage.getItem("token"));
  }, []);
  const handleGetAdminDetails = async () => {
    const reqHeader = { Authorization: `Bearer ${token}` };
    try {
      if (token) {
        const result = await getAdminDetailsAPI(reqHeader);
        console.log(result.data);
        setAdminDetails({
          ...adminDetails,
          ...result.data[0], // assuming result.data is an array
          cpassword: "", // reset confirm password
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (token) {
      handleGetAdminDetails();
    }
  }, [token]);

  console.log(token);
  console.log(adminDetails);

  return (
    <div>
      <AdminHeader />
      <div className="flex">
        <div className="flex flex-col  w-1/4">
          <AdminSidebar />
        </div>
        <div className="flex  flex-col    mt-40 w-3/4">
          <div className="flex flex-col items-center justify-center w-full">
            <p className="text-center text-3xl font-bold">Settings</p>
            <div className="flex items-center justify-center w-full my-5 px-2">
              <div className="flex flex-col w-1/2">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Blanditiis aliquid, animi at deleniti, veniam, magni doloribus
                  quibusdam deserunt ad quasi temporibus. Nisi temporibus
                  cupiditate esse cum recusandae quia sapiente sint!
                </p>
              </div>
              <div className="flex flex-col  items-center space-y-2 py-4 w-1/2 bg-amber-800 rounded shadow-lg">
                <label htmlFor="profile" className="cursor-pointer">
                  <input
                    onChange={(e) => {
                      setAdminDetails({
                        ...adminDetails,
                        profile: e.target.files[0],
                      });
                      setPreview(URL.createObjectURL(e.target.files[0]));
                    }}
                    id="profile"
                    type="file"
                    style={{ display: "none" }}
                  />
                  {preview ? (
                    <img
                      className="cursor-pointer rounded-full"
                      src={preview}
                      width="200px"
                      alt=""
                    />
                  ) : (
                    <img
                      className="cursor-pointer"
                      src="https://icon-library.com/images/admin-icon-png/admin-icon-png-18.jpg"
                      width="200px"
                      alt=""
                    />
                  )}
                </label>
                <input
                  value={adminDetails.username}
                  onChange={(e) =>
                    setAdminDetails({
                      ...adminDetails,
                      username: e.target.value,
                    })
                  }
                  type="text"
                  name=""
                  id=""
                  className="bg-yellow-50 rounded text-xl p-2"
                  placeholder="username"
                />
                <input
                  value={adminDetails.password}
                  onChange={(e) =>
                    setAdminDetails({
                      ...adminDetails,
                      password: e.target.value,
                    })
                  }
                  type="text"
                  name=""
                  id=""
                  className="bg-yellow-50 rounded text-xl p-2"
                  placeholder="password"
                />
                <input
                  value={adminDetails.cpassword}
                  onChange={(e) =>
                    setAdminDetails({
                      ...adminDetails,
                      cpassword: e.target.value,
                    })
                  }
                  type="text"
                  className="bg-yellow-50 rounded text-xl p-2"
                  placeholder="confirm password"
                />
                <textarea
                  value={adminDetails.bio}
                  onChange={(e) =>
                    setAdminDetails({ ...adminDetails, bio: e.target.value })
                  }
                  rows={3}
                  type="text"
                  name=""
                  id=""
                  className="bg-yellow-50 rounded text-xl p-2"
                  placeholder="bio"
                />
                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={handleUpdate}
                    className="text-xl bg-green-600 text-white p-2 shadow rounded cursor-pointer"
                  >
                    Update
                  </button>
                  <button
                    onClick={handleReset}
                    className="text-xl bg-red-600 text-white p-2 rounded shadow cursor-pointer"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSettings;
