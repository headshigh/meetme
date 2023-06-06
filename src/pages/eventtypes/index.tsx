import React from "react";
import { api } from "n/utils/api";
import SingleEvent from "n/components/SingleEvent";
import type { singleEvent } from "../../interfaces/singleEvent";

function index() {
  const { data } = api.eventType.getUserEventTypes.useQuery({
    userId: "clidxyggu0000uv4s20i35g04",
  });
  //todo get user from use session after next auth setup
  console.log(data);
  return (
    <div className="min-h-screen bg-black px-6">
      <div className="topmost mb-4 flex items-center justify-between">
        <div className="text">
          <h1 className="mb-1 text-3xl text-white">Event Types</h1>
          <p className="text-white">
            Create events to share for people to book on your calendar.
          </p>
        </div>
        <div className="btn text-white">Button to create</div>
      </div>
      <div>
        {data?.map((singleEvent) => (
          <SingleEvent key={singleEvent.id} data={singleEvent} />
        ))}
      </div>
    </div>
  );
}

export default index;
