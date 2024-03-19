"use client";
import React, { useState, useEffect } from "react";
import "./circle.css";

export default function Circularbar(props) {
  const [count, setCount] = useState();
  const [dashOffset, setDashOffset] = useState(621);
  const targetValue = props.target;

  useEffect(() => {
    let animationFrame;
    let progress = 0;
    const progressStep = 10;

    const animate = () => {
      progress += progressStep;
      const newCount = Math.floor((progress * targetValue) / 100);
      setCount(progress / 10);
      setDashOffset(621 - newCount);

      if (progress < 621) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(targetValue);
        cancelAnimationFrame(animationFrame);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <>
      <div className="cover h-full w-full grid place-items-center relative">
        <div className="outer h-[32.5vh] w-[32.5vh] bg-gray-400 flex justify-center items-center rounded-full shadow-myShad">
          <div className="inner h-[23vh] w-[23vh] text-2xl font-bold bg-white flex justify-center items-center rounded-full">
            {count}%
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="33vh"
          height="33vh"
          className="grid place-items-center"
        >
          <defs>
            <linearGradient id="GradientColor">
              <stop offset="0%" stopColor="#FE886A" />
              <stop offset="100%" stopColor="#FF4B77" />
            </linearGradient>
          </defs>
          <circle
            className={`fill-none stroke-[url(#GradientColor)] stroke-[4.5vh] `}
            cx="121"
            cy="121"
            r="100"
            strokeLinecap="round"
            style={{ strokeDasharray: 628, strokeDashoffset: dashOffset }}
          />
        </svg>
      </div>
    </>
  );
}
