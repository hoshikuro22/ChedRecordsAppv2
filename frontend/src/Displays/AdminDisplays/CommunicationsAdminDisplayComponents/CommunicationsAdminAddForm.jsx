import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { CiEraser } from "react-icons/ci";
import ChedClientsAdminChedClientsAddForm from "./CommunicationsAdminChedClientsAddForm";

import { makeRequest } from "../../../../axios";
import CommunicationsAdminDocumentTypesAddForm from "./CommunicationsAdminDocumentTypesAddForm";
import CommunicationsAdminPersonnelAddForm from "./CommunicationsAdminPersonnelAddForm";

export default function CommunicationsAdminAddForm({
  showForm,
  formData,
  // personnelOptions,
  // clientsOptions,
  // documentTypeOptions,
  // unitOptions,
  handleChange,
  handleSubmit,
  handleHideFormClick,
  handleClearFormClick,
  handleFileChange,
  handleAddCommunicationClick,
  maxDocIDShown,
  selectedPersonnelUnit,
}) {
  const [isOpen, setIsOpen] = useState(true);
  //======================ADD CHEDClients functions below=========================//
  const [clients, setClients] = useState([]);
  const [showFormCHEDClients, setShowFormCHEDClients] = useState(false);
  const [formDataCHEDClients, setFormDataCHEDClients] = useState({
    clientID: "Client2024000",
    clientName: "",
    address: "",
    clientType: "",
    email: "",
    contactPerson: "",
    contactNumber: "",
    userID: "",
  });
  console.log("the formDataCHEDClients " + JSON.stringify(formDataCHEDClients));

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
  const handleChangeCHEDClients = (e) => {
    const { name, value } = e.target;
    setFormDataCHEDClients((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // to fetch user_ID
  useEffect(() => {
    makeRequest
      .get("/")
      .then((res) => {
        const userID = res.data.User_ID;
        console.log("Clients-This is the User_ID: " + userID);
        // Set the userID in the state
        setFormDataCHEDClients((prevData) => ({ ...prevData, userID }));
      })
      .catch((error) => {
        console.error("Error fetching User_ID:", error);
      });
  }, []);

  // pang add data sa database if eclick ang submit
  const handleSubmitCHEDClients = async (e) => {
    e.preventDefault();

    // Display a confirmation dialog
    const userConfirmed = window.confirm(
      "Are you sure you want to add this client?"
    );

    if (formDataCHEDClients.clientID.trim() === 'Client2024000') {
      alert('Client ID is required, or need to be changed');
      return;
    }

    if (formDataCHEDClients.clientName.trim() === '') {
      alert('Client Name is required');
      return;
    }

    if (formDataCHEDClients.address.trim() === '') {
      alert('Address is required');
      return;
    }

    if (formDataCHEDClients.clientType.trim() === '') {
      alert('Client Type is required');
      return;
    }

    if (formDataCHEDClients.email.trim() === '') {
      alert('Email Address  is required');
      return;
    }

    if (formDataCHEDClients.contactPerson.trim() === '') {
      alert('Contact Person is required');
      return;
    }

    if (!userConfirmed) {
      // User clicked 'Cancel' in the confirmation dialog
      alert("Client not added.");
      return;
    }


    // Validate email
    if (
      formDataCHEDClients.email &&
      !formDataCHEDClients.email.includes(".com") &&
      !formDataCHEDClients.email.includes(".ph")
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
    if (
      formDataCHEDClients.contactNumber &&
      formDataCHEDClients.contactNumber.length !== 11
    ) {
      alert("Contact number must be 11 digits");
      return; // Do not proceed with submission
    }

    try {
      const seq_no = getMaxSeqNo();
      const response = await makeRequest.post("/addClient", {
        seq_no: seq_no,
        clientID: formDataCHEDClients.clientID,
        clientName: formDataCHEDClients.clientName,
        address: formDataCHEDClients.address,
        clientType: formDataCHEDClients.clientType,
        email: formDataCHEDClients.email,
        contactPerson: formDataCHEDClients.contactPerson,
        contactNumber: formDataCHEDClients.contactNumber,
        userID: formDataCHEDClients.userID,
      });

      if (response.data.Status === "Success") {
        alert("Client added successfully!");
        setFormDataCHEDClients({
          clientID: "Client2024000",
          clientName: "",
          address: "",
          clientType: "",
          email: "",
          contactPerson: "",
          contactNumber: "",
          userID: formDataCHEDClients.userID,
        });
        fetchClients();
        fetchClientData();
        setShowFormCHEDClients(false);
      } else {
        alert("Error adding client. Please try again.(frontend)");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the client.");
    }
  };

  const handleAddClientClick = () => {
    setShowFormCHEDClients(true);
    setFormDataCHEDClients((prevData) => ({
      ...prevData,
    }));
  };

  const handleHideFormClickCHEDClients = () => {
    setShowFormCHEDClients(!showFormCHEDClients);
    setIsOpen(false);
  };

  const handleClearFormClickCHEDClients = () => {
    setFormDataCHEDClients((prevData) => ({
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

  // to fetch client type for the add form
  const [clientTypeOptionCHEDClients, setClientTypeOptionsCHEDClients] =
    useState([]);

  useEffect(() => {
    fetchClientTypeData();
  }, []);
  const fetchClientTypeData = async () => {
    try {
      const response = await makeRequest.get("/getClientTypes");
      setClientTypeOptionsCHEDClients(response.data);
      console.log("Client types: " + JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching client type data:", error);
    }
  };

  // to fetch client for the add form
  const [clientsOptions, setclientsOptions] = useState([]);

  useEffect(() => {
    fetchClientData();
  }, []);
  const fetchClientData = async () => {
    try {
      const response = await makeRequest.get("/getClients");
      setclientsOptions(response.data);
      console.log("the client " + JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching clients data:", error);
    }
  };

  //======================ADD CHEDClients functions above=========================//

  //======================ADD DOCUMENT TYPES functions below========================
  const [documentTypes, setDocumentTypes] = useState([]);
  const [showFormDocumentTypes, setShowFormDocumentTypes] = useState(false);
  const [formDataDocumentTypes, setFormDataDocumentTypes] = useState({
    documentType: "",
    remarks: "",
  });
  console.log("the formDataDocumentTypes " + JSON.stringify(formData));

  useEffect(() => {
    fetchDocumentTypes();
  }, []);

  const fetchDocumentTypes = async () => {
    try {
      const response = await makeRequest.get("/getDocumentTypes");
      console.log(response.data); // line to check the fetched data
      const sortedDocumentTypes = response.data.sort();
      setDocumentTypes(sortedDocumentTypes);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching document types.");
    }
  };

  const getMaxDocumentTypeID = () => {
    if (documentTypes.length === 0) {
      return 1;
    }
    const maxDocumentTypeID = Math.max(
      ...documentTypes.map((documentType) => parseInt(documentType.Doc_type_ID))
    );
    return maxDocumentTypeID + 1;
  };

  // all data
  const handleChangeDocumentTypes = (e) => {
    const { name, value } = e.target;
    setFormDataDocumentTypes({
      ...formDataDocumentTypes,
      [name]: value,
    });
  };

  // add document type
  const handleSubmitDocumentTypes = async (e) => {
    e.preventDefault();

    // Display a confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to add this document type?"
    );

    if (formDataDocumentTypes.documentType.trim() === '') {
      alert('Document Type is required');
      return;
    }


    if (!isConfirmed) {
      // If the user cancels the confirmation, do nothing
      return;
    }

    try {
      const documentTypeID = getMaxDocumentTypeID();
      const response = await makeRequest.post("/addDocumentType", {
        ...formDataDocumentTypes,
        documentTypeID,
      });
      if (response.data.Status === "Success") {
        alert("Document type added successfully!");
        setFormDataDocumentTypes({
          documentType: "",
          remarks: "",
        });
        fetchDocumentTypes();
        fetchDocumentTypeData();
        setShowFormDocumentTypes(false);
      } else {
        alert("Error adding document type. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the document type.");
    }
  };

  const handleAddDocumentTypeClick = () => {
    setShowFormDocumentTypes(true);
  };

  const handleHideFormClickDocumentTypes = () => {
    setShowFormDocumentTypes(!showFormDocumentTypes);
    setIsOpen(false);
  };

  const handleClearFormClickDocumentTypes = () => {
    setFormDataDocumentTypes({
      documentType: "",
      remarks: "",
    });
  };

  // // to fetch document type for the add form
  // const [documentTypeOptionsDocumentTypes, setDocumentTypeOptionsDocumentTypes] = useState([]);

  // useEffect(() => {
  //   fetchDocumentTypeData();
  // }, []);
  //   const fetchDocumentTypeData = async () => {
  //     try {
  //       const response = await makeRequest.get("/getDocumentTypes");
  //       setDocumentTypeOptionsDocumentTypes(response.data);
  //       console.log("Document types: " + JSON.stringify(response.data));
  //     } catch (error) {
  //       console.error("Error fetching document type data:", error);
  //     }
  //   };

  // to fetch document type for the add form
  const [documentTypeOptions, setDocumentTypeOptions] = useState([]);

  useEffect(() => {
    fetchDocumentTypeData();
  }, []);
  const fetchDocumentTypeData = async () => {
    try {
      const response = await makeRequest.get("/getDocumentTypes");
      setDocumentTypeOptions(response.data);
      console.log("Document types: " + JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching document type data:", error);
    }
  };

  //======================ADD DOCUMENT TYPES functions above=========================//

  //======================ADD PERSONNEL functions below=========================//
  const [personnels, setPersonnels] = useState([]);
  const [showFormPersonnels, setShowFormPersonnels] = useState(false);
  const [formDataPersonnels, setFormDataPersonnels] = useState({
    unit: "",
    firstName: "",
    lastName: "",
    position: "",
    birthDate: "",
    email: "",
    contactNumber: "",
  });
  useEffect(() => {
    fetchPersonnels();
  }, []);

  const fetchPersonnels = async () => {
    try {
      const response = await makeRequest.get("/getPersonnels");
      console.log(response.data); //  line to check the fetched data
      const sortedPersonnels = response.data.sort();
      setPersonnels(sortedPersonnels);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching personnels.");
    }
  };

  const getMaxPersonnelID = () => {
    if (personnels.length === 0) {
      return 1;
    }
    const maxPersonnelID = Math.max(
      ...personnels.map((personnel) => parseInt(personnel.Personnel_ID))
    );
    return maxPersonnelID + 1;
  };

  const handleChangePersonnels = (e) => {
    const { name, value } = e.target;
    setFormDataPersonnels({
      ...formDataPersonnels,
      [name]: value,
    });
  };

  // pang add data sa database if eclick ang submit
  const handleSubmitPersonnels = async (e) => {
    e.preventDefault();

    // Ask for confirmation before submitting
    const isConfirmed = window.confirm(
      "Are you sure you want to add this personnel?"
    );

    if (formDataPersonnels.firstName.trim() === '') {
      alert('First Name is required');
      return;
    }

    if (formDataPersonnels.lastName.trim() === '') {
      alert('Last Name is required');
      return;
    }

    if (formDataPersonnels.unit.trim() === '') {
      alert('Unit is required');
      return;
    }

    if (formDataPersonnels.position.trim() === '') {
      alert('Position is required');
      return;
    }

    if (!isConfirmed) {
      return; // Do nothing if not confirmed
    }
    if (
      formDataPersonnels.contactNumber &&
      formDataPersonnels.contactNumber.length !== 11
    ) {
      alert("Contact number must be 11 digits");
      return; // Do not proceed with submission
    }
    // const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    // if (!emailRegex.test(formData.email)) {
    //   alert("Email must be in a valid format, and end with .com");
    //   return; // Do not proceed with submission
    // }
    // Validate email
    if (
      formDataPersonnels.email &&
      !formDataPersonnels.email.includes(".com") &&
      !formDataPersonnels.email.includes(".ph")
    ) {
      alert("Email must contain .com");
      return; // Do not proceed with submission
    }

    try {
      const personnelID = getMaxPersonnelID();
      const response = await makeRequest.post("/addPersonnel", {
        ...formDataPersonnels,
        personnelID,
      });

      if (response.data.Status === "Success") {
        alert("Personnel added successfully!");
        setFormDataPersonnels({
          unit: "",
          firstName: "",
          lastName: "",
          position: "",
          birthDate: "",
          email: "",
          contactNumber: "",
        });
        fetchPersonnels();
        fetchPersonnelData();
        setShowFormPersonnels(false);
      } else {
        alert("Error adding personnel. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the personnel.");
    }
  };

  const handleAddPersonnelClick = () => {
    setShowFormPersonnels(true);
  };

  const handleHideFormClickPersonnels = () => {
    setShowFormPersonnels(false);
    setIsOpen(false);
  };

  const handleClearFormClickPersonnels = () => {
    setFormDataPersonnels({
      unit: "",
      firstName: "",
      lastName: "",
      position: "",
      birthDate: "",
      email: "",
      contactNumber: "",
    });
  };

  // to fetch units for the add form
  const [unitOptionsPersonnels, setUnitOptionsPersonnels] = useState([]);

  useEffect(() => {
    fetchUnitData();
  }, []);
  const fetchUnitData = async () => {
    try {
      const response = await makeRequest.get("/getUnits");
      setUnitOptionsPersonnels(response.data);
      console.log("the units " + JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching units data:", error);
    }
  };

  // to fetch personnel for the add form
  const [personnelOptions, setPersonnelOptions] = useState([]);

  useEffect(() => {
    fetchPersonnelData();
  }, []);
  const fetchPersonnelData = async () => {
    try {
      const response = await makeRequest.get("/getPersonnels");
      setPersonnelOptions(response.data);
      console.log("the personnels " + JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching personnel data:", error);
    }
  };

  //======================ADD PERSONNEL functions above=========================//

  return (
    <div>
      {showForm ? (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
          <div className="bg-white rounded-lg p-8 z-50">
            <div className="flex flex-row">
              <h2 className="text-xl font-semibold mb-2">
                {" "}
                Add New Communication
              </h2>
              <label className="mb-1 text-sm font-semibold right-1 ml-auto">
                DOC ID: <strong> {maxDocIDShown + 1}</strong>
              </label>
            </div>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-2 gap-4 overflow-auto"
            >
              <div className="flex flex-row gap-2 overflow-auto">
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-semibold">
                    Add File <strong>(PDF ONLY)</strong>
                  </label>
                  <input
                    accept=".pdf"
                    required
                    id="file"
                    name="file"
                    type="file"
                    onChange={handleFileChange}
                    className="border"
                  ></input>
                </div>

                <div className="hidden flex-col">
                  <label className="mb-1 text-sm font-semibold">
                    Date Uploaded <strong>(Month/Day/Year)</strong>
                  </label>
                  <DatePicker
                    // disabled
                    selected={formData.dateReceived}
                    onChange={(date) =>
                      handleChange({
                        target: { name: "dateReceived", value: date },
                      })
                    }
                    className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    displayFormat
                  />
                </div>

                <div className="flex flex-col ">
                  <label className="mb-1 text-sm font-semibold">
                    Date Released <strong>(Month/Day/Year)</strong>
                  </label>
                  <DatePicker
                    selected={formData.dateReleased}
                    onChange={(date) =>
                      handleChange({
                        target: { name: "dateReleased", value: date },
                      })
                    }
                    className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    displayFormat
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold flex gap-2">
                  Document Type/Filing Category{" "}
                  {isOpen ? (
                    <CommunicationsAdminDocumentTypesAddForm
                      formDataDocumentTypes={formDataDocumentTypes}
                      showFormDocumentTypes={showFormDocumentTypes}
                      handleSubmitDocumentTypes={handleSubmitDocumentTypes}
                      handleChangeDocumentTypes={handleChangeDocumentTypes}
                      documentTypeOptions={documentTypeOptions}
                      handleHideFormClickDocumentTypes={
                        handleHideFormClickDocumentTypes
                      }
                      handleClearFormClickDocumentTypes={
                        handleClearFormClickDocumentTypes
                      }
                      handleAddDocumentTypeClick={handleAddDocumentTypeClick}
                    />
                  ) : (
                    <button
                      onClick={() => {
                        setIsOpen(true);
                      }}
                      className="underline italic text-gray-500 hover:text-gray-800 hover:cursor-pointer "
                    >
                      New Category?
                    </button>
                  )}
                </label>
                <select
                  required
                  id="documentType"
                  name="documentType"
                  value={formData.documentType}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                >
                  <option value="">Select Document Type</option>
                  {documentTypeOptions.map((documentType) => (
                    <option
                      key={documentType.Doc_type_ID}
                      value={documentType.Doc_type_ID}
                    >
                      {documentType.type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold flex gap-2">
                  Client Name{" "}
                  {isOpen ? (
                    <ChedClientsAdminChedClientsAddForm
                      formDataCHEDClients={formDataCHEDClients}
                      handleSubmitCHEDClients={handleSubmitCHEDClients}
                      showFormCHEDClients={showFormCHEDClients}
                      clientTypeOptionCHEDClients={clientTypeOptionCHEDClients}
                      handleAddClientClick={handleAddClientClick}
                      handleHideFormClickCHEDClients={
                        handleHideFormClickCHEDClients
                      }
                      handleClearFormClickCHEDClients={
                        handleClearFormClickCHEDClients
                      }
                      handleChangeCHEDClients={handleChangeCHEDClients}
                    />
                  ) : (
                    <button
                      onClick={() => {
                        setIsOpen(true);
                      }}
                      className="underline italic text-gray-500 hover:text-gray-800 hover:cursor-pointer "
                    >
                      New Client?
                    </button>
                  )}
                </label>

                <select
                  required
                  id="client"
                  name="client"
                  value={formData.client}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                >
                  <option value="CHED10">CHED10</option>
                  {clientsOptions
                  .filter(client => client.client_type_id === 1 || client.client_type_id === 2)
                  .map((client) => (
                    <option key={client.client_id} value={client.client_id}>
                      {client.client_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-row gap-6">
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-semibold flex gap-2">
                    Prepared by{" "}
                    {isOpen ? (
                      <CommunicationsAdminPersonnelAddForm
                        formDataPersonnels={formDataPersonnels}
                        showFormPersonnels={showFormPersonnels}
                        handleSubmitPersonnels={handleSubmitPersonnels}
                        handleChangePersonnels={handleChangePersonnels}
                        handleHideFormClickPersonnels={
                          handleHideFormClickPersonnels
                        }
                        handleClearFormClickPersonnels={
                          handleClearFormClickPersonnels
                        }
                        handleAddPersonnelClick={handleAddPersonnelClick}
                        unitOptionsPersonnels={unitOptionsPersonnels}
                      />
                    ) : (
                      <button
                        onClick={() => {
                          setIsOpen(true);
                        }}
                        className="underline italic text-gray-500 hover:text-gray-800 hover:cursor-pointer"
                      >
                        New Assignatory?
                      </button>
                    )}
                  </label>
                  <select
                    required
                    id="assignatories"
                    name="assignatories"
                    value={formData.assignatories}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  >
                    <option value="">Select option</option>
                    {personnelOptions.map((person) => (
                      <option
                        key={person.Personnel_ID}
                        value={person.Personnel_ID}
                      >
                        {`${person.last_name}, ${person.first_name}`}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-semibold">
                    Unit <strong>(automatic)</strong>
                  </label>
                  <select
                    disabled
                    name="unit"
                    value={formData.unit || selectedPersonnelUnit}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  >
                    <option value="">Unit Options</option>
                    {unitOptionsPersonnels.map((unit) => (
                      <option key={unit.unit_ID} value={unit.unit_ID}>
                        {unit.type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">
                  Remarks <strong>(optional)</strong>
                </label>
                <input
                  type="text"
                  id="remarks"
                  name="remarks"
                  placeholder="Enter Remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">
                  Perpetual Index <strong>(optional)</strong>
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  placeholder="Enter Perpetual Index / Tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              {/* para ma add ang status sa add form */}
              <div className="">
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-semibold">Status</label>
                  <select
                    required
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  >
                    <option value="0">Pending</option>
                    <option value="1">Approved</option>

                    <option value="2">Disapproved</option>
                    <option value="3">No Action</option>
                  </select>
                </div>
              </div>

              <div className="col-span-2 flex ml-auto">
                <div className="flex">
                  <button className="flex gap-2 w-auto px-4 py-2 text-white font-bold bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300 ">
                    <IoMdAdd size="25px" /> SAVE
                  </button>
                  <button
                    type="button"
                    onClick={handleHideFormClick}
                    className="flex gap-2 w-auto  px-4 py-2 text-white font-bold bg-red-500 rounded-lg hover:bg-red-600 transition duration-300 mx-2 "
                  >
                    <IoMdClose size="25px" /> CLOSE
                  </button>
                  <button
                    type="button"
                    onClick={handleClearFormClick}
                    className="flex gap-2 w-auto  px-4 py-2 text-white font-bold bg-gray-500 rounded-lg hover:bg-gray-600 transition duration-300"
                  >
                    <CiEraser size="25px" /> CLEAR
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <button
          onClick={handleAddCommunicationClick}
          className="w-auto px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300 mb-2 flex gap-2"
        >
          {" "}
          <IoMdAdd size="25px" /> Add New Communication
        </button>
      )}
    </div>
  );
}

CommunicationsAdminAddForm.propTypes = {
  showForm: PropTypes.bool.isRequired,
  formData: PropTypes.shape({
    file: PropTypes.object,
    documentType: PropTypes.string.isRequired,
    dateReceived: PropTypes.instanceOf(Date).isRequired,
    dateReleased: PropTypes.string,
    status: PropTypes.string.isRequired,
    assignatories: PropTypes.string.isRequired,
    unit: PropTypes.string.isRequired,
    remarks: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    client: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleHideFormClick: PropTypes.func.isRequired,
  handleClearFormClick: PropTypes.func.isRequired,
  handleFileChange: PropTypes.func.isRequired,
  handleAddCommunicationClick: PropTypes.func.isRequired,
  // personnelOptions: PropTypes.array.isRequired,
  // clientsOptions: PropTypes.array.isRequired,
  // documentTypeOptions: PropTypes.array.isRequired,
  unitOptions: PropTypes.array.isRequired,
  maxDocIDShown: PropTypes.number.isRequired,
  selectedPersonnelUnit: PropTypes.number,
};
