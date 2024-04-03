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
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    // Pre-fill edit form data with user data
    setEditFormData({ ...userData });
  };

  const closeModal = () => setIsModalOpen(false);

  // Functions for handling edit form
  const [newPassword, setNewPassword] = useState("");
  const [editFormData, setEditFormData] = useState({
    User_ID: "",
    User_type_ID: "",
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

    // Validate contact number
    if (editFormData.Contact_Number && editFormData.Contact_Number.length !== 11) {
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
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-center mb-8">User Profile</h2>
      <div className="bg-white shadow-md rounded-lg p-8">
        <h3 className="text-xl font-semibold mb-4">Account Details</h3>
        <table className="w-full">
          <tbody>
            <tr>
              <th className="py-2">Full Name:</th>
              <td className="py-2">{userData.First_Name} {userData.Last_Name}</td>
            </tr>
            <tr>
              <th className="py-2">Email:</th>
              <td className="py-2">{userData.Email}</td>
            </tr>
            <tr>
              <th className="py-2">Mobile Number:</th>
              <td className="py-2">{userData.Contact_Number}</td>
            </tr>
            <tr>
              <th className="py-2">Username:</th>
              <td className="py-2">{userData.Username}</td>
            </tr>
            <tr>
              <th className="py-2">Password:</th>
              <td className="py-2">*******</td>
            </tr>
          </tbody>
        </table>
        <div className="mt-4">
          <button
            onClick={openModal}
            className="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600"
          >
            Edit
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