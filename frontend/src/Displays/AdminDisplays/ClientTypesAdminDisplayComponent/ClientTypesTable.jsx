import PropTypes from 'prop-types';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
export default function ClientTypesTable({ clientTypes, handleDeleteClick, handleEditClick, currentPage, itemsPerPage }) {

  const indexOfLastclientType = currentPage * itemsPerPage;
  const indexOfFirstclientType = indexOfLastclientType - itemsPerPage;
  const currentclientTypes = clientTypes.slice(indexOfFirstclientType, indexOfLastclientType);

  return (
    <div className='relative'>
      <table className="min-w-full leading-normal">
      <thead className="bg-gray-200 sticky top-0">
          <tr className="bg-gray-200">
            {/* <th className="px-4 py-2">ID</th> */}
            <th className="px-4 py-2 text-center">Client Type</th>
            <th className="px-4 py-2 text-center">Remarks</th>
            <th className="px-4 py-2 text-center">Action</th>
          

          </tr>
        </thead>
        <tbody>
          {currentclientTypes.map((clientType, index) => (
            <tr key={index}>
              {/* <td className="border px-4 py-2 text-center">{clientType.Doc_type_ID}</td> */}
              <td className="border px-4 py-2 text-center">{clientType.type}</td>
              <td className="border px-4 py-2 text-center">{clientType.remarks}</td>

              <td className="border px-4 py-2 text-center flex">
              <button
                 title="Modify"
                 className="text-blue-500 hover:underline ml-2 font-bold"
                 onClick={() =>  handleEditClick(clientType.Client_type_ID)}
               >
                <MdEdit size='35px'/>
                <div className="absolute bg-gray-800 text-white p-2 rounded shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300"></div>
                </button>
                <button
                  title="Delete"
                  className="text-red-500 hover:underline ml-2 font-bold"
                  onClick={() => handleDeleteClick(clientType.Client_type_ID)}
                >
                 <MdDelete size='35px'/>
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

ClientTypesTable.propTypes = {
    clientTypes: PropTypes.arrayOf(
    PropTypes.shape({
      Client_type_ID: PropTypes.number,
      type: PropTypes.string, 
    })
  ).isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
};
