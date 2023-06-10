import React, { useState } from "react";
import toast from "react-hot-toast";
import { api } from "n/utils/api";
function SignUp() {
  const { mutate, isLoading } = api.user.createUser.useMutation();
  const handleSignIn = () => {
    mutate({
      name,
      username,
      password,
      email,
      workingHours: workStartingHour + "-" + workEndingHour,
    });
  };
  const [name, setName] = useState("");
  const [username, setusername] = useState("");
  const [workStartingHour, setWorkStartingHour] = useState("");
  const [workEndingHour, setWorkEndingHour] = useState("");
  console.log(workStartingHour, workEndingHour);
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const hours = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24,
  ];
  return (
    <div className="flex min-h-screen justify-center bg-black text-white">
      <div className="md:px-20">
        <h1 className="mb-2">Name</h1>
        <input
          className="w-[300px] rounded  border border-slate-100 bg-black px-2 py-1"
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
        />
        <h1 className="mb-2 mt-3">Username</h1>
        <input
          placeholder="Username"
          onChange={(e) => setusername(e.target.value)}
          type="text"
          className="w-[300px]  rounded border border-slate-100 bg-black px-2 py-1"
        />
        <h1 className="mb-2 mt-3">Email</h1>
        <input
          placeholder="email"
          onChange={(e) => setemail(e.target.value)}
          type="text"
          className="w-[300px] rounded  border border-slate-100 bg-black px-2 py-1"
        />
        <h1 className="mb-2 mt-3">Password</h1>
        <input
          placeholder="password"
          className="block w-[300px]  rounded border border-slate-100 bg-black px-2 py-1"
          onChange={(e) => setpassword(e.target.value)}
          type="text"
        />
        <div className="mb-3 mt-3 flex flex-col gap-3  rounded border-slate-100 bg-black md:flex-row">
          <div className="flex gap-3">
            <h1>Work Starting Hour</h1>
            <select
              className="block  px-4   text-black"
              onChange={(e) => setWorkStartingHour(e.target.value)}
            >
              {hours.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-3">
            <h1>Work Ending Hour</h1>
            <select
              className="block  px-4   text-black"
              onChange={(e) => setWorkEndingHour(e.target.value)}
            >
              {hours.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
        <button
          className="bg-white px-10 text-black"
          onClick={() => {
            if (username == "" || password == "" || email == "" || name == "") {
              toast.error("please fill all feilds");
              return;
            }
            handleSignIn();
          }}
        >
          SIGN UP
        </button>
      </div>
    </div>
  );
}

export default SignUp;
