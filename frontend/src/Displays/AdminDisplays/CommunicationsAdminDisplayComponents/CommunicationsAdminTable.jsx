import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { makeRequest } from "../../../../axios";
import { MdEdit } from "react-icons/md";
import { RiFileEditFill, RiMailSendFill  } from "react-icons/ri";
import { PiListMagnifyingGlass } from "react-icons/pi";

// import { MdDelete } from "react-icons/md";

export default function CommunicationsAdminTable({
  currentItems,
  // handleDeleteClick,
  handleInfoClick,
  handleEditFileClick,
  handleEditClick,
  clientsOptions,
  documentTypeOptions,
  unitOptions,
  searchQuery,
  handleOpenSendFileModal,
}) {
  //sa color function for STATUS//
  const getStatusColorClass = (status) => {
    switch (status) {
      case "Pending":
        return "text-blue-500";
      case "Approved":
        return "text-green-500";
      case "Disapproved":
        return "text-red-500";
      case "No Action":
        return "text-black";
      default:
        return "";
    }
  };
  //sa filtering function for STATUS//
  const [showStatusFilterDropdown, setShowStatusFilterDropdown] =
    useState(false);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("");

  const handleToggleStatusFilterDropdown = () => {
    setShowStatusFilterDropdown(!showStatusFilterDropdown);
  };

  const handleSelectStatusFilter = (value) => {
    setSelectedStatusFilter(value);
    setShowStatusFilterDropdown(false);
  };
  //sa filtering function for STATUS//

  //sa filtering function for UNIT//

  const [showUnitFilterDropdown, setShowUnitFilterDropdown] = useState(false);
  const [selectedUnitFilter, setSelectedUnitFilter] = useState("");

  const handleToggleUnitFilterDropdown = () => {
    setShowUnitFilterDropdown(!showUnitFilterDropdown);
  };

  const handleSelectUnitFilter = (value) => {
    setSelectedUnitFilter(value);
    setShowUnitFilterDropdown(false);
  };
  //sa filtering function for UNIT//

  //sa filtering function for DOCUMENT TYPE//

  const [showTypeFilterDropdown, setShowTypeFilterDropdown] = useState(false);
  const [selectedTypeFilter, setSelectedTypeFilter] = useState("");

  const handleToggleTypeFilterDropdown = () => {
    setShowTypeFilterDropdown(!showTypeFilterDropdown);
  };

  const handleSelectTypeFilter = (value) => {
    setSelectedTypeFilter(value);
    setShowTypeFilterDropdown(false);
  };
  //sa filtering function for DOCUMENT TYPE//

  //sa filtering function for CLIENT/INSTITUTION TYPE//

  const [showClientNameFilterDropdown, setShowClientNameFilterDropdown] =
    useState(false);
  const [selectedClientNameFilter, setSelectedClientNameFilter] = useState("");

  const handleToggleClientNameFilterDropdown = () => {
    setShowClientNameFilterDropdown(!showClientNameFilterDropdown);
  };

  const handleSelectClientNameFilter = (value) => {
    setSelectedClientNameFilter(value);
    setShowClientNameFilterDropdown(false);
  };

  //sa filtering function for CLIENT/INSTITUTION TYPE//

  return (
    <div className="relative p-22">
      <table className="min-w-full leading-normal">
        <thead className="bg-gray-200 sticky top-0">
          <tr className="bg-gray-400 ">
            {/* <th className="px-4 py-2">Doc ID</th> */}
            <th className="">
              <div className="relative inline-block">
                <button
                  onClick={handleToggleClientNameFilterDropdown}
                  type="button"
                  className="inline-flex justify-center w-32 px-2 py-1 text-black bg-gray-400 rounded-lg hover:bg-gray-500 transition duration-300 "
                >
                  {selectedClientNameFilter
                    ? selectedClientNameFilter
                    : "Recipient Name"}
                </button>
                {showClientNameFilterDropdown && (
                  <div className="origin-top-right absolute left-0 w-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none h-96 overflow-auto">
                    <div className="py-1">
                      <button
                        onClick={() => handleSelectClientNameFilter("")} // Clears the filter
                        className={`${
                          selectedClientNameFilter === ""
                            ? "bg-gray-200 text-gray-900"
                            : "text-gray-700"
                        } block px-1 py-2 text-sm w-full text-left hover:bg-gray-500`}
                      >
                        All
                      </button>
                      {clientsOptions.map((client) => (
                        <button
                          key={client.client_id}
                          onClick={() =>
                            handleSelectClientNameFilter(client.client_name)
                          }
                          className={`${
                            selectedClientNameFilter === client.client_name
                              ? "bg-gray-200 text-gray-900"
                              : "text-gray-700"
                          } block px-1 py-2 text-sm w-full text-left hover:bg-gray-500`}
                        >
                          {client.client_name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </th>
            <th className="px-1 py-2">Prepared by</th>
            <th className="px-1 py-2">
              <div className="relative inline-block">
                <button
                  onClick={handleToggleUnitFilterDropdown}
                  type="button"
                  className="inline-flex justify-center w-auto px-2 py-1 text-black bg-gray-400 rounded-lg hover:bg-gray-500 transition duration-300"
                >
                  {selectedUnitFilter
                    ? unitOptions.find(
                        (unit) => unit.type === selectedUnitFilter
                      )?.type || "Unit"
                    : "Unit"}
                </button>
                {showUnitFilterDropdown ? (
                  <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <button
                        onClick={() => handleSelectUnitFilter("")}
                        className={`${
                          selectedUnitFilter === ""
                            ? "bg-gray-200 text-gray-900"
                            : "text-gray-700"
                        } block px-1 py-2 text-sm w-full text-left hover:bg-gray-500`}
                      >
                        All
                      </button>
                      {unitOptions.map((unit) => (
                        <button
                          key={unit.unit_ID}
                          onClick={() => handleSelectUnitFilter(unit.type)}
                          className={`${
                            selectedUnitFilter === unit.type
                              ? "bg-gray-200 text-gray-900"
                              : "text-gray-700"
                          } block px-1 py-2 text-sm w-full text-left hover:bg-gray-500`}
                        >
                          {unit.type}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </th>
            <th className="px-1 py-2">
              <div className="relative inline-block">
                <button
                  onClick={handleToggleTypeFilterDropdown}
                  type="button"
                  className="inline-flex justify-center w-44 px-2 py-1 text-black bg-gray-400 rounded-lg hover:bg-gray-500 transition duration-300"
                >
                  {selectedTypeFilter ? selectedTypeFilter : "Filing Category"}
                </button>
                {showTypeFilterDropdown && (
                  <div className="origin-top-right absolute left-0 flex w-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none h-96 overflow-auto ">
                    <div className="py-1">
                      <button
                        onClick={() => handleSelectTypeFilter("")} // Clears the filter
                        className={`${
                          selectedTypeFilter === ""
                            ? "bg-gray-200 text-gray-900 "
                            : "text-gray-700"
                        } block px-1 py-2 text-sm w-full text-left hover:bg-gray-500 `}
                      >
                        All
                      </button>
                      {documentTypeOptions.map((type) => (
                        <button
                          key={type.doc_type_ID}
                          onClick={() => handleSelectTypeFilter(type.type)}
                          className={`${
                            selectedTypeFilter === type.doc_type_ID
                              ? "bg-gray-200 text-gray-900"
                              : "text-gray-700"
                          } block px-1 py-2 text-sm w-full text-left hover:bg-gray-500`}
                        >
                          {type.type}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </th>

            <th className="px-1 py-2">Date Released</th>
            {/* <th className="px-4 py-2">Date Release</th> */}
            <th className="px-1 py-2">
              <div className="relative inline-block">
                <div>
                  <button
                    onClick={handleToggleStatusFilterDropdown}
                    type="button"
                    className="inline-flex justify-center w-26 px-2 py-1 text-black bg-gray-400 rounded-lg hover:bg-gray-500 transition duration-300"
                  >
                    {selectedStatusFilter === "0"
                      ? "Pending"
                      : selectedStatusFilter === "1"
                      ? "Approved"
                      : selectedStatusFilter === "2"
                      ? "Disapproved"
                      : selectedStatusFilter === "3"
                      ? "No Action"
                      : "Status"}
                  </button>
                </div>
                {showStatusFilterDropdown ? (
                  <div className="origin-top-right absolute left-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <button
                        onClick={() => handleSelectStatusFilter("")}
                        className={`${
                          selectedStatusFilter === ""
                            ? "bg-gray-200 text-gray-900"
                            : "text-gray-700"
                        } block px-1 py-2 text-sm w-full text-center hover:bg-gray-500`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => handleSelectStatusFilter("0")}
                        className={`${
                          selectedStatusFilter === "0"
                            ? "bg-gray-200 text-gray-900"
                            : "text-gray-700"
                        } block px-1 py-2 text-sm w-full text-center hover:bg-gray-500`}
                      >
                        Pending
                      </button>
                      <button
                        onClick={() => handleSelectStatusFilter("1")}
                        className={`${
                          selectedStatusFilter === "1"
                            ? "bg-gray-200 text-gray-900"
                            : "text-gray-700"
                        } block px-1 py-2 text-sm w-full text-center hover:bg-gray-500`}
                      >
                        Approved
                      </button>
                      <button
                        onClick={() => handleSelectStatusFilter("2")}
                        className={`${
                          selectedStatusFilter === "2"
                            ? "bg-gray-200 text-gray-900"
                            : "text-gray-700"
                        } block px-1 py-2 text-sm w-full text-center hover:bg-red-500`}
                      >
                        Disapproved
                      </button>
                      <button
                        onClick={() => handleSelectStatusFilter("3")}
                        className={`${
                          selectedStatusFilter === "3"
                            ? "bg-gray-200 text-gray-900"
                            : "text-gray-700"
                        } block px-1 py-2 text-sm w-full text-center hover:bg-gray-500`}
                      >
                        No Action
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </th>
            {/* <th className="px-1 py-2">Remarks</th> */}
            <th className="px-1 py-2">File</th>
            <th className="px-1 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems
            .filter(
              (document) =>
                ((selectedStatusFilter === "0" &&
                  document.status === "Pending") ||
                  (selectedStatusFilter === "1" &&
                    document.status === "Approved") ||
                  (selectedStatusFilter === "2" &&
                    document.status === "Disapproved") ||
                  (selectedStatusFilter === "3" &&
                    document.status === "No Action") ||
                  selectedStatusFilter === "") &&
                (selectedUnitFilter === "" ||
                  document.unit === selectedUnitFilter) &&
                (selectedTypeFilter === "" ||
                  document.document_type === selectedTypeFilter) &&
                (selectedClientNameFilter === "" ||
                  document.client_name === selectedClientNameFilter) &&
                (document.client_name
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                  document.contact_firstName
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  document.contact_lastName
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  document.date_received
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  document.date_released
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  document.status
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  document.remarks
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  document.unit
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  document.document_type
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  document.file
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  document.tags
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()))
            )
            .map((document) => (
              <tr key={document.doc_ID} className="hover:bg-gray-100">
                {/* <td className="border px-4 py-2 text-center">{document.doc_ID}</td> */}
                <td className="border px-3 py-2 text-left">
                  {document.client_name}
                </td>
                <td className="border px-3 py-2 text-left">
                  {document.contact_firstName} {document.contact_lastName}
                </td>
                <td className="border px-3 py-2 text-left">{document.unit}</td>
                <td className="border px-3 py-2 text-left">
                  {document.document_type}
                </td>
                <td className="border px-3 py-2 text-left">
                  {document.date_released}
                </td>
                {/* <td className="border px-4 py-2 text-left">{document.date_released}</td> */}
                <td
                  className={`border px-3 py-2 text-left font-semibold ${getStatusColorClass(
                    document.status
                  )}`}
                >
                  {document.status}
                </td>
                {/* <td className="border px-3 py-2 text-left"> */}
                {/* {document.remarks} */}
                {/* </td> */}

                <td className="border px-4 py-2 text-left">
                  <FileLink item={document} />
                </td>
                <td className="border px-3 py-2 text-left flex">
                  <button
                    title="Modify File"
                    className="text-green-500 hover:text-green-800 font-bold"
                    onClick={() => handleEditFileClick(document.doc_ID)}
                  >
                    <RiFileEditFill size="35px" />
                    <div className="absolute bg-gray-800 text-white p-2 rounded shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300"></div>
                  </button>
                  <button
                    title="Modify Details"
                    className="text-blue-500 hover:text-blue-800 font-bold flex"
                    onClick={() => handleEditClick(document.doc_ID)}
                  >
                    <MdEdit size="35px" />
                    <div className="absolute bg-gray-800 text-white p-2 rounded shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300"></div>
                  </button> 
                    <button
                      title="Send communication to the client"
                      className="text-sky-500 hover:text-sky-800 font-bold"
                      onClick={() => handleOpenSendFileModal(document.doc_ID)}
                    >
                      <RiMailSendFill  size="29px" />
                      <div className="absolute bg-gray-800 text-white p-2 rounded shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300"></div>
                    </button>
                  <button
                    title="More Details"
                    className="text-gray-500 hover:text-gray-800 font-bold"
                    onClick={() => handleInfoClick(document.doc_ID)}
                  >
                    <PiListMagnifyingGlass size="35px" />
                    <div className="absolute bg-gray-800 text-white p-2 rounded shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300"></div>
                  </button>
                  {/* <button
                    className="text-red-500 hover:underline font-bold"
                    onClick={() => handleDeleteClick(document.doc_ID)}
                  >
                  DELETE
                
                    <div className="absolute bg-gray-800 text-white p-2 rounded shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300"></div>
                  </button> */}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

CommunicationsAdminTable.propTypes = {
  currentItems: PropTypes.array.isRequired,
  searchQuery: PropTypes.string.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  handleInfoClick: PropTypes.func.isRequired,
  handleEditFileClick: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  clientsOptions: PropTypes.array.isRequired,
  documentTypeOptions: PropTypes.array.isRequired,
  unitOptions: PropTypes.array.isRequired,
  handleOpenSendFileModal: PropTypes.func.isRequired,
};

const FileLink = ({ item }) => {
  const [fileUrl, setFileUrl] = useState(
    `communicationhistoryfiles/${item.file}`
  );

  useEffect(() => {
    const checkFile = async () => {
      try {
        const response = await makeRequest.get(fileUrl);

        if (!response.ok) {
          setFileUrl(`communicationfiles/${item.file}`);
        }
      } catch (error) {
        console.error("Error fetching file:", error);
        setFileUrl(`communicationfiles/${item.file}`);
      }
    };

    checkFile();
  }, [item.file, fileUrl]);

  // Truncate the file name to 25 characters
  const truncatedFileName =
    item.file.length > 40 ? item.file.substring(0, 40) + "..." : item.file;

  return (
    <a
      href={makeRequest.defaults.baseURL + fileUrl} // Use baseURL from axios.js
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 hover:underline"
    >
      {truncatedFileName}
    </a>
  );
};

FileLink.propTypes = {
  item: PropTypes.object,
};
