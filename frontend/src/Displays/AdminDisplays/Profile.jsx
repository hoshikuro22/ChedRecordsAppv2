import { useState, useEffect } from "react";

import ProfileAdminEditForm from "./ProfileAdminDisplayComponent/ProfileAdminEditForm";
import { makeRequest } from "../../../axios";

export default function Profile() {
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

      try {
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
    <div className="ml-5 mt-5 flex flex-row ">
      <div className="mr-64">
      <h2 className="text-3xl font-semibold text-center w-64 mb-20 bg-blue-600 text-white p-4">
    User Profile
  </h2>
      </div>

  <div className="flex flex-col justify-center items-center">
    <div className="border p-2 bg-white">
    <h1 className="font-semibold mb-8 text-3xl">Account Details

    </h1>
  <table className=" leading-normal border border-black">
    <tbody className="bg-white">

      <tr>
        <th className="border px-3 py-2 text-2xl">Full Name</th>
        <td className="border px-3 py-2 text-2xl ">{userData.First_Name} {userData.Last_Name}</td>
      </tr>
      <tr>
        <th className="border px-3 py-2 text-2xl">Email</th>
        <td className="border px-3 py-2 text-2xl">{userData.Email}</td>
      </tr>
      <tr>
        <th className="border px-3 py-2 text-2xl">Mobile Number</th>
        <td className="border px-3 py-2 text-2xl">{userData.Contact_Number}</td>
      </tr>
      <tr>
        <th className="border px-3 py-2 text-2xl">Username</th>
        <td className="border px-3 py-2 text-2xl">{userData.Username}</td>
      </tr>
      <tr>
        <th className="border px-3 py-2 text-2xl">Password</th>
        <td className="border px-3 py-2 text-2xl">*</td>
      </tr>
    </tbody>
  </table>
  </div>
  
  <div className="p-4">
    <button
      onClick={openModal}
      className="w-24 bg-blue-500 text-white font-bold rounded py-2 cursor-pointer"
    >
      EDIT
    </button>
    {isModalOpen && (
      <ProfileAdminEditForm
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
