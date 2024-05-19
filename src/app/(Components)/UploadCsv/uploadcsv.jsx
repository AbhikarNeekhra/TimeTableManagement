import { useState } from "react";
import axios from "axios";
// import { on } from "events";

const UploadData = ({ fields, apiUrl , onButtonClick }) => {
  const [csvData, setCsvData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    const file = event.target.files[0];
    const reader = new FileReader();
     
  
    reader.onload = (e) => {
      // Parse CSV data
      const text = e.target.result;
      const rows = text.split("\n");
      
      // Skip the first line (header)
      const dataRows = rows.slice(1);
  
      const rowData = dataRows.map(row => row.split(","));
      setCsvData(rowData);
    };
  
    reader.readAsText(file);
  };
  let i = 0;
  const postData = async (rowData) => {
    try {
      const response = await axios.post(apiUrl, rowData);
      console.log(response.data);
      if (response.data.message=="success") {
        i = i + 1;
        console.log(i);
      }
      return response.data, i;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to post data");
    }
  };
  

  const handleUpload = async () => {
    if (csvData) {
      try {
        for (let row of csvData) {
          const rowData = {};
          fields.forEach((field, index) => {
            rowData[field] = row[index];
          });
          await postData(rowData);
        }
        onButtonClick(`${i} rows uploaded successfully!`);
        console.log(`${i} rows uploaded successfully!`);
      } catch (error) {
        console.error(error.message);
        onButtonClick("Failed to upload data");
      }
    } else {
      console.log("No CSV data available");
      onButtonClick("No CSV data available");
    }
    // onButtonClick(message);
  };

  
  return (
    <div className="flex items-center" >
       
      <input type="file" onChange={handleFileChange} className="mt-2 block w-60 text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold cursor-pointer
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100"/>
      <button onClick={handleUpload} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 m-3">Upload CSV</button>
    </div>
  );
};

export default UploadData;
