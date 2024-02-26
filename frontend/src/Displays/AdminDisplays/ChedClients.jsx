import { useState, useEffect } from "react";

import ChedClientsAdminAddForm from "./ChedClientsAdminDisplayComponent/ChedClientsAdminAddForm";
import ChedClientsAdminTable from "./ChedClientsAdminDisplayComponent/ChedClientsAdminTable";
import ChedClientsAdminEditForm from "./ChedClientsAdminDisplayComponent/ChedClientsAdminEditForm";
import ChedClientsAdminMoreDetails from "./ChedClientsAdminDisplayComponent/ChedClientsAdminMoreDetails";
import ChedClientsAdminPagination from "./ChedClientsAdminDisplayComponent/ChedClientsAdminPagination";
import ChedClientsAdminSearchBar from "./ChedClientsAdminDisplayComponent/ChedClientsAdminSearchBar";
import { makeRequest } from "../../../axios";

export default function ChedClients() {
  const [formData, setFormData] = useState({
    clientID: "Client2024000",
    clientName: "",
    address: "",
    clientType: "",
    email: "",
    contactPerson: "",
    contactNumber: "",
    userID: "",
  });
  console.log("the formData " + JSON.stringify(formData));

  // to fetch user_ID
  useEffect(() => {
    makeRequest
      .get("/")
      .then((res) => {
        const userID = res.data.User_ID;
        console.log("Clients-This is the User_ID: " + userID);
        // Set the userID in the state
        setFormData((prevData) => ({ ...prevData, userID }));
      })
      .catch((error) => {
        console.error("Error fetching User_ID:", error);
      });
  }, []);

  // to fetch document type for the add and edit form
  const [clientTypeOptions, setClientTypeOptions] = useState([]);

  useEffect(() => {
    const fetchClientTypeData = async () => {
      try {
        const response = await makeRequest.get("/getClientTypes");
        setClientTypeOptions(response.data);
        console.log("Client types: " + JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching client type data:", error);
      }
    };

    fetchClientTypeData();
  }, []);

  //===== Edit =====//
  const [showEditForm, setShowEditForm] = useState(false);
  const [editFormData, setEditFormData] = useState({
    clientName: "",
    address: "",
    clientType: "",
    email: "",
    // filingCat: "",
    contactPerson: "",
    contactNumber: "",
    // file: null,
  });
  console.log("the EditformData " + JSON.stringify(editFormData));

  const handleEditClick = (client_id) => {
    const selectedRow = clients.find(
      (client) => client.client_id === client_id
    );
    if (selectedRow) {
      console.log("Selected Row Data to edit:", selectedRow);
      setEditFormData({
        ...selectedRow,
      });
      setShowEditForm(true);
    }
  };

  // the "save form function of edit modal"

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const userConfirmed = window.confirm(
      "Are you sure you want to save changes?"
    );

    if (!userConfirmed) {
      // User clicked 'Cancel' in the confirmation dialog
      alert("Changes not saved.");
      return;
    }

    // Validate email
    if (
      editFormData.email &&
      !editFormData.email.includes(".com") &&
      !editFormData.email.includes(".ph")
    ) {
      alert("Email must contain .com");
      return; // Do not proceed with submission
    }
    // Validate contact number
    if (
      editFormData.contact_number &&
      editFormData.contact_number.length !== 11
    ) {
      alert("Contact number must be 11 digits");
      return; // Do not proceed with submission
    }

    try {
      const response = await makeRequest.put(
        `/updateClient/${editFormData.client_id}`,
        {
          client_id: editFormData.client_id,
          client_name: editFormData.client_name,
          address: editFormData.address,
          email: editFormData.email,
          client_type_id: editFormData.client_type_id,
          contact_person: editFormData.contact_person,
          contact_number: editFormData.contact_number,
        }
      );

      if (response.data.Status === "Success") {
        alert("Client edited successfully!");
        setShowEditForm(false);
        fetchClients(); // Refresh the client list
      } else {
        alert("Error editing client. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while editing the client.");
    }
  };

  const handleCloseEditForm = () => {
    setShowEditForm(false);
  };

  //====Edit====//

  const [clients, setClients] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // for dymanic search for filter
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1000;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = clients.slice(indexOfFirstItem, indexOfLastItem);

  // for info or more details
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);

  const handleInfoClick = (client_id) => {
    // Find the selected row data based on the client_id
    const selectedRow = clients.find(
      (client) => client.client_id === client_id
    );
    if (selectedRow) {
      setSelectedRowData(selectedRow);
      setInfoModalOpen(true);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await makeRequest.get("/getClients");
      console.log(response.data); //  line to check the fetched data
      const sortedClients = response.data.sort();
      setClients(sortedClients);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching clients(client side).");
    }
  };

  const getMaxSeqNo = () => {
    if (clients.length === 0) {
      return 1;
    }
    const maxSeqNo = Math.max(...clients.map((client) => client.seq_no));
    return maxSeqNo + 1;
  };

  // all data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddClientClick = () => {
    setShowForm(true);
    setFormData((prevData) => ({
      ...prevData,
    }));
  };

  const handleHideFormClick = () => {
    setShowForm(false);
  };

  const handleClearFormClick = () => {
    setFormData((prevData) => ({
      ...prevData,
      clientID: "Client2024000",
      clientName: "",
      address: "",
      clientType: "",
      email: "",
      contactPerson: "",
      contactNumber: "",
      userID: prevData.userID,
    }));
  };

  // pang add data sa database if eclick ang submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userConfirmed = window.confirm(
      "Are you sure you want to add this client?"
    );

    if (!userConfirmed) {
      // User clicked 'Cancel' in the confirmation dialog
      alert("Client not added.");
      return;
    }

    // Validate email
    if (
      formData.email &&
      !formData.email.includes(".com") &&
      !formData.email.includes(".ph")
    ) {
      alert("Email must contain .com");
      return; // Do not proceed with submission
    }
    // const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    // if (!emailRegex.test(formData.email)) {
    //   alert("Email must be in a valid format, and end with .com");
    //   return; // Do not proceed with submission
    // }

    // Validate contact number
    if (formData.contactNumber && formData.contactNumber.length !== 11) {
      alert("Contact number must be 11 digits");
      return; // Do not proceed with submission
    }

    try {
      const seq_no = getMaxSeqNo();

      const response = await makeRequest.post("/addClient", {
        seq_no: seq_no,
        clientID: formData.clientID,
        clientName: formData.clientName,
        address: formData.address,
        clientType: formData.clientType,
        email: formData.email,
        contactPerson: formData.contactPerson,
        contactNumber: formData.contactNumber,
        userID: formData.userID,
      });

      if (response.data.Status === "Success") {
        alert("Client added successfully!");
        setFormData({
          clientID: "Client2024000",
          clientName: "",
          address: "",
          clientType: "",
          email: "",
          contactPerson: "",
          contactNumber: "",
          userID: formData.userID,
        });
        fetchClients();
        setShowForm(false);
      } else {
        alert("Error adding client. Please try again.(frontend)");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the client.");
    }
  };

  const handleDeleteClick = async (id) => {
    // Show a confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this client?"
    );

    if (confirmDelete) {
      try {
        // Fetch user information (replace this with your actual method of getting user info)
        const userResponse = await makeRequest.get("/");
        const { User_ID, First_Name, Last_Name } = userResponse.data;

        const deleteResponse = await makeRequest.delete(`/deleteClient/${id}`, {
          headers: {
            // Pass user information in headers
            User_ID: User_ID,
            First_Name: First_Name,
            Last_Name: Last_Name,
          },
        });

        console.log(
          "delete function call user_id and name: " + User_ID,
          First_Name,
          Last_Name
        );

        if (deleteResponse.data.Status === "Success") {
          alert("Client deleted successfully!");
          fetchClients(); // Refresh the client list
        } else {
          alert("Error deleting client. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while deleting the client (frontend).");
      }
    }
  };

  return (
    <div className="h-auto mt-2 p-1 ml-5 ">
      <div className="flex flex-row gap-2">
        {/* Search bar for filter by Client ID or Name */}
        <ChedClientsAdminSearchBar
          handleSearchChange={handleSearchChange}
          searchQuery={searchQuery}
        />

        {/* The add form */}
        <ChedClientsAdminAddForm
          formData={formData}
          handleSubmit={handleSubmit}
          showForm={showForm}
          clientTypeOptions={clientTypeOptions}
          handleAddClientClick={handleAddClientClick}
          handleHideFormClick={handleHideFormClick}
          handleClearFormClick={handleClearFormClick}
          handleChange={handleChange}
          // handleFileChange={handleFileChange}
        />
      </div>

      <div className="border-2 border-black  bg-white rounded-lg shadow-md overflow-auto h-[720px]">
        <h2 className="text-xl font-semibold "></h2>

        {/* Table sa pagtawag sa data gikan sa server */}
        <div className="">
          <ChedClientsAdminTable
            currentItems={currentItems}
            searchQuery={searchQuery}
            handleDeleteClick={handleDeleteClick}
            handleInfoClick={handleInfoClick}
            handleEditClick={handleEditClick}
            clientTypeOptions={clientTypeOptions}
          />
        </div>

        {/* Edit Modal Form */}
        {showEditForm && (
          <ChedClientsAdminEditForm
            editFormData={editFormData}
            handleEditSubmit={handleEditSubmit}
            handleCloseEditForm={handleCloseEditForm}
            handleChange={(e) =>
              setEditFormData({
                ...editFormData,
                [e.target.name]: e.target.value,
              })
            }
          />
        )}
      </div>

      {/* Pagination */}
      <ChedClientsAdminPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        totalItems={clients.length}
      />

      {/* Info modal(MORE DETAILS) */}
      <ChedClientsAdminMoreDetails
        isInfoModalOpen={isInfoModalOpen}
        setInfoModalOpen={setInfoModalOpen}
        selectedRowData={selectedRowData}
      />
    </div>
  );
}
