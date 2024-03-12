import PropTypes from "prop-types";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { CiEraser } from "react-icons/ci";

export default function CommunicationsAdminDocumentTypesAddForm({
  formDataDocumentTypes,
  showFormDocumentTypes,
  handleSubmitDocumentTypes,
  handleChangeDocumentTypes,
  handleHideFormClickDocumentTypes,
  handleClearFormClickDocumentTypes,
  handleAddDocumentTypeClick,
}) {
   
    
  return (
    <div>
      {showFormDocumentTypes ? (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
          <div className="bg-white rounded-lg p-8 z-50">
            <h2 className="text-xl font-semibold mb-2">
              Add New DOCUMENT TYPE
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">
                  Document Type
                </label>
                <input
                  required
                  type="text"
                  id="documentType"
                  name="documentType"
                  placeholder="Enter Document Type"
                  value={formDataDocumentTypes.documentType}
                  onChange={handleChangeDocumentTypes}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">
                  Remarks (Optional)
                </label>
                <input
                  type="text"
                  id="remarks"
                  name="remarks"
                  placeholder="Enter Remarks"
                  value={formDataDocumentTypes.remarks}
                  onChange={handleChangeDocumentTypes}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              <div className="col-span-2 ml-auto ">
                <div className="flex">
                  <button
                  onClick={handleSubmitDocumentTypes} 
                    type="button"
                    className="flex gap-2 w-auto  px-4 py-2 text-white font-bold bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
                  >
                    <IoMdAdd size="25px" /> SAVE
                  </button>
                  <button
                    type="button"
                    onClick={handleHideFormClickDocumentTypes}
                    className="flex gap-2 w-auto  px-4 py-2 text-white font-bold bg-red-500 rounded-lg hover:bg-red-600 transition duration-300 mx-2 "
                  >
                    <IoMdClose size="25px" /> CLOSE
                  </button>
                  <button
                    type="button"
                    onClick={handleClearFormClickDocumentTypes}
                    className="flex gap-2 w-auto  px-4 py-2 text-white font-bold bg-gray-500 rounded-lg hover:bg-gray-600 transition duration-300"
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
         onClick={handleAddDocumentTypeClick}
         className="underline italic text-gray-500 hover:text-gray-800 hover:cursor-pointer "> New Category?
         </button>
      )}
    </div>
  );
}
CommunicationsAdminDocumentTypesAddForm.propTypes = {
  formDataDocumentTypes: PropTypes.shape({
    documentType: PropTypes.string.isRequired,
    remarks: PropTypes.string.isRequired,
  }),
  showFormDocumentTypes: PropTypes.bool.isRequired,
  handleSubmitDocumentTypes: PropTypes.func.isRequired,
  handleChangeDocumentTypes: PropTypes.func.isRequired,
  handleHideFormClickDocumentTypes: PropTypes.func.isRequired,
  handleClearFormClickDocumentTypes: PropTypes.func.isRequired,
  handleAddDocumentTypeClick: PropTypes.func.isRequired,
};
