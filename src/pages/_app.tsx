import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "n/utils/api";
import "n/styles/globals.css";
import { Toaster } from "react-hot-toast";
import Sidebar from "n/components/Navbar";
import classNames from "classnames";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Toaster position="bottom-right" />
      <div className="flex bg-background md:gap-16">
        <Sidebar />
        <div className="w-full ">
          <Component {...pageProps} />
        </div>
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
