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
    <div className="relative ml-5 mt-28">
  <h2 className="text-3xl font-semibold text-center bg-blue-600 text-white p-4">
    User Profile
  </h2>
  <table className="min-w-full leading-normal">
    <thead className="bg-gray-400">
    <tr className=" ">
        <th className="border px-3 py-2">User ID</th>
        <th className="border px-3 py-2">User Type ID</th>
        <th className="border px-3 py-2">First Name</th>
        <th className="border px-3 py-2">Last Name</th>
        <th className="border px-3 py-2">Email</th>
        <th className="border px-3 py-2">Mobile Number</th>
        <th className="border px-3 py-2">Username</th>
        <th className="border px-3 py-2">Password</th>
      </tr>
    </thead>
    <tbody className="bg-white">
      <tr>
        <td className="border px-3 py-2">{userData.User_ID}</td>
        <td className="border px-3 py-2">{userData.User_type_ID}</td>
        <td className="border px-3 py-2">{userData.First_Name}</td>
        <td className="border px-3 py-2">{userData.Last_Name}</td>
        <td className="border px-3 py-2">{userData.Email}</td>
        <td className="border px-3 py-2">{userData.Contact_Number}</td>
        <td className="border px-3 py-2">{userData.Username}</td>
        <td className="border px-3 py-2">*</td>
      </tr>
    </tbody>
  </table>

  <div className="p-4">
    <button
      onClick={openModal}
      className="w-full bg-blue-500 text-white font-bold rounded py-2 cursor-pointer"
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

  );
}
