import PropTypes from "prop-types";

export default function AddAccountAdminEditForm({
  editFormData,
  handleHideFormClick,
  handleEditSubmit,
  handleChange,
  newPassword,
  setNewPassword,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
      <div className="bg-white rounded-lg p-8 z-50">
        <span className="close text-white" onClick={handleHideFormClick}>
          &times;
        </span>
        <h2 className="text-2xl font-semibold mb-4">Edit Account</h2>
        <form onSubmit={handleEditSubmit} className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold">First Name</label>
            <input
              required
              type="text"
              name="first_name"
              placeholder="Enter First Name"
              value={editFormData.first_name}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 capitalize"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold">Last Name</label>
            <input
              required
              type="text"
              name="last_name"
              placeholder="Enter Last Name"
              value={editFormData.last_name}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 capitalize"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold">Email</label>
            <input
              required
              type="email"
              name="email"
              placeholder="Enter Email"
              value={editFormData.email}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold">Contact Number</label>
            <input
              required
              title="11 digits number only"
              type="tel"
              pattern="[0-9]*" // Allow only numeric input
              name="contact_number"
              placeholder="Enter Contact Number"
              value={editFormData.contact_number}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold">Username</label>
            <input
            required
              type="text"
              name="username"
              placeholder="Enter Username"
              value={editFormData.username}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold">New Password</label>
            <input
              type="password"
              id="NewPassword"
              name="NewPassword"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold">User Type</label>
            <select
              required
              name="user_type_ID"
              value={editFormData.user_type_ID}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">Select User Type</option>
              <option value="0">Admin - Records Officer</option>
              <option value="1">Staff - Receiving Clerk</option>
              <option value="2">Staff - Releasing Clerk</option>
              <option value="3">Staff - Education Supervisor</option>
              <option value="4">Staff - Education Specialist</option>
              <option value="5">Staff - Division Chief</option>
              <option value="6">Staff - Records Clerk</option>
            </select>
          </div>

          <div className="col-span-2 ml-auto gap-">
            <button
              type="submit"
              className="w-40 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleHideFormClick}
              className="w-40 px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600 transition duration-300 mx-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

AddAccountAdminEditForm.propTypes = {
  editFormData: PropTypes.shape({
    user_type_ID: PropTypes.number, //sa put
    email: PropTypes.string,
    password: PropTypes.string,
    last_name: PropTypes.string,
    first_name: PropTypes.string,
    contact_number: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
  handleHideFormClick: PropTypes.func.isRequired,
  handleEditSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  newPassword: PropTypes.string,
  setNewPassword: PropTypes.func.isRequired,
};
