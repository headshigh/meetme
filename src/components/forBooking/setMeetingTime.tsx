import React, { useState } from "react";
import divideTimeSlots from "../../modules/divideTimeSlots";
import { useMemo } from "react";
import classNames from "classnames";
import { api } from "n/utils/api";
function SetMeetingTime({
  setStartTime,
  setEndTime,
  length,
}: {
  setStartTime: any;
  setEndTime: any;
  length: string;
}) {
  //get users workstart and endtime and set accordingly
  const { data } = api.user.getUserWorikngHours.useQuery({
    userId: "clioj0xho0000uv5wvz17o6wm",
  });

  console.log(data?.workingHours.split("-"));
  const avilabletime: string[] = useMemo(
    () =>
      divideTimeSlots(
        data?.workingHours.split("-")[0],
        data?.workingHours.split("-")[1],
        Number(length)
      ),
    [data?.workingHours]
  );
  console.log(avilabletime);
  const [activeOption, setActiveOption] = useState("");
  console.log(activeOption);
  return (
    <div className="time max-h-[364px] gap-2 overflow-y-auto border-l border-bordersubtle text-white delay-75 ease-in sm:flex sm:flex-col">
      {avilabletime.map((time, index) => {
        if (index != avilabletime.length - 1)
          return (
            <div
              onClick={() => {
                setStartTime(time);
                setEndTime(avilabletime[index + 1]);
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
