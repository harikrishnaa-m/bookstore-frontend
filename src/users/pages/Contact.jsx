import React from "react";
import Header from "../components/Header";
import Footer from "../../components/Footer";

function Contact() {
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center  bg-white p-6">
        <div className="w-full  bg-white  p-6">
          <h2 className="text-2xl font-bold text-center mt-10 mb-4">
            Contacts
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Distinctio
            inventore placeat nemo voluptatem iure iste asperiores qua amet sit.
            Similique corrupti praesentium delectus nesciunt odit laudantium |
            Beatae repudiandae amet odit! Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Soluta, doloremque ullam iaque atque
            totam quasi molestias cumque ducimus fugit voluptate suscipit vel
            distinctio.
          </p>

          <div className="flex justify-around items-center mb-6">
            <div className="flex flex-col items-center">
              <div className="flex items-center mb-2">
                <svg
                  className="w-6 h-6 text-gray-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <p>123 Main Street, Apt 4B, Anytown, CA 91234</p>
              </div>

              <div className="flex items-center mb-2">
                <svg
                  className="w-6 h-6 text-gray-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 7h3m-3 4h3m-3 4h3m-6-8h6m-6 4h6m-6 4h6"
                  />
                </svg>
                <p>+91 9876543210</p>
              </div>

              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-gray-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <p>bookstore@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-9 md:flex-row gap-6 items-center justify-center">
            <div className="w-1/4 bg-gray-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Send me Message</h3>
              <form className="flex flex-col">
                <input
                  type="text"
                  placeholder="Name"
                  className="p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  placeholder="Email Id"
                  className="p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Message"
                  className="p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                ></textarea>
                <button
                  type="submit"
                  className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Send ✉
                </button>
              </form>
            </div>

            <div className="w-1/4">
              <iframe
                className="w-full h-[350px]  rounded-lg"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15308644.360952849!2d69.82040303231196!3d20.48727865919922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb993f4bdc9751%3A0xfa89675226c16665!2sJaico%20Publishing%20House!5e0!3m2!1sen!2sin!4v1751221478740!5m2!1sen!2sin"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
