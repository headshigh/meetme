import { api } from "n/utils/api";
import * as React from "react";
import Calendar from "react-calendar";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import pp from "../../../public/DALL·E 2023-05-31 22.10.16 - social media base profile pic for male .png";
import clock from "../../../public/png-transparent-clock-computer-icons-clock-cdr-text-time-thumbnail.png";

function bookinglink() {
  const router = useRouter();
  // console.log(router.query.id);
  const { id } = router.query;
  const { data, isLoading } = api.eventType.getSingle.useQuery({
    id: Number(id),
  });
  const { mutate } = api.booking.createBooking.useMutation({
    onSuccess: () => {
      console.log("success");
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      console.log(errorMessage);
    },
  });
  console.log(data);
  const [datevalue, setDateValue] = useState(new Date());
  console.log("val", datevalue);
  if (!data) return <></>;
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <div className="flex h-screen items-center justify-center bg-black ">
      <div className="model text-brown-200 h-[550px] w-[750px] bg-white px-4 py-7">
        <div className="info flex gap-10">
          <div className="userinfo">
            <div className="flex items-center gap-2 ">
              <Image src={pp} width={30} height={30} alt="pp"></Image>
              <p className="text-lg font-medium">{data.user.name}</p>
            </div>
            <h1 className="mt-2 font-sans text-2xl font-bold tracking-tighter">
              {data.title}
            </h1>
            <div className="mt-2 flex items-center gap-2">
              <Image src={clock} width={25} height={25} alt="clock"></Image>
              <h1 className="text-lg font-medium">{data.length}</h1>
            </div>
          </div>
          <div className="w-[400px]">
            <Calendar
              className={"w-full font-medium"}
              onChange={(value) => setDateValue(new Date(value))}
            />
            <button
              onClick={() => {
                mutate({
                  userId: "clidxyggu0000uv4s20i35g04",
                  eventTypeId: 1,
                  participants: "clidxyggu0000uv4s20i35g04",
                  startTime: new Date(),
                  endTime: new Date(),
                });
              }}
            >
              Book Meeting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default bookinglink;
