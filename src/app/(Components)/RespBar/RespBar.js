import "./RespBar.css";
const RespBar = ({ text, value }) => {
  return (
    <>
      <div className="h-20 w-full px-3 py-2 my-1 rounded-lg">
        <div className="h-full w-full text-white relative text-xl py-1 font-semibold bg-gray-400">
          <div
            style={{ width: `${value}%` }}
            className={`h-full ${
              value < 100 ? "rounded-r-lg" : ""
            } bg-gradient-to-r from-[#FE886A] to-[#FF4B77]`}
          >
            <p className="p1">{text}</p>
            <p className="p2">{value}%</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RespBar;
