import React from "react";
import type singlebooking from "../interfaces/singleBooking";
import { monthString } from "n/modules/getMonth";
import { getDayOfWeek } from "n/modules/getDayOfWeek";
import cross from "../../public/icons8-cross-24.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { api } from "n/utils/api";
import toast from "react-hot-toast";
function SingleBooking({ data }: { data: singlebooking }) {
  const router = useRouter();
  // console.log(router.query.id);
  const { mutate, isLoading } = api.booking.cancelBooking.useMutation({
    onSuccess: () => {
      toast.success("Booking sucessfully cancelled. Refresh to see changes");
    },
    onError: () => {
      toast.error("Unable to cancel the booking");
    },
  });
  return (
    <div className="w-[380px] border border-border  sm:w-[450px] lg:w-[900px]">
      <div className="  bg-background px-3 py-2 text-gray-100">
        <div className="items-top flex  sm:flex-col md:flex-row md:justify-between">
          <div className="flex flex-row items-center justify-between gap-5 md:flex-col md:gap-0">
            <h1 className=" mb-1  text-xl text-emphasis">
              {new Date(data.date).getDate()}{" "}
              {monthString(new Date(data.date).getMonth())}
              {","}
              {getDayOfWeek(new Date(data.date).getDay())}{" "}
              {/* {data.startTime.getFullYear()} */}
            </h1>
            <h1 className="text-md flex text-subtle sm:min-h-max sm:flex-row md:flex-col">
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
          <div className="atandees ">
            <h1 className="text-xl text-emphasis">You and Elon Musk</h1>
          </div>
          <button
            disabled={isLoading}
            onClick={() =>
              mutate({
                userId: "clioj0xho0000uv5wvz17o6wm",
                bookingId: data.id,
              })
            }
            className="delete  flex items-center rounded border border-border px-2 text-emphasis "
          >
            <Image src={cross} w={24} h={24} alt="cross" />
            <h1>{isLoading ? "Loading..." : "Cancel"}</h1>
          </button>
        </div>
        {/* <p className="text-sm text-slate-300">{data.length}</p> */}
      </div>
    </div>
  );
}

export default SingleBooking;
