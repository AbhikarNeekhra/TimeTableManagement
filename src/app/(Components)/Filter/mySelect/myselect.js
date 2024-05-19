import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const Myselect = ({ cls, list, selected, setSelected, defaultVal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultVal);
  const options = list;
  const containerRef = useRef(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setSelected(option);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`h-full w-full px-3 bg-white relative shadow-myShad2 rounded-2xl mt-1 text-gray-500 cursor-pointer flex justify-between items-center`}
      onClick={toggleDropdown}
    >
      <p className="max-h-[7vh] mr-3 text-sm lg:text-lg font-semibold select-none">
        {selected}
      </p>
      <Image
        height={30}
        width={30}
        className="rounded-full p-2 select-none"
        src="/arrow-down-icon-png-6696.png"
        alt="logo"
      />
      {isOpen && (
        <div className="max-h-[50vh] w-[99%] md:w-[90%] mt-2 md:mt-4 shadow-myShad3 overflow-y-scroll no-scrollbar absolute top-10 left-2 rounded-md z-10 bg-gradient-to-r from-[#FE886A] to-[#FF4B77] text-white font-semibold">
          {options.map((option, index) => (
            <div
              key={index}
              className="px-6 py-2 hover:text-black hover:border hover:border-white grid place-items-center cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Myselect;
