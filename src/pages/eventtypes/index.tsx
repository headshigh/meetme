import React from "react";
import { api } from "n/utils/api";
import SingleEvent from "n/components/SingleEvent";
import CreateEventModel from "n/components/CreateEventModel";
import { useState } from "react";
import Image from "next/image";
import plus from "../../../public/icons8-plus-24.png";
function Index() {
  const { data } = api.eventType.getUserEventTypes.useQuery({
    userId: "clj8hsg6j0000uvbszif5a1as",
  });
  const [openWindow, setOpenWindow] = useState<boolean>(false);

  //todo get user from use session after next auth setup
  return (
    <div className="min-h-screen bg-black px-3 pt-8 md:px-10">
      <div className="topmost mb-4 flex items-center justify-between">
        <div className="text">
          <h1 className="mb-1 text-3xl text-white">Event Types</h1>
          <p className="text-white">
            Create events to share for people to book on your calendar.
          </p>
        </div>
        <div
          onClick={() => {
            setOpenWindow(true);
            // mutate({
            //   title: "I have created this new eventtype",
            //   description: "for work purpose",
            //   userId: "clidxyggu0000uv4s20i35g04",
            //   length: "15",
            //   hidden: false,
            // });
          }}
          className="btn flex  min-w-max items-center gap-1 rounded  bg-white px-2 py-2 text-black md:gap-2 md:px-3"
        >
          <Image
            style={{ height: "15px", width: "15px" }}
            alt="plus"
            src={plus}
            width={23}
            height={23}
          />
          <h1>New</h1>
        </div>
      </div>
      {openWindow && (
        <CreateEventModel
          openWindow={openWindow}
          setOpenWindow={setOpenWindow}
        />
      )}
      <div>
        {data?.map((singleEvent) => (
          <SingleEvent key={singleEvent.id} data={singleEvent} />
        ))}
      </div>
    </div>
  );
}

export default Index;
