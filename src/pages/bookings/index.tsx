import React from "react";
import { api } from "n/utils/api";
import SingleBooking from "n/components/SingleBooking";

function index() {
  const { data, isLoading } = api.booking.getUserBooking.useQuery({
    userId: "clioj0xho0000uv5wvz17o6wm",
  });
  if (isLoading) return <h1>Loading</h1>;
  if (!data) return <></>;
  console.log(data);

  return (
    <div className=" flex min-h-screen flex-col items-center gap-1 bg-black">
      {data.map((booking) => (
        <SingleBooking key={booking?.id} data={booking} />
      ))}
    </div>
  );
}

export default index;
