import React from "react";
import type { singleEvent } from "../interfaces/singleEvent";
import Image from "next/image";
import clock from ".././../public/png-transparent-clock-computer-icons-clock-cdr-text-time-thumbnail.png";
import link from ".././../public/icons8-link-24.png";
function SingleEvent({ data }: { data: singleEvent }) {
  return (
    <div className="w-[700px] rounded-sm border border-slate-400 border-opacity-40">
      <div className="    bg-black px-3 py-2 text-white hover:bg-slate-950">
        <div className="flex justify-between">
          <div className="left">
            <div className="top">
              <h1 className="text-lg">{data.title}</h1>
              <div className="mt-2 flex gap-2">
                <Image
                  className="rounded-full"
                  src={clock}
                  width={25}
                  height={25}
                  alt="clock"
                />
                <h1>{data.length} Min</h1>
              </div>
            </div>
          </div>
          <div className="right flex items-center">
            <Image
              className="rounded-full"
              src={link}
              width={25}
              height={25}
              alt="clock"
            />
          </div>
        </div>

        {/* <p className="text-sm text-slate-300">{data.length}</p> */}
      </div>
    </div>
  );
}

export default SingleEvent;
