import React from "react";

type Props = {};

function Statistics({}: Props) {
  return (
    <div className="absolute bottom-0 left-0 flex h-10 w-96 flex-row justify-evenly border-r  border-t text-sm">
      <div className="flex h-full w-full flex-row items-center justify-evenly border-r px-2">
        <span>Online</span>
        <span className="flex  h-2 w-2 rounded-full bg-green-400" />
      </div>
      <div className="flex h-full w-full flex-row items-center justify-center border-r px-2">
        <span> 3000 file(s) </span>
      </div>
      <div className="flex h-full w-full flex-row items-center justify-center px-2">
        <span> 2000 file(s) </span>
      </div>
    </div>
  );
}

export default Statistics;
