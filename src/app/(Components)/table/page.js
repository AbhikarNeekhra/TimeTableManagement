import React from "react";
import Data from "./data";

const Table = () => {
  return (
    <>
      <div className="w-full relative flex flex-col shadow-lg mb-2">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full">
            <h3 className="text-center font-bold text-2xl p-4">
              Allotment Table
            </h3>
          </div>
        </div>
        <div className="block bg-transparent p-4 w-full overflow-x-auto">
          <table className="w-full ">
            <thead>
              <tr className="border border-solid shadow-md border-l-0 border-r-0">
                <th className="text-md px-6 py-3">Session</th>
                <th className="text-md px-6 py-3">Allotment ID</th>
                <th className="text-md px-6 py-3">Branch</th>
                <th className="text-md px-6 py-3">Subject</th>
                <th className="text-md px-6 py-3">Faculty Email</th>
                <th className="text-md px-6 py-3">Room</th>
                <th className="text-md px-6 py-3">Day</th>
              </tr>
            </thead>
            <tbody>
              {Data.AllotID.map((id, index) => (
                <tr
                  className="border border-solid border-l-0 border-r-0"
                  key={index}
                >
                  <td className="text-md px-6 py-3 text-center">
                    {Data.Session}
                  </td>
                  <td className="text-md px-6 py-3 text-center">{id}</td>
                  <td className="text-md px-6 py-3 text-center">
                    {Data.Branch[index]}
                  </td>
                  <td className="text-md px-6 py-3 text-center">
                    {Data.Subject[index]}
                  </td>
                  <td className="text-md px-6 py-3 text-center">
                    {Data.Email[index]}
                  </td>
                  <td className="text-md px-6 py-3 text-center">
                    {Data.Room[index]}
                  </td>
                  <td className="text-md px-6 py-3 text-center">
                    {Data.Day[index]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Table;
