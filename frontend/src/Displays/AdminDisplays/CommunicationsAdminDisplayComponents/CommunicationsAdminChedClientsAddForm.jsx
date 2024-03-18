import PropTypes from "prop-types";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { CiEraser } from "react-icons/ci";

export default function ChedClientsAdminChedClientsAddForm({
  handleSubmitCHEDClients,
  showFormCHEDClients,
  formDataCHEDClients,
  clientTypeOptionCHEDClients,
  handleAddClientClick,
  handleHideFormClickCHEDClients,
  handleClearFormClickCHEDClients,
  handleChangeCHEDClients,
  // handleFileChange
}) {
  return (
    <div>
      {showFormCHEDClients ? (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
          <div className="bg-white rounded-lg p-8 z-50">
            <h2 className="text-xl font-semibold mb-2">Add New Client</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">
                  Client ID{" "}
                  <a className="font-black">(Not Editable when added)</a>
                </label>
                <input
                  required
                  type="text"
                  id="clientID"
                  name="clientID"
                  placeholder="Enter Client ID"
                  value={formDataCHEDClients.clientID}
                  onChange={handleChangeCHEDClients}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">
                  Name of Client
                </label>
                <input
                  required
                  type="text"
                  id="clientName"
                  name="clientName"
                  placeholder="Enter Name of Client"
                  value={formDataCHEDClients.clientName}
                  onChange={handleChangeCHEDClients}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">Address</label>
                <input
                  required
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Enter Address"
                  value={formDataCHEDClients.address}
                  onChange={handleChangeCHEDClients}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">
                  Client Type
                </label>
                <select
                  required
                  id="clientType"
                  name="clientType"
                  value={formDataCHEDClients.clientType}
                  onChange={handleChangeCHEDClients}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                >
                  <option value="">Select Client Type</option>
                  {clientTypeOptionCHEDClients.map((clientType) => (
                    <option
                      key={clientType.client_type_id}
                      value={clientType.client_type_id}
                    >
                      {clientType.type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">
                  Email Address 
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Email Address"
                  value={formDataCHEDClients.email}
                  onChange={handleChangeCHEDClients}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-semibold">
                    Contact Person
                  </label>
                  <input
                    required
                    type="text"
                    id="contactPerson"
                    name="contactPerson"
                    placeholder="Enter Name of Contact Person"
                    value={formDataCHEDClients.contactPerson}
                    onChange={handleChangeCHEDClients}
                    className="w-80 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <label className="mb-1 text-sm font-semibold">
                    Contact Number (Optional)
                  </label>
                  <input
                    title="11 digits number only"
                    type="tel"
                    pattern="[0-9]*" // Allow only numeric input
                    id="contactNumber"
                    name="contactNumber"
                    placeholder="Enter Contact Number"
                    value={formDataCHEDClients.contactNumber}
                    onChange={handleChangeCHEDClients}
                    className="w-80 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
              </div>
              <div className="col-span-2 ml-auto gap-">
                <div className="flex">
                  <button
                   onClick={handleSubmitCHEDClients}
                    type="button"
                    className="flex gap-2 w-auto px-4 py-2 text-white font-bold bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
                  >
                    <IoMdAdd size="25px" /> SAVE
                  </button>
                  <button
                    type="button"
                    onClick={handleHideFormClickCHEDClients}
                    className="flex gap-2 w-auto px-4 py-2 text-white font-bold bg-red-500 rounded-lg hover:bg-red-600 transition duration-300 mx-2 "
                  >
                    <IoMdClose size="25px" /> CLOSE
                  </button>
                  <button
                    type="button"
                    onClick={handleClearFormClickCHEDClients}
                    className="flex gap-2 w-auto px-4 py-2 text-white font-bold bg-gray-500 rounded-lg hover:bg-gray-600 transition duration-300"
                  >
                    <CiEraser size="25px" /> CLEAR
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={handleAddClientClick}
          className="underline italic text-gray-500 hover:text-gray-800 hover:cursor-pointer "
        >
            New Client? 
        </button>
      
      )}
    </div>
  );
}
ChedClientsAdminChedClientsAddForm.propTypes = {
  handleSubmitCHEDClients: PropTypes.func.isRequired,
  showFormCHEDClients: PropTypes.bool.isRequired,
  formDataCHEDClients: PropTypes.shape({
    clientID: PropTypes.string,
    clientName: PropTypes.string,
    address: PropTypes.string,
    clientType: PropTypes.string,
    email: PropTypes.string,
    // filingCat: PropTypes.string,
    contactPerson: PropTypes.string,
    contactNumber: PropTypes.any,
    // file: PropTypes.object,
  }).isRequired,
  handleAddClientClick: PropTypes.func.isRequired,
  handleHideFormClickCHEDClients: PropTypes.func.isRequired,
  handleClearFormClickCHEDClients: PropTypes.func.isRequired,
  handleChangeCHEDClients: PropTypes.func.isRequired,
  clientTypeOptionCHEDClients: PropTypes.array.isRequired,
  // handleFileChange: PropTypes.func.isRequired,
};
