import React, { useState } from "react";
import type { singleEvent } from "../interfaces/singleEvent";
import { api } from "n/utils/api";
import Image from "next/image";
import clock from ".././../public/png-transparent-clock-computer-icons-clock-cdr-text-time-thumbnail.png";
import toast from "react-hot-toast";
import Link from "next/link";
import link from ".././../public/icons8-link-24.png";
import open from "../../public/icons8-open-30.png";
function ProfileSingleEvent({ data }: { data: singleEvent }) {
  return (
    <div className="md:[w-500px]  w-[320px] rounded-sm border border-slate-400 border-opacity-40 sm:w-[350px] lg:w-[700px]">
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

          <div className="right flex cursor-pointer items-center justify-center gap-6">
            <Link target="_blank" href={`/bookings/${data.id}`}>
              <Image src={open} width={25} height={25} alt="open" />
            </Link>
            <Image
              onClick={() => {
                navigator.clipboard
                  .writeText(`http://localhost:3000/bookings/${data.id}`)
                  .then(() => toast.success("copied"))
                  .catch((err) => console.log(err));
              }}
              className="rounded-full"
              src={link}
              width={25}
              height={25}
              alt="link"
            />
          </div>
        </div>

        {/* <p className="text-sm text-slate-300">{data.length}</p> */}
      </div>
    </div>
  );
}

export default ProfileSingleEvent;
