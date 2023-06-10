import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
function Login() {
  const router = useRouter();
  async function handleGoogleSignin() {
    await signIn("google", { callbackUrl: "http://localhost:3000" });
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleCredSignIn() {
    try {
      console.log("trying to sign in");

      const status = signIn("Credentials", {
        redirect: true,
        email: email,
        password: password,
        callbackUrl: "/",
      });
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
      <h1>Email</h1>
      <input type="text" onChange={(e) => setEmail(e.target.value)} />
      <h1>Password</h1>
      <input type="text " onChange={(e) => setPassword(e.target.value)} />
      <button
        onClick={(e) => {
          e.preventDefault();
          const status = void signIn("Credentials", {
            email,
            password,
          });
          console.log(status);
        }}
      >
        Login
      </button>
      <button onClick={() => void handleGoogleSignin()}>
        Sign In with Google
      </button>
    </div>
  );
}

export default Login;
