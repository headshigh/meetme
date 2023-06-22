import { api } from "n/utils/api";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";
import pp from "../../../public/DALL·E 2023-05-31 22.10.16 - social media base profile pic for male .png";
import SingleEvent from "n/components/SingleEvent";
import type { singleEvent } from "n/interfaces/singleEvent";

function Profile() {
  const router = useRouter();
  const { data: userInfo, isLoading: infoLoading } =
    api.user.getUserInfo.useQuery({
      id: router.query.id as string,
    });
  const { data: userEventtypes, isLoading: eventsLoading } =
    api.eventType.getUserEventTypes.useQuery({
      userId: router.query.id as string,
    });
  console.log(userEventtypes);
  console.log(userInfo);
  if (infoLoading || !userInfo) return <h1 className="text-white">Loading</h1>;

  return (
    <div className="bg-background ">
      <div className="userinfo mt-3 flex flex-col items-center text-3xl">
        <Image
          className="rounded-full"
          src={pp}
          width={100}
          height={100}
          alt="pp"
        />
        <h1 className="text-white">{userInfo?.name}</h1>
      </div>

      <div className="events mt-5 flex justify-center">
        {eventsLoading || !userEventtypes ? (
          <h1>Loading</h1>
        ) : (
          <div>
            {
              //@ts-expect-error idont know
              userEventtypes.map((event: singleEvent) => (
                <SingleEvent key={event.id} data={event} />
              ))
            }
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
