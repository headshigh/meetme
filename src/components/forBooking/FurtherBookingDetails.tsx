import React from "react";
import Image from "next/image";
import type { singleEvent } from "n/interfaces/singleEvent";
import pp from "../../../public/DALL·E 2023-05-31 22.10.16 - social media base profile pic for male .png";
import type { user } from "n/interfaces/UserInterface";
import calendar from "../../../public/icons8-calendar-48.png";
import { AmOrPm } from "../../modules/times";
import { month } from "../../modules/times";
import toast from "react-hot-toast";
import { useState } from "react";
import { api } from "n/utils/api";
import { useRouter } from "next/router";
import Spinner from "../Spinner";
import ConfirmationPage from "./ConfirmationPage";
import Link from "next/link";

export interface singleEventWithDetails extends singleEvent {
  user: user;
  startTime: string;
  endTime: string;
  dateObject?: Date;
  meetingDate: string;
}

function FurtherBookingDetails(data: singleEventWithDetails) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [email, setEmail] = useState("");
  console.log(data.meetingDate, "meetingdate");
  console.log(router);
  const { mutate, isLoading: isBooking } =
    api.booking.createBooking.useMutation({
      onSuccess: async () => {
        await router.push({
          pathname: "/bookings/[id]",
          query: { id: router.query.id, hostName: name, hostEmail: email },
        });
        toast.success("Sucessfully created a booking!");
        setBookingConfirmed(true);
        console.log("success");
      },
    });
  const dateObject = new Date(data.meetingDate);
  return (
    <div>
      <Link
        href={"/bookings"}
        className="back absolute left-28 text-white"
      ></Link>
      {!bookingConfirmed ? (
        <div className="model text-brown-200  border-border  rounded border  bg-white px-4 py-7">
          <div className="info  flex  flex-col   sm:flex-row ">
            <div className="userinfo border-bordersubtle px-1 sm:border-r sm:pr-8 md:max-w-[400px]">
              <div className="br-1 flex items-center gap-0">
                <Image src={pp} width={30} height={30} alt="pp"></Image>
                <p className="text-lg font-medium tracking-wide text-background">
                  {data.user.name}
                </p>
              </div>
              <h1 className="mt-2 font-sans text-2xl font-bold tracking-tighter">
                {data.title}
              </h1>
              <div className="mt-2 flex items-start gap-2">
                <Image
                  src={calendar}
                  width={18}
                  height={18}
                  alt="clock"
                ></Image>
                {data.startTime &&
                  data.endTime &&
                  data.meetingDate &&
                  dateObject && (
                    <div className="text-lg font-[400]">
                      <h1>{`${
                        data.meetingDate.toString().split(" ")[0] || "Mon"
                      } ${dateObject.getDate()} ${month(
                        Number(dateObject?.getMonth())
                      )}`}</h1>
                      <h1 className="text-lg font-[400]">
                        {` ${AmOrPm(
                          Number(data.startTime.split(":")[0]),
                          Number(data.startTime.split(":")[1])
                        )} To
                        ${AmOrPm(
                          Number(data.endTime.split(":")[0]),
                          Number(data.endTime.split(":")[1])
                        )}`}
                      </h1>
                    </div>
                  )}
              </div>
            </div>
            <div className="max-w-[400px] sm:px-4">
              <h1 className="pb-1"> Your Name</h1>
              <input
                onChange={(e) => setName(e.target.value)}
                className=" h-9 w-full border  border-slate-600 px-2"
                type="text"
                placeholder="Nischal Gautam"
              />
              <h1 className="pb-1">Email Address</h1>
              <input
                type="text"
                placeholder="email@example.com"
                className="h-9 w-full border border-slate-600 px-2 "
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <button
                disabled={isBooking}
                onClick={() => {
                  if (name.length == 0 || email.length == 0) {
                    toast.error("You must fill name and email");
                  }
                  if (!email.match(/^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
                    return toast.error("not a valid email format");
                  } else {
                    mutate({
                      userId: "clj8hsg6j0000uvbszif5a1as",
                      eventTypeId: 1,
                      participants: ["clj8hsg6j0000uvbszif5a1as"],
                      date: data.meetingDate,
                      hostEmail: email,
                      hostName: name,
                      startTime: data.startTime,
                      endTime: data.endTime,
                    });
                  }
                }}
                className=" mt-4  rounded-lg bg-background px-3 py-1 text-white"
              >
                {isBooking ? <Spinner className="h-5 w-5" /> : "Book Meeting"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <ConfirmationPage {...data} dateObject={dateObject} />
      )}
    </div>
  );
}
export default FurtherBookingDetails;
