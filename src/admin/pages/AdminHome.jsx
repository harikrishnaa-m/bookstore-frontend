import React from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function AdminHome() {
  const books = [
    { title: "The Great Gatsby", sold: 120 },
    { title: "To Kill a Mockingbird", sold: 200 },
    { title: "1984", sold: 180 },
    { title: "The Alchemist", sold: 250 },
  ];
  return (
    <div>
      <AdminHeader />
      <div className="flex">
        <div className="flex flex-col  w-1/4">
          <AdminSidebar />
        </div>
        <div className="flex  flex-col  mt-40 w-3/4">
          <div className="flex justify-evenly">
            <div className="bg-indigo-800 p-4 rounded shadow-lg text-white flex">
              <div className="flex flex-col items-center">
                <p className="text-xl">Total Number of Books</p>

                <p className="text-3xl font-black">100+</p>
              </div>
            </div>
            <div className="bg-green-800 p-4 rounded shadow-lg  text-white flex">
              <div className="flex flex-col items-center">
                <p className="text-xl">Total Number of Users</p>

                <p className="text-3xl font-black">100+</p>
              </div>
            </div>
            <div className="bg-yellow-400 p-4 rounded shadow-lg  text-white flex">
              <div className="flex flex-col items-center">
                <p className="text-xl">Total Number of Employees</p>

                <p className="text-3xl font-black">100+</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center my-20">
            <div className="flex items-center justify-center my-20 w-3/4 h-96">
              <div className="w-full h-full">
                <h2 className="text-xl font-semibold mb-4">Book Sales</h2>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={books}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="title" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="sold" stroke="#6366F1" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
