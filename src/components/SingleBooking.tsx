import React from "react";
import type singlebooking from "../interfaces/singleBooking";
import { monthString } from "n/modules/getMonth";
import { getDayOfWeek } from "n/modules/getDayOfWeek";
import cross from "../../public/icons8-cross-24.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { api } from "n/utils/api";
import toast from "react-hot-toast";
import { AmOrPm } from "n/modules/times";
function SingleBooking({ data }: { data: singlebooking }) {
  // console.log(router.query.id);
  const { mutate, isLoading } = api.booking.cancelBooking.useMutation({
    onSuccess: () => {
      toast.success("Booking sucessfully cancelled. Refresh to see changes");
    },
    onError: () => {
      toast.error("Unable to cancel the booking");
    },
  });
  const startTimeSplitted = data.startTime.split(":");
  const endTimeSplitted = data.endTime.split(":");
  return (
    <div className="w-[360px] border border-bordersubtle border-opacity-30  sm:w-[450px] md:w-[700px] lg:w-[900px]">
      <div className="  bg-background px-3 py-2 text-gray-100">
        <div className="items-top flex  flex-col md:flex-row md:justify-between">
          <div className="flex flex-row items-center justify-between gap-5 md:flex-col md:gap-0">
            <h1 className="  text-md mb-1 text-emphasis md:text-xl">
              {new Date(data.date).getDate()}{" "}
              {monthString(new Date(data.date).getMonth())}
              {","}
              {getDayOfWeek(new Date(data.date).getDay())}{" "}
              {/* {data.startTime.getFullYear()} */}
            </h1>
            {
              <h1 className="text-md flex text-subtle sm:min-h-max sm:flex-row md:flex-col">
                {AmOrPm(
                  Number(startTimeSplitted[0]),
                  Number(startTimeSplitted[1])
                )}{" "}
                {"-"}
                {AmOrPm(Number(endTimeSplitted[0]), Number(endTimeSplitted[1]))}
              </h1>
            }
          </div>
          <div className="atandees ">
            <h1 className="text-md text-emphasis md:text-xl">
              You and {data.hostName}
            </h1>
          </div>
          <button
            disabled={isLoading}
            onClick={() =>
              mutate({
                userId: "clj8hsg6j0000uvbszif5a1as",
                bookingId: data.id,
              })
            }
            className="delete flex items-center gap-1 rounded      py-0 text-emphasis "
          >
            <Image
              style={{ width: "18px", height: "18px" }}
              src={cross}
              width={10}
              height={10}
              alt="cross"
            />
            <h1>{isLoading ? "Loading..." : "Cancel"}</h1>
          </button>
        </div>
        {/* <p className="text-sm text-slate-300">{data.length}</p> */}
      </div>
    </div>
  );
}

export default SingleBooking;
