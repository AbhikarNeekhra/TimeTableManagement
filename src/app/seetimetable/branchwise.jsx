import axios from "axios";
import { useState, useEffect } from "react";
import { SidebarProvider } from "../Context/SidebarContext";
import Header from "../(Components)/Header/Header";

let two = "First";
const BranchTable = (branchwiseprop) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedBranchData, setSelectedBranchData] = useState(null);
  const [branch, setBranch] = useState([]);
  const one = branchwiseprop;

  // useEffect(() => {
  //   getDataFinalTable(); // Call the function passed from props
  //   // console.log("BranchwiseProp:: ",branchwiseprop.branchwiseprop.branch.value)
  // }, []);

  const getDataFinalTable = () => {
    axios
      .get("/api/database/getalldata")
      .then((response) => {
        setData(response.data.allotment);
        // setBranch(response.data.branch);
        setLoading(false);
        console.log("Response: ", response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const datahandle = async () => {
    two = one;
    console.log("Datahandled");
    getDataFinalTable();
  };
  let selectedBranchnew = branchwiseprop.branchwiseprop.branch;
  if (
    selectedBranchnew != null &&
    selectedBranchnew != "" &&
    selectedBranchnew != " "
  ) {
    selectedBranchnew = selectedBranchnew.value;
    let selectedBranchDataContainer = document.getElementById(
      "selectedBranchDataContainer"
    );
    selectedBranchDataContainer.innerHTML = `<h3 >B.tech - ${selectedBranchnew}</h3>`;

    if (one != two) {
      datahandle();
    }
  }

  // const handleBranchSelect = async (selectedBranchnew) => {
  //   // console.log("Selected Branch: ", inputbranch);

  //   // getDataFinalTable();
  //   // let selectedBranchDataContainer = document.getElementById(
  //   //   "selectedBranchDataContainer"
  //   // );
  //   // selectedBranchDataContainer.innerHTML = `<h3 >B.tech - ${selectedBranchnew}</h3>`;
  // };
  const filteredData = selectedBranchnew
    ? data.filter((entry) => entry.branch_id === selectedBranchnew)
    : data;

  return (
    <div>
      <SidebarProvider>
        <Header />
      </SidebarProvider>
      <div style={{ width: "95%" }}>
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-1 max-w-full">
            <h3 className="text-center font-bold text-blue-500 text-2xl p-2">
              {" "}
              Department of Engineering Mathematics & Computing
            </h3>
            <div>
              <h3 className="text-center font-bold text-xl">
                Session Jan - June 2024
              </h3>
              <div className=" flex justify-between items-center w-90">
                <div className="w-48 flex items-center">
                  {/* <label className="text-xl font-bold">Branch:</label>
                  <Select
                    required
                    isSearchable
                    className="rounded-md border-2 border-black  ml-2 w-40 z-10"
                    value={selectedBranchData}
                    onChange={(selectedOption) => {
                      handleBranchSelect(selectedOption);
                      setSelectedBranch(selectedOption.value);
                      setSelectedBranchData(selectedOption);
                    }}
                    options={branch.map((BranchID) => ({
                      value: BranchID.branch_id,
                      label: `${BranchID.branch_id}`,
                    }))}
                  /> */}
                </div>

                <div
                  className="text-center w-70  font-bold text-xl"
                  id="selectedBranchDataContainer"
                ></div>
                <div className="w-48"></div>
              </div>
            </div>
          </div>
        </div>

        {/* <MaterialReactTable  table={table} style={{ width: "100%" } } /> */}
        <div className="block bg-transparent w-full overflow-x-auto p-4">
          <table className="w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-200 text-gray-700 ml-0">
              <tr className="border border-black">
                <th className="text-md border border-black px-1 py-2">Day</th>
                <th className="text-md border border-black px-1 py-2">
                  09:00 - 10:00
                </th>
                <th className="text-md border border-black px-1 py-2">
                  10:00 - 11:00
                </th>
                <th className="text-md border border-black px-1 py-2">
                  11:00 - 12:00
                </th>
                <th className="text-md border border-black px-1 py-2">
                  12:00 - 13:00
                </th>
                <th className="text-md border border-black px-1 py-2">
                  13:00 - 14:00
                </th>
                <th className="text-md border border-black px-1 py-2">
                  14:00 - 15:00
                </th>
                <th className="text-md border border-black px-1 py-2">
                  15:00 - 16:00
                </th>
                <th className="text-md border border-black px-1 py-2">
                  16:00 - 17:00
                </th>
                <th className="text-md border border-black px-1 py-2">
                  17:00 - 18:00
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {[
                "MONDAY",
                "TUESDAY",
                "WEDNESDAY",
                "THURSDAY",
                "FRIDAY",
                "SATURDAY",
              ].map((day, dayIndex) => (
                <tr key={dayIndex} className="border border-black">
                  <td className="text-md border border-black px-1 py-2 text-center">
                    {day}
                  </td>
                  {[
                    "09:00 - 10:00",
                    "10:00 - 11:00",
                    "11:00 - 12:00",
                    "12:00 - 13:00",
                    "13:00 - 14:00",
                    "14:00 - 15:00",
                    "15:00 - 16:00",
                    "16:00 - 17:00",
                    "17:00 - 18:00",
                  ].map((slot, slotIndex) => (
                    <td
                      key={slotIndex}
                      className="text-sm border border-black px-1 py-2 text-center"
                    >
                      {filteredData.find(
                        (entry) =>
                          entry.day == day &&
                          entry.slot_start_time.slice(0, 5) ==
                            slot.slice(0, 5) &&
                          entry.slot_end_time.slice(0, 5) == slot.slice(8)
                      ) ? (
                        <div>
                          {
                            filteredData.find(
                              (entry) =>
                                entry.day == day &&
                                entry.slot_start_time.slice(0, 5) ==
                                  slot.slice(0, 5) &&
                                entry.slot_end_time.slice(0, 5) == slot.slice(8)
                            ).room_name
                          }
                          <br />
                          {
                            filteredData.find(
                              (entry) =>
                                entry.day == day &&
                                entry.slot_start_time.slice(0, 5) ==
                                  slot.slice(0, 5) &&
                                entry.slot_end_time.slice(0, 5) == slot.slice(8)
                            ).subject_code
                          }
                          -
                          {
                            filteredData.find(
                              (entry) =>
                                entry.day == day &&
                                entry.slot_start_time.slice(0, 5) ==
                                  slot.slice(0, 5) &&
                                entry.slot_end_time.slice(0, 5) == slot.slice(8)
                            ).faculty_name
                          }
                        </div>
                      ) : (
                        ""
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="h-fit w-full flex justify-evenly items-center">
          <div className="square h-full w-fit">
            <div className="h-32 w-auto border border-black"></div>
            <h3 className="w-[14vw] text-center font-semibold">
              Dr. Vikas Shinde <br></br> (Prof. & Head)
            </h3>
          </div>
          <div className="block bg-transparent w-[40%] p-4">
            <table className="mx-auto">
              <tbody>
                <tr className="border border-black">
                  <th className="px-1 py-2">Section A</th>
                  <td className="px-1 py-2">
                    (Enrollment No. 0901MC211001 to 0901MC211040)
                  </td>
                </tr>
                <tr className="border border-black">
                  <th className="px-1 py-2">Section B</th>
                  <td className="px-1 py-2">
                    (Enrollment No. 0901MC211041 Onwards)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="square h-fit w-fit">
            <div className="h-32 w-auto border border-black"></div>
            <h3 className="w-[14vw] text-center font-semibold">
              Dr. J.K. Muthele <br></br> (Time Table Coordinator)
            </h3>
          </div>
        </div>
        <div className="block bg-transparent w-full overflow-x-auto p-4"></div>
      </div>
    </div>
  );
};
export default BranchTable;
