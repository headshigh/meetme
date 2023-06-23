import React from "react";
import type { singleEventWithDetails } from "./FurtherBookingDetails";
import { useRouter } from "next/router";
import { AmOrPm, convertToISOFormat } from "n/modules/times";
import { month } from "n/modules/times";
import tickicon from "../../../public/icons8-tick-48.png";
import googleicon from "../../../public/googleicon.png";
import Image from "next/image";
import Link from "next/link";

function ConfirmationPage(data: singleEventWithDetails) {
  console.log(data.meetingDate);
  console.log(data.startTime);
  const router = useRouter();
  return (
    <div className="flex justify-center">
      <div className="border  border-borderemphasis bg-backgroundmuted px-8 py-4">
        <div className=" border-b border-borderemphasis  py-12 ">
          <div className="flex   justify-center">
            <Image src={tickicon} width={48} height={48} alt="tick" />
          </div>
          <h1 className=" w-full  pt-3 text-center text-lg font-bold tracking-wide text-white">
            The Meeting is schelduded
          </h1>
          <p className=" mt-2 tracking-wide text-white">
            We emailed you and the other attendees a calendar invitation with
            all the details.
          </p>
        </div>
        <div className="text-md flex flex-col gap-6 border-b border-borderemphasis pb-5 pt-5 font-[400] text-white">
          <div className="flex gap-14">
            <h1>What</h1>
            <h1>
              {" "}
              A {data.length} Minutes Meeting Beetween You and{" "}
              {router.query.hostName}
            </h1>
          </div>
          <div className="flex gap-14">
            <h1>When</h1>
            <div className="">
              <h1>{`${
                data.meetingDate.toString().split(" ")[0] || "Mon"
                //@ts-expect-error todo
              } ${data.dateObject.getDate()} ${month(
                Number(data.dateObject?.getMonth())
              )}`}</h1>
              <h1 className="">
                {` ${AmOrPm(
                  Number(data.startTime.split(":")[0]),
                  Number(data.startTime.split(":")[1])
                )} To ${AmOrPm(
                  Number(data.endTime.split(":")[0]),
                  Number(data.endTime.split(":")[1])
                )}`}
              </h1>
            </div>
          </div>
          <div className="flex gap-14">
            <h1>Who</h1>
            <div className="flex flex-col gap-2 text-left">
              <div className="host ">
                <h1>{router.query.hostName}</h1>

                <p>{router.query.hostEmail}</p>
              </div>
              <div className="you">
                <h1>Nischal Gautam</h1>
                <p>nischalgautam7200@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="flex gap-14">
            <h1>Where</h1>
            <h1>Google meet</h1>
          </div>
        </div>
        <div className="addtocalendar flex items-center gap-14 py-4 text-white">
          <h1>Add to calendar</h1>
          <Link
            href={`https://calendar.google.com/calendar/u/0/r/eventedit?dates=${convertToISOFormat(
              data.meetingDate,
              data.startTime
            )}/${convertToISOFormat(data.meetingDate, data.endTime)}&text=A+${
              data.length
            }+min+meeting+between+${router.query.hostName as string}+And+You`}
            target="_blank"
            className="rounded-full p-1 hover:bg-hovercolor "
          >
            <Image src={googleicon} width={30} height={430} alt="cal" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationPage;
