import PropTypes from "prop-types";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { CiEraser } from "react-icons/ci";

export default function PersonnelAddForm({
  formData,
  showForm,
  handleSubmit,
  handleChange,
  handleHideFormClick,
  handleClearFormClick,
  handleAddPersonnelClick,
  unitOptions,
}) {
  return (
    <div>
      {showForm ? (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
          <div className="bg-white rounded-lg p-8 z-50">
            <h2 className="text-xl font-semibold mb-2">Add New PERSONNEL</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">First Name</label>
                <input
                  required
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter First Name"
                  value={formData.firstName}
                  onChange={handleChange}
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
                  value={formData.lastName}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 capitalize"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">Unit</label>
                <select
                  required
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                >
                  <option value="">Select Unit</option>
                  {unitOptions.map((unit) => (
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
                  value={formData.position}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 capitalize"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">Birth Date</label>
                <input
                  required
                  type="text"
                  id="birthDate"
                  name="birthDate"
                  placeholder="Enter Birth Date"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">Email</label>
                <input
                  required
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">
                  Contact Number
                </label>
                <input
                  title="Contact number should be up to 11 digits, only numbers"
                  required
                  type="tel"
                  pattern="[0-9]*"
                  id="contactNumber"
                  name="contactNumber"
                  placeholder="Enter Contact Number"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              <div className="col-span-2 ml-auto gap-">
                <div className="flex">
                  <button
                    type="submit"
                    className="flex gap-2 w-auto px-4 py-2 text-white font-bold bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
                  >
                    <IoMdAdd size="25px" /> ADD
                  </button>
                  <button
                    type="button"
                    onClick={handleHideFormClick}
                    className="flex gap-2 w-auto px-4 py-2 text-white font-bold bg-red-500 rounded-lg hover:bg-red-600 transition duration-300 mx-2 "
                  >
                    <IoMdClose size="25px" /> CLOSE
                  </button>
                  <button
                    type="button"
                    onClick={handleClearFormClick}
                    className="flex gap-2 w-auto px-4 py-2 text-white font-bold bg-gray-500 rounded-lg hover:bg-gray-600 transition duration-300"
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
          onClick={handleAddPersonnelClick}
          className="w-auto px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300 mb-2 flex gap-2"
        >
          <IoMdAdd size="25px" /> Add New Personnel
        </button>
      )}
    </div>
  );
}
PersonnelAddForm.propTypes = {
  formData: PropTypes.shape({
    unit: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    birthDate: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    contactNumber: PropTypes.string.isRequired,
  }),
  showForm: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleHideFormClick: PropTypes.func.isRequired,
  handleClearFormClick: PropTypes.func.isRequired,
  handleAddPersonnelClick: PropTypes.func.isRequired,
  unitOptions: PropTypes.array.isRequired,
};
