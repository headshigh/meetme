import React from "react";
import type singlebooking from "../interfaces/singleBooking";
import { monthString } from "n/modules/getMonth";
function SingleBooking({ data }: { data: singlebooking }) {
  return (
    <div className="w-[700px] border border-white">
      <div className="    bg-black px-3 py-2 text-white">
        <div className="items-top flex gap-20 ">
          <div>
            <h1 className=" mb-1 text-xl">
              Meeting on {new Date(data.date).getDay()}{" "}
              {monthString(new Date(data.date).getMonth())}{" "}
              {/* {data.startTime.getFullYear()} */}
            </h1>
            <h1 className="text-md">
              {/* {data.startTime.getHours() % 12}
              {":"}
              {data.startTime.getMinutes().toString().padStart(2, "0")}{" "}
              {data.endTime.getHours() < 12 ? "am" : "pm"} To{" "}
              {data.endTime.getHours() % 12}
              {":"}
              {data.endTime.getMinutes().toString().padStart(2, "0")}{" "}
              {data.endTime.getHours() < 12 ? "am" : "pm"} */}
              {data.startTime} to {data.endTime}
            </h1>
          </div>
          <div className="atandees">
            <h1 className="text-xl">You and Elon Musk</h1>
          </div>
        </div>
        {/* <p className="text-sm text-slate-300">{data.length}</p> */}
      </div>
    </div>
  );
}

export default SingleBooking;
