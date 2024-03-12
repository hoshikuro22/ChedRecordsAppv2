import PropTypes from "prop-types";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { CiEraser } from "react-icons/ci";

export default function CommunicationsAdminPersonnelAddForm({
  formDataPersonnels,
  showFormPersonnels,
  handleSubmitPersonnels,
  handleChangePersonnels,
  handleHideFormClickPersonnels,
  handleClearFormClickPersonnels,
  handleAddPersonnelClick,
  unitOptionsPersonnels,
}) {
  return (
    <div>
      {showFormPersonnels ? (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
          <div className="bg-white rounded-lg p-8 z-50">
            <h2 className="text-xl font-semibold mb-2">Add New PERSONNEL</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">First Name</label>
                <input
                  required
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter First Name"
                  value={formDataPersonnels.firstName}
                  onChange={handleChangePersonnels}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 capitalize"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">Last Name</label>
                <input
                  required
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter Last Name"
                  value={formDataPersonnels.lastName}
                  onChange={handleChangePersonnels}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 capitalize"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">Unit</label>
                <select
                  required
                  name="unit"
                  value={formDataPersonnels.unit}
                  onChange={handleChangePersonnels}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                >
                  <option value="">Select Unit</option>
                  {unitOptionsPersonnels.map((unit) => (
                    <option key={unit.unit_ID} value={unit.unit_ID}>
                      {unit.type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">Position</label>
                <input
                  required
                  type="text"
                  id="position"
                  name="position"
                  placeholder="Enter Position"
                  value={formDataPersonnels.position}
                  onChange={handleChangePersonnels}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 capitalize"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">Birth Date (optional)</label>
                <input
             
                  type="text"
                  id="birthDate"
                  name="birthDate"
                  placeholder="Enter Birth Date"
                  value={formDataPersonnels.birthDate}
                  onChange={handleChangePersonnels}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">Email (optional)</label>
                <input
                
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                  value={formDataPersonnels.email}
                  onChange={handleChangePersonnels}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">
                  Contact Number (optional)
                </label>
                <input
                  title="Contact number should be up to 11 digits, only numbers"
                  required
                  type="tel"
                  pattern="[0-9]*"
                  id="contactNumber"
                  name="contactNumber"
                  placeholder="Enter Contact Number"
                  value={formDataPersonnels.contactNumber}
                  onChange={handleChangePersonnels}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              <div className="col-span-2 ml-auto gap-">
                <div className="flex">
                  <button
                    onClick={handleSubmitPersonnels}
                    type="button"
                    className="flex gap-2 w-auto px-4 py-2 text-white font-bold bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
                  >
                    <IoMdAdd size="25px" /> SAVE
                  </button>
                  <button
                    type="button"
                    onClick={handleHideFormClickPersonnels}
                    className="flex gap-2 w-auto px-4 py-2 text-white font-bold bg-red-500 rounded-lg hover:bg-red-600 transition duration-300 mx-2 "
                  >
                    <IoMdClose size="25px" /> CLOSE
                  </button>
                  <button
                    type="button"
                    onClick={handleClearFormClickPersonnels}
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
          onClick={handleAddPersonnelClick}
          className="underline italic text-gray-500 hover:text-gray-800 hover:cursor-pointer"
        >
          New Assignatory?
        </button>
      )}
    </div>
  );
}
CommunicationsAdminPersonnelAddForm.propTypes = {
  formDataPersonnels: PropTypes.shape({
    unit: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    birthDate: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    contactNumber: PropTypes.string.isRequired,
  }),
  showFormPersonnels: PropTypes.bool.isRequired,
  handleSubmitPersonnels: PropTypes.func.isRequired,
  handleChangePersonnels: PropTypes.func.isRequired,
  handleHideFormClickPersonnels: PropTypes.func.isRequired,
  handleClearFormClickPersonnels: PropTypes.func.isRequired,
  handleAddPersonnelClick: PropTypes.func.isRequired,
  unitOptionsPersonnels: PropTypes.array.isRequired,
};
