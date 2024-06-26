import PropTypes from "prop-types";
import { useState } from "react";
import { PiListMagnifyingGlass } from "react-icons/pi";
import { MdEdit } from "react-icons/md";
// import { MdDelete } from "react-icons/md";

export default function ChedClientsAdminTable({
  currentItems,
  // handleDeleteClick,
  handleInfoClick,
  handleEditClick,
  searchQuery,
  clientTypeOptions,
}) {
  // for Client Type Filter dropdown
  const [showClientTypeFilterDropdown, setShowClientTypeFilterDropdown] =
    useState(false);
  const [selectedClientTypeFilter, setSelectedClientTypeFilter] = useState("");

  const handleToggleClientTypeFilterDropdown = () => {
    setShowClientTypeFilterDropdown(!showClientTypeFilterDropdown);
  };

  const handleSelectClientTypeFilter = (value) => {
    setSelectedClientTypeFilter(value);
    setShowClientTypeFilterDropdown(false);
  };

  return (
    <div className=" relative ">
      <table className="min-w-full leading-normal">
        <thead className="bg-gray-200 sticky top-0">
          <tr className="bg-gray-400">
            {/* <th className="px-4 py-2 ">Client ID</th> */}
            <th className="px-4 py-2">Name of Recipients</th>
            <th className="px-4 py-2">
              <div className="relative inline-block ml-2">
                <button
                  onClick={handleToggleClientTypeFilterDropdown}
                  type="button"
                  className="inline-flex justify-center w-32 px-2 py-1 text-black bg-gray-400 rounded-lg hover:bg-gray-500 transition duration-300"
                >
                  {selectedClientTypeFilter
                    ? clientTypeOptions.find(
                        (option) =>
                          option.Client_type_ID === selectedClientTypeFilter
                      )?.type || "Recipient Type"
                    : "Recipient Type"}
                </button>
                {showClientTypeFilterDropdown ? (
                  <div className="origin-top-right absolute right-0 mt-2 w-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <button
                        onClick={() => handleSelectClientTypeFilter("")}
                        className={`${
                          selectedClientTypeFilter === ""
                            ? "bg-gray-200 text-gray-900"
                            : "text-gray-700"
                        } block px-4 py-2 text-sm w-full text-center hover:bg-gray-500`}
                      >
                        All
                      </button>
                      {clientTypeOptions.map((option) => (
                        <button
                          key={option.Client_type_ID}
                          onClick={() =>
                            handleSelectClientTypeFilter(option.Client_type_ID)
                          }
                          className={`${
                            selectedClientTypeFilter === option.Client_type_ID
                              ? "bg-gray-200 text-gray-900"
                              : "text-gray-700"
                          } block px-4 py-2 text-sm w-full text-center hover:bg-gray-500`}
                        >
                          {option.type}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems
            .filter(
              (client) =>
                (!selectedClientTypeFilter ||
                  clientTypeOptions.find(
                    (option) =>
                      option.Client_type_ID === selectedClientTypeFilter
                  )?.type === client.client_type) &&
                (client.client_id
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                  client.client_name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  client.client_type
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()))
            )
            .map((client) => (
              <tr key={client.client_id} className="hover:bg-gray-100">
                {/* <td className="border px-3 py-2 text-left">{client.client_id}</td> */}
                <td className="border px-3 py-2 text-left">
                  {client.client_name}
                </td>
                <td className="border px-3 py-2 text-left">
                  {client.client_type}
                </td>
                <td className="border px-3 py-2 text-left flex">
                  <button
                    title="Modify Client Detail"
                    className="text-blue-500 hover:text-blue-800 ml-2 font-bold"
                    onClick={() => handleEditClick(client.client_id)}
                  >
                    <MdEdit size="35px" />
                    <div className="absolute bg-gray-800 text-white p-2 rounded shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300"></div>
                  </button>
                  {/* <button
                    title="Delete"
                    className="text-red-500 hover:underline ml-2 font-bold"
                    onClick={() => handleDeleteClick(client.client_id)}
                  >
                    <MdDelete size="35px" />
                    <div className="absolute bg-gray-800 text-white p-2 rounded shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300"></div>
                  </button> */}
                  <button
                    title="More Details"
                    className="text-gray-500 hover:text-gray-800 ml-2 font-bold"
                    onClick={() => handleInfoClick(client.client_id)}
                  >
                    <PiListMagnifyingGlass size="35px" />
                    <div className="absolute bg-gray-800 text-white p-2 rounded shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300"></div>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

ChedClientsAdminTable.propTypes = {
  currentItems: PropTypes.array.isRequired,
  searchQuery: PropTypes.string.isRequired,
  handleInfoClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  clientTypeOptions: PropTypes.array.isRequired,
};
