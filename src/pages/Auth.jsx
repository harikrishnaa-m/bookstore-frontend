import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { GoogleloginAPI, loginAPI, registerAPI } from "../services/allAPIs";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function Auth({ register }) {
  const navigate = useNavigate();

  //create a state for holding userdata
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const handleRegister = async () => {
    console.log(userDetails);
    if (register) {
      const { username, email, password } = userDetails;
      if (!username || !email || !password) {
        // alert("Please fill the form");
        toast.warn("Please fill the form", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        // API CALL
        try {
          const result = await registerAPI(userDetails);
          console.log(result);
          if (result.status == 201) {
            // alert("register successful..");
            toast.success("Register successfull..", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setUserDetails({
              username: "",
              email: "",
              password: "",
            });
            setTimeout(() => {
              navigate("/login");
            }, 4000);
          } else {
            // alert("register successful..");
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
          }
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      console.log("false no register");
      console.log(loginDetails);
      const { email, password } = loginDetails;
      if (!email || !password) {
        // alert("Please fill the form");
        toast.warn("Please fill the form", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        //API CALL
        try {
          const result = await loginAPI(loginDetails);
          console.log(result);
          if (result.status == 200) {
            sessionStorage.setItem("token", result.data.token);
            sessionStorage.setItem(
              "existingUser",
              JSON.stringify(result.data.existinguser)
            );
            toast.success("Login successfull..", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setLoginDetails({
              email: "",
              password: "",
            });
            if (result.data.existinguser.email == "admin@gmail.com") {
              navigate("/admin-home");
            } else {
              navigate("/allbooks");
            }
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
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  };
  const handleGoogleAuth = async (credentialResponse) => {
    console.log(credentialResponse);
    const decode = jwtDecode(credentialResponse.credential);
    console.log(decode);
    try {
      const result = await GoogleloginAPI({
        username: decode.name,
        email: decode.email,
        password: "googlepswd",
        photo: decode.picture,
      });
      console.log(result);
      if (result.status == 200) {
        sessionStorage.setItem("token", result.data.token);
        sessionStorage.setItem(
          "existingUser",
          JSON.stringify(result.data.existinguser)
        );
        toast.success("Login successfull..", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setLoginDetails({
          email: "",
          password: "",
        });
        if (result.data.existinguser.email == "admin@gmail.com") {
          navigate("/admin-home");
        } else {
          navigate("/");
        }
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
      }
    } catch (err) {
      console.log("errpr:", err);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center w-full max-w-md p-6 bg-white bg-opacity-90 rounded-lg shadow-lg">
        {register ? (
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Register
          </h2>
        ) : (
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Login</h2>
        )}
        <form className="w-full">
          {register ? (
            <>
              <div className="flex flex-col mb-4">
                <label className="text-gray-700 mb-2">Username</label>
                <input
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, username: e.target.value })
                  }
                  type="text"
                  id="username"
                  className="p-2 border border-gray-300 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="username"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="email" className="text-gray-700 mb-2">
                  Email
                </label>
                <input
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, email: e.target.value })
                  }
                  type="email"
                  id="email"
                  className="p-2 border border-gray-300 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="you@example.com"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="password" className="text-gray-700 mb-2">
                  Password
                </label>
                <input
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, password: e.target.value })
                  }
                  type="password"
                  id="password"
                  className="p-2 border border-gray-300 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col mb-4">
                <label htmlFor="email" className="text-gray-700 mb-2">
                  Your email
                </label>
                <input
                  onChange={(e) =>
                    setLoginDetails({ ...loginDetails, email: e.target.value })
                  }
                  type="email"
                  id="email"
                  className="p-2 border border-gray-300 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="you@example.com"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="password" className="text-gray-700 mb-2">
                  Password
                </label>
                <input
                  onChange={(e) =>
                    setLoginDetails({
                      ...loginDetails,
                      password: e.target.value,
                    })
                  }
                  type="password"
                  id="password"
                  className="p-2 border border-gray-300 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
              </div>
            </>
          )}{" "}
          <button
            type="button"
            onClick={handleRegister}
            className="w-full py-2 bg-amber-700 text-white rounded-md hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {register ? "Register Now" : "Sign In"}
          </button>
          <div className="flex gap-3 items-center justify-center mt-4">
            <p className=" text-center text-gray-600">
              {register ? "Already a user" : "New to here?"}{" "}
            </p>

            {register ? (
              <Link to={"/login"}>
                <p className="text-blue-500 cursor-pointer hover:underline">
                  Login
                </p>
              </Link>
            ) : (
              <Link to={"/register"}>
                <p className="text-blue-500 cursor-pointer hover:underline">
                  Register Now!
                </p>
              </Link>
            )}
          </div>
          <div className="m-2">
            {register ? null : (
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);
                  handleGoogleAuth(credentialResponse);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            )}
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Auth;
