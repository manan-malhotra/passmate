"use client";
import Topbar from "@/components/topbar";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const register = async () => {
    try {
      const res = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.status == 200) {
        localStorage.setItem("token", data.user);
        window.location.href = "/";
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="h-screen">
      <Topbar />
      <div className="flex flex-col h-5/6 items-center justify-center py-2">
        <div className="shadow-2xl bg-primary md:h-4/5 h-5/6 lg:w-3/6 md:w-4/6 w-5/6 rounded-2xl mt-auto mb-auto p-16">
          <p className=" text-center text-2xl tracking-wide capitalize ">
            Create your new account!
          </p>
          <div className="flex flex-col justify-center items-center ">
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
            <div className="my-4 md:my-6 sm:my-4">
              Already have an account?{" "}
              <button onClick={() => router.replace("/login")}>
                <span className="font-medium underline cursor-pointer">
                  Login
                </span>
              </button>
            </div>
            <button
              className="bg-cyan-600 rounded-2xl p-2 w-5/6 text-primary my-4 md:my-6 sm:my-4"
              onClick={register}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
