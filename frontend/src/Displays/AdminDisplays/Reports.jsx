import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { FaEnvelope } from "react-icons/fa";
import { RiGroupLine } from "react-icons/ri";
import { TEChart } from "tw-elements-react";
import { makeRequest } from "../../../axios";
import { FaPrint } from "react-icons/fa";

export default function Reports() {
  //==============FETCHING BELOW===============//

  // to fetch units
  const [unitOptions, setUnitOptions] = useState([]);
  useEffect(() => {
    const fetchUnitData = async () => {
      try {
        const response = await makeRequest.get("/getUnits");
        setUnitOptions(response.data);
        console.log("the units " + JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching units data:", error);
      }
    };
    fetchUnitData();
  }, []);

  // to fetch document type
  const [documentTypeOptions, setDocumentTypeOptions] = useState([]);
  useEffect(() => {
    const fetchDocumentTypeData = async () => {
      try {
        const response = await makeRequest.get("/getDocumentTypes");
        setDocumentTypeOptions(response.data);
        console.log("Document types: " + JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching document type data:", error);
      }
    };
    fetchDocumentTypeData();
  }, []);

  // to fetch status
  const [statusOptions, setStatusOptions] = useState([]);
  useEffect(() => {
    const fetchStatusData = async () => {
      try {
        const response = await makeRequest.get("/getStatus");
        setStatusOptions(response.data);
        console.log("Status " + JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching status data:", error);
      }
    };
    fetchStatusData();
  }, []);

  //     // to fetch personnel
  //   const [personnelOptions, setPersonnelOptions] = useState([]);
  // useEffect(() => {
  //   const fetchPersonnelData = async () => {
  //     try {
  //       const response = await makeRequest.get("/getPersonnels");
  //       setPersonnelOptions(response.data);
  //       console.log("Status " + JSON.stringify(response.data));
  //     } catch (error) {
  //       console.error("Error fetching status data:", error);
  //     }
  //   };
  //   fetchPersonnelData();}, []);

  //==============FETCHING ABOVE===============//

  const [documents, setDocuments] = useState([]);

  //  // for automatic current year
  //   const [filterYearReceived, setFilterYearReceived] = useState(
  //     new Date().getFullYear()
  //   );
  // // for automatic current month
  // const [filterMonthReceived, setFilterMonthReceived] = useState(
  //   new Date().getMonth() + 1
  // ); // Months are 0-indexed in JS
  const [filterYearReceived, setFilterYearReceived] = useState();
  const [filterMonthReceived, setFilterMonthReceived] = useState();
  const [filterDayReceived, setFilterDayReceived] = useState("");
  const [startDateReceived, setStartDateReceived] = useState("");
  const [endDateReceived, setEndDateReceived] = useState("");
  const [filterUnit, setFilterUnit] = useState("");
  const [filterDocumentType, setFilterDocumentType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  // const [filterPersonnel, setFilterPersonnel] = useState("");

  // for dymanic search for filter
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    makeRequest
      .get("/getDocuments")
      .then((response) => {
        setDocuments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching documents:", error);
      });
  }, []);
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write("<html><head><title>Record Reports</title>");
    printWindow.document.write(
      '<link rel="stylesheet" type="text/css" href="print-styles.css"></head>'
    );
    printWindow.document.write("<body>");
    printWindow.document.write('<table class="min-w-full leading-normal">');
    printWindow.document.write('<thead class="bg-gray-200 sticky top-0">');
    printWindow.document.write("<tr>");
    printWindow.document.write(
      '<th class="text-gray-600 text-left">Client Name</th>'
    );
    printWindow.document.write(
      '<th class="text-gray-600 text-left">Assigned Personnel</th>'
    );
    printWindow.document.write(
      '<th class="text-gray-600 text-left p-2">Unit</th>'
    );
    printWindow.document.write(
      '<th class="text-gray-600 text-left p-2">Filing Category</th>'
    );
    printWindow.document.write(
      '<th class="text-gray-600 text-left p-2">Date Uploaded</th>'
    );
    printWindow.document.write(
      '<th class="text-gray-600 text-left p-2">Date Released</th>'
    );
    printWindow.document.write(
      '<th class="text-gray-600 text-left p-2">Status</th>'
    );
    printWindow.document.write(
      '<th class="text-gray-600 text-left p-2">File</th>'
    );
    printWindow.document.write(
      '<th class="text-gray-600 text-left p-2">P.I</th>'
    );

    printWindow.document.write("</tr>");
    printWindow.document.write("</thead>");
    printWindow.document.write("<tbody>");

    filteredDocuments.forEach((document) => {
      printWindow.document.write(
        '<tr class="border-b border-gray-200 hover:bg-gray-100">'
      );
      printWindow.document.write(
        `<td class="p-1">${document.client_name}</td>`
      );
      printWindow.document.write('<td class="p-1">');
      printWindow.document.write(
        `${document.contact_firstName} ${document.contact_lastName}`
      );
      printWindow.document.write("</td>");
      printWindow.document.write(`<td class="p-1">${document.unit}</td>`);
      printWindow.document.write(
        `<td class="p-1">${document.document_type}</td>`
      );
      printWindow.document.write(
        `<td class="p-1">${document.date_received}</td>`
      );
      printWindow.document.write(
        `<td class="p-1">${document.date_released}</td>`
      );
      printWindow.document.write(`<td class="p-1">${document.status}</td>`);
      printWindow.document.write(`<td class="p-1">${document.file}</td>`);
      printWindow.document.write(`<td class="p-1">${document.tags}</td>`);

      printWindow.document.write("</td>");
      printWindow.document.write("</tr>");
    });

    printWindow.document.write("</tbody>");
    printWindow.document.write("</table></body></html>");
    printWindow.document.close();
    printWindow.print();
  };
  //filtered documents
  const filteredDocuments = documents.filter((doc) => {
    const dateReceived = new Date(doc.date_received);
    const year = dateReceived.getFullYear();
    const month = dateReceived.getMonth() + 1; // Adjusting because getMonth() is 0-indexed
    const day = dateReceived.getDate();
    return (
      (!filterYearReceived || year === filterYearReceived) &&
      (!filterMonthReceived || month === filterMonthReceived) &&
      (!filterDayReceived || day === filterDayReceived) &&
      (!startDateReceived ||
        new Date(doc.date_received) >= new Date(startDateReceived)) &&
      (!endDateReceived ||
        new Date(doc.date_received) <= new Date(endDateReceived)) &&
      (!filterUnit || doc.unit === filterUnit) &&
      (!filterDocumentType || doc.document_type === filterDocumentType) &&
      (!filterStatus || doc.status === filterStatus) &&
      (!searchQuery ||
        doc.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.contact_lastName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        doc.contact_firstName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        doc.unit.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.document_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.date_received.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.tags.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.file.toLowerCase().includes(searchQuery.toLowerCase()))
      // (!filterPersonnel || doc.list_personnel === filterPersonnel)
    );
  });

  // fetch how many Communications
  const [communicationCount, setCommunicationCount] = useState(0);
  useEffect(() => {
    // Fetch the count of Communication counts from the backend
    makeRequest
      .get("/getCommunicationCount")
      .then((response) => {
        setCommunicationCount(response.data.communicationCount);
      })
      .catch((error) => {
        console.error("Error fetching communication count:", error);
      });
  }, []);

  // fetch how many Unit
  const [unitCount, setUnitCount] = useState(0);
  useEffect(() => {
    // Fetch the count of Communication counts from the backend
    makeRequest
      .get("/getUnitCount")
      .then((response) => {
        setUnitCount(response.data.unitCount);
      })
      .catch((error) => {
        console.error("Error fetching communication count:", error);
      });
  }, []);

  //  fetch the statuses of document/communciation
  const [documentStatusCounts, setDocumentStatusCounts] = useState({});
  useEffect(() => {
    // Fetch the count of Document Status counts from the backend
    makeRequest
      .get("/getDocumentStatusCounts")
      .then((response) => {
        const counts = response.data.reduce((acc, curr) => {
          acc[curr.type] = curr.count;
          return acc;
        }, {});
        setDocumentStatusCounts(transformToChartData(counts));
      })
      .catch((error) => {
        console.error("Error fetching document status counts:", error);
      });
  }, []);

  //  fetch the statuses of document/communciation
  const [documentUnitCounts, setDocumentUnitCounts] = useState({});
  useEffect(() => {
    // Fetch the count of Document Status counts from the backend
    makeRequest
      .get("/getDocumentUnitCounts")
      .then((response) => {
        const counts = response.data.reduce((acc, curr) => {
          acc[curr.type] = curr.count;
          return acc;
        }, {});
        setDocumentUnitCounts(transformToChartData(counts));
      })
      .catch((error) => {
        console.error("Error fetching document unit counts:", error);
      });
  }, []);

  ////////////////////

  // Function to transform status counts into chart data
  const transformToChartData = (counts) => {
    const labels = Object.keys(counts);
    const data = labels.map((label) => counts[label]);
    const backgroundColor = labels.map(() => generateRandomColor());
    return {
      labels,
      datasets: [{ label: "Records by Unit", data, backgroundColor }],
    };
  };

  // Function to generate random colors
  const generateRandomColor = () => {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 0.5)`;
  };

  return (
    <div className="container mx-auto p-4 ml-1 mr-1 ">
      <div className="grid grid-cols-4 gap-4 ">
        {/* TABLE 1 - Occupying 3/4th of the space */}
        <div className="col-span-3 bg-gray-100 overflow-auto border-gray-300 border rounded shadow-lg">
          <div className="p-4 bg-white  ">
            {/* Filter selection and Table */}
            <div className="flex flex-col">
              {/* Filter by Year, Month, Day */}
              <div className="flex flow-row gap-1 mt-1 border border-blue-950 rounded p-3 mb-2 overflow-auto">
                <div>
                  <label
                    htmlFor="yearFilter"
                    className="text-gray-700 font-medium "
                  >
                    Year Received:{" "}
                  </label>
                  <input
                    type="text"
                    id="yearFilter"
                    value={filterYearReceived}
                    onChange={(e) =>
                      setFilterYearReceived(Number(e.target.value))
                    }
                    className="border w-16 p-1 rounded focus:ring-blue-500 focus:border-blue-500 text-gray-600 font-semibold"
                  />
                </div>
                <div>
                  <label
                    htmlFor="monthFilter"
                    className="text-gray-700 font-medium "
                  >
                    Month Received:{" "}
                  </label>
                  <select
                    id="monthFilter"
                    value={filterMonthReceived}
                    onChange={(e) =>
                      setFilterMonthReceived(Number(e.target.value))
                    }
                    className="border p-1 rounded focus:ring-blue-500 focus:border-blue-500 text-gray-600 font-semibold"
                  >
                    <option className="text-gray-600 font-semibold" value=" ">
                      Select Month
                    </option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option
                        className="text-gray-600 font-semibold"
                        key={i + 1}
                        value={i + 1}
                      >
                        {new Date(0, i).toLocaleString("default", {
                          month: "long",
                        })}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="hidden">
                  <label
                    htmlFor="dayFilter"
                    className="text-gray-700 font-medium"
                  >
                    Filter by Day Received:{" "}
                  </label>
                  <select
                    id="dayFilter"
                    value={filterDayReceived}
                    onChange={(e) =>
                      setFilterDayReceived(Number(e.target.value))
                    }
                    className="border p-1 rounded focus:ring-blue-500 focus:border-blue-500 text-gray-600 font-semibold"
                  >
                    <option className="text-gray-600 font-semibold" value="">
                      Select Day
                    </option>
                    {Array.from({ length: 31 }, (_, i) => (
                      <option
                        className="text-gray-600 font-semibold"
                        key={i + 1}
                        value={i + 1}
                      >
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* Filter by Date Received Start Date and End Date */}
              <div className="flex flow-row gap-1 mt-1 border border-blue-950 rounded p-3 mb-2 overflow-auto">
                <div>
                  <label
                    htmlFor="startDate"
                    className="text-gray-700 font-medium"
                  >
                    Date Uploaded Start Date:{" "}
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    value={startDateReceived}
                    onChange={(e) => setStartDateReceived(e.target.value)}
                    className="border p-1 rounded focus:ring-blue-500 focus:border-blue-500 text-gray-600 font-semibold"
                  />
                </div>
                <div>
                  <label
                    htmlFor="endDate"
                    className="ml-4 text-gray-700 font-medium"
                  >
                    Date Uploaded End Date:{" "}
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    value={endDateReceived}
                    onChange={(e) => setEndDateReceived(e.target.value)}
                    className="border p-1 rounded focus:ring-blue-500 focus:border-blue-500 text-gray-600 font-semibold"
                  />
                </div>
              </div>
              <div className="flex flow-row gap-1 mt-1 border border-blue-950 rounded p-3 overflow-auto">
                <div>
                  <label
                    htmlFor="unitFilter"
                    className="text-gray-700 font-medium"
                  >
                    Filter by Units:{" "}
                  </label>
                  <select
                    id="unitFilter"
                    value={filterUnit}
                    onChange={(e) => setFilterUnit(e.target.value)}
                    className="border p-1 rounded focus:ring-blue-500 focus:border-blue-500 text-gray-600 font-semibold"
                  >
                    <option className="text-gray-600 font-semibold" value="">
                      Select Unit
                    </option>
                    {unitOptions.map((unit) => (
                      <option
                        className="text-gray-600 font-semibold"
                        key={unit.ID}
                        value={unit.ID}
                      >
                        {unit.type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="documentTypeFilter"
                    className="text-gray-700 font-medium"
                  >
                    Filter by Filing Category:{" "}
                  </label>
                  <select
                    id="documentTypeFilter"
                    value={filterDocumentType}
                    onChange={(e) => setFilterDocumentType(e.target.value)}
                    className="border p-1 rounded focus:ring-blue-500 focus:border-blue-500 text-gray-600 font-semibold"
                  >
                    <option className="text-gray-600 font-semibold" value="">
                      Select Filing Category
                    </option>
                    {documentTypeOptions.map((document_type) => (
                      <option
                        className="text-gray-600 font-semibold"
                        key={document_type.ID}
                        value={document_type.ID}
                      >
                        {document_type.type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="statusFilter"
                    className="text-gray-700 font-medium"
                  >
                    Filter by Status:{" "}
                  </label>
                  <select
                    id="statusFilter"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border p-1 rounded focus:ring-blue-500 focus:border-blue-500 text-gray-600 font-semibold"
                  >
                    <option className="text-gray-600 font-semibold" value="">
                      Select Status
                    </option>
                    {statusOptions.map((status) => (
                      <option
                        className="text-gray-600 font-semibold"
                        key={status.ID}
                        value={status.ID}
                      >
                        {status.type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="unitFilter"
                    className="text-gray-700 font-medium"
                  >
                    Search keyword:{" "}
                  </label>
                  <input
                    type="text"
                    placeholder=".  .  .  "
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                {/* <div>
           <label htmlFor="personnelFilter" className="text-gray-700">Filter by Personnel: </label>
           <select
              id="personnelFilter"
              value={filterPersonnel}
              onChange={(e) => setFilterPersonnel(e.target.value)}
             className="border p-1 rounded focus:ring-blue-500 focus:border-blue-500"
               >
             <option value="">Select Personnel</option>
              {personnelOptions.map((list_personnel) => (
               <option key={list_personnel.ID} value={list_personnel.ID}>
                 {list_personnel.first_name} {list_personnel.last_name}
                </option>
                 ))}
                 </select>
            </div> */}
              </div>
            </div>

            <div className="overflow-x-auto h-96 border mt-16">
              <table className="min-w-full leading-normal">
                <thead className="bg-gray-200 sticky top-0">
                  <tr>
                    <th className="text-gray-600 text-left">Client Name</th>
                    <th className="text-gray-600 text-left">
                      Assigned Personnel
                    </th>
                    <th className="text-gray-600 text-left p-2">Unit</th>
                    <th className="text-gray-600 text-left p-2">
                      Filing Category
                    </th>
                    <th className="text-gray-600 text-left p-2">
                      Date Uploaded
                    </th>
                    <th className="text-gray-600 text-left p-2">
                      Date Released
                    </th>
                    <th className="text-gray-600 text-left p-2">Status</th>
                    <th className="text-gray-600 text-left p-2">
                      Perpetual Index
                    </th>
                    <th className="text-gray-600 text-left p-2">File</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDocuments.map((document) => (
                    <tr
                      key={document.doc_ID}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="p-1">{document.client_name}</td>
                      <td className="p-1">
                        {document.contact_firstName} {document.contact_lastName}
                      </td>
                      <td className="p-1">{document.unit}</td>
                      <td className="p-1">{document.document_type}</td>
                      <td className="p-1">{document.date_received}</td>
                      <td className="p-1">{document.date_released}</td>
                      <td className="p-1">{document.status}</td>
                      <td className="p-1">{document.tags}</td>
                      <td className="p-1">
                        <FileLink item={document} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
             title="Print Record"
              className="flex mt-5 w-auto px-4 py-2 text-white hover:text-gray-500 bg-black hover:bg-gray-800 text-2xl rounded-lg transition duration-300 "
              onClick={handlePrint}
            >
              <FaPrint />
            </button>
          </div>
        </div>
        {/* CHART 1 - Occupying the remaining 1/4th of the space */}
        <div className="col-span-1">
          <div className="">
            {/* Chart Component */}
            <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-300 hover:border-indigo-500 transition-all">
              <p className="text-sm font-semibold text-gray-600">
                Total Communications
              </p>
              <div className="flex w-auto items-center gap-4 mt-2 mb-4">
                <span className="text-4xl leading-loose text-indigo-500">
                  <FaEnvelope />
                </span>
                <p className="text-1xl font-bold text-indigo-500">
                  {communicationCount} Communications
                </p>
              </div>
              <TEChart type="doughnut" data={documentStatusCounts} />
            </div>
            {/* CHART 2 - Below Chart 1 */}

            <div className=" border rounded">
              {/* Chart 2 */}
              <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-300 hover:border-indigo-500 transition-all">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    {/* <p className="text-sm font-semibold text-gray-600">
                      Communication Units
                    </p> */}
                    <div className="flex items-center gap-4 mt-2 mb-4">
                      <span className="text-4xl leading-loose text-indigo-500">
                        <RiGroupLine />
                      </span>
                      <p className="text-1xl font-bold text-indigo-500">
                        {unitCount} Units{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="overflow-auto max-w-[400px] max-h-[200]">
                  <TEChart type="bar" data={documentUnitCounts} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const FileLink = ({ item }) => {
  const [fileUrl, setFileUrl] = useState(
    `communicationhistoryfiles/${item.file}`
  );

  useEffect(() => {
    const checkFile = async () => {
      try {
        const response = await makeRequest.get(fileUrl);

        // You may need to adjust the condition based on your API response
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
