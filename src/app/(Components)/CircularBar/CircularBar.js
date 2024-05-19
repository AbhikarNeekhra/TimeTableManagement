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
      console.log(window.innerHeight, " + ", window.innerWidth);

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
        <div className="outer h-[34.5vh] w-[34.5vh] md:h-[30.5vh] md:w-[30.5vh] lg:h-[29.6vh] lg:w-[29.6vh] xl:h-[32.5vh] xl:w-[32.5vh] bg-gray-400 flex justify-center items-center rounded-full shadow-myShad">
          <div className="inner h-[24vh] w-[24vh] md:h-[22vh] md:w-[22vh] lg:h-[19.7vh] lg:w-[19.7vh] xl:h-[23vh] xl:w-[23vh] lg:scale-100 xl:scale-90 text-2xl font-bold bg-white flex justify-center items-center rounded-full">
            {count}%
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="lg:h-[240px] lg:w-[240px] grid place-items-center"
        >
          <defs>
            <linearGradient id="GradientColor">
              <stop offset="0%" stopColor="#FE886A" />
              <stop offset="100%" stopColor="#FF4B77" />
            </linearGradient>
          </defs>
          <circle
            className={`fill-none stroke-[url(#GradientColor)] stroke-[4.5vh]`}
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
