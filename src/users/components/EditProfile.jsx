"use client";
import { MdEdit } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import {
  Button,
  Checkbox,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import { useRef, useState } from "react";

function EditProfile() {
  const [openModal, setOpenModal] = useState(false);
  const emailInputRef = useRef(null); // ✅ no types needed
  return (
    <div>
      <Button
        className="btn border rounded text-lg text-blue-600 font-medium flex items-center"
        onClick={() => setOpenModal(true)}
      >
        <MdEdit className="mx-1 text-lg" />
        Edit
      </Button>
      <Modal
        show={openModal}
        size="md"
        popup
        onClose={() => setOpenModal(false)}
        initialFocus={emailInputRef}
        className="items-start justify-start" // Position top-left
      >
        <div className="fixed top-0 left-0 h-screen w-full max-w-sm bg-white dark:bg-gray-800 shadow-lg">
          <ModalHeader className="bg-amber-950 ">
            <p className="text-2xl "> Edit User Profile</p>
          </ModalHeader>
          <ModalBody className="h-full overflow-y-auto">
            <div className="flex flex-col items-center justify-center">
              <div>
                <img
                  className="h-[12rem] mt-3 rounded-circle "
                  src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png"
                  alt=""
                />
                <BiEdit className="relative bottom-15 left-35 text-4xl text-white bg-amber-400 cursor-pointer rounded" />
              </div>
              <input
                value={"User Name"}
                className="rounded border-1 border-neutral-600 mb-2 bg-white placeholder:text-gray-500 w-3/4 text-xl p-2"
                type="text"
              />
              <input
                value={"googlepswd"}
                className="rounded border-1 border-neutral-600 my-2 bg-white placeholder:text-gray-500 w-3/4 text-xl p-2"
                type="text"
              />
              <input
                value={"googlepswd"}
                className="rounded border-1 border-neutral-600 my-2 bg-white placeholder:text-gray-500 w-3/4 text-xl p-2"
                type="text"
              />
              <textarea
                rows={4}
                value={"Bookstore User"}
                className="rounded border-1 border-neutral-600 my-2 bg-white placeholder:text-gray-500 w-3/4 text-xl p-2"
                type="text"
              />
            </div>
            <div className="flex itmes-end justify-end space-x-4 my-3 mx-5">
              <button className="btn text-white bg-red-600 hover:font-bold hover:bg-red-700">
                Reset
              </button>
              <button className="btn text-white bg-green-600 hover:font-bold hover:bg-green-700">
                Update
              </button>
            </div>
          </ModalBody>
        </div>
      </Modal>
    </div>
  );
}

export default EditProfile;
