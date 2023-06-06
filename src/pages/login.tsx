import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
function login() {
  const router = useRouter();
  async function handleGoogleSignin() {
    await signIn("google", { callbackUrl: "http://localhost:3000" });
  }
  async function handleCredSignIn() {
    try {
      const status = await signIn("Credentials", {
        // redirect: false,
        email: "nikkunikku",
        password: "nikkunikku",
        callbackUrl: "/",
      });
      console.log(status);
      // if (status && status.ok) {
      //   router.push("/");
      // }
      console.log(status);
    } catch (err) {
      console.log(err);
    }
  }
  const { data: session } = useSession();
  console.log(session);
  if (session) return <div>Hello {session.user.name}</div>;
  return (
    <div>
      <button onClick={handleCredSignIn}>Sign in with cred</button>
      <button onClick={handleGoogleSignin}>Google sign in</button>
      <button onClick={() => void signOut()}>sign out</button>
    </div>
  );
}

export default login;
