import React, { useState } from "react";
import divideTimeSlots from "../../modules/divideTimeSlots";
import { useMemo } from "react";
import classNames from "classnames";
import { api } from "n/utils/api";
import { availableParallelism } from "os";
type setStartTime = (time: string) => void;
function SetMeetingTime({
  setStartTime,
  setEndTime,
  length,
}: {
  setStartTime: setStartTime;
  setEndTime: setStartTime;
  length: string;
}) {
  //get users workstart and endtime and set accordingly
  const { data } = api.user.getUserWorikngHours.useQuery({
    userId: "clj8hsg6j0000uvbszif5a1as",
  });
  console.log(data);

  const avilabletime: string[] = useMemo(() =>
    divideTimeSlots(
      data?.workingHours.split("-")[0],
      data?.workingHours.split("-")[1],
      Number(length)
    )
  );
  const [activeOption, setActiveOption] = useState("");
  if (avilabletime.length == 0) return <h1>User not found</h1>;
  console.log(activeOption);
  return (
    <div className="time flex max-h-[364px] flex-col gap-2 overflow-y-auto border-l border-bordersubtle text-white delay-75 ease-in sm:flex sm:flex-col">
      {avilabletime.map((time, index) => {
        if (index != avilabletime.length - 1)
          return (
            <div
              onClick={() => {
                setStartTime(time);
                setEndTime(avilabletime[index + 1] || "");
                setActiveOption(time);
              }}
              className={classNames(
                " scrollbar cursor-pointer justify-center rounded   border-black px-12 py-1 text-black hover:border hover:bg-slate-100 md:flex",
                {
                  border: activeOption == time,
                }
              )}
              key={time}
            >
              {time}
            </div>
          );
      })}
    </div>
  );
}

export default SetMeetingTime;
