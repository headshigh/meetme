import React, { useState } from "react";
import toast from "react-hot-toast";
import { api } from "n/utils/api";
function signup() {
  const { mutate, isLoading } = api.user.createUser.useMutation();
  const handleSignIn = () => {
    mutate({
      name,
      username,
      password,
      email,
    });
  };
  const [name, setName] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  return (
    <div>
      <h1>Name</h1>
      <input onChange={(e) => setName(e.target.value)} type="text" />
      <h1>Username</h1>
      <input onChange={(e) => setusername(e.target.value)} type="text" />
      <h1>email</h1>
      <input onChange={(e) => setemail(e.target.value)} type="text" />
      <h1>password</h1>
      <input onChange={(e) => setpassword(e.target.value)} type="text" />
      <button
        onClick={() => {
          if (username == "" || password == "" || email == "" || name == "") {
            toast.error("please fill all feilds");
          }
          handleSignIn();
        }}
      >
        SIGN UP
      </button>
    </div>
  );
}

export default signup;
