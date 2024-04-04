import { useState } from "react";

export default function NormalFooter() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => { 
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <footer className=" flex bg-gray-800 text-white h-10 items-center text-center w-screen bottom-0 mt-auto">
      <div className="ml-96 flex gap-2">
        <p className="font-bold ml-96">© 2023 CHEDRMIS. All rights reserved. ©</p>

        <div>
          <button
            className="text-white font-bold hover:underline items-center flex  "
            onClick={openModal}
          >
            About Us
          </button>
        </div>
        {isModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-md">
      <div className="flex justify-between items-center bg-gray-800 px-4 py-3">
        <p className="text-white text-lg font-semibold">About Us</p>
        <button
          className="text-white text-lg hover:text-gray-300 focus:outline-none"
          onClick={closeModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="p-4 text-black">
  <div className="border border-gray-200 rounded-lg p-6">
    <div className="flex justify-between items-center mb-4">
      <p className="text-lg font-semibold font-mono mb-2">Developer:</p>
      <p className="text-gray-600">College of Information Technology</p>
    </div>
    <div className="mb-4">
      <p className="text-lg font-semibold font-mono mb-2">Email:</p>
      <div>
        <p className="text-gray-600">superlaggerxz@gmail.com</p>
        <p className="text-gray-600">von@gmail.com</p>
        <p className="text-gray-600">jemry@gmail.com</p>
      </div>
    </div>
    <div>
      <p className="text-lg font-semibold font-mono mb-2">Mobile Number:</p>
      <div>
        <p className="text-gray-600">09972078367</p>
        <p className="text-gray-600">091234</p>
        <p className="text-gray-600">0912345</p>
      </div>
    </div>
  </div>
</div>

    </div>
  </div>
)}
    </div>
  </footer>
  )
}