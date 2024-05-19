"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const Myselect = ({ cls, list, selected, setSelected, defaultVal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [maxWidth, setMaxWidth] = useState(0);
  const [selectedOption, setSelectedOption] = useState(defaultVal);
  const options = list;
  const containerRef = useRef(null);
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setSelected(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const maxLength = Math.max(...options.map((option) => option.length));
    const containerWidth = containerRef.current
      ? containerRef.current.offsetWidth
      : 0;
    if (Math.max(maxLength * 10, containerWidth) == 0) {
      setMaxWidth(0);
    } else {
      setMaxWidth(Math.max(maxLength * 10, containerWidth));
    }
    console.log(maxWidth);
    console.log("asd", defaultVal.length);
    console.log("max len", maxLength);
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`${cls}`}
      ref={containerRef}
      style={{ width: `${maxWidth == 0 ? maxWidth + 91 : maxWidth + 80}px` }}
    >
      <div
        className={`h-8 ${
          maxWidth == 0 ? "w-fit" : ""
        } px-3 py-6 relative shadow-myShad2 rounded-2xl text-gray-500 cursor-pointer flex justify-between items-center`}
        onClick={toggleDropdown}
      >
        <p className="mr-3 text-lg font-semibold select-none">{selected}</p>
        <Image
          height={30}
          width={30}
          className="rounded-full p-2 select-none"
          src="/arrow-down-icon-png-6696.png"
          alt="logo"
        />
        {isOpen && (
          <div className="mt-2 shadow-lg absolute top-10 left-2 rounded-md z-10 bg-gradient-to-r from-[#FE886A] text-white font-semibold to-[#FF4B77]">
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
    </div>
  );
};

export default Myselect;
