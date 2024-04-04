import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { makeRequest } from "../../../../axios";

export default function CommunicationsAdminSendFile({
  show,
  handleCloseSendFileModal,
  handleSendFile,
  documentToSend,
  subject,
  setSubject,
  text,
  setText,
  handleClientEmailChange,
}) {
  if (!documentToSend) {
    // If documentToSend is null, return null or any placeholder component
    return null;
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        show ? "" : "hidden"
      }`}
    >
      <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
      <div className="bg-white rounded-lg p-8 z-50">
        <span className="close text-white" onClick={handleCloseSendFileModal}>
          &times;
        </span>
        <h2 className="text-2xl font-semibold mb-4">Send File to Email</h2>

        {/* Display table with document details */}
        <table className="table-auto mb-5">
          <thead>
            <tr>
              <th>Document ID</th>
              <th>Client ID</th>
              {/* <th>Email</th> */}
              <th>File</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2 text-center">
                {documentToSend.doc_ID}
              </td>
              <td className="border px-4 py-2 text-center">
                {documentToSend.client_id}
              </td>
              {/* <td className="border px-4 py-2 text-center">
                <input
                  type="text"
                  value={documentToSend.client_email}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    handleClientEmailChange(newValue, documentToSend.doc_ID);
                  }}
                  className="border-2 border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
                />
              </td> */}
              <td className="border px-4 py-2 text-center">
                <FileLink item={documentToSend} />
              </td>
            </tr>
          </tbody>
        </table>
  
       <label className="font-semibold">Email</label>
        <textarea
          type="text"
          placeholder="Email"
          value={documentToSend.client_email}
          onChange={(e) =>
            handleClientEmailChange(e.target.value, documentToSend.doc_ID)
          }
          className="w-full mb-4 border-2 border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
        />
         <label className="font-semibold">Subject</label>
        <textarea
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
         <label className="font-semibold">Text</label>
        <textarea
          placeholder="Email Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-32 mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <form onSubmit={handleSendFile} className="grid grid-cols-2 gap-4">
          <div className="col-span-2 ml-auto gap-">
            <button
              type="submit"
              className="w-40 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Send File
            </button>
            <button
              type="button"
              onClick={handleCloseSendFileModal}
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

CommunicationsAdminSendFile.propTypes = {
  show: PropTypes.bool.isRequired,
  handleCloseSendFileModal: PropTypes.func.isRequired,
  handleSendFile: PropTypes.func.isRequired,
  documentToSend: PropTypes.shape({
    doc_ID: PropTypes.number.isRequired,
    client_id: PropTypes.number.isRequired,
    client_email: PropTypes.string,
    file: PropTypes.string.isRequired,
  }),
  subject: PropTypes.string,
  setSubject: PropTypes.func.isRequired,
  text: PropTypes.string,
  setText: PropTypes.func.isRequired,
  handleClientEmailChange: PropTypes.func.isRequired,
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
