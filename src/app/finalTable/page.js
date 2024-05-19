import Data from "./data.js";

function getColSpan(one, two, three) {
  if (one != "" && two != "" && one == two && two == three) {
    return 3;
  } else if (one != "" && (one == two) != three) {
    return 2;
  } else {
    return 1;
  }
}

const FinalTable = () => {
  return (
    <>
      <div className="w-full relative flex flex-col shadow-lg mb-2">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-1 max-w-full">
            <h3 className="text-center font-bold text-blue-500 text-lg md:text-3xl p-2">
              {" "}
              Department <br className="md:hidden"></br>of
              <br className="md:hidden"></br> Engineering Mathematics &
              Computing
            </h3>
            <h3 className="text-center font-bold text-md md:text-2xl">
              B.Tech (VI SEM)
            </h3>
            <h3 className="text-center font-bold text-md md:text-xl">
              Session Jan - June 2024
            </h3>
            <h3 className="text-center font-bold text-lg md:text-2xl p-1">
              Time Table
            </h3>
          </div>
        </div>
        <div className="block bg-transparent w-full overflow-x-auto p-4">
          <table className="w-full ">
            <thead>
              <tr className="border border-black">
                <th className="text-md border border-black px-1 py-2">
                  Time/<br></br>Day
                </th>
                <th className="text-md border border-black px-1 py-2">
                  10:00-11:00
                </th>
                <th className="text-md border border-black px-1 py-2">
                  11:00-12:00
                </th>
                <th className="text-md border border-black px-1 py-2">
                  12:00-1:00
                </th>
                <th className="text-md border border-black px-1 py-2">
                  1:00-2:00
                </th>
                <th className="text-md border border-black px-1 py-2">
                  2:00-3:00
                </th>
                <th className="text-md border border-black px-1 py-2">
                  3:00-4:00
                </th>
                <th className="text-md border border-black px-1 py-2">
                  4:00-5:00
                </th>
                <th className="text-md border border-black px-1 py-2">
                  5:00-6:00
                </th>
              </tr>
            </thead>
            <tbody>
              {Data.timeDay.map((id, index) => (
                <tr className="border border-black" key={index}>
                  <th className="text-md border border-black px-1 py-2 text-center">
                    {Data.timeDay[index]}
                  </th>
                  <td
                    className="text-md border border-black px-1 py-2 text-center"
                    colSpan={Data.Ten[index] == Data.Eleven[index] ? "2" : "1"}
                  >
                    {Data.Ten[index]}
                  </td>
                  <td
                    className={`${
                      Data.Eleven[index] == Data.Ten[index] ? "hidden" : ""
                    } text-md border border-black px-1 py-2 text-center`}
                    colSpan={Data.Ten[index] == Data.Eleven[index] ? "2" : "1"}
                  >
                    {Data.Eleven[index]}
                  </td>
                  <td
                    className={`${
                      Data.Twelve[index] == Data.Eleven[index] ? "hidden" : ""
                    } text-md border border-black px-1 py-2 text-center`}
                    colSpan={
                      Data.Twelve[index] == Data.Eleven[index] ? "2" : "1"
                    }
                  >
                    {Data.Twelve[index]}
                  </td>
                  <td className="text-md border border-black px-1 py-2 text-center bg-orange-200">
                    {Data.One[index]}
                  </td>

                  {/* TWO */}

                  <td
                    className={`text-md ${
                      Data.Two[index] == Data.One[index] &&
                      Data.One[index] != ""
                        ? "hidden"
                        : ""
                    } border border-black px-1 py-2 text-center`}
                    colSpan={getColSpan(
                      Data.Two[index],
                      Data.Three[index],
                      Data.Four[index]
                    )}
                  >
                    {Data.Two[index]}
                  </td>

                  {/* Three */}

                  <td
                    className={`text-md ${
                      Data.Three[index] == Data.Two[index] &&
                      Data.Two[index] != ""
                        ? "hidden"
                        : ""
                    } border border-black px-1 py-2 text-center`}
                    colSpan={getColSpan(
                      Data.Three[index],
                      Data.Four[index],
                      Data.Five[index]
                    )}
                  >
                    {Data.Three[index]}
                  </td>

                  {/* Four */}

                  <td
                    className={`text-md ${
                      Data.Three[index] == Data.Four[index] &&
                      Data.Four[index] != ""
                        ? "hidden"
                        : ""
                    } border border-black px-1 py-2 text-center`}
                    colSpan={getColSpan(
                      Data.Four[index],
                      Data.Five[index],
                      null
                    )}
                  >
                    {Data.Four[index]}
                  </td>

                  {/* Five */}

                  <td
                    className={`text-md ${
                      Data.Five[index] == Data.Four[index] &&
                      Data.Five[index] != ""
                        ? "hidden"
                        : ""
                    } border border-black px-1 py-2 text-center`}
                  >
                    {Data.Five[index]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* <div className="h-fit w-full flex justify-evenly items-center overflow-x-scroll px-5 py-2">
          <div className="min-h-[12vh] md:min-h-[20vh] h-fit min-w-[190px] md:min-w-[230px] md:scale-100 scale-90 ">
            <div className="h-32 w-full border border-black"></div>
            <h3 className="w-full text-center md:text-md text-sm font-semibold my-1">
              Dr. Vikas Shinde <br></br> (Prof. & Head)
            </h3>
          </div>
          <div className="min-h-[20vh] min-w-[480px] md:min-w-[500px] md:scale-100 scale-90 mx-20 ">
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
            <table className="mx-auto my-2">
              <tbody>
                <tr className="border border-black">
                  <th className="px-1 py-2">Sem</th>
                  <td className="px-1 py-2">VI</td>
                </tr>
                <tr className="border border-black">
                  <th className="px-1 py-2">Room</th>
                  <td className="px-1 py-2">101</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="min-h-[12vh] md:min-h-[20vh] h-fit min-w-[190px] md:min-w-[230px] md:scale-100 scale-90 ">
            <div className="h-32 w-full border border-black"></div>
            <h3 className="w-full text-center md:text-md text-sm font-semibold my-1">
              Prof. J.K. Muthele <br></br> (Time Table Coordinator)
            </h3>
          </div>
        </div> */}

        {/* something */}

        {/* <div className="h-fit w-full flex justify-center items-center overflow-x-scroll px-10">
          <div className="square h-full min-w-[30vw] lg:min-w-[10vw] bg-red-200">
            <div className="h-32 w-auto border border-black bg-blue-200"></div>
            <h3 className="lg:w-[14vw] w-full text-center font-semibold bg-green-200">
              Dr. Vikas Shinde <br></br> (Prof. & Head)
            </h3>
          </div>
          <div className="h-full bg-transparent min-w-[100vw] mx-20 md:min-w-[40vw] bg-red-200 p-4">
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
            <table className="mx-auto my-2">
              <tbody>
                <tr className="border border-black">
                  <th className="px-1 py-2">Sem</th>
                  <td className="px-1 py-2">VI</td>
                </tr>
                <tr className="border border-black">
                  <th className="px-1 py-2">Room</th>
                  <td className="px-1 py-2">101</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="square h-full min-w-[30vw] lg:min-w-[10vw] w-fit bg-red-200">
            <div className="h-32 w-auto border border-black bg-blue-200"></div>
            <h3 className="lg:w-[14vw] w-full text-center font-semibold bg-green-200">
              Prof. J.K. Muthele <br></br> (Time Table Coordinator)
            </h3>
          </div>
        </div>

        <div className="block bg-transparent w-full overflow-x-auto p-4"></div> */}
      </div>

      {/* something end */}
    </>
  );
};

export default FinalTable;
