import { useState, useEffect } from "react";

import ProfileNormalStaffEditForm from "./ProfileNormalStaffDisplayComponent/ProfileNormalStaffEditForm";
import { makeRequest } from "../../../axios";

export default function NormalStaffProfile() {
  const [userData, setUserData] = useState({
    User_ID: "",
    User_type_ID: "",
    First_Name: "",
    Last_Name: "",
    Email: "",
    Password: "",
    Username: "",
    Contact_Number: "",
  });

  // Fetch user data
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await makeRequest.get("/");
      setUserData({
        User_ID: response.data.User_ID,
        User_type_ID: response.data.User_type_ID,
        First_Name: response.data.First_Name,
        Last_Name: response.data.Last_Name,
        Email: response.data.Email,
        Password: response.data.Password,
        Contact_Number: response.data.Contact_Number,
        Username: response.data.Username,
      });
      console.log("the response " + JSON.stringify(response));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setEditFormData(userData); // Set edit form data to current user data
    setNewPassword(""); // Reset newPassword when opening the modal
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  // Functions for handling edit form
  const [newPassword, setNewPassword] = useState("");
  const [editFormData, setEditFormData] = useState({
    User_ID: "",
    First_Name: "",
    Last_Name: "",
    Email: "",
    Password: "",
    Username: "",
    Contact_Number: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "NewPassword") {
      setNewPassword(value);
    } else {
      setEditFormData({
        ...editFormData,
        [name]: value,
      });
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    // Confirmation dialog
    if (window.confirm("Are you sure you want to save these changes?")) {
      try {
        // Validate contact number
        if (
          editFormData.Contact_Number &&
          editFormData.Contact_Number.length !== 11
        ) {
          alert("Contact number must be 11 digits");
          return; // Do not proceed with submission
        }
        // Validate email
        if (
          editFormData.Email &&
          !editFormData.Email.includes(".com") &&
          !editFormData.Email.includes(".ph")
        ) {
          alert("Email must contain .com");
          return; // Do not proceed with submission
        }
        const response = await makeRequest.put("/updateProfile", {
          ...editFormData,
          NewPassword: newPassword, // Include the new password
        });
        console.log(response.data);
        closeModal(); // Close the modal after successful update
        const updatedUser = response.data.UpdatedUser;
        setUserData(updatedUser); // Update user data with the received updated data
        alert("Profile edited successfully!");
      } catch (error) {
        console.error("Error updating user:", error);
        // Handle error here
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
  <h2 className="text-3xl font-semibold text-center mb-8 font-mono">USER PROFILE</h2>
  <div className="bg-white shadow-md rounded-lg p-8 mx-auto max-w-lg">
    <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b-2 border-gray-400 pb-2 font-mono">ACCOUNT DETAILS</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex flex-col">
        <label className="text-gray-600 font-semibold">FULL NAME</label>
        <p className="text-gray-800 font-bold">{userData.First_Name} {userData.Last_Name}</p>
      </div>
      <div className="flex flex-col">
        <label className="text-gray-600 font-semibold">EMAIL</label>
        <p className="text-gray-800 font-bold">{userData.Email}</p>
      </div>
      <div className="flex flex-col">
        <label className="text-gray-600 font-semibold">MOBILE NUMBER</label>
        <p className="text-gray-800 font-bold">{userData.Contact_Number}</p>
      </div>
      <div className="flex flex-col">
        <label className="text-gray-600 font-semibold">USERNAME</label>
        <p className="text-gray-800 font-bold">{userData.Username}</p>
      </div>
      <div className="flex flex-col">
        <label className="text-gray-600 font-semibold">PASSWORD</label>
        <p className="text-gray-800 font-bold">*********</p>
      </div>
    </div>
    <div className="mt-8 flex justify-center">
      <button
        onClick={openModal}
        className="py-2 px-6 bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 
        focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition duration-200 
        text-center text-base font-semibold shadow-md focus:outline-none rounded-lg"
      >
        Edit Account Details
      </button>
          {isModalOpen && (
            <ProfileNormalStaffEditForm
              editFormData={editFormData}
              handleEditSubmit={handleEditSubmit}
              closeModal={closeModal}
              handleChange={handleChange}
              newPassword={newPassword}
              setNewPassword={setNewPassword}
            />
          )}
        </div>
      </div>
    </div>
  );
}
