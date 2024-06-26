"use client";
import React, { useState } from "react";
import Topbar from "@/components/topbar";
import { useRouter } from "next/navigation";
import axios from "axios";
export default function AddNew() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [key, setKey] = useState("");
  const router = useRouter();
  const addNew = async () => {
    try {
      const res = await axios.post("/api/store/addPass", {
        username,
        password,
        key,
      });
      if (res.status == 200) {
        router.push("/");
      }
    } catch (error: any) {
      console.log(error);
      alert(error.response.data.message);
    }
  };
  return (
    <>
      <Topbar isLoggedIn />
      <div className="flex flex-col h-5/6 items-center justify-center py-2">
        <div className="shadow-2xl bg-primary md:h-4/5 h-5/6 lg:w-3/6 md:w-4/6 w-5/6 rounded-2xl mt-16  mb-auto p-16">
          <p className=" text-center text-2xl tracking-wide capitalize ">
            Add new password!
          </p>
          <div className="flex flex-col justify-center items-center ">
            <div className="my-4 md:my-6 sm:my-4 w-5/6">
              <input
                className="border-2 rounded-2xl p-2 w-full"
                type="text"
                placeholder="Key Name"
                onChange={(e) => setKey(e.target.value)}
              />
            </div>
            <div className="my-4 md:my-6 sm:my-4 w-5/6">
              <input
                className="border-2 rounded-2xl p-2 w-full"
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="my-4 md:my-6 sm:my-4 w-5/6">
              <input
                className="border-2 rounded-2xl p-2 w-full"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className="bg-cyan-600 rounded-2xl p-2 w-5/6 text-primary my-4 md:my-6 sm:my-4"
              onClick={() => {
                addNew();
              }}
            >
              Add New
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
