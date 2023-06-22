import { api } from "n/utils/api";
// import Calendar from "react-import * as React from "react";
import toast from "react-hot-toast";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import pp from "../../../public/DALL·E 2023-05-31 22.10.16 - social media base profile pic for male .png";
import clock from "../../../public/png-transparent-clock-computer-icons-clock-cdr-text-time-thumbnail.png";
import SetMeetingTime from "n/components/forBooking/setMeetingTime";
function BookingLink() {
  const router = useRouter();
  const [datevalue, setDateValue] = useState<string>();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  console.log(datevalue);
  console.log(startTime, endTime);
  const { id } = router.query;
  const { data, isLoading } = api.eventType.getSingle.useQuery({
    id: Number(id),
  });

  const { mutate } = api.booking.createBooking.useMutation({
    onSuccess: () => {
      toast.success("Sucessfully created a booking!");
      console.log("success");
    },
    onError: (e) => {
      toast.error("unable to create booking");
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      console.log(errorMessage);
    },
  });
  console.log("val", datevalue);
  if (!data) return <></>;
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <div className="flex h-[364px] min-h-screen items-center justify-center bg-black ">
      <div className="model text-brown-200  border-border w-[750px] rounded border  bg-white px-4 py-7">
        <div className="info  flex  flex-col   sm:flex-row ">
          <div className="userinfo min-w[230px] border-bordersubtle px-1 sm:border-r sm:pr-8">
            <div className="br-1 flex items-center gap-0">
              <Image src={pp} width={30} height={30} alt="pp"></Image>
              <p className="text-lg font-medium tracking-wide text-background">
                {data.user.name}
              </p>
            </div>
            <h1 className="mt-2 font-sans text-2xl font-bold tracking-tighter">
              {data.title}
            </h1>
            <div className="mt-2 flex items-center gap-2">
              <Image src={clock} width={18} height={18} alt="clock"></Image>
              <h1 className="text-lg font-medium">{data.length} Min</h1>
            </div>
          </div>
          <div className="max-w-[400px] sm:px-4">
            {/* <Calendar
              className={"w-full font-medium"}
              onChange={(value) => setDateValue(new Date(value))}
            /> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar onChange={(value) => setDateValue(value)} />
            </LocalizationProvider>
            <button
              disabled={isLoading}
              className=" mb-5 mt-4 rounded-lg bg-background px-3 py-1 text-white"
              onClick={() => {
                if (!datevalue) {
                  toast.error("Please select the meeting date");
                  return;
                }
                mutate({
                  userId: "clioj0xho0000uv5wvz17o6wm",
                  eventTypeId: 1,
                  participants: [
                    "clioj0xho0000uv5wvz17o6wmclioj0xho0000uv5wvz17o6wm",
                  ],
                  date: datevalue,
                  startTime: startTime,
                  endTime: endTime,
                });
              }}
            >
              {isLoading ? "Loading..." : "Book Meeting"}
            </button>
          </div>
          <div>
            {/* TIME PERIODS*/}
            {datevalue && (
              <SetMeetingTime
                length={data.length}
                setStartTime={setStartTime}
                setEndTime={setEndTime}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingLink;
