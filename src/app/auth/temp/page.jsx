"use client"
import { useState } from "react";
import { Checkbox } from "@material-tailwind/react";

const CheckboxColors = () => {
  const [curr, setCurr] = useState("1");

  const handleChange = (e) => {
    const value = e.target.checked ? e.target.value : 0;
    setCurr(value);
    console.log(value);
  };

  return (
    <div className="flex w-max gap-4">
      <Checkbox
        color="blue"
        defaultChecked={curr === "1"}
        onChange={handleChange}
        value="1"
        label={curr}
      />
    </div>
  );
};

export default CheckboxColors;