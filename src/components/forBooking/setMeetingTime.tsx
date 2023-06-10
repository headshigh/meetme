import React, { useState } from "react";
import divideTimeSlots from "../../modules/divideTimeSlots";
import { useMemo } from "react";
import classNames from "classnames";

function SetMeetingTime({
  setStartTime,
  setEndTime,
}: {
  setStartTime: Function;
  setEndTime: Function;
}) {
  const avilabletime: string[] = useMemo(
    () => divideTimeSlots("10:00", "17:00", 15),
    []
  );
  const [activeOption, setActiveOption] = useState("");
  console.log(activeOption);
  return (
    <div className="time max-h-[500px] gap-2 overflow-y-auto text-white delay-75 ease-in sm:flex sm:flex-col">
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
