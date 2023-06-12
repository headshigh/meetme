import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Link from "next/link";

function Sidebar() {
  const [active, setActive] = React.useState("EventTypes");
  return (
    <div className="sidebar__wrapper hidden min-h-screen  flex-col  bg-background text-sm text-white  sm:flex">
      <div className="icon__wrapper flex flex-col gap-6 ">
        <h1 className="hidden px-4 pt-8 text-lg sm:block">MeetMe</h1>
        <Link href="/eventtypes">
          <div
            onClick={() => {
              setActive("EventTypes");
            }}
            style={
              active == "Home"
                ? {
                    backgroundColor: "#3c3232",
                    borderRadius: "16px",
                  }
                : {}
            }
            className="icon flex  max-w-max items-center justify-center gap-3 rounded px-3  py-1 hover:bg-hovercolor "
          >
            <Icon className="" width={"34px"} icon="ic:baseline-home" />
            <h1 className="hidden  text-sm sm:block">EventTypes</h1>
          </div>
        </Link>
        <Link href="/bookings">
          <div
            onClick={() => {
              setActive("bookings");
            }}
            style={
              active == "Confessions"
                ? {
                    backgroundColor: "#3c3232",
                    borderRadius: "16px",
                  }
                : {}
            }
            className="icon flex  max-w-max items-center justify-center gap-3 rounded px-3  py-1 hover:bg-hovercolor"
          >
            <h1 className="hidden  text-sm sm:block">Bookings</h1>
          </div>
        </Link>
        <Link href="/availablity">
          <div
            onClick={() => {
              setActive("avilablity");
            }}
            style={
              active == "Notes"
                ? {
                    backgroundColor: "#3c3232",
                    borderRadius: "16px",
                  }
                : {}
            }
            className="icon flex  max-w-max items-center justify-center gap-3 rounded px-3  py-1 hover:bg-hovercolor "
          >
            <Icon width={"34px"} icon="ic:baseline-home" />
            <h1 className="  hidden  text-sm sm:block">availablity</h1>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
